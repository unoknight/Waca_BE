(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1378ca29"],{"16b6":function(t,e,a){"use strict";var n=a("bc3a"),r=a.n(n),s=a("7dc5");e["a"]=function(){return r.a.create({baseURL:"".concat(s.domain),headers:{Authorization:"Sky ".concat(localStorage.getItem("token"))}})}},3235:function(t,e,a){},"3f4a":function(t,e,a){"use strict";var n=a("bc3a"),r=a.n(n),s=a("7dc5"),i=r.a.create({baseURL:"".concat(s.domain)});i.interceptors.request.use((function(t){var e=localStorage.getItem("tokenUser");return e&&(t.headers["Authorization"]="Sky ".concat(localStorage.getItem("tokenUser"))),t}),(function(t){return Promise.reject(t)})),i.interceptors.response.use((function(t){var e=t.data;return 4==e.success?(localStorage.removeItem("tokenUser"),void(window.location.href=window.location.origin+"/login")):t}),(function(t){return Promise.reject(t)})),e["a"]=function(){return i}},"7dc5":function(t){t.exports=JSON.parse('{"domain":"https://wacaglobal.net/","domainRealName":"WacaGlobal","support":{"telegram":"","zalo":"","mail":"wacaglobal@gmail.com"},"BASE_URL_SOCKET":"wss://wacaglobal.net:2096","BASE_URL_SOCKET_SYS":"wss://wacaglobal.net:2087","BASE_URL_SOCKET_NAP":"wss://wacaglobal.net:2083","BASE_URL_SOCKET_NOTIFY":"wss://wacaglobal.net:2053"}')},9122:function(t,e,a){"use strict";a("3235")},c5b9:function(t,e,a){"use strict";var n,r=a("ade3"),s=a("3f4a"),i=a("16b6"),c=a("bc3a"),o=a.n(c),u=a("7dc5"),l=function(){return o.a.create({baseURL:"".concat(u.domain),headers:{Authorization:"Sky ".concat(localStorage.getItem("tokenAgency"))}})};e["a"]=(n={active2fa:function(t){return Object(i["a"])().post("api/users/active-2fa",t)},disable2fa:function(t){return Object(i["a"])().post("api/users/disable-2fa",t)},adminDisable2fa:function(t){return Object(i["a"])().post("api/users/admin-disable-2fa",t)},check2fa:function(t){return Object(i["a"])().post("api/users/check-2fa",t)},checkOn2fa:function(){return Object(i["a"])().get("api/users/check-on-2fa")},loginUser:function(t){return Object(s["a"])().post("api/users/login",t)},getTokenActive:function(t){return Object(s["a"])().post("api/users/activeUser",t)},registerUser:function(t){return Object(s["a"])().post("api/users/createAccount",t)},forgotPassUser:function(t){return Object(s["a"])().post("api/users/forgot-password",t)},resendConfirUser:function(t){return Object(s["a"])().post("api/users/resend-confirmation-email",t)},changePassword:function(t){return Object(s["a"])().patch("api/users/change-password",t)},changePassword2:function(t){return Object(s["a"])().patch("api/users/change-password-is",t)},getInfoUser:function(){return Object(s["a"])().get("api/users/info")},updateXacMinhTK:function(t){return Object(s["a"])().post("api/users/update-info",t)},activeGG2FA:function(t){return Object(s["a"])().post("api/users/update-gg2fa",t)},unActiveGG2FA:function(t){return Object(s["a"])().post("api/users/disable-gg2fa",t)},sendGG2FA:function(){return Object(s["a"])().get("api/users/code-2fa")},createGG2FA:function(t){return void 0!==t?Object(i["a"])().get("api/users/create-gg2fa"):Object(s["a"])().get("api/users/create-gg2fa")},loginGG2FA:function(t){return Object(s["a"])().post("api/users/login-2fa",t)},reloadMoneyDemo:function(){return Object(s["a"])().put("api/users/demo")},getListHitoryOrder:function(){return Object(s["a"])().get("api/users/listbo")},sendMoneyLiveToUsdt:function(t){return Object(s["a"])().post("api/users/live-to-usdt",t)},sendMoneyUsdtToLive:function(t){return Object(s["a"])().post("api/users/usdt-to-live",t)},withdrawalUserNoiBo:function(t){return Object(s["a"])().post("api/users/withdrawal",t)},withdrawalUsdtERC:function(t){return Object(s["a"])().post("api/users/withdrawal-erc",t)},withdrawalUsdtBSC:function(t){return Object(s["a"])().post("api/users/withdrawal-bsc",t)},withdrawalUsdtVND:function(t){return Object(s["a"])().post("api/users/withdrawal-vnd",t)},withdrawalPaypalNoiBo:function(t){return Object(s["a"])().post("api/users/paypal/withdrawal",t)},withdrawalPaypalAccount:function(t){return Object(s["a"])().post("api/users/paypal/withdrawal-acc",t)},getBalanceWallet:function(){return Object(s["a"])().get("api/users/balance-wallet")},scanWallet:function(t){return Object(s["a"])().get("api/users/scan-wallet?e=".concat(t))},scanWalletAdmin:function(t){return Object(s["a"])().get("api/users/scan-wallet-admin?e=".concat(t))},getBankInfo:function(){return Object(s["a"])().get("api/users/bank-info")},depositWallet:function(t){return Object(s["a"])().post("api/users/usdt-wallet",t)},UserBuyVip:function(){return Object(s["a"])().post("api/users/buy-vip")},getNguoiGioiThieu:function(){return Object(s["a"])().get("api/users/presenter")},getThongTinLoiNhuan:function(){return Object(s["a"])().get("api/users/bo-statistics")},getListHisOrder:function(){return Object(s["a"])().get("api/users/history-order")},getSeachListOrder:function(t){return Object(s["a"])().post("api/users/history-order-date",t)},getListHisTradeWallet:function(){return Object(s["a"])().get("api/users/history-wallet")},getListHisTradeWalletNumber:function(t){return Object(s["a"])().get("api/users/history-wallet/"+t)},getListHisTradeWalletHH:function(){return Object(s["a"])().get("api/users/history-wallet-co")},getListHisTradeWalletHHNumber:function(t){return Object(s["a"])().get("api/users/history-wallet-co/"+t)},getListHisTradeWalletWGD:function(){return Object(s["a"])().get("api/users/history-wallet-trade")},getListHisTradeWalletWGDNumber:function(t){return Object(s["a"])().get("api/users/history-wallet-trade/"+t)},chiTietLoiNhuanHoaHong:function(){return Object(s["a"])().get("api/users/commission-details")},chiTietLoiNhuanHoaHongPage:function(t){return Object(s["a"])().get("api/users/commission-details/"+t)},getSeachListChiTietHH:function(t){return Object(s["a"])().post("api/users/commission-details-date",t)},getSeachListLvAgency:function(t){return Object(s["a"])().post("api/users/agency-search-lv",t)},getSeachListNameAgency:function(t){return Object(s["a"])().post("api/users/agency-search-name",t)},depositPaypal:function(t){return Object(s["a"])().get("api/paypal/pay?a="+t.a+"&n="+t.n)},depositVND:function(t){return Object(s["a"])().get("api/pay/vnd?a="+t.a+"&n="+t.n+"&al="+t.al+"&b="+t.b)},getAddressCoin:function(t){return Object(s["a"])().get("api/wallet/"+t+"/address")},transWallet:function(t){return Object(s["a"])().post("api/exs/trans",t)},getSetupWallet:function(){return Object(s["a"])().get("api/setup/wallet")},getSupport:function(){return Object(s["a"])().get("api/setup/supports")},getExChangeUser:function(){return Object(s["a"])().get("api/exs/hisUser")},getStatusServer:function(){return Object(s["a"])().get("status")},checkGiaoDich:function(t){return Object(s["a"])().post("api/user/balance/trans/check",t)},getListNotifi:function(t){return Object(s["a"])().post("api/users/getListNotifi",t)},updateListNotifi:function(t){return Object(s["a"])().post("api/users/updateListNotifi",t)},activeUser:function(t){return Object(i["a"])().post("api/users/admin-active-user",t)},getRevenueNap:function(){return Object(i["a"])().get("api/trades/getRevenueNap")},getRevenueRut:function(){return Object(i["a"])().get("api/trades/getRevenueRut")},getRevenueTrans:function(){return Object(i["a"])().get("api/trades/getRevenueTrans")},getShowDT:function(t){return Object(i["a"])().post("api/trades/getShowDT",t)},changeAccMarketing:function(t){return Object(i["a"])().post("api/users/changeAcc",t)},changePassAdmin:function(t){return Object(i["a"])().post("api/users/changPassAd",t)},createUser:function(t){return Object(i["a"])().post("api/users/create",t)},register:function(t){return Object(i["a"])().post("api/users/register",t)},loginAdmin:function(t){return Object(i["a"])().post("api/users/AdminSingIn",t)},checkEmail:function(t){return Object(i["a"])().get("api/users/checkEmail/"+t)},getAllMember:function(t){return Object(i["a"])().get("api/users/getAllUser",{params:t})},getAllDeletedMember:function(t){return Object(i["a"])().get("api/users/getAllDeletedUsers",{params:t})},updateMember:function(t){return Object(i["a"])().patch("api/users/updateUser",t)},updatePriceMember:function(t){return Object(i["a"])().patch("api/users/updateMoney",t)},handleMoney:function(t){return Object(i["a"])().post("api/pay/approval",t)},handleMoneyRut:function(t){return Object(i["a"])().post("api/pay/approval-rut",t)},deleteMember:function(t){return Object(i["a"])().delete("api/users/deleteUserById/"+t)},recoverMember:function(t){return Object(i["a"])().delete("api/users/recoverUserById/"+t)},verifiedUser:function(t){return Object(i["a"])().post("api/users/verifiedUser",t)},getListAgency:function(){return Object(i["a"])().get("api/users/getAgency")},viewMemberAgency:function(t){return Object(i["a"])().get("api/users/viewTotalMAgency/"+t)},addMoneyMember:function(t){return Object(i["a"])().post("api/users/addMoneyMember",t)},getRateCommission:function(){return Object(i["a"])().get("api/setup/getRateCommission")},saveRateCommission:function(t){return Object(i["a"])().post("api/setup/saveRateCommission",t)}},Object(r["a"])(n,"saveRateCommission",(function(t){return Object(i["a"])().post("api/setup/saveRateCommission",t)})),Object(r["a"])(n,"getStakingRate",(function(){return Object(i["a"])().get("api/staking/set-rate")})),Object(r["a"])(n,"setStakingRate",(function(t){return Object(i["a"])().post("api/staking/set-rate",t)})),Object(r["a"])(n,"getAddMoneyListHistory",(function(t){return Object(i["a"])().get("api/trades/historyAllAddMoney",{params:t})})),Object(r["a"])(n,"getTotalAddMoney",(function(){return Object(i["a"])().get("api/trades/totalAddMoney")})),Object(r["a"])(n,"getTradeListHistory",(function(t){return Object(i["a"])().get("api/trades/historyAll",{params:t})})),Object(r["a"])(n,"gethistoryAllTrash",(function(t){return Object(i["a"])().get("api/trades/historyAllTrash",{params:t})})),Object(r["a"])(n,"deleteTrashByID",(function(t){return Object(i["a"])().put("api/trades/deleteTradeHisById",t)})),Object(r["a"])(n,"getDepositListHistory",(function(t){return Object(i["a"])().get("api/trades/hisDepositAll",{params:t})})),Object(r["a"])(n,"getDepositListHistoryAgency",(function(t,e){return Object(s["a"])().get("api/trades/hisDepositAll?email=".concat(t,"&").concat(e))})),Object(r["a"])(n,"getDepositAllTrash",(function(t){return Object(i["a"])().get("api/trades/hisDepositAllTrash",{params:t})})),Object(r["a"])(n,"getWithdrawalListHistory",(function(t){return Object(i["a"])().get("api/trades/hisWithDrawalAll",{params:t})})),Object(r["a"])(n,"getWithdrawalListHistoryAgency",(function(t,e){return Object(s["a"])().get("api/trades/hisWithDrawalAll?email=".concat(t).concat(e))})),Object(r["a"])(n,"doneWithDrawalByID",(function(t){return Object(i["a"])().post("api/trades/doneWithdrawal",t)})),Object(r["a"])(n,"doneRefuseWithDrawalByID",(function(t){return Object(i["a"])().post("api/trades/doneRefuseWithdrawal",t)})),Object(r["a"])(n,"getListF1F7",(function(t){return Object(i["a"])().post("api/users/getListF1F7",t)})),Object(r["a"])(n,"getStatisticsListF1F7",(function(t,e){return l().get("api/users/thong-ke-getListF1F7?email=".concat(t).concat(e))})),Object(r["a"])(n,"getSuperior",(function(t){return Object(i["a"])().get("api/users/getSuperior/".concat(t))})),Object(r["a"])(n,"getLiveAccount",(function(t){return Object(i["a"])().get("api/users/get-live-account/".concat(t))})),Object(r["a"])(n,"getLisCommissionSearch",(function(t){return Object(i["a"])().post("api/users/getListCmsHis",t)})),Object(r["a"])(n,"getAnalytics",(function(){return Object(i["a"])().get("api/users/analytics")})),Object(r["a"])(n,"getBetsListHistory",(function(){return Object(i["a"])().get("api/bets/historyBet")})),Object(r["a"])(n,"getBetsListHistoryAgency",(function(t,e){return Object(s["a"])().get("api/bets/historyBet?email=".concat(t,"&").concat(e))})),Object(r["a"])(n,"getBetsListHisTrash",(function(){return Object(i["a"])().get("api/bets/hisBetTrash")})),Object(r["a"])(n,"deleteBetsTrash",(function(t){return Object(i["a"])().patch("api/bets/deleteBet",t)})),Object(r["a"])(n,"getExListHistory",(function(){return Object(i["a"])().get("api/exs/historyEx")})),Object(r["a"])(n,"getExListHisTrash",(function(){return Object(i["a"])().get("api/exs/historyExTrash")})),Object(r["a"])(n,"deleteExTrash",(function(t){return Object(i["a"])().patch("api/exs/deleteEx",t)})),Object(r["a"])(n,"uploadAvatar",(function(t){return Object(s["a"])().post("api/auth/avatar",t)})),Object(r["a"])(n,"uploadPassportFront",(function(t){return Object(s["a"])().post("api/auth/passport/front",t)})),Object(r["a"])(n,"uploadPassportBack",(function(t){return Object(s["a"])().post("api/auth/passport/back",t)})),Object(r["a"])(n,"createChampion",(function(t){return Object(i["a"])().post("api/game/champion",t)})),Object(r["a"])(n,"getChampions",(function(){return Object(i["a"])().get("api/game/champions")})),Object(r["a"])(n,"getChampionsClient",(function(){return Object(s["a"])().get("api/game/champions")})),Object(r["a"])(n,"deleteChampion",(function(t){return Object(i["a"])().delete("api/game/champion/".concat(t))})),Object(r["a"])(n,"updateChampion",(function(t,e){return Object(i["a"])().put("api/game/champion/".concat(t),e)})),Object(r["a"])(n,"uploadBackgroundImage",(function(t){return Object(s["a"])().post("api/auth/champion",t)})),Object(r["a"])(n,"getActiveGames",(function(){return Object(s["a"])().get("api/game/active-games")})),Object(r["a"])(n,"createLuckyDrawAdmin",(function(t,e){return Object(i["a"])().put("api/game1/lucky-draws/".concat(e),t)})),Object(r["a"])(n,"getLuckyDrawAdmin",(function(){return Object(i["a"])().get("api/game1/lucky-draws-admin")})),Object(r["a"])(n,"getLuckyDraw",(function(){return Object(s["a"])().get("api/game1/lucky-draws")})),Object(r["a"])(n,"getThongTinLoiNhuanHangNgay",(function(){return Object(s["a"])().get("api/users/bo-statistics-current-day")})),Object(r["a"])(n,"createStreakChallenge",(function(t){return Object(i["a"])().post("/api/game2/streak-challenge",t)})),Object(r["a"])(n,"getStreakChallenge",(function(){return Object(i["a"])().get("/api/game2/streak-challenge")})),Object(r["a"])(n,"getStreakClientChallenge",(function(){return Object(s["a"])().get("/api/game2/streak-challenge")})),Object(r["a"])(n,"getUserStreakChallenge",(function(){return Object(i["a"])().get("/api/game2/streak-challenge-user")})),Object(r["a"])(n,"getUserClientStreakChallenge",(function(){return Object(s["a"])().get("/api/game2/streak-challenge-user")})),Object(r["a"])(n,"addUserStreakChallenge",(function(t){return Object(i["a"])().post("/api/game2/streak-challenge-user",t)})),Object(r["a"])(n,"getPrizeUser",(function(){return Object(s["a"])().get("/api/game2/prize")})),Object(r["a"])(n,"getInfoAgency",(function(){return l().get("api/users/info")})),Object(r["a"])(n,"getLuckyReward",(function(){return Object(s["a"])().get("api/users/lucky-reward")})),Object(r["a"])(n,"checkSpinUser",(function(){return Object(s["a"])().get("api/users/check-lucky-spins")})),Object(r["a"])(n,"luckyRewardSpinUser",(function(t){return Object(s["a"])().post("api/users/lucky-reward-spin",t)})),Object(r["a"])(n,"luckyActive",(function(){return Object(s["a"])().get("api/users/lucky-active")})),n)},f9b7:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"data-list-container",attrs:{id:"list-bet-trade"}},[e("vs-prompt",{staticClass:"export-options",attrs:{title:"Export To Excel","accept-text":"Export",active:t.activePrompt},on:{cancle:t.clearFields,accept:t.exportToExcel,close:t.clearFields,"update:active":function(e){t.activePrompt=e}}},[e("vs-input",{staticClass:"w-full",attrs:{placeholder:"Enter File Name.."},model:{value:t.fileName,callback:function(e){t.fileName=e},expression:"fileName"}}),e("v-select",{staticClass:"my-4",attrs:{options:t.formats},model:{value:t.selectedFormat,callback:function(e){t.selectedFormat=e},expression:"selectedFormat"}}),e("div",{staticClass:"flex"},[e("span",{staticClass:"mr-4"},[t._v("Cell Auto Width:")]),e("vs-switch",{model:{value:t.cellAutoWidth,callback:function(e){t.cellAutoWidth=e},expression:"cellAutoWidth"}},[t._v("Cell Auto Width")])],1)],1),e("div",{staticClass:"vs-con-loading__container",attrs:{id:"loading-corners"}},[e("vs-table",{ref:"table",attrs:{multiple:"",pagination:"","max-items":t.itemsPerPage,search:"",data:t.products},scopedSlots:t._u([{key:"default",fn:function(a){var n=a.data;return[e("tbody",t._l(n.filter((function(t){return t.type_account})),(function(a,n){return e("vs-tr",{key:n,attrs:{data:a}},[e("vs-td",[e("p",{staticClass:"font-medium truncate bet-description"},[t._v("Email: "+t._s(a.email))]),e("p",{staticClass:"font-medium truncate bet-description"},[t._v("ID: "+t._s(a.id_account))]),a.type_account?e("p",{staticClass:"font-medium truncate bet-description"},[t._v("Live Account")]):e("p",{staticClass:"font-medium truncate bet-description"},[t._v("Demo Account")])]),e("vs-td",[e("p",{staticClass:"bet-currency"},[t._v(t._s(a.currency)),e("br"),a.marketing?e("span",{staticStyle:{"text-decoration":"underline",color:"#84f98d"}},[t._v("Marketing")]):e("span",[t._v("Thường")])])]),e("vs-td",["buy"==a.buy_sell?e("p",{staticClass:"bet-buy_sell"},[e("span",{staticClass:"text-success"},[t._v("MUA")])]):e("p",{staticClass:"bet-buy_sell"},[e("span",{staticClass:"text-danger"},[t._v("BÁN")])])]),e("vs-td",[e("p",{staticClass:"bet-amount"},[e("IconCrypto",{staticStyle:{width:"20px"},attrs:{coinname:"USD",color:"color",format:"svg"}}),e("font",{attrs:{color:"rgb(25 146 246)"}},[t._v(t._s(t.getAmountDecimal("vn",a.amount_bet)))])],1)]),e("vs-td",[e("p",{staticClass:"bet-win_lose"},[e("span",{staticStyle:{color:"#fb9494","font-weight":"bold"}},[t._v(t._s("".concat(0!=a.amount_win?"+"+a.amount_win:"-"+a.amount_lose)))])])]),e("vs-td",[0!=a.amount_win?e("p",{staticClass:"bet-result_bet"},[e("span",{staticClass:"text-success"},[t._v("Thắng")])]):e("p",{staticClass:"bet-result_bet"},[e("span",{staticClass:"text-danger"},[t._v("Thua")])])]),e("vs-td",[e("p",{staticClass:"bet-open_close"},[t._v(t._s("".concat(a.open," -> ").concat(a.close)))]),e("p",[t._v("Phiên: "+t._s(a.session))])]),e("vs-td",[e("p",{staticClass:"de-create"},[t._v(t._s(a.created_at))])])],1)})),1)]}}]),model:{value:t.selectedUser,callback:function(e){t.selectedUser=e},expression:"selectedUser"}},[e("div",{staticClass:"flex flex-wrap-reverse items-center justify-between flex-grow",attrs:{slot:"header"},slot:"header"},[e("div",{staticClass:"flex flex-wrap-reverse items-center data-list-btn-container"},[e("select",{staticClass:"block w-full p-3 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"},[e("option",{attrs:{selected:"",value:"0"}},[t._v("Tài khoản thường")]),e("option",{attrs:{value:"1"}},[t._v("Tài khoản Marketing")])])]),e("vs-dropdown",{staticClass:"mb-4 mr-4 cursor-pointer items-per-page-handler",attrs:{"vs-trigger-click":""}},[e("div",{staticClass:"flex items-center justify-between p-4 font-medium border border-solid rounded-full cursor-pointer d-theme-border-grey-light d-theme-dark-bg"},[e("span",{staticClass:"mr-2"},[t._v(t._s(t.currentPage*t.itemsPerPage-(t.itemsPerPage-1))+" - "+t._s(t.products.length-t.currentPage*t.itemsPerPage>0?t.currentPage*t.itemsPerPage:t.products.length)+" of "+t._s(t.queriedItems))]),e("feather-icon",{attrs:{icon:"ChevronDownIcon",svgClasses:"h-4 w-4"}})],1),e("vs-dropdown-menu",[e("vs-dropdown-item",{on:{click:function(e){t.itemsPerPage=4}}},[e("span",[t._v("4")])]),e("vs-dropdown-item",{on:{click:function(e){t.itemsPerPage=10}}},[e("span",[t._v("10")])]),e("vs-dropdown-item",{on:{click:function(e){t.itemsPerPage=15}}},[e("span",[t._v("15")])]),e("vs-dropdown-item",{on:{click:function(e){t.itemsPerPage=20}}},[e("span",[t._v("20")])])],1)],1)],1),e("template",{slot:"thead"},[e("vs-th",{attrs:{"sort-key":"description"}},[t._v("Mô tả")]),e("vs-th",{attrs:{"sort-key":"type"}},[t._v("Loại")]),e("vs-th",{attrs:{"sort-key":"buy_sell"}},[t._v("Mua / Bán")]),e("vs-th",{attrs:{"sort-key":"amount"}},[t._v("Số tiền cược")]),e("vs-th",{attrs:{"sort-key":"win_lose"}},[t._v("Thắng / Thua")]),e("vs-th",{attrs:{"sort-key":"result_bet"}},[t._v("Kết quả")]),e("vs-th",{attrs:{"sort-key":"open_close"}},[t._v("Open / Close")]),e("vs-th",{attrs:{"sort-key":"datecreate"}},[t._v("Thời gian")])],1)],2)],1)],1)},r=[],s=(a("96cf"),a("1da1")),i=a("4a7a"),c=a.n(i),o=a("c5b9"),u=(a("c1df"),a("2b0e")),l={components:{vSelect:c.a},data:function(){return{showDeleteMultiBt:!0,activePrompt:!1,selectedUser:[],fileName:"",formats:["xlsx","csv","txt"],cellAutoWidth:!0,selectedFormat:"xlsx",headerTitle:["ID","Mô tả","Loại","Số Tiền","Ghi Chú","Ngày Giao Dịch"],headerVal:["id","description","type","amount","note","datecreate"],productsFake:[{id:1,id_account:"134242",type_account:1,buy_sell:"buy",amount_win:9.5,amount_lose:0,amount_bet:9.5,currency:"BTC",open:50552.98,close:50541.01,session:154242443,created_at:"00:00:00 02-04-2021"}],itemsPerPage:10,isMounted:!1,accountType:0}},computed:{currentPage:function(){return this.isMounted?this.$refs.table.currentx:0},products:function(){return this.productsFake},queriedItems:function(){return this.$refs.table?this.$refs.table.queriedResults.length:this.productsFake.length}},methods:{deleteMultiple:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var e,a,n,r,s,i=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$store.dispatch("check2fa");case 2:if(e=t.sent,e){t.next=5;break}return t.abrupt("return");case 5:if(a=localStorage.getItem("token"),this.$store.dispatch("setToken",a),0!=this.selectedUser.length){t.next=10;break}return t.abrupt("return",this.$vs.notify({text:"Hãy chọn đối tượng cần xóa",color:"warning",iconPack:"feather",icon:"icon-check"}));case 10:for(n=this.selectedUser.length-1;n>=0;n--)r=this.selectedUser[n]["id"],s={id:r,val:1},o["a"].deleteBetsTrash(s).then((function(t){t.data.success||(localStorage.removeItem("token"),i.$router.push("/pages/login").catch((function(){})))})),u["default"].delete(this.productsFake,n);return this.selectedUser=[],t.abrupt("return",this.$vs.notify({text:"Đã xóa thành công",color:"success",iconPack:"feather",icon:"icon-check"}));case 13:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),deleteBet:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e,a,n){var r,s,i,c=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$store.dispatch("check2fa");case 2:if(r=t.sent,r){t.next=5;break}return t.abrupt("return");case 5:s=localStorage.getItem("token"),this.$store.dispatch("setToken",s),i={id:e,val:n},o["a"].deleteBetsTrash(i).then((function(t){if(t.data.success)return u["default"].delete(c.productsFake,a),c.popupDeleteActive=!1,c.$vs.notify({text:"Đã xóa thành công",color:"success",iconPack:"feather",icon:"icon-check"});localStorage.removeItem("token"),c.$router.push("/pages/login").catch((function(){}))}));case 10:case"end":return t.stop()}}),t,this)})));function e(e,a,n){return t.apply(this,arguments)}return e}(),trashDataBet:function(){var t=this;this.showDeleteMultiBt=!1;var e=localStorage.getItem("token");this.$store.dispatch("setToken",e),o["a"].getBetsListHisTrash().then((function(e){e.data.success?t.productsFake=e.data.data:(localStorage.removeItem("token"),t.$router.push("/pages/login").catch((function(){})))}))},getOrderStatusColor:function(t){return 0==t?"warning":1==t?"success":"warning"},getOrderStatusColorText:function(t){return 0==t?"Chờ xử lý":1==t?"Hoàn thành":"Chờ xử lý"},getIconType:function(t){var e=t.toUpperCase();return e},getAmountDecimal:function(t,e){var a="$",n=t.toUpperCase(),r=2;"BTC"==n&&(r=6),"ETH"==n&&(r=4),"USDT"==n&&(r=2),"VN"==n&&(r=0);var s=new Intl.NumberFormat("en-US",{minimumFractionDigits:r});return a+s.format(e)},toggleDataSidebar:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.addNewDataSidebar=t},exportToExcel:function(){var t=this;if(0==this.selectedUser.length)return this.$vs.notify({title:"Xuất dữ liệu",text:"Vui lòng chọn nội dung để hoàn thành",color:"danger",iconPack:"feather",icon:"icon-heart"});Promise.all([a.e("chunk-54940cbf"),a.e("chunk-510b18c2")]).then(a.bind(null,"4bf8d")).then((function(e){var a=t.selectedUser,n=t.formatJson(t.headerVal,a);e.export_json_to_excel({header:t.headerTitle,data:n,filename:t.fileName,autoWidth:t.cellAutoWidth,bookType:t.selectedFormat}),t.clearFields()}))},formatJson:function(t,e){return e.map((function(e){return t.map((function(t){return e[t]}))}))},clearFields:function(){this.fileName="",this.cellAutoWidth=!0,this.selectedFormat="xlsx"},reloadList:function(){var t=this;this.showDeleteMultiBt=!0;var e=localStorage.getItem("token");this.$store.dispatch("setToken",e),o["a"].getBetsListHistory().then((function(e){t.$vs.loading.close("#loading-corners > .con-vs-loading"),e.data.success?t.productsFake=e.data.data:(localStorage.removeItem("token"),t.$router.push("/pages/login").catch((function(){})))}))},openLoadingInDiv:function(){this.$vs.loading({container:"#loading-corners",type:"corners",scale:.6})}},created:function(){this.reloadList()},mounted:function(){this.isMounted=!0,this.openLoadingInDiv()}},p=l,d=(a("9122"),a("2877")),g=Object(d["a"])(p,n,r,!1,null,null,null);e["default"]=g.exports}}]);