(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0618d39e"],{"0e89":function(t,e,o){},"25e1":function(t,e,o){"use strict";o("0e89")},"7daa":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAe1BMVEUAAAC7ydnA0N+7ydm7ydnDzt7t8fX3+fu7ydm7ydm7ydm7ydq7ydm9zdy7ydm7ydm7ytq8yti8ydq8ydu8ydvE7P+7ydi7ydm7ydm7ydi7yNm7ydm8y9zI2Ofn7PG6ydm9ydi6yNj////G0d7i6O/U3efO2OPK1eHBzdyA8PoJAAAAIXRSTlMAsBD34Bb+/sSllW5dI8i5jn93TjkE+vDr2qpjMwr+0EJ7BIgqAAAA6ElEQVQ4y62T2bLCIBBEB0I0+6Zx914HNfr/X6hFEmk0+OR565pTJDRAv6ZNkvbbPIyYS+mfnxQ/2S4940PJA7t8YvFMsGUVL+BDi32TFPzOqqya7GCEgL0II2wY6Lo7pNgICgWtr5ASI0R+oTZCjMLcETIj1K7QQeory1zhBik0Qo7CTJ9tUNSz8QnxIAhHgB7SQdiD8KchjGcmoewLCAWNCJ4ktecJK8xePxn0m3TbPmt94YGKLEu7i/lY1FoSsOMPGkLk/9RdQULFDtGR3si3DBSSPjhWr77WdTv9rlKhgkCJVNIveQChHEPEARpmVAAAAABJRU5ErkJggg=="},bef6:function(t,e,s){"use strict";s.r(e);s("14d9");var o=s("be3b"),i={computed:{getLoginImageUrl(){return localStorage.customLoginImage?o.a.getCustomFileUrl(localStorage.customLoginImage):s("952d")},getLogoImageUrl(){return localStorage.customLogoImage?o.a.getCustomFileUrl(localStorage.customLogoImage):s("9743")}},data(){return{btnCanUse:!0,formInline:{username:"",password:"",answer:"",question:""}}},mounted(){this.getInfo()},methods:{showForgetAnswer(){this.showVsAlertDialog(this.$t("common.alert"),this.$t("login.forgetAnswerAlert",{dbPath:"WINDOWS:C:\\Users\\USERNAME\\AppData\\Roaming\\nascab\\database      MAC:/Users/USERNAME/Library/Application Support/nascab/database"}))},goLogin(){this.$router.push({path:"/login"})},getInfo(){this.api.post("/api/usersApi/resetPwdInfo",this.formInline).then(t=>{this.$store.state.runInElectron&&t.data.username&&(this.formInline.username=t.data.username),t.data.question&&(this.formInline.question=t.data.question)}).catch(t=>{this.btnCanUse=!0})},handleSubmit(){return this.formInline.username.length<2?this.showVsNotification(this.$t("registerAdmin.usernameLengthLimit")):this.formInline.password.length<2?this.showVsNotification(this.$t("registerAdmin.passwordLengthLimit")):(this.btnCanUse=!1,void this.api.post("/api/usersApi/resetPwd",this.formInline).then(t=>{this.showVsAlertDialog(null,this.$t("common.operationSuccess"),()=>{this.$router.push({path:"/login"})})}).catch(t=>{3==t.code&&this.showVsAlertDialog(null,this.$t("resetPwd.answerIsWrong")),this.btnCanUse=!0}))}}},n=(s("25e1"),s("2877")),n=Object(n.a)(i,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"root"},[e.isMobile?e._e():o("img",{staticStyle:{position:"fixed",left:"60px",top:"40px",height:"32px","object-fit":"contain"},attrs:{src:e.getLogoImageUrl,mode:"widthFix"}}),o("div",{staticStyle:{display:"flex",height:"100%",width:"100%","align-items":"center","justify-content":"center"}},[o("img",{staticClass:"left-img",attrs:{src:e.getLoginImageUrl}}),o("div",{staticStyle:{display:"flex","flex-direction":"column","align-items":"center"}},[o("div",{staticStyle:{"font-size":"28px","margin-bottom":"50px"}},[e._v(e._s(e.$t("login.getPwdBack")))]),o("vs-tooltip",{scopedSlots:e._u([{key:"tooltip",fn:function(){return[o("div",{staticStyle:{"word-break":"break-all"}},[e._v(" "+e._s(e.$t("resetPwd.question"))+e._s(e.formInline.question)+" ")])]},proxy:!0}])},[o("vs-input",{attrs:{autocapitalize:"off",autocorrect:"off",type:"text",color:"#F6FAFF",placeholder:e.$t("resetPwd.placeholderAnswer")},scopedSlots:e._u([{key:"icon",fn:function(){return[o("img",{staticClass:"input-icon",attrs:{src:s("7daa")}})]},proxy:!0}]),model:{value:e.formInline.answer,callback:function(t){e.$set(e.formInline,"answer",t)},expression:"formInline.answer"}})],1),o("vs-input",{staticStyle:{"margin-top":"30px"},attrs:{autocapitalize:"off",autocorrect:"off",type:"text",color:"#F6FAFF",placeholder:e.$t("registerAdmin.placeholderUsername")},scopedSlots:e._u([{key:"icon",fn:function(){return[o("img",{staticClass:"input-icon",attrs:{src:s("8ec7")}})]},proxy:!0}]),model:{value:e.formInline.username,callback:function(t){e.$set(e.formInline,"username",t)},expression:"formInline.username"}}),o("vs-input",{staticStyle:{"margin-top":"30px"},attrs:{autocapitalize:"off",autocorrect:"off",type:"password",color:"#F6FAFF",placeholder:e.$t("resetPwd.placeholderPassword")},scopedSlots:e._u([{key:"icon",fn:function(){return[o("img",{staticClass:"input-icon",attrs:{src:s("4287")}})]},proxy:!0}]),model:{value:e.formInline.password,callback:function(t){e.$set(e.formInline,"password",t)},expression:"formInline.password"}}),o("vs-button",{staticStyle:{height:"54px","border-radius":"27px","font-size":"20px","margin-top":"30px",width:"280px"},on:{click:function(t){return e.handleSubmit()}}},[e._v(" "+e._s(e.$t("login.getPwdBack"))+" ")]),o("vs-button",{staticStyle:{"margin-top":"20px"},attrs:{border:""},on:{click:e.goLogin}},[e._v(e._s(e.$t("login.goLogin"))+" ")]),o("a",{staticStyle:{"margin-top":"10px"},on:{click:e.showForgetAnswer}},[e._v(e._s(e.$t("login.forgetAnswer")))])],1)])])},[],!1,null,"2dc112e1",null);e.default=n.exports}}]);