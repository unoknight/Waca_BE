(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bb9fb820"],{"16b6":function(e,t,a){"use strict";var n=a("bc3a"),r=a.n(n),s=a("7dc5");t["a"]=function(){return r.a.create({baseURL:"".concat(s.domain),headers:{Authorization:"Sky ".concat(localStorage.getItem("token"))}})}},"210b":function(e,t,a){e.exports=a.p+"img/paypal-mini.4a147115.png"},"3e75":function(e,t,a){"use strict";a("77f0")},"3f4a":function(e,t,a){"use strict";var n=a("bc3a"),r=a.n(n),s=a("7dc5"),i=r.a.create({baseURL:"".concat(s.domain)});i.interceptors.request.use((function(e){var t=localStorage.getItem("tokenUser");return t&&(e.headers["Authorization"]="Sky ".concat(localStorage.getItem("tokenUser"))),e}),(function(e){return Promise.reject(e)})),i.interceptors.response.use((function(e){var t=e.data;return 4==t.success?(localStorage.removeItem("tokenUser"),void(window.location.href=window.location.origin+"/login")):e}),(function(e){return Promise.reject(e)})),t["a"]=function(){return i}},"77f0":function(e,t,a){},"7dc5":function(e){e.exports=JSON.parse('{"domain":"https://wacatrade.com/","domainRealName":"WacaTrade","support":{"telegram":"","zalo":"","mail":"support@wacaglobal.net"},"BASE_URL_SOCKET":"wss://wacatrade.com:2096","BASE_URL_SOCKET_SYS":"wss://wacatrade.com:2087","BASE_URL_SOCKET_NAP":"wss://wacatrade.com:2083","BASE_URL_SOCKET_NOTIFY":"wss://wacatrade.com:2053"}')},9416:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e._self._c;return t("div",{staticClass:"data-list-container",attrs:{id:"list-history-exchange"}},[t("vs-prompt",{staticClass:"export-options",attrs:{title:"Export To Excel","accept-text":"Export",active:e.activePrompt},on:{cancle:e.clearFields,accept:e.exportToExcel,close:e.clearFields,"update:active":function(t){e.activePrompt=t}}},[t("vs-input",{staticClass:"w-full",attrs:{placeholder:"Enter File Name.."},model:{value:e.fileName,callback:function(t){e.fileName=t},expression:"fileName"}}),t("v-select",{staticClass:"my-4",attrs:{options:e.formats},model:{value:e.selectedFormat,callback:function(t){e.selectedFormat=t},expression:"selectedFormat"}}),t("div",{staticClass:"flex"},[t("span",{staticClass:"mr-4"},[e._v("Cell Auto Width:")]),t("vs-switch",{model:{value:e.cellAutoWidth,callback:function(t){e.cellAutoWidth=t},expression:"cellAutoWidth"}},[e._v("Cell Auto Width")])],1)],1),t("div",{staticClass:"vs-con-loading__container",attrs:{id:"loading-corners"}},[t("vs-table",{ref:"table",attrs:{multiple:"",pagination:"","max-items":e.itemsPerPage,search:"",data:e.products},scopedSlots:e._u([{key:"default",fn:function(n){var r=n.data;return[t("tbody",e._l(r,(function(n,r){return t("vs-tr",{key:r,attrs:{data:n}},[t("vs-td",[t("p",{staticClass:"de-email font-medium truncate"},[e._v(e._s(n.email)),t("br"),e._v("Biệt danh: "+e._s(n.nick_name))])]),t("vs-td",["paypal"==n.from_e&&"paypal"!=n.to_e?t("p",{staticClass:"de-describe font-medium truncate"},[e._v("\n                    Từ: "),t("img",{attrs:{width:"20",src:a("210b")}}),e._v("\n                    "+e._s(n.from_e.toUpperCase())+"\n                    "),t("br"),e._v("\n                    Đến: "),t("IconCrypto",{staticStyle:{width:"20px"},attrs:{coinname:e.getIconType(n.to_e),color:"color",format:"svg"}}),e._v("\n                    "+e._s(n.to_e.toUpperCase())+"\n                ")],1):"paypal"==n.to_e&&"paypal"!=n.from_e?t("p",{staticClass:"de-describe font-medium truncate"},[e._v("\n                    Từ: "),t("IconCrypto",{staticStyle:{width:"20px"},attrs:{coinname:e.getIconType(n.from_e),color:"color",format:"svg"}}),e._v("\n                    "+e._s(n.from_e.toUpperCase())+"\n                    "),t("br"),e._v("\n                    Đến: "),t("img",{attrs:{width:"20",src:a("210b")}}),e._v("\n                    "+e._s(n.to_e.toUpperCase())+"\n                ")],1):t("p",{staticClass:"de-describe font-medium truncate"},[e._v("\n                  Từ: "),t("IconCrypto",{staticStyle:{width:"20px"},attrs:{coinname:e.getIconType(n.from_e),color:"color",format:"svg"}}),e._v("\n                  "+e._s(n.from_e.toUpperCase())+"\n                  "),t("br"),e._v("\n                  Đến: "),t("IconCrypto",{staticStyle:{width:"20px"},attrs:{coinname:e.getIconType(n.to_e),color:"color",format:"svg"}}),e._v("\n                  "+e._s(n.to_e.toUpperCase())+"\n                ")],1)]),t("vs-td",[t("p",{staticClass:"de-send"},[e._v(e._s(e.getAmountDecimal(n.from_e,n.send))+"\n                ")])]),t("vs-td",[n.status?t("p",{staticClass:"de-receive"},[e._v(e._s(e.getAmountDecimal(n.to_e,n.receive)))]):t("p",{staticClass:"de-receive"},[e._v("0")])]),t("vs-td",[t("vs-chip",{staticClass:"de-status",attrs:{color:e.getOrderStatusColor(n.status)}},[e._v(e._s(e._f("title")(e.getOrderStatusColorText(n.status))))])],1),t("vs-td",[t("p",{staticClass:"de-create"},[e._v(e._s(e.formatDate(n.created_at)))])]),t("vs-td",{staticClass:"whitespace-no-wrap text-center"},[0==n.delete_status?t("vx-tooltip",{staticStyle:{float:"left"},attrs:{color:"danger",text:"Xóa"}},[t("vs-button",{attrs:{color:"dark",type:"line","icon-pack":"feather",icon:"icon-trash"},on:{click:function(t){return t.stopPropagation(),e.deleteEx(n.id,r,1)}}})],1):t("vx-tooltip",{staticStyle:{float:"left"},attrs:{color:"warning",text:"Thu hồi"}},[t("vs-button",{attrs:{color:"dark",type:"line","icon-pack":"feather",icon:"icon-arrow-up-left"},on:{click:function(t){return t.stopPropagation(),e.deleteEx(n.id,r,0)}}})],1)],1)],1)})),1)]}}]),model:{value:e.selectedUser,callback:function(t){e.selectedUser=t},expression:"selectedUser"}},[t("div",{staticClass:"flex flex-wrap-reverse items-center flex-grow justify-between",attrs:{slot:"header"},slot:"header"},[t("div",{staticClass:"flex flex-wrap-reverse items-center data-list-btn-container"},[t("vs-dropdown",{staticClass:"dd-actions cursor-pointer mr-4 mb-4",attrs:{"vs-trigger-click":""}},[t("div",{staticClass:"p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32 w-full"},[t("span",{staticClass:"mr-2"},[e._v("Tác vụ")]),t("feather-icon",{attrs:{icon:"ChevronDownIcon",svgClasses:"h-4 w-4"}})],1),t("vs-dropdown-menu",[t("vs-dropdown-item",[e.showDeleteMultiBt?t("span",{staticClass:"flex items-center",on:{click:e.deleteMultiple}},[t("feather-icon",{staticClass:"mr-2",attrs:{icon:"TrashIcon",svgClasses:"h-4 w-4"}}),t("span",[e._v("Xóa")])],1):e._e()]),t("vs-dropdown-item",[t("span",{staticClass:"flex items-center",on:{click:function(t){e.activePrompt=!0}}},[t("feather-icon",{staticClass:"mr-2",attrs:{icon:"FileIcon",svgClasses:"h-4 w-4"}}),t("span",[e._v("In")])],1)])],1)],1)],1),t("vs-dropdown",{staticClass:"cursor-pointer mb-4 mr-4 items-per-page-handler",attrs:{"vs-trigger-click":""}},[t("div",{staticClass:"p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"},[t("span",{staticClass:"mr-2"},[e._v(e._s(e.currentPage*e.itemsPerPage-(e.itemsPerPage-1))+" - "+e._s(e.products.length-e.currentPage*e.itemsPerPage>0?e.currentPage*e.itemsPerPage:e.products.length)+" of "+e._s(e.queriedItems))]),t("feather-icon",{attrs:{icon:"ChevronDownIcon",svgClasses:"h-4 w-4"}})],1),t("vs-dropdown-menu",[t("vs-dropdown-item",{on:{click:function(t){e.itemsPerPage=4}}},[t("span",[e._v("4")])]),t("vs-dropdown-item",{on:{click:function(t){e.itemsPerPage=10}}},[t("span",[e._v("10")])]),t("vs-dropdown-item",{on:{click:function(t){e.itemsPerPage=15}}},[t("span",[e._v("15")])]),t("vs-dropdown-item",{on:{click:function(t){e.itemsPerPage=20}}},[t("span",[e._v("20")])])],1)],1)],1),t("template",{slot:"thead"},[t("vs-th",{attrs:{"sort-key":"email"}},[e._v("Tài khoản")]),t("vs-th",{attrs:{"sort-key":"describe"}},[e._v("Mô tả")]),t("vs-th",{attrs:{"sort-key":"send"}},[e._v("Đã gửi")]),t("vs-th",{attrs:{"sort-key":"receive"}},[e._v("Đã nhận")]),t("vs-th",{attrs:{"sort-key":"status"}},[e._v("Trạng thái")]),t("vs-th",{attrs:{"sort-key":"datecreate"}},[e._v("Thời gian")]),t("vs-th",[e._v("Tác vụ")])],1)],2)],1)],1)},r=[],s=(a("96cf"),a("1da1")),i=a("4a7a"),c=a.n(i),o=a("c5b9"),u=a("c1df"),l=a.n(u),p=a("2b0e"),d={components:{vSelect:c.a},data:function(){return{showDeleteMultiBt:!0,activePrompt:!1,selectedUser:[],fileName:"",formats:["xlsx","csv","txt"],cellAutoWidth:!0,selectedFormat:"xlsx",headerTitle:["Tài khoản","Loại","Số Tiền","Trạng Thái","Ngày Nạp"],headerVal:["account","type","amount","status","datecreate"],productsFake:[{id:1,email:"ares@gmail.com",nick_name:"sky",from_e:"SYS",to_e:"USDT",send:1e3,receive:1e3,status:1,created_at:"00:00:00 02-04-2021"},{id:2,email:"ares@gmail.com",nick_name:"sky",from_e:"USDT",to_e:"SYS",send:1e3,receive:1e3,status:1,created_at:"00:00:00 02-04-2021"},{id:3,email:"ares@gmail.com",nick_name:"sky",from_e:"BTC",to_e:"SYS",send:.001,receive:300,status:0,created_at:"00:00:00 02-04-2021"},{id:4,email:"ares@gmail.com",nick_name:"sky",from_e:"ETH",to_e:"SYS",send:.1,receive:100,status:1,created_at:"00:00:00 02-04-2021"},{id:5,email:"ares@gmail.com",nick_name:"sky",from_e:"SYS",to_e:"BTC",send:1e3,receive:.001,status:1,created_at:"00:00:00 02-04-2021"}],itemsPerPage:10,isMounted:!1}},computed:{currentPage:function(){return this.isMounted?this.$refs.table.currentx:0},products:function(){return this.productsFake},queriedItems:function(){return this.$refs.table?this.$refs.table.queriedResults.length:this.productsFake.length}},methods:{deleteMultiple:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t,a,n,r,s,i=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$store.dispatch("check2fa");case 2:if(t=e.sent,t){e.next=5;break}return e.abrupt("return");case 5:if(a=localStorage.getItem("token"),this.$store.dispatch("setToken",a),0!=this.selectedUser.length){e.next=10;break}return e.abrupt("return",this.$vs.notify({text:"Hãy chọn đối tượng cần xóa",color:"warning",iconPack:"feather",icon:"icon-check"}));case 10:for(n=this.selectedUser.length-1;n>=0;n--)r=this.selectedUser[n]["id"],s={id:r,val:1},o["a"].deleteExTrash(s).then((function(e){e.data.success||(localStorage.removeItem("token"),i.$router.push("/pages/login").catch((function(){})))})),p["default"].delete(this.productsFake,n);return this.selectedUser=[],e.abrupt("return",this.$vs.notify({text:"Đã xóa thành công",color:"success",iconPack:"feather",icon:"icon-check"}));case 13:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),deleteEx:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t,a,n){var r,s,i,c=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$store.dispatch("check2fa");case 2:if(r=e.sent,r){e.next=5;break}return e.abrupt("return");case 5:s=localStorage.getItem("token"),this.$store.dispatch("setToken",s),i={id:t,val:n},o["a"].deleteExTrash(i).then((function(e){if(e.data.success)return p["default"].delete(c.productsFake,a),c.popupDeleteActive=!1,c.$vs.notify({text:"Đã xóa thành công",color:"success",iconPack:"feather",icon:"icon-check"});localStorage.removeItem("token"),c.$router.push("/pages/login").catch((function(){}))}));case 10:case"end":return e.stop()}}),e,this)})));function t(t,a,n){return e.apply(this,arguments)}return t}(),trashDataEx:function(){var e=this;this.showDeleteMultiBt=!1;var t=localStorage.getItem("token");this.$store.dispatch("setToken",t),o["a"].getExListHisTrash().then((function(t){t.data.success?e.productsFake=t.data.data:(localStorage.removeItem("token"),e.$router.push("/pages/login").catch((function(){})))}))},getOrderStatusColor:function(e){return 0==e?"warning":1==e?"success":"warning"},getOrderStatusColorText:function(e){return 0==e?"Đang xử lý":1==e?"Hoàn thành":"Đang xử lý"},getIconType:function(e){var t=e.toUpperCase();return t},formatDate:function(e){if(e)return l()(String(e)).format("MM/DD/YYYY hh:mm:ss")},getAmountDecimal:function(e,t){var a="$",n=e.toUpperCase(),r=2;"BTC"==n&&(r=6),"ETH"==n&&(r=4),"USDT"==n&&(r=2),"VN"==n&&(r=0);var s=new Intl.NumberFormat("en-US",{minimumFractionDigits:r});return a+s.format(t)},reloadList:function(){var e=this;this.showDeleteMultiBt=!0;var t=localStorage.getItem("token");this.$store.dispatch("setToken",t),o["a"].getExListHistory().then((function(t){e.$vs.loading.close("#loading-corners > .con-vs-loading"),t.data.success?e.productsFake=t.data.data:(localStorage.removeItem("token"),e.$router.push("/pages/login").catch((function(){})))}))},toggleDataSidebar:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.addNewDataSidebar=e},exportToExcel:function(){var e=this;if(0==this.selectedUser.length)return this.$vs.notify({title:"Xuất dữ liệu",text:"Vui lòng chọn nội dung để hoàn thành",color:"danger",iconPack:"feather",icon:"icon-heart"});Promise.all([a.e("chunk-54940cbf"),a.e("chunk-510b18c2")]).then(a.bind(null,"4bf8d")).then((function(t){var a=e.selectedUser,n=e.formatJson(e.headerVal,a);t.export_json_to_excel({header:e.headerTitle,data:n,filename:e.fileName,autoWidth:e.cellAutoWidth,bookType:e.selectedFormat}),e.clearFields()}))},formatJson:function(e,t){return t.map((function(t){return e.map((function(e){return t[e]}))}))},clearFields:function(){this.fileName="",this.cellAutoWidth=!0,this.selectedFormat="xlsx"},openLoadingInDiv:function(){this.$vs.loading({container:"#loading-corners",type:"corners",scale:.6})}},created:function(){this.reloadList()},mounted:function(){this.isMounted=!0,this.openLoadingInDiv()}},g=d,f=(a("3e75"),a("2877")),h=Object(f["a"])(g,n,r,!1,null,null,null);t["default"]=h.exports},c5b9:function(e,t,a){"use strict";var n,r=a("ade3"),s=a("3f4a"),i=a("16b6"),c=a("bc3a"),o=a.n(c),u=a("7dc5"),l=function(){return o.a.create({baseURL:"".concat(u.domain),headers:{Authorization:"Sky ".concat(localStorage.getItem("tokenAgency"))}})};t["a"]=(n={active2fa:function(e){return Object(i["a"])().post("api/users/active-2fa",e)},disable2fa:function(e){return Object(i["a"])().post("api/users/disable-2fa",e)},adminDisable2fa:function(e){return Object(i["a"])().post("api/users/admin-disable-2fa",e)},check2fa:function(e){return Object(i["a"])().post("api/users/check-2fa",e)},checkOn2fa:function(){return Object(i["a"])().get("api/users/check-on-2fa")},loginUser:function(e){return Object(s["a"])().post("api/users/login",e)},getTokenActive:function(e){return Object(s["a"])().post("api/users/activeUser",e)},registerUser:function(e){return Object(s["a"])().post("api/users/createAccount",e)},forgotPassUser:function(e){return Object(s["a"])().post("api/users/forgot-password",e)},resendConfirUser:function(e){return Object(s["a"])().post("api/users/resend-confirmation-email",e)},changePassword:function(e){return Object(s["a"])().patch("api/users/change-password",e)},changePassword2:function(e){return Object(s["a"])().patch("api/users/change-password-is",e)},getInfoUser:function(){return Object(s["a"])().get("api/users/info")},updateXacMinhTK:function(e){return Object(s["a"])().post("api/users/update-info",e)},activeGG2FA:function(e){return Object(s["a"])().post("api/users/update-gg2fa",e)},unActiveGG2FA:function(e){return Object(s["a"])().post("api/users/disable-gg2fa",e)},activeTele2FA:function(e){return Object(s["a"])().post("api/users/active-tele2fa",e)},unActiveTele2FA:function(e){return Object(s["a"])().post("api/users/disable-tele2fa",e)},sendGG2FA:function(){return Object(s["a"])().get("api/users/code-2fa")},sendTele2FA:function(){return Object(s["a"])().get("api/users/code-2fa-tele")},createGG2FA:function(e){return void 0!==e?Object(i["a"])().get("api/users/create-gg2fa"):Object(s["a"])().get("api/users/create-gg2fa")},loginGG2FA:function(e){return Object(s["a"])().post("api/users/login-2fa",e)},reloadMoneyDemo:function(){return Object(s["a"])().put("api/users/demo")},getListHitoryOrder:function(){return Object(s["a"])().get("api/users/listbo")},sendMoneyLiveToUsdt:function(e){return Object(s["a"])().post("api/users/live-to-usdt",e)},sendMoneyUsdtToLive:function(e){return Object(s["a"])().post("api/users/usdt-to-live",e)},withdrawalUserNoiBo:function(e){return Object(s["a"])().post("api/users/withdrawal",e)},withdrawalUsdtERC:function(e){return Object(s["a"])().post("api/users/withdrawal-erc",e)},withdrawalUsdtBSC:function(e){return Object(s["a"])().post("api/users/withdrawal-bsc",e)},withdrawalUsdtVND:function(e){return Object(s["a"])().post("api/users/withdrawal-vnd",e)},withdrawalPaypalNoiBo:function(e){return Object(s["a"])().post("api/users/paypal/withdrawal",e)},withdrawalPaypalAccount:function(e){return Object(s["a"])().post("api/users/paypal/withdrawal-acc",e)},getBalanceWallet:function(){return Object(s["a"])().get("api/users/balance-wallet")},scanWallet:function(e){return Object(s["a"])().get("api/users/scan-wallet?e=".concat(e))},scanWalletAdmin:function(e){return Object(i["a"])().get("api/users/scan-wallet-admin?e=".concat(e))},scanWalletAdminNoneFree:function(e){return Object(i["a"])().get("api/users/scan-wallet-admin-none-fee?e=".concat(e))},getBankInfo:function(){return Object(s["a"])().get("api/users/bank-info")},depositWallet:function(e){return Object(s["a"])().post("api/users/usdt-wallet",e)},UserBuyVip:function(){return Object(s["a"])().post("api/users/buy-vip")},getNguoiGioiThieu:function(){return Object(s["a"])().get("api/users/presenter")},getThongTinLoiNhuan:function(){return Object(s["a"])().get("api/users/bo-statistics")},getListHisOrder:function(){return Object(s["a"])().get("api/users/history-order")},getSeachListOrder:function(e){return Object(s["a"])().post("api/users/history-order-date",e)},getListHisTradeWallet:function(){return Object(s["a"])().get("api/users/history-wallet")},getListHisTradeWalletNumber:function(e){return Object(s["a"])().get("api/users/history-wallet/"+e)},getListHisTradeWalletHH:function(){return Object(s["a"])().get("api/users/history-wallet-co")},getListHisTradeWalletHHNumber:function(e){return Object(s["a"])().get("api/users/history-wallet-co/"+e)},getListHisTradeWalletWGD:function(){return Object(s["a"])().get("api/users/history-wallet-trade")},getListHisTradeWalletWGDNumber:function(e){return Object(s["a"])().get("api/users/history-wallet-trade/"+e)},chiTietLoiNhuanHoaHong:function(){return Object(s["a"])().get("api/users/commission-details")},chiTietLoiNhuanHoaHongPage:function(e){return Object(s["a"])().get("api/users/commission-details/"+e)},getSeachListChiTietHH:function(e){return Object(s["a"])().post("api/users/commission-details-date",e)},getSeachListLvAgency:function(e){return Object(s["a"])().post("api/users/agency-search-lv",e)},getSeachListNameAgency:function(e){return Object(s["a"])().post("api/users/agency-search-name",e)},depositPaypal:function(e){return Object(s["a"])().get("api/paypal/pay?a="+e.a+"&n="+e.n)},depositVND:function(e){return Object(s["a"])().get("api/pay/vnd?a="+e.a+"&n="+e.n+"&al="+e.al+"&b="+e.b)},getAddressCoin:function(e){return Object(s["a"])().get("api/wallet/"+e+"/address")},transWallet:function(e){return Object(s["a"])().post("api/exs/trans",e)},getSetupWallet:function(){return Object(s["a"])().get("api/setup/wallet")},getSupport:function(){return Object(s["a"])().get("api/setup/supports")},getExChangeUser:function(){return Object(s["a"])().get("api/exs/hisUser")},getStatusServer:function(){return Object(s["a"])().get("status")},checkGiaoDich:function(e){return Object(s["a"])().post("api/user/balance/trans/check",e)},getListNotifi:function(e){return Object(s["a"])().post("api/users/getListNotifi",e)},updateListNotifi:function(e){return Object(s["a"])().post("api/users/updateListNotifi",e)},activeUser:function(e){return Object(i["a"])().post("api/users/admin-active-user",e)},getRevenueNap:function(){return Object(i["a"])().get("api/trades/getRevenueNap")},getRevenueRut:function(){return Object(i["a"])().get("api/trades/getRevenueRut")},getRevenueTrans:function(){return Object(i["a"])().get("api/trades/getRevenueTrans")},getShowDT:function(e){return Object(i["a"])().post("api/trades/getShowDT",e)},changeAccMarketing:function(e){return Object(i["a"])().post("api/users/changeAcc",e)},changePassAdmin:function(e){return Object(i["a"])().post("api/users/changPassAd",e)},createUser:function(e){return Object(i["a"])().post("api/users/create",e)},register:function(e){return Object(i["a"])().post("api/users/register",e)},loginAdmin:function(e){return Object(i["a"])().post("api/users/AdminSingIn",e)},checkEmail:function(e){return Object(i["a"])().get("api/users/checkEmail/"+e)},getAllMember:function(e){return Object(i["a"])().get("api/users/getAllUser",{params:e})},getAllDeletedMember:function(e){return Object(i["a"])().get("api/users/getAllDeletedUsers",{params:e})},updateMember:function(e){return Object(i["a"])().patch("api/users/updateUser",e)},updatePriceMember:function(e){return Object(i["a"])().patch("api/users/updateMoney",e)},handleMoney:function(e){return Object(i["a"])().post("api/pay/approval",e)},handleMoneyRut:function(e){return Object(i["a"])().post("api/pay/approval-rut",e)},deleteMember:function(e){return Object(i["a"])().delete("api/users/deleteUserById/"+e)},recoverMember:function(e){return Object(i["a"])().delete("api/users/recoverUserById/"+e)},verifiedUser:function(e){return Object(i["a"])().post("api/users/verifiedUser",e)},getListAgency:function(){return Object(i["a"])().get("api/users/getAgency")},viewMemberAgency:function(e){return Object(i["a"])().get("api/users/viewTotalMAgency/"+e)},addMoneyMember:function(e){return Object(i["a"])().post("api/users/addMoneyMember",e)},getRateCommission:function(){return Object(i["a"])().get("api/setup/getRateCommission")},saveRateCommission:function(e){return Object(i["a"])().post("api/setup/saveRateCommission",e)}},Object(r["a"])(n,"saveRateCommission",(function(e){return Object(i["a"])().post("api/setup/saveRateCommission",e)})),Object(r["a"])(n,"getStakingRate",(function(){return Object(i["a"])().get("api/staking/set-rate")})),Object(r["a"])(n,"setStakingRate",(function(e){return Object(i["a"])().post("api/staking/set-rate",e)})),Object(r["a"])(n,"getAddMoneyListHistory",(function(e){return Object(i["a"])().get("api/trades/historyAllAddMoney",{params:e})})),Object(r["a"])(n,"getTotalAddMoney",(function(){return Object(i["a"])().get("api/trades/totalAddMoney")})),Object(r["a"])(n,"getTradeListHistory",(function(e){return Object(i["a"])().get("api/trades/historyAll",{params:e})})),Object(r["a"])(n,"gethistoryAllTrash",(function(e){return Object(i["a"])().get("api/trades/historyAllTrash",{params:e})})),Object(r["a"])(n,"deleteTrashByID",(function(e){return Object(i["a"])().put("api/trades/deleteTradeHisById",e)})),Object(r["a"])(n,"getDepositListHistory",(function(e){return Object(i["a"])().get("api/trades/hisDepositAll",{params:e})})),Object(r["a"])(n,"getDepositListHistoryAgency",(function(e,t){return Object(s["a"])().get("api/trades/hisDepositAll?email=".concat(e,"&").concat(t))})),Object(r["a"])(n,"getDepositAllTrash",(function(e){return Object(i["a"])().get("api/trades/hisDepositAllTrash",{params:e})})),Object(r["a"])(n,"getWithdrawalListHistory",(function(e){return Object(i["a"])().get("api/trades/hisWithDrawalAll",{params:e})})),Object(r["a"])(n,"getWithdrawalListHistoryAgency",(function(e,t){return Object(s["a"])().get("api/trades/hisWithDrawalAll?email=".concat(e).concat(t))})),Object(r["a"])(n,"doneWithDrawalByID",(function(e){return Object(i["a"])().post("api/trades/doneWithdrawal",e)})),Object(r["a"])(n,"doneRefuseWithDrawalByID",(function(e){return Object(i["a"])().post("api/trades/doneRefuseWithdrawal",e)})),Object(r["a"])(n,"getListF1F7",(function(e){return Object(i["a"])().post("api/users/getListF1F7",e)})),Object(r["a"])(n,"getStatisticsListF1F7",(function(e,t){return l().get("api/users/thong-ke-getListF1F7?email=".concat(e).concat(t))})),Object(r["a"])(n,"getSuperior",(function(e){return Object(i["a"])().get("api/users/getSuperior/".concat(e))})),Object(r["a"])(n,"getLiveAccount",(function(e){return Object(i["a"])().get("api/users/get-live-account/".concat(e))})),Object(r["a"])(n,"getLisCommissionSearch",(function(e){return Object(i["a"])().post("api/users/getListCmsHis",e)})),Object(r["a"])(n,"getAnalytics",(function(){return Object(i["a"])().get("api/users/analytics")})),Object(r["a"])(n,"getBetsListHistory",(function(){return Object(i["a"])().get("api/bets/historyBet")})),Object(r["a"])(n,"getBetsListHistoryAgency",(function(e,t){return Object(s["a"])().get("api/bets/historyBet?email=".concat(e,"&").concat(t))})),Object(r["a"])(n,"getBetsListHisTrash",(function(){return Object(i["a"])().get("api/bets/hisBetTrash")})),Object(r["a"])(n,"deleteBetsTrash",(function(e){return Object(i["a"])().patch("api/bets/deleteBet",e)})),Object(r["a"])(n,"getExListHistory",(function(){return Object(i["a"])().get("api/exs/historyEx")})),Object(r["a"])(n,"getExListHisTrash",(function(){return Object(i["a"])().get("api/exs/historyExTrash")})),Object(r["a"])(n,"deleteExTrash",(function(e){return Object(i["a"])().patch("api/exs/deleteEx",e)})),Object(r["a"])(n,"uploadAvatar",(function(e){return Object(s["a"])().post("api/auth/avatar",e)})),Object(r["a"])(n,"uploadPassportFront",(function(e){return Object(s["a"])().post("api/auth/passport/front",e)})),Object(r["a"])(n,"uploadPassportBack",(function(e){return Object(s["a"])().post("api/auth/passport/back",e)})),Object(r["a"])(n,"createChampion",(function(e){return Object(i["a"])().post("api/game/champion",e)})),Object(r["a"])(n,"getChampions",(function(){return Object(i["a"])().get("api/game/champions")})),Object(r["a"])(n,"getChampionsClient",(function(){return Object(s["a"])().get("api/game/champions")})),Object(r["a"])(n,"getTopChampions",(function(){return Object(s["a"])().get("api/game/top-champions")})),Object(r["a"])(n,"deleteChampion",(function(e){return Object(i["a"])().delete("api/game/champion/".concat(e))})),Object(r["a"])(n,"updateChampion",(function(e,t){return Object(i["a"])().put("api/game/champion/".concat(e),t)})),Object(r["a"])(n,"uploadBackgroundImage",(function(e){return Object(s["a"])().post("api/auth/champion",e)})),Object(r["a"])(n,"getActiveGames",(function(){return Object(s["a"])().get("api/game/active-games")})),Object(r["a"])(n,"createLuckyDrawAdmin",(function(e,t){return Object(i["a"])().put("api/game1/lucky-draws/".concat(t),e)})),Object(r["a"])(n,"getLuckyDrawAdmin",(function(){return Object(i["a"])().get("api/game1/lucky-draws-admin")})),Object(r["a"])(n,"getLuckyDraw",(function(){return Object(s["a"])().get("api/game1/lucky-draws")})),Object(r["a"])(n,"getThongTinLoiNhuanHangNgay",(function(){return Object(s["a"])().get("api/users/bo-statistics-current-day")})),Object(r["a"])(n,"createStreakChallenge",(function(e){return Object(i["a"])().post("/api/game2/streak-challenge",e)})),Object(r["a"])(n,"getStreakChallenge",(function(){return Object(i["a"])().get("/api/game2/streak-challenge")})),Object(r["a"])(n,"getStreakClientChallenge",(function(){return Object(s["a"])().get("/api/game2/streak-challenge")})),Object(r["a"])(n,"getUserStreakChallenge",(function(){return Object(i["a"])().get("/api/game2/streak-challenge-user")})),Object(r["a"])(n,"getUserClientStreakChallenge",(function(){return Object(s["a"])().get("/api/game2/streak-challenge-user")})),Object(r["a"])(n,"addUserStreakChallenge",(function(e){return Object(i["a"])().post("/api/game2/streak-challenge-user",e)})),Object(r["a"])(n,"getPrizeUser",(function(){return Object(s["a"])().get("/api/game2/prize")})),Object(r["a"])(n,"getInfoAgency",(function(){return l().get("api/users/info")})),Object(r["a"])(n,"getLuckyReward",(function(){return Object(s["a"])().get("api/users/lucky-reward")})),Object(r["a"])(n,"checkSpinUser",(function(){return Object(s["a"])().get("api/users/check-lucky-spins")})),Object(r["a"])(n,"luckyRewardSpinUser",(function(e){return Object(s["a"])().post("api/users/lucky-reward-spin",e)})),Object(r["a"])(n,"luckyActive",(function(){return Object(s["a"])().get("api/users/lucky-active")})),Object(r["a"])(n,"getAdminUserInfo",(function(e){return Object(i["a"])().get("api/users/get-user-info-admin/"+e)})),Object(r["a"])(n,"getAdminUserTradeAnalyze",(function(e){return Object(i["a"])().get("api/users/get-user-trade-analyze?id="+e)})),Object(r["a"])(n,"getAdminUserBalanceAnalyze",(function(e){return Object(i["a"])().get("api/users/get-user-balance-analyze?id="+e)})),Object(r["a"])(n,"changeAccountInfo",(function(e){return Object(s["a"])().post("api/users/change-account-info",e)})),Object(r["a"])(n,"requestDeposit",(function(e){return Object(s["a"])().post("api/users/request-deposit",e)})),Object(r["a"])(n,"addRequest",(function(e){return Object(i["a"])().post("api/users/add-deposit",e)})),n)}}]);