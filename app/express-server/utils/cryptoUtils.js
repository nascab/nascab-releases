const _0xf7b966=_0x338a;(function(_0x4ae98f,_0x5ab59a){const _0x2dfc25=_0x338a,_0x32acb2=_0x4ae98f();while(!![]){try{const _0x12e502=parseInt(_0x2dfc25(0x1e5))/0x1+parseInt(_0x2dfc25(0x1dc))/0x2*(parseInt(_0x2dfc25(0x1cf))/0x3)+parseInt(_0x2dfc25(0x1df))/0x4*(-parseInt(_0x2dfc25(0x1d4))/0x5)+-parseInt(_0x2dfc25(0x1c7))/0x6+parseInt(_0x2dfc25(0x1da))/0x7+-parseInt(_0x2dfc25(0x1d8))/0x8*(-parseInt(_0x2dfc25(0x1dd))/0x9)+-parseInt(_0x2dfc25(0x1e4))/0xa;if(_0x12e502===_0x5ab59a)break;else _0x32acb2['push'](_0x32acb2['shift']());}catch(_0x4ce56b){_0x32acb2['push'](_0x32acb2['shift']());}}}(_0x3d02,0x76fd4));const fs=require('fs'),path=require(_0xf7b966(0x1e0)),crypto=require(_0xf7b966(0x1e8)),algorithm='aes-128-cbc',keyLength=0x10,salt=_0xf7b966(0x1d7),iv=_0xf7b966(0x1cb);function _0x3d02(){const _0x524b68=['pipe','10065kSJHcq','encryptFile','end','exports','status','1859705XYXNjC','log','decryptFileGetStream','nascabisthebestanascabisthebesta','48408DYLnRw','encryptFileFromInputPipe','767851KXncuR','decryptString','146HDszHb','162iCUSSF','error','4mstmOs','path','finish','decryptFile','createWriteStream','5674140HhRFnd','965242FOGtoa','final','createDecipheriv','crypto','close','createReadStream','push','scryptSync','12198tBzSsj','createCipheriv','utf8','hex','nascabisthebesta','pwd','update'];_0x3d02=function(){return _0x524b68;};return _0x3d02();}let cryptoUtils={};function _0x338a(_0x9d386,_0x3b473e){const _0x3d02e1=_0x3d02();return _0x338a=function(_0x338a82,_0x5dc50a){_0x338a82=_0x338a82-0x1c7;let _0x49e61a=_0x3d02e1[_0x338a82];return _0x49e61a;},_0x338a(_0x9d386,_0x3b473e);}var keyArr=[];function getKeyByPwd(_0x3ef1dd){const _0x309db3=_0xf7b966;for(let _0x3e158d in keyArr){if(keyArr[_0x3e158d][_0x309db3(0x1cc)]==_0x3ef1dd)return keyArr[_0x3e158d]['key'];}let _0x264fba=crypto[_0x309db3(0x1ec)](_0x3ef1dd,salt,keyLength);return keyArr[_0x309db3(0x1eb)]({'pwd':_0x3ef1dd,'key':_0x264fba}),_0x264fba;}cryptoUtils[_0xf7b966(0x1d9)]=function(_0x2d7565,_0x56c488,_0x44983a){return new Promise((_0x5c81b7,_0x388e8a)=>{const _0x502981=_0x338a;let _0x2e2372=getKeyByPwd(_0x2d7565),_0x1dcb7d=crypto['createCipheriv'](algorithm,_0x2e2372,iv);_0x1dcb7d['on'](_0x502981(0x1de),_0x5592f5=>{_0x388e8a(_0x5592f5);});let _0x54086a=fs[_0x502981(0x1e3)](_0x44983a);_0x56c488[_0x502981(0x1ce)](_0x1dcb7d)[_0x502981(0x1ce)](_0x54086a),_0x1dcb7d['on']('end',()=>{_0x5c81b7(_0x44983a);});});},cryptoUtils[_0xf7b966(0x1d0)]=function(_0x4501ac,_0x1d4a52,_0x181c2d){return new Promise((_0x1aa4ea,_0x3d934e)=>{const _0x317946=_0x338a;let _0x42da62=getKeyByPwd(_0x4501ac),_0x1c1ca4=fs[_0x317946(0x1ea)](_0x1d4a52),_0x171581=crypto[_0x317946(0x1c8)](algorithm,_0x42da62,iv);_0x171581['on'](_0x317946(0x1e9),()=>{const _0x58edcc=_0x317946;_0x1c1ca4[_0x58edcc(0x1e9)]();}),_0x171581['on']('error',_0x1fc229=>{_0x3d934e(_0x1fc229);});let _0x598d6e=fs[_0x317946(0x1e3)](_0x181c2d);_0x1c1ca4[_0x317946(0x1ce)](_0x171581)['pipe'](_0x598d6e),_0x171581['on'](_0x317946(0x1d1),()=>{_0x1aa4ea(_0x181c2d);});});},cryptoUtils[_0xf7b966(0x1e2)]=function(_0x4a52d5,_0x578e8f,_0x19f789,_0x49115a){return new Promise((_0x4f7fbc,_0x39e726)=>{const _0x178ea0=_0x338a;let _0x5bb70f=getKeyByPwd(_0x4a52d5),_0x39557d=fs['createReadStream'](_0x578e8f);_0x39557d['on'](_0x178ea0(0x1d1),()=>{});let _0x4f6755=crypto[_0x178ea0(0x1e7)](algorithm,_0x5bb70f,iv);_0x4f6755['on'](_0x178ea0(0x1e9),()=>{const _0x4eaeba=_0x178ea0;_0x39557d[_0x4eaeba(0x1e9)]();}),_0x39557d[_0x178ea0(0x1ce)](_0x4f6755)[_0x178ea0(0x1ce)](_0x19f789,{'end':!![]}),_0x19f789['on'](_0x178ea0(0x1e1),()=>{const _0x3659d0=_0x178ea0;_0x4f7fbc(_0x3659d0(0x1e1));}),_0x4f6755['on'](_0x178ea0(0x1de),_0x429ace=>{const _0x3a13bd=_0x178ea0;_0x39e726(_0x429ace);if(_0x49115a)return _0x49115a[_0x3a13bd(0x1d3)](0x194)[_0x3a13bd(0x1d1)]();}),_0x19f789['on']('error',_0x56f145=>{const _0x42756e=_0x178ea0;_0x39e726(_0x56f145);if(_0x49115a)return _0x49115a[_0x42756e(0x1d3)](0x194)[_0x42756e(0x1d1)]();});});},cryptoUtils[_0xf7b966(0x1d6)]=function(_0x200978,_0xc01392){const _0x1ebfeb=_0xf7b966;let _0x23d838=getKeyByPwd(_0x200978),_0x134ef1=fs[_0x1ebfeb(0x1ea)](_0xc01392),_0x2d7913=crypto['createDecipheriv'](algorithm,_0x23d838,iv);_0x2d7913['on']('close',()=>{const _0x3041f8=_0x1ebfeb;_0x134ef1[_0x3041f8(0x1e9)]();});let _0x2c4663=_0x134ef1[_0x1ebfeb(0x1ce)](_0x2d7913);return _0x2c4663;},cryptoUtils['encryptString']=function(_0x1be35e,_0x16f735){return new Promise((_0x2b03ad,_0xe6b780)=>{const _0x15719d=_0x338a;let _0x4a942e=getKeyByPwd(_0x1be35e),_0x4e496e=crypto['createCipheriv'](algorithm,_0x4a942e,iv),_0x11b0ab=_0x4e496e['update'](_0x16f735,'utf-8',_0x15719d(0x1ca));_0x11b0ab+=_0x4e496e[_0x15719d(0x1e6)]('hex'),_0x2b03ad(_0x11b0ab);});},cryptoUtils[_0xf7b966(0x1db)]=function(_0x337275,_0x108c53){return new Promise((_0x5afd06,_0x784e8b)=>{const _0x9d53b5=_0x338a;let _0x2d0139=getKeyByPwd(_0x337275),_0x1602e9=crypto['createDecipheriv'](algorithm,_0x2d0139,iv);_0x1602e9['on']('error',_0x3a4ec6=>{const _0x56b346=_0x338a;console[_0x56b346(0x1d5)](_0x3a4ec6),_0x784e8b(_0x3a4ec6);});let _0x51a74b=_0x1602e9[_0x9d53b5(0x1cd)](_0x108c53,'hex','utf-8');_0x51a74b+=_0x1602e9[_0x9d53b5(0x1e6)](_0x9d53b5(0x1c9)),_0x5afd06(_0x51a74b);});},module[_0xf7b966(0x1d2)]=cryptoUtils;