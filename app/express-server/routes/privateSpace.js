const _0x38c8ad=_0x30d1;(function(_0x3b2834,_0x22a566){const _0x42091e=_0x30d1,_0x5d879c=_0x3b2834();while(!![]){try{const _0x5be4fd=parseInt(_0x42091e(0x78))/0x1+parseInt(_0x42091e(0x12f))/0x2*(-parseInt(_0x42091e(0x114))/0x3)+parseInt(_0x42091e(0xc3))/0x4*(-parseInt(_0x42091e(0xae))/0x5)+parseInt(_0x42091e(0xff))/0x6+-parseInt(_0x42091e(0xd2))/0x7*(-parseInt(_0x42091e(0xd3))/0x8)+-parseInt(_0x42091e(0x131))/0x9*(-parseInt(_0x42091e(0x132))/0xa)+-parseInt(_0x42091e(0x101))/0xb*(parseInt(_0x42091e(0xb4))/0xc);if(_0x5be4fd===_0x22a566)break;else _0x5d879c['push'](_0x5d879c['shift']());}catch(_0x4bcca9){_0x5d879c['push'](_0x5d879c['shift']());}}}(_0x2352,0xd74ca));let express=require(_0x38c8ad(0xc6)),router=express[_0x38c8ad(0xce)]();const Database=require('better-sqlite3');let dbPrivateSpaceTable=require('../../db/dbPrivateSpaceTable'),path=require(_0x38c8ad(0xcf)),fs=require('fs'),cryptoUtils=require('../utils/cryptoUtils');const config=require(_0x38c8ad(0xec));let privateSpaceUtils=require(_0x38c8ad(0xdd));var faststart=require('../utils/faststart'),exifUtil=require(_0x38c8ad(0x8b));let uploadUtil=require(_0x38c8ad(0xe1));const PassThrough=require(_0x38c8ad(0xfa))[_0x38c8ad(0x120)],{Readable}=require('stream');let sha256=require(_0x38c8ad(0xfc));const videoStreamUtil=require(_0x38c8ad(0x7d));let fileUtil=require('../utils/fileUtils');const folderSignString=_0x38c8ad(0x7e),folderSignFileName=_0x38c8ad(0xd0),configFolderName=_0x38c8ad(0x91),noCheckFileList=['.DS_Store'];let FFmpeg=require(_0x38c8ad(0xf7))[_0x38c8ad(0xab)];function _0x30d1(_0x13b07d,_0x7353a2){const _0x235207=_0x2352();return _0x30d1=function(_0x30d1b5,_0x3457e8){_0x30d1b5=_0x30d1b5-0x71;let _0x36a613=_0x235207[_0x30d1b5];return _0x36a613;},_0x30d1(_0x13b07d,_0x7353a2);}function _0x2352(){const _0x36a5eb=['Router','path','nascabconfigenc','returnErrMsg','14343xXiuQu','5816PjpjYK','encryptFileFromInputPipe','imgTypeList','private.configFileReadFail','from','parse','stat','updateSpaceName','UPDATE\x20private_space_index\x20SET\x20original_time=?,duration=?,size=?,stream_info=?\x20where\x20id=?','space\x20id\x20is\x20null','../utils/privateSpaceUtils','headers','push','spaceName','../utils/uploadUtils','/exitSpaceId','private.hasSameNameSpace','/deleteSpace','private.passwordIncorrect','getIndexById','tokenPwdEncryptKey','undefined','decryptFile','readdir','dealFFmpegPath','../../myConfig/config','checkStr','/deleteSpaceFiles','message','image','privateSpaceKey','video','indexOf','createIndex','mkdir','private.uploadErrTryAgain','../../libs/nasTrans','replace','pragma','stream','end','sha256','dbOther','log','8978628XFzDfI','filename','12494911cJAQuX','/regularUpload','post','streams','operationFail','sendFile','folder_path','toLowerCase','extname','targetFolderPath','encodeFilename','.mp4','create_uid','tiny-','uploadFile','journal_mode\x20=\x20WAL','all','\x27\x20where\x20id=','getTime','30CbxhDH','deleteSpaceToken','tiny','startsWith','private.spaceNameCantNull','genImageTinyFile','indexId','lastInsertRowid','pipe','stringify','ids','access','PassThrough','savePath','encryptFile','prepare','updateIndexField','/importSpace','folderPath','buffer','transSpcielFormatFromBuffer','private.onlyAdminCanDelete','over','../utils/sharpUtils','/updateSpaceName','ext','constants','60570nhKzoD','close','8266113HXTzbs','10vtGrUu','readFile','/addPrivateSpace','spacePwd','writeFile','getById','length','decodePath','778117JCppsT','CreateDate','UPDATE\x20private_space_index\x20SET\x20original_time=\x27','desc','folderNotExist','../../utils/videoStreamUtil','nascabisthebest','toString','private.spacePwdGtFour','count','Content-Disposition','get','encryptString','then','join','getBySpaceName','destroy','UPDATE\x20private_space_index\x20SET\x20tiny_path=\x27','json','exifr','query','space\x20id\x20is\x20invalid','run','W_OK','spaceToken','nascabconfig','concat','getAllIndexByWhere','app','genVideoTinyFile','createReadStream','getAll','send','private.spaceNameTooLong','currentUser','../../utils/transCodeUtil','other','utf-8','includes','err','../utils/uploadPrivateUtils','is_admin','overMode','START_WORKER_BG_TASK','streamToBuffer','orderField','error','getTokenObjByToken','attachment;\x20filename*=UTF-8\x27\x27','noWritePermission','getDurationFromStream','FFmpeg','getVideoOriginalTime','\x20order\x20by\x20','5QOktsg','/exportSpace','catch','tiny_path','exports','base64','24OTveai','unlink','spaceId','getPrivateDbPath','/checkPwd','ifExtIsSpecialFormat','needEmptyFolderPrivateSpace','EXPORT_PRIVATE_SPACE','sharpDealImg','private.spaceConfigFileBroken','/getFileList','ffprobe','\x20limit\x20','filename_enc','R_OK','4904468sMRYGy','body','DateTimeOriginal','express','download','size','.mov','status','data','changes','delete'];_0x2352=function(){return _0x36a5eb;};return _0x2352();}const uploadPrivateUtil=require(_0x38c8ad(0xa0)),privateSharpUtil=require(_0x38c8ad(0xdd)),sharpUtil=require(_0x38c8ad(0x12b)),transCodeUtil=require(_0x38c8ad(0x9b));let dbArr=[];function checkSpaceId(_0x561875,_0x3d298f){const _0xac6ccd=_0x38c8ad;let _0x58b8f9=_0x561875[_0xac6ccd(0xc4)]['spaceId']||_0x561875[_0xac6ccd(0x8c)]['spaceId'];if(!_0x58b8f9)return _0x561875['app'][_0xac6ccd(0xd1)](_0x3d298f,_0xac6ccd(0xdc));let _0x27cbb2=dbPrivateSpaceTable[_0xac6ccd(0x75)](_0x561875[_0xac6ccd(0x94)][_0xac6ccd(0xfd)],_0x58b8f9);if(!_0x27cbb2)return _0x561875['app']['returnErrMsg'](_0x3d298f,_0xac6ccd(0x8d));return!![];}function checkSpaceName(_0x30a082,_0x3599c5,_0x285097){const _0x2a26e6=_0x38c8ad;if(!_0x285097)return _0x30a082[_0x2a26e6(0x94)]['returnErrMsg'](_0x3599c5,_0x3599c5['__'](_0x2a26e6(0x118)));if(_0x285097[_0x2a26e6(0x76)]>0x1e)return _0x30a082[_0x2a26e6(0x94)][_0x2a26e6(0xd1)](_0x3599c5,_0x3599c5['__'](_0x2a26e6(0x99)));return!![];}function getPrivateIndexDb(_0x46c080){const _0x101ced=_0x38c8ad;let _0xf37dbd=config[_0x101ced(0xb7)](_0x46c080);for(let _0x408319 in dbArr){if(dbArr[_0x408319]['dbPath']==_0xf37dbd)return dbArr[_0x408319]['db'];}let _0x98da5c=new Database(_0xf37dbd,{});return _0x98da5c[_0x101ced(0xf9)](_0x101ced(0x110)),dbArr[_0x101ced(0xdf)]({'dbPath':_0xf37dbd,'db':_0x98da5c}),_0x98da5c;}router[_0x38c8ad(0x103)](_0x38c8ad(0x72),(_0x145d88,_0x5ae637,_0xfd0d13)=>{const _0x28111a=_0x38c8ad;let _0x1c1075=_0x145d88[_0x28111a(0xc4)][_0x28111a(0x126)],_0x3a82ac=_0x145d88[_0x28111a(0xc4)][_0x28111a(0xe0)],_0x37f36b=_0x145d88[_0x28111a(0x9a)],_0x1b48fe=_0x145d88[_0x28111a(0xc4)][_0x28111a(0x73)];if(checkSpaceName(_0x145d88,_0x5ae637,_0x3a82ac)!==!![])return;if(!_0x1b48fe||_0x1b48fe[_0x28111a(0x76)]<0x4)return _0x145d88[_0x28111a(0x94)][_0x28111a(0xd1)](_0x5ae637,_0x5ae637['__'](_0x28111a(0x80)));function _0x3218c9(){return new Promise((_0x536aeb,_0x244769)=>{const _0x3de102=_0x30d1;fs[_0x3de102(0xd9)](_0x1c1075,(_0x40987d,_0x598380)=>{const _0x51104f=_0x3de102;if(_0x40987d)return _0x244769(_0x5ae637['__'](_0x51104f(0xba)));if(_0x598380[_0x51104f(0xc8)]>0x400*0x400*0x400)return _0x145d88['app'][_0x51104f(0xd1)](_0x5ae637,_0x5ae637['__'](_0x51104f(0xba)));fs[_0x51104f(0xea)](_0x1c1075,(_0xd710e1,_0x1bbeea)=>{const _0x1f30b2=_0x51104f;for(let _0x181000 of _0x1bbeea){if(noCheckFileList['includes'](_0x181000)||_0x181000['startsWith']('.')||_0x181000[_0x1f30b2(0x117)]('@'))continue;return _0x244769(_0x5ae637['__']('needEmptyFolderPrivateSpace'));}_0x536aeb();});});});}fs[_0x28111a(0x11f)](_0x1c1075,fs[_0x28111a(0x12e)][_0x28111a(0xc2)]|fs['constants'][_0x28111a(0x8f)],_0x41ff7d=>{const _0x1c2c83=_0x28111a;if(_0x41ff7d)return _0x145d88[_0x1c2c83(0x94)][_0x1c2c83(0xd1)](_0x5ae637,_0x5ae637['__']('noWritePermission'));_0x3218c9()[_0x1c2c83(0x85)](()=>{const _0x308a58=_0x1c2c83;let _0x3be15f=dbPrivateSpaceTable[_0x308a58(0x87)](_0x145d88[_0x308a58(0x94)][_0x308a58(0xfd)],_0x3a82ac);if(_0x3be15f)return _0x145d88['app'][_0x308a58(0xd1)](_0x5ae637,_0x5ae637['__'](_0x308a58(0xe3)));let _0x4e7559=path[_0x308a58(0x86)](_0x1c1075,configFolderName);fs[_0x308a58(0xf5)](_0x4e7559,{'recursive':!![]},_0x3b65cb=>{const _0x3c4592=_0x308a58;if(_0x3b65cb)return _0x145d88[_0x3c4592(0x94)][_0x3c4592(0xd1)](_0x5ae637,_0x5ae637['__']('operationFail')+JSON[_0x3c4592(0x11d)](_0x3b65cb));let _0x32a06d=getPrivateIndexDb(_0x1c1075);dbPrivateSpaceTable['createIndexDb'](_0x32a06d,_0x1c1075),cryptoUtils[_0x3c4592(0x84)](_0x1b48fe,folderSignString)[_0x3c4592(0x85)](_0x184ed5=>{const _0x3020cc=_0x3c4592;let _0x36ecda=path[_0x3020cc(0x86)](_0x4e7559,folderSignFileName);fs[_0x3020cc(0x74)](_0x36ecda,_0x184ed5,_0x28eb96=>{const _0xc3429f=_0x3020cc;if(_0x28eb96)return _0x145d88[_0xc3429f(0x94)][_0xc3429f(0xd1)](_0x5ae637,_0x5ae637['__'](_0xc3429f(0x105))+JSON[_0xc3429f(0x11d)](_0x28eb96));return dbPrivateSpaceTable['create'](_0x145d88['app'][_0xc3429f(0xfd)],{'folder_path':_0x1c1075,'space_name':_0x3a82ac,'create_uid':_0x37f36b['id']}),_0x5ae637[_0xc3429f(0x8a)]({'code':0x0});});})[_0x3c4592(0xb0)](_0x1100dc=>{const _0x2c7968=_0x3c4592;return console[_0x2c7968(0xfe)](_0x2c7968(0xa6),_0x1100dc),_0x145d88[_0x2c7968(0x94)][_0x2c7968(0xd1)](_0x5ae637,_0x5ae637['__']('operationFail')+JSON[_0x2c7968(0x11d)](_0x1100dc));});});})['catch'](_0x2abbec=>{const _0x449b00=_0x1c2c83;return _0x145d88[_0x449b00(0x94)][_0x449b00(0xd1)](_0x5ae637,_0x2abbec);});});}),router[_0x38c8ad(0x103)]('/getAllSpace',(_0x2b2093,_0xa88e0,_0x2ea662)=>{const _0xed528a=_0x38c8ad;let _0x17b518=[];return _0x2b2093['currentUser'][_0xed528a(0xa1)]==0x1?_0x17b518=dbPrivateSpaceTable[_0xed528a(0x97)](_0x2b2093[_0xed528a(0x94)]['dbOther']):_0x17b518=dbPrivateSpaceTable['getAllByUid'](_0x2b2093[_0xed528a(0x94)][_0xed528a(0xfd)],_0x2b2093[_0xed528a(0x9a)]['id']),_0xa88e0[_0xed528a(0x8a)]({'code':0x0,'data':_0x17b518});});function checkSpacePwd(_0xfe8b82,_0x4a237b,_0x47d014){return new Promise((_0x3ddc53,_0x3b7b4e)=>{const _0x335e58=_0x30d1;_0x4a237b=Buffer[_0x335e58(0xd7)](_0x4a237b,_0x335e58(0xb3))['toString']();let _0x482097=path['join'](_0x47d014,configFolderName,folderSignFileName);fs['stat'](_0x482097,(_0x37145c,_0x3a980d)=>{const _0x57081a=_0x335e58;if(_0x37145c)return _0x3b7b4e(_0xfe8b82['__'](_0x57081a(0xd6)));fs[_0x57081a(0x71)](_0x482097,_0x57081a(0x9d),(_0x1c8903,_0x4046a7)=>{const _0x4e5601=_0x57081a;if(_0x1c8903)return _0x3b7b4e(_0xfe8b82['__']('private.configFileReadFail'));else cryptoUtils['decryptString'](_0x4a237b,_0x4046a7)[_0x4e5601(0x85)](_0x20f6a0=>{return _0x20f6a0==folderSignString?_0x3ddc53(_0x4a237b):_0x3b7b4e(_0xfe8b82['__']('private.passwordIncorrect'));})['catch'](_0x30a2eb=>{const _0x1c54ae=_0x4e5601;return console[_0x1c54ae(0xfe)]('error',_0x30a2eb),_0x3b7b4e(_0xfe8b82['__'](_0x1c54ae(0xe5)));});});});});}router[_0x38c8ad(0x103)](_0x38c8ad(0xb8),(_0x2ca44d,_0x5abcde,_0x4e0b45)=>{const _0x184486=_0x38c8ad;let _0x50095c=_0x2ca44d['body'][_0x184486(0xed)],_0x2beac4=_0x2ca44d[_0x184486(0xc4)][_0x184486(0xb6)],_0x442506=dbPrivateSpaceTable[_0x184486(0x75)](_0x2ca44d[_0x184486(0x94)][_0x184486(0xfd)],_0x2beac4);if(!_0x442506)return _0x2ca44d[_0x184486(0x94)]['returnErrMsg'](_0x5abcde,'error\x20space\x20id');fs[_0x184486(0xd9)](_0x442506[_0x184486(0x107)],(_0x208b7a,_0x5d6d5e)=>{const _0x3d5eb0=_0x184486;if(_0x208b7a)return _0x2ca44d[_0x3d5eb0(0x94)][_0x3d5eb0(0xd1)](_0x5abcde,_0x5abcde['__']('private.spaceFolderNotExist'));checkSpacePwd(_0x5abcde,_0x50095c,_0x442506[_0x3d5eb0(0x107)])[_0x3d5eb0(0x85)](_0x19d176=>{const _0x4ae467=_0x3d5eb0;let _0x19931e=sha256(new Date()[_0x4ae467(0x113)]()+_0x2beac4+_0x19d176);cryptoUtils['encryptString'](config[_0x4ae467(0xe7)],_0x19d176)[_0x4ae467(0x85)](_0x1d3133=>{const _0x21608f=_0x4ae467;return dbPrivateSpaceTable['createToken'](_0x2ca44d['app'][_0x21608f(0xfd)],{'space_id':_0x2beac4,'pwd':_0x1d3133,'token':_0x19931e}),_0x5abcde[_0x21608f(0x8a)]({'code':0x0,'token':_0x19931e});});})[_0x3d5eb0(0xb0)](_0x1f4a71=>{const _0x28e78d=_0x3d5eb0;return console[_0x28e78d(0xfe)](_0x28e78d(0xa6),_0x1f4a71),_0x2ca44d[_0x28e78d(0x94)][_0x28e78d(0xd1)](_0x5abcde,_0x1f4a71);});});});function ffprobeSync(_0x1abde8){return new Promise((_0x5744f1,_0x55a391)=>{const _0xf72fd7=_0x30d1;try{FFmpeg(transCodeUtil[_0xf72fd7(0xeb)](_0x1abde8))[_0xf72fd7(0xbf)]((_0x500d6b,_0x2f5ba0)=>{_0x500d6b?_0x55a391(_0x500d6b):_0x5744f1(_0x2f5ba0);});}catch(_0x5ac156){console[_0xf72fd7(0xfe)]('error',_0x5ac156),_0x55a391(_0x5ac156);}});}function deleteFile(_0x1ae812){fs['rm'](_0x1ae812,{'maxRetries':0xa,'retryDelay':0x3e8},_0x39dcd7=>{});}function uploadFail(_0x9a1b2,_0x338ec6,_0x26dece,_0x3f63a2){const _0x1788d0=_0x38c8ad;return deleteFile(_0x338ec6),_0x26dece[_0x1788d0(0x94)][_0x1788d0(0xd1)](_0x3f63a2,_0x3f63a2['__'](_0x1788d0(0xf6)));}function dealUploadImageOrFile(_0x593f72,_0x56f808,_0x511eb9,_0x49dd72,_0xd765da,_0xf9ec04,_0x8337cc,_0x138f95,_0x4bb92e){const _0x4e9403=_0x38c8ad;uploadPrivateUtil[_0x4e9403(0x10f)](_0x511eb9,_0x49dd72,_0xd765da,_0xf9ec04,_0x530299=>{const _0x17d83b=_0x4e9403;let _0x436867=_0x530299['path'],_0x51d664=cryptoUtils['decryptFileGetStream'](_0xf9ec04,_0x436867),_0x505b6b=dbPrivateSpaceTable[_0x17d83b(0xf4)](_0x593f72,{'filename':new Buffer[(_0x17d83b(0xd7))](_0x138f95)[_0x17d83b(0x7f)](_0x17d83b(0xb3)),'filename_enc':_0xd765da,'file_type':_0x8337cc,'ext':_0x4bb92e});if(_0x505b6b[_0x17d83b(0xcc)]<0x1)return uploadFail(_0x593f72,_0x436867,_0x511eb9,_0x49dd72);let _0x3a27da=_0x505b6b[_0x17d83b(0x11b)];_0x49dd72['json']({'code':0x0});let _0x504682=new Date()[_0x17d83b(0x113)]();if(_0x8337cc=='image'){var _0x3635c8=[];let _0x5cde22=new PassThrough()[_0x17d83b(0x11c)](_0x51d664);_0x5cde22['on'](_0x17d83b(0xcb),function(_0x3204c9){_0x3635c8['push'](_0x3204c9);}),_0x5cde22['on'](_0x17d83b(0xfb),function(){const _0x5958c9=_0x17d83b;var _0x5d9721=Buffer[_0x5958c9(0x92)](_0x3635c8);function _0x3affe8(){const _0x18b294=_0x5958c9;exifUtil[_0x18b294(0xd8)](_0x5d9721)[_0x18b294(0x85)](_0x18497a=>{const _0x1cf41e=_0x18b294;if(_0x18497a){let _0x324bd=_0x18497a[_0x1cf41e(0xc5)];_0x18497a[_0x1cf41e(0x79)]&&!_0x324bd&&(_0x324bd=_0x18497a[_0x1cf41e(0x79)]),_0x324bd&&(_0x504682=new Date(_0x324bd)['getTime'](),_0x593f72[_0x1cf41e(0x123)](_0x1cf41e(0x7a)+_0x504682+_0x1cf41e(0x112)+_0x3a27da)[_0x1cf41e(0x8e)]());}})[_0x18b294(0xb0)](_0x1c12de=>{});}privateSpaceUtils[_0x5958c9(0x119)](_0x4bb92e,_0x5d9721,_0x149158=>{const _0x3e06f3=_0x5958c9,_0x4e2cd7=Readable['from'](_0x149158);let _0x538d23=path[_0x3e06f3(0x86)](_0x56f808,_0xd765da);cryptoUtils[_0x3e06f3(0xd4)](_0xf9ec04,_0x4e2cd7,_0x538d23)[_0x3e06f3(0x85)](_0x36cc70=>{const _0x2cf8b9=_0x3e06f3;let _0x36587b=path[_0x2cf8b9(0x86)](configFolderName,_0x2cf8b9(0x116),_0xd765da);_0x593f72[_0x2cf8b9(0x123)](_0x2cf8b9(0x89)+_0x36587b+'\x27\x20where\x20id='+_0x3a27da)['run'](),_0x3affe8();});},_0x4124a5=>{_0x3affe8();});});}});}function dealUploadVideo(_0x46da4f,_0x74e9ce,_0xcdb9c1,_0x1f8fa7,_0x4bc060,_0x165e61,_0x190eb4,_0x2a66f4,_0x271f33,_0x3426cc,_0x3a765f){const _0x530006=_0x38c8ad;_0x4bc060[_0x530006(0x8c)][_0x530006(0x121)]=_0x1f8fa7,_0x4bc060['query'][_0x530006(0xa2)]=_0x530006(0x12a),uploadUtil[_0x530006(0x10f)](_0x4bc060,_0x165e61,![],!![],![],_0x2eb006=>{const _0x4fa3c1=_0x530006;let _0x2a2be5=_0x2eb006['path'],_0x1bbe83=path[_0x4fa3c1(0x86)](_0x2eb006['destination']);function _0x5dd919(_0xd2e6e8){ffprobeSync(_0x2a2be5)['then'](_0x30309b=>{const _0x2951c0=_0x30d1;let _0x7c103=0x0;_0x7c103=videoStreamUtil[_0x2951c0(0xaa)](_0x30309b);let _0x13e091=JSON['stringify'](_0x30309b[_0x2951c0(0x104)]),_0x1031f9=videoStreamUtil[_0x2951c0(0xac)](_0x30309b);fs[_0x2951c0(0xd9)](_0x2a2be5,(_0x32f9fd,_0x4cc7b5)=>{const _0x4f9fc6=_0x2951c0;if(_0x32f9fd){deleteFile(_0x2a2be5);return;}let _0xcf0c75=_0x4f9fc6(0xdb);_0x46da4f[_0x4f9fc6(0x123)](_0xcf0c75)['run'](_0x1031f9,parseInt(_0x7c103),_0x4cc7b5[_0x4f9fc6(0xc8)],_0x13e091,_0xd2e6e8);let _0x2ab9ec=_0x4f9fc6(0x10e)+Buffer[_0x4f9fc6(0xd7)](_0x3426cc)['toString']('base64');privateSpaceUtils[_0x4f9fc6(0x95)](_0x2a2be5,_0x1bbe83,_0x2ab9ec,_0x379646=>{const _0x1196b4=_0x4f9fc6;fs[_0x1196b4(0xd9)](_0x379646,(_0x711be6,_0x416227)=>{const _0x581016=_0x1196b4;if(_0x711be6){deleteFile(_0x2a2be5);return;}let _0x454fdd=path[_0x581016(0x86)](_0xcdb9c1,_0x190eb4);cryptoUtils[_0x581016(0x122)](_0x2a66f4,_0x379646,_0x454fdd)[_0x581016(0x85)](_0xbd49fa=>{const _0x568e4f=_0x581016;let _0x4b0ea0=path['join'](configFolderName,_0x568e4f(0x116),_0x190eb4);_0x46da4f[_0x568e4f(0x123)]('UPDATE\x20private_space_index\x20SET\x20tiny_path=\x27'+_0x4b0ea0+'\x27\x20where\x20id='+_0xd2e6e8)[_0x568e4f(0x8e)](),deleteFile(_0x379646),deleteFile(_0x2a2be5);});});},_0x3528a1=>{deleteFile(_0x2a2be5);});});})['catch'](_0x378f33=>{deleteFile(_0x2a2be5);});}function _0x35edd3(){const _0x41c110=_0x4fa3c1;let _0x398ca7=dbPrivateSpaceTable[_0x41c110(0xf4)](_0x46da4f,{'filename':new Buffer[(_0x41c110(0xd7))](_0x3426cc)[_0x41c110(0x7f)](_0x41c110(0xb3)),'filename_enc':_0x190eb4,'file_type':_0x271f33,'ext':_0x3a765f});return _0x398ca7['changes']<0x1?uploadFail(_0x46da4f,_0x2a2be5,_0x4bc060,_0x165e61):(_0x5dd919(_0x398ca7[_0x41c110(0x11b)]),_0x165e61[_0x41c110(0x8a)]({'code':0x0}));}function _0x552d74(_0x43208f,_0x53f172,_0x12c62a){const _0x3ebc3c=_0x4fa3c1;cryptoUtils[_0x3ebc3c(0x122)](_0x2a66f4,_0x43208f,_0x53f172)[_0x3ebc3c(0x85)](_0x4b09f1=>{_0x12c62a(_0x4b09f1);})[_0x3ebc3c(0xb0)](_0x491d10=>{console['log'](_0x491d10),uploadFail(_0x46da4f,_0x43208f,_0x4bc060,_0x165e61);});}let _0x11bd86=path[_0x4fa3c1(0x86)](_0x74e9ce[_0x4fa3c1(0x107)],_0x190eb4);if(_0x3a765f==_0x4fa3c1(0x10c)||_0x3a765f==_0x4fa3c1(0xc9)){var _0x59cd57=faststart[_0x4fa3c1(0x96)](_0x2a2be5,{'errorCallBack':_0x4a5161=>{_0x552d74(_0x2a2be5,_0x11bd86,_0x35edd3);}});_0x59cd57['on'](_0x4fa3c1(0x130),function(){const _0x52cafb=_0x4fa3c1;_0x59cd57[_0x52cafb(0x88)]();}),cryptoUtils[_0x4fa3c1(0xd4)](_0x2a66f4,_0x59cd57,_0x11bd86)[_0x4fa3c1(0x85)](_0x4456be=>{_0x35edd3();})['catch'](_0x467302=>{const _0x3fb7f1=_0x4fa3c1;console[_0x3fb7f1(0xfe)](_0x3fb7f1(0xa6),_0x467302),uploadFail(_0x46da4f,_0x2a2be5,_0x4bc060,_0x165e61);});}else _0x552d74(_0x2a2be5,_0x11bd86,_0x35edd3);});}router['post'](_0x38c8ad(0x102),function(_0x147af3,_0x2071db,_0x2962a0){const _0x5dde02=_0x38c8ad;let _0x77d8c=_0x147af3[_0x5dde02(0x8c)][_0x5dde02(0xb6)]||_0x147af3[_0x5dde02(0xc4)][_0x5dde02(0xb6)]||_0x147af3[_0x5dde02(0xde)]['space_id'],_0x403f1d=_0x147af3[_0x5dde02(0x8c)][_0x5dde02(0x100)]||_0x147af3['headers'][_0x5dde02(0x100)],_0x26cfe1=decodeURIComponent(_0x403f1d);_0x147af3['query'][_0x5dde02(0x10b)]&&(_0x26cfe1=fileUtil[_0x5dde02(0x77)](_0x147af3[_0x5dde02(0x8c)][_0x5dde02(0x10b)])),getPwdFromToken(_0x147af3,_0x2071db,_0x485681=>{const _0x326b90=_0x5dde02;let _0x2b438b=dbPrivateSpaceTable[_0x326b90(0x75)](_0x147af3['app'][_0x326b90(0xfd)],_0x77d8c);if(!_0x2b438b)return _0x147af3[_0x326b90(0x94)][_0x326b90(0xd1)](_0x2071db,_0x2071db['__']('private.noExist'));_0x147af3[_0x326b90(0x8c)][_0x326b90(0x121)]=_0x2b438b['folder_path'];let _0xc702d5=getPrivateIndexDb(_0x2b438b[_0x326b90(0x107)]),_0x218ced=dbPrivateSpaceTable['getIndexByFileName'](_0xc702d5,new Buffer[(_0x326b90(0xd7))](_0x26cfe1)[_0x326b90(0x7f)](_0x326b90(0xb3)));if(_0x218ced)return _0x147af3[_0x326b90(0x94)]['returnErrMsg'](_0x2071db,_0x2071db['__']('private.alreadyHasSameNameFile'));let _0x187198=path['extname'](_0x26cfe1)?path[_0x326b90(0x109)](_0x26cfe1)[_0x326b90(0x108)]():null,_0x3e52e5=_0x326b90(0x9c);if(_0x187198){if(config[_0x326b90(0xd5)][_0x326b90(0x9e)](_0x187198[_0x326b90(0x108)]())||config['rawImgTypeList']['includes'](_0x187198[_0x326b90(0x108)]()))_0x3e52e5=_0x326b90(0xf0);else config['videoTypeList'][_0x326b90(0x9e)](_0x187198[_0x326b90(0x108)]())&&(_0x3e52e5=_0x326b90(0xf2));}let _0x9f62d=path[_0x326b90(0x86)](_0x2b438b[_0x326b90(0x107)],configFolderName,_0x326b90(0x116)),_0x3d8a31=path[_0x326b90(0x86)](_0x2b438b[_0x326b90(0x107)],configFolderName,'temp');function _0xa40a98(){const _0x1c1f6b=_0x326b90;cryptoUtils[_0x1c1f6b(0x84)](_0x485681,_0x26cfe1)['then'](_0x1303a5=>{const _0x56ab42=_0x1c1f6b;if(_0x1303a5['length']>0xf0)return _0x147af3[_0x56ab42(0x94)]['returnErrMsg'](_0x2071db,_0x2071db['__']('private.fileNameTooLong'));_0x3e52e5==_0x56ab42(0xf2)?dealUploadVideo(_0xc702d5,_0x2b438b,_0x9f62d,_0x3d8a31,_0x147af3,_0x2071db,_0x1303a5,_0x485681,_0x3e52e5,_0x26cfe1,_0x187198):dealUploadImageOrFile(_0xc702d5,_0x9f62d,_0x147af3,_0x2071db,_0x1303a5,_0x485681,_0x3e52e5,_0x26cfe1,_0x187198);});}fs[_0x326b90(0xd9)](_0x9f62d,(_0x2f071b,_0x309304)=>{function _0x4d0eab(){const _0xa36592=_0x30d1;fs[_0xa36592(0xd9)](_0x3d8a31,(_0x55c726,_0x31e01e)=>{_0x55c726?fs['mkdir'](_0x3d8a31,{'recursive':!![]},_0x43a89d=>{_0xa40a98();}):_0xa40a98();});}_0x2f071b?fs['mkdir'](_0x9f62d,{'recursive':!![]},_0x386548=>{_0x4d0eab();}):_0x4d0eab();});});}),router[_0x38c8ad(0x103)](_0x38c8ad(0x125),(_0x44916b,_0x1cd92f,_0x1f3c38)=>{const _0xea52d5=_0x38c8ad;let _0x593c69=_0x44916b[_0xea52d5(0xc4)][_0xea52d5(0x126)],_0xa9a937=_0x44916b[_0xea52d5(0xc4)]['spaceName'],_0x4612cd=_0x44916b[_0xea52d5(0x9a)],_0x29d1c7=_0x44916b['body'][_0xea52d5(0x73)];if(!_0xa9a937)return _0x44916b[_0xea52d5(0x94)]['returnErrMsg'](_0x1cd92f,_0x1cd92f['__']('private.spaceNameCantNull'));let _0x412d7d=dbPrivateSpaceTable['getBySpaceName'](_0x44916b['app']['dbOther'],_0xa9a937);if(_0x412d7d)return _0x44916b[_0xea52d5(0x94)][_0xea52d5(0xd1)](_0x1cd92f,_0x1cd92f['__'](_0xea52d5(0xe3)));if(!_0x29d1c7)return _0x44916b['app']['returnErrMsg'](_0x1cd92f,_0x1cd92f['__'](_0xea52d5(0x80)));fs[_0xea52d5(0x11f)](_0x593c69,_0x40a622=>{const _0x531e32=_0xea52d5;if(_0x40a622)return _0x44916b[_0x531e32(0x94)][_0x531e32(0xd1)](_0x1cd92f,_0x1cd92f['__'](_0x531e32(0xa9)));checkSpacePwd(_0x1cd92f,_0x29d1c7,_0x593c69)[_0x531e32(0x85)](()=>{const _0x1eb2b5=_0x531e32;let _0x3dc76c=config[_0x1eb2b5(0xb7)](_0x593c69);fs[_0x1eb2b5(0xd9)](_0x3dc76c,(_0x332b71,_0x86fac1)=>{const _0x97c66d=_0x1eb2b5;if(_0x332b71)return _0x44916b['app'][_0x97c66d(0xd1)](_0x1cd92f,_0x1cd92f['__']('private.spaceConfigFileBroken'));return dbPrivateSpaceTable['create'](_0x44916b['app'][_0x97c66d(0xfd)],{'folder_path':_0x593c69,'space_name':_0xa9a937,'create_uid':_0x4612cd['id']}),_0x1cd92f[_0x97c66d(0x8a)]({'code':0x0});});})[_0x531e32(0xb0)](_0x282436=>{const _0x2777ae=_0x531e32;return _0x44916b[_0x2777ae(0x94)][_0x2777ae(0xd1)](_0x1cd92f,_0x282436);});});}),router[_0x38c8ad(0x103)](_0x38c8ad(0xaf),(_0x2fecc5,_0x5edd47,_0x1de629)=>{const _0x4fb9f1=_0x38c8ad;let _0x5a9014=_0x2fecc5['body'][_0x4fb9f1(0x126)],_0x76c7f0=_0x2fecc5[_0x4fb9f1(0xc4)][_0x4fb9f1(0x73)],_0x1c3a14=_0x2fecc5[_0x4fb9f1(0xc4)][_0x4fb9f1(0x10a)];if(!_0x76c7f0)return _0x2fecc5['app']['returnErrMsg'](_0x5edd47,_0x5edd47['__'](_0x4fb9f1(0x80)));fs['access'](_0x5a9014,fs['constants']['R_OK'],_0x1b0579=>{const _0x1e17e0=_0x4fb9f1;if(_0x1b0579)return _0x2fecc5[_0x1e17e0(0x94)]['returnErrMsg'](_0x5edd47,_0x5edd47['__'](_0x1e17e0(0xa9)));fs[_0x1e17e0(0x11f)](_0x1c3a14,fs[_0x1e17e0(0x12e)][_0x1e17e0(0x8f)],_0x346889=>{const _0x1d32a4=_0x1e17e0;if(_0x346889)return _0x2fecc5[_0x1d32a4(0x94)][_0x1d32a4(0xd1)](_0x5edd47,_0x5edd47['__'](_0x1d32a4(0xa9)));function _0x90e085(_0x420d79){const _0x5ce951=_0x1d32a4;cryptoUtils['encryptString'](config[_0x5ce951(0xf1)],_0x76c7f0)['then'](_0x49facf=>{const _0x565034=_0x5ce951;return _0x420d79[_0x565034(0x94)][_0x565034(0xfd)]['prepare']('INSERT\x20INTO\x20bg_task(task_type,task_json)\x20VALUES(?,?)')[_0x565034(0x8e)](_0x565034(0xbb),JSON['stringify']({'folderPath':_0x5a9014,'targetFolderPath':_0x1c3a14,'spacePwd':_0x49facf})),process[_0x565034(0x98)]({'type':_0x565034(0xa3)}),_0x5edd47[_0x565034(0x8a)]({'code':0x0});});}let _0x2c273e=path['join'](_0x5a9014,configFolderName,folderSignFileName);fs[_0x1d32a4(0xd9)](_0x2c273e,(_0x345a89,_0x29cf16)=>{_0x345a89?_0x90e085(_0x2fecc5):checkSpacePwd(_0x5edd47,_0x76c7f0,_0x5a9014)['then'](()=>{_0x90e085(_0x2fecc5);})['catch'](_0x1c21a8=>{const _0x53975b=_0x30d1;return console[_0x53975b(0xfe)](_0x1c21a8),_0x2fecc5[_0x53975b(0x94)][_0x53975b(0xd1)](_0x5edd47,_0x5edd47['__'](_0x53975b(0xe5)));});});});});}),router[_0x38c8ad(0x103)](_0x38c8ad(0xee),(_0x270ee2,_0x39cbcd,_0x54e62)=>{const _0x2501b5=_0x38c8ad;let _0x1e3ec3=_0x270ee2[_0x2501b5(0xc4)][_0x2501b5(0xb6)],_0x4bff66=_0x270ee2['body'][_0x2501b5(0x11e)];if(!_0x4bff66||_0x4bff66['length']<0x1)return _0x39cbcd[_0x2501b5(0xca)](0x194)[_0x2501b5(0xfb)]();let _0x491ac5=dbPrivateSpaceTable['getById'](_0x270ee2['app']['dbOther'],_0x1e3ec3);if(!_0x491ac5)return _0x39cbcd[_0x2501b5(0xca)](0x194)['end']();if(_0x270ee2['currentUser']['is_admin']!=0x1){if(_0x491ac5[_0x2501b5(0x10d)]!=_0x270ee2[_0x2501b5(0x9a)]['id'])return _0x39cbcd['json']({'code':0x1,'message':_0x39cbcd['__'](_0x2501b5(0x129))});}try{let _0x3c3235=getPrivateIndexDb(_0x491ac5[_0x2501b5(0x107)]),_0x4c0a89=JSON[_0x2501b5(0xd8)](_0x4bff66),_0x708b0a=0x0,_0x1b6cbe=[],_0xb475d7=0x0,_0x38358d=0x0;if(_0x4c0a89[_0x2501b5(0x76)]<0x1)return _0x39cbcd['json']({'code':0x0,'deleteList':_0x1b6cbe,'deleteCount':_0x708b0a,'errCount':_0xb475d7});for(let _0x52f1a4=0x0;_0x52f1a4<_0x4c0a89[_0x2501b5(0x76)];_0x52f1a4++){let _0x3870bf=dbPrivateSpaceTable['getIndexByWhere'](_0x3c3235,'\x20id='+_0x4c0a89[_0x52f1a4]);if(!_0x3870bf)return _0x270ee2[_0x2501b5(0x94)][_0x2501b5(0xd1)](_0x39cbcd,_0x39cbcd['__'](_0x2501b5(0x7c)));let _0x34e549=path[_0x2501b5(0x86)](_0x491ac5['folder_path'],_0x3870bf[_0x2501b5(0xc1)]);if(_0x3870bf['tiny_path']&&_0x3870bf[_0x2501b5(0xb1)]!=_0x2501b5(0xe8)){let _0x29b655=path[_0x2501b5(0x86)](_0x491ac5[_0x2501b5(0x107)],_0x3870bf[_0x2501b5(0xb1)]);try{fs[_0x2501b5(0xb5)](_0x29b655,_0x54fa3f=>{});}catch(_0x51d129){}}fs['unlink'](_0x34e549,_0x19d423=>{const _0x93cdf9=_0x2501b5;_0x38358d+=0x1;_0x19d423?(console[_0x93cdf9(0xfe)](_0x93cdf9(0x9f),_0x19d423[_0x93cdf9(0xef)]),_0xb475d7+=0x1):(_0x708b0a+=0x1,_0x1b6cbe[_0x93cdf9(0xdf)](_0x4c0a89[_0x52f1a4]));dbPrivateSpaceTable['deleteIndex'](_0x3c3235,_0x4c0a89[_0x52f1a4]);if(_0x38358d==_0x4c0a89['length'])return _0x39cbcd['json']({'code':0x0,'deleteList':_0x1b6cbe,'deleteCount':_0x708b0a,'errCount':_0xb475d7});});}}catch(_0x318715){return console['log'](_0x2501b5(0xa6),_0x318715),_0x39cbcd[_0x2501b5(0x8a)]({'code':0x1,'message':JSON[_0x2501b5(0x11d)](_0x318715)});}}),router[_0x38c8ad(0x103)](_0x38c8ad(0xe4),(_0x18b90a,_0x11c95c,_0x1266cd)=>{const _0x37544a=_0x38c8ad;if(checkSpaceId(_0x18b90a,_0x11c95c)!==!![])return;let _0x32b425=_0x18b90a[_0x37544a(0xc4)][_0x37544a(0xb6)],_0x311e3e=dbPrivateSpaceTable['getById'](_0x18b90a['app'][_0x37544a(0xfd)],_0x32b425);if(_0x18b90a[_0x37544a(0x9a)][_0x37544a(0xa1)]!=0x1){if(_0x311e3e['create_uid']!=_0x18b90a['currentUser']['id'])return _0x11c95c[_0x37544a(0x8a)]({'code':0x1,'message':_0x11c95c['__'](_0x37544a(0x129))});}return dbPrivateSpaceTable[_0x37544a(0xcd)](_0x18b90a[_0x37544a(0x94)][_0x37544a(0xfd)],_0x32b425),_0x11c95c['json']({'code':0x0});}),router[_0x38c8ad(0x103)](_0x38c8ad(0x12c),(_0x2c7aaf,_0xff1197,_0x3e97a6)=>{const _0x5c66ec=_0x38c8ad;let _0x3f6122=_0x2c7aaf[_0x5c66ec(0xc4)]['spaceName'],_0x145c95=_0x2c7aaf[_0x5c66ec(0xc4)]['spaceId'];if(checkSpaceId(_0x2c7aaf,_0xff1197)!==!![])return;if(checkSpaceName(_0x2c7aaf,_0xff1197,_0x3f6122)!==!![])return;let _0x38cf7c=dbPrivateSpaceTable[_0x5c66ec(0x75)](_0x2c7aaf[_0x5c66ec(0x94)][_0x5c66ec(0xfd)],_0x145c95);if(_0x2c7aaf['currentUser'][_0x5c66ec(0xa1)]!=0x1){if(_0x38cf7c[_0x5c66ec(0x10d)]!=_0x2c7aaf['currentUser']['id'])return _0xff1197[_0x5c66ec(0x8a)]({'code':0x1,'message':_0xff1197['__']('private.onlyAdminCanDelete')});}return dbPrivateSpaceTable[_0x5c66ec(0xda)](_0x2c7aaf['app'][_0x5c66ec(0xfd)],_0x3f6122,_0x145c95),_0xff1197[_0x5c66ec(0x8a)]({'code':0x0});}),router[_0x38c8ad(0x103)](_0x38c8ad(0xbe),(_0x24f933,_0x55b3c5,_0x19ed59)=>{const _0x327fa7=_0x38c8ad;let _0x4b00ba=_0x24f933[_0x327fa7(0xc4)][_0x327fa7(0xb6)];if(!_0x4b00ba)return _0x24f933[_0x327fa7(0x94)]['returnErrMsg'](_0x55b3c5,_0x327fa7(0xdc));let _0x1a0f97=dbPrivateSpaceTable['getById'](_0x24f933['app'][_0x327fa7(0xfd)],_0x4b00ba);if(!_0x1a0f97)return _0x24f933[_0x327fa7(0x94)]['returnErrMsg'](_0x55b3c5,'space\x20id\x20is\x20invalid');let _0x17caa6=config[_0x327fa7(0xb7)](_0x1a0f97[_0x327fa7(0x107)]);fs[_0x327fa7(0xd9)](_0x17caa6,(_0x33ed0b,_0x5088b6)=>{const _0x4560a6=_0x327fa7;if(_0x33ed0b)return _0x24f933[_0x4560a6(0x94)][_0x4560a6(0xd1)](_0x55b3c5,_0x55b3c5['__'](_0x4560a6(0xbd)));let _0x4793ee=_0x24f933['body'][_0x4560a6(0x81)]||0x64,_0x135449=_0x24f933[_0x4560a6(0xc4)]['offsetCount']||0x0,_0x3082b7=_0x24f933[_0x4560a6(0xc4)][_0x4560a6(0xa5)]||'id',_0x2cd8fa=_0x24f933[_0x4560a6(0xc4)]['orderType']||_0x4560a6(0x7b),_0x23847b=_0x24f933[_0x4560a6(0xc4)]['fileType'],_0x734aad=getPrivateIndexDb(_0x1a0f97[_0x4560a6(0x107)]),_0x14006a='';_0x23847b&&_0x23847b!=_0x4560a6(0x111)&&(_0x14006a+='\x20WHERE\x20file_type=\x27'+_0x23847b+'\x27');_0x14006a+=_0x4560a6(0xad)+_0x3082b7+'\x20'+_0x2cd8fa+_0x4560a6(0xc0)+_0x4793ee+'\x20offset\x20'+_0x135449;let _0x4cbfa5=dbPrivateSpaceTable[_0x4560a6(0x93)](_0x734aad,_0x14006a);return _0x55b3c5['json']({'code':0x0,'data':_0x4cbfa5});});});function getPwdFromToken(_0x52ab5f,_0x167b7b,_0x3199dc){const _0x3eb4cf=_0x38c8ad;let _0x18e6c9=_0x52ab5f[_0x3eb4cf(0x8c)][_0x3eb4cf(0x90)]||_0x52ab5f[_0x3eb4cf(0xc4)]['spaceToken']||_0x52ab5f[_0x3eb4cf(0xde)]['space_token'],_0x5ba285=dbPrivateSpaceTable[_0x3eb4cf(0xa7)](_0x52ab5f[_0x3eb4cf(0x94)]['dbOther'],_0x18e6c9);if(!_0x5ba285)return _0x167b7b['json']({'code':0x68});let _0x1d6dde=_0x5ba285['pwd'];cryptoUtils['decryptString'](config[_0x3eb4cf(0xe7)],_0x1d6dde)['then'](_0x14424a=>{_0x3199dc(_0x14424a);})[_0x3eb4cf(0xb0)](_0xae914=>{console['log'](_0xae914);});}router[_0x38c8ad(0x83)]('/getDecodeFile*',(_0x562517,_0x1f26d9,_0x18170b)=>{const _0x125ec0=_0x38c8ad;try{let _0x4209c2=_0x562517[_0x125ec0(0x8c)][_0x125ec0(0xb6)],_0x424f00=_0x562517[_0x125ec0(0x8c)][_0x125ec0(0x11a)],_0x1f17dc=_0x562517[_0x125ec0(0x8c)][_0x125ec0(0xc7)],_0x312d9a=_0x562517[_0x125ec0(0x8c)]['type'];if(!_0x4209c2||!_0x424f00)return _0x562517[_0x125ec0(0x94)][_0x125ec0(0xd1)](_0x1f26d9,'space/index\x20id\x20is\x20null');let _0x447f88=dbPrivateSpaceTable[_0x125ec0(0x75)](_0x562517['app'][_0x125ec0(0xfd)],_0x4209c2);if(!_0x447f88)return _0x562517['app'][_0x125ec0(0xd1)](_0x1f26d9,_0x125ec0(0x8d));getPwdFromToken(_0x562517,_0x1f26d9,_0x5a09e4=>{const _0x1aceed=_0x125ec0;let _0x47833d=getPrivateIndexDb(_0x447f88[_0x1aceed(0x107)]),_0x49d1db=dbPrivateSpaceTable[_0x1aceed(0xe6)](_0x47833d,_0x424f00);if(!_0x49d1db)return _0x1f26d9['status'](0x194)[_0x1aceed(0xfb)]();let _0x49c010='';_0x312d9a=='tiny'?_0x49c010=path[_0x1aceed(0x86)](_0x447f88['folder_path'],_0x49d1db[_0x1aceed(0xb1)]):_0x49c010=path[_0x1aceed(0x86)](_0x447f88['folder_path'],_0x49d1db[_0x1aceed(0xc1)]);if(_0x1f17dc==0x1)try{let _0xbebd9f=Buffer['from'](_0x49d1db['filename'],'base64')[_0x1aceed(0x7f)]();const _0x5c3a9a=encodeURIComponent(_0xbebd9f)[_0x1aceed(0xf8)](/%([0-9A-F]{2})/g,(_0x42b930,_0x2d7776)=>'%'+_0x2d7776['toUpperCase']());_0x1f26d9['setHeader'](_0x1aceed(0x82),_0x1aceed(0xa8)+_0x5c3a9a);}catch(_0x52efd8){console['log'](_0x52efd8);}fs[_0x1aceed(0xd9)](_0x49c010,(_0x19e96c,_0x3f0d3f)=>{const _0x3a1e80=_0x1aceed;if(_0x19e96c)return _0x1f26d9['status'](0x194)['end']();if(_0x49c010[_0x3a1e80(0xf3)](_0x3a1e80(0x116))==-0x1){let _0x4ccdba=dbPrivateSpaceTable[_0x3a1e80(0x124)](_0x47833d,'check_time',new Date()[_0x3a1e80(0x113)](),_0x424f00);}if(sharpUtil[_0x3a1e80(0xb9)](_0x49d1db['ext'])&&_0x312d9a!=_0x3a1e80(0x116)){let _0x3f0195=cryptoUtils['decryptFileGetStream'](_0x5a09e4,_0x49c010);fileUtil[_0x3a1e80(0xa4)](_0x3f0195)[_0x3a1e80(0x85)](_0x53d615=>{const _0x3abbc3=_0x3a1e80;sharpUtil[_0x3abbc3(0x128)](_0x49d1db['ext'],_0x53d615,(_0xb21951,_0x582d9c,_0x1e2f52)=>{const _0x2d6535=_0x3abbc3;sharpUtil[_0x2d6535(0xb9)](_0x49d1db[_0x2d6535(0x12d)][_0x2d6535(0x108)]())?sharpUtil[_0x2d6535(0xbc)](_0xb21951,null,![],null,_0x2d6535(0x127),null,_0x491ce2=>{const _0x6d0ea7=_0x2d6535;_0x1f26d9[_0x6d0ea7(0x98)](Buffer['from'](_0x491ce2));},_0x572ddd=>{const _0x146374=_0x2d6535;return console[_0x146374(0xfe)](_0x572ddd),_0x1f26d9['status'](0x194)[_0x146374(0xfb)]();},_0x582d9c,_0x1e2f52):typeof _0xb21951=='string'?(_0x1f26d9[_0x2d6535(0x106)](_0xb21951),_0x1f26d9['on'](_0x2d6535(0x130),()=>{_0x582d9c&&fs['rm'](_0xb21951,_0x2fed68=>{});})):_0x1f26d9[_0x2d6535(0x98)](_0xb21951);});});}else cryptoUtils[_0x3a1e80(0xe9)](_0x5a09e4,_0x49c010,_0x1f26d9,_0x1f26d9);return;});});}catch(_0x12aba1){return console[_0x125ec0(0xfe)](_0x12aba1),_0x1f26d9[_0x125ec0(0xca)](0x194)[_0x125ec0(0xfb)]();}}),router[_0x38c8ad(0x103)](_0x38c8ad(0xe2),(_0x16e16b,_0xfbec23,_0x259742)=>{const _0x3a6205=_0x38c8ad;try{return dbPrivateSpaceTable[_0x3a6205(0x115)](_0x16e16b[_0x3a6205(0x94)]['dbOther'],_0x16e16b['body'][_0x3a6205(0xb6)]),_0xfbec23[_0x3a6205(0xca)](0xc8)['end']();}catch(_0xef13a5){return console[_0x3a6205(0xfe)](_0xef13a5),_0xfbec23['status'](0x194)[_0x3a6205(0xfb)]();}}),module[_0x38c8ad(0xb2)]=router;