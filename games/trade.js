const express = require('express')
const app = express()
const config = require('./../config.js')
//const msg = require('./../msg')
const apiBinace = require('node-binance-api')
const Binance = require('binance-api-node').default;

const toFixed = require('tofixed')
const axios = require('axios')
const WebSocket = require('ws')
const fs = require('fs')
const { v1: uuidv1 } = require('uuid');
const cors = require('cors')
const { updatePriceWinLose } = require('./../api/trans_user');

const Tele = require("../auth/telegram_notify")
const Helper = require("../helpers");

const BOT_TRADE = require("../auth/model/botTrade");
const db = require('../database');

const { getPrize } = require('../helper/getPrize');
const { SEND_THONG_BAO } = require("../auth/notifi");

const fileSys = config.PATH_SYS_CONFIG
const fileCommission = config.PATH_SYS_COMMISSION
const fileGame = config.PATH_SYS_GAME

var {
    getPriceUser,
    updateBalanceUser,
    updatePersonalTrading,
    checkF0Commission,
    updateAmountRateCommission,
    checkF0CommissionInF0,
    updateAmountWin,
    updateAmountLose,
    insertBetOrder,
    getMaretingAcc,
    listF0With7Level,
    getGameChampionAcc,
    insertGameChampion,
    getDupBet,
    updateDupLenh,
} = require("./../games/service.trade")

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}));

// use https

var httpServer = null

if (!config.USE_SSL) {
    httpServer = require('http').createServer(app);
} else {
    let options = Helper.ssl;
    httpServer = require('https').createServer(options, app);
}

const wss = new WebSocket.Server(
    {
        server: httpServer,
        //port: 80 
    }
)

httpServer.listen(config.PORT_TRADE)

var instance = new apiBinace().options({
    APIKEY: config.BINANCE_APIKEY,
    APISECRET: config.BINANCE_APISECRET,
    useServerTime: true, // Nếu bạn gặp lỗi dấu thời gian, hãy đồng bộ hóa với thời gian máy chủ khi khởi động 
    test: false // Nếu bạn muốn sử dụng chế độ test
});

var instanceFuture = Binance({
    apiKey: config.BINANCE_APIKEY,
    apiSecret: config.BINANCE_APISECRET,
})

var LIST_GET_DATA = [], jsonData = [], SO_GIAY_DEM_NGUOC = config.SO_GIAY_DEM_NGUOC, ANTI_BET = false, ORDER_OR_WATTING = 'order', timeGet = new Date().getTime();
var rateNhaThuong = config.RATE_NHA_THUONG; // tỉ lệ nhận thưởng là 95% cho mỗi lần thắng
var SEVER_GET = 'BTC/USDT', BET_MAX = config.BET_MAX;
var BTC_USER_BUY = [], BTC_USER_SELL = [], AMOUNT_USER_BUY = [], AMOUNT_USER_SELL = [];
var PRICE_BUY_LIVE_BACKUP = 0, PRICE_SELL_LIVE_BACKUP = 0, PRICE_BUY_LIVE = 0, PRICE_SELL_LIVE = 0, PRICE_BUY_DEMO = 0, PRICE_SELL_DEMO = 0;
var AMOUNT_USER_BEFORE = [];

var totalPTBuy = 0, totalPTSell = 0, session = 1000000, AMOUNT_MARKETING_LOSE = 0, AMOUNT_MARKETING_WIN = 0, PRICE_MAKETING_BUY = 0, PRICE_MAKETING_SELL = 0;
var currentSession = 0;
var BUY = [], SELL = [], STATIC = [], getLoadStaticGue = {}, tCountDown, LIST_USER_XU_LY = {}, BTC_USER_BUY_BACK = [], BTC_USER_SELL_BACK = [];
let AMOUNT_MAX_BREAK_BRIDGE = 400, AMOUNT_NEGA_AMOUNT_BREAK_BRIDGE = -30, CLOSE_CHECK = 0, OPEN_CHECK = 0;
let WRITE_ACCOUNT_BREAK = [];
let GAME_CHAPION = {};
let WRITE_ACCOUNT_BREAK_DUPLICATE = [];

//Copy trade
var AMOUNT_USER_BUY_CPT = [], BTC_USER_BUY_CPT = [], AMOUNT_USER_SELL_CPT = [], BTC_USER_SELL_CPT = [];

var BTC_USER_BUY_CPT_EMAIL = [];
var BTC_USER_SELL_CPT_EMAIL = [];


// Config tỉ lệ nến râu dài
const BIEN_DO = 2;
const TI_LE = 0.9;

var DATA_GL = require('./editBet');
const { ppid } = require('process');
//const { Console } = require('console')

const tradeConfig = Helper.getConfig('trade');
const gameConfig = Helper.getConfig('game');

DATA_GL.PRICE_FUND_PROFITS = parseFloat(gameConfig.Profit);
AMOUNT_NEGA_AMOUNT_BREAK_BRIDGE = parseFloat(gameConfig.Break);
AMOUNT_MAX_BREAK_BRIDGE = parseFloat(gameConfig.MaxBreak);
WRITE_ACCOUNT_BREAK = gameConfig.Email;
WRITE_ACCOUNT_BREAK_DUPLICATE = gameConfig.Duplicate;

console.log("Write");
console.log(DATA_GL);

if (!(tradeConfig.static.length % 2)) {
    tradeConfig.static.shift();
    Helper.setConfig('trade', tradeConfig);
}

STATIC = tradeConfig.static;

session = tradeConfig.session;

function writeSessionDB() {
    tradeConfig.session = session;
    Helper.setConfig('trade', tradeConfig);
}

function writeStaticDB() {
    tradeConfig.static = STATIC;
    Helper.setConfig('trade', tradeConfig);
}

function writeGameDB(profit, breakValue, max, email, duplicate) {
    gameConfig.Profit = profit;
    gameConfig.Break = breakValue;
    gameConfig.MaxBreak = max;
    gameConfig.Email = email;
    gameConfig.Duplicate = duplicate;
    Helper.setConfig('game', gameConfig);
}

class PlayerData {
    constructor(id, uid) {
        this.id = id
        this.uid = uid
    }
}

const users = {};
const depositUsers = {};

console.log(`- SV ${SEVER_GET} START \n- Server started port: ${config.PORT_TRADE}.`);

wss.on('connection', function (ws) {
    // login vào web sẽ in ra tổng dữ liệu
    ws.send(JSON.stringify({ type: 'getListDauTien', data: LIST_GET_DATA }))

    //get trans volum
    let totalBuy = 0, totalSell = 0;
    totalBuy = PRICE_BUY_LIVE;
    totalSell = PRICE_SELL_LIVE;

    let jsonTransVolum = { nbuy: totalBuy, nsell: totalSell, ptbuy: Number(totalPTBuy), ptsell: Number(totalPTSell) }
    ws.send(JSON.stringify({ type: 'transVolum', data: jsonTransVolum }))

    let countBUY = BUY.length;
    let countSELL = SELL.length;

    let staticShow = { ss: session, cbuy: countBUY, csell: countSELL, static: STATIC }

    if (Object.keys(getLoadStaticGue).length === 0) {
        getLoadStaticGue = { Moving: { b: 0, s: 0, m: 0 }, Oscillators: { b: 0, s: 0, m: 0 }, Summary: { b: 0, s: 0, m: 0 } }
    }

    ws.send(JSON.stringify({ type: 'static', data: staticShow, load: getLoadStaticGue }));

    ws.on('message', d => {
        var data = JSON.parse(d)
        //info
        if (data.type === 'accountDetail') {
            let obj = data.data;

            if (void 0 === obj.email) {
                let mess = { type: 'reloadAccount', mess: 'Không lấy được email!', style: 'danger' };
                ws.send(JSON.stringify({ type: 'mess', data: mess }));
                return;
            }

            // xóa user và thêm nếu có kết nối lại ( để lêu lại log xử lý kết quả )
            //let t = 0;
            for (let l in users) {
                if (users[l].email == obj.email) {
                    //t++;
                    //console.log(t+ ": " + users[l].email);
                    // send có tài khoản đăng nhập ở nơi khác
                    // let ws = users[l].ws;
                    // let mess = { type: 'disAccount', mess: 'Tài khoản của bạn đang được đăng nhập ở nơi khác!', style: 'danger' };
                    // ws.send(JSON.stringify({ type: 'mess', data: mess }));
                    break;
                }
            }

            let player = new PlayerData(uuidv1(), 0);
            player.ws = ws;
            player.uid = obj.uid;
            player.email = obj.email;
            users[player.id] = player;

            for (let obj in users) {
                let uid = users[obj].uid;
                // tìm UID của ADMIN rồi gửi
                if (uid == 'ADMIN_BO') {
                    //console.log(uid);
                    let ws = users[obj].ws;
                    ws.send(JSON.stringify({ type: 'getTruck', data: DATA_GL, min_am_go: AMOUNT_NEGA_AMOUNT_BREAK_BRIDGE, max_amount_be: AMOUNT_MAX_BREAK_BRIDGE, account_break: WRITE_ACCOUNT_BREAK, duplicate: WRITE_ACCOUNT_BREAK_DUPLICATE }));
                }
            }
        }

        if (data.type === 'loginUser') {
            let obj = data.data;

            for (let l in users) {
                if (users[l].email == obj.email) {
                    let ws = users[l].ws;
                    let mess = { type: 'disAccount', mess: 'Tài khoản của bạn đang được đăng nhập ở nơi khác!', style: 'danger' };
                    //ws.send(JSON.stringify({ type: 'mess', data: mess }));
                    break;
                }
            }
        }

        if (data.type === 'getListData') {
            ws.send(JSON.stringify({ type: 'getListDauTien', data: LIST_GET_DATA }));
            ws.send(JSON.stringify({ type: 'static', data: staticShow, load: getLoadStaticGue }));
        }

        // chỉnh sửa trò chơi
        if (data.type === 'editGL') {
            let obj = data.data

            if (obj.type == 'BTC_BUY') {
                BTC_SET_BUY_WIN()
            }

            if (obj.type == 'BTC_SELL') {
                BTC_SET_SELL_WIN()
            }

            if (obj.type == 'BTC_LESS') {
                BTC_LESS_WIN()
            }

            if (obj.type == 'BTC_OFF') {
                BTC_TOOL_OFF()
            }

            if (obj.type == 'BOT') {
                DATA_GL.BOT = DATA_GL.BOT ? false : true
            }

            if (obj.type == 'BOT_GO_TIEN') {
                DATA_GL.PRICE_FUND_ON_OFF = DATA_GL.PRICE_FUND_ON_OFF ? false : true;
            }

            if (obj.type == 'GO_TIEN_OFF') {
                DATA_GL.LESS_WIN = false;
                Tele.sendMessBet(`🔔 ADMIN <i>OFF</i> GỠ TIỀN\n🖲Hệ thống LỜI/LỖ hiện tại 💴: <i>${DATA_GL.PRICE_FUND_PROFITS}</i>👉Bây giờ LỜI/LỖ sẽ là: <i>0</i>`);
                DATA_GL.PRICE_FUND_PROFITS = 0;
            }

            if (obj.type == 'WRITE_AMOUNT_MAX_BREAK_BRIDGE') {
                AMOUNT_MAX_BREAK_BRIDGE = Number(obj.AMOUNT);
                Tele.sendMessBet(`🔔 ADMIN vừa đặt lại mốc BẺ 💴: <i>${obj.AMOUNT}</i>`);
            }

            if (obj.type == 'WRITE_AMOUNT_NEGA_AMOUNT_BREAK_BRIDGE') {
                AMOUNT_NEGA_AMOUNT_BREAK_BRIDGE = Number(obj.AMOUNT);
                Tele.sendMessBet(`🔔 ADMIN vừa đặt lại mốc GỠ 💴: <i>${obj.AMOUNT}</i>`);
            }

            if (obj.type == 'WRITE_ACCOUNT_BREAK') {
                WRITE_ACCOUNT_BREAK = obj.accounts;
                Tele.sendMessBet(`🔔 ADMIN vừa đặt lại danh sách email bẻ 💴: <i>${obj.accounts}</i>`);
            }
            if (obj.type == 'WRITE_ACCOUNT_BREAK_DUPLICATE') {
                WRITE_ACCOUNT_BREAK_DUPLICATE = obj.duplicate;
                console.log("🚀 ~ file: trade.js:298 ~ obj.duplicate:", obj.duplicate)
                Tele.sendMessBet(`🔔 ADMIN vừa đặt lại danh sách email cân lệnh 💴: <i>${obj.duplicate}</i>`);
            }
        }

        if (data.type === 'bet') {
            let obj = data.data
            BeginBet(ws, obj);
        }
    })

    ws.on('close', message => {
        // chạy lệnh xóa id nếu user bị mất kết nối
        for (let obj in users) {
            if (users[obj].ws == ws) {
                delete users[obj];
                break;
            }
        }
    })
});

// Lấy dữ liệu đầu vào
getListStartGame();

function getListStartGame() {
    axios.get(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=120`)
        .then(data => {
            const getData = data.data;
            getData.map(d => {
                let t = Math.round(d[0]),
                    o = parseFloat(d[1]),
                    h = parseFloat(d[2]),
                    l = parseFloat(d[3]),
                    c = parseFloat(d[4]),
                    v = parseFloat(d[5]).toFixed(2);

                if (Math.abs(h - Math.max(c, o)) > BIEN_DO && Math.random() < TI_LE) {
                    h = Math.random() * BIEN_DO + Math.max(c, o);
                }

                if (Math.abs(l - Math.min(c, o)) > BIEN_DO && Math.random() < TI_LE) {
                    l = Math.min(c, o) - Math.random() * BIEN_DO;
                }

                let getS = { date: new Date(t - 30000).getTime(), open: o, high: h, low: l, close: c, volume: parseFloat(v) };
                LIST_GET_DATA.push(getS)
            });

            //LIST_GET_DATA[LIST_GET_DATA.length - 1].date = timeGet;
            countDownGame();
        })
}

let maintenance = false;

// kích hoạt kiểm tra bảo trì hết chưa
function AccpetIsBaoTri() {
    clearInterval(tCountDown);
    let oc = setInterval(() => {
        if (!maintenance) {
            clearInterval(oc);
            let msg = 'Bảo trì đã xong.';
            Tele.sendMessBet(msg);
            LIST_GET_DATA = [], jsonData = [], SO_GIAY_DEM_NGUOC = config.SO_GIAY_DEM_NGUOC, ANTI_BET = false, ORDER_OR_WATTING = 'order';
            // STATIC = [];
            BUY = [];
            SELL = [];
            getLoadStaticGue = {};
            getListStartGame();
            countDownGame();
        }
    }, 1000);
}

checkBaoTriBinance();

function checkBaoTriBinance() {
    setInterval(() => {
        axios.get('https://api.binance.com/sapi/v1/system/status')
            .then(data => {
                const getData = data.data;
                let dataSys = Helper.getConfig(fileSys);
                if (getData.status) { // bảo trì
                    dataSys.maintenance = maintenance = true; // bảo trì
                    let msg = 'Binance sẽ thực hiện nâng cấp hệ thống theo lịch trình. Quý khách trade coin vui lòng để ý để chủ động trong gd hoặc rút tiền.';
                    dataSys.maintenanceContent = msg;

                    Tele.sendMessBet(msg);
                    Helper.setConfig(fileSys, dataSys);
                    AccpetIsBaoTri();
                    let obj = { type: 'bet', mess: msg, style: 'danger' };
                    wss.clients.forEach(function each(client) {
                        client.send(JSON.stringify({ type: 'mess', data: obj }));
                    })
                } else {
                    dataSys.maintenance = maintenance = false;
                    Helper.setConfig(fileSys, dataSys);
                    //let json = JSON.stringify(dataSys)
                    //fs.writeFile(fileSys, json, 'utf8', (err) => {})
                }
            }).catch((error) => { });
    }, 25000);
}

function XU_LY_SEND_BOT_DU_DOAN(s) {
    if (ORDER_OR_WATTING === 'order') {
        if (s === 29) {
            BOT_TRADE.SEND_TUONG_TAC();
        }

        if (s == 25) {
            BOT_TRADE.SEND_BOT_DU_BAO();
        }

        if (s === 15 || s < 3) {
            BOT_TRADE.SEND_BOT_SECOND(s);
        }
    }
}

function countDownGame() {
    const SO_GIAY_MAC_DINH = SO_GIAY_DEM_NGUOC;

    tCountDown = setInterval(() => {
        --SO_GIAY_DEM_NGUOC;
        playRealTimeSpot(SO_GIAY_DEM_NGUOC);

        var s = 0
        if (SO_GIAY_DEM_NGUOC < 10) {
            s = '0' + SO_GIAY_DEM_NGUOC;
        } else {
            s = SO_GIAY_DEM_NGUOC;
        }

        jsonData['candleClose'] = s;
        jsonData['type'] = ORDER_OR_WATTING;
        jsonData['session'] = session;

        // XỬ LÝ SEND DỰ ĐOÁN TELEGRAM
        //XU_LY_SEND_BOT_DU_DOAN(SO_GIAY_DEM_NGUOC);
        //

        if (SO_GIAY_DEM_NGUOC === 0) {
            // trở về giây cũ
            SO_GIAY_DEM_NGUOC = SO_GIAY_MAC_DINH + 1;

            // đổi lại trạng thái

            ORDER_OR_WATTING = ORDER_OR_WATTING === 'order' ? 'watting' : 'order';

            if (ORDER_OR_WATTING == "order") {
                DATA_GL.EXTRACT_VALUE = false;
            }

            // đủ 100 item thì clear
            if (STATIC.length > 99) {
                //STATIC = [];
                //SELL = [];
                //BUY = [];

                for (let i = 0; i < 20; i++) {
                    BUY.shift();
                    SELL.shift();
                    STATIC.shift();
                    writeStaticDB();
                }
            }

            // clear BOT ảo 
            BOTAOClear()
            if (ORDER_OR_WATTING === 'order') {
                DATA_GL.START_BOT = false;
                ANTI_BET = false // cho dat cuoc
                // xử lý BUY anh SELL khi kết thúc Watting

                xuLyChartKetThuc1Phien(jsonData);
                
                if (DATA_GL.BOT) {
                    BOTAOStart()
                }
            } else {
                ANTI_BET = true // khong cho dat cuoc
                DATA_GL.START_BOT = true;
                // gửi danh sách vào ADMIN
                xulyInVaoHisBeCau();

                SEND_MESS_THONG_BAO_CHENH_LECH();

                if (session !== 1000000) PUSH_STATIC(jsonData);
            }
        }

        if (SO_GIAY_DEM_NGUOC === config.SO_GIAY_DEM_NGUOC - 3 && ORDER_OR_WATTING === 'order') {
            // Đánh ở giây số config.SO_GIAY_DEM_NGUOC - 3 để chờ kết quả insert từ phiên trước đó, nếu có
            // AI đánh
            AITrade();
        }

        // chuyển tất cả dữ liệu ra ngoài client
        if (!maintenance) {
            wss.clients.forEach(function each(client) {
                client.send(JSON.stringify({ type: 'allData', data: jsonData }));
            });
        }
    }, 1000)
}

function SEND_MESS_THONG_BAO_CHENH_LECH() {
    //let totalBuy = void 0 === eval(PRICE_BUY_LIVE.join('+')) ? 0 : eval(PRICE_BUY_LIVE.join('+'));
    //let totalSell = void 0 === eval(PRICE_SELL_LIVE.join('+')) ? 0 : eval(PRICE_SELL_LIVE.join('+'));

    let totalBuy = PRICE_BUY_LIVE - PRICE_MAKETING_BUY;
    let totalSell = PRICE_SELL_LIVE - PRICE_MAKETING_SELL;

    if (totalBuy > 0 || totalSell > 0) {
        Tele.sendMessBetAmount(`✍️Phiên: 💸<b>${session}</b>\n✍️Cửa BUY: 💸<b>${totalBuy}</b>\n✍️Cửa SELL: 💸<b>${totalSell}</b>`);
    }
}

let o = 0;
let c = 0;

// khởi chạy game
function playRealTimeSpot(s) {
    if (maintenance) return;
    if (s == config.SO_GIAY_DEM_NGUOC || o == 0) {
        timeGet = new Date().getTime();
        let lastClose = LIST_GET_DATA[LIST_GET_DATA.length - 1].close;
        o = parseFloat(lastClose);
        c = o;
        jsonData = { date: timeGet, open: o, high: o, low: o, close: o, volume: 0 }
    }

    instance.candlesticks("BTCUSDT", "1m", (error, ticks) => { //symbol
        if (error == null) {
            let last_tick = ticks[ticks.length - 1];
            let [time, open, high, low, close, volume] = last_tick;

            c = parseFloat(parseFloat(close).toFixed(2));
            let v = parseFloat(parseFloat(volume).toFixed(2));
            jsonData.volume = v;
        }
    })

    if (s > 0 && s < config.SO_GIAY_DEM_NGUOC) {
        jsonData.close = c;
    }

    XU_LY_VOLUM(s, jsonData);

    let h = parseFloat(jsonData.high.toFixed(2)),
        l = parseFloat(jsonData.low.toFixed(2))
    c = parseFloat(jsonData.close.toFixed(2))

    if (c > h) {
        h = c;
    }

    if (c < l) {
        l = c;
    }

    // CHỈNH SỬA THÔNG SỐ GIÁ
    if (Math.abs(h - Math.max(c, o)) > BIEN_DO && Math.random() < TI_LE) {
        h = Math.random() * BIEN_DO + Math.max(c, o);
    }

    if (Math.abs(l - Math.min(c, o)) > BIEN_DO && Math.random() < TI_LE) {
        l = Math.min(c, o) - Math.random() * BIEN_DO;
    }

    jsonData.high = h;
    jsonData.low = l;
}

let rdSe = 20, rdSe2 = 26;

function XU_LY_VOLUM(s, jDATA) {
    //if(maintenance) return; // bảo trì , dừng

    if (ORDER_OR_WATTING === 'order') {
        DATA_GL.EXTRACT_VALUE = false;
    }

    if ((ORDER_OR_WATTING === 'watting' && s < rdSe) && (ORDER_OR_WATTING === 'watting' && s != 0) ||
        ORDER_OR_WATTING === 'order' && s > rdSe2 ||
        ORDER_OR_WATTING === 'order' && s == 0
    ) {
        //if((ORDER_OR_WATTING === 'watting' && s < rdSe) || 
        //	ORDER_OR_WATTING === 'order' && s > rdSe2 || 
        //	ORDER_OR_WATTING === 'watting' && s == 0
        //){
        //console.log(ORDER_OR_WATTING + ' --- ' + s);
        /* RA BUY */
        //if(!CHECK_XU_LY_VOL){
        //    CHECK_XU_LY_VOL = true;
        CLOSE_CHECK = jDATA.close;
        OPEN_CHECK = jDATA.open;

        //}

        let totalBuy = 0;
        let totalSell = 0;

        if (s < rdSe) {
            totalBuy = PRICE_BUY_LIVE_BACKUP = PRICE_BUY_LIVE;
            totalSell = PRICE_SELL_LIVE_BACKUP = PRICE_SELL_LIVE;
        }

        if (s > rdSe2) {
            totalBuy = PRICE_BUY_LIVE_BACKUP;
            totalSell = PRICE_SELL_LIVE_BACKUP;
        }

        totalBuy -= PRICE_MAKETING_BUY;
        totalSell -= PRICE_MAKETING_SELL;

        if (DATA_GL.EXTRACT_VALUE) {
            SEND_CLOSE_CHECK(s);
        } else {
            if (DATA_GL.BTC.BUY && ORDER_OR_WATTING === 'watting' && s < rdSe) {
                if (CLOSE_CHECK < OPEN_CHECK || CLOSE_CHECK == OPEN_CHECK) {
                    DATA_GL.BEFORE_CLOSE_CHECK = parseFloat(CLOSE_CHECK);

                    let tl = OPEN_CHECK - CLOSE_CHECK;
                    DATA_GL.AFTER_CLOSE_CHECK = parseFloat(CLOSE_CHECK + tl + randomNumber(0.1, 0.2));

                    DATA_GL.EXTRACT_VALUE = true;
                    DATA_GL.DIFF = DATA_GL.AFTER_CLOSE_CHECK - DATA_GL.BEFORE_CLOSE_CHECK;
                    DATA_GL.TOTAL_SECOND = s;
                    Tele.sendMessBet(`BẮT ĐẦU BẺ CẦU: SELL THẮNG Giá trước ${DATA_GL.BEFORE_CLOSE_CHECK}, Giá bẻ ${DATA_GL.AFTER_CLOSE_CHECK}, biên độ: ${DATA_GL.DIFF}, số giây: ${DATA_GL.TOTAL_SECOND}`);

                    SEND_CLOSE_CHECK(s);
                } else {
                    let rd = Math.floor(Math.random() * 6);
                    if (rd % 2) {
                        CLOSE_CHECK = CLOSE_CHECK + (Math.random() * 3);
                    } else {
                        //CLOSE_CHECK += (Math.random() * 3);
                    }

                    jsonData.close = parseFloat(CLOSE_CHECK.toFixed(2));
                }
            } else if (DATA_GL.BTC.SELL && ORDER_OR_WATTING === 'watting' && s < rdSe) {
                if (CLOSE_CHECK > OPEN_CHECK || CLOSE_CHECK == OPEN_CHECK) {
                    DATA_GL.BEFORE_CLOSE_CHECK = parseFloat(CLOSE_CHECK);

                    let tl = CLOSE_CHECK - OPEN_CHECK;
                    DATA_GL.AFTER_CLOSE_CHECK = parseFloat(CLOSE_CHECK - tl - randomNumber(0.1, 0.2));
                    DATA_GL.EXTRACT_VALUE = true;
                    DATA_GL.DIFF = DATA_GL.BEFORE_CLOSE_CHECK - DATA_GL.AFTER_CLOSE_CHECK;
                    DATA_GL.TOTAL_SECOND = s;
                    Tele.sendMessBet(`BẮT ĐẦU BẺ CẦU: SELL THẮNG Giá trước ${DATA_GL.BEFORE_CLOSE_CHECK}, Giá bẻ ${DATA_GL.AFTER_CLOSE_CHECK}, biên độ: ${DATA_GL.DIFF}, số giây: ${DATA_GL.TOTAL_SECOND}`);

                    SEND_CLOSE_CHECK(s);
                } else {
                    let rd = Math.floor(Math.random() * 6);
                    if (rd % 2) {
                        CLOSE_CHECK = CLOSE_CHECK - (Math.random() * 3);
                    } else {
                        //CLOSE_CHECK += (Math.random() * 3);
                    }

                    jsonData.close = parseFloat(CLOSE_CHECK.toFixed(2));
                }
            }

            /**
            * Ít là ăn
            *
            */

            else if (DATA_GL.LESS_WIN && ORDER_OR_WATTING === 'watting' && s < rdSe) { // ít là ăn 

                //Tele.sendMessBet(`Số giây: ${s} value: ${DATA_GL.EXTRACT_VALUE}`);

                if (totalBuy < totalSell) { // BUY sẽ thắng ( CLOSE > OPEN )
                    if (CLOSE_CHECK < OPEN_CHECK || CLOSE_CHECK == OPEN_CHECK) {
                        DATA_GL.BEFORE_CLOSE_CHECK = parseFloat(CLOSE_CHECK);
                        let tl = OPEN_CHECK - CLOSE_CHECK;
                        DATA_GL.AFTER_CLOSE_CHECK = parseFloat(CLOSE_CHECK + tl + randomNumber(0.1, 0.2));

                        DATA_GL.EXTRACT_VALUE = true;
                        DATA_GL.DIFF = DATA_GL.AFTER_CLOSE_CHECK - DATA_GL.BEFORE_CLOSE_CHECK;
                        DATA_GL.TOTAL_SECOND = s;
                        Tele.sendMessBet(`BẮT ĐẦU BẺ CẦU: SELL THẮNG Giá trước ${DATA_GL.BEFORE_CLOSE_CHECK}, Giá bẻ ${DATA_GL.AFTER_CLOSE_CHECK}, biên độ: ${DATA_GL.DIFF}, số giây: ${DATA_GL.TOTAL_SECOND}`);

                        SEND_CLOSE_CHECK(s);
                    } else {
                        let rd = Math.floor(Math.random() * 6);
                        if (rd % 2) {
                            CLOSE_CHECK = CLOSE_CHECK + (Math.random() * 3);
                        } else {
                            //CLOSE_CHECK += (Math.random() * 3);
                        }

                        jsonData.close = parseFloat(CLOSE_CHECK.toFixed(2));
                    }

                    //Tele.sendMessBet(`Điều chỉnh CLOSE_CHECK ${CLOSE_CHECK.toFixed(2)}`);
                    //jsonData.close = parseFloat(CLOSE_CHECK.toFixed(2));
                } else if (totalBuy > totalSell) { // SELL sẽ thắng ( CLOSE < OPEN ) // if(totalBuy > totalSell)
                    if (CLOSE_CHECK > OPEN_CHECK || CLOSE_CHECK == OPEN_CHECK) {
                        DATA_GL.BEFORE_CLOSE_CHECK = parseFloat(CLOSE_CHECK);
                        let tl = CLOSE_CHECK - OPEN_CHECK;
                        DATA_GL.AFTER_CLOSE_CHECK = parseFloat(CLOSE_CHECK - tl - randomNumber(0.1, 0.2));

                        DATA_GL.EXTRACT_VALUE = true;

                        DATA_GL.DIFF = DATA_GL.BEFORE_CLOSE_CHECK - DATA_GL.AFTER_CLOSE_CHECK;
                        DATA_GL.TOTAL_SECOND = s;
                        Tele.sendMessBet(`BẮT ĐẦU BẺ CẦU: SELL THẮNG Giá trước ${DATA_GL.BEFORE_CLOSE_CHECK}, Giá bẻ ${DATA_GL.AFTER_CLOSE_CHECK}, biên độ: ${DATA_GL.DIFF}, số giây: ${DATA_GL.TOTAL_SECOND}`);

                        SEND_CLOSE_CHECK(s);
                    } else {
                        let rd = Math.floor(Math.random() * 6);
                        if (rd % 2) {
                            CLOSE_CHECK = CLOSE_CHECK - (Math.random() * 3);
                        } else {
                            //CLOSE_CHECK += (Math.random() * 3);
                        }

                        jsonData.close = parseFloat(CLOSE_CHECK.toFixed(2));
                    }
                }

                //BTC_TOOL_OFF();
            } else {
                DATA_GL.EXTRACT_VALUE = false;
                DATA_GL.DIFF = 0;
                let totalBuyAv = totalBuy - totalSell;
                let totalSellAv = totalSell - totalBuy;

                let rdn = AMOUNT_MAX_BREAK_BRIDGE;

                if (totalBuyAv > rdn) {
                    // SELL sẽ thắng bắc buộc phải  ( CLOSE < OPEN ) 
                    if (CLOSE_CHECK > OPEN_CHECK || CLOSE_CHECK == OPEN_CHECK) {
                        let tl = CLOSE_CHECK - OPEN_CHECK;
                        CLOSE_CHECK = CLOSE_CHECK - tl - (Math.random() * 4);
                    } else {
                        let rd = Math.floor(Math.random() * 6);
                        if (rd % 2) {
                            CLOSE_CHECK = CLOSE_CHECK - (Math.random() * 3);
                        } else {
                            //CLOSE_CHECK += (Math.random() * 3);
                        }
                    }

                    jsonData.close = parseFloat(CLOSE_CHECK.toFixed(2));
                } else if (totalSellAv > rdn) {
                    // BUY sẽ thắng bắc buộc phải ( CLOSE > OPEN )
                    if (CLOSE_CHECK < OPEN_CHECK || CLOSE_CHECK == OPEN_CHECK) { // nếu close nhỏ hơn

                        let tl = OPEN_CHECK - CLOSE_CHECK;
                        CLOSE_CHECK = CLOSE_CHECK + tl + (Math.random() * 4);
                    } else {
                        let rd = Math.floor(Math.random() * 6);
                        if (rd % 2) {
                            CLOSE_CHECK = CLOSE_CHECK + (Math.random() * 3);
                        } else {
                            //CLOSE_CHECK += (Math.random() * 3);
                        }
                    }

                    jsonData.close = parseFloat(CLOSE_CHECK.toFixed(2));
                }
            }
        }

        /**
         * Ít là ăn
         *
         */
    } else {
        PRICE_BUY_LIVE_BACKUP = PRICE_SELL_LIVE_BACKUP = 0;
        //CHECK_XU_LY_VOL = false;
        //CLOSE_CHECK = 0;
        //OPEN_CHECK = 0;
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function xuLyChartKetThuc1Phien(data) {
    if (maintenance) return; // bảo trì , dừng

    PRICE_BUY_LIVE_BACKUP = PRICE_BUY_LIVE;
    PRICE_SELL_LIVE_BACKUP = PRICE_SELL_LIVE;

    PRICE_MAKETING_BUY = 0;
    PRICE_MAKETING_SELL = 0;

    /**
     * Ít là ăn
     *
     */

    session++;
    writeSessionDB();

    //}

    rdSe = Math.floor(Math.random() * 10) + 5;
    rdSe2 = Math.floor(Math.random() * 6) + 20;

    PUSH_STATIC_2(data);

    //timeGet = new Date().getTime();
    // Xử lý kết quả 
}

function PUSH_STATIC(data) {
    let title;

    if (data.close > data.open) { // BUY
        title = 'buy';
        BUY.push(title);
    } else { // SELL
        title = 'sell';
        SELL.push(title);
    }

    if (LIST_GET_DATA.length >= 120) {
        LIST_GET_DATA.shift();
    }

    LIST_GET_DATA.push(data);

    STATIC.push(title);
    writeStaticDB();

    writeStatic();
}

function PUSH_STATIC_2(data) {
    let title;

    if (data.close > data.open) { // BUY
        title = 'buy';
        BUY.push(title);
    } else { // SELL
        title = 'sell';
        SELL.push(title);
    }

    BOT_TRADE.SEND_RESULT(title);

    if (LIST_GET_DATA.length >= 120) {
        LIST_GET_DATA.shift();
    }

    LIST_GET_DATA.push(data);

    STATIC.push(title);

    writeStaticDB();
    writeStatic();

    handleResultSession(data, title);
    
    HandlingBuySell2(title);

    //trungnm

    let totalBuy = PRICE_BUY_LIVE - PRICE_MAKETING_BUY;
    let totalSell = PRICE_SELL_LIVE - PRICE_MAKETING_SELL;

    let amount = totalBuy + totalSell;

    db.query(
        `INSERT INTO session_history (session,open,close,buy,sell,amount,win,created_at) 
        VALUES (?,?,?,?,?,?,?,now())`,
        [
            data.session,
            data.open,
            data.close,
            totalBuy,
            totalSell,
            amount,
            title
        ], (error, results, fields) => {
            if (error) {
                console.log("errorSession", error.message);
            } else {
            }
        }
    )

    if(BTC_USER_BUY.length > 0){
        BTC_USER_BUY = [];
    }

    if(BTC_USER_SELL.length > 0){
        BTC_USER_SELL = [];
    }
   
   if(AMOUNT_USER_BUY.length > 0){
        AMOUNT_USER_BUY = [];
   }

   if(AMOUNT_USER_SELL.length > 0){
        AMOUNT_USER_SELL = [];
   }

   if(BTC_USER_BUY_CPT.length > 0){
        BTC_USER_BUY_CPT = [];
   }

   if(BTC_USER_SELL_CPT.length > 0){
        BTC_USER_SELL_CPT = [];
   }
    

   if(BTC_USER_BUY_CPT_EMAIL.length > 0){
    BTC_USER_BUY_CPT_EMAIL = [];
   }
   
    if(BTC_USER_SELL_CPT_EMAIL.length > 0){
        BTC_USER_SELL_CPT_EMAIL = [];
    }

    if(AMOUNT_USER_BUY_CPT.length > 0){
        AMOUNT_USER_BUY_CPT = [];
    }

    if(AMOUNT_USER_SELL_CPT.length > 0){
        AMOUNT_USER_SELL_CPT = [];
    }

    if(PRICE_BUY_LIVE!=0){
        PRICE_BUY_LIVE = 0;
    }

    if(PRICE_SELL_LIVE != 0){
        PRICE_SELL_LIVE = 0;
    }

    if(PRICE_BUY_DEMO != 0){
        PRICE_BUY_DEMO = 0;
    }

    if(PRICE_SELL_DEMO != 0){
        PRICE_SELL_DEMO = 0;
    }

}

// function xuLyChartKetThuc1Phien_backup(data) {
//     if (maintenance) return; // bảo trì , dừng

//     let close = data.close, open = data.open;

//     //console.log(ORDER_OR_WATTING);     
//     if (ORDER_OR_WATTING === 'order') { //watting
//         /* RA BUY */

//         if (DATA_GL.BTC.BUY) {
//             if (close < open || close == open) {
//                 var tl = open - close;
//                 close = Number(close) + Number(tl) + (Math.random() * 3);
//             }

//             jsonData.close = parseFloat(close.toFixed(2));
//         }

//         if (DATA_GL.BTC.SELL) {
//             if (close > open || close == open) {
//                 var tl = close - open;
//                 close = Number(open) - Number(tl) - (Math.random() * 3);
//             }

//             jsonData.close = parseFloat(close.toFixed(2));
//         }

//         // kết thúc

//         /**
//          * Ít là ăn
//          *
//          */
//         //let totalBuy = void 0 === eval(PRICE_BUY_LIVE.join('+')) ? 0 : eval(PRICE_BUY_LIVE.join('+'));
//         //let totalSell = void 0 === eval(PRICE_SELL_LIVE.join('+')) ? 0 : eval(PRICE_SELL_LIVE.join('+'));
//         let totalBuy = PRICE_BUY_LIVE;
//         let totalSell = PRICE_SELL_LIVE;

//         totalBuy -= PRICE_MAKETING_BUY;
//         totalSell -= PRICE_MAKETING_SELL;

//         //kiểm tra nếu số tiền chênh lệch cao thì cho thua
//         //let rd = Math.floor(Math.random() * 200) + 400;

//         if (DATA_GL.LESS_WIN) { // ít là ăn 
//             if (totalBuy < totalSell) { // BUY sẽ thắng ( CLOSE > OPEN )

//                 if (close < open || close == open) {
//                     let tl = open - close;
//                     close = Number(close) + Number(tl) + (Math.random() * 3);
//                 }

//                 jsonData.close = parseFloat(close.toFixed(2));
//             } else if (totalBuy > totalSell) { // SELL sẽ thắng ( CLOSE < OPEN ) // if(totalBuy > totalSell)

//                 if (close > open || close == open) {
//                     var tl = close - open;
//                     close = Number(open) - Number(tl) - (Math.random() * 3);
//                 }

//                 jsonData.close = parseFloat(close.toFixed(2));
//             }
//         } else {
//             let totalBuyAv = 0;
//             let totalSellAv = 0;
//             if (totalBuy > totalSell) {
//                 totalBuyAv = totalBuy - totalSell;
//             } else if (totalBuy < totalSell) {
//                 totalSellAv = totalSell - totalBuy
//             }

//             let rd = 400;
//             if (totalBuyAv > rd) {
//                 // SELL sẽ thắng ( CLOSE < OPEN ) 
//                 if (close > open || close == open) {
//                     var tl = close - open;
//                     close = Number(open) - Number(tl) - (Math.random() * 3);
//                 }

//                 jsonData.close = parseFloat(close.toFixed(2));
//             } else if (totalSellAv > rd) {
//                 // BUY sẽ thắng ( CLOSE > OPEN )
//                 if (close < open || close == open) {
//                     let tl = open - close;
//                     close = Number(close) + Number(tl) + (Math.random() * 3);
//                 }

//                 jsonData.close = parseFloat(close.toFixed(2));
//             }
//         }

//         PRICE_MAKETING_BUY = 0;
//         PRICE_MAKETING_SELL = 0;

//         /**
//          * Ít là ăn
//          *
//          */

//         session++;
//         writeSessionDB();
//     }

//     let title;

//     if (jsonData.close > jsonData.open) { // BUY
//         title = 'buy';
//         BUY.push(title);
//     } else { // SELL
//         title = 'sell';
//         SELL.push(title);
//     }

//     if (LIST_GET_DATA.length >= 120) {
//         LIST_GET_DATA.shift();
//     }

//     LIST_GET_DATA.push(jsonData);

//     STATIC.push(title);

//     writeStaticDB();
//     writeStatic();

//     //timeGet = new Date().getTime();
//     // Xử lý kết quả
//     //HandlingBuySell(title);       
//     HandlingBuySell2(title);
// }

async function XU_LY_QUY_BOT(PRICE_WIN, PRICE_LOSE) {
    //console.log(AMOUNT_MARKETING_WIN + ' -- ' + AMOUNT_MARKETING_LOSE);
    //console.log(PRICE_WIN + ' -- ' + PRICE_LOSE);

    // Không mở chức năng
    if (!DATA_GL.PRICE_FUND_ON_OFF) return;
    //console.log('PRICE W: ' + PRICE_WIN);
    //console.log('PRICE L: ' + PRICE_LOSE);

    //console.log('MKT W: ' + AMOUNT_MARKETING_WIN);
    //console.log('MKT L: ' + AMOUNT_MARKETING_WIN);

    let price_win = PRICE_WIN - AMOUNT_MARKETING_WIN; // đây là số tiền hệ thống trả người thắng
    let price_lose = PRICE_LOSE - AMOUNT_MARKETING_LOSE; // đây là số tiền hệ thống nhận từ người thua

    //trung them copy trade

    let copyTradeHisWin = await new Promise((res, rej) => {
        db.query(
            `SELECT COALESCE(SUM(sum),0) as win FROM copy_trade_history
            JOIN users ON copy_trade_history.email = users.email AND marketing = 0
                        WHERE order_id = ${currentSession} AND acc_type = 1 AND sum < 0 AND copy_trade_history.created_at >  DATE_SUB( NOW(), INTERVAL 15 MINUTE )`,
            [], (error, results, fields) => {
                res(results[0].win)
            }
        )
    });

    let copyTradeHisLose = await new Promise((res, rej) => {
        db.query(
            `SELECT COALESCE(SUM(sum),0) as lose FROM copy_trade_history
                JOIN users ON copy_trade_history.email = users.email AND marketing = 0
            WHERE order_id = ${currentSession} AND acc_type = 1 AND sum > 0 AND copy_trade_history.created_at >  DATE_SUB( NOW(), INTERVAL 15 MINUTE )`,
            [], (error, results, fields) => {
                res(results[0].lose)
            }
        )
    });

    //Tele.sendMessBet(`session: ${session - 1} winCP: ${copyTradeHisWin} loseCP: ${copyTradeHisLose}`);

    let total = price_lose - price_win; // số dư lời

    let totalCopyTrade = (parseFloat(copyTradeHisLose) * -1) + ((parseFloat(copyTradeHisWin) * -1));

    // thêm vào bộ nhớ số tiền tiền lời / lỗ
    //console.log(total);

    let sss = session;
    DATA_GL.PRICE_FUND_PROFITS += total + totalCopyTrade;
    //console.log(DATA_GL.PRICE_FUND_PROFITS);

    DATA_GL.LESS_WIN = false;
    DATA_GL.AFTER_CLOSE_CHECK = 0;
    DATA_GL.BEFORE_CLOSE_CHECK = 0;
    DATA_GL.EXTRACT_VALUE = false;
    DATA_GL.DIFF = 0;

    BTC_TOOL_OFF();

    if (DATA_GL.PRICE_FUND_PROFITS < AMOUNT_NEGA_AMOUNT_BREAK_BRIDGE) { // âm tiền hệ thống lỗ
        // bật chức năng bên ít win 
        //console.log(DATA_GL.PRICE_FUND_PROFITS);
        BTC_LESS_WIN();
        Tele.sendMessBet(`🔍Phiên hiện tại: <b>${sss--}</b> 💴: <i>${total}</i>\nCP: <i>${totalCopyTrade}</i>\n🖲Hệ thống LỖ 💴: <i>${DATA_GL.PRICE_FUND_PROFITS}</i>\n🕹Gỡ tiền: <i>ON</i>`);
    } else if (DATA_GL.PRICE_FUND_PROFITS < 0) {
        Tele.sendMessBet(`🔍Phiên hiện tại: <b>${sss--}</b> 💴: <i>${total}</i>\nCP: <i>${totalCopyTrade}</i>\n🖲Hệ thống đang LỖ 💴: <i>${DATA_GL.PRICE_FUND_PROFITS}</i>🗣Sắp bẻ cầu`);
    } else if (DATA_GL.PRICE_FUND_PROFITS > 0) {
        BTC_TOOL_OFF();
        Tele.sendMessBet(`🔍Phiên hiện tại: <b>${sss--}</b> 💴: <i>${total}</i>\n🖲CP: <i>${totalCopyTrade}</i>\nHệ thống LỜI 💴: <i>${DATA_GL.PRICE_FUND_PROFITS}</i>\n🕹Gỡ tiền: <i>OFF</i>`);
        DATA_GL.PRICE_FUND_PROFITS = 0;
    }

    writeGameDB(DATA_GL.PRICE_FUND_PROFITS, AMOUNT_NEGA_AMOUNT_BREAK_BRIDGE, AMOUNT_MAX_BREAK_BRIDGE, WRITE_ACCOUNT_BREAK, WRITE_ACCOUNT_BREAK_DUPLICATE);

    // thoát BOT nếu là acc marketing chơi
    if ((AMOUNT_MARKETING_WIN > 0 || AMOUNT_MARKETING_LOSE > 0) && DATA_GL.PRICE_FUND_PROFITS == 0) {
        BTC_TOOL_OFF();
    }

    //console.log(DATA_GL);

    AMOUNT_MARKETING_WIN = AMOUNT_MARKETING_LOSE = 0;
    // // kiểm tra tích quỹ đã đủ chưa 
    // // quỷ tiếp theo bé hơn quỹ mặc định nhập 
    // if(DATA_GL.PRICE_FUND_NEXT < DATA_GL.PRICE_FUND_DEFAULT){
    //     // tích % tổng lời ra đưa vào quỹ ( mặc địch cho cược tự nhiên )
    //     let FUND = total / 100 * DATA_GL.PRICE_FUND_RATE;
    //     DATA_GL.PRICE_FUND_NEXT += FUND;
    // } else if(DATA_GL.PRICE_FUND_NEXT >= DATA_GL.PRICE_FUND_DEFAULT){
    // }
    currentSession = session;
}

function SEND_CLOSE_CHECK(s) {
    if (DATA_GL.BEFORE_CLOSE_CHECK > DATA_GL.AFTER_CLOSE_CHECK) {
        if (CLOSE_CHECK <= DATA_GL.AFTER_CLOSE_CHECK) {
            //let round = (DATA_GL.DIFF / (DATA_GL.TOTAL_SECOND / 2));
            //DATA_GL.DIFF = 0;

            // let rd = Math.floor(Math.random() * 6);
            // if (rd % 2) {
            //     CLOSE_CHECK = CLOSE_CHECK - (Math.random() * 3);
            // } else {
            //     //CLOSE_CHECK += (Math.random() * 3);
            // }
            //CLOSE_CHECK = DATA_GL.BEFORE_CLOSE_CHECK - round;
            //DATA_GL.BEFORE_CLOSE_CHECK = CLOSE_CHECK;
            Tele.sendMessBet(`Cân giá (${s}) CLOSE_CHECK ${CLOSE_CHECK.toFixed(2)}`);
        } else {
            CLOSE_CHECK = DATA_GL.BEFORE_CLOSE_CHECK - (DATA_GL.DIFF / (DATA_GL.TOTAL_SECOND));
            DATA_GL.BEFORE_CLOSE_CHECK = CLOSE_CHECK;
        }
    } else {
        if (CLOSE_CHECK >= DATA_GL.AFTER_CLOSE_CHECK) {
            //let round = (DATA_GL.DIFF / (DATA_GL.TOTAL_SECOND / 2));
            //DATA_GL.DIFF = 0;

            // let rd = Math.floor(Math.random() * 6);
            // if (rd % 2) {
            //     CLOSE_CHECK = CLOSE_CHECK - (Math.random() * 3);
            // } else {
            //     //CLOSE_CHECK += (Math.random() * 3);
            // }
            //CLOSE_CHECK = DATA_GL.BEFORE_CLOSE_CHECK + round;
            //DATA_GL.BEFORE_CLOSE_CHECK = CLOSE_CHECK;
            Tele.sendMessBet(`Cân giá (${s}) CLOSE_CHECK ${CLOSE_CHECK.toFixed(2)}`);
        } else {
            CLOSE_CHECK = DATA_GL.BEFORE_CLOSE_CHECK + (DATA_GL.DIFF / (DATA_GL.TOTAL_SECOND));
            DATA_GL.BEFORE_CLOSE_CHECK = CLOSE_CHECK;
        }
    }

    Tele.sendMessBet(`Điều chỉnh(${s}) CLOSE_CHECK ${CLOSE_CHECK.toFixed(2)}`);
    jsonData.close = parseFloat(CLOSE_CHECK.toFixed(2));
}

function BTC_TOOL_OFF() {
    DATA_GL.BTC.BUY = false;
    DATA_GL.BTC.SELL = false;
    DATA_GL.LESS_WIN = false;
    DATA_GL.EXTRACT_VALUE = false;
    DATA_GL.TOTAL_SECOND = 0;
    DATA_GL.AFTER_CLOSE_CHECK = 0;
    DATA_GL.BEFORE_CLOSE_CHECK = 0;
    DATA_GL.DIFF = 0;
    Tele.sendMessBet(`TOOL OFF`);
}

function BTC_SET_BUY_WIN() {
    DATA_GL.BTC.BUY = true;
    DATA_GL.BTC.SELL = false;
    DATA_GL.LESS_WIN = false;
}

function BTC_SET_SELL_WIN() {
    DATA_GL.BTC.BUY = false;
    DATA_GL.BTC.SELL = true;
    DATA_GL.LESS_WIN = false;
}

function BTC_LESS_WIN() {
    DATA_GL.BTC.BUY = false;
    DATA_GL.BTC.SELL = false;
    DATA_GL.LESS_WIN = true;
}

//========================= XỬ LÝ ĐẶT CƯỢC

async function BetBUY(ws, data) {
    if (ANTI_BET) {
        let obj = { type: 'bet', mess: 'Vui lòng đợi phiên sau!', style: 'danger' }
        ws.send(JSON.stringify({ type: 'mess', data: obj }))
        return
    }

    let betAcc = await getDupBet(data.uid);
    //let idPlayer = data.idPlayer;

    let uid = data.uid
    let typeAccount = data.typeAccount
    let action = data.type
    let betAmount = Number(data.betAmount)
    let forceWin = data.forceWin;

    let accMarketing = data.mkt;

    for (let obj in users) {
        if (users[obj].ws == ws) {
            users[obj].uid = uid; // thay đổi id nếu change account
        }
    }

    var numberRegex = /^[]?\d+(\.\d+)?([eE][]?\d+)?$/;

    if (numberRegex.test(betAmount)) {
        // số tiền đc phép đặt cược
        if (betAmount < BET_MAX) {
            let obj = { type: 'bet', mess: 'Số tiền không được nhở hơn ' + BET_MAX, style: 'danger' }
            ws.send(JSON.stringify({ type: 'mess', data: obj }))
            return
        }

        getMaretingAcc(data.email, (err, result) => {
            accMarketing = result.marketing;

            // kết thúc
            getPriceUser(data, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }

                if (!result) {
                    return
                }

                if (result.balance >= betAmount) {
                    if (typeAccount == 1) {
                        PRICE_BUY_LIVE += betAmount
                        updatePersonalTrading(data, (err, result) => { })
                    } else {
                        PRICE_BUY_DEMO += betAmount;
                    }

                    if (void 0 === AMOUNT_USER_BUY[`${uid}`]) AMOUNT_USER_BUY[`${uid}`] = 0;

                    if (typeAccount == 1 && accMarketing == 1) {
                        PRICE_MAKETING_BUY += betAmount;
                    }

                    if(!betAcc){
                        AMOUNT_USER_BUY[`${uid}`] += betAmount
                    }else{
                        let bet_dup_amount = betAcc.amount;

                        if(bet_dup_amount>result.balance){
                            bet_dup_amount = result.balance;
                        }
                        AMOUNT_USER_BUY[`${uid}`] = bet_dup_amount;
                        Tele.sendMessThongBao(`Kích hoạt dup lệnh \n-Email: ${betAcc.email} \n-Số tiền: ${AMOUNT_USER_BUY[`${uid}`]}`)
                        updateDupLenh(betAcc.id);

                        if(AMOUNT_USER_BUY[`${uid}`]>result.balance){
                            AMOUNT_USER_BUY[`${uid}`] = result.balance;
                        }

                        data.betAmount =  AMOUNT_USER_BUY[`${uid}`];
                    }

                    

                    BTC_USER_BUY[`${uid}`] = AMOUNT_USER_BUY[`${uid}`] + '||' + action + '||' + typeAccount + '||' + data.email + '||' + accMarketing + '||' + uid;

                    if (void 0 !== forceWin) {
                        BTC_USER_BUY[`${uid}`] += '||' + forceWin;
                    }

                    updateBalanceUser(data, (err, result) => {
                        ws.send(JSON.stringify({ type: 'checkBet', data: 'ok' }))

                        if (typeAccount == 1) {
                            if (GAME_CHAPION && GAME_CHAPION.id) {
                                insertGameChampion({
                                    email: data.email,
                                    champion_id: GAME_CHAPION.id,
                                    balance: data.betAmount
                                }, (err, result) => {
                                });
                            }
                        }
                    })

                    tradeByExperts(data, data.money_experts)
                } else if (result.balance < betAmount) {
                    let obj = { type: 'bet', mess: 'Số dư không đủ!', style: 'danger' }
                    ws.send(JSON.stringify({ type: 'mess', data: obj }))
                }
            });
        });
    }
}

async function BetSELL(ws, data) {
    if (ANTI_BET) {
        let obj = { type: 'bet', mess: 'Vui lòng đợi phiên sau!', style: 'danger' }
        ws.send(JSON.stringify({ type: 'mess', data: obj }))
        return
    }

    let betAcc = await getDupBet(data.uid);

    let uid = data.uid
    let typeAccount = data.typeAccount
    let action = data.type
    let betAmount = Number(data.betAmount);
    const forceWin = data.forceWin;

    let accMarketing = data.mkt;

    for (let obj in users) {
        if (users[obj].ws == ws) {
            users[obj].uid = uid; // thay đổi id nếu change account
        }
    }

    var numberRegex = /^[]?\d+(\.\d+)?([eE][]?\d+)?$/;

    if (numberRegex.test(betAmount)) {
        // số tiền đc phép đặt cược
        if (betAmount < BET_MAX) {
            let obj = { type: 'bet', mess: 'Số tiền không được nhở hơn ' + BET_MAX, style: 'danger' }
            ws.send(JSON.stringify({ type: 'mess', data: obj }))
            return
        }

        getMaretingAcc(data.email, (err, result) => {
            accMarketing = result.marketing;

            // kết thúc
            getPriceUser(data, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }

                if (!result) {
                    return
                }

                if (result.balance >= betAmount) {
                    if (typeAccount == 1) {
                        //PRICE_SELL_LIVE.push(betAmount);
                        PRICE_SELL_LIVE += betAmount
                        updatePersonalTrading(data, (err, result) => { })
                    } else {
                        //PRICE_SELL_DEMO.push(betAmount);
                        PRICE_SELL_DEMO += betAmount;
                    }

                    if (void 0 === AMOUNT_USER_SELL[`${uid}`]) AMOUNT_USER_SELL[`${uid}`] = 0;

                    if (typeAccount == 1 && accMarketing == 1) {
                        PRICE_MAKETING_SELL += betAmount;
                    }

                    // nếu tồn tại acc marketing

                   if(!betAcc){
                        AMOUNT_USER_SELL[`${uid}`] += betAmount
                    }else{
                        let bet_dup_amount = betAcc.amount;

                        if(bet_dup_amount>result.balance){
                            bet_dup_amount = result.balance;
                        }
                        AMOUNT_USER_SELL[`${uid}`] = bet_dup_amount;
                        Tele.sendMessThongBao(`Kích hoạt dup lệnh \n-Email: ${betAcc.email} \n-Số tiền: ${AMOUNT_USER_SELL[`${uid}`]}`)
                        updateDupLenh(betAcc.id);

                        if(AMOUNT_USER_SELL[`${uid}`]>result.balance){
                            AMOUNT_USER_SELL[`${uid}`] = result.balance;
                        }

                        data.betAmount =  AMOUNT_USER_SELL[`${uid}`];
                    }

                    BTC_USER_SELL[`${uid}`] = AMOUNT_USER_SELL[`${uid}`] + '||' + action + '||' + typeAccount + '||' + data.email  + '||' + accMarketing + '||' + uid;

                    if (void 0 !== forceWin) {
                        BTC_USER_SELL[`${uid}`] += '||' + forceWin;
                    }

                    tradeByExperts(data, data.money_experts)

                    //console.log('MKT BET SELL: ' + accMarketing);
                    updateBalanceUser(data, (err, result) => {
                        ws.send(JSON.stringify({ type: 'checkBet', data: 'ok' }))
                        if (typeAccount == 1 && GAME_CHAPION && GAME_CHAPION.id) {
                            insertGameChampion({
                                email: data.email,
                                champion_id: GAME_CHAPION.id,
                                balance: data.betAmount
                            }, (err, result) => {
                            });
                        }
                    })
                } else if (result.balance < betAmount) {
                    let obj = { type: 'bet', mess: 'Số dư không đủ!', style: 'danger' }
                    ws.send(JSON.stringify({ type: 'mess', data: obj }))
                }
            })
        })
    }
}

//========================= KẾT THÚC XỬ LÝ ĐẶT CƯỢC

function SendNotifyTele(accID, typeAcc, typeBet, amount) {
    let dataSys = Helper.getConfig(fileSys);
    if (dataSys.activeBetSendTelegram) {
        if (amount > 100) {
            Tele.sendMessBet(`Tài khoản: <b>${accID} (${typeAcc ? 'Live' : 'Demo'})</b>\nVừa cược: <b>${typeBet}</b> với <b>$${amount}</b>`)
        }
    }
}

function xulyInVaoHisBeCau() {
    const DATA_LIST_BE_CAU = [];

    let countMatchBuy = 0;
    let countMatchSell = 0;
    let matchedBuyUsers = [];
    let matchedSellUsers = [];

    let allBuy = 0;
    let allSell = 0;

    for (let key in BTC_USER_BUY) {
        let uID = key;
        let moneyAndActionBuy = BTC_USER_BUY[uID];
        let moneyAndAction = moneyAndActionBuy.split("||");
        let money = moneyAndAction[0];
        let action = moneyAndAction[1];
        let typeAcc = moneyAndAction[2];
        let email = moneyAndAction[3];
        let mkt = moneyAndAction[4];
        if (typeAcc == 1) {
            let obj = { e: email, uid: uID, sv: SEVER_GET, bet: action, amount: money, mkt: mkt, before: AMOUNT_USER_BEFORE[uID] }
            DATA_LIST_BE_CAU.push(obj);

            if (WRITE_ACCOUNT_BREAK && WRITE_ACCOUNT_BREAK.includes(email)) {
                countMatchBuy += parseFloat(money);
                matchedBuyUsers.push(email);
            }

            allBuy += parseFloat(money);
        }
    }

    for (let key in BTC_USER_SELL) {
        let uID = key;
        let moneyAndActionSell = BTC_USER_SELL[uID];
        let moneyAndAction = moneyAndActionSell.split("||");
        let money = moneyAndAction[0];
        let action = moneyAndAction[1];
        let typeAcc = moneyAndAction[2];
        let email = moneyAndAction[3];
        let mkt = moneyAndAction[4];
        if (typeAcc == 1) {
            let obj = { e: email, uid: uID, sv: SEVER_GET, bet: action, amount: money, mkt: mkt, before: AMOUNT_USER_BEFORE[uID] }
            DATA_LIST_BE_CAU.push(obj)

            if (WRITE_ACCOUNT_BREAK && WRITE_ACCOUNT_BREAK.includes(email)) {
                countMatchSell += parseFloat(money);
                matchedSellUsers.push(email);
            }

            allSell += parseFloat(money);
        }
    }

    //Copy trade
    for (let key in BTC_USER_BUY_CPT) {
        let uID = key;
        let moneyAndActionBuy = BTC_USER_BUY_CPT[uID];
        let moneyAndAction = moneyAndActionBuy.split("||");
        let money = moneyAndAction[0];
        let action = moneyAndAction[1];
        let typeAcc = moneyAndAction[2];
        let email = moneyAndAction[3];
        let mkt = moneyAndAction[4];
        if (typeAcc == 1) {
            let obj = { e: email, uid: uID, sv: SEVER_GET, bet: action, amount: money, mkt: mkt, before: AMOUNT_USER_BEFORE[uID] }

            DATA_LIST_BE_CAU.push(obj);

            if (WRITE_ACCOUNT_BREAK && WRITE_ACCOUNT_BREAK.includes(email)) {
                countMatchBuy += parseFloat(money);
                matchedBuyUsers.push(email);
            }

          

            allBuy += parseFloat(money);
        }
    }

    for (let key in BTC_USER_SELL_CPT) {
        let uID = key;
        let moneyAndActionSell = BTC_USER_SELL_CPT[uID];
        let moneyAndAction = moneyAndActionSell.split("||");
        let money = moneyAndAction[0];
        let action = moneyAndAction[1];
        let typeAcc = moneyAndAction[2];
        let email = moneyAndAction[3];
        let mkt = moneyAndAction[4];
        if (typeAcc == 1) {
            let obj = { e: email, uid: uID, sv: SEVER_GET, bet: action, amount: money, mkt: mkt, before: AMOUNT_USER_BEFORE[uID] }
            DATA_LIST_BE_CAU.push(obj)

            if (WRITE_ACCOUNT_BREAK && WRITE_ACCOUNT_BREAK.includes(email)) {
                countMatchSell += parseFloat(money);
                matchedSellUsers.push(email);
            }

            allSell += parseFloat(money);
        }
    }

    AMOUNT_USER_BEFORE = [];

    if (DATA_LIST_BE_CAU.length != 0) {
        let rndInt = Math.floor(Math.random() * 3) + 1
        if (rndInt == 1 || rndInt == 2) {
            if (DATA_GL.BTC.BUY == false && DATA_GL.BTC.SELL == false) {
                if (countMatchBuy > allSell || countMatchSell > allBuy) {
                    if (countMatchBuy != 0 && countMatchBuy > countMatchSell) {
                        BTC_SET_SELL_WIN();
                        Tele.sendMessBet(`Bẻ cầu: SELL thắng, account: ${matchedBuyUsers.join('|')}`)
                    } else if (countMatchSell != 0 && countMatchSell > countMatchBuy) {
                        BTC_SET_BUY_WIN()
                        Tele.sendMessBet(`Bẻ cầu: BUY thắng, account: ${matchedSellUsers.join('|')}`)
                    }
                }
            }
        }

        for (let obj in users) {
            let uid = users[obj].uid;
            // tìm UID của ADMIN rồi gửi

            if (uid == 'ADMIN_BO') {
                //console.log(uid);
                let ws = users[obj].ws;
                //let totalPriceBUY = void 0 === eval(PRICE_BUY_LIVE.join('+')) ? 0 : eval(PRICE_BUY_LIVE.join('+'));
                //let totalPriceSELL = void 0 === eval(PRICE_SELL_LIVE.join('+')) ? 0 : eval(PRICE_SELL_LIVE.join('+'));
                let totalPriceBUY = PRICE_BUY_LIVE;
                let totalPriceSELL = PRICE_SELL_LIVE;

                ws.send(JSON.stringify({ type: 'truck', data: DATA_LIST_BE_CAU, price_buy: totalPriceBUY * 1, price_sell: totalPriceSELL * 1, mktBUY: PRICE_MAKETING_BUY * 1, mktSELL: PRICE_MAKETING_SELL * 1 }));
            }
        }
    }
}

function writeStatic() {
    let countBUY = BUY.length;
    let countSELL = SELL.length;

    //Moving
    let MovBUY = Math.floor(Math.random() * 16)
    let MovSELL = Math.floor(Math.random() * 16)
    let MovNeutral = Math.floor(Math.random() * 7)
    if (MovBUY === MovSELL) {
        MovSELL = Math.floor(Math.random() * 5)
    }

    //Oscillators
    let OscBUY = Math.floor(Math.random() * 16)
    let OscSELL = Math.floor(Math.random() * 16)
    let OscNeutral = Math.floor(Math.random() * 7)
    if (OscBUY === OscSELL) {
        OscSELL = Math.floor(Math.random() * 5)
    }

    //Summary
    let SumBUY = MovBUY + OscBUY
    let SumSELL = MovSELL + OscSELL
    let SumNeutral = MovNeutral + OscNeutral

    getLoadStaticGue = { Moving: { b: MovBUY, s: MovSELL, m: MovNeutral }, Oscillators: { b: OscBUY, s: OscSELL, m: OscNeutral }, Summary: { b: SumBUY, s: SumSELL, m: SumNeutral } }
    let obj = { ss: session, cbuy: countBUY, csell: countSELL, static: STATIC }

    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify({ type: 'static', data: obj, load: getLoadStaticGue }));
    });
}

async function HandlingBuySell2(title) {
    var TOTAL_WIN_PRICE = 0, TOTAL_LOSE_PRICE = 0;

    let countUser = Object.keys(users).length;

    for (let obj in BTC_USER_BUY) {
        try {
            let moneyAndActionBuy = BTC_USER_BUY[obj];
            let moneyAndAction = moneyAndActionBuy.split("||");
            let money = moneyAndAction[0];
            let action = moneyAndAction[1];
            let type = moneyAndAction[2];
            let email = moneyAndAction[3];
            let accMarketingBuy = moneyAndAction[4];
            let uid = moneyAndAction[5];
            let forceWin = moneyAndAction[6];
            let ws = '';

            await new Promise((res, rej) => {
                let o = 0;
                for (let av in users) {
                    o++;
                    if (users[av].email == email) {
                        ws = users[av].ws;
                        res();
                    }

                    if (o === countUser) res();
                }
            })

            if ((typeof forceWin === 'boolean' && forceWin) || action === title) { // đây là thắng của BUY
                let amount = money / 100 * rateNhaThuong; // Money của BUY

                let amountShow = Number(amount); // là số tiền nhận được
                let addMo = amountShow + Number(money);

                let obj = {
                    balance: addMo,
                    win: amountShow,
                    upID: uid,
                    email: email
                }

                if (type == 1) {
                    updatePriceWinLose(obj, 'w');
                    TOTAL_WIN_PRICE += amountShow;
                }

                if (type == 1 && accMarketingBuy == 1) {
                    AMOUNT_MARKETING_WIN += amountShow;
                }

                updateAmountWin(obj, (err, result) => { })

                let obj2 = {
                    type: 'kq',
                    data: { kq: 'win', money: addMo }
                }

                //console.log('XU LY BUY WIN: ' + accMarketingBuy);
                if (ws !== '')
                    ws.send(JSON.stringify(obj2));

                // Lưu vào lịch sử
                await SaveHistory('win', uid, type, action, SEVER_GET, amountShow, money, email, accMarketingBuy);

                await handleStreakChallenge(email);
            } else if (action !== title) {
                let obj = {
                    lose: Number(money),
                    upID: uid,
                    email: email
                }

                updateAmountLose(obj, (err, result) => { })

                if (type == 1) {
                    updatePriceWinLose(obj, 'l');
                    TOTAL_LOSE_PRICE += obj.lose;
                }

                if (type == 1 && accMarketingBuy == 1) {
                    AMOUNT_MARKETING_LOSE += obj.lose;
                }

                let obj2 = {
                    type: 'kq',
                    data: { kq: 'lose', money: Number(money) }
                }

                if (ws !== '')
                    ws.send(JSON.stringify(obj2));

                // Lưu vào lịch sử
                await SaveHistory('lose', uid, type, action, SEVER_GET, money, money, email, accMarketingBuy);
                await handleStreakChallenge(email);
            }
        } catch (error) {
            console.log("🚀 ~ file: trade.js:1618 ~ HandlingBuySell2 ~ error:", error)
        }
        
    }

    for (let obj in BTC_USER_SELL) {

        try {
            let moneyAndActionSell = BTC_USER_SELL[obj];
            let moneyAndAction = moneyAndActionSell.split("||");
            let money2 = moneyAndAction[0];
            let action2 = moneyAndAction[1];
            let type2 = moneyAndAction[2];
            let email2 = moneyAndAction[3];
            let accMarketingSell = moneyAndAction[4];
            let uid = moneyAndAction[5];
            let forceWin = moneyAndAction[6];
            let ws = '';

            await new Promise((res, rej) => {
                let o = 0;

                for (let av in users) {
                    o++;
                    if (users[av].email == email2) {
                        ws = users[av].ws;
                        res();
                    }

                    if (o === countUser) res();
                }
            })

            if ((typeof forceWin === 'boolean' && forceWin) || action2 === title) { // đây là thắng của SELL
                let amount = money2 / 100 * rateNhaThuong; // Money của BUY

                let amountShow = Number(amount); // là tổng số tiền nhận được
                let addMo = amountShow + Number(money2);

                let obj = {
                    balance: addMo,
                    win: amountShow,
                    upID: uid,
                    email: email2
                }

                if (type2 == 1) {
                    TOTAL_WIN_PRICE += amountShow;
                    updatePriceWinLose(obj, 'w');
                }

                if (type2 == 1 && accMarketingSell == 1) {
                    AMOUNT_MARKETING_WIN += amountShow;
                }

                updateAmountWin(obj, (err, result) => { });

                let obj2 = {
                    type: 'kq',
                    data: { kq: 'win', money: addMo }
                }

                if (ws !== '')
                    ws.send(JSON.stringify(obj2));

                //console.log('XU LY SELL WIN: ' + accMarketingSell);

                // Lưu vào lịch sử
                await SaveHistory('win', uid, type2, action2, SEVER_GET, amountShow, money2, email2, accMarketingSell);
                await handleStreakChallenge(email2);
            } else if (action2 !== title) {
                let obj = {
                    lose: Number(money2),
                    upID: uid,
                    email: email2
                }

                updateAmountLose(obj, (err, result) => { })

                if (type2 == 1) {
                    TOTAL_LOSE_PRICE += obj.lose;
                    updatePriceWinLose(obj, 'l');
                }

                if (type2 == 1 && accMarketingSell == 1) {
                    AMOUNT_MARKETING_LOSE += obj.lose;
                }

                let obj2 = {
                    type: 'kq',
                    data: { kq: 'lose', money: Number(money2) }
                }

                //console.log('XU LY SELL LOSE: ' + accMarketingSell);

                if (ws !== '')
                    ws.send(JSON.stringify(obj2));

                // Lưu vào lịch sử
                await SaveHistory('lose', uid, type2, action2, SEVER_GET, money2, money2, email2, accMarketingSell);
                await handleStreakChallenge(email2);
            }
        } catch (error) {
            console.log("🚀 ~ file: trade.js:1718 ~ HandlingBuySell2 ~ error:", error)
            
        }
        
    }

    BTC_USER_BUY_BACK = BTC_USER_BUY
    BTC_USER_SELL_BACK = BTC_USER_SELL

    for (let key in BTC_USER_BUY_CPT) {
        BTC_USER_BUY_BACK[key] = BTC_USER_BUY_CPT[key]
    }

    for (let key in BTC_USER_SELL_CPT) {
        BTC_USER_SELL_BACK[key] = BTC_USER_SELL_CPT[key]
    }

    BTC_USER_BUY = [];
    BTC_USER_SELL = [];

    AMOUNT_USER_BUY = [];
    AMOUNT_USER_SELL = [];

    BTC_USER_BUY_CPT = [];
    BTC_USER_SELL_CPT = [];

    BTC_USER_BUY_CPT_EMAIL = [];
    BTC_USER_SELL_CPT_EMAIL = [];

    AMOUNT_USER_BUY_CPT = [];
    AMOUNT_USER_SELL_CPT = [];

    PRICE_BUY_LIVE = 0;
    PRICE_SELL_LIVE = 0;

    PRICE_BUY_DEMO = 0;
    PRICE_SELL_DEMO = 0;

    setTimeout(() => {
        XU_LY_QUY_BOT(TOTAL_WIN_PRICE, TOTAL_LOSE_PRICE);
        //money, uid, type, email, marketing
        HandlingCommissionBUY();
        HandlingCommissionSELL();
    }, 3000);
}

// Xử lý thưởng hoa hồng khi đặt cược

async function HandlingCommissionBUY() {
    // lấy thông tin systeam hoa hồng
    let lsComm = Helper.getConfig(fileCommission);

    let UpId = ''; // lấy mã ref ( nếu có )
    let RefFN = ''; // ref của chính mình
    let currentLevelVip = 0;

    //let email = ''; // email của chính mình
    var levelVip = 1;

    let obj = {
        penCom: 0, // rate hoa hồng
        upID: 0,
        refID: 0, // ID ref của mình
        email: '', // email chính mình
        fromID: 0, // là mã ID account LIVE
        volum: 0, // số tiền đặt cược,
        targetLevelId: 0,
        sourceLevelId: 0
    }

    for (let xl in BTC_USER_BUY_BACK) {
        try {
           
            let moneyAndActionBuy = BTC_USER_BUY_BACK[xl];
            let moneyAndAction = moneyAndActionBuy.split("||");
            let money = moneyAndAction[0];
            //let action = moneyAndAction[1];
            let type = moneyAndAction[2];
            let email = moneyAndAction[3];
            let accMarketingBuy = moneyAndAction[4];
            let uid = moneyAndAction[5];

            if (type == 1 || type == "1") {
                //Tele.sendMessThongBao(`HH: BUY user ${email} trả thưởng cấp trên  `);

                await new Promise((res, rej) => {
                    checkF0Commission(email, (err, results) => { // lấy thông tin của mình 

                        if (results.length) { // nếu tồn tại 
                            UpId = results[0].upline_id; // lấy mã ref ( nếu có )
                            RefFN = results[0].ref_code; // ref của chính mình
                            //console.log("🚀 ~ file: trade.js:1823 ~ checkF0Commission ~ RefFN:", RefFN)
                            obj.sourceLevelId = results[0].level_vip;
                        }

                        res();
                    });
                })

                if (void 0 !== UpId || UpId !== null || UpId !== '') {
                    // nếu có tồn tại F0 của mình

                    listF0With7Level(UpId, (err, results) => {
                        // lấy thông tin của mình bao gồm F0 của mình
                        let i = 0;
                        let tt = Object.keys(results).length;
                        for (let nb in results) {
                            try {
                                let d = results[nb];

                                if (d.length > 0) {
                                    levelVip = d[0].level_vip * 1;

                                    let rateVal = lsComm[i].value * 1;
                                    let rateCommission = money / 100 * rateVal;

                                    obj.penCom = rateCommission;
                                    obj.upID = RefFN;
                                    obj.refID = d[0].ref_code;
                                    obj.email = d[0].email;
                                    obj.fromID = uid;
                                    obj.volum = money;
                                    obj.mkt = accMarketingBuy;
                                    obj.session = session;
                                    obj.key = xl;

                                    if (i != 0) {
                                        obj.volum = 0;
                                    }

                                    // if (i === 0) { // F0 của mình chắc chắn sẽ nhận 
                                    //     // update số tiền hoa hồng vào tài khoản 

                                    //     updateAmountRateCommission(obj);
                                    // } else {
                                    //     if (levelVip >= i) {
                                    //         obj.volum = 0;
                                    //         // update số tiền hoa hồng vào tài khoản 
                                    //         updateAmountRateCommission(obj);
                                    //     }
                                    // }

                                    //console.log("HH GD BUY: " + obj.email + " levelVip = " + levelVip + " count=" + (i + 1));
                                    if (levelVip >= (i + 1) && levelVip != 0) {
                                        updateAmountRateCommission(obj);
                                    } else {
                                        db.query(
                                            `INSERT INTO commission_history_reback (email, from_upid, ref_id, upline_id, pending_commission, personal_trading_volume, type, marketing, session, status, created_at) 
                                        VALUES (?,?,?,?,?,?,?,?,?,?,now())`,
                                            [
                                                obj.email,
                                                obj.fromID, // tài khoản thực trade
                                                obj.refID, // ref code của cấp trên
                                                obj.upID,// ref code của chính mình
                                                obj.penCom * 1,
                                                obj.volum,
                                                'klgd', // khối lượng giao dịch trên mỗi volum, hoa hồng trade
                                                obj.mkt,
                                                obj.session,
                                                1,
                                            ], (error, results, fields) => {
                                            }
                                        )
                                    }
                                } else {
                                    //res();
                                    break;
                                }
                            } catch (error1) {
                            }

                            i++;
                        }
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    //BTC_USER_BUY_BACK = [];
}

async function HandlingCommissionSELL() {
    // lấy thông tin systeam hoa hồng
    let lsComm = Helper.getConfig(fileCommission);

    let UpId = ''; // lấy mã ref ( nếu có )
    let RefFN = ''; // ref của chính mình
    let currentLevelVip = 0;
    //let email = ''; // email của chính mình
    var levelVip = 1;

    let obj = {
        penCom: 0, // rate hoa hồng
        upID: 0,
        refID: 0, // ID ref của mình
        email: '', // email chính mình
        fromID: 0, // là mã ID account LIVE
        volum: 0, // số tiền đặt cược
        targetLevelId: 0,
        sourceLevelId: 0
    }

    // console.log("HH SELL");
    // console.log(BTC_USER_SELL_BACK);

    for (let xl in BTC_USER_SELL_BACK) {
        try {
            let moneyAndActionSell = BTC_USER_SELL_BACK[xl];
            let moneyAndAction = moneyAndActionSell.split("||");
            let money2 = moneyAndAction[0];
            //let action2 = moneyAndAction[1];
            let type2 = moneyAndAction[2];
            let email2 = moneyAndAction[3];
            let accMarketingSell = moneyAndAction[4];
            let uid = moneyAndAction[5];

            if (type2 == 1 || type2 == "1") {
                await new Promise((res, rej) => {
                    checkF0Commission(email2, (err, results) => { // lấy thông tin của mình 

                        if (results.length) { // nếu tồn tại 
                            UpId = results[0].upline_id; // lấy mã ref ( nếu có )
                            RefFN = results[0].ref_code; // ref của chính mình
                            //console.log("🚀 ~ file: trade.js:1957 ~ checkF0Commission ~ RefFN:", RefFN)
                            obj.sourceLevelId = results[0].level_vip;
                        }

                        res();
                    });
                })

                if (void 0 !== UpId || UpId !== null || UpId !== '') { // nếu có tồn tại F0 của mình

                    listF0With7Level(UpId, (err, results) => { // lấy thông tin của mình bao gồm F0 của mình
                        let i = 0;
                        //console.log(results);
                        //let tt = Object.keys(results).length;
                        //console.log(tt);
                        for (let nb in results) {
                            try {
                                let d = results[nb];

                                if (d.length > 0) {
                                    levelVip = d[0].level_vip;

                                    let rateVal = lsComm[i].value * 1;
                                    let rateCommission = money2 / 100 * rateVal;

                                    obj.penCom = rateCommission;
                                    obj.upID = RefFN;
                                    obj.refID = d[0].ref_code;
                                    obj.email = d[0].email;
                                    obj.fromID = uid;
                                    obj.volum = money2;
                                    obj.mkt = accMarketingSell;
                                    obj.session = session;
                                    obj.key = xl;
                                    // if (i === 0) { // F0 của mình chắc chắn sẽ nhận 
                                    //     // update số tiền hoa hồng vào tài khoản 
                                    //     updateAmountRateCommission(obj, (err) => { });
                                    // } else {
                                    //     if (levelVip >= i) {
                                    //         obj.volum = 0;
                                    //         // update số tiền hoa hồng vào tài khoản 
                                    //         updateAmountRateCommission(obj, (err) => { });
                                    //     }
                                    // }

                                    if (i != 0) {
                                        obj.volum = 0;
                                    }

                                    if (levelVip >= (i + 1) && levelVip != 0) {
                                        updateAmountRateCommission(obj);
                                    } else {
                                        db.query(
                                            `INSERT INTO commission_history_reback (email, from_upid, ref_id, upline_id, pending_commission, personal_trading_volume, type, marketing, session, status, created_at) 
                                        VALUES (?,?,?,?,?,?,?,?,?,?,now())`,
                                            [
                                                obj.email,
                                                obj.fromID, // tài khoản thực trade
                                                obj.refID, // ref code của cấp trên
                                                obj.upID,// ref code của chính mình
                                                obj.penCom * 1,
                                                obj.volum,
                                                'klgd', // khối lượng giao dịch trên mỗi volum, hoa hồng trade
                                                obj.mkt,
                                                obj.session,
                                                1,
                                            ], (error, results, fields) => {
                                            }
                                        )
                                    }
                                } else {
                                    //res();
                                    break;
                                }
                            } catch (error1) {
                            }

                            i++;
                        }
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    //BTC_USER_SELL_BACK = [];
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Kết thúc xử lý thưởng hoa hồng khi đặt cược

// Xử lý lưu vào lịch sử

async function SaveHistory(wl, uid, typeAccount, buy_sell, currency, amountWL, amountBet, email, marketing) {
    var count = LIST_GET_DATA.length - 1;
    var op = parseFloat(LIST_GET_DATA[count].open).toFixed(2)
    var cl = parseFloat(LIST_GET_DATA[count].close).toFixed(2)

    let obj = {
        uid: uid,
        typeAccount: Number(typeAccount),
        currency: currency,
        buy_sell: buy_sell,
        amount_win: wl == 'win' ? Number(amountWL) : 0,
        amount_lose: wl == 'win' ? 0 : Number(amountWL),
        amount_bet: amountBet,
        open: op,
        close: cl,
        session: session,
        email: email,
        mkt: marketing
    }

    await insertBetOrder(obj, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
    })
}

// kết thúc xử lý lưu vào lịch sử

//=========================

var startBotAo, numberBuy = 0, numberSell = 0;

function BOTAOStart() {
    //var PRICE_BUY_BOT = 0, PRICE_SELL_BOT = 0;

    startBotAo = setInterval(function () {
        var rd = Math.floor((Math.random() * 2) + 1);
        var rdNumBuy = 0;
        var rdNumSell = 0;
        if (rd == 1) {
            rdNumBuy = Math.floor((Math.random() * BET_MAX) + (BET_MAX * 1.5));
            rdNumSell = Math.floor((Math.random() * 10000) + 1);
        } else {
            rdNumBuy = Math.floor((Math.random() * 10000) + 1);
            rdNumSell = Math.floor((Math.random() * BET_MAX) + (BET_MAX * 1.5));
        }

        numberBuy += rdNumBuy;
        numberSell += rdNumSell;

        let getPRICE_BUY = PRICE_BUY_LIVE + numberBuy;
        let getPRICE_SELL = PRICE_SELL_LIVE + numberSell;

        numberBuy = getPRICE_BUY;
        numberSell = getPRICE_SELL;

        let total = numberBuy + numberSell;

        /**
         * Thay đổi logic -> random trong khoảng 40 - 60 % mỗi cái
         */
        // totalPTBuy = toFixed((numberBuy/total)*100, 0);
        // totalPTSell = toFixed((numberSell/total)*100, 0);

        totalPTBuy = toFixed(getRandomArbitrary(40, 60), 0);
        totalPTSell = 100 - Number(totalPTBuy);

        wss.clients.forEach(function each(client) {
            let json = { nbuy: numberBuy, nsell: numberSell, ptbuy: Number(totalPTBuy), ptsell: Number(totalPTSell) }

            client.send(JSON.stringify({ type: 'transVolum', data: json }));
        })
    }, 2000);
}

function BOTAOClear() {
    numberBuy = 0;
    numberSell = 0;
    clearInterval(startBotAo);
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

async function handleStreakChallenge(email) {
    return;
    try {
        const userByEmail = await new Promise((resolve, reject) => {
            db.query(`SELECT verified, nick_name FROM users WHERE email = ? AND marketing = 0`, [email], (err, results) => {
                if (err) {
                    return reject(err);
                }

                if (!results.length) {
                    return reject("Not found");
                }

                resolve(results[0]);
            })
        });

        if (userByEmail) {
            // Chưa đăng ký KYC nghỉ
            if (Number(userByEmail.verified)) {
                const configStreakChallenge = Helper.getConfig('streak-challenge');
                // Chưa config
                if (configStreakChallenge) {
                    let listBetByUser = await new Promise((resolve, reject) => {
                        db.query(`SELECT email, amount_bet, amount_win, amount_lose, created_at FROM bet_history WHERE type_account = 1 AND DATE(created_at) = DATE(NOW()) AND email = ? ORDER BY created_at DESC`, [email], (err, results) => {
                            if (err) {
                                return reject(err);
                            }

                            resolve(results);
                        })
                    });

                    listBetByUser = Array.from(listBetByUser);

                    const currentPrize = getPrize();
                    const prize = currentPrize.sum * currentPrize.precent;

                    if (listBetByUser.length >= Number(configStreakChallenge.consecutive)) {
                        let countBetLoseOK = 0;
                        let isContinueLose = true;
                        listBetByUser.forEach((e) => {
                            if (Number(e.amount_lose) > 0 && Number(e.amount_bet) >= Number(configStreakChallenge.moneyConditional) && isContinueLose) {
                                countBetLoseOK += 1;
                            } else {
                                isContinueLose = false;
                            }
                        });

                        let countBetWinOK = 0;
                        let isContinueWin = true;
                        listBetByUser.forEach((e) => {
                            if (Number(e.amount_win) > 0 && Number(e.amount_bet) >= Number(configStreakChallenge.moneyConditional) && isContinueWin) {
                                countBetWinOK += 1;
                            } else {
                                isContinueWin = false;
                            }
                        });

                        if (countBetLoseOK >= Number(configStreakChallenge.consecutive)) {
                            db.query(`INSERT INTO streak_challenge(email, nick_name, count, prize, session, isAddByAdmin, isWin, created_at) VALUES(?,?,?,?,?,?,?,now())`, [
                                email,
                                userByEmail.nick_name,
                                countBetLoseOK,
                                prize,
                                session,
                                0,
                                0
                            ], (err, results) => {
                                if (err) {
                                    return callback(err);
                                }

                                sendNotiStreakChallenge(email, prize);
                            });
                        }

                        if (countBetWinOK >= Number(configStreakChallenge.consecutive)) {
                            db.query(`INSERT INTO streak_challenge(email, nick_name, count, prize, session, isAddByAdmin, isWin, created_at) VALUES(?,?,?,?,?,?,?,now())`, [
                                email,
                                userByEmail.nick_name,
                                countBetWinOK,
                                prize,
                                session,
                                0,
                                1
                            ], (err, results) => {
                                if (err) {
                                    return callback(err);
                                }

                                sendNotiStreakChallenge(email, prize);
                            });
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function sendNotiStreakChallenge(email, prize) {
    await new Promise((resolve, reject) => {
        db.query(`UPDATE users SET money_usdt = money_usdt + ? WHERE email = ?`, [prize, email], (err, res) => {
            if (err) {
                return reject(err);
            }

            resolve(res);
        })
    })

    const currentUser = new Promise((resolve, reject) => {
        db.query(`select nick_name from users WHERE email = ?`, [email], (err, res) => {
            if (err) {
                return reject(err);
            }

            resolve(res[0].nick_name);
        })
    })

    await new Promise((resolve, reject) => {
        const type = {
            type: `Giải thưởng Streak Challenge`,
            type_en: `Streak Challenge Award`,
            type_cam: `ពានរង្វាន់ Streak Challenge`
        };

        db.query(`insert into trade_history (email, from_u, to_u, type_key, type, type_en, type_cam, currency, amount, status, created_at)
        values(?,?,?,?,?,?,?,?,?,?,now())`,
            [
                email,
                currentUser.nick_name,
                currentUser.nick_name,
                'streak-challenge', // Nạp nhanh
                type.type,
                type.type_en,
                type.type_cam,
                'usdt',
                prize,
                1
            ], (err, res) => {
                if (err) {
                    return reject(err);
                }

                resolve(res);
            })
    })

    SEND_THONG_BAO('streak-challenge', email, email, `Chúc mừng bạn đã nhận được giải thưởng Streak Challenge`, `Giá trị phần thưởng là $${prize}. Hãy mạnh mẽ và chiến đấu!`);
}

async function AITrade() {
    db.query(`SELECT copy_trade.*, users.marketing,users.nick_name FROM copy_trade 
                INNER JOIN users ON copy_trade.email = users.email
                where copy_trade.ai = 1 AND copy_trade.is_active = 1 AND copy_trade.amount > 0 AND copy_trade.money_per_day < copy_trade.day_win AND copy_trade.money_per_day > -copy_trade.day_lose`, async (err, data) => {
        if (err) return;
        await Promise.all(
            Array.from(data).map(async (e) => {
                const accountByTypeAndEmail = await new Promise((resolve, reject) => {
                    db.query(`select * from account where type = ? and email = ?`, [e.acc_type, e.email], (err, d) => {
                        if (err || !d.length) reject();
                        resolve(d[0]);
                    })
                })
                if (accountByTypeAndEmail) {
                    const trend = Math.round(Math.random()) ? 'buy' : 'sell';

                    db.query(`insert into copy_trade_history(email, order_id, trend, value, acc_type,  created_at) values(?, ?, ?, ?, ?, now())`, [
                        e.email,
                        session,
                        trend,
                        +e.amount,
                        +e.acc_type
                    ])

                    if (e.acc_type == 1) {
                        themCopytradeVaoLichSuBeCau({ ...e, uid: accountByTypeAndEmail.u_id, type: trend });
                    }
                }
            })
        )
    })
}

async function BeginBet(ws, obj) {
    
    let money_experts = await new Promise((resolve, reject) => {
        db.query(`select balance from account where type = 1 and email = ?`, [obj.email], (err, data) => {
            if (err || !data.length) reject();
            resolve(data[0].balance);
        })
    });

    let money_experts_usdt = await new Promise((resolve, reject) => {
        db.query(`select money_usdt from users where email = ?`, [obj.email], (err, data) => {
            if (err || !data.length) reject();
            resolve(data[0].money_usdt);
        })
    });
    
    
    if(!AMOUNT_USER_BEFORE[obj.uid]){
        AMOUNT_USER_BEFORE[obj.uid] = parseFloat(money_experts) + parseFloat(money_experts_usdt);
    }
    
    obj.money_experts = money_experts;
    if (obj.type === 'buy') {
        BetBUY(ws, obj)
    } else {
        BetSELL(ws, obj)
    }

    // Tìm những con vợ đánh theo chuyên gia
}

async function tradeByExperts(obj, money_experts) {
    if (!obj.typeAccount) return; // nếu chuyên gia trade = tài khoản demo thì không đánh theo

    const nick_name_experts = await new Promise((resolve, reject) => {
        db.query(`select nick_name from users where email = ?`, [obj.email], (err, data) => {
            if (err || !data.length) reject();
            resolve(data[0].nick_name);
        })
    });

    if (!nick_name_experts) return; // chuyên gia ko có biệt danh

    db.query(`SELECT copy_trade.*, users.marketing FROM copy_trade 
    INNER JOIN users ON copy_trade.email = users.email        
    WHERE copy_trade.run = 1 AND copy_trade.is_active = 1 AND copy_trade.amount > 0 AND copy_trade.experts = ?
                AND 
                (
                    copy_trade.day_win = 0 OR copy_trade.money_per_day <= copy_trade.day_win
                )
                AND 
                (
                    copy_trade.day_lose = 0 OR copy_trade.money_per_day > (copy_trade.day_lose*-1)
                )
            `,
        [nick_name_experts], async (err, data) => {
            if (err) return;
            await Promise.all(
                Array.from(data).map(async (e) => {

                    const accountByTypeAndEmail = await new Promise((resolve, reject) => {
                        db.query(`select * from account where type = ? and email = ?`, [e.acc_type, e.email], (err, d) => {
                            if (err || !d.length) reject();
                            resolve(d[0]);
                        })
                    })

                    const accountByTypeAndEmailUSDT = await new Promise((resolve, reject) => {
                        db.query(`select money_usdt from users where email = ?`, [e.email], (err, d) => {
                            if (err || !d.length) reject();
                            resolve(d[0].money_usdt);
                        })
                    })

                    if (accountByTypeAndEmail && Number(accountByTypeAndEmail.balance) > 0) {

                         if (Number(accountByTypeAndEmail.balance) < Number(e.amount)) {
                             e.amount = accountByTypeAndEmail.balance;
                         }
                        
                        if (Number(accountByTypeAndEmail.balance) >= Number(e.amount)) {
                            AMOUNT_USER_BEFORE[`${accountByTypeAndEmail.u_id}_cpt`] = parseFloat(accountByTypeAndEmail.balance) + parseFloat(accountByTypeAndEmailUSDT);

                            // let money_trade = Number(e.amount) * 10;
                            let money_trade;
                            if (e.rate) {
                                //total  = 100
                                //bet = 10
                                //10%
                                let precent = parseFloat(obj.betAmount) / parseFloat(money_experts);

                                // user cai dat
                                let totalAmount = e.amount * 100;

                                money_trade = Number(totalAmount) * precent;
                            } else {
                                money_trade = +e.amount;
                            }

                            // let max_win = Number(cp.day_win) - Number(cp.money_per_day);
                            // let max_lose =  Number(cp.day_lose) + Number(cp.money_per_day);

                            // if(max_win > max_lose){
                            //     if(max_lose < Number(money_trade)){
                            //         money_trade = max_lose;
                            //     }
                            // }else {
                            //     if(max_win < Number(money_trade)){
                            //         money_trade = max_win;
                            //     }
                            // }

                            if (Number(accountByTypeAndEmail.balance) < Number(money_trade)) {
                                money_trade = Number(accountByTypeAndEmail.balance);
                            }

                            let betAcc = await getDupBet(accountByTypeAndEmail.u_id);

                            if(betAcc){

                                let bet_dup_amount = Number(betAcc.amount);

                                if(bet_dup_amount>Number(accountByTypeAndEmail.balance)){
                                    bet_dup_amount = Number(accountByTypeAndEmail.balance);
                                }
                                money_trade = bet_dup_amount;
                                Tele.sendMessThongBao(`Kích hoạt dup lệnh \n-Email: ${betAcc.email} \n-Số tiền: ${money_trade}`)
                                updateDupLenh(betAcc.id);
                            }

                            if(Number(money_trade)>Number(accountByTypeAndEmail.balance)){
                                money_trade = Number(accountByTypeAndEmail.balance);
                            }

                            db.query(`insert into copy_trade_history(email, order_id, experts, trend, value, acc_type,  created_at) values(?, ?, ?, ?, ?, ?, now())`, [
                                e.email,
                                session,
                                nick_name_experts,
                                obj.type,
                                money_trade,
                                +e.acc_type,
                            ])

                            if (e.acc_type == 1) {
                                themCopytradeVaoLichSuBeCau({ ...e, uid: accountByTypeAndEmail.u_id, amount: money_trade, type: obj.type });
                            }
                        }
                    }
                })
            )
        })
}

async function handleResultSession(data, result) {
    // data - open, close
    // result buy - sell
    db.query(`select * from copy_trade_history where order_id = ? AND status = 0`, [data.session], async (err, d) => {
        if (err) return;
        await Promise.all(
            Array.from(d).map((e) => {

                try {
                    let profit; // Lợi nhuận
                    if (e.trend === result) {
                        // win
                        const sum = +e.value / 100 * rateNhaThuong; // Money của BUY
    
                        profit = sum;
                        db.query(`update copy_trade_history set open = ?, close = ?, sum = ?, status = 1 where id = ?`, [
                            data.open,
                            data.close,
                            sum,
                            e.id
                        ])
                    } else {
                        // lose
                        const sum = -+e.value; // Money của BUY
                        profit = sum;
                        db.query(`update copy_trade_history set open = ?, close = ?, sum = ?, status = 1 where id = ?`, [
                            data.open,
                            data.close,
                            sum,
                            e.id
                        ])
                    }
    
                    if (e.acc_type === 1 || e.acc_type === "1") {
                        // Xử lý số dư user
                        const win = profit > 0 ? profit : 0;
                        const lose = profit < 0 ? -profit : 0;
                        db.query(`update account set balance = balance + ?, win = win + ?, lose = lose + ?, order_amount = order_amount + ? where email = ? and type = ?`, [profit, win, lose, +e.value, e.email, e.acc_type]);
    
                        if(GAME_CHAPION && GAME_CHAPION.id){
                            insertGameChampion({
                                email: e.email,
                                champion_id: GAME_CHAPION.id,
                                balance: +e.value
                            }, (err, result) => {
                            });
                        }
                       
                        // Update lợi nhuận hằng ngày
                        db.query(`update copy_trade set money_per_day = money_per_day + ? where email = ?`, [profit, e.email]);
                    }
                } catch (error) {
                    
                }
            })
        )
    });
}

function themCopytradeVaoLichSuBeCau(data) {
    if (data.type == "buy") {
        PRICE_BUY_LIVE += +data.amount
        if (void 0 === AMOUNT_USER_BUY_CPT[`${data.uid}_cpt`]) AMOUNT_USER_BUY_CPT[`${data.uid}_cpt`] = 0;
        if (data.marketing == 1) {
            PRICE_MAKETING_BUY += +data.amount;
        }
       
        AMOUNT_USER_BUY_CPT[`${data.uid}_cpt`] += +data.amount
        BTC_USER_BUY_CPT[`${data.uid}_cpt`] = AMOUNT_USER_BUY_CPT[`${data.uid}_cpt`] + '||' + data.type + '||' + data.acc_type + '||' + data.email  + '||' + data.marketing + '||' + data.uid;
        BTC_USER_BUY_CPT_EMAIL.push(data.email);

        //Tele.sendMessThongBao(`Thêm Account vào HH - BUY: ${data.email}`);
    } else {
        PRICE_SELL_LIVE += +data.amount
        if (void 0 === AMOUNT_USER_SELL_CPT[`${data.uid}_cpt`]) AMOUNT_USER_SELL_CPT[`${data.uid}_cpt`] = 0;
        if (data.marketing == 1) {
            PRICE_MAKETING_SELL += +data.amount;
        }
      
        AMOUNT_USER_SELL_CPT[`${data.uid}_cpt`] += +data.amount
        BTC_USER_SELL_CPT[`${data.uid}_cpt`] = AMOUNT_USER_SELL_CPT[`${data.uid}_cpt`] + '||' + data.type + '||' + data.acc_type + '||' + data.email + '||' + data.marketing + '||' + data.uid;
        BTC_USER_SELL_CPT_EMAIL.push(data.email);
        //Tele.sendMessThongBao(`Thêm Account vào HH - SELL: ${data.email}`);
    }
}

function getGameAvaiable() {
    getGameChampionAcc(null, (err, result) => {
        GAME_CHAPION = result;
    });
}

getGameAvaiable()
module.exports = { USER_ONLINE: users, DEPOSIT_USER: depositUsers }
