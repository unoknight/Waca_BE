(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-666931e6"],{"02a6":function(t,s,e){"use strict";e("c74e")},"0c77":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t._self._c;return s("div",{staticClass:"userInfoPage",attrs:{id:"userInfoPage"}},[s("div",{staticClass:"container mt-5 pb-5"},[s("div",{staticClass:"vx-row"},[s("div",{staticClass:"w-full"},[s("div",{staticClass:"panel"},[s("div",{staticClass:"panel-header"},[s("h3",{staticClass:"colorWhite"},[t._v("\n              "+t._s(t.$t("Profile_PersonalData")||"Personal data")+"\n            ")])]),s("div",{staticClass:"panel-body"},[s("div",{staticClass:"row"},[s("did",{staticClass:"col-md-6 col-lg-4"},[s("div",{staticClass:"flex mb-3 uploadAvatar align-items-center"},[s("div",[t.avatar?t.avatar?s("vs-avatar",{staticClass:"mr-4",attrs:{src:"".concat(t.dm,"api/auth/me/photo/").concat(t.avatar),size:"80px"}}):t._e():s("vs-avatar",{staticClass:"mr-4",attrs:{src:e("4ba8"),size:"80px"}})],1),s("div",[s("input",{ref:"update_avatar_input",staticClass:"hidden",attrs:{type:"file",name:"image",accept:"image/png, image/jpg, image/jpeg"},on:{change:function(s){return t.update_avatar(s.target.files)}}}),s("vs-button",{staticClass:"ml-4 button-rouner",attrs:{color:"#389a11"},on:{click:function(s){return t.$refs.update_avatar_input.click()}}},[t._v(t._s(t.$t("Profile_ChangePhoto")||"Change photo"))])],1)])])],1),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6 col-lg-4"},[s("vs-input",{staticClass:"w-full mt-2",attrs:{label:this.$t("Profile_EmailAddress")||"Email",disabled:""},model:{value:t.email,callback:function(s){t.email=s},expression:"email"}})],1),s("div",{staticClass:"col-md-6 col-lg-4"},[s("vs-input",{staticClass:"w-full mt-2",attrs:{label:this.$t("Profile_Nickname")||"Nickname",disabled:""},model:{value:t.nickName,callback:function(s){t.nickName=s},expression:"nickName"}})],1)]),s("div",{staticClass:"mt-2 row"},[s("div",{staticClass:"col-md-6 col-lg-4"},[s("vs-input",{staticClass:"w-full mt-2",attrs:{label:this.$t("Profile_FirstName")||"Email"},model:{value:t.frist_n,callback:function(s){t.frist_n=s},expression:"frist_n"}})],1),s("div",{staticClass:"col-md-6 col-lg-4"},[s("vs-input",{staticClass:"w-full mt-2",attrs:{label:this.$t("Profile_LastName")||"Email"},model:{value:t.last_n,callback:function(s){t.last_n=s},expression:"last_n"}})],1),1==t.is_phone?s("div",{staticClass:"col-md-6 col-lg-4"},[s("vs-input",{staticClass:"w-full mt-2",attrs:{label:this.$t("Profile_EmailSend")||"Email"},model:{value:t.email_send,callback:function(s){t.email_send=s},expression:"email_send"}})],1):t._e()]),s("div",{staticClass:"mt-2 row"},[s("vs-button",{staticClass:"mt-2 mb-2 ml-4 button-rouner",staticStyle:{"max-width":"140px"},attrs:{color:"#389a11"},on:{click:function(s){return s.stopPropagation(),t.changeAccountInfo()}}},[t._v(t._s(t.$t("Profile_ChangeInfo")||"Change password"))])],1)])])])]),s("div",{staticClass:"mt-4 vx-row"},[s("div",{staticClass:"w-full"},[s("div",{staticClass:"panel"},[s("div",{staticClass:"panel-header"},[s("h3",{staticClass:"colorWhite"},[t._v("\n              "+t._s(t.$t("Profile_AccountVerification")||"Account verification")+"\n            ")])]),s("div",{staticClass:"panel-body"},[s("div",{staticClass:"row"},[s("did",{staticClass:"col-md-4 col-lg-4"},[s("span",{staticClass:"colorWhite"},[t._v("\n                  "+t._s(t.$t("Profile_IDVerification")||"ID verification")+"\n                ")])]),s("div",{staticClass:"flex col-md-8 col-lg-8"},[s("p",{staticClass:"colorWhite1 flex-fill"},[t._v("\n                  "+t._s(t.$t("Profile_IDVerificationContent")||"To secure your assets, we have to verify your identity.Please fill in correct information, it cannot be edited once verified.")+"\n                ")]),0==t.getDataJson.verify?s("vs-button",{staticClass:"mt-2 mb-2 ml-4 button-rouner button-vefiry",attrs:{color:"#389a11"},on:{click:function(s){return s.stopPropagation(),t.showHoSoSetting()}}},[t._v(t._s(t.$t("Profile_VerifyNow")||"Verify now"))]):t._e()],1)],1)])])])]),s("div",{staticClass:"mt-4 vx-row"},[s("div",{staticClass:"w-full"},[s("div",{staticClass:"panel"},[s("div",{staticClass:"panel-header"},[s("h3",{staticClass:"colorWhite"},[t._v("\n              "+t._s(t.$t("Profile_Security")||"Security")+"\n            ")])]),s("div",{staticClass:"panel-body"},[s("div",{staticClass:"row"},[s("did",{staticClass:"col-md-4 col-lg-4"},[s("span",{staticClass:"colorWhite"},[t._v("\n                  "+t._s(t.$t("Profile_Password")||"Password")+"\n                ")])]),s("div",{staticClass:"flex col-md-8 col-lg-8"},[s("p",{staticClass:"colorWhite1 flex-fill"},[t._v("\n                  "+t._s(t.$t("Profile_PasswordContent")||"Would you like to change your password? Click the button below and change it.")+"\n                ")]),s("vs-button",{staticClass:"mt-2 mb-2 ml-4 button-rouner",attrs:{color:"#389a11"},on:{click:function(s){t.popupActiveChangePass=!0}}},[t._v(t._s(t.$t("Profile_ChangePassword")||"Change password"))])],1)],1),s("div",{staticClass:"row mt-3"},[s("did",{staticClass:"col-md-4 col-lg-4 align-center"},[s("span",{staticClass:"colorWhite"},[t._v("\n                  "+t._s(t.$t("Profile_2Telegram")||"2FA code")+"\n                ")])]),0==this.verified_telegram?s("div",{staticClass:"flex col-md-8 col-lg-8 align-center"},[s("p",{staticClass:"colorWhite1 flex-fill"},[t._v("\n                  "+t._s(t.$t("Profile_2TeleContent1")||"2FA code")+" "),s("a",{staticClass:"verify-link",attrs:{href:"https://t.me/wacatrade_account_bot",target:"_blank"}},[t._v("WacaTrade Authentication Bot")]),t._v(" "+t._s(t.$t("Profile_2TeleContent2")||"2FA code")+"\n                ")])]):t._e(),1==this.verified_telegram?s("div",{staticClass:"flex col-md-8 col-lg-8"},[s("p",{staticClass:"colorWhite1 flex-fill"},[t._v("\n                  "+t._s(t.$t("Profile_2TeleContentActive1")||"2FA code")+". "),s("a",{staticClass:"verify-link",attrs:{href:"https://t.me/wacatrade_account_bot",target:"_blank"}},[t._v("WacaTrade Authentication Bot")])]),s("vs-button",{staticClass:"mt-2 mb-2 ml-4 button-rouner",attrs:{size:"small",color:"#FA8128"}},[t._v("Actived")])],1):t._e()],1),s("div",{staticClass:"row mt-4"},[s("did",{staticClass:"col-md-4 col-lg-4"},[s("span",{staticClass:"colorWhite"},[t._v("\n                "+t._s(t.$t("Profile_2FaCodeMain")||"2FA code")+"\n              ")])]),s("div",{staticClass:"flex col-md-8 col-lg-8"},[t.DISABLE_2FA?s("p",{staticClass:"colorWhite1 flex-fill"},[t._v("\n                   "+t._s(t.$t("Profile_2FaCodeMain_Actived"))+"\n                ")]):s("p",{staticClass:"colorWhite1 flex-fill"},[t._v("\n                 "+t._s(t.$t("Profile_2FaCodeMain_Active"))+"\n                ")])])],1),s("div",{staticClass:"row mt-2"},[s("did",{staticClass:"col-md-4 col-lg-4"},[s("span",{staticClass:"colorWhite"},[t._v("\n                  "+t._s(t.$t("Profile_2FaCode")||"2FA code")+"\n                ")])]),s("div",{staticClass:"flex col-md-8 col-lg-8"},[s("p",{staticClass:"colorWhite1 flex-fill"},[t._v("\n                  "+t._s(t.$t("Profile_2FaCodeContent")||"2FA code")+"\n                ")]),t.DISABLE_2FA||0!=t.is_phone||""==t.email_send||2==this.active_type?t._e():s("div",{staticClass:"mt-2 mb-2 ml-4 info-switch"},[s("vs-switch",{attrs:{color:"success"},on:{change:t.on2FA},scopedSlots:t._u([{key:"off",fn:function(){return[t._v("\n                      Off\n                    ")]},proxy:!0},{key:"on",fn:function(){return[t._v("\n                      On\n                    ")]},proxy:!0}],null,!1,1201215273),model:{value:t.swi2Fa,callback:function(s){t.swi2Fa=s},expression:"swi2Fa"}})],1)])],1),s("div",{staticClass:"row"},[s("did",{staticClass:"col-md-4 col-lg-4"},[s("span",{staticClass:"colorWhite"},[t._v("\n                  "+t._s(t.$t("Profile_2FaCode_Telegram")||"2FA code")+"\n                ")])]),s("div",{staticClass:"flex col-md-8 col-lg-8"},[s("p",{staticClass:"colorWhite1 flex-fill"},[t._v("\n                  "+t._s(t.$t("Profile_2FaCodeContent_tele")||"2FA code")+"\n                ")]),t.DISABLE_2FA||1!=this.verified_telegram||1==this.active_type?t._e():s("div",{staticClass:"mt-2 mb-2 ml-4 info-switch"},[s("vs-switch",{attrs:{color:"success"},on:{change:t.on2FATele},scopedSlots:t._u([{key:"off",fn:function(){return[t._v("\n                      Off\n                    ")]},proxy:!0},{key:"on",fn:function(){return[t._v("\n                      On\n                    ")]},proxy:!0}],null,!1,1201215273),model:{value:t.swi2Fa,callback:function(s){t.swi2Fa=s},expression:"swi2Fa"}})],1)])],1)])])])])]),s("vs-popup",{attrs:{"background-color":"rgba(0,0,0,.6)","background-color-popup":t.colorxChangePass,title:t.$t("Profile_ChangePassword"),active:t.popupActiveChangePass},on:{"update:active":function(s){t.popupActiveChangePass=s}}},[s("div",{staticClass:"vx-vx-row"},[s("div",{staticClass:"w-full vx-col"},[s("vs-input",{staticClass:"w-full mt-2",attrs:{type:"password",label:t.$t("Profile_Old_Password"),maxlength:"20",name:"passOld"},model:{value:t.passOld,callback:function(s){t.passOld=s},expression:"passOld"}})],1),s("div",{staticClass:"w-full vx-col"},[s("vs-input",{staticClass:"w-full mt-2",attrs:{type:"password",label:t.$t("Profile_New_Password"),maxlength:"20",name:"passNew"},model:{value:t.passNew,callback:function(s){t.passNew=s},expression:"passNew"}})],1),s("div",{staticClass:"w-full vx-col"},[s("vs-input",{staticClass:"w-full mt-2",attrs:{type:"password",label:t.$t("Profile_ReNew_Password"),maxlength:"20",name:"passReNew"},model:{value:t.passRenew,callback:function(s){t.passRenew=s},expression:"passRenew"}})],1),s("div",{staticClass:"w-full mt-5 vx-col"},[t.getDataJson.c2fa||t.DISABLE_2FA?s("vs-button",{attrs:{color:"success",type:"border",disabled:t.disableChangePass},on:{click:function(s){return t.ChangeNewPass()}}},[t._v(t._s(t.$t("Aggree")))]):s("small",{staticClass:"italic red"},[t._v(t._s(t.$t("Profile_Required_2FA")))])],1)])]),s("ho-so-setting",{attrs:{isSidebarActive:t.SidebarHSSetting},on:{closeSidebar:t.toggleDataSidebar}}),s("vs-prompt",{attrs:{title:t.$t("Profile_Google_Title"),active:t.popupActive2FA,"buttons-hidden":!0},on:{close:t.closeGG2FA,"update:active":function(s){t.popupActive2FA=s}}},[s("VuePerfectScrollbar",{staticClass:"scroll-area--data-list-add-new",staticStyle:{height:"calc(var(--vh, 1vh) * 100 - 16px - 45px - 10px)"}},[s("google-auth")],1)],1),s("vs-prompt",{attrs:{title:t.$t("Profile_Tele_Title"),active:t.popupActive2FATele,"buttons-hidden":!0},on:{"update:active":function(s){t.popupActive2FATele=s}}},[s("VuePerfectScrollbar",{staticClass:"scroll-area--data-list-add-new",staticStyle:{height:"calc(var(--vh, 1vh) * 100 - 16px - 45px - 10px)"}},[s("tele-auth")],1)],1)],1)},i=[],c=e("9d63"),o=e.n(c),l=e("c5b9"),n=e("eef5"),r=e("b05c"),d=e("6611"),f=function(){var t=this,s=t._self._c;return t.isActive2FA?s("div",{staticClass:"m-10 gg"},[s("p",{staticClass:"description color-white-50 text-center mb-2"},[t._v("\n    "+t._s(t.$t("Profile_Tele_Actived"))+"\n  ")]),s("div",{staticClass:"qrcode"},[s("div",{staticClass:"vx-row backupkey"},[s("div",{staticClass:"w-full"},[s("div",{staticClass:"relative"},[s("vs-input",{staticClass:"w-full",attrs:{label:t.$t("Verify_code")},model:{value:t.codeActive,callback:function(s){t.codeActive=s},expression:"codeActive"}})],1),s("div",{staticClass:"text-right float-right",staticStyle:{"margin-top":"1rem"}},[s("vs-button",{staticClass:"vs-con-loading__container",attrs:{id:"button-with-loading",disabled:t.disSendCode,color:"#389a11",type:"filled"},on:{click:function(s){return s.stopPropagation(),t.Send2FACode()}}},[t._v(t._s(t.$t("Send_verify_code")))])],1)]),s("div",{staticClass:"w-full text-center",staticStyle:{"margin-top":"1rem"}},[s("vs-button",{staticClass:"w-64",attrs:{color:"rgb(62, 201, 214)",type:"filled"},on:{click:function(s){return t.clickUnVerify()}}},[t._v(t._s(t.$t("Google_Cancel")))])],1)])])]):s("div",{staticClass:"m-10 gg"},[s("p",{staticClass:"description color-white-50 text-center mb-2"},[t._v("\n    "+t._s(t.$t("Profile_Tele_Active_1"))),s("a",{staticClass:"verify-link",attrs:{href:"https://t.me/wacatrade_account_bot",target:"_blank"}},[t._v("WacaTrade Authentication Bot")]),t._v(" "+t._s(t.$t("Profile_Tele_Active_2"))+"\n  ")]),s("div",{staticClass:"qrcode"},[s("div",{staticClass:"loading .ld-loading"},[s("div",{staticClass:"loading__ring"},[s("svg",{staticStyle:{"enable-background":"new 0 0 100 100"},attrs:{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1",x:"0px",y:"0px",viewBox:"0 0 100 100","xml:space":"preserve"}},[s("path",{attrs:{d:"M85.5,42c-0.2-0.8-0.5-1.7-0.8-2.5c-0.3-0.9-0.7-1.6-1-2.3c-0.3-0.7-0.6-1.3-1-1.9c0.3,0.5,0.5,1.1,0.8,1.7  c0.2,0.7,0.6,1.5,0.8,2.3s0.5,1.7,0.8,2.5c0.8,3.5,1.3,7.5,0.8,12c-0.4,4.3-1.8,9-4.2,13.4c-2.4,4.2-5.9,8.2-10.5,11.2  c-1.1,0.7-2.2,1.5-3.4,2c-0.5,0.2-1.2,0.6-1.8,0.8s-1.3,0.5-1.9,0.8c-2.6,1-5.3,1.7-8.1,1.8l-1.1,0.1L53.8,84c-0.7,0-1.4,0-2.1,0  c-1.4-0.1-2.9-0.1-4.2-0.5c-1.4-0.1-2.8-0.6-4.1-0.8c-1.4-0.5-2.7-0.9-3.9-1.5c-1.2-0.6-2.4-1.2-3.7-1.9c-0.6-0.3-1.2-0.7-1.7-1.1  l-0.8-0.6c-0.3-0.1-0.6-0.4-0.8-0.6l-0.8-0.6L31.3,76l-0.2-0.2L31,75.7l-0.1-0.1l0,0l-1.5-1.5c-1.2-1-1.9-2.1-2.7-3.1  c-0.4-0.4-0.7-1.1-1.1-1.7l-1.1-1.7c-0.3-0.6-0.6-1.2-0.9-1.8c-0.2-0.5-0.6-1.2-0.8-1.8c-0.4-1.2-1-2.4-1.2-3.7  c-0.2-0.6-0.4-1.2-0.5-1.9c-0.1-0.6-0.2-1.2-0.3-1.8c-0.3-1.2-0.3-2.4-0.4-3.7c-0.1-1.2,0-2.5,0.1-3.7c0.2-1.2,0.3-2.4,0.6-3.5  c0.1-0.6,0.3-1.1,0.4-1.7l0.1-0.8l0.3-0.8c1.5-4.3,3.8-8,6.5-11c0.8-0.8,1.4-1.5,2.1-2.1c0.9-0.9,1.4-1.3,2.2-1.8  c1.4-1.2,2.9-2,4.3-2.8c2.8-1.5,5.5-2.3,7.7-2.8s4-0.7,5.2-0.6c0.6-0.1,1.1,0,1.4,0s0.4,0,0.4,0h0.1c2.7,0.1,5-2.2,5-5  c0.1-2.7-2.2-5-5-5c-0.2,0-0.2,0-0.3,0c0,0-0.2,0.1-0.6,0.1c-0.4,0-1,0-1.8,0.1c-1.6,0.1-4,0.4-6.9,1.2c-2.9,0.8-6.4,2-9.9,4.1  c-1.8,1-3.6,2.3-5.4,3.8C26,21.4,25,22.2,24.4,23c-0.2,0.2-0.4,0.4-0.6,0.6c-0.2,0.2-0.5,0.4-0.6,0.7c-0.5,0.4-0.8,0.9-1.3,1.4  c-3.2,3.9-5.9,8.8-7.5,14.3l-0.3,1l-0.2,1.1c-0.1,0.7-0.3,1.4-0.4,2.1c-0.3,1.5-0.4,2.9-0.5,4.5c0,1.5-0.1,3,0.1,4.5  c0.2,1.5,0.2,3,0.6,4.6c0.1,0.7,0.3,1.5,0.4,2.3c0.2,0.8,0.5,1.5,0.7,2.3c0.4,1.6,1.1,3,1.7,4.4c0.3,0.7,0.7,1.4,1.1,2.1  c0.4,0.8,0.8,1.4,1.2,2.1c0.5,0.7,0.9,1.4,1.4,2s0.9,1.3,1.5,1.9c1.1,1.3,2.2,2.7,3.3,3.5l1.7,1.6c0,0,0.1,0.1,0.1,0.1c0,0,0,0,0,0  c0,0,0,0,0,0l0.1,0.1l0.1,0.1h0.2l0.5,0.4l1,0.7c0.4,0.2,0.6,0.5,1,0.7l1.1,0.6c0.8,0.4,1.4,0.9,2.1,1.2c1.4,0.7,2.9,1.5,4.4,2  c1.5,0.7,3.1,1,4.6,1.5c1.5,0.3,3.1,0.7,4.7,0.8c1.6,0.2,3.1,0.2,4.7,0.2c0.8,0,1.6-0.1,2.4-0.1l1.2-0.1l1.1-0.1  c3.1-0.4,6.1-1.3,8.9-2.4c0.8-0.3,1.4-0.6,2.1-0.9s1.3-0.7,2-1.1c1.3-0.7,2.6-1.7,3.7-2.5c0.5-0.4,1-0.9,1.6-1.3l0.8-0.6l0.2-0.2  c0,0,0.1-0.1,0.1-0.1c0.1-0.1,0,0,0,0v0.1l0.1-0.1l0.4-0.4c0.5-0.5,1-1,1.5-1.5c0.3-0.3,0.5-0.5,0.8-0.8l0.7-0.8  c0.9-1.1,1.8-2.2,2.5-3.3c0.4-0.6,0.7-1.1,1.1-1.7c0.3-0.7,0.6-1.2,0.9-1.8c2.4-4.9,3.5-9.8,3.7-14.4C87.3,49.7,86.6,45.5,85.5,42z"}})])]),s("div",{staticClass:"loading__ring"},[s("svg",{staticStyle:{"enable-background":"new 0 0 100 100"},attrs:{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1",x:"0px",y:"0px",viewBox:"0 0 100 100","xml:space":"preserve"}},[s("path",{attrs:{d:"M85.5,42c-0.2-0.8-0.5-1.7-0.8-2.5c-0.3-0.9-0.7-1.6-1-2.3c-0.3-0.7-0.6-1.3-1-1.9c0.3,0.5,0.5,1.1,0.8,1.7  c0.2,0.7,0.6,1.5,0.8,2.3s0.5,1.7,0.8,2.5c0.8,3.5,1.3,7.5,0.8,12c-0.4,4.3-1.8,9-4.2,13.4c-2.4,4.2-5.9,8.2-10.5,11.2  c-1.1,0.7-2.2,1.5-3.4,2c-0.5,0.2-1.2,0.6-1.8,0.8s-1.3,0.5-1.9,0.8c-2.6,1-5.3,1.7-8.1,1.8l-1.1,0.1L53.8,84c-0.7,0-1.4,0-2.1,0  c-1.4-0.1-2.9-0.1-4.2-0.5c-1.4-0.1-2.8-0.6-4.1-0.8c-1.4-0.5-2.7-0.9-3.9-1.5c-1.2-0.6-2.4-1.2-3.7-1.9c-0.6-0.3-1.2-0.7-1.7-1.1  l-0.8-0.6c-0.3-0.1-0.6-0.4-0.8-0.6l-0.8-0.6L31.3,76l-0.2-0.2L31,75.7l-0.1-0.1l0,0l-1.5-1.5c-1.2-1-1.9-2.1-2.7-3.1  c-0.4-0.4-0.7-1.1-1.1-1.7l-1.1-1.7c-0.3-0.6-0.6-1.2-0.9-1.8c-0.2-0.5-0.6-1.2-0.8-1.8c-0.4-1.2-1-2.4-1.2-3.7  c-0.2-0.6-0.4-1.2-0.5-1.9c-0.1-0.6-0.2-1.2-0.3-1.8c-0.3-1.2-0.3-2.4-0.4-3.7c-0.1-1.2,0-2.5,0.1-3.7c0.2-1.2,0.3-2.4,0.6-3.5  c0.1-0.6,0.3-1.1,0.4-1.7l0.1-0.8l0.3-0.8c1.5-4.3,3.8-8,6.5-11c0.8-0.8,1.4-1.5,2.1-2.1c0.9-0.9,1.4-1.3,2.2-1.8  c1.4-1.2,2.9-2,4.3-2.8c2.8-1.5,5.5-2.3,7.7-2.8s4-0.7,5.2-0.6c0.6-0.1,1.1,0,1.4,0s0.4,0,0.4,0h0.1c2.7,0.1,5-2.2,5-5  c0.1-2.7-2.2-5-5-5c-0.2,0-0.2,0-0.3,0c0,0-0.2,0.1-0.6,0.1c-0.4,0-1,0-1.8,0.1c-1.6,0.1-4,0.4-6.9,1.2c-2.9,0.8-6.4,2-9.9,4.1  c-1.8,1-3.6,2.3-5.4,3.8C26,21.4,25,22.2,24.4,23c-0.2,0.2-0.4,0.4-0.6,0.6c-0.2,0.2-0.5,0.4-0.6,0.7c-0.5,0.4-0.8,0.9-1.3,1.4  c-3.2,3.9-5.9,8.8-7.5,14.3l-0.3,1l-0.2,1.1c-0.1,0.7-0.3,1.4-0.4,2.1c-0.3,1.5-0.4,2.9-0.5,4.5c0,1.5-0.1,3,0.1,4.5  c0.2,1.5,0.2,3,0.6,4.6c0.1,0.7,0.3,1.5,0.4,2.3c0.2,0.8,0.5,1.5,0.7,2.3c0.4,1.6,1.1,3,1.7,4.4c0.3,0.7,0.7,1.4,1.1,2.1  c0.4,0.8,0.8,1.4,1.2,2.1c0.5,0.7,0.9,1.4,1.4,2s0.9,1.3,1.5,1.9c1.1,1.3,2.2,2.7,3.3,3.5l1.7,1.6c0,0,0.1,0.1,0.1,0.1c0,0,0,0,0,0  c0,0,0,0,0,0l0.1,0.1l0.1,0.1h0.2l0.5,0.4l1,0.7c0.4,0.2,0.6,0.5,1,0.7l1.1,0.6c0.8,0.4,1.4,0.9,2.1,1.2c1.4,0.7,2.9,1.5,4.4,2  c1.5,0.7,3.1,1,4.6,1.5c1.5,0.3,3.1,0.7,4.7,0.8c1.6,0.2,3.1,0.2,4.7,0.2c0.8,0,1.6-0.1,2.4-0.1l1.2-0.1l1.1-0.1  c3.1-0.4,6.1-1.3,8.9-2.4c0.8-0.3,1.4-0.6,2.1-0.9s1.3-0.7,2-1.1c1.3-0.7,2.6-1.7,3.7-2.5c0.5-0.4,1-0.9,1.6-1.3l0.8-0.6l0.2-0.2  c0,0,0.1-0.1,0.1-0.1c0.1-0.1,0,0,0,0v0.1l0.1-0.1l0.4-0.4c0.5-0.5,1-1,1.5-1.5c0.3-0.3,0.5-0.5,0.8-0.8l0.7-0.8  c0.9-1.1,1.8-2.2,2.5-3.3c0.4-0.6,0.7-1.1,1.1-1.7c0.3-0.7,0.6-1.2,0.9-1.8c2.4-4.9,3.5-9.8,3.7-14.4C87.3,49.7,86.6,45.5,85.5,42z"}})])])]),s("div",{staticClass:"vx-row backupkey"},[s("div",{staticClass:"w-full"},[s("div",{staticClass:"relative"},[s("vs-input",{staticClass:"w-full",attrs:{label:t.$t("Verify_code")},model:{value:t.codeActive,callback:function(s){t.codeActive=s},expression:"codeActive"}})],1),s("div",{staticClass:"w-1/5 text-right float-right",staticStyle:{"margin-top":"1rem"}},[s("vs-button",{staticClass:"vs-con-loading__container",staticStyle:{"white-space":"nowrap"},attrs:{id:"button-with-loading",disabled:t.disSendCode,color:"#389a11",type:"filled"},on:{click:function(s){return s.stopPropagation(),t.Send2FACode()}}},[t._v(t._s(t.$t("Send_verify_code")))])],1)]),s("div",{staticClass:"w-full text-center",staticStyle:{"margin-top":"1rem"}},[s("vs-button",{staticClass:"w-64",attrs:{color:"#389a11",type:"filled"},on:{click:function(s){return t.clickVerify()}}},[t._v(t._s(t.$t("TwoFA_on")))])],1)])])])},v=[],u={data:function(){return{isActive2FA:!1,disSendCode:!1,MSLuu:"",linkBase64Img:"",code2FA:"",codeActive:"",passwordSend:"",ssDownSend:"Gửi mã",backgroundLoading:"primary",colorLoading:"#fff"}},methods:{Send2FACode:function(){return l["a"].sendTele2FA(),this.$vs.notify({text:this.$t("Google_Sended"),iconPack:"feather",icon:"icon-check",position:"top-right",color:"success"})},clickVerify:function(){var t=this;if(""==this.codeActive)return this.$vs.notify({text:this.$t("Account_Verification_Required"),iconPack:"feather",icon:"icon-check",position:"top-right",color:"danger"});var s={c:this.codeActive};l["a"].activeTele2FA(s).then((function(s){return 1==s.data.success?(t.codeActive="",r.c2fa=1,t.isActive2FA=!0,t.$vs.notify({text:t.$("Google_On_Success"),iconPack:"feather",icon:"icon-check",position:"top-right",color:"success"})):2==s.data.success?t.$vs.notify({text:t.$t("Profile_Tele_Code_Match"),iconPack:"feather",icon:"icon-check",position:"top-right",color:"danger"}):void(4==s.data.success&&(localStorage.removeItem("INFO"),localStorage.removeItem("tokenUser"),window.location.href=window.location.origin+"/login"))}))},clickUnVerify:function(){var t=this;if(""==this.codeActive)return this.$vs.notify({text:this.$t("Account_Verification_Required"),iconPack:"feather",icon:"icon-check",position:"top-right",color:"danger"});var s={c:this.codeActive};l["a"].unActiveTele2FA(s).then((function(s){return 1==s.data.success?(t.codeActive="",r.c2fa=0,t.isActive2FA=!1,t.createQRCode2FA(),t.$vs.notify({text:t.$t("Profile_Tele_Disable_Completed"),iconPack:"feather",icon:"icon-check",position:"top-right",color:"success"})):2==s.data.success?t.$vs.notify({text:t.$t("Profile_Tele_Code_Match"),iconPack:"feather",icon:"icon-check",position:"top-right",color:"danger"}):void(4==s.data.success&&(localStorage.removeItem("INFO"),localStorage.removeItem("tokenUser"),window.location.href=window.location.origin+"/login"))}))},createQRCode2FA:function(){var t=this;l["a"].createGG2FA().then((function(s){s.data.success&&(t.MSLuu=s.data.s,t.linkBase64Img=s.data.qr),4==s.data.success&&(localStorage.removeItem("INFO"),localStorage.removeItem("tokenUser"),window.location.href=window.location.origin+"/login")}))}},created:function(){r.c2fa?this.isActive2FA=!0:this.createQRCode2FA()}},h=u,p=(e("1419"),e("2557"),e("2877")),_=Object(p["a"])(h,f,v,!1,null,"4036eacf",null),g=_.exports,m=e("7dc5"),C={props:{data:{type:Object,default:function(){}}},components:{VuePerfectScrollbar:o.a,HoSoSetting:n["a"],GoogleAuth:d["a"],TeleAuth:g},data:function(){return{getDataJson:r,dm:m.domain,disableChangePass:!1,passOld:"",passNew:"",passRenew:"",avatar:"df.jpg",url_avatar:"",nickName:"",is_phone:!1,active_type:0,email:"",frist_n:"",last_n:"",email_send:"",code_2fa:"",swi2Fa:!1,num_secury:0,colorxChangePass:"#def1d1",popupActiveChangePass:!1,popupActive2FA:!1,popupActive2FATele:!1,SidebarHSSetting:!1,sidebarDataSetting:{},settings:{maxScrollbarLength:60,wheelSpeed:.6},DISABLE_2FA:!1,verified_telegram:0}},methods:{changeAccountInfo:function(){var t=this,s={email_send:this.email_send,first_name:this.frist_n,last_name:this.last_n};l["a"].changeAccountInfo(s).then((function(s){return t.$vs.notify({text:t.$t("Profile_Change_Success"),iconPack:"feather",icon:"icon-check",position:"top-right",color:"success"})}))},update_avatar:function(t){var s=this;this.urlPassFront=URL.createObjectURL(t[0]);var e=new FormData;e.append("image",t[0]),e.append("nick",r.displayName),l["a"].uploadAvatar(e).then((function(t){if(t.data.success)return s.$vs.notify({text:s.$t("Profile_Change_Avatar"),iconPack:"feather",icon:"icon-check",position:"top-right",color:"success"})}))},setInfo:function(){this.nickName=this.getDataJson.displayName,this.avatar=this.getDataJson.profile_image,this.email=this.getDataJson.email,this.frist_n=this.getDataJson.first_name,this.last_n=this.getDataJson.last_name,this.swi2Fa=this.getDataJson.c2fa,this.code_2fa=this.getDataJson.secret_2fa,this.num_secury=this.getDataJson.num_secu,this.is_phone=this.getDataJson.is_phone,this.active_type=this.getDataJson.active_type,this.verified_telegram=this.getDataJson.verified_telegram,this.email_send=this.getDataJson.email_send},showHoSoSetting:function(){this.toggleDataSidebar(!0)},toggleDataSidebar:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.SidebarHSSetting=t},on2FA:function(){this.swi2Fa?this.swi2Fa=!1:this.swi2Fa=!0,this.popupActive2FA=!0},on2FATele:function(){this.swi2Fa?this.swi2Fa=!1:this.swi2Fa=!0,this.popupActive2FATele=!0},closeGG2FA:function(){r.c2fa?this.swi2Fa=!0:this.swi2Fa=!1},closeGG2FATele:function(){r.c2fa?this.swi2Fa=!0:this.swi2Fa=!1},ChangeNewPass:function(){var t=this;if(""==this.passOld||""==this.passNew||""==this.passRenew)return this.$vs.notify({text:this.$t("Profile_ChangePassword_Required"),iconPack:"feather",icon:"icon-alert-circle",color:"warning",position:"top-right"});if(this.passNew!=this.passRenew)return this.$vs.notify({text:this.$t("Profile_ChangePassword_NotMatch"),iconPack:"feather",icon:"icon-alert-circle",color:"warning",position:"top-right"});var s={email:this.email,passOld:this.passOld,password:this.passNew,code_secure:this.num_secury};this.disableChangePass=!0,l["a"].changePassword2(s).then((function(s){return t.disableChangePass=!1,1==s.data.success?t.$vs.notify({text:t.$t("Profile_ChangePassword_Success"),iconPack:"feather",icon:"icon-check",position:"top-right",color:"success"}):0==s.data.success?t.$vs.notify({text:t.$t("Profile_ChangePassword_Wrong"),iconPack:"feather",icon:"icon-check",position:"top-right",color:"danger"}):3==s.data.success?t.$vs.notify({text:t.$t("Profile_ChangePassword_Error"),iconPack:"feather",icon:"icon-check",position:"top-right",color:"danger"}):void 0}))}},created:function(){var t=this;if(this.getDataJson.email)this.setInfo();else var s=this.$watch("getDataJson.email",(function(){t.setInfo(),s()}))}},w=C,b=(e("e428"),e("02a6"),e("2def"),e("f1cc"),Object(p["a"])(w,a,i,!1,null,"09aef6bc",null));s["default"]=b.exports},1419:function(t,s,e){"use strict";e("24d3")},"24d3":function(t,s,e){},2557:function(t,s,e){"use strict";e("35df")},"2def":function(t,s,e){"use strict";e("ca32")},"35df":function(t,s,e){},"409b8":function(t,s,e){},b05c:function(t){t.exports=JSON.parse('{"balance":0,"blLive":0,"blDemo":0,"Notify":0,"isAccount":0,"uid":"","upid":null,"email":"","profile_image":"","displayName":"","uidLive":"","uidDemo":"","vip":0,"vip_lv":1,"so_cmnd":"","pen_commiss":0,"ref":"","c2fa":0,"id_front":"","id_back":"","first_name":"","last_name":"","verify":"","num_secu":"","country":"","mkt":0,"countDown":30,"textTimeDown":"Hãy đặt lệnh","is_expert":0,"is_phone":false,"active_type":"","verified_telegram":0,"email_send":""}')},c452:function(t,s,e){},c74e:function(t,s,e){},ca32:function(t,s,e){},e428:function(t,s,e){"use strict";e("409b8")},f1cc:function(t,s,e){"use strict";e("c452")}}]);