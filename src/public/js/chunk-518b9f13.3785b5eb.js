(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-518b9f13"],{"16b6":function(t,e,a){"use strict";var n=a("bc3a"),s=a.n(n),c=a("7dc5");e["a"]=function(){return s.a.create({baseURL:"".concat(c.domain),headers:{Authorization:"Sky ".concat(localStorage.getItem("token"))}})}},"24e2":function(t,e,a){"use strict";a("5b1a")},"2f21":function(t,e,a){"use strict";var n=a("79e5");t.exports=function(t,e){return!!t&&n((function(){e?t.call(null,(function(){}),1):t.call(null)}))}},"3f4a":function(t,e,a){"use strict";var n=a("bc3a"),s=a.n(n),c=a("7dc5"),i=s.a.create({baseURL:"".concat(c.domain)});i.interceptors.request.use((function(t){var e=localStorage.getItem("tokenUser");return e&&(t.headers["Authorization"]="Sky ".concat(localStorage.getItem("tokenUser"))),t}),(function(t){return Promise.reject(t)})),i.interceptors.response.use((function(t){var e=t.data;return 4==e.success?(localStorage.removeItem("tokenUser"),void(window.location.href=window.location.origin+"/login")):t}),(function(t){return Promise.reject(t)})),e["a"]=function(){return i}},"3fa6":function(t,e,a){"use strict";a.r(e);a("c5f6");var n=function(){var t=this,e=t._self._c;return t.active2fa?e("div",[t._v("\n  Nhập mã xác thực 2 FA để truy cập trang\n  "),e("vs-input",{staticClass:"mt-5",attrs:{placeholder:"Nhập mã 2FA"},model:{value:t.code_2fa,callback:function(e){t.code_2fa=e},expression:"code_2fa"}}),e("vs-button",{staticClass:"mt-5 vs-con-loading__container loading-btn",on:{click:t.openPage}},[t._v("Xác nhận ")])],1):e("div",{staticClass:"data-list-container",attrs:{id:"list-edit-result"}},[[e("div",{staticClass:"vx-row"},[e("div",{staticClass:"w-full vx-col lg:w-1/3"},[e("p",{staticClass:"mb-4"},[t._v("\n          Thời gian còn lại: "),e("span",{staticClass:"mr-4",staticStyle:{color:"#d65b00","font-weight":"bold"}},[t._v(t._s(t.countDown)+"s")]),t._v("\n          Trạng thái đặt cược: "),e("b",{class:{"text-success":"Mở"==t.typeOder,"text-danger":"Đóng"==t.typeOder},staticStyle:{"font-weight":"bold"}},[t._v(t._s(t.typeOder))])]),e("p",{staticClass:"mb-4"},[t._v("\n          Tổng cược BUY: "),e("span",{staticClass:"mr-4 text-danger",staticStyle:{"font-size":"20px"}},[t._v("$ "+t._s(t.price_buy))]),t._v("\n          Tổng cược SELL: "),e("span",{staticClass:"text-danger",staticStyle:{"font-size":"20px"}},[t._v("$ "+t._s(t.price_sell))])]),e("p",{staticClass:"mb-4"},[t._v("\n          Tổng Marketing Cược: "),e("span",{staticClass:"mr-4 text-danger",staticStyle:{"font-size":"20px"}},[t._v("$ "+t._s(t.price_total_mkt))]),e("br"),t._v("\n          Tổng người chơi Cược: "),e("span",{staticClass:"text-danger",staticStyle:{"font-size":"20px"}},[t._v("$ "+t._s(t.price_total))])]),e("vs-button",{staticClass:"h-12 font-bold",attrs:{color:"danger",type:"relief"},on:{click:t.reloadAmTien}},[t._v(" Tắt BẺ ÂM TIỀN")]),e("br"),e("b",[t._v("\n          Hệ thống đang gỡ vì ÂM TIỀN ( có thể TẮT ) trong phiên đáng và sắp gỡ\n        ")]),e("p"),e("br"),e("div",{staticClass:"vx-row"},[e("b",[t._v("\n            Nếu "+t._s(t.AMOUNTBECAU_MIN)+" BOT sẽ kích hoạt bẻ cầu cho đến khi hết LỖ\n          ")]),e("div",{staticClass:"w-full vx-col lg:w-1/2"},[e("vs-input",{staticClass:"mb-4",attrs:{type:"number",color:"success"},model:{value:t.AMOUNTBECAU_MIN,callback:function(e){t.AMOUNTBECAU_MIN=e},expression:"AMOUNTBECAU_MIN"}})],1),e("div",{staticClass:"w-full text-center vx-col lg:w-1/2"},[e("vs-button",{staticClass:"h-12 font-bold",attrs:{color:"success",type:"relief"},on:{click:t.sbAmountBeCauMin}},[t._v("Đồng ý")])],1),e("b",[t._v("\n            Nếu BUY hoặc SELL lớn hơn "+t._s(t.AMOUNTBECAU_MAX)+" sẽ kích hoạt bẻ cầu\n          ")]),e("div",{staticClass:"w-full vx-col lg:w-1/2"},[e("vs-input",{staticClass:"mb-4",attrs:{type:"number",color:"success"},model:{value:t.AMOUNTBECAU_MAX,callback:function(e){t.AMOUNTBECAU_MAX=e},expression:"AMOUNTBECAU_MAX"}})],1),e("div",{staticClass:"w-full text-center vx-col lg:w-1/2"},[e("vs-button",{staticClass:"h-12 font-bold",attrs:{color:"success",type:"relief"},on:{click:t.sbAmountBeCauMax}},[t._v("Đồng ý")])],1)])],1),e("div",{staticClass:"w-full vx-col lg:w-2/3"},[e("p",{staticClass:"mb-4 mr-4"},[t._v("\n          Chức năng:\n        ")]),t._m(0),e("p",[e("span",[t._v("\n            -- Đồng\n            "),e("IconCrypto",{staticStyle:{width:"20px"},attrs:{coinname:"btc",color:"color",format:"svg"}})],1),e("ul",{staticClass:"mb-4 mr-4 centerx",staticStyle:{"margin-left":"30px","line-height":"35px"}},[e("li",[e("vs-radio",{staticClass:"ml-4",attrs:{"vs-value":"buy"},on:{change:function(e){return t.changeMode("buy")}},model:{value:t.radioBC,callback:function(e){t.radioBC=e},expression:"radioBC"}},[t._v("MUA")]),e("vs-radio",{staticClass:"ml-4",attrs:{"vs-value":"sell"},on:{change:function(e){return t.changeMode("sell")}},model:{value:t.radioBC,callback:function(e){t.radioBC=e},expression:"radioBC"}},[t._v("BÁN")]),e("vs-radio",{staticClass:"ml-4",attrs:{"vs-value":"off"},on:{change:function(e){return t.changeMode("off")}},model:{value:t.radioBC,callback:function(e){t.radioBC=e},expression:"radioBC"}},[t._v("Tắt")]),e("br"),t._m(1)],1)])]),e("div",[e("p",{staticClass:"mb-4 mr-4"},[t._v("\n            Bẻ email(ngăn cách bằng xuống dòng)\n          ")]),e("div",[e("vs-textarea",{attrs:{height:"120px"},model:{value:t.ACCOUNT_BREAK,callback:function(e){t.ACCOUNT_BREAK=e},expression:"ACCOUNT_BREAK"}})],1),e("vs-button",{staticClass:"h-12 font-bold",attrs:{color:"success"},on:{click:t.sbAccountBeCau}},[t._v("Lưu")])],1)]),e("div",{staticClass:"w-full vx-col lg:w-1/2"},[e("p",[t._v("Marketing")]),e("p",{staticClass:"mb-4"},[t._v("\n          Marketing Cược BUY: "),e("span",{staticClass:"mr-4 text-danger",staticStyle:{"font-size":"20px"}},[t._v("$ "+t._s(t.price_buy_mkt))]),e("br"),t._v("\n          Marketing Cược SELL: "),e("span",{staticClass:"text-danger",staticStyle:{"font-size":"20px"}},[t._v("$ "+t._s(t.price_sell_mkt))])]),e("table",{staticClass:"tbv"},[t._m(2),t._l(t.productsFake,(function(a,n){return e("tr",{key:n,attrs:{data:a}},[1==Number(a.mkt)?[e("td",[t._v(t._s(a.e))]),e("td",[e("p",{staticClass:"ml-2",attrs:{color:"#006c27"}},[t._v(t._s(a.before))])]),e("td",["buy"==a.bet?e("p",{staticClass:"bet-buy_sell"},[e("span",{staticClass:"mr-2 text-success"},[t._v("MUA")]),e("feather-icon",{attrs:{icon:"TrendingUpIcon",svgClasses:"w-5 h-5"}})],1):e("p",{staticClass:"bet-buy_sell"},[e("span",{staticClass:"mr-2 text-danger"},[t._v("BÁN")]),e("feather-icon",{attrs:{icon:"TrendingDownIcon",svgClasses:"w-5 h-5"}})],1)]),e("td",[e("p",{staticClass:"bet-amount"},[e("IconCrypto",{staticStyle:{width:"20px"},attrs:{coinname:"usdt",color:"color",format:"svg"}}),e("font",{staticClass:"ml-2",attrs:{color:"#006c27"}},[t._v(t._s(t.formatPrice(a.amount,2))+" ("+t._s(t.formatPrice(a.percen,2))+"%)")])],1)])]:t._e()],2)}))],2)]),e("div",{staticClass:"w-full vx-col lg:w-1/2"},[e("p",[t._v("Người chơi")]),e("p",{staticClass:"mb-4"},[t._v("\n          Người chơi Cược BUY: "),e("span",{staticClass:"mr-4 text-danger",staticStyle:{"font-size":"20px"}},[t._v("$ "+t._s(t.price_play_buy))]),e("br"),t._v("\n          Người chơi Cược SELL: "),e("span",{staticClass:"text-danger",staticStyle:{"font-size":"20px"}},[t._v("$ "+t._s(t.price_play_sell))])]),e("table",{staticClass:"tbv"},[t._m(3),t._l(t.productsFake,(function(a,n){return e("tr",{key:n,attrs:{data:a}},[0==Number(a.mkt)?[e("td",[t._v(t._s(a.e))]),e("td",[e("p",{staticClass:"ml-2",attrs:{color:"#006c27"}},[t._v(t._s(a.before))])]),e("td",["buy"==a.bet?e("p",{staticClass:"bet-buy_sell"},[e("span",{staticClass:"mr-2 text-success"},[t._v("MUA")]),e("feather-icon",{attrs:{icon:"TrendingUpIcon",svgClasses:"w-5 h-5"}})],1):e("p",{staticClass:"bet-buy_sell"},[e("span",{staticClass:"mr-2 text-danger"},[t._v("BÁN")]),e("feather-icon",{attrs:{icon:"TrendingDownIcon",svgClasses:"w-5 h-5"}})],1)]),e("td",[e("p",{staticClass:"bet-amount"},[e("IconCrypto",{staticStyle:{width:"20px"},attrs:{coinname:"usdt",color:"color",format:"svg"}}),e("font",{staticClass:"ml-2",attrs:{color:"#006c27"}},[t._v(t._s(t.formatPrice(a.amount,2))+" ("+t._s(t.formatPrice(a.percen,2))+"%)\n                  ")])],1)])]:t._e()],2)}))],2)])])]],2)},s=[function(){var t=this,e=t._self._c;return e("p",[e("span",{staticClass:"mb-4 font-bold"},[t._v("( GỠ TIỀN NẾU ÂM PHIÊN HIỆN TẠI )")]),e("br"),e("b",[t._v("\n            Chú ý:\n          ")]),t._v("\n          PHIÊN hiện tại nếu âm tiền, sẽ tự kích hoạt gỡ tiền sao cho hết âm tiền cho các PHIÊN sau ( Được TẮT / MỞ tự\n          động )\n          "),e("br"),e("br")])},function(){var t=this,e=t._self._c;return e("span",{staticClass:"mb-4"},[e("b",[t._v("\n                Chú ý:\n              ")]),t._v("\n              Nếu chọn MUA hoặc BÁN thì kết thúc phiên sẽ nhảy về MUA Hoặc BÁN trên biểu đồ "),e("br"),t._v("( TẮT nếu muốn kết quả\n              mặc định và HỆ THỐNG TỰ GỠ NẾU ÂM TIỀN )\n            ")])},function(){var t=this,e=t._self._c;return e("tr",[e("th",[t._v("Email")]),e("th",[t._v("Tổng tiền")]),e("th",[t._v("Mua/Bán")]),e("th",[t._v("Số Tiền Cược")])])},function(){var t=this,e=t._self._c;return e("tr",[e("th",[t._v("Email")]),e("th",[t._v("Tổng tiền")]),e("th",[t._v("Mua/Bán")]),e("th",[t._v("Số Tiền Cược")])])}],c=(a("55dd"),a("ac6a"),a("7dc5")),i=a("c5b9"),r={components:{},data:function(){return{AMOUNTBECAU_MIN:-30,AMOUNTBECAU_MAX:400,ACCOUNT_BREAK:"",PriceBOT:0,checkOnOffBOT:!0,checkOnOffAnGian:!1,checkOnOffBOTGoTien:!1,radioBC:"",productsFake:[],itemsPerPage:10,isMounted:!1,countDown:0,typeOder:"Mở",price_buy:0,price_sell:0,price_buy_mkt:0,price_sell_mkt:0,price_total_mkt:0,price_total:0,price_play_buy:0,price_play_sell:0,active2fa:!0,code_2fa:"",accounts:[]}},computed:{currentPage:function(){return this.isMounted?this.$refs.table.currentx:0},products:function(){return this.productsFake},queriedItems:function(){return this.$refs.table?this.$refs.table.queriedResults.length:this.productsFake.length}},watch:{},methods:{openPage:function(){var t=this;this.$vs.loading({container:".loading-btn",scale:.45}),i["a"].check2fa({t:this.code_2fa}).then((function(e){return 1==e.data.success?(t.active2fa=!1,void t.$store.dispatch("set2FA",!0)):2==e.data.success?t.$vs.notify({text:"Mã xác 2FA không chính xác",color:"danger",position:"top-right",iconPack:"feather",icon:"icon-message-square"}):void(4==e.data.success&&t.$router.push({name:"page-login"}))})).catch((function(t){console.log(t)})).finally((function(){setTimeout((function(){t.$vs.loading.close(".loading-btn > .con-vs-loading")}),1e3)}))},sbAmountBeCauMin:function(){return this.sendMessage({type:"editGL",data:{type:"WRITE_AMOUNT_NEGA_AMOUNT_BREAK_BRIDGE",AMOUNT:this.AMOUNTBECAU_MIN}}),this.$vs.notify({text:"Đã thay đổi thành "+this.AMOUNTBECAU_MIN,color:"success",position:"top-center",iconPack:"feather",icon:"icon-message-square"})},sbAmountBeCauMax:function(){return this.sendMessage({type:"editGL",data:{type:"WRITE_AMOUNT_MAX_BREAK_BRIDGE",AMOUNT:this.AMOUNTBECAU_MAX}}),this.$vs.notify({text:"Đã thay đổi thành "+this.AMOUNTBECAU_MAX,color:"success",position:"top-center",iconPack:"feather",icon:"icon-message-square"})},sbAccountBeCau:function(){return this.sendMessage({type:"editGL",data:{type:"WRITE_ACCOUNT_BREAK",accounts:this.ACCOUNT_BREAK}}),this.$vs.notify({text:"Đã thay đổi danh sách email bẻ cầu",color:"success",position:"top-center",iconPack:"feather",icon:"icon-message-square"})},changeBOTOnOff:function(){return this.sendMessage({type:"editGL",data:{type:"BOT"}}),this.checkOnOffBOT?this.$vs.notify({text:"BOT đã được TẮT",color:"success",position:"top-center",iconPack:"feather",icon:"icon-message-square"}):this.$vs.notify({text:"BOT đã được BẬT",color:"success",position:"top-center",iconPack:"feather",icon:"icon-message-square"})},changeBetOnOff:function(){return this.radioBC="off",this.checkOnOffBOTGoTien=!1,this.checkOnOffAnGian?(this.sendMessage({type:"editGL",data:{type:"BTC_OFF"}}),this.$vs.notify({text:"Đã thay đổi thành TẮT",color:"success",position:"top-center",iconPack:"feather",icon:"icon-message-square"})):(this.sendMessage({type:"editGL",data:{type:"BTC_LESS"}}),this.$vs.notify({text:"Đã thay đổi thành BẬT",color:"success",position:"top-center",iconPack:"feather",icon:"icon-message-square"}))},reloadAmTien:function(){this.sendMessage({type:"editGL",data:{type:"GO_TIEN_OFF"}})},changeMode:function(t){return this.checkOnOffAnGian=!1,"buy"==t&&(this.sendMessage({type:"editGL",data:{type:"BTC_BUY"}}),t="MUA"),"sell"==t&&(this.sendMessage({type:"editGL",data:{type:"BTC_SELL"}}),t="BÁN"),"off"==t&&(this.sendMessage({type:"editGL",data:{type:"BTC_OFF"}}),t="TẮT"),this.$vs.notify({text:"Đã thay đổi thành "+t,color:"success",position:"top-center",iconPack:"feather",icon:"icon-message-square"})},formatPrice:function(t,e){var a=new Intl.NumberFormat("en-US",{minimumFractionDigits:e});return a.format(t)},toggleDataSidebar:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.addNewDataSidebar=t},sendMessage:function(t){this.connection.send(JSON.stringify(t))},changeRadioGetSV:function(t){this.radioBC="",t.BTC.BUY?this.radioBC="buy":t.BTC.SELL?this.radioBC="sell":t.BTC.BUY||t.BTC.SELL||(this.radioBC="off"),t.LESS_WIN?this.checkOnOffAnGian=!0:this.checkOnOffAnGian=!1,t.PRICE_FUND_ON_OFF?this.checkOnOffBOTGoTien=!0:this.checkOnOffBOTGoTien=!1,t.BOT?this.checkOnOffBOT=!0:this.checkOnOffBOT=!1},changeBOTGoTienOnOff:function(){return this.checkOnOffAnGian=!1,this.radioBC="off",this.sendMessage({type:"editGL",data:{type:"BOT_GO_TIEN"}}),this.checkOnOffBOTGoTien?this.$vs.notify({text:"BOT gỡ tiền đã được TẮT",color:"success",position:"top-center",iconPack:"feather",icon:"icon-message-square"}):this.$vs.notify({text:"BOT gỡ tiền đã được BẬT",color:"success",position:"top-center",iconPack:"feather",icon:"icon-message-square"})},sendInfoAdmin:function(){this.sendMessage({type:"accountDetail",data:{uid:"ADMIN_BO",email:"ad999999@gmail.com"}})}},created:function(){var t=this;this.connection=new WebSocket(c.BASE_URL_SOCKET),this.connection.onopen=function(){t.sendInfoAdmin(),console.log("Successfully connected to the echo websocket server...")},this.connection.onmessage=function(e){var a=JSON.parse(e.data),n=a.data;if("allData"===a.type&&(t.countDown=n.candleClose,t.typeOder="order"==n.type?"Mở":"Đóng",0==n.candleClose&&(t.price_buy=0,t.price_sell=0)),"getTruck"===a.type&&(t.changeRadioGetSV(n),t.AMOUNTBECAU_MIN=a.min_am_go,t.AMOUNTBECAU_MAX=a.max_amount_be,t.ACCOUNT_BREAK=a.account_break),"truck"===a.type){t.productsFake=n,console.log("🚀 ~ file: EditKetQua.vue:596 ~ created ~ _this.productsFake:",t.productsFake),t.productsFake.forEach((function(e){e.percen=100*parseFloat(e.amount)/parseFloat(e.before);var a=t.accounts.filter((function(t){return t.e==e.e&&void 0!=t.e}));a.length>0&&(e.e=e.e+"/ "+a[0].nick_name)})),t.productsFake.sort((function(t,e){return parseFloat(e.percen)-parseFloat(t.percen)})),t.price_buy=t.formatPrice(a.price_buy,2),t.price_sell=t.formatPrice(a.price_sell,2),t.price_buy_mkt=t.formatPrice(a.mktBUY,2),t.price_sell_mkt=t.formatPrice(a.mktSELL,2),t.price_total_mkt=t.formatPrice(a.mktBUY+a.mktSELL,2);var s=a.price_buy+a.price_sell-(a.mktBUY+a.mktSELL);t.price_play_buy=t.formatPrice(a.price_buy-a.mktBUY,2),t.price_play_sell=t.formatPrice(a.price_sell-a.mktSELL,2),t.price_total=t.formatPrice(s,2)}},this.active2fa=!this.$store.state.auth2FA},mounted:function(){var t=this;this.isMounted=!0,i["a"].getAllUsers().then((function(e){t.accounts=e.data.data}))}},o=r,u=(a("ab61"),a("24e2"),a("2877")),l=Object(u["a"])(o,n,s,!1,null,"357bc794",null);e["default"]=l.exports},"55dd":function(t,e,a){"use strict";var n=a("5ca1"),s=a("d8e8"),c=a("4bf8"),i=a("79e5"),r=[].sort,o=[1,2,3];n(n.P+n.F*(i((function(){o.sort(void 0)}))||!i((function(){o.sort(null)}))||!a("2f21")(r)),"Array",{sort:function(t){return void 0===t?r.call(c(this)):r.call(c(this),s(t))}})},"5b1a":function(t,e,a){},"5f00":function(t,e,a){},"7dc5":function(t){t.exports=JSON.parse('{"domain":"https://wacatrade.com/","domainRealName":"WacaTrade","support":{"telegram":"","zalo":"","mail":"support@wacaglobal.net"},"BASE_URL_SOCKET":"wss://wacatrade.com:2096","BASE_URL_SOCKET_SYS":"wss://wacatrade.com:2087","BASE_URL_SOCKET_NAP":"wss://wacatrade.com:2083","BASE_URL_SOCKET_NOTIFY":"wss://wacatrade.com:2053"}')},ab61:function(t,e,a){"use strict";a("5f00")},c5b9:function(t,e,a){"use strict";var n,s=a("ade3"),c=a("3f4a"),i=a("16b6"),r=a("bc3a"),o=a.n(r),u=a("7dc5"),l=function(){return o.a.create({baseURL:"".concat(u.domain),headers:{Authorization:"Sky ".concat(localStorage.getItem("tokenAgency"))}})};e["a"]=(n={active2fa:function(t){return Object(i["a"])().post("api/users/active-2fa",t)},disable2fa:function(t){return Object(i["a"])().post("api/users/disable-2fa",t)},adminDisable2fa:function(t){return Object(i["a"])().post("api/users/admin-disable-2fa",t)},check2fa:function(t){return Object(i["a"])().post("api/users/check-2fa",t)},checkOn2fa:function(){return Object(i["a"])().get("api/users/check-on-2fa")},loginUser:function(t){return Object(c["a"])().post("api/users/login",t)},getTokenActive:function(t){return Object(c["a"])().post("api/users/activeUser",t)},registerUser:function(t){return Object(c["a"])().post("api/users/createAccount",t)},forgotPassUser:function(t){return Object(c["a"])().post("api/users/forgot-password",t)},resendConfirUser:function(t){return Object(c["a"])().post("api/users/resend-confirmation-email",t)},changePassword:function(t){return Object(c["a"])().patch("api/users/change-password",t)},changePassword2:function(t){return Object(c["a"])().patch("api/users/change-password-is",t)},getInfoUser:function(){return Object(c["a"])().get("api/users/info")},updateXacMinhTK:function(t){return Object(c["a"])().post("api/users/update-info",t)},activeGG2FA:function(t){return Object(c["a"])().post("api/users/update-gg2fa",t)},unActiveGG2FA:function(t){return Object(c["a"])().post("api/users/disable-gg2fa",t)},activeTele2FA:function(t){return Object(c["a"])().post("api/users/active-tele2fa",t)},unActiveTele2FA:function(t){return Object(c["a"])().post("api/users/disable-tele2fa",t)},sendGG2FA:function(){return Object(c["a"])().get("api/users/code-2fa")},sendTele2FA:function(){return Object(c["a"])().get("api/users/code-2fa-tele")},createGG2FA:function(t){return void 0!==t?Object(i["a"])().get("api/users/create-gg2fa"):Object(c["a"])().get("api/users/create-gg2fa")},loginGG2FA:function(t){return Object(c["a"])().post("api/users/login-2fa",t)},reloadMoneyDemo:function(){return Object(c["a"])().put("api/users/demo")},getListHitoryOrder:function(){return Object(c["a"])().get("api/users/listbo")},sendMoneyLiveToUsdt:function(t){return Object(c["a"])().post("api/users/live-to-usdt",t)},sendMoneyUsdtToLive:function(t){return Object(c["a"])().post("api/users/usdt-to-live",t)},withdrawalUserNoiBo:function(t){return Object(c["a"])().post("api/users/withdrawal",t)},withdrawalUsdtERC:function(t){return Object(c["a"])().post("api/users/withdrawal-erc",t)},withdrawalUsdtBSC:function(t){return Object(c["a"])().post("api/users/withdrawal-bsc",t)},withdrawalUsdtVND:function(t){return Object(c["a"])().post("api/users/withdrawal-vnd",t)},withdrawalPaypalNoiBo:function(t){return Object(c["a"])().post("api/users/paypal/withdrawal",t)},withdrawalPaypalAccount:function(t){return Object(c["a"])().post("api/users/paypal/withdrawal-acc",t)},getBalanceWallet:function(){return Object(c["a"])().get("api/users/balance-wallet")},scanWallet:function(t){return Object(c["a"])().get("api/users/scan-wallet?e=".concat(t))},scanWalletAdmin:function(t){return Object(i["a"])().get("api/users/scan-wallet-admin?e=".concat(t))},scanWalletAdminNoneFree:function(t){return Object(i["a"])().get("api/users/scan-wallet-admin-none-fee?e=".concat(t))},getBankInfo:function(){return Object(c["a"])().get("api/users/bank-info")},depositWallet:function(t){return Object(c["a"])().post("api/users/usdt-wallet",t)},UserBuyVip:function(){return Object(c["a"])().post("api/users/buy-vip")},getNguoiGioiThieu:function(){return Object(c["a"])().get("api/users/presenter")},getThongTinLoiNhuan:function(){return Object(c["a"])().get("api/users/bo-statistics")},getListHisOrder:function(){return Object(c["a"])().get("api/users/history-order")},getSeachListOrder:function(t){return Object(c["a"])().post("api/users/history-order-date",t)},getListHisTradeWallet:function(){return Object(c["a"])().get("api/users/history-wallet")},getListHisTradeWalletNumber:function(t){return Object(c["a"])().get("api/users/history-wallet/"+t)},getListHisTradeWalletHH:function(){return Object(c["a"])().get("api/users/history-wallet-co")},getListHisTradeWalletHHNumber:function(t){return Object(c["a"])().get("api/users/history-wallet-co/"+t)},getListHisTradeWalletWGD:function(){return Object(c["a"])().get("api/users/history-wallet-trade")},getListHisTradeWalletWGDNumber:function(t){return Object(c["a"])().get("api/users/history-wallet-trade/"+t)},chiTietLoiNhuanHoaHong:function(){return Object(c["a"])().get("api/users/commission-details")},chiTietLoiNhuanHoaHongPage:function(t){return Object(c["a"])().get("api/users/commission-details/"+t)},getSeachListChiTietHH:function(t){return Object(c["a"])().post("api/users/commission-details-date",t)},getSeachListLvAgency:function(t){return Object(c["a"])().post("api/users/agency-search-lv",t)},getSeachListNameAgency:function(t){return Object(c["a"])().post("api/users/agency-search-name",t)},depositPaypal:function(t){return Object(c["a"])().get("api/paypal/pay?a="+t.a+"&n="+t.n)},depositVND:function(t){return Object(c["a"])().get("api/pay/vnd?a="+t.a+"&n="+t.n+"&al="+t.al+"&b="+t.b)},getAddressCoin:function(t){return Object(c["a"])().get("api/wallet/"+t+"/address")},transWallet:function(t){return Object(c["a"])().post("api/exs/trans",t)},getSetupWallet:function(){return Object(c["a"])().get("api/setup/wallet")},getSupport:function(){return Object(c["a"])().get("api/setup/supports")},getExChangeUser:function(){return Object(c["a"])().get("api/exs/hisUser")},getStatusServer:function(){return Object(c["a"])().get("status")},checkGiaoDich:function(t){return Object(c["a"])().post("api/user/balance/trans/check",t)},getListNotifi:function(t){return Object(c["a"])().post("api/users/getListNotifi",t)},updateListNotifi:function(t){return Object(c["a"])().post("api/users/updateListNotifi",t)},activeUser:function(t){return Object(i["a"])().post("api/users/admin-active-user",t)},getRevenueNap:function(){return Object(i["a"])().get("api/trades/getRevenueNap")},getRevenueRut:function(){return Object(i["a"])().get("api/trades/getRevenueRut")},getRevenueBank:function(t){return Object(i["a"])().get("api/trades/getRevenueBank",{params:t})},getRevenueTrans:function(){return Object(i["a"])().get("api/trades/getRevenueTrans")},getShowDT:function(t){return Object(i["a"])().post("api/trades/getShowDT",t)},changeAccMarketing:function(t){return Object(i["a"])().post("api/users/changeAcc",t)},changePassAdmin:function(t){return Object(i["a"])().post("api/users/changPassAd",t)},createUser:function(t){return Object(i["a"])().post("api/users/create",t)},register:function(t){return Object(i["a"])().post("api/users/register",t)},loginAdmin:function(t){return Object(i["a"])().post("api/users/AdminSingIn",t)},checkEmail:function(t){return Object(i["a"])().get("api/users/checkEmail/"+t)},getAllMember:function(t){return Object(i["a"])().get("api/users/getAllUser",{params:t})},getAllDeletedMember:function(t){return Object(i["a"])().get("api/users/getAllDeletedUsers",{params:t})},updateMember:function(t){return Object(i["a"])().patch("api/users/updateUser",t)},updatePriceMember:function(t){return Object(i["a"])().patch("api/users/updateMoney",t)},handleMoney:function(t){return Object(i["a"])().post("api/pay/approval",t)},handleMoneyRut:function(t){return Object(i["a"])().post("api/pay/approval-rut",t)},handleMoneyBank:function(t){return Object(i["a"])().post("api/pay/approval-bank",t)},deleteMember:function(t){return Object(i["a"])().delete("api/users/deleteUserById/"+t)},recoverMember:function(t){return Object(i["a"])().delete("api/users/recoverUserById/"+t)},verifiedUser:function(t){return Object(i["a"])().post("api/users/verifiedUser",t)},getListAgency:function(){return Object(i["a"])().get("api/users/getAgency")},viewMemberAgency:function(t){return Object(i["a"])().get("api/users/viewTotalMAgency/"+t)},addMoneyMember:function(t){return Object(i["a"])().post("api/users/addMoneyMember",t)},getRateCommission:function(){return Object(i["a"])().get("api/setup/getRateCommission")},saveRateCommission:function(t){return Object(i["a"])().post("api/setup/saveRateCommission",t)}},Object(s["a"])(n,"saveRateCommission",(function(t){return Object(i["a"])().post("api/setup/saveRateCommission",t)})),Object(s["a"])(n,"getStakingRate",(function(){return Object(i["a"])().get("api/staking/set-rate")})),Object(s["a"])(n,"setStakingRate",(function(t){return Object(i["a"])().post("api/staking/set-rate",t)})),Object(s["a"])(n,"getAddMoneyListHistory",(function(t){return Object(i["a"])().get("api/trades/historyAllAddMoney",{params:t})})),Object(s["a"])(n,"getTotalAddMoney",(function(){return Object(i["a"])().get("api/trades/totalAddMoney")})),Object(s["a"])(n,"getTradeListHistory",(function(t){return Object(i["a"])().get("api/trades/historyAll",{params:t})})),Object(s["a"])(n,"gethistoryAllTrash",(function(t){return Object(i["a"])().get("api/trades/historyAllTrash",{params:t})})),Object(s["a"])(n,"deleteTrashByID",(function(t){return Object(i["a"])().put("api/trades/deleteTradeHisById",t)})),Object(s["a"])(n,"getDepositListHistory",(function(t){return Object(i["a"])().get("api/trades/hisDepositAll",{params:t})})),Object(s["a"])(n,"getDepositListHistoryAgency",(function(t,e){return Object(c["a"])().get("api/trades/hisDepositAll?email=".concat(t,"&").concat(e))})),Object(s["a"])(n,"getDepositAllTrash",(function(t){return Object(i["a"])().get("api/trades/hisDepositAllTrash",{params:t})})),Object(s["a"])(n,"getWithdrawalListHistory",(function(t){return Object(i["a"])().get("api/trades/hisWithDrawalAll",{params:t})})),Object(s["a"])(n,"getWithdrawalListHistoryAgency",(function(t,e){return Object(c["a"])().get("api/trades/hisWithDrawalAll?email=".concat(t).concat(e))})),Object(s["a"])(n,"doneWithDrawalByID",(function(t){return Object(i["a"])().post("api/trades/doneWithdrawal",t)})),Object(s["a"])(n,"doneRefuseWithDrawalByID",(function(t){return Object(i["a"])().post("api/trades/doneRefuseWithdrawal",t)})),Object(s["a"])(n,"getListF1F7",(function(t){return Object(i["a"])().post("api/users/getListF1F7",t)})),Object(s["a"])(n,"getStatisticsListF1F7",(function(t,e){return l().get("api/users/thong-ke-getListF1F7?email=".concat(t).concat(e))})),Object(s["a"])(n,"getSuperior",(function(t){return Object(i["a"])().get("api/users/getSuperior/".concat(t))})),Object(s["a"])(n,"getLiveAccount",(function(t){return Object(i["a"])().get("api/users/get-live-account/".concat(t))})),Object(s["a"])(n,"getLisCommissionSearch",(function(t){return Object(i["a"])().post("api/users/getListCmsHis",t)})),Object(s["a"])(n,"getAnalytics",(function(){return Object(i["a"])().get("api/users/analytics")})),Object(s["a"])(n,"getBetsListHistory",(function(){return Object(i["a"])().get("api/bets/historyBet")})),Object(s["a"])(n,"getBetsListHistoryAgency",(function(t,e){return Object(c["a"])().get("api/bets/historyBet?email=".concat(t,"&").concat(e))})),Object(s["a"])(n,"getBetsListHisTrash",(function(){return Object(i["a"])().get("api/bets/hisBetTrash")})),Object(s["a"])(n,"deleteBetsTrash",(function(t){return Object(i["a"])().patch("api/bets/deleteBet",t)})),Object(s["a"])(n,"getExListHistory",(function(){return Object(i["a"])().get("api/exs/historyEx")})),Object(s["a"])(n,"getExListHisTrash",(function(){return Object(i["a"])().get("api/exs/historyExTrash")})),Object(s["a"])(n,"deleteExTrash",(function(t){return Object(i["a"])().patch("api/exs/deleteEx",t)})),Object(s["a"])(n,"uploadAvatar",(function(t){return Object(c["a"])().post("api/auth/avatar",t)})),Object(s["a"])(n,"uploadPassportFront",(function(t){return Object(c["a"])().post("api/auth/passport/front",t)})),Object(s["a"])(n,"uploadPassportBack",(function(t){return Object(c["a"])().post("api/auth/passport/back",t)})),Object(s["a"])(n,"createChampion",(function(t){return Object(i["a"])().post("api/game/champion",t)})),Object(s["a"])(n,"getChampions",(function(){return Object(i["a"])().get("api/game/champions")})),Object(s["a"])(n,"getChampionsClient",(function(){return Object(c["a"])().get("api/game/champions")})),Object(s["a"])(n,"getTopChampions",(function(){return Object(c["a"])().get("api/game/top-champions")})),Object(s["a"])(n,"deleteChampion",(function(t){return Object(i["a"])().delete("api/game/champion/".concat(t))})),Object(s["a"])(n,"updateChampion",(function(t,e){return Object(i["a"])().put("api/game/champion/".concat(t),e)})),Object(s["a"])(n,"uploadBackgroundImage",(function(t){return Object(c["a"])().post("api/auth/champion",t)})),Object(s["a"])(n,"getActiveGames",(function(){return Object(c["a"])().get("api/game/active-games")})),Object(s["a"])(n,"createLuckyDrawAdmin",(function(t,e){return Object(i["a"])().put("api/game1/lucky-draws/".concat(e),t)})),Object(s["a"])(n,"getLuckyDrawAdmin",(function(){return Object(i["a"])().get("api/game1/lucky-draws-admin")})),Object(s["a"])(n,"getLuckyDraw",(function(){return Object(c["a"])().get("api/game1/lucky-draws")})),Object(s["a"])(n,"getThongTinLoiNhuanHangNgay",(function(){return Object(c["a"])().get("api/users/bo-statistics-current-day")})),Object(s["a"])(n,"createStreakChallenge",(function(t){return Object(i["a"])().post("/api/game2/streak-challenge",t)})),Object(s["a"])(n,"getStreakChallenge",(function(){return Object(i["a"])().get("/api/game2/streak-challenge")})),Object(s["a"])(n,"getStreakClientChallenge",(function(){return Object(c["a"])().get("/api/game2/streak-challenge")})),Object(s["a"])(n,"getUserStreakChallenge",(function(){return Object(i["a"])().get("/api/game2/streak-challenge-user")})),Object(s["a"])(n,"getUserClientStreakChallenge",(function(){return Object(c["a"])().get("/api/game2/streak-challenge-user")})),Object(s["a"])(n,"addUserStreakChallenge",(function(t){return Object(i["a"])().post("/api/game2/streak-challenge-user",t)})),Object(s["a"])(n,"getPrizeUser",(function(){return Object(c["a"])().get("/api/game2/prize")})),Object(s["a"])(n,"getInfoAgency",(function(){return l().get("api/users/info")})),Object(s["a"])(n,"getLuckyReward",(function(){return Object(c["a"])().get("api/users/lucky-reward")})),Object(s["a"])(n,"checkSpinUser",(function(){return Object(c["a"])().get("api/users/check-lucky-spins")})),Object(s["a"])(n,"luckyRewardSpinUser",(function(t){return Object(c["a"])().post("api/users/lucky-reward-spin",t)})),Object(s["a"])(n,"luckyActive",(function(){return Object(c["a"])().get("api/users/lucky-active")})),Object(s["a"])(n,"getAdminUserInfo",(function(t){return Object(i["a"])().get("api/users/get-user-info-admin/"+t)})),Object(s["a"])(n,"getAdminUserTradeAnalyze",(function(t){return Object(i["a"])().get("api/users/get-user-trade-analyze?id="+t)})),Object(s["a"])(n,"getAdminUserBalanceAnalyze",(function(t){return Object(i["a"])().get("api/users/get-user-balance-analyze?id="+t)})),Object(s["a"])(n,"changeAccountInfo",(function(t){return Object(c["a"])().post("api/users/change-account-info",t)})),Object(s["a"])(n,"requestDeposit",(function(t){return Object(c["a"])().post("api/users/request-deposit",t)})),Object(s["a"])(n,"addRequest",(function(t){return Object(i["a"])().post("api/users/add-deposit",t)})),Object(s["a"])(n,"getAllUsers",(function(){return Object(i["a"])().get("api/users/get-all-users")})),n)}}]);