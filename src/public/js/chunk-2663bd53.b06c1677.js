(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2663bd53"],{"16b6":function(e,t,a){"use strict";var r=a("bc3a"),n=a.n(r),i=a("7dc5");t["a"]=function(){return n.a.create({baseURL:"".concat(i.domain),headers:{Authorization:"Sky ".concat(localStorage.getItem("token"))}})}},"383e":function(e,t,a){"use strict";a("c727")},"3b3e":function(e,t,a){"use strict";var r=a("3f4a"),n=a("16b6");t["a"]={saveConfig:function(e){return Object(r["a"])().post("api/copytrade/reg-experts",e)},saveSuperConfig:function(e){return Object(r["a"])().post("api/copytrade/reg-experts-super",e)},saveFollowSuperConfig:function(e){return Object(r["a"])().post("api/copytrade/reg-super-follow",e)},saveSuperContent:function(e){return Object(r["a"])().post("api/copytrade/save-experts-super-content",e)},saveAiConfig:function(e){return Object(r["a"])().post("api/copytrade/reg-ai",e)},getConfig:function(){return Object(r["a"])().get("api/copytrade/get-config")},getExpertsList:function(){return Object(r["a"])().get("api/copytrade/experts")},getSuperExpertsList:function(){return Object(r["a"])().get("api/copytrade/top-experts-super")},getFollowersList:function(){return Object(r["a"])().get("api/copytrade/get-follow")},getTopExpertsList:function(){return Object(r["a"])().get("api/copytrade/top-experts")},getProfitList:function(){return Object(r["a"])().get("api/copytrade/get-profit-history")},getAiProfitList:function(){return Object(r["a"])().get("api/copytrade/ai-profit-history")},getExpertsInfoList:function(){return Object(n["a"])().get("api/copytrade/experts-info")},getExpertsSuperInfoList:function(){return Object(n["a"])().get("api/copytrade/experts-info-super")},removeExpert:function(e){return Object(n["a"])().delete("api/copytrade/experts/"+e)},addExpert:function(e){return Object(n["a"])().put("api/copytrade/experts",e)},addExpertSuper:function(e){return Object(n["a"])().put("api/copytrade/experts-super",e)},getRevenue:function(e){return Object(r["a"])().get("api/copytrade/get-revenue",{params:e})},logout:function(){return Object(r["a"])().post("api/copytrade/logout-cpt")},removeFollow:function(e){return Object(r["a"])().post("api/copytrade/remove-follow-cpt",e)},resetMoneyPerDay:function(){return Object(r["a"])().post("api/copytrade/reset-money")}}},"3f4a":function(e,t,a){"use strict";var r=a("bc3a"),n=a.n(r),i=a("7dc5"),s=n.a.create({baseURL:"".concat(i.domain)});s.interceptors.request.use((function(e){var t=localStorage.getItem("tokenUser");return t&&(e.headers["Authorization"]="Sky ".concat(localStorage.getItem("tokenUser"))),e}),(function(e){return Promise.reject(e)})),s.interceptors.response.use((function(e){var t=e.data;return 4==t.success?(localStorage.removeItem("tokenUser"),void(window.location.href=window.location.origin+"/login")):e}),(function(e){return Promise.reject(e)})),t["a"]=function(){return s}},6202:function(e,t,a){},"6bd7":function(e,t,a){"use strict";a("6202")},"7dc5":function(e){e.exports=JSON.parse('{"domain":"https://racaglobal.net/","domainRealName":"WacaGlobal","support":{"telegram":"","zalo":"","mail":"wacaglobal@gmail.com"},"BASE_URL_SOCKET":"wss://racaglobal.net:2096","BASE_URL_SOCKET_SYS":"wss://racaglobal.net:2087","BASE_URL_SOCKET_NAP":"wss://racaglobal.net:2083","BASE_URL_SOCKET_NOTIFY":"wss://racaglobal.net:2053"}')},c5b9:function(e,t,a){"use strict";var r,n=a("ade3"),i=a("3f4a"),s=a("16b6"),c=a("bc3a"),o=a.n(c),u=a("7dc5"),p=function(){return o.a.create({baseURL:"".concat(u.domain),headers:{Authorization:"Sky ".concat(localStorage.getItem("tokenAgency"))}})};t["a"]=(r={active2fa:function(e){return Object(s["a"])().post("api/users/active-2fa",e)},disable2fa:function(e){return Object(s["a"])().post("api/users/disable-2fa",e)},adminDisable2fa:function(e){return Object(s["a"])().post("api/users/admin-disable-2fa",e)},check2fa:function(e){return Object(s["a"])().post("api/users/check-2fa",e)},checkOn2fa:function(){return Object(s["a"])().get("api/users/check-on-2fa")},loginUser:function(e){return Object(i["a"])().post("api/users/login",e)},getTokenActive:function(e){return Object(i["a"])().post("api/users/activeUser",e)},registerUser:function(e){return Object(i["a"])().post("api/users/createAccount",e)},forgotPassUser:function(e){return Object(i["a"])().post("api/users/forgot-password",e)},resendConfirUser:function(e){return Object(i["a"])().post("api/users/resend-confirmation-email",e)},changePassword:function(e){return Object(i["a"])().patch("api/users/change-password",e)},changePassword2:function(e){return Object(i["a"])().patch("api/users/change-password-is",e)},getInfoUser:function(){return Object(i["a"])().get("api/users/info")},updateXacMinhTK:function(e){return Object(i["a"])().post("api/users/update-info",e)},activeGG2FA:function(e){return Object(i["a"])().post("api/users/update-gg2fa",e)},unActiveGG2FA:function(e){return Object(i["a"])().post("api/users/disable-gg2fa",e)},sendGG2FA:function(){return Object(i["a"])().get("api/users/code-2fa")},createGG2FA:function(e){return void 0!==e?Object(s["a"])().get("api/users/create-gg2fa"):Object(i["a"])().get("api/users/create-gg2fa")},loginGG2FA:function(e){return Object(i["a"])().post("api/users/login-2fa",e)},reloadMoneyDemo:function(){return Object(i["a"])().put("api/users/demo")},getListHitoryOrder:function(){return Object(i["a"])().get("api/users/listbo")},sendMoneyLiveToUsdt:function(e){return Object(i["a"])().post("api/users/live-to-usdt",e)},sendMoneyUsdtToLive:function(e){return Object(i["a"])().post("api/users/usdt-to-live",e)},withdrawalUserNoiBo:function(e){return Object(i["a"])().post("api/users/withdrawal",e)},withdrawalUsdtERC:function(e){return Object(i["a"])().post("api/users/withdrawal-erc",e)},withdrawalUsdtBSC:function(e){return Object(i["a"])().post("api/users/withdrawal-bsc",e)},withdrawalUsdtVND:function(e){return Object(i["a"])().post("api/users/withdrawal-vnd",e)},withdrawalPaypalNoiBo:function(e){return Object(i["a"])().post("api/users/paypal/withdrawal",e)},withdrawalPaypalAccount:function(e){return Object(i["a"])().post("api/users/paypal/withdrawal-acc",e)},getBalanceWallet:function(){return Object(i["a"])().get("api/users/balance-wallet")},scanWallet:function(e){return Object(i["a"])().get("api/users/scan-wallet?e=".concat(e))},scanWalletAdmin:function(e){return Object(i["a"])().get("api/users/scan-wallet-admin?e=".concat(e))},getBankInfo:function(){return Object(i["a"])().get("api/users/bank-info")},depositWallet:function(e){return Object(i["a"])().post("api/users/usdt-wallet",e)},UserBuyVip:function(){return Object(i["a"])().post("api/users/buy-vip")},getNguoiGioiThieu:function(){return Object(i["a"])().get("api/users/presenter")},getThongTinLoiNhuan:function(){return Object(i["a"])().get("api/users/bo-statistics")},getListHisOrder:function(){return Object(i["a"])().get("api/users/history-order")},getSeachListOrder:function(e){return Object(i["a"])().post("api/users/history-order-date",e)},getListHisTradeWallet:function(){return Object(i["a"])().get("api/users/history-wallet")},getListHisTradeWalletNumber:function(e){return Object(i["a"])().get("api/users/history-wallet/"+e)},getListHisTradeWalletHH:function(){return Object(i["a"])().get("api/users/history-wallet-co")},getListHisTradeWalletHHNumber:function(e){return Object(i["a"])().get("api/users/history-wallet-co/"+e)},getListHisTradeWalletWGD:function(){return Object(i["a"])().get("api/users/history-wallet-trade")},getListHisTradeWalletWGDNumber:function(e){return Object(i["a"])().get("api/users/history-wallet-trade/"+e)},chiTietLoiNhuanHoaHong:function(){return Object(i["a"])().get("api/users/commission-details")},chiTietLoiNhuanHoaHongPage:function(e){return Object(i["a"])().get("api/users/commission-details/"+e)},getSeachListChiTietHH:function(e){return Object(i["a"])().post("api/users/commission-details-date",e)},getSeachListLvAgency:function(e){return Object(i["a"])().post("api/users/agency-search-lv",e)},getSeachListNameAgency:function(e){return Object(i["a"])().post("api/users/agency-search-name",e)},depositPaypal:function(e){return Object(i["a"])().get("api/paypal/pay?a="+e.a+"&n="+e.n)},depositVND:function(e){return Object(i["a"])().get("api/pay/vnd?a="+e.a+"&n="+e.n+"&al="+e.al+"&b="+e.b)},getAddressCoin:function(e){return Object(i["a"])().get("api/wallet/"+e+"/address")},transWallet:function(e){return Object(i["a"])().post("api/exs/trans",e)},getSetupWallet:function(){return Object(i["a"])().get("api/setup/wallet")},getSupport:function(){return Object(i["a"])().get("api/setup/supports")},getExChangeUser:function(){return Object(i["a"])().get("api/exs/hisUser")},getStatusServer:function(){return Object(i["a"])().get("status")},checkGiaoDich:function(e){return Object(i["a"])().post("api/user/balance/trans/check",e)},getListNotifi:function(e){return Object(i["a"])().post("api/users/getListNotifi",e)},updateListNotifi:function(e){return Object(i["a"])().post("api/users/updateListNotifi",e)},activeUser:function(e){return Object(s["a"])().post("api/users/admin-active-user",e)},getRevenueNap:function(){return Object(s["a"])().get("api/trades/getRevenueNap")},getRevenueRut:function(){return Object(s["a"])().get("api/trades/getRevenueRut")},getRevenueTrans:function(){return Object(s["a"])().get("api/trades/getRevenueTrans")},getShowDT:function(e){return Object(s["a"])().post("api/trades/getShowDT",e)},changeAccMarketing:function(e){return Object(s["a"])().post("api/users/changeAcc",e)},changePassAdmin:function(e){return Object(s["a"])().post("api/users/changPassAd",e)},createUser:function(e){return Object(s["a"])().post("api/users/create",e)},register:function(e){return Object(s["a"])().post("api/users/register",e)},loginAdmin:function(e){return Object(s["a"])().post("api/users/AdminSingIn",e)},checkEmail:function(e){return Object(s["a"])().get("api/users/checkEmail/"+e)},getAllMember:function(e){return Object(s["a"])().get("api/users/getAllUser",{params:e})},getAllDeletedMember:function(e){return Object(s["a"])().get("api/users/getAllDeletedUsers",{params:e})},updateMember:function(e){return Object(s["a"])().patch("api/users/updateUser",e)},updatePriceMember:function(e){return Object(s["a"])().patch("api/users/updateMoney",e)},handleMoney:function(e){return Object(s["a"])().post("api/pay/approval",e)},handleMoneyRut:function(e){return Object(s["a"])().post("api/pay/approval-rut",e)},deleteMember:function(e){return Object(s["a"])().delete("api/users/deleteUserById/"+e)},recoverMember:function(e){return Object(s["a"])().delete("api/users/recoverUserById/"+e)},verifiedUser:function(e){return Object(s["a"])().post("api/users/verifiedUser",e)},getListAgency:function(){return Object(s["a"])().get("api/users/getAgency")},viewMemberAgency:function(e){return Object(s["a"])().get("api/users/viewTotalMAgency/"+e)},addMoneyMember:function(e){return Object(s["a"])().post("api/users/addMoneyMember",e)},getRateCommission:function(){return Object(s["a"])().get("api/setup/getRateCommission")},saveRateCommission:function(e){return Object(s["a"])().post("api/setup/saveRateCommission",e)}},Object(n["a"])(r,"saveRateCommission",(function(e){return Object(s["a"])().post("api/setup/saveRateCommission",e)})),Object(n["a"])(r,"getStakingRate",(function(){return Object(s["a"])().get("api/staking/set-rate")})),Object(n["a"])(r,"setStakingRate",(function(e){return Object(s["a"])().post("api/staking/set-rate",e)})),Object(n["a"])(r,"getAddMoneyListHistory",(function(e){return Object(s["a"])().get("api/trades/historyAllAddMoney",{params:e})})),Object(n["a"])(r,"getTotalAddMoney",(function(){return Object(s["a"])().get("api/trades/totalAddMoney")})),Object(n["a"])(r,"getTradeListHistory",(function(e){return Object(s["a"])().get("api/trades/historyAll",{params:e})})),Object(n["a"])(r,"gethistoryAllTrash",(function(e){return Object(s["a"])().get("api/trades/historyAllTrash",{params:e})})),Object(n["a"])(r,"deleteTrashByID",(function(e){return Object(s["a"])().put("api/trades/deleteTradeHisById",e)})),Object(n["a"])(r,"getDepositListHistory",(function(e){return Object(s["a"])().get("api/trades/hisDepositAll",{params:e})})),Object(n["a"])(r,"getDepositListHistoryAgency",(function(e,t){return Object(i["a"])().get("api/trades/hisDepositAll?email=".concat(e,"&").concat(t))})),Object(n["a"])(r,"getDepositAllTrash",(function(e){return Object(s["a"])().get("api/trades/hisDepositAllTrash",{params:e})})),Object(n["a"])(r,"getWithdrawalListHistory",(function(e){return Object(s["a"])().get("api/trades/hisWithDrawalAll",{params:e})})),Object(n["a"])(r,"getWithdrawalListHistoryAgency",(function(e,t){return Object(i["a"])().get("api/trades/hisWithDrawalAll?email=".concat(e).concat(t))})),Object(n["a"])(r,"doneWithDrawalByID",(function(e){return Object(s["a"])().post("api/trades/doneWithdrawal",e)})),Object(n["a"])(r,"doneRefuseWithDrawalByID",(function(e){return Object(s["a"])().post("api/trades/doneRefuseWithdrawal",e)})),Object(n["a"])(r,"getListF1F7",(function(e){return Object(s["a"])().post("api/users/getListF1F7",e)})),Object(n["a"])(r,"getStatisticsListF1F7",(function(e,t){return p().get("api/users/thong-ke-getListF1F7?email=".concat(e).concat(t))})),Object(n["a"])(r,"getSuperior",(function(e){return Object(s["a"])().get("api/users/getSuperior/".concat(e))})),Object(n["a"])(r,"getLiveAccount",(function(e){return Object(s["a"])().get("api/users/get-live-account/".concat(e))})),Object(n["a"])(r,"getLisCommissionSearch",(function(e){return Object(s["a"])().post("api/users/getListCmsHis",e)})),Object(n["a"])(r,"getAnalytics",(function(){return Object(s["a"])().get("api/users/analytics")})),Object(n["a"])(r,"getBetsListHistory",(function(){return Object(s["a"])().get("api/bets/historyBet")})),Object(n["a"])(r,"getBetsListHistoryAgency",(function(e,t){return Object(i["a"])().get("api/bets/historyBet?email=".concat(e,"&").concat(t))})),Object(n["a"])(r,"getBetsListHisTrash",(function(){return Object(s["a"])().get("api/bets/hisBetTrash")})),Object(n["a"])(r,"deleteBetsTrash",(function(e){return Object(s["a"])().patch("api/bets/deleteBet",e)})),Object(n["a"])(r,"getExListHistory",(function(){return Object(s["a"])().get("api/exs/historyEx")})),Object(n["a"])(r,"getExListHisTrash",(function(){return Object(s["a"])().get("api/exs/historyExTrash")})),Object(n["a"])(r,"deleteExTrash",(function(e){return Object(s["a"])().patch("api/exs/deleteEx",e)})),Object(n["a"])(r,"uploadAvatar",(function(e){return Object(i["a"])().post("api/auth/avatar",e)})),Object(n["a"])(r,"uploadPassportFront",(function(e){return Object(i["a"])().post("api/auth/passport/front",e)})),Object(n["a"])(r,"uploadPassportBack",(function(e){return Object(i["a"])().post("api/auth/passport/back",e)})),Object(n["a"])(r,"createChampion",(function(e){return Object(s["a"])().post("api/game/champion",e)})),Object(n["a"])(r,"getChampions",(function(){return Object(s["a"])().get("api/game/champions")})),Object(n["a"])(r,"getChampionsClient",(function(){return Object(i["a"])().get("api/game/champions")})),Object(n["a"])(r,"getTopChampions",(function(){return Object(i["a"])().get("api/game/top-champions")})),Object(n["a"])(r,"deleteChampion",(function(e){return Object(s["a"])().delete("api/game/champion/".concat(e))})),Object(n["a"])(r,"updateChampion",(function(e,t){return Object(s["a"])().put("api/game/champion/".concat(e),t)})),Object(n["a"])(r,"uploadBackgroundImage",(function(e){return Object(i["a"])().post("api/auth/champion",e)})),Object(n["a"])(r,"getActiveGames",(function(){return Object(i["a"])().get("api/game/active-games")})),Object(n["a"])(r,"createLuckyDrawAdmin",(function(e,t){return Object(s["a"])().put("api/game1/lucky-draws/".concat(t),e)})),Object(n["a"])(r,"getLuckyDrawAdmin",(function(){return Object(s["a"])().get("api/game1/lucky-draws-admin")})),Object(n["a"])(r,"getLuckyDraw",(function(){return Object(i["a"])().get("api/game1/lucky-draws")})),Object(n["a"])(r,"getThongTinLoiNhuanHangNgay",(function(){return Object(i["a"])().get("api/users/bo-statistics-current-day")})),Object(n["a"])(r,"createStreakChallenge",(function(e){return Object(s["a"])().post("/api/game2/streak-challenge",e)})),Object(n["a"])(r,"getStreakChallenge",(function(){return Object(s["a"])().get("/api/game2/streak-challenge")})),Object(n["a"])(r,"getStreakClientChallenge",(function(){return Object(i["a"])().get("/api/game2/streak-challenge")})),Object(n["a"])(r,"getUserStreakChallenge",(function(){return Object(s["a"])().get("/api/game2/streak-challenge-user")})),Object(n["a"])(r,"getUserClientStreakChallenge",(function(){return Object(i["a"])().get("/api/game2/streak-challenge-user")})),Object(n["a"])(r,"addUserStreakChallenge",(function(e){return Object(s["a"])().post("/api/game2/streak-challenge-user",e)})),Object(n["a"])(r,"getPrizeUser",(function(){return Object(i["a"])().get("/api/game2/prize")})),Object(n["a"])(r,"getInfoAgency",(function(){return p().get("api/users/info")})),Object(n["a"])(r,"getLuckyReward",(function(){return Object(i["a"])().get("api/users/lucky-reward")})),Object(n["a"])(r,"checkSpinUser",(function(){return Object(i["a"])().get("api/users/check-lucky-spins")})),Object(n["a"])(r,"luckyRewardSpinUser",(function(e){return Object(i["a"])().post("api/users/lucky-reward-spin",e)})),Object(n["a"])(r,"luckyActive",(function(){return Object(i["a"])().get("api/users/lucky-active")})),r)},c727:function(e,t,a){},d4bc:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e._self._c;return t("div",{staticClass:"data-list-container",attrs:{id:"list-experts"}},[t("vs-prompt",{staticClass:"export-options",attrs:{title:"Export To Excel","accept-text":"Export",active:e.activePrompt},on:{cancle:e.clearFields,accept:e.exportToExcel,close:e.clearFields,"update:active":function(t){e.activePrompt=t}}},[t("vs-input",{staticClass:"w-full",attrs:{placeholder:"Enter File Name.."},model:{value:e.fileName,callback:function(t){e.fileName=t},expression:"fileName"}}),t("v-select",{staticClass:"my-4",attrs:{options:e.formats},model:{value:e.selectedFormat,callback:function(t){e.selectedFormat=t},expression:"selectedFormat"}}),t("div",{staticClass:"flex"},[t("span",{staticClass:"mr-4"},[e._v("Cell Auto Width:")]),t("vs-switch",{model:{value:e.cellAutoWidth,callback:function(t){e.cellAutoWidth=t},expression:"cellAutoWidth"}},[e._v("Cell Auto Width")])],1)],1),t("div",{staticClass:"vs-con-loading__container",attrs:{id:"loading-corners"}},[t("vs-table",{ref:"table",attrs:{multiple:"",pagination:"","max-items":e.itemsPerPage,search:"",data:e.products},scopedSlots:e._u([{key:"default",fn:function(a){var r=a.data;return[t("tbody",e._l(r,(function(a,r){return t("vs-tr",{key:r,attrs:{data:a}},[t("vs-td",[t("p",{staticClass:"agency-name font-medium truncate"},[e._v(e._s(a.email))]),t("p",[e._v("\n                          Địa chỉ USDT: "),t("span",{staticStyle:{color:"#26a17b"},on:{click:function(t){return e.clickGetAddress(a.address_USDT,a.privateKey_USDT,"")}}},[e._v(e._s(a.address_USDT))])])]),t("vs-td",[t("p",{staticClass:"agency-name font-medium truncate"},[e._v(e._s(a.first_name)),t("br"),e._v("Biệt danh: "+e._s(a.nick_name))])]),t("vs-td",[t("IconCrypto",{staticStyle:{width:"20px"},attrs:{coinname:"USDT",color:"color",format:"svg"}}),e._v(" $"+e._s(e.formatPrice(a.money_usdt,2))),t("br")],1),t("vs-td",{staticClass:"whitespace-no-wrap text-center"},[t("vx-tooltip",{staticStyle:{float:"left"},attrs:{title:a.nick_name,color:"danger",text:"Xóa tài khoản"}},[t("vs-button",{attrs:{color:"dark",type:"line","icon-pack":"feather",icon:"icon-trash"},on:{click:function(t){return e.openPopDelete({id:a.id,nick_name:a.nick_name})}}})],1)],1)],1)})),1)]}}]),model:{value:e.selectedUser,callback:function(t){e.selectedUser=t},expression:"selectedUser"}},[t("div",{staticClass:"flex flex-wrap-reverse items-center flex-grow justify-between",attrs:{slot:"header"},slot:"header"},[t("div",{staticClass:"flex flex-wrap-reverse items-center data-list-btn-container"},[t("vs-dropdown",{staticClass:"dd-actions cursor-pointer mr-4 mb-4",attrs:{"vs-trigger-click":""}},[t("div",{staticClass:"p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32 w-full"},[t("span",{staticClass:"mr-2"},[e._v("Tác vụ")]),t("feather-icon",{attrs:{icon:"ChevronDownIcon",svgClasses:"h-4 w-4"}})],1),t("vs-dropdown-menu",[t("vs-dropdown-item",[t("span",{staticClass:"flex items-center"},[t("feather-icon",{staticClass:"mr-2",attrs:{icon:"TrashIcon",svgClasses:"h-4 w-4"}}),t("span",[e._v("Xóa")])],1)]),t("vs-dropdown-item",[t("span",{staticClass:"flex items-center"},[t("feather-icon",{staticClass:"mr-2",attrs:{icon:"FileIcon",svgClasses:"h-4 w-4"}}),t("span",{on:{click:function(t){e.activePrompt=!0}}},[e._v("In")])],1)])],1)],1),t("div",{staticClass:"btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-primary border border-solid border-primary",on:{click:e.addExpert}},[t("feather-icon",{attrs:{icon:"PlusIcon",svgClasses:"h-4 w-4"}}),t("span",{staticClass:"ml-2 text-base text-primary"},[e._v("Thêm chuyên gia")])],1)],1),t("vs-dropdown",{staticClass:"cursor-pointer mb-4 mr-4 items-per-page-handler",attrs:{"vs-trigger-click":""}},[t("div",{staticClass:"p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"},[t("span",{staticClass:"mr-2"},[e._v(e._s(e.currentPage*e.itemsPerPage-(e.itemsPerPage-1))+" - "+e._s(e.products.length-e.currentPage*e.itemsPerPage>0?e.currentPage*e.itemsPerPage:e.products.length)+" of "+e._s(e.queriedItems))]),t("feather-icon",{attrs:{icon:"ChevronDownIcon",svgClasses:"h-4 w-4"}})],1),t("vs-dropdown-menu",[t("vs-dropdown-item",{on:{click:function(t){e.itemsPerPage=4}}},[t("span",[e._v("4")])]),t("vs-dropdown-item",{on:{click:function(t){e.itemsPerPage=10}}},[t("span",[e._v("10")])]),t("vs-dropdown-item",{on:{click:function(t){e.itemsPerPage=15}}},[t("span",[e._v("15")])]),t("vs-dropdown-item",{on:{click:function(t){e.itemsPerPage=20}}},[t("span",[e._v("20")])])],1)],1)],1),t("template",{slot:"thead"},[t("vs-th",{attrs:{"sort-key":"email"}},[e._v("Email")]),t("vs-th",{attrs:{"sort-key":"nickname"}},[e._v("Tên")]),t("vs-th",{attrs:{"sort-key":"wallet"}},[e._v("Ví")]),t("vs-th",[e._v("Tác vụ")])],1)],2)],1),t("vs-popup",{attrs:{"background-color":"rgba(255,255,255,.6)",title:"Chuyên gia",active:e.popupDeleteActive},on:{"update:active":function(t){e.popupDeleteActive=t}}},[t("p",[e._v(' Bạn đồng ý xóa chuyên gia "'+e._s(e.removeUser.nick_name)+'" ?')]),t("vs-button",{attrs:{icon:"icon-trash","icon-pack":"feather",type:"gradient"},on:{click:function(t){return t.stopPropagation(),e.removeExpert()}}},[e._v("Đồng ý")])],1),t("vs-popup",{attrs:{title:"Address Wallet",active:e.popupAdressWallet},on:{"update:active":function(t){e.popupAdressWallet=t}}},[t("p",[e._v("\n          Address: "+e._s(e.getAdress)+" "),t("feather-icon",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.getAdress,expression:"getAdress",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.onCopy,expression:"onCopy",arg:"success"}],staticClass:"cursor-pointer",attrs:{icon:"CopyIcon"}}),t("br"),e._v(" \n          Private Key: "+e._s(e.getPrivateKey)+" "),t("feather-icon",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.getPrivateKey,expression:"getPrivateKey",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.onCopy,expression:"onCopy",arg:"success"}],staticClass:"cursor-pointer",attrs:{icon:"CopyIcon"}}),t("br"),e._v("\n          WFI BTC Address: "+e._s(e.getWfiKey)+" "),t("feather-icon",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.getWfiKey,expression:"getWfiKey",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.onCopy,expression:"onCopy",arg:"success"}],staticClass:"cursor-pointer",attrs:{icon:"CopyIcon"}})],1)]),t("vs-popup",{staticClass:"experts-popup",attrs:{title:"Thêm chuyên gia",active:e.popupNewExpert},on:{"update:active":function(t){e.popupNewExpert=t}}},[t("p",[e._v("Nhập nick name chuyên gia")]),t("vs-input",{staticClass:"w-full",model:{value:e.expert,callback:function(t){e.expert=t},expression:"expert"}}),t("vs-button",{staticClass:"mt-4",on:{click:e.submitAddExpert}},[e._v("Gửi")]),t("br"),t("br")],1)],1)},n=[],i=(a("20d6"),a("4a7a")),s=a.n(i),c=(a("c5b9"),a("3b3e")),o={components:{vSelect:s.a},data:function(){return{getAdress:"",getPrivateKey:"",getWfiKey:"",popupAdressWallet:!1,removeUser:{},popupDeleteActive:!1,activePrompt:!1,selectedUser:[],fileName:"",formats:["xlsx","csv","txt"],cellAutoWidth:!0,selectedFormat:"xlsx",headerTitle:["Id","Email","Nick","Ví","Tổng thành viên","Commission"],headerVal:["id","email","nickname","wallet","memberForAgency","pending_commission"],productsFake:[],itemsPerPage:10,isMounted:!1,addNewDataSidebar:!1,sidebarData:{},popupNewExpert:!1,expert:""}},computed:{currentPage:function(){return this.isMounted?this.$refs.table.currentx:0},products:function(){return this.productsFake},queriedItems:function(){return this.$refs.table?this.$refs.table.queriedResults.length:this.productsFake.length},expertOptions:function(){return this.productsFake.filter((function(e){return!e.is_expert}))}},methods:{removeExpert:function(){var e=this;c["a"].removeExpert(this.removeUser.id).then((function(t){1===t.data.success&&(e.productsFake=e.productsFake.filter((function(t){return t.id!==e.removeUser.id})),e.popupDeleteActive=!1,e.$vs.notify({text:"Xóa chuyên gia thành công",color:"success",iconPack:"feather",position:"top-right",icon:"icon-check-circle"}))}))},submitAddExpert:function(){var e=this;if(!this.expert)return this.$vs.notify({text:"Vui lòng nhập tên chuyên gia",color:"danger",iconPack:"feather",position:"top-right",icon:"icon-check-circle"});c["a"].addExpert({nick_name:this.expert}).then((function(t){if(1===t.data.success){var a=t.data.data,r=e.productsFake.findIndex((function(e){return e.id===a.id}));-1===r&&e.productsFake.push(a),e.$vs.notify({text:"Thêm chuyên gia thành công",color:"success",iconPack:"feather",position:"top-right",icon:"icon-check-circle"})}else 0===t.data.success&&e.$vs.notify({text:"Người dùng không tồn tại.",color:"danger",iconPack:"feather",position:"top-right",icon:"icon-check-circle"})}))},addExpert:function(){this.popupNewExpert=!0},clickGetAddress:function(e,t,a){this.popupAdressWallet=!0,this.getWfiKey=""!=a?a:"N/A",this.getAdress=e,this.getPrivateKey=t},onCopy:function(){this.$vs.notify({text:"Đã sao chép vào bộ nhớ",color:"success",iconPack:"feather",position:"top-center",icon:"icon-check-circle"})},openPopDelete:function(e){this.removeUser=e,this.popupDeleteActive=!0},formatPrice:function(e,t){var a=new Intl.NumberFormat("en-US",{minimumFractionDigits:t});return a.format(e)},addMoneyUser:function(e){e["type"]="addMoney",this.sidebarData=e,this.toggleDataSidebar(!0)},editUser:function(e){delete e["type"],this.sidebarData=e,this.toggleDataSidebar(!0)},getOrderStatusColor:function(e){return 0==e?"warning":1==e?"success":"warning"},getOrderStatusColorText:function(e){return 0==e?"Chưa bật":1==e?"Đã bật":"Chưa bật"},toggleDataSidebar:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.addNewDataSidebar=e},exportToExcel:function(){var e=this;if(0==this.selectedUser.length)return this.$vs.notify({title:"Xuất dữ liệu",text:"Vui lòng chọn nội dung để hoàn thành",color:"danger",iconPack:"feather",icon:"icon-heart"});Promise.all([a.e("chunk-54940cbf"),a.e("chunk-510b18c2")]).then(a.bind(null,"4bf8d")).then((function(t){var a=e.selectedUser,r=e.formatJson(e.headerVal,a);t.export_json_to_excel({header:e.headerTitle,data:r,filename:e.fileName,autoWidth:e.cellAutoWidth,bookType:e.selectedFormat}),e.clearFields()}))},formatJson:function(e,t){return t.map((function(t){return e.map((function(e){return t[e]}))}))},clearFields:function(){this.fileName="",this.cellAutoWidth=!0,this.selectedFormat="xlsx"},openLoadingInDiv:function(){this.$vs.loading({container:"#loading-corners",type:"corners",scale:.6})}},created:function(){var e=this,t=localStorage.getItem("token");this.$store.dispatch("setToken",t),c["a"].getExpertsInfoList().then((function(t){e.$vs.loading.close("#loading-corners > .con-vs-loading"),4==t.data.success?(localStorage.removeItem("token"),e.$router.push("/pages/login").catch((function(){}))):e.productsFake=t.data.data}))},mounted:function(){this.isMounted=!0,this.openLoadingInDiv()}},u=o,p=(a("6bd7"),a("383e"),a("2877")),l=Object(p["a"])(u,r,n,!1,null,"39d00fdd",null);t["default"]=l.exports}}]);