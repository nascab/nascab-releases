(function () {
  'use strict';
  try {
    console.log('[notes] editor.js starting');
    var Parchment = Quill.import('parchment');
    var DeltaCtor = Quill.import('delta');

    // Quill 2.x 的 Parchment.Attributor 是 ES6 class，必须用 class extends（不能 .call()）
    class RawStyleAttributor extends Parchment.Attributor {
      value(node) { return node.getAttribute('style') || ''; }
      add(node, value) { node.setAttribute('style', value); }
      remove(node) { node.removeAttribute('style'); }
    }
    Quill.register(new RawStyleAttributor('style', 'style',
      { scope: Parchment.Scope.INLINE_ATTRIBUTE }), true);

    // ===== 参数（查询参数作为 fallback；native 可在 onPageEnd 后通过 window.__notes 覆盖）=====
    function queryParam(name) {
      var m = new RegExp('[?&]' + name + '=([^&]*)').exec(location.search);
      return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : '';
    }
    var dark = queryParam('dark') === '1';
    var primary = queryParam('primary') || '#4f6af2';
    var placeholder = queryParam('placeholder') || '';

    function applyTheme() {
      var root = document.documentElement;
      function set(v, light, darkVal) {
        root.style.setProperty(v, dark ? darkVal : light);
      }
      set('--ed-bg', '#ffffff', '#17181c');
      set('--ed-fg', '#1a1a1a', '#e6e6e6');
      set('--ed-muted', '#8a8a8a', '#9a9ba2');
      set('--ed-border', '#e2e2e2', '#33343a');
      set('--ed-toolbar-bg', '#f0f0f0', '#26272e');
      set('--ed-hover', '#e0e0e0', '#33343a');
      set('--ed-primary', primary, primary);
      set('--ed-btn-active', '#e3e8ff', '#31365a');
      document.body.style.backgroundColor = dark ? '#17181c' : '#ffffff';
    }
    applyTheme();

    // 本地化文案（native 以查询参数传入；也可通过 setLabels 覆盖）
    var labels = {
      undo: queryParam('l_undo') || 'Undo',
      redo: queryParam('l_redo') || 'Redo',
      clear: queryParam('l_clear') || 'Clear format',
      quote: queryParam('l_quote') || 'Quote',
      code: queryParam('l_code') || 'Code block',
      bullet: queryParam('l_bullet') || 'Bullet list',
      number: queryParam('l_number') || 'Number list',
      check: queryParam('l_check') || 'Check list',
      image: queryParam('l_image') || 'Image'
    };
    function applyLabels() {
      Object.keys(labels).forEach(function (k) {
        var el = document.getElementById('l-' + k);
        if (el) { el.textContent = labels[k]; }
      });
    }
    applyLabels();

    // ===== Quill 初始化 =====
    var quill = new Quill('#editor-container', {
      theme: 'snow',
      placeholder: placeholder,
      modules: {
        toolbar: {
          container: '#toolbar',
          handlers: {
            undo: function () { this.quill.history.undo(); },
            redo: function () { this.quill.history.redo(); }
          }
        },
        history: { delay: 800, maxStack: 200 }
      }
    });
    console.log('[notes] Quill initialized');

    var pending = new DeltaCtor();
    var ignoreEvents = false;
    var pushTimer = null;
    var currentImg = null;
    var nativeReady = false;

    // onDeltaChanged 仅作"有变更"通知；pending 保留至 native takePending() 原子取走
    // （对齐 Flutter _pendingChangeDelta 语义：compose 累积，保存时取走并清空）
    function flushPending() {
      var json = JSON.stringify(pending.ops || []);
      if (nativeReady && window.NativeBridge) {
        try { window.NativeBridge.onDeltaChanged(json); } catch (e) { /* noop */ }
      }
    }

    function schedulePush() {
      if (pushTimer) { clearTimeout(pushTimer); }
      pushTimer = setTimeout(function () {
        pushTimer = null;
        flushPending();
      }, 250);
    }

    quill.on('text-change', function (delta, oldDelta, source) {
      if (ignoreEvents) { return; }
      if (delta && delta.length() > 0) {
        pending = pending.compose(delta);
      }
      schedulePush();
    });

    // ===== 图片点击（委托）=====
    quill.root.addEventListener('click', function (e) {
      var t = e.target;
      if (t && t.tagName === 'IMG') {
        currentImg = t;
        var info = { src: t.getAttribute('src') || '', style: t.getAttribute('style') || '' };
        try { window.NativeBridge.onImageClicked(JSON.stringify(info)); } catch (err) { /* noop */ }
      }
    });

    // ===== more 面板 =====
    var panel = document.getElementById('more-panel');
    document.getElementById('more-btn').addEventListener('click', function (ev) {
      ev.stopPropagation();
      panel.classList.toggle('open');
    });
    document.addEventListener('click', function (ev) {
      if (panel.classList.contains('open') && !panel.contains(ev.target)) {
        panel.classList.remove('open');
      }
    });

    function sel() { return quill.getSelection() || { index: quill.getLength(), length: 0 }; }

    function runCmd(name) {
      panel.classList.remove('open');
      if (name === 'undo') { quill.history.undo(); return; }
      if (name === 'redo') { quill.history.redo(); return; }
      if (name === 'clear') {
        var s = sel();
        quill.removeFormat(s.index, s.length, 'user');
        ['blockquote', 'code-block', 'list'].forEach(function (f) {
          quill.format(f, false, 'user');
        });
        return;
      }
      if (name === 'quote') { quill.format('blockquote', true, 'user'); return; }
      if (name === 'code') { quill.format('code-block', true, 'user'); return; }
      if (name === 'bullet') { quill.format('list', 'bullet', 'user'); return; }
      if (name === 'number') { quill.format('list', 'ordered', 'user'); return; }
      if (name === 'check') { quill.format('list', 'unchecked', 'user'); return; }
      if (name === 'image') {
        try { window.NativeBridge.onPickImage(); } catch (e) { /* noop */ }
        return;
      }
    }
    Array.prototype.forEach.call(document.querySelectorAll('#more-panel .act'), function (btn) {
      btn.addEventListener('click', function (ev) {
        ev.stopPropagation();
        runCmd(btn.getAttribute('data-cmd'));
      });
    });

    // ===== 原生桥（javaScriptProxy 注入对象：onDeltaChanged(patchJson)/onEditorReady/
    // onImageClicked(infoJson)/onPickImage）。注入发生在文档元素创建时，先于本脚本，
    // 故不能赋值占位（会覆盖注入对象）；轮询等待注入完成后通知 native。=====
    function notifyNativeReady() {
      if (window.NativeBridge && window.NativeBridge.onEditorReady) {
        nativeReady = true;
        console.log('[notes] notifying native ready');
        try { window.NativeBridge.onEditorReady(); } catch (e) { /* noop */ }
      } else {
        setTimeout(notifyNativeReady, 30);
      }
    }
    notifyNativeReady();

    // ===== 供 native runJavaScript / runJavaScriptCodeAsync 调用 =====
    window.__notes = {
      load: function (deltaJson) {
        ignoreEvents = true;
        try {
          var ops = JSON.parse(deltaJson || '[]');
          if (!Array.isArray(ops) || ops.length === 0) { ops = [{ insert: '\n' }]; }
          pending = new DeltaCtor();
          quill.setContents(ops, 'silent');
        } finally {
          ignoreEvents = false;
        }
        return 'ok';
      },
      applyPatch: function (patchJson) {
        try {
          var ops = JSON.parse(patchJson || '[]');
          if (Array.isArray(ops) && ops.length > 0) {
            quill.updateContents(ops, 'user');
          }
        } catch (e) { /* noop */ }
        return 'ok';
      },
      insertImage: function (url, style) {
        var s = quill.getSelection(true);
        var index = s ? s.index : quill.getLength();
        quill.insertEmbed(index, 'image', url, 'user');
        if (style) { quill.formatText(index, 1, 'style', style, 'user'); }
        flushPending();
        return 'ok';
      },
      resizeImage: function (style) {
        if (!currentImg) { return 'no-img'; }
        var blot = Quill.find(currentImg);
        if (!blot) { return 'no-blot'; }
        var index = quill.getIndex(blot);
        quill.formatText(index, 1, 'style', style, 'user');
        flushPending();
        return 'ok';
      },
      removeImage: function () {
        if (!currentImg) { return 'no-img'; }
        var blot = Quill.find(currentImg);
        if (!blot) { return 'no-blot'; }
        var index = quill.getIndex(blot);
        quill.deleteText(index, 1, 'user');
        currentImg = null;
        flushPending();
        return 'ok';
      },
      clickedImageInfo: function () {
        return currentImg ? JSON.stringify({
          src: currentImg.getAttribute('src') || '',
          style: currentImg.getAttribute('style') || ''
        }) : '';
      },
      takePending: function () {
        var json = JSON.stringify(pending.ops || []);
        pending = new DeltaCtor();
        return json;
      },
      restorePending: function (patchJson) {
        try {
          var ops = JSON.parse(patchJson || '[]');
          if (Array.isArray(ops) && ops.length > 0) {
            pending = pending.compose(new DeltaCtor(ops));
          }
        } catch (e) { /* noop */ }
        return 'ok';
      },
      setTheme: function (darkFlag, primaryColor) {
        dark = darkFlag === '1' || darkFlag === 1 || darkFlag === true;
        if (primaryColor) { primary = primaryColor; }
        applyTheme();
        return 'ok';
      },
      setPlaceholder: function (text) {
        placeholder = text || '';
        quill.root.setAttribute('data-placeholder', placeholder);
        return 'ok';
      },
      setLabels: function (labelsObj) {
        if (labelsObj && typeof labelsObj === 'object') {
          Object.keys(labelsObj).forEach(function (k) {
            if (typeof labelsObj[k] === 'string') {
              labels[k] = labelsObj[k];
            }
          });
          applyLabels();
        }
        return 'ok';
      },
      hasPending: function () {
        return pending.ops && pending.ops.length > 0 ? '1' : '0';
      }
    };
    console.log('[notes] editor.js ready, window.__notes defined');
  } catch (e) {
    console.error('[notes] editor.js fatal error:', e && e.message ? e.message : String(e));
  }
})();
