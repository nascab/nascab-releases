function _0x3c8b(){const _0x336cb1=['dealFilenameNumberAll','4ydjOdr','all','toUpperCase','33553daMaqM','62vMTkXL','exports','1228668PeLxWC','8841GeqdIZ','initials','680913dsrMox','prepare','../../utils/movieSeasonUtil','lastIndexOf','episode','104562JsESwz','343685eOrlew','filename','includes','1208128zRZPhL','substring','dealFirstLetterSingle','length','dealFirstLetterAll','test','node-pinyin','getFilenameNumber','match','SELECT\x20id,filename,is_tvplay\x20FROM\x20file_index_movie\x20WHERE\x20filename_number\x20is\x20null','extractEpisodeNumbers','movie_info_name'];_0x3c8b=function(){return _0x336cb1;};return _0x3c8b();}const _0x35f21f=_0x3c54;(function(_0xd4ab18,_0x17bbc7){const _0x46836a=_0x3c54,_0x45aee2=_0xd4ab18();while(!![]){try{const _0x4ec5c2=parseInt(_0x46836a(0xd1))/0x1+-parseInt(_0x46836a(0xd2))/0x2*(-parseInt(_0x46836a(0xb6))/0x3)+parseInt(_0x46836a(0xce))/0x4*(-parseInt(_0x46836a(0xbe))/0x5)+-parseInt(_0x46836a(0xbd))/0x6+parseInt(_0x46836a(0xb5))/0x7+-parseInt(_0x46836a(0xc1))/0x8+parseInt(_0x46836a(0xb8))/0x9;if(_0x4ec5c2===_0x17bbc7)break;else _0x45aee2['push'](_0x45aee2['shift']());}catch(_0x4cc952){_0x45aee2['push'](_0x45aee2['shift']());}}}(_0x3c8b,0x21e9f));let movieUtil={},pinyin=require(_0x35f21f(0xc7)),letterList=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];const movieSeasonUtil=require(_0x35f21f(0xba));movieUtil[_0x35f21f(0xc5)]=function(_0x5a6cb0){const _0x2977d2=_0x35f21f;let _0x7627d1='SELECT\x20id,filename,show_name,movie_info_name\x20FROM\x20file_index_movie\x20WHERE\x20filename_fl\x20is\x20null',_0xcd061e=_0x5a6cb0[_0x2977d2(0xb9)](_0x7627d1)[_0x2977d2(0xcf)]();for(let _0x1f0fcf in _0xcd061e){movieUtil['dealFirstLetterSingle'](_0x5a6cb0,_0xcd061e[_0x1f0fcf]);}};function isChinese(_0x24f037){const _0x526ace=_0x35f21f;var _0x4e9a14=/[^\\u4e00-\\u9fa5]/;return _0x4e9a14[_0x526ace(0xc6)](_0x24f037);}function _0x3c54(_0x45662c,_0x154582){const _0x3c8bb3=_0x3c8b();return _0x3c54=function(_0x3c54d9,_0x3fabeb){_0x3c54d9=_0x3c54d9-0xb4;let _0x84961e=_0x3c8bb3[_0x3c54d9];return _0x84961e;},_0x3c54(_0x45662c,_0x154582);}movieUtil[_0x35f21f(0xc8)]=function(_0x57edab){const _0x53d721=_0x35f21f;if(!_0x57edab)return 0x0;let _0x1032bb=_0x57edab[_0x53d721(0xbb)]('.');_0x1032bb!=-0x1&&(_0x57edab=_0x57edab[_0x53d721(0xc2)](0x0,_0x1032bb));if(!_0x57edab)return 0x0;let _0x57562a=_0x57edab[_0x53d721(0xc9)](/\d/g);_0x57562a=_0x57562a?_0x57562a['join'](''):0x0;_0x57562a&&(_0x57562a=parseInt(_0x57562a));let _0x4dd294=movieSeasonUtil[_0x53d721(0xcb)](_0x57edab);return _0x4dd294&&_0x4dd294[_0x53d721(0xbc)]&&_0x4dd294[_0x53d721(0xbc)]>=0x0&&(_0x57562a=_0x4dd294[_0x53d721(0xbc)]),_0x57562a;},movieUtil[_0x35f21f(0xcd)]=function(_0x47bb7a){const _0x2d85d6=_0x35f21f;let _0x23602f=_0x2d85d6(0xca),_0x513d7a=_0x47bb7a[_0x2d85d6(0xb9)](_0x23602f)['all']();for(let _0xe3f8ca of _0x513d7a){let _0x46ae9b=movieUtil['getFilenameNumber'](_0xe3f8ca[_0x2d85d6(0xbf)]);_0x47bb7a[_0x2d85d6(0xb9)]('UPDATE\x20file_index_movie\x20SET\x20filename_number=?\x20WHERE\x20id\x20=?')['run'](_0x46ae9b,_0xe3f8ca['id']);}},movieUtil[_0x35f21f(0xc3)]=function(_0x9cead,_0x1d3bdd){const _0x75321a=_0x35f21f;function _0x11f4a4(_0x4f1815){const _0xba15b7=_0x3c54;if(_0x4f1815&&_0x4f1815[_0xba15b7(0xc4)]>0x0){let _0x55e220=_0x4f1815[0x0];if(letterList[_0xba15b7(0xc0)](_0x55e220))return _0x55e220;else{if(isChinese(_0x55e220)){let _0x2281fe=pinyin(_0x55e220,{'style':_0xba15b7(0xb7)});return _0x2281fe&&_0x2281fe[_0xba15b7(0xc4)]>0x0&&_0x2281fe[0x0]['length']>0x0&&_0x2281fe[0x0][0x0][_0xba15b7(0xc4)]>0x0?_0x2281fe[0x0][0x0][0x0]:'#';}else return'#';}}else return'#';}let _0x15a3a3=_0x11f4a4(_0x1d3bdd[_0x75321a(0xbf)]?_0x1d3bdd[_0x75321a(0xbf)][_0x75321a(0xd0)]():'')['toUpperCase'](),_0x31a11a=_0x11f4a4(_0x1d3bdd['show_name']?_0x1d3bdd['show_name'][_0x75321a(0xd0)]():'')[_0x75321a(0xd0)](),_0x532043=_0x11f4a4(_0x1d3bdd[_0x75321a(0xcc)]?_0x1d3bdd[_0x75321a(0xcc)][_0x75321a(0xd0)]():'')[_0x75321a(0xd0)]();_0x9cead[_0x75321a(0xb9)]('UPDATE\x20file_index_movie\x20set\x20filename_fl=?,show_name_fl=?,movie_info_name_fl=?\x20where\x20id=?')['run'](_0x15a3a3,_0x31a11a,_0x532043,_0x1d3bdd['id']);},module[_0x35f21f(0xb4)]=movieUtil;