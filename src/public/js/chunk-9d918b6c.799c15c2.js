(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9d918b6c"],{"16b6":function(e,t,a){"use strict";var n=a("bc3a"),r=a.n(n),s=a("7dc5");t["a"]=function(){return r.a.create({baseURL:"".concat(s.domain),headers:{Authorization:"Sky ".concat(localStorage.getItem("token"))}})}},"1f8b":function(e,t,a){e.exports=a.p+"img/login.d814adb7.png"},"20a7":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e._self._c;return t("div",{staticClass:"h-screen flex w-full bg-img vx-row no-gutter items-center justify-center",attrs:{id:"page-login"}},[t("div",{staticClass:"vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4"},[t("vx-card",[t("div",{staticClass:"full-page-bg-color",attrs:{slot:"no-body"},slot:"no-body"},[t("div",{staticClass:"vx-row no-gutter justify-center items-center"},[t("div",{staticClass:"vx-col hidden lg:block lg:w-1/2"},[t("img",{staticClass:"mx-auto",attrs:{src:a("1f8b"),alt:"login"}})]),t("div",{staticClass:"vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg"},[t("div",{staticClass:"px-8 pt-8 login-tabs-container"},[t("div",{staticClass:"vx-card__title mb-4"},[t("h4",{staticClass:"mb-4"},[e._v(e._s(e.$t("Login_LoginButton")))]),t("p",[e._v(e._s(e.$t("Login_HelloLogin")))])]),t("vs-tabs",[t("vs-tab",{attrs:{label:"Hệ thống"}},[t("login-jwt")],1)],1)],1)])])])])],1)])},r=[],s=function(){var e=this,t=e._self._c;return t("div",[t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|username|min:3",expression:"'required|username|min:3'"}],staticClass:"w-full",attrs:{"data-vv-validate-on":"blur",name:"text","icon-no-border":"",icon:"icon icon-user","icon-pack":"feather","label-placeholder":this.$t("CopyTrade_Setting_Account")},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),t("span",{staticClass:"text-sm text-danger"},[e._v(e._s(e.errors.first("username")))]),t("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|min:6|max:10",expression:"'required|min:6|max:10'"}],staticClass:"w-full mt-6",attrs:{"data-vv-validate-on":"blur",type:"password",name:"password","icon-no-border":"",icon:"icon icon-lock","icon-pack":"feather","label-placeholder":this.$t("Profile_Password")},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),t("span",{staticClass:"text-sm text-danger"},[e._v(e._s(e.errors.first("password")))]),t("div",{staticClass:"flex flex-wrap justify-between my-5"},[t("vs-checkbox",{staticClass:"mb-3",model:{value:e.checkbox_remember_me,callback:function(t){e.checkbox_remember_me=t},expression:"checkbox_remember_me"}},[e._v(e._s(e.$t("Login_Remember")))])],1),t("div",{staticClass:"flex flex-wrap justify-between mb-3"},[t("vs-button",{attrs:{disabled:!e.validateForm},on:{click:e.loginJWT}},[e._v(e._s(e.$t("Login_LoginButton")))])],1)],1)},i=[],c=(a("96cf"),a("1da1")),o=a("c5b9"),u={data:function(){return{username:"",password:"",checkbox_remember_me:!1}},computed:{validateForm:function(){return""!=this.username&&""!=this.password}},methods:{loginJWT:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){var t,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.$vs.loading(),t={username:this.username,password:this.password},e.next=4,o["a"].loginAdmin(t);case 4:a=e.sent,this.$vs.loading.close(),a.data.success?(localStorage.setItem("token",a.data.token),this.$store.dispatch("setToken",a.data.token),this.$router.push("/").catch((function(){}))):this.$vs.notify({title:"Error",text:a.data.message,iconPack:"feather",icon:"icon-alert-circle",color:"danger"});case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()}},p=u,l=a("2877"),g=Object(l["a"])(p,s,i,!1,null,null,null),b=g.exports,d={components:{LoginJwt:b}},f=d,O=(a("d661"),Object(l["a"])(f,n,r,!1,null,null,null));t["default"]=O.exports},"25db":function(e,t,a){},"3f4a":function(e,t,a){"use strict";var n=a("bc3a"),r=a.n(n),s=a("7dc5"),i=r.a.create({baseURL:"".concat(s.domain)});i.interceptors.request.use((function(e){var t=localStorage.getItem("tokenUser");return t&&(e.headers["Authorization"]="Sky ".concat(localStorage.getItem("tokenUser"))),e}),(function(e){return Promise.reject(e)})),i.interceptors.response.use((function(e){var t=e.data;return 4==t.success?(localStorage.removeItem("tokenUser"),void(window.location.href=window.location.origin+"/login")):e}),(function(e){return Promise.reject(e)})),t["a"]=function(){return i}},"7dc5":function(e){e.exports=JSON.parse('{"domain":"https://wacaglobal.net/","domainRealName":"WacaGlobal","support":{"telegram":"","zalo":"","mail":"wacaglobal@gmail.com"},"BASE_URL_SOCKET":"wss://wacaglobal.net:2096","BASE_URL_SOCKET_SYS":"wss://wacaglobal.net:2087","BASE_URL_SOCKET_NAP":"wss://wacaglobal.net:2083","BASE_URL_SOCKET_NOTIFY":"wss://wacaglobal.net:2053"}')},c5b9:function(e,t,a){"use strict";var n,r=a("ade3"),s=a("3f4a"),i=a("16b6"),c=a("bc3a"),o=a.n(c),u=a("7dc5"),p=function(){return o.a.create({baseURL:"".concat(u.domain),headers:{Authorization:"Sky ".concat(localStorage.getItem("tokenAgency"))}})};t["a"]=(n={active2fa:function(e){return Object(i["a"])().post("api/users/active-2fa",e)},disable2fa:function(e){return Object(i["a"])().post("api/users/disable-2fa",e)},adminDisable2fa:function(e){return Object(i["a"])().post("api/users/admin-disable-2fa",e)},check2fa:function(e){return Object(i["a"])().post("api/users/check-2fa",e)},checkOn2fa:function(){return Object(i["a"])().get("api/users/check-on-2fa")},loginUser:function(e){return Object(s["a"])().post("api/users/login",e)},getTokenActive:function(e){return Object(s["a"])().post("api/users/activeUser",e)},registerUser:function(e){return Object(s["a"])().post("api/users/createAccount",e)},forgotPassUser:function(e){return Object(s["a"])().post("api/users/forgot-password",e)},resendConfirUser:function(e){return Object(s["a"])().post("api/users/resend-confirmation-email",e)},changePassword:function(e){return Object(s["a"])().patch("api/users/change-password",e)},changePassword2:function(e){return Object(s["a"])().patch("api/users/change-password-is",e)},getInfoUser:function(){return Object(s["a"])().get("api/users/info")},updateXacMinhTK:function(e){return Object(s["a"])().post("api/users/update-info",e)},activeGG2FA:function(e){return Object(s["a"])().post("api/users/update-gg2fa",e)},unActiveGG2FA:function(e){return Object(s["a"])().post("api/users/disable-gg2fa",e)},sendGG2FA:function(){return Object(s["a"])().get("api/users/code-2fa")},createGG2FA:function(e){return void 0!==e?Object(i["a"])().get("api/users/create-gg2fa"):Object(s["a"])().get("api/users/create-gg2fa")},loginGG2FA:function(e){return Object(s["a"])().post("api/users/login-2fa",e)},reloadMoneyDemo:function(){return Object(s["a"])().put("api/users/demo")},getListHitoryOrder:function(){return Object(s["a"])().get("api/users/listbo")},sendMoneyLiveToUsdt:function(e){return Object(s["a"])().post("api/users/live-to-usdt",e)},sendMoneyUsdtToLive:function(e){return Object(s["a"])().post("api/users/usdt-to-live",e)},withdrawalUserNoiBo:function(e){return Object(s["a"])().post("api/users/withdrawal",e)},withdrawalUsdtERC:function(e){return Object(s["a"])().post("api/users/withdrawal-erc",e)},withdrawalUsdtBSC:function(e){return Object(s["a"])().post("api/users/withdrawal-bsc",e)},withdrawalUsdtVND:function(e){return Object(s["a"])().post("api/users/withdrawal-vnd",e)},withdrawalPaypalNoiBo:function(e){return Object(s["a"])().post("api/users/paypal/withdrawal",e)},withdrawalPaypalAccount:function(e){return Object(s["a"])().post("api/users/paypal/withdrawal-acc",e)},getBalanceWallet:function(){return Object(s["a"])().get("api/users/balance-wallet")},scanWallet:function(e){return Object(s["a"])().get("api/users/scan-wallet?e=".concat(e))},scanWalletAdmin:function(e){return Object(s["a"])().get("api/users/scan-wallet-admin?e=".concat(e))},getBankInfo:function(){return Object(s["a"])().get("api/users/bank-info")},depositWallet:function(e){return Object(s["a"])().post("api/users/usdt-wallet",e)},UserBuyVip:function(){return Object(s["a"])().post("api/users/buy-vip")},getNguoiGioiThieu:function(){return Object(s["a"])().get("api/users/presenter")},getThongTinLoiNhuan:function(){return Object(s["a"])().get("api/users/bo-statistics")},getListHisOrder:function(){return Object(s["a"])().get("api/users/history-order")},getSeachListOrder:function(e){return Object(s["a"])().post("api/users/history-order-date",e)},getListHisTradeWallet:function(){return Object(s["a"])().get("api/users/history-wallet")},getListHisTradeWalletNumber:function(e){return Object(s["a"])().get("api/users/history-wallet/"+e)},getListHisTradeWalletHH:function(){return Object(s["a"])().get("api/users/history-wallet-co")},getListHisTradeWalletHHNumber:function(e){return Object(s["a"])().get("api/users/history-wallet-co/"+e)},getListHisTradeWalletWGD:function(){return Object(s["a"])().get("api/users/history-wallet-trade")},getListHisTradeWalletWGDNumber:function(e){return Object(s["a"])().get("api/users/history-wallet-trade/"+e)},chiTietLoiNhuanHoaHong:function(){return Object(s["a"])().get("api/users/commission-details")},chiTietLoiNhuanHoaHongPage:function(e){return Object(s["a"])().get("api/users/commission-details/"+e)},getSeachListChiTietHH:function(e){return Object(s["a"])().post("api/users/commission-details-date",e)},getSeachListLvAgency:function(e){return Object(s["a"])().post("api/users/agency-search-lv",e)},getSeachListNameAgency:function(e){return Object(s["a"])().post("api/users/agency-search-name",e)},depositPaypal:function(e){return Object(s["a"])().get("api/paypal/pay?a="+e.a+"&n="+e.n)},depositVND:function(e){return Object(s["a"])().get("api/pay/vnd?a="+e.a+"&n="+e.n+"&al="+e.al+"&b="+e.b)},getAddressCoin:function(e){return Object(s["a"])().get("api/wallet/"+e+"/address")},transWallet:function(e){return Object(s["a"])().post("api/exs/trans",e)},getSetupWallet:function(){return Object(s["a"])().get("api/setup/wallet")},getSupport:function(){return Object(s["a"])().get("api/setup/supports")},getExChangeUser:function(){return Object(s["a"])().get("api/exs/hisUser")},getStatusServer:function(){return Object(s["a"])().get("status")},checkGiaoDich:function(e){return Object(s["a"])().post("api/user/balance/trans/check",e)},getListNotifi:function(e){return Object(s["a"])().post("api/users/getListNotifi",e)},updateListNotifi:function(e){return Object(s["a"])().post("api/users/updateListNotifi",e)},activeUser:function(e){return Object(i["a"])().post("api/users/admin-active-user",e)},getRevenueNap:function(){return Object(i["a"])().get("api/trades/getRevenueNap")},getRevenueRut:function(){return Object(i["a"])().get("api/trades/getRevenueRut")},getRevenueTrans:function(){return Object(i["a"])().get("api/trades/getRevenueTrans")},getShowDT:function(e){return Object(i["a"])().post("api/trades/getShowDT",e)},changeAccMarketing:function(e){return Object(i["a"])().post("api/users/changeAcc",e)},changePassAdmin:function(e){return Object(i["a"])().post("api/users/changPassAd",e)},createUser:function(e){return Object(i["a"])().post("api/users/create",e)},register:function(e){return Object(i["a"])().post("api/users/register",e)},loginAdmin:function(e){return Object(i["a"])().post("api/users/AdminSingIn",e)},checkEmail:function(e){return Object(i["a"])().get("api/users/checkEmail/"+e)},getAllMember:function(e){return Object(i["a"])().get("api/users/getAllUser",{params:e})},getAllDeletedMember:function(e){return Object(i["a"])().get("api/users/getAllDeletedUsers",{params:e})},updateMember:function(e){return Object(i["a"])().patch("api/users/updateUser",e)},updatePriceMember:function(e){return Object(i["a"])().patch("api/users/updateMoney",e)},handleMoney:function(e){return Object(i["a"])().post("api/pay/approval",e)},handleMoneyRut:function(e){return Object(i["a"])().post("api/pay/approval-rut",e)},deleteMember:function(e){return Object(i["a"])().delete("api/users/deleteUserById/"+e)},recoverMember:function(e){return Object(i["a"])().delete("api/users/recoverUserById/"+e)},verifiedUser:function(e){return Object(i["a"])().post("api/users/verifiedUser",e)},getListAgency:function(){return Object(i["a"])().get("api/users/getAgency")},viewMemberAgency:function(e){return Object(i["a"])().get("api/users/viewTotalMAgency/"+e)},addMoneyMember:function(e){return Object(i["a"])().post("api/users/addMoneyMember",e)},getRateCommission:function(){return Object(i["a"])().get("api/setup/getRateCommission")},saveRateCommission:function(e){return Object(i["a"])().post("api/setup/saveRateCommission",e)}},Object(r["a"])(n,"saveRateCommission",(function(e){return Object(i["a"])().post("api/setup/saveRateCommission",e)})),Object(r["a"])(n,"getStakingRate",(function(){return Object(i["a"])().get("api/staking/set-rate")})),Object(r["a"])(n,"setStakingRate",(function(e){return Object(i["a"])().post("api/staking/set-rate",e)})),Object(r["a"])(n,"getAddMoneyListHistory",(function(e){return Object(i["a"])().get("api/trades/historyAllAddMoney",{params:e})})),Object(r["a"])(n,"getTotalAddMoney",(function(){return Object(i["a"])().get("api/trades/totalAddMoney")})),Object(r["a"])(n,"getTradeListHistory",(function(e){return Object(i["a"])().get("api/trades/historyAll",{params:e})})),Object(r["a"])(n,"gethistoryAllTrash",(function(e){return Object(i["a"])().get("api/trades/historyAllTrash",{params:e})})),Object(r["a"])(n,"deleteTrashByID",(function(e){return Object(i["a"])().put("api/trades/deleteTradeHisById",e)})),Object(r["a"])(n,"getDepositListHistory",(function(e){return Object(i["a"])().get("api/trades/hisDepositAll",{params:e})})),Object(r["a"])(n,"getDepositListHistoryAgency",(function(e,t){return Object(s["a"])().get("api/trades/hisDepositAll?email=".concat(e,"&").concat(t))})),Object(r["a"])(n,"getDepositAllTrash",(function(e){return Object(i["a"])().get("api/trades/hisDepositAllTrash",{params:e})})),Object(r["a"])(n,"getWithdrawalListHistory",(function(e){return Object(i["a"])().get("api/trades/hisWithDrawalAll",{params:e})})),Object(r["a"])(n,"getWithdrawalListHistoryAgency",(function(e,t){return Object(s["a"])().get("api/trades/hisWithDrawalAll?email=".concat(e).concat(t))})),Object(r["a"])(n,"doneWithDrawalByID",(function(e){return Object(i["a"])().post("api/trades/doneWithdrawal",e)})),Object(r["a"])(n,"doneRefuseWithDrawalByID",(function(e){return Object(i["a"])().post("api/trades/doneRefuseWithdrawal",e)})),Object(r["a"])(n,"getListF1F7",(function(e){return Object(i["a"])().post("api/users/getListF1F7",e)})),Object(r["a"])(n,"getStatisticsListF1F7",(function(e,t){return p().get("api/users/thong-ke-getListF1F7?email=".concat(e).concat(t))})),Object(r["a"])(n,"getSuperior",(function(e){return Object(i["a"])().get("api/users/getSuperior/".concat(e))})),Object(r["a"])(n,"getLiveAccount",(function(e){return Object(i["a"])().get("api/users/get-live-account/".concat(e))})),Object(r["a"])(n,"getLisCommissionSearch",(function(e){return Object(i["a"])().post("api/users/getListCmsHis",e)})),Object(r["a"])(n,"getAnalytics",(function(){return Object(i["a"])().get("api/users/analytics")})),Object(r["a"])(n,"getBetsListHistory",(function(){return Object(i["a"])().get("api/bets/historyBet")})),Object(r["a"])(n,"getBetsListHistoryAgency",(function(e,t){return Object(s["a"])().get("api/bets/historyBet?email=".concat(e,"&").concat(t))})),Object(r["a"])(n,"getBetsListHisTrash",(function(){return Object(i["a"])().get("api/bets/hisBetTrash")})),Object(r["a"])(n,"deleteBetsTrash",(function(e){return Object(i["a"])().patch("api/bets/deleteBet",e)})),Object(r["a"])(n,"getExListHistory",(function(){return Object(i["a"])().get("api/exs/historyEx")})),Object(r["a"])(n,"getExListHisTrash",(function(){return Object(i["a"])().get("api/exs/historyExTrash")})),Object(r["a"])(n,"deleteExTrash",(function(e){return Object(i["a"])().patch("api/exs/deleteEx",e)})),Object(r["a"])(n,"uploadAvatar",(function(e){return Object(s["a"])().post("api/auth/avatar",e)})),Object(r["a"])(n,"uploadPassportFront",(function(e){return Object(s["a"])().post("api/auth/passport/front",e)})),Object(r["a"])(n,"uploadPassportBack",(function(e){return Object(s["a"])().post("api/auth/passport/back",e)})),Object(r["a"])(n,"createChampion",(function(e){return Object(i["a"])().post("api/game/champion",e)})),Object(r["a"])(n,"getChampions",(function(){return Object(i["a"])().get("api/game/champions")})),Object(r["a"])(n,"getChampionsClient",(function(){return Object(s["a"])().get("api/game/champions")})),Object(r["a"])(n,"deleteChampion",(function(e){return Object(i["a"])().delete("api/game/champion/".concat(e))})),Object(r["a"])(n,"updateChampion",(function(e,t){return Object(i["a"])().put("api/game/champion/".concat(e),t)})),Object(r["a"])(n,"uploadBackgroundImage",(function(e){return Object(s["a"])().post("api/auth/champion",e)})),Object(r["a"])(n,"getActiveGames",(function(){return Object(s["a"])().get("api/game/active-games")})),Object(r["a"])(n,"createLuckyDrawAdmin",(function(e,t){return Object(i["a"])().put("api/game1/lucky-draws/".concat(t),e)})),Object(r["a"])(n,"getLuckyDrawAdmin",(function(){return Object(i["a"])().get("api/game1/lucky-draws-admin")})),Object(r["a"])(n,"getLuckyDraw",(function(){return Object(s["a"])().get("api/game1/lucky-draws")})),Object(r["a"])(n,"getThongTinLoiNhuanHangNgay",(function(){return Object(s["a"])().get("api/users/bo-statistics-current-day")})),Object(r["a"])(n,"createStreakChallenge",(function(e){return Object(i["a"])().post("/api/game2/streak-challenge",e)})),Object(r["a"])(n,"getStreakChallenge",(function(){return Object(i["a"])().get("/api/game2/streak-challenge")})),Object(r["a"])(n,"getStreakClientChallenge",(function(){return Object(s["a"])().get("/api/game2/streak-challenge")})),Object(r["a"])(n,"getUserStreakChallenge",(function(){return Object(i["a"])().get("/api/game2/streak-challenge-user")})),Object(r["a"])(n,"getUserClientStreakChallenge",(function(){return Object(s["a"])().get("/api/game2/streak-challenge-user")})),Object(r["a"])(n,"addUserStreakChallenge",(function(e){return Object(i["a"])().post("/api/game2/streak-challenge-user",e)})),Object(r["a"])(n,"getPrizeUser",(function(){return Object(s["a"])().get("/api/game2/prize")})),Object(r["a"])(n,"getInfoAgency",(function(){return p().get("api/users/info")})),Object(r["a"])(n,"getLuckyReward",(function(){return Object(s["a"])().get("api/users/lucky-reward")})),Object(r["a"])(n,"checkSpinUser",(function(){return Object(s["a"])().get("api/users/check-lucky-spins")})),Object(r["a"])(n,"luckyRewardSpinUser",(function(e){return Object(s["a"])().post("api/users/lucky-reward-spin",e)})),Object(r["a"])(n,"luckyActive",(function(){return Object(s["a"])().get("api/users/lucky-active")})),n)},d661:function(e,t,a){"use strict";a("25db")}}]);