(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4f9227b8"],{"0360":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"dashboard-analytics"}},[e("div",{staticClass:"vx-row"},[e("div",{staticClass:"w-full vx-col lg:w-1/4 mb-base"},[e("vx-card",{attrs:{title:"Trạng thái",subtitle:"Hôm nay"}},[e("template",{slot:"actions"},[e("feather-icon",{attrs:{icon:"MoreVerticalIcon",svgClasses:"w-6 h-6 text-grey"}})],1),e("div",{staticClass:"flex"},[e("span",{staticClass:"flex items-center ml-4"},[e("div",{staticClass:"w-3 h-3 mr-1 rounded-full bg-success"}),e("span",[t._v("Trực tuyến")])])]),e("div",{attrs:{slot:"no-body-bottom"},slot:"no-body-bottom"})],2)],1),e("div",{staticClass:"w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base"},[e("vx-card",{attrs:{title:"Người đăng ký"}},[e("h2",{staticClass:"mb-1 font-bold"},[t._v(t._s(t._f("k_formatter")(t.dataGet.nNDK)))])])],1),e("div",{staticClass:"w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base"},[e("vx-card",{attrs:{title:"Đã xác minh"}},[e("h2",{staticClass:"mb-1 font-bold"},[t._v(t._s(t._f("k_formatter")(t.dataGet.nNDXM)))])])],1),e("div",{staticClass:"w-full vx-col sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base"},[e("vx-card",{attrs:{title:"Đại lý"}},[e("h2",{staticClass:"mb-1 font-bold"},[t._v(t._s(t._f("k_formatter")(t.dataGet.nDL)))])])],1)]),e("div",{staticClass:"vx-row"},[e("div",{staticClass:"w-full vx-col md:w-1/2 mb-base"},[e("div",{staticClass:"overflow-visible vs-con-loading__container",attrs:{id:"loading-corners"}},[e("vx-card",[e("div",{staticClass:"flex-col-reverse vx-row md:flex-col-reverse sm:flex-row lg:flex-row"},[t.salesBarSession.analyticsData?e("div",{staticClass:"flex flex-col justify-between w-full vx-col md:w-full sm:w-1/2 lg:w-1/2 xl:w-1/2"},[e("div",[e("h2",{staticClass:"mb-1 font-bold"},[t._v("\n                  "+t._s(t._f("k_formatter")(t.dataGet.tsNNT))+"\n                ")]),e("span",{staticClass:"font-medium"},[t._v("tài khoản nạp tiền")]),e("p",{staticClass:"mt-2 text-xl font-medium"},[e("span",{class:t.dataGet.tsTN7N>=0?"text-success":"text-danger"},[t.dataGet.tsTN7N>0?e("span",[t._v("+")]):t._e(),e("span",[t._v(t._s(t.dataGet.tsTN7N))])]),e("span",[t._v(" trong 7 ngày qua ")])])])]):t._e()]),e("vs-divider",{staticClass:"my-6"}),e("v-select",{staticClass:"style-chooser",attrs:{options:t.timeOptions,reduce:function(t){return t.code}},on:{"option:selected":t.onSelectedTime},model:{value:t.isCheckShowDT,callback:function(e){t.isCheckShowDT=e},expression:"isCheckShowDT"}}),e("div",{staticClass:"flex items-end mt-2"},[e("div",{staticClass:"mr-4"},[e("small",{staticClass:"date-label"},[t._v("Từ ngày")]),e("datepicker",{attrs:{format:"dd-MM-yyyy"},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}})],1),e("div",{staticClass:"mr-4"},[e("small",{staticClass:"date-label"},[t._v("Đến ngày")]),e("datepicker",{attrs:{name:"end-date",format:"dd-MM-yyyy"},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}})],1),e("vs-button",{attrs:{disabled:!t.startDate||!t.endDate},on:{click:t.filterFromToDate}},[t._v("\n              Tìm\n            ")])],1),e("div",{staticClass:"vx-row"},[e("div",{staticClass:"w-1/2 mb-3 vx-col"},[e("p",[t._v("\n                Hệ thống nạp USDT:"),e("br"),e("span",{staticClass:"font-bold"},[t._v("$"+t._s(t.formatPrice(t.dataGet.tsTNUSD,4)))])])]),e("div",{staticClass:"w-1/2 mb-3 vx-col"},[e("p",[t._v("\n                Phí GAS BNB:"),e("br"),e("span",{staticClass:"font-bold"},[t._v(t._s(t.formatPrice(t.dataGet.tsFee,10)))])])])])],1)],1)]),e("div",{staticClass:"w-full vx-col md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base"},[e("vx-card",{attrs:{title:"Số dư người dùng còn lại"}},[e("div",{staticClass:"vx-row"},[e("div",{staticClass:"w-1/2 mb-3 vx-col"},[e("p",[t._v("\n              Tổng số dư USDT:"),e("br"),e("span",{staticClass:"font-bold"},[t._v("$"+t._s(t.formatPrice(t.dataGet.tsTNUSDN,2)))])])])])])],1),e("div",{staticClass:"w-full vx-col md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base"},[e("div",{staticClass:"vs-con-loading__container",attrs:{id:"loading-corners2"}},[e("vx-card",{attrs:{title:"Hệ thống LÃI USD"}},[e("div",{staticClass:"vx-row"},[e("div",{staticClass:"w-1/2 mb-3 vx-col"},[e("p",[t._v("\n                Tổng giao dịch sàn THẮNG:"),e("br"),e("span",{staticClass:"font-bold"},[t._v("$"+t._s(t.formatPrice(t.dataGet.tsLose,4)))])])]),e("div",{staticClass:"w-1/2 mb-3 vx-col"},[e("p",[t._v("\n                Tổng giao dịch sàn THUA:"),e("br"),e("span",{staticClass:"font-bold"},[t._v("$"+t._s(t.formatPrice(t.dataGet.tsWin,4)))])])]),e("div",{staticClass:"w-1/2 mb-3 vx-col"},[e("p",[t._v("\n                Tổng giao dịch Hoa Hồng:"),e("br"),e("span",{staticClass:"font-bold"},[t._v("$"+t._s(t.formatPrice(t.dataGet.tsHHong,4)))])])]),e("div",{staticClass:"w-1/2 mb-3 vx-col"},[e("p",[t._v("\n                Hệ thống lãi USD:"),e("br"),e("span",{staticClass:"font-bold"},[t._v("$"+t._s(t.formatPrice(t.dataGet.tsLose-t.dataGet.tsWin-t.dataGet.tsHHong,4)))])])])])])],1)])])])},n=[],i=a("1321"),r=a.n(i),c=a("43ca"),o=a("da24"),u=a("5f88"),l=a("4489"),d=a("c5b9"),p=a("4a7a"),g=a.n(p),b=a("c1df"),f=a.n(b),m=a("fa33"),O={data:function(){return{startDate:"",endDate:"",isCheckShowDT:"all",checkpointReward:{},subscribersGained:{},ordersRecevied:{},salesBarSession:{},supportTracker:{},productsOrder:{},salesRadar:{},dataGet:{},rateTNFE:0,timelineData:[{color:"primary",icon:"PlusIcon",title:"Client Meeting",desc:"Bonbon macaroon jelly beans gummi bears jelly lollipop apple",time:"25 mins Ago"},{color:"warning",icon:"MailIcon",title:"Email Newsletter",desc:"Cupcake gummi bears soufflé caramels candy",time:"15 Days Ago"},{color:"danger",icon:"UsersIcon",title:"Plan Webinar",desc:"Candy ice cream cake. Halvah gummi bears",time:"20 days ago"},{color:"success",icon:"LayoutIcon",title:"Launch Website",desc:"Candy ice cream cake. Halvah gummi bears Cupcake gummi bears soufflé caramels candy.",time:"25 days ago"},{color:"primary",icon:"TvIcon",title:"Marketing",desc:"Candy ice cream cake. Halvah gummi bears Cupcake gummi bears.",time:"28 days ago"}],analyticsData:o["a"],dispatchedOrders:[],timeOptions:[{label:"Tất cả",code:"all"},{label:"Hôm nay",code:"today"},{label:"Tuần trước",code:"lastweek"},{label:"Tháng trước",code:"lastmonth"},{label:"3 tháng trước",code:"threelastmonth"}]}},components:{VueApexCharts:r.a,StatisticsCardLine:c["a"],ChangeTimeDurationDropdown:u["a"],VxTimeline:l["a"],vSelect:g.a,Datepicker:m["a"]},methods:{filterFromToDate:function(){var t=f()(this.startDate).format("YYYY-MM-DD"),e=f()(this.endDate).format("YYYY-MM-DD"),a={from:t,to:e};this.changeDT(a)},openLoadingInDiv:function(){this.$vs.loading({container:"#loading-corners",type:"corners",scale:.6}),this.$vs.loading({container:"#loading-corners2",type:"corners",scale:.6})},closeLoadingInDiv:function(){this.$vs.loading.close("#loading-corners > .con-vs-loading"),this.$vs.loading.close("#loading-corners2 > .con-vs-loading")},formatPrice:function(t,e){void 0===t&&(t=0);var a=new Intl.NumberFormat("en-US",{minimumFractionDigits:e});return a.format(t)},onSelectedTime:function(){this.changeDT({type:this.isCheckShowDT})},changeDT:function(t){var e=this;this.openLoadingInDiv(),d["a"].getShowDT(t).then((function(t){var a=t.data;e.closeLoadingInDiv(),1==a.success&&(e.dataGet.tsTNUSD=a.data.dtUSD,e.dataGet.tsTNThuc=a.data.dtBNB,e.dataGet.tsFee=a.data.freeBNB,e.dataGet.tsWin=a.data.tsWin,e.dataGet.tsLose=a.data.tsLose,e.dataGet.tsHHong=a.data.tsHHong,e.dataGet.tsWin_CP=a.data.tsWin_CP,e.dataGet.tsLose_CP=a.data.tsLose_CP)}))}},created:function(){var t=this;d["a"].getAnalytics().then((function(e){if(t.closeLoadingInDiv(),1==e.data.success){var a=e.data.data;t.dataGet=a,t.dataGet.tsWin=parseFloat(t.dataGet.tsWin)+parseFloat(t.dataGet.tsWin_CP),t.dataGet.tsLose=parseFloat(t.dataGet.tsLose)+parseFloat(t.dataGet.tsLose_CP),console.log(t.dataGet)}else e.data.success})).catch((function(t){console.log(t)})),this.$http.get("/api/card/card-analytics/sales/bar").then((function(e){t.salesBarSession=e.data})).catch((function(t){console.log(t)}))},mounted:function(){this.openLoadingInDiv()}},h=O,j=(a("58bc"),a("2877")),v=Object(j["a"])(h,s,n,!1,null,null,null);e["default"]=v.exports},"16b6":function(t,e,a){"use strict";var s=a("bc3a"),n=a.n(s),i=a("7dc5");e["a"]=function(){return n.a.create({baseURL:"".concat(i.domain),headers:{Authorization:"Sky ".concat(localStorage.getItem("token"))}})}},"3f4a":function(t,e,a){"use strict";var s=a("bc3a"),n=a.n(s),i=a("7dc5"),r=n.a.create({baseURL:"".concat(i.domain)});r.interceptors.request.use((function(t){var e=localStorage.getItem("tokenUser");return e&&(t.headers["Authorization"]="Sky ".concat(localStorage.getItem("tokenUser"))),t}),(function(t){return Promise.reject(t)})),r.interceptors.response.use((function(t){var e=t.data;return 4==e.success?(localStorage.removeItem("tokenUser"),void(window.location.href=window.location.origin+"/login")):t}),(function(t){return Promise.reject(t)})),e["a"]=function(){return r}},4489:function(t,e,a){"use strict";var s=function(){var t=this,e=t._self._c;return e("ul",{staticClass:"vx-timeline"},t._l(t.data,(function(a){return e("li",{key:a.title},[e("div",{staticClass:"timeline-icon",class:"bg-".concat(a.color)},[e("feather-icon",{attrs:{icon:a.icon,svgClasses:"text-white stroke-current w-5 h-5"}})],1),e("div",{staticClass:"timeline-info"},[e("p",{staticClass:"font-semibold"},[t._v(t._s(a.title))]),e("span",{staticClass:"activity-desc"},[t._v(t._s(a.desc))])]),e("small",{staticClass:"text-grey activity-e-time"},[t._v(t._s(a.time))])])})),0)},n=[],i={name:"vx-timeline",props:{data:{type:Array,required:!0}}},r=i,c=(a("ede9"),a("2877")),o=Object(c["a"])(r,s,n,!1,null,null,null);e["a"]=o.exports},"58bc":function(t,e,a){"use strict";a("fbc3")},"7dc5":function(t){t.exports=JSON.parse('{"domain":"https://wacatrade.com/","domainRealName":"WacaGlobal","support":{"telegram":"","zalo":"","mail":"wacaglobal@gmail.com"},"BASE_URL_SOCKET":"wss://wacatrade.com:2096","BASE_URL_SOCKET_SYS":"wss://wacatrade.com:2087","BASE_URL_SOCKET_NAP":"wss://wacatrade.com:2083","BASE_URL_SOCKET_NOTIFY":"wss://wacatrade.com:2053"}')},"9e56":function(t,e,a){},c5b9:function(t,e,a){"use strict";var s,n=a("ade3"),i=a("3f4a"),r=a("16b6"),c=a("bc3a"),o=a.n(c),u=a("7dc5"),l=function(){return o.a.create({baseURL:"".concat(u.domain),headers:{Authorization:"Sky ".concat(localStorage.getItem("tokenAgency"))}})};e["a"]=(s={active2fa:function(t){return Object(r["a"])().post("api/users/active-2fa",t)},disable2fa:function(t){return Object(r["a"])().post("api/users/disable-2fa",t)},adminDisable2fa:function(t){return Object(r["a"])().post("api/users/admin-disable-2fa",t)},check2fa:function(t){return Object(r["a"])().post("api/users/check-2fa",t)},checkOn2fa:function(){return Object(r["a"])().get("api/users/check-on-2fa")},loginUser:function(t){return Object(i["a"])().post("api/users/login",t)},getTokenActive:function(t){return Object(i["a"])().post("api/users/activeUser",t)},registerUser:function(t){return Object(i["a"])().post("api/users/createAccount",t)},forgotPassUser:function(t){return Object(i["a"])().post("api/users/forgot-password",t)},resendConfirUser:function(t){return Object(i["a"])().post("api/users/resend-confirmation-email",t)},changePassword:function(t){return Object(i["a"])().patch("api/users/change-password",t)},changePassword2:function(t){return Object(i["a"])().patch("api/users/change-password-is",t)},getInfoUser:function(){return Object(i["a"])().get("api/users/info")},updateXacMinhTK:function(t){return Object(i["a"])().post("api/users/update-info",t)},activeGG2FA:function(t){return Object(i["a"])().post("api/users/update-gg2fa",t)},unActiveGG2FA:function(t){return Object(i["a"])().post("api/users/disable-gg2fa",t)},sendGG2FA:function(){return Object(i["a"])().get("api/users/code-2fa")},createGG2FA:function(t){return void 0!==t?Object(r["a"])().get("api/users/create-gg2fa"):Object(i["a"])().get("api/users/create-gg2fa")},loginGG2FA:function(t){return Object(i["a"])().post("api/users/login-2fa",t)},reloadMoneyDemo:function(){return Object(i["a"])().put("api/users/demo")},getListHitoryOrder:function(){return Object(i["a"])().get("api/users/listbo")},sendMoneyLiveToUsdt:function(t){return Object(i["a"])().post("api/users/live-to-usdt",t)},sendMoneyUsdtToLive:function(t){return Object(i["a"])().post("api/users/usdt-to-live",t)},withdrawalUserNoiBo:function(t){return Object(i["a"])().post("api/users/withdrawal",t)},withdrawalUsdtERC:function(t){return Object(i["a"])().post("api/users/withdrawal-erc",t)},withdrawalUsdtBSC:function(t){return Object(i["a"])().post("api/users/withdrawal-bsc",t)},withdrawalUsdtVND:function(t){return Object(i["a"])().post("api/users/withdrawal-vnd",t)},withdrawalPaypalNoiBo:function(t){return Object(i["a"])().post("api/users/paypal/withdrawal",t)},withdrawalPaypalAccount:function(t){return Object(i["a"])().post("api/users/paypal/withdrawal-acc",t)},getBalanceWallet:function(){return Object(i["a"])().get("api/users/balance-wallet")},scanWallet:function(t){return Object(i["a"])().get("api/users/scan-wallet?e=".concat(t))},scanWalletAdmin:function(t){return Object(r["a"])().get("api/users/scan-wallet-admin?e=".concat(t))},getBankInfo:function(){return Object(i["a"])().get("api/users/bank-info")},depositWallet:function(t){return Object(i["a"])().post("api/users/usdt-wallet",t)},UserBuyVip:function(){return Object(i["a"])().post("api/users/buy-vip")},getNguoiGioiThieu:function(){return Object(i["a"])().get("api/users/presenter")},getThongTinLoiNhuan:function(){return Object(i["a"])().get("api/users/bo-statistics")},getListHisOrder:function(){return Object(i["a"])().get("api/users/history-order")},getSeachListOrder:function(t){return Object(i["a"])().post("api/users/history-order-date",t)},getListHisTradeWallet:function(){return Object(i["a"])().get("api/users/history-wallet")},getListHisTradeWalletNumber:function(t){return Object(i["a"])().get("api/users/history-wallet/"+t)},getListHisTradeWalletHH:function(){return Object(i["a"])().get("api/users/history-wallet-co")},getListHisTradeWalletHHNumber:function(t){return Object(i["a"])().get("api/users/history-wallet-co/"+t)},getListHisTradeWalletWGD:function(){return Object(i["a"])().get("api/users/history-wallet-trade")},getListHisTradeWalletWGDNumber:function(t){return Object(i["a"])().get("api/users/history-wallet-trade/"+t)},chiTietLoiNhuanHoaHong:function(){return Object(i["a"])().get("api/users/commission-details")},chiTietLoiNhuanHoaHongPage:function(t){return Object(i["a"])().get("api/users/commission-details/"+t)},getSeachListChiTietHH:function(t){return Object(i["a"])().post("api/users/commission-details-date",t)},getSeachListLvAgency:function(t){return Object(i["a"])().post("api/users/agency-search-lv",t)},getSeachListNameAgency:function(t){return Object(i["a"])().post("api/users/agency-search-name",t)},depositPaypal:function(t){return Object(i["a"])().get("api/paypal/pay?a="+t.a+"&n="+t.n)},depositVND:function(t){return Object(i["a"])().get("api/pay/vnd?a="+t.a+"&n="+t.n+"&al="+t.al+"&b="+t.b)},getAddressCoin:function(t){return Object(i["a"])().get("api/wallet/"+t+"/address")},transWallet:function(t){return Object(i["a"])().post("api/exs/trans",t)},getSetupWallet:function(){return Object(i["a"])().get("api/setup/wallet")},getSupport:function(){return Object(i["a"])().get("api/setup/supports")},getExChangeUser:function(){return Object(i["a"])().get("api/exs/hisUser")},getStatusServer:function(){return Object(i["a"])().get("status")},checkGiaoDich:function(t){return Object(i["a"])().post("api/user/balance/trans/check",t)},getListNotifi:function(t){return Object(i["a"])().post("api/users/getListNotifi",t)},updateListNotifi:function(t){return Object(i["a"])().post("api/users/updateListNotifi",t)},activeUser:function(t){return Object(r["a"])().post("api/users/admin-active-user",t)},getRevenueNap:function(){return Object(r["a"])().get("api/trades/getRevenueNap")},getRevenueRut:function(){return Object(r["a"])().get("api/trades/getRevenueRut")},getRevenueTrans:function(){return Object(r["a"])().get("api/trades/getRevenueTrans")},getShowDT:function(t){return Object(r["a"])().post("api/trades/getShowDT",t)},changeAccMarketing:function(t){return Object(r["a"])().post("api/users/changeAcc",t)},changePassAdmin:function(t){return Object(r["a"])().post("api/users/changPassAd",t)},createUser:function(t){return Object(r["a"])().post("api/users/create",t)},register:function(t){return Object(r["a"])().post("api/users/register",t)},loginAdmin:function(t){return Object(r["a"])().post("api/users/AdminSingIn",t)},checkEmail:function(t){return Object(r["a"])().get("api/users/checkEmail/"+t)},getAllMember:function(t){return Object(r["a"])().get("api/users/getAllUser",{params:t})},getAllDeletedMember:function(t){return Object(r["a"])().get("api/users/getAllDeletedUsers",{params:t})},updateMember:function(t){return Object(r["a"])().patch("api/users/updateUser",t)},updatePriceMember:function(t){return Object(r["a"])().patch("api/users/updateMoney",t)},handleMoney:function(t){return Object(r["a"])().post("api/pay/approval",t)},handleMoneyRut:function(t){return Object(r["a"])().post("api/pay/approval-rut",t)},deleteMember:function(t){return Object(r["a"])().delete("api/users/deleteUserById/"+t)},recoverMember:function(t){return Object(r["a"])().delete("api/users/recoverUserById/"+t)},verifiedUser:function(t){return Object(r["a"])().post("api/users/verifiedUser",t)},getListAgency:function(){return Object(r["a"])().get("api/users/getAgency")},viewMemberAgency:function(t){return Object(r["a"])().get("api/users/viewTotalMAgency/"+t)},addMoneyMember:function(t){return Object(r["a"])().post("api/users/addMoneyMember",t)},getRateCommission:function(){return Object(r["a"])().get("api/setup/getRateCommission")},saveRateCommission:function(t){return Object(r["a"])().post("api/setup/saveRateCommission",t)}},Object(n["a"])(s,"saveRateCommission",(function(t){return Object(r["a"])().post("api/setup/saveRateCommission",t)})),Object(n["a"])(s,"getStakingRate",(function(){return Object(r["a"])().get("api/staking/set-rate")})),Object(n["a"])(s,"setStakingRate",(function(t){return Object(r["a"])().post("api/staking/set-rate",t)})),Object(n["a"])(s,"getAddMoneyListHistory",(function(t){return Object(r["a"])().get("api/trades/historyAllAddMoney",{params:t})})),Object(n["a"])(s,"getTotalAddMoney",(function(){return Object(r["a"])().get("api/trades/totalAddMoney")})),Object(n["a"])(s,"getTradeListHistory",(function(t){return Object(r["a"])().get("api/trades/historyAll",{params:t})})),Object(n["a"])(s,"gethistoryAllTrash",(function(t){return Object(r["a"])().get("api/trades/historyAllTrash",{params:t})})),Object(n["a"])(s,"deleteTrashByID",(function(t){return Object(r["a"])().put("api/trades/deleteTradeHisById",t)})),Object(n["a"])(s,"getDepositListHistory",(function(t){return Object(r["a"])().get("api/trades/hisDepositAll",{params:t})})),Object(n["a"])(s,"getDepositListHistoryAgency",(function(t,e){return Object(i["a"])().get("api/trades/hisDepositAll?email=".concat(t,"&").concat(e))})),Object(n["a"])(s,"getDepositAllTrash",(function(t){return Object(r["a"])().get("api/trades/hisDepositAllTrash",{params:t})})),Object(n["a"])(s,"getWithdrawalListHistory",(function(t){return Object(r["a"])().get("api/trades/hisWithDrawalAll",{params:t})})),Object(n["a"])(s,"getWithdrawalListHistoryAgency",(function(t,e){return Object(i["a"])().get("api/trades/hisWithDrawalAll?email=".concat(t).concat(e))})),Object(n["a"])(s,"doneWithDrawalByID",(function(t){return Object(r["a"])().post("api/trades/doneWithdrawal",t)})),Object(n["a"])(s,"doneRefuseWithDrawalByID",(function(t){return Object(r["a"])().post("api/trades/doneRefuseWithdrawal",t)})),Object(n["a"])(s,"getListF1F7",(function(t){return Object(r["a"])().post("api/users/getListF1F7",t)})),Object(n["a"])(s,"getStatisticsListF1F7",(function(t,e){return l().get("api/users/thong-ke-getListF1F7?email=".concat(t).concat(e))})),Object(n["a"])(s,"getSuperior",(function(t){return Object(r["a"])().get("api/users/getSuperior/".concat(t))})),Object(n["a"])(s,"getLiveAccount",(function(t){return Object(r["a"])().get("api/users/get-live-account/".concat(t))})),Object(n["a"])(s,"getLisCommissionSearch",(function(t){return Object(r["a"])().post("api/users/getListCmsHis",t)})),Object(n["a"])(s,"getAnalytics",(function(){return Object(r["a"])().get("api/users/analytics")})),Object(n["a"])(s,"getBetsListHistory",(function(){return Object(r["a"])().get("api/bets/historyBet")})),Object(n["a"])(s,"getBetsListHistoryAgency",(function(t,e){return Object(i["a"])().get("api/bets/historyBet?email=".concat(t,"&").concat(e))})),Object(n["a"])(s,"getBetsListHisTrash",(function(){return Object(r["a"])().get("api/bets/hisBetTrash")})),Object(n["a"])(s,"deleteBetsTrash",(function(t){return Object(r["a"])().patch("api/bets/deleteBet",t)})),Object(n["a"])(s,"getExListHistory",(function(){return Object(r["a"])().get("api/exs/historyEx")})),Object(n["a"])(s,"getExListHisTrash",(function(){return Object(r["a"])().get("api/exs/historyExTrash")})),Object(n["a"])(s,"deleteExTrash",(function(t){return Object(r["a"])().patch("api/exs/deleteEx",t)})),Object(n["a"])(s,"uploadAvatar",(function(t){return Object(i["a"])().post("api/auth/avatar",t)})),Object(n["a"])(s,"uploadPassportFront",(function(t){return Object(i["a"])().post("api/auth/passport/front",t)})),Object(n["a"])(s,"uploadPassportBack",(function(t){return Object(i["a"])().post("api/auth/passport/back",t)})),Object(n["a"])(s,"createChampion",(function(t){return Object(r["a"])().post("api/game/champion",t)})),Object(n["a"])(s,"getChampions",(function(){return Object(r["a"])().get("api/game/champions")})),Object(n["a"])(s,"getChampionsClient",(function(){return Object(i["a"])().get("api/game/champions")})),Object(n["a"])(s,"getTopChampions",(function(){return Object(i["a"])().get("api/game/top-champions")})),Object(n["a"])(s,"deleteChampion",(function(t){return Object(r["a"])().delete("api/game/champion/".concat(t))})),Object(n["a"])(s,"updateChampion",(function(t,e){return Object(r["a"])().put("api/game/champion/".concat(t),e)})),Object(n["a"])(s,"uploadBackgroundImage",(function(t){return Object(i["a"])().post("api/auth/champion",t)})),Object(n["a"])(s,"getActiveGames",(function(){return Object(i["a"])().get("api/game/active-games")})),Object(n["a"])(s,"createLuckyDrawAdmin",(function(t,e){return Object(r["a"])().put("api/game1/lucky-draws/".concat(e),t)})),Object(n["a"])(s,"getLuckyDrawAdmin",(function(){return Object(r["a"])().get("api/game1/lucky-draws-admin")})),Object(n["a"])(s,"getLuckyDraw",(function(){return Object(i["a"])().get("api/game1/lucky-draws")})),Object(n["a"])(s,"getThongTinLoiNhuanHangNgay",(function(){return Object(i["a"])().get("api/users/bo-statistics-current-day")})),Object(n["a"])(s,"createStreakChallenge",(function(t){return Object(r["a"])().post("/api/game2/streak-challenge",t)})),Object(n["a"])(s,"getStreakChallenge",(function(){return Object(r["a"])().get("/api/game2/streak-challenge")})),Object(n["a"])(s,"getStreakClientChallenge",(function(){return Object(i["a"])().get("/api/game2/streak-challenge")})),Object(n["a"])(s,"getUserStreakChallenge",(function(){return Object(r["a"])().get("/api/game2/streak-challenge-user")})),Object(n["a"])(s,"getUserClientStreakChallenge",(function(){return Object(i["a"])().get("/api/game2/streak-challenge-user")})),Object(n["a"])(s,"addUserStreakChallenge",(function(t){return Object(r["a"])().post("/api/game2/streak-challenge-user",t)})),Object(n["a"])(s,"getPrizeUser",(function(){return Object(i["a"])().get("/api/game2/prize")})),Object(n["a"])(s,"getInfoAgency",(function(){return l().get("api/users/info")})),Object(n["a"])(s,"getLuckyReward",(function(){return Object(i["a"])().get("api/users/lucky-reward")})),Object(n["a"])(s,"checkSpinUser",(function(){return Object(i["a"])().get("api/users/check-lucky-spins")})),Object(n["a"])(s,"luckyRewardSpinUser",(function(t){return Object(i["a"])().post("api/users/lucky-reward-spin",t)})),Object(n["a"])(s,"luckyActive",(function(){return Object(i["a"])().get("api/users/lucky-active")})),Object(n["a"])(s,"getAdminUserInfo",(function(t){return Object(r["a"])().get("api/users/get-user-info-admin/"+t)})),Object(n["a"])(s,"getAdminUserTradeAnalyze",(function(t){return Object(r["a"])().get("api/users/get-user-trade-analyze?id="+t)})),Object(n["a"])(s,"getAdminUserBalanceAnalyze",(function(t){return Object(r["a"])().get("api/users/get-user-balance-analyze?id="+t)})),s)},ede9:function(t,e,a){"use strict";a("9e56")},fbc3:function(t,e,a){}}]);