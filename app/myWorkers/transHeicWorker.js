function _0x2970(){const _0x1e105d=['432BraZNa','postMessage','libheif-js/wasm-bundle','uncaughtException','119xShwLv','1946890VkaUsJ','display','log','output','5570JJYLXZ','get_height','39222zSvdHm','Heic\x20worker\x20error:','error','9YMsAby','294594EEAIgO','close','421800zjrwgD','635838VGlBWP','输入数据没有获取成功','Heic\x20worker\x20stopped.','10040CItAfu','worker_threads','inputBuffer'];_0x2970=function(){return _0x1e105d;};return _0x2970();}const _0x36ca87=_0x20cb;(function(_0xbbe3e,_0x3e50c6){const _0x16ae56=_0x20cb,_0x30b764=_0xbbe3e();while(!![]){try{const _0x100250=parseInt(_0x16ae56(0x14a))/0x1+parseInt(_0x16ae56(0x15c))/0x2+parseInt(_0x16ae56(0x147))/0x3+-parseInt(_0x16ae56(0x14d))/0x4*(parseInt(_0x16ae56(0x156))/0x5)+parseInt(_0x16ae56(0x158))/0x6*(parseInt(_0x16ae56(0x151))/0x7)+-parseInt(_0x16ae56(0x146))/0x8+parseInt(_0x16ae56(0x15b))/0x9*(-parseInt(_0x16ae56(0x152))/0xa);if(_0x100250===_0x3e50c6)break;else _0x30b764['push'](_0x30b764['shift']());}catch(_0x352d14){_0x30b764['push'](_0x30b764['shift']());}}}(_0x2970,0x1b82e));function _0x20cb(_0x147875,_0x58b2e9){const _0x2970fd=_0x2970();return _0x20cb=function(_0x20cbb8,_0x3677b6){_0x20cbb8=_0x20cbb8-0x146;let _0x5f3913=_0x2970fd[_0x20cbb8];return _0x5f3913;},_0x20cb(_0x147875,_0x58b2e9);}const {parentPort,workerData}=require(_0x36ca87(0x14b)),libheif=require(_0x36ca87(0x14f));function returnResult(){const _0x41f695=_0x36ca87;parentPort[_0x41f695(0x14e)]({'code':0x0,'output':workerData[_0x41f695(0x155)]}),process['exit'](0x0);}if(workerData&&workerData[_0x36ca87(0x14c)]){const decoder=new libheif['HeifDecoder'](),data=decoder['decode'](workerData['inputBuffer']),image=data[0x0];if(!image)return returnResult();const width=image['get_width'](),height=image[_0x36ca87(0x157)]();image[_0x36ca87(0x153)]({'data':new Uint8ClampedArray(width*height*0x4),'width':width,'height':height},_0x2ac386=>{const _0x5d1135=_0x36ca87;if(!_0x2ac386||!_0x2ac386['data'])return workerData['output']=null,returnResult();return workerData[_0x5d1135(0x155)]=_0x2ac386,returnResult();});}else console[_0x36ca87(0x154)](_0x36ca87(0x148)),returnResult();parentPort['on'](_0x36ca87(0x15a),_0xc078f9=>{const _0xb89ac2=_0x36ca87;console[_0xb89ac2(0x15a)](_0xb89ac2(0x159),_0xc078f9),returnResult();}),parentPort['on'](_0x36ca87(0x15d),()=>{const _0xa36409=_0x36ca87;console[_0xa36409(0x154)](_0xa36409(0x149));}),process['on'](_0x36ca87(0x150),(_0xa98e9d,_0x57b70f)=>{const _0xcf35f7=_0x36ca87;console[_0xcf35f7(0x154)]('Error\x20occurred\x20heic\x20worker\x20',_0xa98e9d),returnResult();});