(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-33797316"],{"16b6":function(e,t,a){"use strict";var n=a("bc3a"),r=a.n(n),i=a("7dc5");t["a"]=function(){return r.a.create({baseURL:"".concat(i.domain),headers:{Authorization:"Sky ".concat(localStorage.getItem("token"))}})}},"3f4a":function(e,t,a){"use strict";var n=a("bc3a"),r=a.n(n),i=a("7dc5"),c=r.a.create({baseURL:"".concat(i.domain)});c.interceptors.request.use((function(e){var t=localStorage.getItem("tokenUser");return t&&(e.headers["Authorization"]="Sky ".concat(localStorage.getItem("tokenUser"))),e}),(function(e){return Promise.reject(e)})),c.interceptors.response.use((function(e){var t=e.data;return 4==t.success?(localStorage.removeItem("tokenUser"),void(window.location.href=window.location.origin+"/login")):e}),(function(e){return Promise.reject(e)})),t["a"]=function(){return c}},"55b2":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e._self._c;return t("div",[e._v("\n  Tỉ lệ lãi để qua đêm(% / năm)\n  "),t("vs-input",{staticClass:"mt-5",attrs:{placeholder:"Nhập tỉ lệ lãi qua đêm"},model:{value:e.rate,callback:function(t){e.rate=t},expression:"rate"}}),t("vs-button",{staticClass:"mt-5 vs-con-loading__container loading-btn",on:{click:e.saveRate}},[e._v("Lưu\n  ")])],1)},r=[],i=(a("96cf"),a("1da1")),c=a("c5b9"),s={data:function(){return{rate:0}},methods:{saveRate:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t,a=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$store.dispatch("check2fa");case 2:if(t=e.sent,t){e.next=5;break}return e.abrupt("return");case 5:c["a"].setStakingRate({stakingRate:this.rate}).then((function(e){return e.data.success?a.$vs.notify({text:"Lưu thành công",color:"success",position:"top-right",iconPack:"feather",icon:"icon-message-square"}):a.$vs.notify({text:e.data.error,color:"danger",position:"top-right",iconPack:"feather",icon:"icon-message-square"})}));case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},created:function(){var e=this;c["a"].getStakingRate({stakingRate:this.rate}).then((function(t){e.rate=t.data.data.stakingRate}))}},u=s,o=a("2877"),p=Object(o["a"])(u,n,r,!1,null,null,null);t["default"]=p.exports},"7dc5":function(e){e.exports=JSON.parse('{"domain":"https://wacatrade.com/","domainRealName":"WacaTrade","support":{"telegram":"","zalo":"","mail":"support@wacaglobal.net"},"BASE_URL_SOCKET":"wss://wacatrade.com:2096","BASE_URL_SOCKET_SYS":"wss://wacatrade.com:2087","BASE_URL_SOCKET_NAP":"wss://wacatrade.com:2083","BASE_URL_SOCKET_NOTIFY":"wss://wacatrade.com:2053"}')},c5b9:function(e,t,a){"use strict";var n,r=a("ade3"),i=a("3f4a"),c=a("16b6"),s=a("bc3a"),u=a.n(s),o=a("7dc5"),p=function(){return u.a.create({baseURL:"".concat(o.domain),headers:{Authorization:"Sky ".concat(localStorage.getItem("tokenAgency"))}})};t["a"]=(n={active2fa:function(e){return Object(c["a"])().post("api/users/active-2fa",e)},disable2fa:function(e){return Object(c["a"])().post("api/users/disable-2fa",e)},adminDisable2fa:function(e){return Object(c["a"])().post("api/users/admin-disable-2fa",e)},check2fa:function(e){return Object(c["a"])().post("api/users/check-2fa",e)},checkOn2fa:function(){return Object(c["a"])().get("api/users/check-on-2fa")},loginUser:function(e){return Object(i["a"])().post("api/users/login",e)},getTokenActive:function(e){return Object(i["a"])().post("api/users/activeUser",e)},registerUser:function(e){return Object(i["a"])().post("api/users/createAccount",e)},forgotPassUser:function(e){return Object(i["a"])().post("api/users/forgot-password",e)},resendConfirUser:function(e){return Object(i["a"])().post("api/users/resend-confirmation-email",e)},changePassword:function(e){return Object(i["a"])().patch("api/users/change-password",e)},changePassword2:function(e){return Object(i["a"])().patch("api/users/change-password-is",e)},getInfoUser:function(){return Object(i["a"])().get("api/users/info")},updateXacMinhTK:function(e){return Object(i["a"])().post("api/users/update-info",e)},activeGG2FA:function(e){return Object(i["a"])().post("api/users/update-gg2fa",e)},unActiveGG2FA:function(e){return Object(i["a"])().post("api/users/disable-gg2fa",e)},activeTele2FA:function(e){return Object(i["a"])().post("api/users/active-tele2fa",e)},unActiveTele2FA:function(e){return Object(i["a"])().post("api/users/disable-tele2fa",e)},sendGG2FA:function(){return Object(i["a"])().get("api/users/code-2fa")},sendTele2FA:function(){return Object(i["a"])().get("api/users/code-2fa-tele")},createGG2FA:function(e){return void 0!==e?Object(c["a"])().get("api/users/create-gg2fa"):Object(i["a"])().get("api/users/create-gg2fa")},loginGG2FA:function(e){return Object(i["a"])().post("api/users/login-2fa",e)},reloadMoneyDemo:function(){return Object(i["a"])().put("api/users/demo")},getListHitoryOrder:function(){return Object(i["a"])().get("api/users/listbo")},sendMoneyLiveToUsdt:function(e){return Object(i["a"])().post("api/users/live-to-usdt",e)},sendMoneyUsdtToLive:function(e){return Object(i["a"])().post("api/users/usdt-to-live",e)},withdrawalUserNoiBo:function(e){return Object(i["a"])().post("api/users/withdrawal",e)},withdrawalUsdtERC:function(e){return Object(i["a"])().post("api/users/withdrawal-erc",e)},withdrawalUsdtBSC:function(e){return Object(i["a"])().post("api/users/withdrawal-bsc",e)},withdrawalUsdtVND:function(e){return Object(i["a"])().post("api/users/withdrawal-vnd",e)},withdrawalPaypalNoiBo:function(e){return Object(i["a"])().post("api/users/paypal/withdrawal",e)},withdrawalPaypalAccount:function(e){return Object(i["a"])().post("api/users/paypal/withdrawal-acc",e)},getBalanceWallet:function(){return Object(i["a"])().get("api/users/balance-wallet")},scanWallet:function(e){return Object(i["a"])().get("api/users/scan-wallet?e=".concat(e))},scanWalletAdmin:function(e){return Object(c["a"])().get("api/users/scan-wallet-admin?e=".concat(e))},scanWalletAdminNoneFree:function(e){return Object(c["a"])().get("api/users/scan-wallet-admin-none-fee?e=".concat(e))},getBankInfo:function(){return Object(i["a"])().get("api/users/bank-info")},depositWallet:function(e){return Object(i["a"])().post("api/users/usdt-wallet",e)},UserBuyVip:function(){return Object(i["a"])().post("api/users/buy-vip")},getNguoiGioiThieu:function(){return Object(i["a"])().get("api/users/presenter")},getThongTinLoiNhuan:function(){return Object(i["a"])().get("api/users/bo-statistics")},getListHisOrder:function(){return Object(i["a"])().get("api/users/history-order")},getSeachListOrder:function(e){return Object(i["a"])().post("api/users/history-order-date",e)},getListHisTradeWallet:function(){return Object(i["a"])().get("api/users/history-wallet")},getListHisTradeWalletNumber:function(e){return Object(i["a"])().get("api/users/history-wallet/"+e)},getListHisTradeWalletHH:function(){return Object(i["a"])().get("api/users/history-wallet-co")},getListHisTradeWalletHHNumber:function(e){return Object(i["a"])().get("api/users/history-wallet-co/"+e)},getListHisTradeWalletWGD:function(){return Object(i["a"])().get("api/users/history-wallet-trade")},getListHisTradeWalletWGDNumber:function(e){return Object(i["a"])().get("api/users/history-wallet-trade/"+e)},chiTietLoiNhuanHoaHong:function(){return Object(i["a"])().get("api/users/commission-details")},chiTietLoiNhuanHoaHongPage:function(e){return Object(i["a"])().get("api/users/commission-details/"+e)},getSeachListChiTietHH:function(e){return Object(i["a"])().post("api/users/commission-details-date",e)},getSeachListLvAgency:function(e){return Object(i["a"])().post("api/users/agency-search-lv",e)},getSeachListNameAgency:function(e){return Object(i["a"])().post("api/users/agency-search-name",e)},depositPaypal:function(e){return Object(i["a"])().get("api/paypal/pay?a="+e.a+"&n="+e.n)},depositVND:function(e){return Object(i["a"])().get("api/pay/vnd?a="+e.a+"&n="+e.n+"&al="+e.al+"&b="+e.b)},getAddressCoin:function(e){return Object(i["a"])().get("api/wallet/"+e+"/address")},transWallet:function(e){return Object(i["a"])().post("api/exs/trans",e)},getSetupWallet:function(){return Object(i["a"])().get("api/setup/wallet")},getSupport:function(){return Object(i["a"])().get("api/setup/supports")},getExChangeUser:function(){return Object(i["a"])().get("api/exs/hisUser")},getStatusServer:function(){return Object(i["a"])().get("status")},checkGiaoDich:function(e){return Object(i["a"])().post("api/user/balance/trans/check",e)},getListNotifi:function(e){return Object(i["a"])().post("api/users/getListNotifi",e)},updateListNotifi:function(e){return Object(i["a"])().post("api/users/updateListNotifi",e)},activeUser:function(e){return Object(c["a"])().post("api/users/admin-active-user",e)},getRevenueNap:function(){return Object(c["a"])().get("api/trades/getRevenueNap")},getRevenueRut:function(){return Object(c["a"])().get("api/trades/getRevenueRut")},getRevenueTrans:function(){return Object(c["a"])().get("api/trades/getRevenueTrans")},getShowDT:function(e){return Object(c["a"])().post("api/trades/getShowDT",e)},changeAccMarketing:function(e){return Object(c["a"])().post("api/users/changeAcc",e)},changePassAdmin:function(e){return Object(c["a"])().post("api/users/changPassAd",e)},createUser:function(e){return Object(c["a"])().post("api/users/create",e)},register:function(e){return Object(c["a"])().post("api/users/register",e)},loginAdmin:function(e){return Object(c["a"])().post("api/users/AdminSingIn",e)},checkEmail:function(e){return Object(c["a"])().get("api/users/checkEmail/"+e)},getAllMember:function(e){return Object(c["a"])().get("api/users/getAllUser",{params:e})},getAllDeletedMember:function(e){return Object(c["a"])().get("api/users/getAllDeletedUsers",{params:e})},updateMember:function(e){return Object(c["a"])().patch("api/users/updateUser",e)},updatePriceMember:function(e){return Object(c["a"])().patch("api/users/updateMoney",e)},handleMoney:function(e){return Object(c["a"])().post("api/pay/approval",e)},handleMoneyRut:function(e){return Object(c["a"])().post("api/pay/approval-rut",e)},deleteMember:function(e){return Object(c["a"])().delete("api/users/deleteUserById/"+e)},recoverMember:function(e){return Object(c["a"])().delete("api/users/recoverUserById/"+e)},verifiedUser:function(e){return Object(c["a"])().post("api/users/verifiedUser",e)},getListAgency:function(){return Object(c["a"])().get("api/users/getAgency")},viewMemberAgency:function(e){return Object(c["a"])().get("api/users/viewTotalMAgency/"+e)},addMoneyMember:function(e){return Object(c["a"])().post("api/users/addMoneyMember",e)},getRateCommission:function(){return Object(c["a"])().get("api/setup/getRateCommission")},saveRateCommission:function(e){return Object(c["a"])().post("api/setup/saveRateCommission",e)}},Object(r["a"])(n,"saveRateCommission",(function(e){return Object(c["a"])().post("api/setup/saveRateCommission",e)})),Object(r["a"])(n,"getStakingRate",(function(){return Object(c["a"])().get("api/staking/set-rate")})),Object(r["a"])(n,"setStakingRate",(function(e){return Object(c["a"])().post("api/staking/set-rate",e)})),Object(r["a"])(n,"getAddMoneyListHistory",(function(e){return Object(c["a"])().get("api/trades/historyAllAddMoney",{params:e})})),Object(r["a"])(n,"getTotalAddMoney",(function(){return Object(c["a"])().get("api/trades/totalAddMoney")})),Object(r["a"])(n,"getTradeListHistory",(function(e){return Object(c["a"])().get("api/trades/historyAll",{params:e})})),Object(r["a"])(n,"gethistoryAllTrash",(function(e){return Object(c["a"])().get("api/trades/historyAllTrash",{params:e})})),Object(r["a"])(n,"deleteTrashByID",(function(e){return Object(c["a"])().put("api/trades/deleteTradeHisById",e)})),Object(r["a"])(n,"getDepositListHistory",(function(e){return Object(c["a"])().get("api/trades/hisDepositAll",{params:e})})),Object(r["a"])(n,"getDepositListHistoryAgency",(function(e,t){return Object(i["a"])().get("api/trades/hisDepositAll?email=".concat(e,"&").concat(t))})),Object(r["a"])(n,"getDepositAllTrash",(function(e){return Object(c["a"])().get("api/trades/hisDepositAllTrash",{params:e})})),Object(r["a"])(n,"getWithdrawalListHistory",(function(e){return Object(c["a"])().get("api/trades/hisWithDrawalAll",{params:e})})),Object(r["a"])(n,"getWithdrawalListHistoryAgency",(function(e,t){return Object(i["a"])().get("api/trades/hisWithDrawalAll?email=".concat(e).concat(t))})),Object(r["a"])(n,"doneWithDrawalByID",(function(e){return Object(c["a"])().post("api/trades/doneWithdrawal",e)})),Object(r["a"])(n,"doneRefuseWithDrawalByID",(function(e){return Object(c["a"])().post("api/trades/doneRefuseWithdrawal",e)})),Object(r["a"])(n,"getListF1F7",(function(e){return Object(c["a"])().post("api/users/getListF1F7",e)})),Object(r["a"])(n,"getStatisticsListF1F7",(function(e,t){return p().get("api/users/thong-ke-getListF1F7?email=".concat(e).concat(t))})),Object(r["a"])(n,"getSuperior",(function(e){return Object(c["a"])().get("api/users/getSuperior/".concat(e))})),Object(r["a"])(n,"getLiveAccount",(function(e){return Object(c["a"])().get("api/users/get-live-account/".concat(e))})),Object(r["a"])(n,"getLisCommissionSearch",(function(e){return Object(c["a"])().post("api/users/getListCmsHis",e)})),Object(r["a"])(n,"getAnalytics",(function(){return Object(c["a"])().get("api/users/analytics")})),Object(r["a"])(n,"getBetsListHistory",(function(){return Object(c["a"])().get("api/bets/historyBet")})),Object(r["a"])(n,"getBetsListHistoryAgency",(function(e,t){return Object(i["a"])().get("api/bets/historyBet?email=".concat(e,"&").concat(t))})),Object(r["a"])(n,"getBetsListHisTrash",(function(){return Object(c["a"])().get("api/bets/hisBetTrash")})),Object(r["a"])(n,"deleteBetsTrash",(function(e){return Object(c["a"])().patch("api/bets/deleteBet",e)})),Object(r["a"])(n,"getExListHistory",(function(){return Object(c["a"])().get("api/exs/historyEx")})),Object(r["a"])(n,"getExListHisTrash",(function(){return Object(c["a"])().get("api/exs/historyExTrash")})),Object(r["a"])(n,"deleteExTrash",(function(e){return Object(c["a"])().patch("api/exs/deleteEx",e)})),Object(r["a"])(n,"uploadAvatar",(function(e){return Object(i["a"])().post("api/auth/avatar",e)})),Object(r["a"])(n,"uploadPassportFront",(function(e){return Object(i["a"])().post("api/auth/passport/front",e)})),Object(r["a"])(n,"uploadPassportBack",(function(e){return Object(i["a"])().post("api/auth/passport/back",e)})),Object(r["a"])(n,"createChampion",(function(e){return Object(c["a"])().post("api/game/champion",e)})),Object(r["a"])(n,"getChampions",(function(){return Object(c["a"])().get("api/game/champions")})),Object(r["a"])(n,"getChampionsClient",(function(){return Object(i["a"])().get("api/game/champions")})),Object(r["a"])(n,"getTopChampions",(function(){return Object(i["a"])().get("api/game/top-champions")})),Object(r["a"])(n,"deleteChampion",(function(e){return Object(c["a"])().delete("api/game/champion/".concat(e))})),Object(r["a"])(n,"updateChampion",(function(e,t){return Object(c["a"])().put("api/game/champion/".concat(e),t)})),Object(r["a"])(n,"uploadBackgroundImage",(function(e){return Object(i["a"])().post("api/auth/champion",e)})),Object(r["a"])(n,"getActiveGames",(function(){return Object(i["a"])().get("api/game/active-games")})),Object(r["a"])(n,"createLuckyDrawAdmin",(function(e,t){return Object(c["a"])().put("api/game1/lucky-draws/".concat(t),e)})),Object(r["a"])(n,"getLuckyDrawAdmin",(function(){return Object(c["a"])().get("api/game1/lucky-draws-admin")})),Object(r["a"])(n,"getLuckyDraw",(function(){return Object(i["a"])().get("api/game1/lucky-draws")})),Object(r["a"])(n,"getThongTinLoiNhuanHangNgay",(function(){return Object(i["a"])().get("api/users/bo-statistics-current-day")})),Object(r["a"])(n,"createStreakChallenge",(function(e){return Object(c["a"])().post("/api/game2/streak-challenge",e)})),Object(r["a"])(n,"getStreakChallenge",(function(){return Object(c["a"])().get("/api/game2/streak-challenge")})),Object(r["a"])(n,"getStreakClientChallenge",(function(){return Object(i["a"])().get("/api/game2/streak-challenge")})),Object(r["a"])(n,"getUserStreakChallenge",(function(){return Object(c["a"])().get("/api/game2/streak-challenge-user")})),Object(r["a"])(n,"getUserClientStreakChallenge",(function(){return Object(i["a"])().get("/api/game2/streak-challenge-user")})),Object(r["a"])(n,"addUserStreakChallenge",(function(e){return Object(c["a"])().post("/api/game2/streak-challenge-user",e)})),Object(r["a"])(n,"getPrizeUser",(function(){return Object(i["a"])().get("/api/game2/prize")})),Object(r["a"])(n,"getInfoAgency",(function(){return p().get("api/users/info")})),Object(r["a"])(n,"getLuckyReward",(function(){return Object(i["a"])().get("api/users/lucky-reward")})),Object(r["a"])(n,"checkSpinUser",(function(){return Object(i["a"])().get("api/users/check-lucky-spins")})),Object(r["a"])(n,"luckyRewardSpinUser",(function(e){return Object(i["a"])().post("api/users/lucky-reward-spin",e)})),Object(r["a"])(n,"luckyActive",(function(){return Object(i["a"])().get("api/users/lucky-active")})),Object(r["a"])(n,"getAdminUserInfo",(function(e){return Object(c["a"])().get("api/users/get-user-info-admin/"+e)})),Object(r["a"])(n,"getAdminUserTradeAnalyze",(function(e){return Object(c["a"])().get("api/users/get-user-trade-analyze?id="+e)})),Object(r["a"])(n,"getAdminUserBalanceAnalyze",(function(e){return Object(c["a"])().get("api/users/get-user-balance-analyze?id="+e)})),Object(r["a"])(n,"changeAccountInfo",(function(e){return Object(i["a"])().post("api/users/change-account-info",e)})),Object(r["a"])(n,"requestDeposit",(function(e){return Object(i["a"])().post("api/users/request-deposit",e)})),n)}}]);