(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-de6c5dd4"],{"45d9":function(t,e,s){},"5c73":function(t,e,s){t.exports=s.p+"img/waca.d0aa97f7.jpg"},9685:function(t,e,s){},a092:function(t,e,s){"use strict";s.r(e);s("c5f6");var a=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"copy-trade"}},[e("div",{staticClass:"vg-dard tab-margin"},[t.showSuper?e("vs-tabs",{attrs:{alignment:"fixed",color:"#e3b602"},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[e("vs-tab",{attrs:{label:this.$t("CopyTrade_Setting_TabTitle")}},[e("div",{staticClass:"setting",staticStyle:{width:"100%"}},[e("h3",{staticClass:"setting-title"},[t._v(t._s(t.$t("CopyTrade_Super_Title")||"FOLLOW EXPERT"))]),e("vs-row",[e("vs-col",{attrs:{"vs-w":"6","vs-sm":"12"}},[e("div",{staticClass:"setting-warp"},[e("div",{staticClass:"setting-input",staticStyle:{"margin-top":"25px"}},[e("span",[t._v(t._s(t.$t("CopyTrade_Super_Min1")||"Day Lose Amount"))]),e("v-select",{staticClass:"select-setting",attrs:{options:t.superAccountOptions,reduce:function(t){return t.value},label:"text"},model:{value:t.super_type,callback:function(e){t.super_type=e},expression:"super_type"}})],1),e("div",{staticClass:"setting-input",staticStyle:{"margin-top":"25px"}},[e("span",[t._v(t._s(t.$t("CopyTrade_Super_Account_Recieved")||"Amount bet"))]),e("label",[e("div",{staticClass:"input-container"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.super_account_recieved,expression:"super_account_recieved"}],attrs:{type:"text"},domProps:{value:t.super_account_recieved},on:{input:function(e){e.target.composing||(t.super_account_recieved=e.target.value)}}})])])]),e("div",{staticStyle:{"margin-top":"30px"}},[e("vs-button",{staticStyle:{width:"100%"},attrs:{disabled:!t.super_active,color:"warning",type:"border"},on:{click:t.saveSuperExpertSettings}},[t._v(t._s(t.$t("CopyTrade_Setting_Save")||"Save"))])],1)])]),e("vs-col",{attrs:{"vs-w":"6","vs-sm":"12"}},[e("div",{staticClass:"setting-warp"},[e("div",{staticClass:"setting-input",staticStyle:{"margin-top":"25px"}},[e("span",[t._v(t._s(t.$t("CopyTrade_Super_Account_Content")||"Amount bet"))]),e("label",[e("div",{staticClass:"input-container"},[e("vs-textarea",{attrs:{type:"text"},model:{value:t.super_account_content,callback:function(e){t.super_account_content=e},expression:"super_account_content"}})],1)])]),e("div",{staticStyle:{"margin-top":"30px"}},[e("vs-button",{staticStyle:{width:"100%"},attrs:{color:"warning",type:"border"},on:{click:t.saveSuperExpertContent}},[t._v(t._s(t.$t("CopyTrade_Setting_Save")||"Save"))])],1)])])],1)],1)]),e("vs-tab",{attrs:{label:this.$t("CopyTrade_Follow_Title")}},[e("div",{staticStyle:{width:"100%"}},[e("div",{staticClass:"latest-winner-list",class:{"ld-loading":t.tableLoading}},[e("div",{staticClass:"loading"},[e("div",{staticClass:"loading__ring"},[e("svg",{staticStyle:{"enable-background":"new 0 0 100 100"},attrs:{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1",x:"0px",y:"0px",viewBox:"0 0 100 100","xml:space":"preserve"}},[e("path",{attrs:{d:"M85.5,42c-0.2-0.8-0.5-1.7-0.8-2.5c-0.3-0.9-0.7-1.6-1-2.3c-0.3-0.7-0.6-1.3-1-1.9c0.3,0.5,0.5,1.1,0.8,1.7  c0.2,0.7,0.6,1.5,0.8,2.3s0.5,1.7,0.8,2.5c0.8,3.5,1.3,7.5,0.8,12c-0.4,4.3-1.8,9-4.2,13.4c-2.4,4.2-5.9,8.2-10.5,11.2  c-1.1,0.7-2.2,1.5-3.4,2c-0.5,0.2-1.2,0.6-1.8,0.8s-1.3,0.5-1.9,0.8c-2.6,1-5.3,1.7-8.1,1.8l-1.1,0.1L53.8,84c-0.7,0-1.4,0-2.1,0  c-1.4-0.1-2.9-0.1-4.2-0.5c-1.4-0.1-2.8-0.6-4.1-0.8c-1.4-0.5-2.7-0.9-3.9-1.5c-1.2-0.6-2.4-1.2-3.7-1.9c-0.6-0.3-1.2-0.7-1.7-1.1  l-0.8-0.6c-0.3-0.1-0.6-0.4-0.8-0.6l-0.8-0.6L31.3,76l-0.2-0.2L31,75.7l-0.1-0.1l0,0l-1.5-1.5c-1.2-1-1.9-2.1-2.7-3.1  c-0.4-0.4-0.7-1.1-1.1-1.7l-1.1-1.7c-0.3-0.6-0.6-1.2-0.9-1.8c-0.2-0.5-0.6-1.2-0.8-1.8c-0.4-1.2-1-2.4-1.2-3.7  c-0.2-0.6-0.4-1.2-0.5-1.9c-0.1-0.6-0.2-1.2-0.3-1.8c-0.3-1.2-0.3-2.4-0.4-3.7c-0.1-1.2,0-2.5,0.1-3.7c0.2-1.2,0.3-2.4,0.6-3.5  c0.1-0.6,0.3-1.1,0.4-1.7l0.1-0.8l0.3-0.8c1.5-4.3,3.8-8,6.5-11c0.8-0.8,1.4-1.5,2.1-2.1c0.9-0.9,1.4-1.3,2.2-1.8  c1.4-1.2,2.9-2,4.3-2.8c2.8-1.5,5.5-2.3,7.7-2.8s4-0.7,5.2-0.6c0.6-0.1,1.1,0,1.4,0s0.4,0,0.4,0h0.1c2.7,0.1,5-2.2,5-5  c0.1-2.7-2.2-5-5-5c-0.2,0-0.2,0-0.3,0c0,0-0.2,0.1-0.6,0.1c-0.4,0-1,0-1.8,0.1c-1.6,0.1-4,0.4-6.9,1.2c-2.9,0.8-6.4,2-9.9,4.1  c-1.8,1-3.6,2.3-5.4,3.8C26,21.4,25,22.2,24.4,23c-0.2,0.2-0.4,0.4-0.6,0.6c-0.2,0.2-0.5,0.4-0.6,0.7c-0.5,0.4-0.8,0.9-1.3,1.4  c-3.2,3.9-5.9,8.8-7.5,14.3l-0.3,1l-0.2,1.1c-0.1,0.7-0.3,1.4-0.4,2.1c-0.3,1.5-0.4,2.9-0.5,4.5c0,1.5-0.1,3,0.1,4.5  c0.2,1.5,0.2,3,0.6,4.6c0.1,0.7,0.3,1.5,0.4,2.3c0.2,0.8,0.5,1.5,0.7,2.3c0.4,1.6,1.1,3,1.7,4.4c0.3,0.7,0.7,1.4,1.1,2.1  c0.4,0.8,0.8,1.4,1.2,2.1c0.5,0.7,0.9,1.4,1.4,2s0.9,1.3,1.5,1.9c1.1,1.3,2.2,2.7,3.3,3.5l1.7,1.6c0,0,0.1,0.1,0.1,0.1c0,0,0,0,0,0  c0,0,0,0,0,0l0.1,0.1l0.1,0.1h0.2l0.5,0.4l1,0.7c0.4,0.2,0.6,0.5,1,0.7l1.1,0.6c0.8,0.4,1.4,0.9,2.1,1.2c1.4,0.7,2.9,1.5,4.4,2  c1.5,0.7,3.1,1,4.6,1.5c1.5,0.3,3.1,0.7,4.7,0.8c1.6,0.2,3.1,0.2,4.7,0.2c0.8,0,1.6-0.1,2.4-0.1l1.2-0.1l1.1-0.1  c3.1-0.4,6.1-1.3,8.9-2.4c0.8-0.3,1.4-0.6,2.1-0.9s1.3-0.7,2-1.1c1.3-0.7,2.6-1.7,3.7-2.5c0.5-0.4,1-0.9,1.6-1.3l0.8-0.6l0.2-0.2  c0,0,0.1-0.1,0.1-0.1c0.1-0.1,0,0,0,0v0.1l0.1-0.1l0.4-0.4c0.5-0.5,1-1,1.5-1.5c0.3-0.3,0.5-0.5,0.8-0.8l0.7-0.8  c0.9-1.1,1.8-2.2,2.5-3.3c0.4-0.6,0.7-1.1,1.1-1.7c0.3-0.7,0.6-1.2,0.9-1.8c2.4-4.9,3.5-9.8,3.7-14.4C87.3,49.7,86.6,45.5,85.5,42z"}})])]),e("div",{staticClass:"loading__ring"},[e("svg",{staticStyle:{"enable-background":"new 0 0 100 100"},attrs:{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1",x:"0px",y:"0px",viewBox:"0 0 100 100","xml:space":"preserve"}},[e("path",{attrs:{d:"M85.5,42c-0.2-0.8-0.5-1.7-0.8-2.5c-0.3-0.9-0.7-1.6-1-2.3c-0.3-0.7-0.6-1.3-1-1.9c0.3,0.5,0.5,1.1,0.8,1.7  c0.2,0.7,0.6,1.5,0.8,2.3s0.5,1.7,0.8,2.5c0.8,3.5,1.3,7.5,0.8,12c-0.4,4.3-1.8,9-4.2,13.4c-2.4,4.2-5.9,8.2-10.5,11.2  c-1.1,0.7-2.2,1.5-3.4,2c-0.5,0.2-1.2,0.6-1.8,0.8s-1.3,0.5-1.9,0.8c-2.6,1-5.3,1.7-8.1,1.8l-1.1,0.1L53.8,84c-0.7,0-1.4,0-2.1,0  c-1.4-0.1-2.9-0.1-4.2-0.5c-1.4-0.1-2.8-0.6-4.1-0.8c-1.4-0.5-2.7-0.9-3.9-1.5c-1.2-0.6-2.4-1.2-3.7-1.9c-0.6-0.3-1.2-0.7-1.7-1.1  l-0.8-0.6c-0.3-0.1-0.6-0.4-0.8-0.6l-0.8-0.6L31.3,76l-0.2-0.2L31,75.7l-0.1-0.1l0,0l-1.5-1.5c-1.2-1-1.9-2.1-2.7-3.1  c-0.4-0.4-0.7-1.1-1.1-1.7l-1.1-1.7c-0.3-0.6-0.6-1.2-0.9-1.8c-0.2-0.5-0.6-1.2-0.8-1.8c-0.4-1.2-1-2.4-1.2-3.7  c-0.2-0.6-0.4-1.2-0.5-1.9c-0.1-0.6-0.2-1.2-0.3-1.8c-0.3-1.2-0.3-2.4-0.4-3.7c-0.1-1.2,0-2.5,0.1-3.7c0.2-1.2,0.3-2.4,0.6-3.5  c0.1-0.6,0.3-1.1,0.4-1.7l0.1-0.8l0.3-0.8c1.5-4.3,3.8-8,6.5-11c0.8-0.8,1.4-1.5,2.1-2.1c0.9-0.9,1.4-1.3,2.2-1.8  c1.4-1.2,2.9-2,4.3-2.8c2.8-1.5,5.5-2.3,7.7-2.8s4-0.7,5.2-0.6c0.6-0.1,1.1,0,1.4,0s0.4,0,0.4,0h0.1c2.7,0.1,5-2.2,5-5  c0.1-2.7-2.2-5-5-5c-0.2,0-0.2,0-0.3,0c0,0-0.2,0.1-0.6,0.1c-0.4,0-1,0-1.8,0.1c-1.6,0.1-4,0.4-6.9,1.2c-2.9,0.8-6.4,2-9.9,4.1  c-1.8,1-3.6,2.3-5.4,3.8C26,21.4,25,22.2,24.4,23c-0.2,0.2-0.4,0.4-0.6,0.6c-0.2,0.2-0.5,0.4-0.6,0.7c-0.5,0.4-0.8,0.9-1.3,1.4  c-3.2,3.9-5.9,8.8-7.5,14.3l-0.3,1l-0.2,1.1c-0.1,0.7-0.3,1.4-0.4,2.1c-0.3,1.5-0.4,2.9-0.5,4.5c0,1.5-0.1,3,0.1,4.5  c0.2,1.5,0.2,3,0.6,4.6c0.1,0.7,0.3,1.5,0.4,2.3c0.2,0.8,0.5,1.5,0.7,2.3c0.4,1.6,1.1,3,1.7,4.4c0.3,0.7,0.7,1.4,1.1,2.1  c0.4,0.8,0.8,1.4,1.2,2.1c0.5,0.7,0.9,1.4,1.4,2s0.9,1.3,1.5,1.9c1.1,1.3,2.2,2.7,3.3,3.5l1.7,1.6c0,0,0.1,0.1,0.1,0.1c0,0,0,0,0,0  c0,0,0,0,0,0l0.1,0.1l0.1,0.1h0.2l0.5,0.4l1,0.7c0.4,0.2,0.6,0.5,1,0.7l1.1,0.6c0.8,0.4,1.4,0.9,2.1,1.2c1.4,0.7,2.9,1.5,4.4,2  c1.5,0.7,3.1,1,4.6,1.5c1.5,0.3,3.1,0.7,4.7,0.8c1.6,0.2,3.1,0.2,4.7,0.2c0.8,0,1.6-0.1,2.4-0.1l1.2-0.1l1.1-0.1  c3.1-0.4,6.1-1.3,8.9-2.4c0.8-0.3,1.4-0.6,2.1-0.9s1.3-0.7,2-1.1c1.3-0.7,2.6-1.7,3.7-2.5c0.5-0.4,1-0.9,1.6-1.3l0.8-0.6l0.2-0.2  c0,0,0.1-0.1,0.1-0.1c0.1-0.1,0,0,0,0v0.1l0.1-0.1l0.4-0.4c0.5-0.5,1-1,1.5-1.5c0.3-0.3,0.5-0.5,0.8-0.8l0.7-0.8  c0.9-1.1,1.8-2.2,2.5-3.3c0.4-0.6,0.7-1.1,1.1-1.7c0.3-0.7,0.6-1.2,0.9-1.8c2.4-4.9,3.5-9.8,3.7-14.4C87.3,49.7,86.6,45.5,85.5,42z"}})])])]),e("vs-table",{attrs:{data:t.followSuper,hoverFlat:!0,"max-items":"30",pagination:""},scopedSlots:t._u([{key:"default",fn:function(s){var a=s.data;return t._l(a,(function(s,a){return e("vs-tr",{key:a},[e("vs-td",[t._v("\n                    "+t._s(s.main_nick_name)+"\n                  ")]),e("vs-td",[t._v("\n                    "+t._s(t.formatDate(s.created_at))+"\n                  ")]),e("vs-td",[t._v("\n                    $"+t._s(t.formatPrice(s.balance))+"\n                  ")]),e("vs-td",[t._v("\n                    $"+t._s(t.formatPrice(s.day_win))+"\n                  ")]),e("vs-td",[t._v("\n                    $"+t._s(t.formatPrice(s.day_lose))+"\n                  ")]),e("vs-td",[t._v("\n                    $"+t._s(t.formatPrice(s.money_per_day))+"\n                  ")])],1)}))}}],null,!1,3322066576)},[e("template",{slot:"thead"},[e("vs-th",[t._v(" "+t._s(t.$t("CopyTrade_Follow_NickName"))+" ")]),e("vs-th",[t._v(" "+t._s(t.$t("CopyTrade_Follow_Date")))]),e("vs-th",[t._v(" "+t._s(t.$t("CopyTrade_Follow_Amount"))+" ")]),e("vs-th",[t._v(" "+t._s(t.$t("Supper_Expert_History_CLaiDay")))]),e("vs-th",[t._v(" "+t._s(t.$t("Supper_Expert_History_CLoDay")))]),e("vs-th",[t._v(" "+t._s(t.$t("Supper_Expert_Money_Per_Day")))])],1)],2)],1)])])],1):t._e(),t.showSuperCg?e("vs-tabs",{attrs:{alignment:"fixed",color:"#e3b602"},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[e("vs-tab",{staticClass:"transaction",attrs:{label:this.$t("CopyTrade_Top_Supper_Expert_Title")}},t._l(t.optionsSuperExperts,(function(a,i){return e("vs-col",{key:i,attrs:{"vs-w":"4","vs-sm":"12"}},[e("div",{staticClass:"sodu card-supers"},[e("div",{staticClass:"flex"},[e("div",{staticClass:"super-expert",staticStyle:{display:"flex"}},[a.profile_image?a.profile_image?e("vs-avatar",{staticClass:"mr-4",staticStyle:{"min-width":"60px"},attrs:{src:"".concat(t.dm,"api/auth/me/photo/").concat(a.profile_image),size:"60px"}}):t._e():e("vs-avatar",{staticClass:"mr-4",staticStyle:{"background-color":"#fff !important","min-width":"60px"},attrs:{src:s("5c73"),size:"60px"}}),e("div",{},[e("p",{staticClass:"expert-nickname"},[t._v(t._s(a.nick_name))]),e("p",{staticClass:"expert-content colorGray"},[t._v(t._s(a.content))])])],1)]),e("div",{staticClass:"flex",staticStyle:{"padding-bottom":"0"}},[e("span",{staticClass:"card-super-content"},[t._v(t._s(t.$t("CopyTrade_TopExpert_FollowAmount")||"Followed amount")+": "+t._s(Number(a.balance).toFixed(2)))]),e("span",{staticClass:"card-super-content"},[t._v(t._s(t.$t("CopyTrade_TopExpert_Win")||"Win")+": "+t._s(a.win_count)+"/"+t._s(a.lose_count+a.win_count))])]),e("div",{staticClass:"flex",staticStyle:{"padding-bottom":"0"}},[e("span",{staticClass:"card-super-content"},[t._v(t._s(t.$t("CopyTrade_TopExpert_FollowCount")||"Followed users")+": "+t._s(a.follow))]),e("span",{staticClass:"card-super-content"},[t._v(t._s(t.$t("CopyTrade_TopExpert_WinRate")||"Win")+": "+t._s(0===a.win_count?0:(100*a.win_count/(a.lose_count+a.win_count)).toFixed(2))+"%")])]),e("div",{staticClass:"boxCoinFooter flex"},[null==a.follow_user?e("div",[e("img",{attrs:{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAeCAYAAABJ/8wUAAAABHNCSVQICAgIfAhkiAAAAiJJREFUWIXt1jF22kAQgOF/9uWFZ1fKCaIbBJeCRj5ByAkin8DQgZq4Ajp8A5MbOCcwLpDK2DewTxDoXGlSrCEWkkASkJci02nfrvbb1e6MhGNGHAaofkPFwdDDG06LuspRIfPwF4Kzfj55/4Gzq0VeV3M0RNz3UwiAl5dmUffjQSrGf8hm/DOQdzt7xH0XlY+ocZDEnvjW6P7vQaLwEiVAsSddlPVtj8KtV/EwkGjQASaAW5xltHdIRBYShwHKzY4xz7RG14dEpCHlEAC3mZZoMAHpoix2pfL1XAkTBAdlSnt4YTd/HjYRfpazay+1I3ljhQtInlBzl25PzsG4mQUrZ3ZHRCely45I+myYxEE3soByA/I9uwYJgK+ZdpM4hnnYBPHLKYAEN/XsjWegOddZshPmtak+4o1nBiEojbDxOdNy0uig+ljxPRZx2vABDGhhRcwNoUkcpvFnVwtOG34lzArxmgYMKp8qQQASJvaT1sRsICxk85+hTNgxd7UwOQgLQZeVIXUxBYhXCA+1IGUwb2/TFoR9VRReA5e1MQDKAjinPcwuKu77qDi0RtmMnIJUyqo1MSXC2IF5CalirD5T3Hd39s2FAKh094ZYzBJv/FQf0h4+2EK1T+gSpVN39J9q5Q2noL36CPHrno80BLDlXb8AzxUQ94g290HAttofDbooAVJQApQfGG53/gTtDVmFvQUuKg6iNhl549khJn8bvwEod96NMQX8+QAAAABJRU5ErkJggg==",alt:""}}),e("a",{attrs:{href:"javascript:;"},on:{click:function(e){return e.stopPropagation(),t.showSuperCgPopup(a)}}},[t._v(t._s(t.$t("Affiliate_General_Coppy")||"Deposit"))])]):e("div",[e("img",{attrs:{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAeCAYAAABJ/8wUAAAABHNCSVQICAgIfAhkiAAAAiJJREFUWIXt1jF22kAQgOF/9uWFZ1fKCaIbBJeCRj5ByAkin8DQgZq4Ajp8A5MbOCcwLpDK2DewTxDoXGlSrCEWkkASkJci02nfrvbb1e6MhGNGHAaofkPFwdDDG06LuspRIfPwF4Kzfj55/4Gzq0VeV3M0RNz3UwiAl5dmUffjQSrGf8hm/DOQdzt7xH0XlY+ocZDEnvjW6P7vQaLwEiVAsSddlPVtj8KtV/EwkGjQASaAW5xltHdIRBYShwHKzY4xz7RG14dEpCHlEAC3mZZoMAHpoix2pfL1XAkTBAdlSnt4YTd/HjYRfpazay+1I3ljhQtInlBzl25PzsG4mQUrZ3ZHRCely45I+myYxEE3soByA/I9uwYJgK+ZdpM4hnnYBPHLKYAEN/XsjWegOddZshPmtak+4o1nBiEojbDxOdNy0uig+ljxPRZx2vABDGhhRcwNoUkcpvFnVwtOG34lzArxmgYMKp8qQQASJvaT1sRsICxk85+hTNgxd7UwOQgLQZeVIXUxBYhXCA+1IGUwb2/TFoR9VRReA5e1MQDKAjinPcwuKu77qDi0RtmMnIJUyqo1MSXC2IF5CalirD5T3Hd39s2FAKh094ZYzBJv/FQf0h4+2EK1T+gSpVN39J9q5Q2noL36CPHrno80BLDlXb8AzxUQ94g290HAttofDbooAVJQApQfGG53/gTtDVmFvQUuKg6iNhl549khJn8bvwEod96NMQX8+QAAAABJRU5ErkJggg==",alt:""}}),e("a",{attrs:{href:"javascript:;"},on:{click:function(e){return e.stopPropagation(),t.showSuperCgHistories(a)}}},[t._v(t._s(t.$t("Supper_Expert_Detail")||"Deposit"))])])])])])})),1)],1):t._e()],1),e("vs-popup",{attrs:{title:"Profit",active:t.popupPrint},on:{"update:active":function(e){t.popupPrint=e}}},[e("div",{staticClass:"print-proffit",attrs:{id:"print-profit"}},[e("img",{staticStyle:{display:"none"},attrs:{src:s("2cd2"),id:"imgBg"}}),e("img",{attrs:{id:"imageToday"}})])]),e("vs-popup",{staticClass:"text-center",attrs:{fullscreen:"",title:this.$t("CopyTrade_Top_Supper_Expert_Title"),active:t.popupSelectCgActive},on:{"update:active":function(e){t.popupSelectCgActive=e}}},[e("div",{staticClass:"flex header setting cg-setting"},[e("div",{staticClass:"setting-warp"},[e("div",{staticClass:"setting-input"},[e("span",{staticClass:"fs-14"},[t._v(t._s(t.$t("CopyTrade_Setting_ExpertName")||"Expert Name"))]),e("label",[e("div",{staticClass:"input-container"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.selectSuperCg.nick_name,expression:"selectSuperCg.nick_name"}],staticStyle:{width:"75%"},attrs:{type:"text",readonly:""},domProps:{value:t.selectSuperCg.nick_name},on:{input:function(e){e.target.composing||t.$set(t.selectSuperCg,"nick_name",e.target.value)}}})])])]),e("div",{staticClass:"setting-input",staticStyle:{"margin-top":"25px"}},[e("span",{staticClass:"fs-14"},[t._v(t._s(t.$t("CopyTrade_Top_Supper_Expert_Type")||"Account Type"))]),e("label",[e("div",{staticClass:"input-container"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.selectSuperCg.pack,expression:"selectSuperCg.pack"}],staticStyle:{width:"75%"},attrs:{type:"text",readonly:""},domProps:{value:t.selectSuperCg.pack},on:{input:function(e){e.target.composing||t.$set(t.selectSuperCg,"pack",e.target.value)}}})])])]),e("div",{staticClass:"setting-input",staticStyle:{"margin-top":"25px"}},[e("span",{staticClass:"fs-14"},[t._v(t._s(t.$t("CopyTrade_Top_Supper_Expert_Balance")||"Amount bet"))]),e("label",[e("div",{staticClass:"input-container"},[e("img",{attrs:{src:s("a9e0"),alt:"Icon Dollar"}}),e("input",{directives:[{name:"model",rawName:"v-model",value:t.selectConfigCg.balance,expression:"selectConfigCg.balance"}],staticStyle:{width:"75%"},attrs:{type:"number"},domProps:{value:t.selectConfigCg.balance},on:{input:function(e){e.target.composing||t.$set(t.selectConfigCg,"balance",e.target.value)}}})]),e("p",{staticClass:"text-danger"},[t._v(t._s(t.msgErrBalance))])])]),e("div",{staticClass:"setting-input",staticStyle:{"margin-top":"25px"}},[e("span",{staticClass:"fs-14"},[t._v(t._s(t.$t("CopyTrade_Setting_BetAmount")||"Amount bet"))]),e("label",[e("div",{staticClass:"input-container"},[e("img",{attrs:{src:s("a9e0"),alt:"Icon Dollar"}}),e("input",{directives:[{name:"model",rawName:"v-model",value:t.selectConfigCg.amount,expression:"selectConfigCg.amount"}],staticStyle:{width:"75%"},attrs:{type:"number"},domProps:{value:t.selectConfigCg.amount},on:{input:function(e){e.target.composing||t.$set(t.selectConfigCg,"amount",e.target.value)}}})]),e("p",{staticClass:"text-danger"},[t._v(t._s(t.msgErrAmount))])])]),e("div",{staticClass:"setting-input",staticStyle:{"margin-top":"25px"}},[e("span",{staticClass:"fs-14"},[t._v(t._s(t.$t("CopyTrade_Setting_DayWin")||"Day Win Amount"))]),e("label",[e("div",{staticClass:"input-container"},[e("img",{attrs:{src:s("a9e0"),alt:"Icon Dollar"}}),e("input",{directives:[{name:"model",rawName:"v-model",value:t.selectConfigCg.cLaiDay,expression:"selectConfigCg.cLaiDay"}],staticStyle:{width:"75%"},attrs:{type:"number"},domProps:{value:t.selectConfigCg.cLaiDay},on:{input:function(e){e.target.composing||t.$set(t.selectConfigCg,"cLaiDay",e.target.value)}}})]),e("p",{staticClass:"text-danger"},[t._v(t._s(t.msgErrCLaiDay))])])]),e("div",{staticClass:"setting-input",staticStyle:{"margin-top":"25px"}},[e("span",{staticClass:"fs-14"},[t._v(t._s(t.$t("CopyTrade_Setting_DayLose")||"Day Lose Amount"))]),e("label",[e("div",{staticClass:"input-container"},[e("img",{attrs:{src:s("a9e0"),alt:"Icon Dollar"}}),e("input",{directives:[{name:"model",rawName:"v-model",value:t.selectConfigCg.cLoDay,expression:"selectConfigCg.cLoDay"}],staticStyle:{width:"75%"},attrs:{type:"number"},domProps:{value:t.selectConfigCg.cLoDay},on:{input:function(e){e.target.composing||t.$set(t.selectConfigCg,"cLoDay",e.target.value)}}})]),e("p",{staticClass:"text-danger"},[t._v(t._s(t.msgErrCLoDay))])])]),e("div",{staticClass:"switch-wrap setting-input"},[e("vs-switch",{staticClass:"custom-switch",attrs:{color:"#389a11","vs-icon-on":"check_circle_outline","vs-icon-off":"block"},model:{value:t.selectConfigCg.rate,callback:function(e){t.$set(t.selectConfigCg,"rate",e)},expression:"selectConfigCg.rate"}},[e("span",{attrs:{slot:"on"},slot:"on"},[t._v(t._s(t.$t("CopyTrade_Setitng_PercenOn")||"On"))]),e("span",{attrs:{slot:"off"},slot:"off"},[t._v(t._s(t.$t("CopyTrade_Setting_PercenOff")||"Off"))])]),e("span",{staticClass:"text"},[t._v(t._s(t.$t("CopyTrade_Setting_ActivePercen")||"Bet % with experted"))])],1)])]),e("div",{staticClass:"flex flex-col items-center content"},[e("vs-button",{staticClass:"xl:w-3/4",staticStyle:{width:"75%"},attrs:{color:"#E46D02",type:"filled"},on:{click:t.saveSuperExpertConfigs}},[t._v(t._s(t.$t("Affiliate_General_Coppy")))])],1)]),e("vs-popup",{staticClass:"text-center",attrs:{fullscreen:"",title:this.$t("CopyTrade_Top_Supper_Expert_Title"),active:t.popupShowHistoriesCg},on:{"update:active":function(e){t.popupShowHistoriesCg=e}}},[e("div",{staticStyle:{width:"100%","margin-bottom":"20px"}},[e("div",{staticClass:"latest-winner-list",class:{"ld-loading":t.tableLoading}},[e("vs-table",{attrs:{data:[t.superCgConfig],hoverFlat:!0,"max-items":"10"}},[e("template",{slot:"thead"},[e("vs-th",[t._v(" "+t._s(t.$t("CopyTrade_Setting_ExpertName")||"Expert")+" ")]),e("vs-th",[t._v(" "+t._s(t.$t("CopyTrade_Top_Supper_Expert_Balance")||"Balance")+" ")]),e("vs-th",[t._v(" "+t._s(t.$t("CopyTrade_Setting_BetAmount")||"Bet"))]),e("vs-th",[t._v(" "+t._s(t.$t("CopyTrade_Setting_DayWin")||"Take profit"))]),e("vs-th",[t._v(" "+t._s(t.$t("CopyTrade_Setting_DayLose")||"Take loss"))])],1),[e("vs-tr",[e("vs-td",{staticClass:"text-left"},[t._v("\n                "+t._s(t.superCgConfig.experts)+"\n              ")]),e("vs-td",{staticClass:"text-left"},[t._v("\n                "+t._s(t.formatPrice(t.superCgConfig.balance,2,2))+"\n              ")]),e("vs-td",{staticClass:"text-left"},[t._v("\n                "+t._s(t.formatPrice(t.superCgConfig.cp_amount,2,2))+"\n              ")]),e("vs-td",{staticClass:"text-left"},[t._v("\n                "+t._s(t.formatPrice(t.superCgConfig.day_win,2,2))+"\n              ")]),e("vs-td",{staticClass:"text-left"},[t._v("\n                "+t._s(t.formatPrice(t.superCgConfig.day_lose,2,2))+"\n              ")])],1)]],2)],1)]),e("div",{staticStyle:{width:"100%"}},[e("div",{staticClass:"latest-winner-list",class:{"ld-loading":t.tableLoading}},[e("div",{staticClass:"loading"},[e("div",{staticClass:"loading__ring"},[e("svg",{staticStyle:{"enable-background":"new 0 0 100 100"},attrs:{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1",x:"0px",y:"0px",viewBox:"0 0 100 100","xml:space":"preserve"}},[e("path",{attrs:{d:"M85.5,42c-0.2-0.8-0.5-1.7-0.8-2.5c-0.3-0.9-0.7-1.6-1-2.3c-0.3-0.7-0.6-1.3-1-1.9c0.3,0.5,0.5,1.1,0.8,1.7  c0.2,0.7,0.6,1.5,0.8,2.3s0.5,1.7,0.8,2.5c0.8,3.5,1.3,7.5,0.8,12c-0.4,4.3-1.8,9-4.2,13.4c-2.4,4.2-5.9,8.2-10.5,11.2  c-1.1,0.7-2.2,1.5-3.4,2c-0.5,0.2-1.2,0.6-1.8,0.8s-1.3,0.5-1.9,0.8c-2.6,1-5.3,1.7-8.1,1.8l-1.1,0.1L53.8,84c-0.7,0-1.4,0-2.1,0  c-1.4-0.1-2.9-0.1-4.2-0.5c-1.4-0.1-2.8-0.6-4.1-0.8c-1.4-0.5-2.7-0.9-3.9-1.5c-1.2-0.6-2.4-1.2-3.7-1.9c-0.6-0.3-1.2-0.7-1.7-1.1  l-0.8-0.6c-0.3-0.1-0.6-0.4-0.8-0.6l-0.8-0.6L31.3,76l-0.2-0.2L31,75.7l-0.1-0.1l0,0l-1.5-1.5c-1.2-1-1.9-2.1-2.7-3.1  c-0.4-0.4-0.7-1.1-1.1-1.7l-1.1-1.7c-0.3-0.6-0.6-1.2-0.9-1.8c-0.2-0.5-0.6-1.2-0.8-1.8c-0.4-1.2-1-2.4-1.2-3.7  c-0.2-0.6-0.4-1.2-0.5-1.9c-0.1-0.6-0.2-1.2-0.3-1.8c-0.3-1.2-0.3-2.4-0.4-3.7c-0.1-1.2,0-2.5,0.1-3.7c0.2-1.2,0.3-2.4,0.6-3.5  c0.1-0.6,0.3-1.1,0.4-1.7l0.1-0.8l0.3-0.8c1.5-4.3,3.8-8,6.5-11c0.8-0.8,1.4-1.5,2.1-2.1c0.9-0.9,1.4-1.3,2.2-1.8  c1.4-1.2,2.9-2,4.3-2.8c2.8-1.5,5.5-2.3,7.7-2.8s4-0.7,5.2-0.6c0.6-0.1,1.1,0,1.4,0s0.4,0,0.4,0h0.1c2.7,0.1,5-2.2,5-5  c0.1-2.7-2.2-5-5-5c-0.2,0-0.2,0-0.3,0c0,0-0.2,0.1-0.6,0.1c-0.4,0-1,0-1.8,0.1c-1.6,0.1-4,0.4-6.9,1.2c-2.9,0.8-6.4,2-9.9,4.1  c-1.8,1-3.6,2.3-5.4,3.8C26,21.4,25,22.2,24.4,23c-0.2,0.2-0.4,0.4-0.6,0.6c-0.2,0.2-0.5,0.4-0.6,0.7c-0.5,0.4-0.8,0.9-1.3,1.4  c-3.2,3.9-5.9,8.8-7.5,14.3l-0.3,1l-0.2,1.1c-0.1,0.7-0.3,1.4-0.4,2.1c-0.3,1.5-0.4,2.9-0.5,4.5c0,1.5-0.1,3,0.1,4.5  c0.2,1.5,0.2,3,0.6,4.6c0.1,0.7,0.3,1.5,0.4,2.3c0.2,0.8,0.5,1.5,0.7,2.3c0.4,1.6,1.1,3,1.7,4.4c0.3,0.7,0.7,1.4,1.1,2.1  c0.4,0.8,0.8,1.4,1.2,2.1c0.5,0.7,0.9,1.4,1.4,2s0.9,1.3,1.5,1.9c1.1,1.3,2.2,2.7,3.3,3.5l1.7,1.6c0,0,0.1,0.1,0.1,0.1c0,0,0,0,0,0  c0,0,0,0,0,0l0.1,0.1l0.1,0.1h0.2l0.5,0.4l1,0.7c0.4,0.2,0.6,0.5,1,0.7l1.1,0.6c0.8,0.4,1.4,0.9,2.1,1.2c1.4,0.7,2.9,1.5,4.4,2  c1.5,0.7,3.1,1,4.6,1.5c1.5,0.3,3.1,0.7,4.7,0.8c1.6,0.2,3.1,0.2,4.7,0.2c0.8,0,1.6-0.1,2.4-0.1l1.2-0.1l1.1-0.1  c3.1-0.4,6.1-1.3,8.9-2.4c0.8-0.3,1.4-0.6,2.1-0.9s1.3-0.7,2-1.1c1.3-0.7,2.6-1.7,3.7-2.5c0.5-0.4,1-0.9,1.6-1.3l0.8-0.6l0.2-0.2  c0,0,0.1-0.1,0.1-0.1c0.1-0.1,0,0,0,0v0.1l0.1-0.1l0.4-0.4c0.5-0.5,1-1,1.5-1.5c0.3-0.3,0.5-0.5,0.8-0.8l0.7-0.8  c0.9-1.1,1.8-2.2,2.5-3.3c0.4-0.6,0.7-1.1,1.1-1.7c0.3-0.7,0.6-1.2,0.9-1.8c2.4-4.9,3.5-9.8,3.7-14.4C87.3,49.7,86.6,45.5,85.5,42z"}})])]),e("div",{staticClass:"loading__ring"},[e("svg",{staticStyle:{"enable-background":"new 0 0 100 100"},attrs:{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1",x:"0px",y:"0px",viewBox:"0 0 100 100","xml:space":"preserve"}},[e("path",{attrs:{d:"M85.5,42c-0.2-0.8-0.5-1.7-0.8-2.5c-0.3-0.9-0.7-1.6-1-2.3c-0.3-0.7-0.6-1.3-1-1.9c0.3,0.5,0.5,1.1,0.8,1.7  c0.2,0.7,0.6,1.5,0.8,2.3s0.5,1.7,0.8,2.5c0.8,3.5,1.3,7.5,0.8,12c-0.4,4.3-1.8,9-4.2,13.4c-2.4,4.2-5.9,8.2-10.5,11.2  c-1.1,0.7-2.2,1.5-3.4,2c-0.5,0.2-1.2,0.6-1.8,0.8s-1.3,0.5-1.9,0.8c-2.6,1-5.3,1.7-8.1,1.8l-1.1,0.1L53.8,84c-0.7,0-1.4,0-2.1,0  c-1.4-0.1-2.9-0.1-4.2-0.5c-1.4-0.1-2.8-0.6-4.1-0.8c-1.4-0.5-2.7-0.9-3.9-1.5c-1.2-0.6-2.4-1.2-3.7-1.9c-0.6-0.3-1.2-0.7-1.7-1.1  l-0.8-0.6c-0.3-0.1-0.6-0.4-0.8-0.6l-0.8-0.6L31.3,76l-0.2-0.2L31,75.7l-0.1-0.1l0,0l-1.5-1.5c-1.2-1-1.9-2.1-2.7-3.1  c-0.4-0.4-0.7-1.1-1.1-1.7l-1.1-1.7c-0.3-0.6-0.6-1.2-0.9-1.8c-0.2-0.5-0.6-1.2-0.8-1.8c-0.4-1.2-1-2.4-1.2-3.7  c-0.2-0.6-0.4-1.2-0.5-1.9c-0.1-0.6-0.2-1.2-0.3-1.8c-0.3-1.2-0.3-2.4-0.4-3.7c-0.1-1.2,0-2.5,0.1-3.7c0.2-1.2,0.3-2.4,0.6-3.5  c0.1-0.6,0.3-1.1,0.4-1.7l0.1-0.8l0.3-0.8c1.5-4.3,3.8-8,6.5-11c0.8-0.8,1.4-1.5,2.1-2.1c0.9-0.9,1.4-1.3,2.2-1.8  c1.4-1.2,2.9-2,4.3-2.8c2.8-1.5,5.5-2.3,7.7-2.8s4-0.7,5.2-0.6c0.6-0.1,1.1,0,1.4,0s0.4,0,0.4,0h0.1c2.7,0.1,5-2.2,5-5  c0.1-2.7-2.2-5-5-5c-0.2,0-0.2,0-0.3,0c0,0-0.2,0.1-0.6,0.1c-0.4,0-1,0-1.8,0.1c-1.6,0.1-4,0.4-6.9,1.2c-2.9,0.8-6.4,2-9.9,4.1  c-1.8,1-3.6,2.3-5.4,3.8C26,21.4,25,22.2,24.4,23c-0.2,0.2-0.4,0.4-0.6,0.6c-0.2,0.2-0.5,0.4-0.6,0.7c-0.5,0.4-0.8,0.9-1.3,1.4  c-3.2,3.9-5.9,8.8-7.5,14.3l-0.3,1l-0.2,1.1c-0.1,0.7-0.3,1.4-0.4,2.1c-0.3,1.5-0.4,2.9-0.5,4.5c0,1.5-0.1,3,0.1,4.5  c0.2,1.5,0.2,3,0.6,4.6c0.1,0.7,0.3,1.5,0.4,2.3c0.2,0.8,0.5,1.5,0.7,2.3c0.4,1.6,1.1,3,1.7,4.4c0.3,0.7,0.7,1.4,1.1,2.1  c0.4,0.8,0.8,1.4,1.2,2.1c0.5,0.7,0.9,1.4,1.4,2s0.9,1.3,1.5,1.9c1.1,1.3,2.2,2.7,3.3,3.5l1.7,1.6c0,0,0.1,0.1,0.1,0.1c0,0,0,0,0,0  c0,0,0,0,0,0l0.1,0.1l0.1,0.1h0.2l0.5,0.4l1,0.7c0.4,0.2,0.6,0.5,1,0.7l1.1,0.6c0.8,0.4,1.4,0.9,2.1,1.2c1.4,0.7,2.9,1.5,4.4,2  c1.5,0.7,3.1,1,4.6,1.5c1.5,0.3,3.1,0.7,4.7,0.8c1.6,0.2,3.1,0.2,4.7,0.2c0.8,0,1.6-0.1,2.4-0.1l1.2-0.1l1.1-0.1  c3.1-0.4,6.1-1.3,8.9-2.4c0.8-0.3,1.4-0.6,2.1-0.9s1.3-0.7,2-1.1c1.3-0.7,2.6-1.7,3.7-2.5c0.5-0.4,1-0.9,1.6-1.3l0.8-0.6l0.2-0.2  c0,0,0.1-0.1,0.1-0.1c0.1-0.1,0,0,0,0v0.1l0.1-0.1l0.4-0.4c0.5-0.5,1-1,1.5-1.5c0.3-0.3,0.5-0.5,0.8-0.8l0.7-0.8  c0.9-1.1,1.8-2.2,2.5-3.3c0.4-0.6,0.7-1.1,1.1-1.7c0.3-0.7,0.6-1.2,0.9-1.8c2.4-4.9,3.5-9.8,3.7-14.4C87.3,49.7,86.6,45.5,85.5,42z"}})])])]),e("vs-table",{attrs:{data:t.superCgHistories,hoverFlat:!0,"max-items":"10",pagination:""},scopedSlots:t._u([{key:"default",fn:function(s){var a=s.data;return t._l(a,(function(s,a){return e("vs-tr",{key:a},[e("vs-td",{staticClass:"text-left"},[t._v("\n                "+t._s(s.order_id)+"\n              ")]),e("vs-td",{staticClass:"text-left"},[t._v("\n                "+t._s(s.experts)+"\n              ")]),e("vs-td",{staticClass:"text-left"},[t._v("\n                "+t._s(t.formatPrice(s.open,2,2))+"\n              ")]),e("vs-td",{staticClass:"text-left"},[t._v("\n                "+t._s(t.formatPrice(s.close,2,2))+"\n              ")]),e("vs-td",{staticClass:"text-left"},[t._v("\n                "+t._s(t.formatPrice(s.value,2,2))+"\n              ")]),e("vs-td",{staticClass:"text-left"},[t._v("\n                "+t._s(t.formatPrice(s.sum,2,2))+"\n              ")])],1)}))}}])},[e("template",{slot:"thead"},[e("vs-th",[t._v(" OrderID ")]),e("vs-th",[t._v(" "+t._s(t.$t("CopyTrade_History_Expert")||"Expert")+" ")]),e("vs-th",[t._v(" "+t._s(t.$t("CopyTrade_History_OpenedPrice")||"Opend Price"))]),e("vs-th",[t._v(" "+t._s(t.$t("CopyTrade_History_ClosedPrice")||"Closed Price"))]),e("vs-th",[t._v(" "+t._s(t.$t("CopyTrade_History_Amount")||"Bet Amount")+" ")]),e("vs-th",[t._v(" "+t._s(t.$t("CopyTrade_History_Result")||"Result")+" ")])],1)],2)],1)])])],1)},i=[],c=(s("ac6a"),s("96cf"),s("1da1")),n=s("3b3e"),o=s("b05c"),r=s("c1df"),l=s.n(r),p=s("4a7a"),u=s.n(p),d=s("70b0"),g=s.n(d),_=s("c5b9"),v=s("7dc5"),f={components:{vSelect:u.a},data:function(){return{getData:o,tableDataHis:[],colorxChangePass:"#def1d1",popupActiveChangePass:!1,popupPrint:!1,optionDatetime:[],optionsExperts:[],followedUsers:[],optionsSuperExperts:[],topExperts:[],accountOptions:[{text:"Live Account",value:1},{text:"Demo Account",value:0}],superAccountOptions:[{text:"Min 500$ (1 month(s) - 8%)",value:0},{text:"Min 1000$ (2 month(s) - 10%)",value:1}],expert:"",bot:"BotAI6",switchRate:!1,switchRun:!1,amount:10,win_amount:50,lose_amount:50,account_type:0,rateExperts:0,isRun:0,isRunAi:0,moblie:!1,hisTab:0,tab:0,settingTab:0,tableLoading:!1,moneyToday:0,winTotal:0,loseTotal:0,statistic:0,statisticData:[],percentToday:0,showImage:!0,showSettings:!1,showGiaoDich:!1,showTopCg:!1,showSuperCg:!1,showHistory:!1,showChild:!1,showSuper:!1,showFollowSuper:!1,cancelAccount:{},winAmount:0,loseAmount:0,moneyAllToday:0,super_type:0,super_account_recieved:"",super_active:!1,super_account_content:"",dm:v.domain,popupSelectCgActive:!1,popupShowHistoriesCg:!1,selectSuperCg:{},selectConfigCg:{expert:"",balance:0,amount:0,cLaiDay:0,cLoDay:0,rate:0,packNumber:0},superCgHistories:[],superCgConfig:[],followSuper:[],msgErrBalance:"",msgErrAmount:"",msgErrCLaiDay:"",msgErrCLoDay:""}},computed:{statisticText:function(){var t=new Date;return 0==this.statistic?this.$t("CopyTrade_Setting_Month")+(t.getMonth()+1):this.$t("CopyTrade_Setting_Year")+t.getFullYear()},totalProfit:function(){return this.statisticData.reduce((function(t,e){return t+ +e}),0)}},methods:{showSuperCgPopup:function(t){this.selectSuperCg=t,1===t.type?(this.selectSuperCg.packNumber=1e3,this.selectSuperCg.pack="min 1000$ / 2 months"):(this.selectSuperCg.packNumber=500,this.selectSuperCg.pack="min 500$ / 1 months"),this.popupSelectCgActive=!0},showSuperCgHistories:function(t){var e=this;n["a"].getSuperHistories(t.follow_user).then((function(t){1==t.data.success&&(e.superCgHistories=t.data.data&&t.data.data.history?t.data.data.history:[],e.superCgConfig=t.data.data&&t.data.data.config?t.data.data.config:[])})),this.popupShowHistoriesCg=!0},confirmDeleteRecord:function(t){this.cancelAccount=t,this.$vs.dialog({type:"confirm",color:"danger",title:"Confirm Cancel",text:'You are about to cancel follow account "'.concat(t.nick_name,'"'),acceptText:"Accept",accept:this.deleteRecord})},deleteRecord:function(t){var e=this,s={email:this.cancelAccount.email};n["a"].removeFollow(s).then((function(t){1==t.data.success&&(e.isRunAi=!1,e.cancelAccount.is_active=0,e.cancelAccount={},e.$vs.notify({color:"danger",title:"Cancel follow account",text:"The selected account was successfully cancel"}))}))},textToBitmap:function(){var t=window.document.createElement("canvas"),e=t.getContext("2d");t.width=720,t.height=843;var s=document.getElementById("imgBg");e.drawImage(s,0,0),this.showImage=!1,e.font="bold 36px Arial",e.textBaseline="top",e.fillStyle="white",e.fillText("BTC / USDT",45,200),e.font="bold 36px Arial",e.textBaseline="top",e.fillStyle="white",e.fillText("Total Profit",45,250);var a=this.statisticData.reduce((function(t,e){return t+ +e}),0),i=this.getData.blLive,c=parseFloat(i)-parseFloat(a),n=100*parseFloat(a)/c,o=this.formatPrice(n,2);n>0&&(o="+"+o),e.font="bold 60px Arial",e.textBaseline="top",e.fillStyle="rgb(76, 175, 80)",e.fillText(o+"%",45,310);var r=this.expert;""===r&&(r="N/A"),e.font="bold 24px Arial",e.textBaseline="top",e.fillStyle="white",e.fillText("Copy Trade: "+r,45,680),e.font="bold 24px Arial",e.textBaseline="top",e.fillStyle="white",e.fillText("Ref Id: "+this.getData.ref,500,680),e.font="bold 24px Arial",e.textBaseline="top",e.fillStyle="white",e.fillText(this.getData.displayName,45,730);var l=new Date,p=l.getFullYear()+"-"+("0"+(l.getMonth()+1)).slice(-2)+"-"+("0"+l.getDate()).slice(-2),u=("0"+l.getHours()).slice(-2)+":"+("0"+l.getMinutes()).slice(-2)+":"+("0"+l.getSeconds()).slice(-2),d=p+" "+u;return e.font="bold 24px Arial",e.textBaseline="top",e.fillStyle="white",e.fillText(d,45,780),new Promise((function(e){t.toBlob(e)}))},printProfileToday:function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(){var e,s,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.textToBitmap();case 2:e=t.sent,s=URL.createObjectURL(e),a=document.getElementById("imageToday"),a.src=s,this.popupPrint=!0;case 7:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),staticYear:function(){var t=new Date;return t.getFullYear()},staticMonth:function(){var t=new Date;return t.getMonth()+1},getInfoLogin:function(){var t=this;_["a"].getInfoUser().then((function(e){if(1==e.data.success){var s=e.data.data;console.log("🚀 ~ file: CopyTrade.vue:735 ~ AuthenticationService.getInfoUser ~ dt:",s),o.uid=s.id,o.email=s.email,o.profile_image=s.profile_image,o.displayName=s.nick_name,o.uidLive=(s.order[1]||{}).u_id||0,o.uidDemo=(s.order[0]||{}).u_id||0,o.am_usdt=s.b,o.is_expert=s.is_expert,o.vip=s.vip,o.vip_lv=s.level_vip,o.pen_commiss=s.pending_commission,o.ref=s.ref,o.upid=s.upid,o.c2fa=s.fa2,o.id_front=s.id_front,o.id_back=s.id_back,o.first_name=s.first_name,o.last_name=s.last_name,o.verify=s.verify,o.num_secu=s.num_secury,o.country=s.c,o.so_cmnd=s.so_cmnd,o.blLive=(s.order[1]||{}).balance||0,o.blDemo=(s.order[0]||{}).balance||0,o.balance=s.balance,t.super_type=(s.super||{}).type||0,t.super_account_recieved=(s.super||{}).user_recieved||"",t.super_active=s.super&&0==s.super.active,t.super_account_content=(s.super||{}).content||"",t.showSettings=0===o.is_expert,t.showChild=1===o.is_expert,t.showGiaoDich=0===o.is_expert,t.showTopCg=0===o.is_expert||1===o.is_expert,t.showSuperCg=0===o.is_expert,t.showHistory=0===o.is_expert,t.showSuper=2===o.is_expert,t.showFollowSuper=2===o.is_expert}}))},fetchAnalytics:function(){var t=this;n["a"].getConfig().then((function(e){if(1==e.data.success){var s=e.data.data;t.amount=Number(s.amount||10),t.win_amount=Number(s.day_win||50),t.lose_amount=Number(s.day_lose||50),t.expert=s.experts||"",t.isRun=s.run||0,t.isRunAi=s.ai||0,t.rateExperts=s.rate||0,t.account_type=s.acc_type||0,t.settingTab=t.isRunAi,t.moneyToday=s.money_per_day||0,t.winTotal=s.winTotal,t.loseTotal=s.loseTotal,t.winAmount=s.win_amount,t.loseAmount=s.lose_amount,t.moneyAllToday=Number(s.win_amount)- -1*Number(s.lose_amount),t.percentToday=parseFloat(t.moneyToday)/(parseFloat(t.getData.blLive)+parseFloat(t.moneyToday))}})),n["a"].getExpertsList().then((function(e){1==e.data.success&&(t.optionsExperts=e.data.data)})),n["a"].getSuperExpertsList().then((function(e){1==e.data.success&&(t.optionsSuperExperts=e.data.data)})),n["a"].getFollowersList().then((function(e){1==e.data.success&&(t.followedUsers=e.data.data)})),n["a"].getFollowSuper().then((function(e){1==e.data.success&&(t.followSuper=e.data.data)})),n["a"].getTopExpertsList().then((function(e){1==e.data.success&&(e.data.data.forEach((function(t){var e=t.win_count+t.lose_count,s=0;0!=e&&(s=100*t.win_count/e),t.percentage=s.toFixed(2);var a=parseFloat(t.balance);t.balance=a.toFixed(2)})),t.topExperts=e.data.data)})),n["a"].getRevenue().then((function(e){1==e.data.success&&(t.statisticData=e.data.data)}))},logOut:function(){n["a"].logout().then((function(t){localStorage.removeItem("tokenUser"),localStorage.removeItem("INFO"),o.Notify=0,localStorage.removeItem("stateOpen"),window.location.href=window.location.origin+"/login"}))},saveExpertSettings:function(){var t=this,e={amount:this.amount,cLaiDay:this.win_amount,cLoDay:this.lose_amount,experts:this.expert,ai:0,rate:Number(this.rateExperts),run:Number(this.isRun),acc_type:Number(this.account_type)};n["a"].saveConfig(e).then((function(e){if(1==e.data.success)return t.isRunAi=!1,t.$vs.notify({position:"top-right",text:t.$t("CopyTrade_Setting_SaveSuccesFull"),icon:"check_box",color:"success"})}))},saveSuperExpertConfigs:function(){var t=this;if(""===this.selectConfigCg.balance||0===Number(this.selectConfigCg.balance)||Number(this.selectConfigCg.balance)<this.selectSuperCg.packNumber)this.msgErrBalance=this.$t("Supper_Expert_Balance_Error");else if(Number(this.selectConfigCg.balance)>parseFloat(o.blLive))this.msgErrBalance=this.$t("Supper_Expert_Balance_Not_Money_Error");else if(this.msgErrBalance="",""!==this.selectConfigCg.amount&&0!==Number(this.selectConfigCg.amount))if(this.msgErrAmount="",""===this.selectConfigCg.cLaiDay||isNaN(this.selectConfigCg.cLaiDay))this.msgErrCLaiDay=this.$t("Supper_Expert_CLaiDay_Error");else if(this.msgErrCLaiDay="",console.log("🚀 ~ file: SuperCopyTrade.vue:836 ~ saveSuperExpertConfigs ~ msgErrCLaiDay:",Number(this.selectConfigCg.cLoDay)),console.log("🚀 ~ file: SuperCopyTrade.vue:839 ~ saveSuperExpertConfigs ~ selectConfigCg:",""===this.selectConfigCg.cLoDay),""===this.selectConfigCg.cLoDay||isNaN(this.selectConfigCg.cLoDay))this.msgErrCLoDay=this.$t("Supper_Expert_CLoDay_Error");else{this.msgErrCLoDay="";var e={expert:this.selectSuperCg.nick_name,amount:Number(this.selectConfigCg.amount),cLaiDay:Number(this.selectConfigCg.cLaiDay),cLoDay:Number(this.selectConfigCg.cLoDay),rate:Number(this.selectConfigCg.rate),balance:Number(this.selectConfigCg.balance)};console.log("🚀 ~ file: CopyTrade.vue:1087 ~ saveSuperExpertConfigs ~ data:",e),n["a"].saveFollowSuperConfig(e).then((function(e){return e.data&&1==e.data.success?(n["a"].getSuperExpertsList().then((function(e){1==e.data.success&&(t.optionsSuperExperts=e.data.data)})),t.$vs.notify({position:"top-right",text:t.$t("CopyTrade_Setting_SaveSuccesFull"),icon:"check_box",color:"success"})):t.$vs.notify({text:t.$t("Supper_Expert_Error"),color:"danger",iconPack:"feather",icon:"icon-check"})}))}else this.msgErrAmount=this.$t("Supper_Expert_Amount_Error")},saveSuperExpertSettings:function(){var t=this,e={type:this.super_type,acc_recieved:this.super_account_recieved};n["a"].saveSuperConfig(e).then((function(e){if(1==e.data.success)return t.super_active=!1,t.$vs.notify({position:"top-right",text:t.$t("CopyTrade_Setting_SaveSuccesFull"),icon:"check_box",color:"success"})}))},saveSuperExpertContent:function(){var t=this,e={content:this.super_account_content};n["a"].saveSuperContent(e).then((function(e){if(1==e.data.success)return t.$vs.notify({position:"top-right",text:t.$t("CopyTrade_Setting_SaveSuccesFull"),icon:"check_box",color:"success"})}))},saveAiSettings:function(){var t=this,e={amount:this.amount,cLaiDay:this.win_amount,cLoDay:this.lose_amount,experts:this.expert,ai:Number(this.isRunAi),acc_type:Number(this.account_type)};n["a"].saveAiConfig(e).then((function(e){if(1==e.data.success)return t.isRun=!1,t.$vs.notify({position:"top-right",text:t.$t("CopyTrade_Setting_SaveSuccesFull"),icon:"check_box",color:"success"})}))},resetMoneyPerDay:function(){var t=this;n["a"].resetMoneyPerDay().then((function(e){if(1==e.data.success)return t.moneyToday=0,t.$vs.notify({position:"top-right",text:t.$t("CopyTrade_Setting_SaveSuccesFull"),icon:"check_box",color:"success"})}))},saveProfitImage:function(){var t=document.getElementById("print-profit");g.a.toJpeg(t,{quality:.95}).then((function(t){var e=document.createElement("a");e.download="profit.jpeg",e.href=t,e.click()}))},resizeWindow:function(){window.innerWidth>=900?this.moblie=!1:this.moblie=!0},getTradeHistory:function(){var t=this;this.tableLoading=!0,n["a"].getProfitList().then((function(e){1==e.data.success&&(t.tableDataHis=e.data.data,console.log(t.tableDataHis))})).finally((function(){t.tableLoading=!1}))},getAiTradeHistory:function(){var t=this;this.tableLoading=!0,n["a"].getAiProfitList().then((function(t){t.data.success})).finally((function(){t.tableLoading=!1}))},formatPrice:function(t,e,s){var a=new Intl.NumberFormat("en-US",{minimumFractionDigits:e,maximumFractionDigits:s});return a.format(t)},formatDate:function(t){return l()(t).format("DD-MM-YYYY HH:mm:ss")}},created:function(){this.getInfoLogin(),this.fetchAnalytics()},mounted:function(){this.optionDatetime.push({text:this.$t("CopyTrade_Setting_Month")+" "+this.staticMonth(),value:0}),this.optionDatetime.push({text:this.$t("CopyTrade_Setting_Year")+" "+this.staticYear(),value:1}),this.resizeWindow(),window.addEventListener("resize",this.resizeWindow)},beforeDestroy:function(){window.removeEventListener("resize",this.resizeWindow)},watch:{tab:function(t){var e=this;console.log("🚀 ~ file: SuperCopyTrade.vue:1513 ~ tab ~ t:",t),0===t&&this.fetchAnalytics(),2==t&&(1==this.hisTab?this.getAiTradeHistory():(this.getTradeHistory(),this.followSuper&&n["a"].getFollowSuper().then((function(t){1==t.data.success&&(e.followSuper=t.data.data)}))))},hisTab:function(t){2==t?this.getAiTradeHistory():this.getTradeHistory()},statistic:function(t){var e=this;0==t?n["a"].getRevenue().then((function(t){1==t.data.success&&(e.statisticData=t.data.data)})):n["a"].getRevenue({type:"month"}).then((function(t){1==t.data.success&&(e.statisticData=t.data.data)}))}}},m=f,C=(s("d165"),s("fec7"),s("2877")),h=Object(C["a"])(m,a,i,!1,null,null,null);e["default"]=h.exports},d165:function(t,e,s){"use strict";s("9685")},fec7:function(t,e,s){"use strict";s("45d9")}}]);