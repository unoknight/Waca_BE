(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5bb5c6a5"],{"0bef":function(t,e,a){},"159b":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"data-list-container",attrs:{id:"list-verify-account"}},[e("div",{staticClass:"vs-con-loading__container",attrs:{id:"loading-corners"}},[e("vs-table",{ref:"table",attrs:{data:t.products},scopedSlots:t._u([{key:"default",fn:function(a){var n=a.data;return[e("tbody",t._l(n,(function(a,n){return e("vs-tr",{key:n,attrs:{data:a}},[e("vs-td",[e("p",{staticClass:"verify-email font-medium truncate"},[t._v(t._s(a.email)),e("br"),t._v("Số căn cước (CMT): "+t._s(a.so_cmnd?a.so_cmnd:"Không rõ"))])]),e("vs-td",[e("p",{staticClass:"verify-name font-medium truncate"},[t._v(t._s(a.first_name)),e("br"),t._v("Biệt danh: "+t._s(a.nick_name))])]),e("vs-td",[e("p",{staticClass:"verify-id_front",attrs:{color:"primary",type:"border"},on:{click:function(e){return t.getPopupViewImg(a.id_front)}}},[e("img",{attrs:{width:"50",src:"".concat(t.mediaType(a.id_front))}})])]),e("vs-td",[e("p",{staticClass:"verify-id_back",on:{click:function(e){return t.getPopupViewImg(a.id_back)}}},[e("img",{attrs:{width:"50",src:"".concat(t.mediaType(a.id_back))}})])]),e("vs-td",[e("vs-chip",{staticClass:"verify-ac",attrs:{color:t.getOrderStatusColor(a.verified)}},[t._v(t._s(t._f("title")(t.getOrderStatusColorText(a.verified))))])],1),e("vs-td",{staticClass:"whitespace-no-wrap text-center"},[e("vx-tooltip",{staticClass:"hover:text-success",attrs:{title:a.nick_name,color:"success",text:"Xác minh tài khoản"}},[e("div",{on:{click:function(e){return e.stopPropagation(),t.doneVerify(a.id,1,n)}}},[e("feather-icon",{attrs:{icon:"CheckIcon",svgClasses:"w-5 h-5 stroke-current"}}),t._v(" Đồng ý\n                  ")],1)]),e("vx-tooltip",{staticClass:"hover:text-danger",attrs:{title:a.nick_name,color:"danger",text:"Hủy xác minh"}},[e("div",{on:{click:function(e){return e.stopPropagation(),t.doneVerify(a.id,0,n)}}},[e("feather-icon",{attrs:{icon:"XIcon",svgClasses:"w-5 h-5 stroke-current"}}),t._v(" Hủy\n                  ")],1)])],1)],1)})),1)]}}])},[e("div",{staticClass:"flex flex-wrap-reverse items-center flex-grow justify-between",attrs:{slot:"header"},slot:"header"},[e("div",{staticClass:"flex flex-wrap-reverse items-center data-list-btn-container"},[e("vs-dropdown",{staticClass:"dd-actions cursor-pointer mr-4 mb-4",attrs:{"vs-trigger-click":""}},[e("div",{staticClass:"p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32 w-full"},[e("span",{staticClass:"mr-2"},[t._v("Tác vụ")]),e("feather-icon",{attrs:{icon:"ChevronDownIcon",svgClasses:"h-4 w-4"}})],1),e("vs-dropdown-menu",[e("vs-dropdown-item",[e("span",{staticClass:"flex items-center"},[e("feather-icon",{staticClass:"mr-2",attrs:{icon:"FileIcon",svgClasses:"h-4 w-4"}}),e("span",[t._v("In")])],1)])],1)],1)],1),e("div",{staticClass:"flex items-center"},[e("vs-dropdown",{staticClass:"cursor-pointer mb-4 mr-4 items-per-page-handler",attrs:{"vs-trigger-click":""}},[e("div",{staticClass:"p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"},[e("span",{staticClass:"mr-2 text-black"},[t._v(t._s(t.currentPage*t.itemsPerPage-(t.itemsPerPage-1))+" - "+t._s((t.currentPage-1)*t.itemsPerPage+t.itemsPerPage)+" trong "+t._s(t.totalItems))]),e("feather-icon",{attrs:{icon:"ChevronDownIcon",svgClasses:"h-4 w-4"}})],1),e("vs-dropdown-menu",[e("vs-dropdown-item",{on:{click:function(e){t.itemsPerPage=4}}},[e("span",[t._v("4")])]),e("vs-dropdown-item",{on:{click:function(e){t.itemsPerPage=10}}},[e("span",[t._v("10")])]),e("vs-dropdown-item",{on:{click:function(e){t.itemsPerPage=15}}},[e("span",[t._v("15")])]),e("vs-dropdown-item",{on:{click:function(e){t.itemsPerPage=20}}},[e("span",[t._v("20")])])],1)],1),e("div",{staticClass:"con-input-search vs-table--search"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.searchText,expression:"searchText"}],staticClass:"input-search vs-table--search-input",attrs:{type:"text"},domProps:{value:t.searchText},on:{input:function(e){e.target.composing||(t.searchText=e.target.value)}}}),e("vs-icon",{attrs:{icon:"search"}})],1)],1)]),e("template",{slot:"thead"},[e("vs-th",{attrs:{"sort-key":"email"}},[t._v("Email")]),e("vs-th",{attrs:{"sort-key":"name"}},[t._v("Tên")]),e("vs-th",{attrs:{"sort-key":"id_front"}},[t._v("CMND mặt trước")]),e("vs-th",{attrs:{"sort-key":"id_back"}},[t._v("CMND mặt sau")]),e("vs-th",{attrs:{"sort-key":"verify"}},[t._v("Xác minh")]),e("vs-th",[t._v("Tác vụ")])],1)],2),e("vs-pagination",{staticClass:"con-pagination-table vs-table--pagination",attrs:{total:t.totalPage},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1),e("vs-popup",{staticClass:"holamundo",attrs:{title:"Hình ảnh chi tiết",active:t.popupViewImg},on:{"update:active":function(e){t.popupViewImg=e}}},[e("p",{staticClass:"text-center"},[e("img",{staticClass:"responsive",attrs:{src:t.imgLink}})])])],1)},r=[],i=(a("386d"),a("96cf"),a("1da1")),s=a("c5b9"),c=a("7dc5"),o=a("b012"),u={data:function(){return{dm:c.domain,imgLinkDef:a("d6ea"),imgLink:a("d6ea"),popupViewImg:!1,selected:[],productsFake:[{id:1,email:"manhduc@gmail.com",nick_name:"SkyPlaza",first_name:"Ares",id_front:null,id_back:null,verified:0},{id:2,email:"manhduc23@gmail.com",nick_name:"SkyPlaza 2",first_name:"Tùng",id_front:null,id_back:null,verified:1}],itemsPerPage:10,isMounted:!1,addNewDataSidebar:!1,sidebarData:{},currentPage:1,totalItems:0,searchText:""}},computed:{totalPage:function(){return Math.ceil(this.totalItems/this.itemsPerPage)},products:function(){return this.productsFake},queriedItems:function(){return this.$refs.table?this.$refs.table.queriedResults.length:this.productsFake.length}},methods:{doneVerify:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e,a,n){var r,i,c=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$store.dispatch("check2fa");case 2:if(r=t.sent,r){t.next=5;break}return t.abrupt("return");case 5:i={id:e,verified:a},this.productsFake[n].verified=a?1:0,s["a"].verifiedUser(i).then((function(t){return t.data.success?c.$vs.notify({text:a?"Xác minh thành công":"Hủy xác minh thành công",color:"success",iconPack:"feather",icon:"icon-check"}):c.$vs.notify({text:"Xác minh tài khoản thất bại",color:"danger",iconPack:"feather",icon:"icon-alert-circle"})}));case 9:case"end":return t.stop()}}),t,this)})));function e(e,a,n){return t.apply(this,arguments)}return e}(),mediaType:function(t){return null!=t?this.dm+"api/auth/me/photo/passport/"+t:this.imgLinkDef},getPopupViewImg:function(t){this.imgLink=null!=t?this.dm+"api/auth/me/photo/passport/"+t:this.imgLinkDef,this.popupViewImg=!0},getOrderStatusColor:function(t){return 0==t?"warning":1==t?"success":"warning"},getOrderStatusColorText:function(t){return 0==t?"Chưa xác minh":1==t?"Đã xác minh":"Chưa xác minh"},openLoadingInDiv:function(){this.$vs.loading({container:"#loading-corners",type:"corners",scale:.6})},getData:function(){var t=this;this.isMounted&&this.openLoadingInDiv();var e=(this.currentPage-1)*this.itemsPerPage,a=this.itemsPerPage,n={offset:e,limit:a};this.searchText&&(n.s=this.searchText),s["a"].getAllMember(n).then((function(e){t.$vs.loading.close("#loading-corners > .con-vs-loading"),4==e.data.success?(localStorage.removeItem("token"),t.$router.push("/pages/login").catch((function(){}))):(t.totalItems=e.data.data.count,t.productsFake=e.data.data.items)}))},search:Object(o["debounce"])((function(){this.getData()}),500)},created:function(){this.getData()},mounted:function(){this.isMounted=!0,this.openLoadingInDiv()},watch:{currentPage:function(){this.getData()},searchText:function(){this.currentPage=1,this.search()}}},p=u,l=(a("7801"),a("2877")),d=Object(l["a"])(p,n,r,!1,null,null,null);e["default"]=d.exports},"16b6":function(t,e,a){"use strict";var n=a("bc3a"),r=a.n(n),i=a("7dc5");e["a"]=function(){return r.a.create({baseURL:"".concat(i.domain),headers:{Authorization:"Sky ".concat(localStorage.getItem("token"))}})}},"3f4a":function(t,e,a){"use strict";var n=a("bc3a"),r=a.n(n),i=a("7dc5"),s=r.a.create({baseURL:"".concat(i.domain)});s.interceptors.request.use((function(t){var e=localStorage.getItem("tokenUser");return e&&(t.headers["Authorization"]="Sky ".concat(localStorage.getItem("tokenUser"))),t}),(function(t){return Promise.reject(t)})),s.interceptors.response.use((function(t){var e=t.data;return 4==e.success?(localStorage.removeItem("tokenUser"),void(window.location.href=window.location.origin+"/login")):t}),(function(t){return Promise.reject(t)})),e["a"]=function(){return s}},7801:function(t,e,a){"use strict";a("0bef")},"7dc5":function(t){t.exports=JSON.parse('{"domain":"https://wacatrade.com/","domainRealName":"WacaTrade","support":{"telegram":"","zalo":"","mail":"support@wacaglobal.net"},"BASE_URL_SOCKET":"wss://wacatrade.com:2096","BASE_URL_SOCKET_SYS":"wss://wacatrade.com:2087","BASE_URL_SOCKET_NAP":"wss://wacatrade.com:2083","BASE_URL_SOCKET_NOTIFY":"wss://wacatrade.com:2053"}')},b012:function(t,e){function a(t,e,a){var n,r,i,s,c;function o(){var u=Date.now()-s;u<e&&u>=0?n=setTimeout(o,e-u):(n=null,a||(c=t.apply(i,r),i=r=null))}null==e&&(e=100);var u=function(){i=this,r=arguments,s=Date.now();var u=a&&!n;return n||(n=setTimeout(o,e)),u&&(c=t.apply(i,r),i=r=null),c};return u.clear=function(){n&&(clearTimeout(n),n=null)},u.flush=function(){n&&(c=t.apply(i,r),i=r=null,clearTimeout(n),n=null)},u}a.debounce=a,t.exports=a},c5b9:function(t,e,a){"use strict";var n,r=a("ade3"),i=a("3f4a"),s=a("16b6"),c=a("bc3a"),o=a.n(c),u=a("7dc5"),p=function(){return o.a.create({baseURL:"".concat(u.domain),headers:{Authorization:"Sky ".concat(localStorage.getItem("tokenAgency"))}})};e["a"]=(n={active2fa:function(t){return Object(s["a"])().post("api/users/active-2fa",t)},disable2fa:function(t){return Object(s["a"])().post("api/users/disable-2fa",t)},adminDisable2fa:function(t){return Object(s["a"])().post("api/users/admin-disable-2fa",t)},check2fa:function(t){return Object(s["a"])().post("api/users/check-2fa",t)},checkOn2fa:function(){return Object(s["a"])().get("api/users/check-on-2fa")},loginUser:function(t){return Object(i["a"])().post("api/users/login",t)},getTokenActive:function(t){return Object(i["a"])().post("api/users/activeUser",t)},registerUser:function(t){return Object(i["a"])().post("api/users/createAccount",t)},forgotPassUser:function(t){return Object(i["a"])().post("api/users/forgot-password",t)},resendConfirUser:function(t){return Object(i["a"])().post("api/users/resend-confirmation-email",t)},changePassword:function(t){return Object(i["a"])().patch("api/users/change-password",t)},changePassword2:function(t){return Object(i["a"])().patch("api/users/change-password-is",t)},getInfoUser:function(){return Object(i["a"])().get("api/users/info")},updateXacMinhTK:function(t){return Object(i["a"])().post("api/users/update-info",t)},activeGG2FA:function(t){return Object(i["a"])().post("api/users/update-gg2fa",t)},unActiveGG2FA:function(t){return Object(i["a"])().post("api/users/disable-gg2fa",t)},activeTele2FA:function(t){return Object(i["a"])().post("api/users/active-tele2fa",t)},unActiveTele2FA:function(t){return Object(i["a"])().post("api/users/disable-tele2fa",t)},sendGG2FA:function(){return Object(i["a"])().get("api/users/code-2fa")},sendTele2FA:function(){return Object(i["a"])().get("api/users/code-2fa-tele")},createGG2FA:function(t){return void 0!==t?Object(s["a"])().get("api/users/create-gg2fa"):Object(i["a"])().get("api/users/create-gg2fa")},loginGG2FA:function(t){return Object(i["a"])().post("api/users/login-2fa",t)},reloadMoneyDemo:function(){return Object(i["a"])().put("api/users/demo")},getListHitoryOrder:function(){return Object(i["a"])().get("api/users/listbo")},sendMoneyLiveToUsdt:function(t){return Object(i["a"])().post("api/users/live-to-usdt",t)},sendMoneyUsdtToLive:function(t){return Object(i["a"])().post("api/users/usdt-to-live",t)},withdrawalUserNoiBo:function(t){return Object(i["a"])().post("api/users/withdrawal",t)},withdrawalUsdtERC:function(t){return Object(i["a"])().post("api/users/withdrawal-erc",t)},withdrawalUsdtBSC:function(t){return Object(i["a"])().post("api/users/withdrawal-bsc",t)},withdrawalUsdtVND:function(t){return Object(i["a"])().post("api/users/withdrawal-vnd",t)},withdrawalPaypalNoiBo:function(t){return Object(i["a"])().post("api/users/paypal/withdrawal",t)},withdrawalPaypalAccount:function(t){return Object(i["a"])().post("api/users/paypal/withdrawal-acc",t)},getBalanceWallet:function(){return Object(i["a"])().get("api/users/balance-wallet")},scanWallet:function(t){return Object(i["a"])().get("api/users/scan-wallet?e=".concat(t))},scanWalletAdmin:function(t){return Object(s["a"])().get("api/users/scan-wallet-admin?e=".concat(t))},scanWalletAdminNoneFree:function(t){return Object(s["a"])().get("api/users/scan-wallet-admin-none-fee?e=".concat(t))},getBankInfo:function(){return Object(i["a"])().get("api/users/bank-info")},depositWallet:function(t){return Object(i["a"])().post("api/users/usdt-wallet",t)},UserBuyVip:function(){return Object(i["a"])().post("api/users/buy-vip")},getNguoiGioiThieu:function(){return Object(i["a"])().get("api/users/presenter")},getThongTinLoiNhuan:function(){return Object(i["a"])().get("api/users/bo-statistics")},getListHisOrder:function(){return Object(i["a"])().get("api/users/history-order")},getSeachListOrder:function(t){return Object(i["a"])().post("api/users/history-order-date",t)},getListHisTradeWallet:function(){return Object(i["a"])().get("api/users/history-wallet")},getListHisTradeWalletNumber:function(t){return Object(i["a"])().get("api/users/history-wallet/"+t)},getListHisTradeWalletHH:function(){return Object(i["a"])().get("api/users/history-wallet-co")},getListHisTradeWalletHHNumber:function(t){return Object(i["a"])().get("api/users/history-wallet-co/"+t)},getListHisTradeWalletWGD:function(){return Object(i["a"])().get("api/users/history-wallet-trade")},getListHisTradeWalletWGDNumber:function(t){return Object(i["a"])().get("api/users/history-wallet-trade/"+t)},chiTietLoiNhuanHoaHong:function(){return Object(i["a"])().get("api/users/commission-details")},chiTietLoiNhuanHoaHongPage:function(t){return Object(i["a"])().get("api/users/commission-details/"+t)},getSeachListChiTietHH:function(t){return Object(i["a"])().post("api/users/commission-details-date",t)},getSeachListLvAgency:function(t){return Object(i["a"])().post("api/users/agency-search-lv",t)},getSeachListNameAgency:function(t){return Object(i["a"])().post("api/users/agency-search-name",t)},depositPaypal:function(t){return Object(i["a"])().get("api/paypal/pay?a="+t.a+"&n="+t.n)},depositVND:function(t){return Object(i["a"])().get("api/pay/vnd?a="+t.a+"&n="+t.n+"&al="+t.al+"&b="+t.b)},getAddressCoin:function(t){return Object(i["a"])().get("api/wallet/"+t+"/address")},transWallet:function(t){return Object(i["a"])().post("api/exs/trans",t)},getSetupWallet:function(){return Object(i["a"])().get("api/setup/wallet")},getSupport:function(){return Object(i["a"])().get("api/setup/supports")},getExChangeUser:function(){return Object(i["a"])().get("api/exs/hisUser")},getStatusServer:function(){return Object(i["a"])().get("status")},checkGiaoDich:function(t){return Object(i["a"])().post("api/user/balance/trans/check",t)},getListNotifi:function(t){return Object(i["a"])().post("api/users/getListNotifi",t)},updateListNotifi:function(t){return Object(i["a"])().post("api/users/updateListNotifi",t)},activeUser:function(t){return Object(s["a"])().post("api/users/admin-active-user",t)},getRevenueNap:function(){return Object(s["a"])().get("api/trades/getRevenueNap")},getRevenueRut:function(){return Object(s["a"])().get("api/trades/getRevenueRut")},getRevenueTrans:function(){return Object(s["a"])().get("api/trades/getRevenueTrans")},getShowDT:function(t){return Object(s["a"])().post("api/trades/getShowDT",t)},changeAccMarketing:function(t){return Object(s["a"])().post("api/users/changeAcc",t)},changePassAdmin:function(t){return Object(s["a"])().post("api/users/changPassAd",t)},createUser:function(t){return Object(s["a"])().post("api/users/create",t)},register:function(t){return Object(s["a"])().post("api/users/register",t)},loginAdmin:function(t){return Object(s["a"])().post("api/users/AdminSingIn",t)},checkEmail:function(t){return Object(s["a"])().get("api/users/checkEmail/"+t)},getAllMember:function(t){return Object(s["a"])().get("api/users/getAllUser",{params:t})},getAllDeletedMember:function(t){return Object(s["a"])().get("api/users/getAllDeletedUsers",{params:t})},updateMember:function(t){return Object(s["a"])().patch("api/users/updateUser",t)},updatePriceMember:function(t){return Object(s["a"])().patch("api/users/updateMoney",t)},handleMoney:function(t){return Object(s["a"])().post("api/pay/approval",t)},handleMoneyRut:function(t){return Object(s["a"])().post("api/pay/approval-rut",t)},deleteMember:function(t){return Object(s["a"])().delete("api/users/deleteUserById/"+t)},recoverMember:function(t){return Object(s["a"])().delete("api/users/recoverUserById/"+t)},verifiedUser:function(t){return Object(s["a"])().post("api/users/verifiedUser",t)},getListAgency:function(){return Object(s["a"])().get("api/users/getAgency")},viewMemberAgency:function(t){return Object(s["a"])().get("api/users/viewTotalMAgency/"+t)},addMoneyMember:function(t){return Object(s["a"])().post("api/users/addMoneyMember",t)},getRateCommission:function(){return Object(s["a"])().get("api/setup/getRateCommission")},saveRateCommission:function(t){return Object(s["a"])().post("api/setup/saveRateCommission",t)}},Object(r["a"])(n,"saveRateCommission",(function(t){return Object(s["a"])().post("api/setup/saveRateCommission",t)})),Object(r["a"])(n,"getStakingRate",(function(){return Object(s["a"])().get("api/staking/set-rate")})),Object(r["a"])(n,"setStakingRate",(function(t){return Object(s["a"])().post("api/staking/set-rate",t)})),Object(r["a"])(n,"getAddMoneyListHistory",(function(t){return Object(s["a"])().get("api/trades/historyAllAddMoney",{params:t})})),Object(r["a"])(n,"getTotalAddMoney",(function(){return Object(s["a"])().get("api/trades/totalAddMoney")})),Object(r["a"])(n,"getTradeListHistory",(function(t){return Object(s["a"])().get("api/trades/historyAll",{params:t})})),Object(r["a"])(n,"gethistoryAllTrash",(function(t){return Object(s["a"])().get("api/trades/historyAllTrash",{params:t})})),Object(r["a"])(n,"deleteTrashByID",(function(t){return Object(s["a"])().put("api/trades/deleteTradeHisById",t)})),Object(r["a"])(n,"getDepositListHistory",(function(t){return Object(s["a"])().get("api/trades/hisDepositAll",{params:t})})),Object(r["a"])(n,"getDepositListHistoryAgency",(function(t,e){return Object(i["a"])().get("api/trades/hisDepositAll?email=".concat(t,"&").concat(e))})),Object(r["a"])(n,"getDepositAllTrash",(function(t){return Object(s["a"])().get("api/trades/hisDepositAllTrash",{params:t})})),Object(r["a"])(n,"getWithdrawalListHistory",(function(t){return Object(s["a"])().get("api/trades/hisWithDrawalAll",{params:t})})),Object(r["a"])(n,"getWithdrawalListHistoryAgency",(function(t,e){return Object(i["a"])().get("api/trades/hisWithDrawalAll?email=".concat(t).concat(e))})),Object(r["a"])(n,"doneWithDrawalByID",(function(t){return Object(s["a"])().post("api/trades/doneWithdrawal",t)})),Object(r["a"])(n,"doneRefuseWithDrawalByID",(function(t){return Object(s["a"])().post("api/trades/doneRefuseWithdrawal",t)})),Object(r["a"])(n,"getListF1F7",(function(t){return Object(s["a"])().post("api/users/getListF1F7",t)})),Object(r["a"])(n,"getStatisticsListF1F7",(function(t,e){return p().get("api/users/thong-ke-getListF1F7?email=".concat(t).concat(e))})),Object(r["a"])(n,"getSuperior",(function(t){return Object(s["a"])().get("api/users/getSuperior/".concat(t))})),Object(r["a"])(n,"getLiveAccount",(function(t){return Object(s["a"])().get("api/users/get-live-account/".concat(t))})),Object(r["a"])(n,"getLisCommissionSearch",(function(t){return Object(s["a"])().post("api/users/getListCmsHis",t)})),Object(r["a"])(n,"getAnalytics",(function(){return Object(s["a"])().get("api/users/analytics")})),Object(r["a"])(n,"getBetsListHistory",(function(){return Object(s["a"])().get("api/bets/historyBet")})),Object(r["a"])(n,"getBetsListHistoryAgency",(function(t,e){return Object(i["a"])().get("api/bets/historyBet?email=".concat(t,"&").concat(e))})),Object(r["a"])(n,"getBetsListHisTrash",(function(){return Object(s["a"])().get("api/bets/hisBetTrash")})),Object(r["a"])(n,"deleteBetsTrash",(function(t){return Object(s["a"])().patch("api/bets/deleteBet",t)})),Object(r["a"])(n,"getExListHistory",(function(){return Object(s["a"])().get("api/exs/historyEx")})),Object(r["a"])(n,"getExListHisTrash",(function(){return Object(s["a"])().get("api/exs/historyExTrash")})),Object(r["a"])(n,"deleteExTrash",(function(t){return Object(s["a"])().patch("api/exs/deleteEx",t)})),Object(r["a"])(n,"uploadAvatar",(function(t){return Object(i["a"])().post("api/auth/avatar",t)})),Object(r["a"])(n,"uploadPassportFront",(function(t){return Object(i["a"])().post("api/auth/passport/front",t)})),Object(r["a"])(n,"uploadPassportBack",(function(t){return Object(i["a"])().post("api/auth/passport/back",t)})),Object(r["a"])(n,"createChampion",(function(t){return Object(s["a"])().post("api/game/champion",t)})),Object(r["a"])(n,"getChampions",(function(){return Object(s["a"])().get("api/game/champions")})),Object(r["a"])(n,"getChampionsClient",(function(){return Object(i["a"])().get("api/game/champions")})),Object(r["a"])(n,"getTopChampions",(function(){return Object(i["a"])().get("api/game/top-champions")})),Object(r["a"])(n,"deleteChampion",(function(t){return Object(s["a"])().delete("api/game/champion/".concat(t))})),Object(r["a"])(n,"updateChampion",(function(t,e){return Object(s["a"])().put("api/game/champion/".concat(t),e)})),Object(r["a"])(n,"uploadBackgroundImage",(function(t){return Object(i["a"])().post("api/auth/champion",t)})),Object(r["a"])(n,"getActiveGames",(function(){return Object(i["a"])().get("api/game/active-games")})),Object(r["a"])(n,"createLuckyDrawAdmin",(function(t,e){return Object(s["a"])().put("api/game1/lucky-draws/".concat(e),t)})),Object(r["a"])(n,"getLuckyDrawAdmin",(function(){return Object(s["a"])().get("api/game1/lucky-draws-admin")})),Object(r["a"])(n,"getLuckyDraw",(function(){return Object(i["a"])().get("api/game1/lucky-draws")})),Object(r["a"])(n,"getThongTinLoiNhuanHangNgay",(function(){return Object(i["a"])().get("api/users/bo-statistics-current-day")})),Object(r["a"])(n,"createStreakChallenge",(function(t){return Object(s["a"])().post("/api/game2/streak-challenge",t)})),Object(r["a"])(n,"getStreakChallenge",(function(){return Object(s["a"])().get("/api/game2/streak-challenge")})),Object(r["a"])(n,"getStreakClientChallenge",(function(){return Object(i["a"])().get("/api/game2/streak-challenge")})),Object(r["a"])(n,"getUserStreakChallenge",(function(){return Object(s["a"])().get("/api/game2/streak-challenge-user")})),Object(r["a"])(n,"getUserClientStreakChallenge",(function(){return Object(i["a"])().get("/api/game2/streak-challenge-user")})),Object(r["a"])(n,"addUserStreakChallenge",(function(t){return Object(s["a"])().post("/api/game2/streak-challenge-user",t)})),Object(r["a"])(n,"getPrizeUser",(function(){return Object(i["a"])().get("/api/game2/prize")})),Object(r["a"])(n,"getInfoAgency",(function(){return p().get("api/users/info")})),Object(r["a"])(n,"getLuckyReward",(function(){return Object(i["a"])().get("api/users/lucky-reward")})),Object(r["a"])(n,"checkSpinUser",(function(){return Object(i["a"])().get("api/users/check-lucky-spins")})),Object(r["a"])(n,"luckyRewardSpinUser",(function(t){return Object(i["a"])().post("api/users/lucky-reward-spin",t)})),Object(r["a"])(n,"luckyActive",(function(){return Object(i["a"])().get("api/users/lucky-active")})),Object(r["a"])(n,"getAdminUserInfo",(function(t){return Object(s["a"])().get("api/users/get-user-info-admin/"+t)})),Object(r["a"])(n,"getAdminUserTradeAnalyze",(function(t){return Object(s["a"])().get("api/users/get-user-trade-analyze?id="+t)})),Object(r["a"])(n,"getAdminUserBalanceAnalyze",(function(t){return Object(s["a"])().get("api/users/get-user-balance-analyze?id="+t)})),Object(r["a"])(n,"changeAccountInfo",(function(t){return Object(i["a"])().post("api/users/change-account-info",t)})),Object(r["a"])(n,"requestDeposit",(function(t){return Object(i["a"])().post("api/users/request-deposit",t)})),n)},d6ea:function(t,e,a){t.exports=a.p+"img/sfp.93ef979a.png"}}]);