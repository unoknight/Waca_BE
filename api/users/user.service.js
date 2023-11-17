//const e = require("cors");
const moment = require('moment-timezone');
const { mysql_real_escape_string } = require('../../helper/sqlFriend');
const db = require("./../../database");
const config = require('../../config');
const Helper = require("../../helpers");
var fileSys = config.PATH_SYS_CONFIG;
const fileCommissionVip = config.PATH_SYS_COMMISSION_VIP;
//const fs = require('fs');
const Web3 = require('web3');
const axios = require('axios');

var dataSys = Helper.getConfig(fileSys);
const Tele = require("../../auth/telegram_notify");
const { SEND_THONG_BAO, SEND_THONG_BAO_LANGS } = require("../../auth/notifi");
const { handleWallet,handleWalletAdmin,handleWalletAdminNoneFee } = require('../autoNapCoin');
const { USER_ONLINE, DEPOSIT_USER } = require('../../games/trade');

const createAddressBTC = `https://api.blockcypher.com/v1/btc/main/addrs?token=${dataSys.tokenBlockcypher}`;
// 2000 request 1 ngày eth / btc
//const web3 = new Web3(new Web3.providers.WebsocketProvider(`https://api.blockcypher.com/v1/eth/main/addrs?token=${dataSys.tokenBlockcypher}`))

// 100k request 1 ngày ETH
const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${dataSys.projectId}`));

function makeid(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }

    return result.join('');
}

Date.prototype.getWeek = function () {
    var target = new Date(this.valueOf());
    var dayNr = (this.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    var firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() != 4) {
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }

    return 1 + Math.ceil((firstThursday - target) / 604800000);
}

function getDateRangeOfWeek(weekNo) {
    var d1 = new Date();
    numOfdaysPastSinceLastMonday = eval(d1.getDay() - 1);
    d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
    var weekNoToday = d1.getWeek();
    var weeksInTheFuture = eval(weekNo - weekNoToday);
    d1.setDate(d1.getDate() + eval(7 * weeksInTheFuture));
    var rangeIsFrom = eval(d1.getFullYear() + 1) + "-" + d1.getMonth() + "-" + d1.getDate();
    d1.setDate(d1.getDate() + 6);
    var rangeIsTo = eval(d1.getFullYear() + 1) + "-" + d1.getMonth() + "-" + d1.getDate();
    return rangeIsFrom + " to " + rangeIsTo;
};

function creatAccountUser(data) {
    db.query(
        `select count(email) as countMail from account WHERE email = ?`,
        [data.email], (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            if (results[0].countMail > 0) return;

            // tạo tài khoản demo
            db.query(
                `insert into account (email, type, u_id, created_at)
                    values(?,0,?,now())`,
                [
                    data.email,
                    makeid(10)
                ]
            );
            // tạo tài khoản thật
            db.query(
                `insert into account (email, type, u_id, created_at)
                    values(?,1,?,now())`,
                [
                    data.email,
                    makeid(10)
                ]
            );
        }
    )
}

async function CongTienHoaHongVIP(email) {
    // kiểm tra F1 của mình là ai để cộng tiền là 50% của 100$

    //var money = 100;
    // let reSys = fs.readFileSync(fileSys);
    // const redataSys = JSON.parse(reSys);

    // let currUse = redataSys.typeCurrUseSys.toLowerCase();

    let lsComm = Helper.getConfig(fileCommissionVip);

    // usdt 7 tầng
    let hhVip = lsComm;
    let refFrom, uplineID;
    let lvVip = 0;
    await new Promise((res, rej) => {
        db.query(
            `SELECT upline_id, ref_code, level_vip FROM users WHERE email = ?`,
            [
                email
            ], (error, results, fields) => {
                refFrom = results[0].ref_code; //lấy ref code của mình mà người khác đăng ký
                uplineID = results[0].upline_id; //lấy ref id của họ mà mình đăng ký
                lvVip = results[0].level_vip;
                res();
            }
        )
    })

    if (uplineID == null) return;

    // get thong tin cap tren upline

    let uplineLevel = 0;

    while (uplineID != null) {
        let levelUpline = 0;
        let isVip = 0;
        let emailUpline = "";

        await new Promise((res, rej) => {
            db.query(
                `SELECT upline_id, ref_code, level_vip,vip_user,email FROM users WHERE ref_code = ?`,
                [
                    uplineID
                ], (error, results, fields) => {
                    levelUpline = results[0].level_vip * 1;
                    isVip = results[0].vip_user * 1;
                    emailUpline = results[0].email;
                    res();
                }
            )
        })

        let amountDuocCong = hhVip[uplineLevel].value * 1;

        if (levelUpline !== 0 && isVip !== 0 && levelUpline >= (uplineLevel + 1)) {
            console.log("TRUE: Amount: " + amountDuocCong + " Cap tren: " + uplineID + " - " + emailUpline + " | level =" + levelUpline + " |HH level = " + uplineLevel + "  isVip = " + isVip);
            await new Promise((res, rej) => {
                db.query(
                    `UPDATE users SET commission_vip = commission_vip + ?, money_usdt = money_usdt + ? where ref_code = ?`,
                    [
                        amountDuocCong,
                        amountDuocCong,
                        uplineID
                    ], (error, results, fields) => {
                        if (error) {
                            return error;
                        }

                        //Tele.sendMessThongBao(`HHVIP: user ${email} trả thưởng cấp trên ${uplineID}, ${amountDuocCong} `);

                        console.log(`Cộng tiền cấp trên: ${uplineID} tien ${amountDuocCong}`);
                        db.query(
                            `INSERT INTO commission_history (email, ref_id, upline_id, vip_commission, type, status, created_at) 
                        VALUES (?,?,?,?,?,?,now())`,
                            [
                                email,
                                refFrom,
                                uplineID,
                                amountDuocCong,
                                'hhv', // hoa hồng vip
                                1,
                            ], (error, results, fields) => {
                                if (error) {
                                    console.log(error);
                                    //throw new Error(error);
                                }

                                console.log(`Cộng tiền cấp trên lịch sử: ${uplineID} tien ${amountDuocCong}`);
                                res();
                                //SEND_THONG_BAO('vip', result[0].email, result[0].email, 'Thông báo hoa hồng VIP', `Cấp dưới (${result[0].nick_name}) vừa mua vip. Và bạn nhận được ${amountDuocCong}$ hoa hồng.`);
                            }
                        )
                    }
                )
            })
        } else {
            console.log("FALSE: Amount: " + amountDuocCong + " " + uplineID + " - " + emailUpline + " | level =" + levelUpline + " |HH level = " + uplineLevel + "  isVip = " + isVip);
            await new Promise((res, rej) => {
                db.query(
                    `INSERT INTO commission_history_reback (email, ref_id, upline_id, vip_commission, type, status, created_at) 
                    VALUES (?,?,?,?,?,?,now())`,
                    [
                        email,
                        refFrom,
                        uplineID,
                        amountDuocCong,
                        'hhv', // hoa hồng vip
                        1,
                    ], (error, results, fields) => {
                        if (error) {
                            console.log(error);
                            throw new Error(error);
                        }

                        res();
                    }
                )
            })
        }

        await new Promise((res, rej) => {
            db.query(
                `SELECT upline_id, email, nick_name FROM users WHERE ref_code = ?`,
                [
                    uplineID
                ], (error, result, fields) => {
                    if (!!result[0].upline_id) {
                        uplineID = result[0].upline_id; // ref id của F0
                    } else {
                        uplineID = null;
                    }

                    res();
                }
            )
        })

        const title = {
            title: 'Thông báo hoa hồng VIP',
            title_en: 'Notice of VIP commission',
            title_cam: 'សេចក្តីជូនដំណឹងអំពីគណៈកម្មការ VIP'
        }

        const content = {
            content: `Bạn vừa mua vip`,
            content_en: `You just bought vip`,
            content_cam: `អ្នកទើបតែទិញ vip`
        }

        // SEND_THONG_BAO('vip', email, email, 'Thông báo hoa hồng VIP', `Bạn vừa mua vip`);

        SEND_THONG_BAO_LANGS('vip', email, email, title, content);
        await sleep(500);
        uplineLevel++;
    }

    return;

    // cộng tiền thẳng vào ví, + vào hoa hồng vip
    for (let u = 0; u < hhVip.length; u++) {
        let amountDuocCong = hhVip[u].value * 1;
        if (uplineID == null) break; // kết thúc

        //get thong tin cap tren
        let levelUpline = 0;
        let isVip = 0;

        await new Promise((res, rej) => {
            db.query(
                `SELECT upline_id, ref_code, level_vip,vip_user FROM users WHERE ref_code = ?`,
                [
                    uplineID
                ], (error, results, fields) => {
                    levelUpline = results[0].level_vip * 1;
                    isVip = results[0].vip_user * 1;
                    res();
                }
            )
        })

        console.log("level: " + levelUpline + "==" + (u + 1));

        if (levelUpline != 0 && isVip != 0 && levelUpline >= (u + 1)) {
            db.query(
                `UPDATE users SET commission_vip = commission_vip + ?, money_usdt = money_usdt + ? where ref_code = ?`,
                [
                    amountDuocCong,
                    amountDuocCong,
                    uplineID
                ], (error, results, fields) => {
                    if (error) {
                        return error;
                    }

                    //console.log("Insert HH "+uplineID+" tien");
                    // in vào lịch sử hoa hồng VIP
                    // kiểm tra UPLINE ID của cấp trên

                    db.query(
                        `INSERT INTO commission_history (email, ref_id, upline_id, vip_commission, type, status, created_at) 
                    VALUES (?,?,?,?,?,?,now())`,
                        [
                            email,
                            refFrom,
                            uplineID,
                            amountDuocCong,
                            'hhv', // hoa hồng vip
                            1,
                        ], (error, results, fields) => {
                            if (error) {
                                console.log(error);
                                throw new Error(error);
                            }

                            //console.log("Insert HH " +uplineID+" tien LS");
                        }
                    )
                }
            )
        } else {
            db.query(
                `INSERT INTO commission_history_reback (email, ref_id, upline_id, vip_commission, type, status, created_at) 
                VALUES (?,?,?,?,?,?,now())`,
                [
                    email,
                    refFrom,
                    uplineID,
                    amountDuocCong,
                    'hhv', // hoa hồng vip
                    1,
                ], (error, results, fields) => {
                    if (error) {
                        console.log(error);
                        throw new Error(error);
                    }
                }
            )
        }

        db.query(
            `SELECT upline_id, email, nick_name FROM users WHERE ref_code = ?`,
            [
                uplineID // ref id của thằng F1
            ], (error, result, fields) => {
                if (!!result[0].upline_id) {
                    uplineID = result[0].upline_id; // ref id của F0
                } else {
                    uplineID = null;
                }

                SEND_THONG_BAO('vip', result[0].email, result[0].email, 'Thông báo hoa hồng VIP', `Cấp dưới (${result[0].nick_name}) vừa mua vip. Và bạn nhận được ${amountDuocCong}$ hoa hồng.`);
                SEND_THONG_BAO('vip', email, email, 'Thông báo hoa hồng VIP', `Bạn vừa mua vip`);
            }
        )

        // kieem tra level cap tren

        await sleep(300);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function GET_EMAIL_BY_NICKNAME(nick) {
    return await new Promise((res, rej) => {
        db.query(
            `SELECT email FROM users WHERE nick_name = ?`,
            [
                nick
            ], (error, results, fields) => {
                res(results[0].email);
            })
    })
}

function formatPrice(value, minimum) {
    var formatter = new Intl.NumberFormat('en-US', {
        //style: 'currency',
        //currency: '',
        minimumFractionDigits: minimum
    });
    return formatter.format(value);
}

module.exports = {
    checkUserNickName: (nick, callback) => {
        db.query(
            `SELECT nick_name,marketing FROM users WHERE nick_name = ?`,
            [nick], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results)
            }
        )
    },

    createAccount: async (data, callback) => {
        if (data.upline_id === '') {
            data.upline_id = "NULL"
        }

        let isPhone = 0;

        if(data.isPhone){
            isPhone = 1;
        }

        let username = data.email;
        if(data.dialCode){
            username = data.dialCode +"-"+data.email;
        }

        let account = web3.eth.accounts.create();
        axios.post(createAddressBTC)
            .then((res) => {
                let adr = res.data
                db.query(
                    `insert into users (email, nick_name, password, first_name, last_name, upline_id, ref_code, address_ETH, address_USDT, privateKey_ETH, privateKey_USDT, address_BTC, wif_BTC, privateKey_BTC, created_at,is_phone,country,dialCode,iso2,username,loss_balance)
                    values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,now(),?,?,?,?,?,?)`,
                    [
                        data.email,
                        data.nick_name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "_"),
                        data.password,
                        data.first_name,
                        data.last_name,
                        data.upline_id,
                        makeid(7),
                        account.address,
                        account.address,
                        account.privateKey,
                        account.privateKey,
                        adr.address,
                        adr.wif,
                        adr.private,
                        isPhone,
                        data.country,
                        data.dialCode,
                        data.iso2,
                        username,
                        data.accountBalance
                    ],
                    async (error, results, fields) => {
                        if (error) {
                            return callback(error);
                        }

                        Tele.sendMessAccount(`🛫 Account verify: <b>${username}</b>\nBiệt danh: ${data.nick_name} balance: ${data.accountBalance} `);

                        Tele.sendMessThongBao(`🛫 Vừa thêm mới TÀI KHOẢN vào hệ thống: Account: <b>${username}</b>\nBiệt danh: ${data.nick_name}`);
                        if (data.isOpt) {
                            db.query(
                                `update users set active = 1, code_secure = ? where email = ?`,
                                [
                                    makeid(4),
                                    data.email
                                ], (error, results, fields) => {
                                    if (error) {
                                        return callback(error);
                                    }

                                    creatAccountUser(data);
                                    Tele.sendMessThongBao(`🧑Tài khoản mới: <b>${username}</b> vừa kích hoạt thành công!`);
                                    return callback(null, results)
                                }
                            )
                        } else {
                            return callback(null, results)
                        }
                    }
                );
            })
    },

    createUser: (data, callback) => {
        let account = web3.eth.accounts.create()
        axios.post(createAddressBTC)
            .then((res) => {
                let adr = res.data;

                db.query(
                    `insert into users (ref_code, marketing, email, first_name, last_name, password, nick_name, address_ETH, address_USDT, privateKey_ETH, privateKey_USDT, address_BTC, wif_BTC, privateKey_BTC, level_vip, vip_user, active, created_at)
                    values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,now())`,
                    [
                        makeid(7),
                        1,
                        data.email,
                        data.first_name,
                        data.last_name,
                        data.password,
                        data.nick_name,
                        account.address,
                        account.address,
                        account.privateKey,
                        account.privateKey,
                        adr.address,
                        adr.wif,
                        adr.private,
                        data.level_vip,
                        data.vip_user,
                        data.active
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return callback(error);
                        }

                        creatAccountUser(data);
                        return callback(null, results)
                    }
                );
            })
    },

    checkUserEmail: (email, callback) => {
        db.query(
            `select email from users where email = ?`,
            [email], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results)
            }
        )
    },

    checkCodeSecure: (data, callback) => {
        db.query(
            `select email from users where email = ? and code_secure = ?`,
            [data.email, data.code_secure], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results)
            }
        )
    },

    checkActiveUser: (email, callback) => {
        db.query(
            `select active from users where email = ? and active = 1`,
            [email], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results)
            }
        )
    },

    getInfoUser: (data, callback) => {
        // db.query(
        //     `select 
        //     users.email,
        //     users.nick_name, 
        //     users.first_name, 
        //     users.last_name, 
        //     users.verified as verifi, 
        //     users.money_usdt as b, 
        //     users.vip_user as vip, 
        //     users.ref_code as ref, 
        //     users.id_front, 
        //     users.id_back, 
        //     users.active_2fa as 2fa, 
        //     users.language as 2fa, 
        //     account.* from users INNER JOIN account ON users.email = account.email WHERE users.email = ? AND account.type = 1`,
        //     [data.email], (error, results, fields) => {
        //         if(error){
        //             return callback(error);
        //          }
        //          return callback(null, results[0])
        //     }
        // )
        var dataList = []

        const redataSys = Helper.getConfig(fileSys);

        let currUse = redataSys.typeCurrUseSys.toLowerCase()

        db.query(
            (`select id, email, nick_name, first_name, last_name, verified as verify, money_${mysql_real_escape_string(currUse)} as balance, vip_user as vip, ref_code as ref, upline_id as upid, id_front, id_back, profile_image, active_2fa as fa2, code_secure as num_secury, so_cmnd, pending_commission, commission_vip, level_vip, country as c, marketing as mkt, language,is_expert,is_phone,active_type,verified_telegram,email_send from users WHERE email = ?`),
            [data.email], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                dataList = results[0];

                if (!dataList) {
                    for (let l in USER_ONLINE) {
                        if (USER_ONLINE[l].email == data.email) {
                            let ws = USER_ONLINE[l].ws;
                            let mess = { type: 'disAccount', mess: 'Không tìm thấy tài khoản của bạn!', style: 'danger' };
                            ws.send(JSON.stringify({ type: 'mess', data: mess }));
                            break;
                        }
                    }

                    return;
                }

                db.query(`SELECT content,user_recieved,type,active FROM mst_super_copytrade WHERE email = ?`, [data.email], (error, results2, fields) => {
                    if(error){

                    }else{
                        if (results2.length > 0) {
                            dataList['super'] = results2[0];
                        } else {
                            dataList['super'] = {};
                        }
                    }
                });

                db.query(
                    `select balance, u_id, type FROM account WHERE email = ?`,
                    [data.email], (error, results2, fields) => {
                        if (error) {
                            return callback(error);
                        }

                        const order = [];

                        results2.forEach(function (res) {
                            if (!res) return;
                            if (res.type === 0) {
                                order[0] = res
                            }

                            if (res.type === 1) {
                                order[1] = res
                            }

                            //order.push(res)
                        })
                        //console.log(order)
                        dataList['order'] = order;

                        return callback(null, dataList)
                    })
            }
        )
    },

    getAllUser: async (query, callback) => {
        const offset = Number(query.offset || 0);
        const limit = Number(query.limit || 20);
        const accountType = query.type || "0";

        const searchTxt = query.s
        let count = 0;
        if (searchTxt) {
            count = await new Promise((res, rej) => {
                db.query(
                    `SELECT COUNT(id) as count FROM users WHERE deleted_at IS NULL AND super_user=? AND marketing = ? AND (email LIKE ? OR nick_name LIKE ? OR address_USDT LIKE ?)`,
                    [0, accountType, `%${searchTxt}%`, `%${searchTxt}%`, `%${searchTxt}%`], (error, results, fields) => {
                        res(results[0].count)
                    }
                )
            });

            db.query(
                `SELECT users.*,account.balance as 'real_balance',COALESCE(account.win,0) as 'acc_win',COALESCE(account.lose,0) as 'acc_lose', COALESCE(account.order_amount,0) as 'acc_amount', hhgd.pending_commission as 'amount_hhgd', hhvip.vip_commission  as 'amount_hhvip', COALESCE(gd_nap.amount_nap,0) as 'amount_nap', COALESCE(gd_rut.amount_rut,0) as 'amount_rut'
                FROM users 
                LEFT JOIN account ON users.email = account.email AND account.type = 1
                LEFT JOIN
                (
                    SELECT ref_id,SUM(pending_commission) as pending_commission FROM commission_history 
                    WHERE type='klgd'
                    GROUP BY ref_id
                ) as hhgd ON users.ref_code = hhgd.ref_id
                LEFT JOIN
                (
                    SELECT upline_id,SUM(vip_commission) as vip_commission FROM commission_history 
                GROUP BY upline_id
                ) as hhvip ON users.ref_code = hhvip.upline_id
                LEFT JOIN
                (
                    SELECT email,COALESCE(SUM(amount),0) as 'amount_rut' FROM trade_history 
                    WHERE type_key='rt' AND delete_status = 0 AND network IN ('bep20','bank')  AND status != 2
                    GROUP BY email
                ) as gd_rut ON users.email = gd_rut.email
                LEFT JOIN
                (
                    SELECT email,COALESCE(SUM(amount),0) as 'amount_nap' FROM trade_history 
                    WHERE type_key='nt' AND delete_status = 0 AND network IN ('bep20','bank')
                    GROUP BY email
                ) as gd_nap ON users.email = gd_nap.email
                WHERE users.deleted_at IS NULL AND super_user=? AND marketing = ?
                AND (users.email LIKE ? OR nick_name LIKE ? OR address_USDT LIKE ?)
                ORDER BY id DESC LIMIT ? OFFSET ? `,
                [0, accountType, `%${searchTxt}%`, `%${searchTxt}%`, `%${searchTxt}%`, limit, offset], (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    if (results.length) {
                        results.forEach(item => {
                            delete item.privateKey_BTC;
                            delete item.privateKey_ETH;
                            delete item.wif_BTC;
                            delete item.privateKey_USDT;
                        });
                    }

                    return callback(null, { count, items: results })
                }
            )
        } else {
            count = await new Promise((res, rej) => {
                db.query(
                    `SELECT COUNT(id) as count FROM users WHERE deleted_at IS NULL AND super_user=? AND marketing = ?`,
                    [0, accountType], (error, results, fields) => {
                        res(results[0].count)
                    }
                )
            });

            db.query(
                `SELECT users.*,account.balance as 'real_balance',COALESCE(account.win,0) as 'acc_win',COALESCE(account.lose,0) as 'acc_lose', COALESCE(account.order_amount,0) as 'acc_amount', hhgd.pending_commission as 'amount_hhgd', hhvip.vip_commission  as 'amount_hhvip', COALESCE(gd_nap.amount_nap,0) as 'amount_nap', COALESCE(gd_rut.amount_rut,0) as 'amount_rut'
                FROM users 
                LEFT JOIN account ON users.email = account.email AND account.type = 1
                LEFT JOIN
                (
                    SELECT ref_id,SUM(pending_commission) as pending_commission FROM commission_history 
                    WHERE type='klgd'
                    GROUP BY ref_id
                ) as hhgd ON users.ref_code = hhgd.ref_id
                LEFT JOIN
                (
                    SELECT upline_id,SUM(vip_commission) as vip_commission FROM commission_history 
                GROUP BY upline_id
                ) as hhvip ON users.ref_code = hhvip.upline_id
                LEFT JOIN
                (
                    SELECT email,COALESCE(SUM(amount),0) as 'amount_rut' FROM trade_history 
                    WHERE type_key='rt' AND delete_status = 0 AND network IN ('bep20','bank')
                    GROUP BY email
                ) as gd_rut ON users.email = gd_rut.email
                LEFT JOIN
                (
                    SELECT email,COALESCE(SUM(amount),0) as 'amount_nap' FROM trade_history 
                    WHERE type_key='nt' AND delete_status = 0 AND network IN ('bep20','bank')
                    GROUP BY email
                ) as gd_nap ON users.email = gd_nap.email
                WHERE users.deleted_at IS NULL AND super_user=? AND marketing = ? ORDER BY id DESC LIMIT ? OFFSET ?`,
                [0, accountType, limit, offset], (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    if (results.length) {
                        results.forEach(item => {
                            delete item.privateKey_BTC;
                            delete item.privateKey_ETH;
                            delete item.wif_BTC;
                            delete item.privateKey_USDT;
                        });
                    }

                    return callback(null, { count, items: results })
                }
            )
        }
    },
    getAllDeletedUsers: async (query, callback) => {
        const offset = Number(query.offset || 0);
        const limit = Number(query.limit || 20);

        const searchTxt = query.s
        let count = 0;
        if (searchTxt) {
            count = await new Promise((res, rej) => {
                db.query(
                    `SELECT COUNT(id) as count FROM users WHERE deleted_at IS NOT NULL AND super_user=? AND (email LIKE ? OR nick_name LIKE ? OR address_USDT LIKE ?)`,
                    [0, `%${searchTxt}%`, `%${searchTxt}%`, `%${searchTxt}%`], (error, results, fields) => {
                        res(results[0].count)
                    }
                )
            });

            db.query(
                `SELECT users.*,account.balance as 'real_balance' FROM users LEFT JOIN account ON users.email = account.email AND account.type = 1 WHERE users.deleted_at IS NOT NULL AND super_user=? AND (users.email LIKE ? OR nick_name LIKE ? OR address_USDT LIKE ?) ORDER BY id DESC LIMIT ? OFFSET ? `,
                [0, `%${searchTxt}%`, `%${searchTxt}%`, `%${searchTxt}%`, limit, offset], (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    if (results.length) {
                        results.forEach(item => {
                            delete item.privateKey_BTC;
                            delete item.privateKey_ETH;
                            delete item.wif_BTC;
                            delete item.privateKey_USDT;
                        });
                    }

                    return callback(null, { count, items: results })
                }
            )
        } else {
            count = await new Promise((res, rej) => {
                db.query(
                    `SELECT COUNT(id) as count FROM users WHERE deleted_at IS NOT NULL AND super_user=? `,
                    [0], (error, results, fields) => {
                        res(results[0].count)
                    }
                )
            });

            db.query(
                `SELECT users.*,account.balance as 'real_balance' FROM users LEFT JOIN account ON users.email = account.email AND account.type = 1 WHERE users.deleted_at IS NOT NULL AND super_user=?  ORDER BY id DESC LIMIT ? OFFSET ?`,
                [0, limit, offset], (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    if (results.length) {
                        results.forEach(item => {
                            delete item.privateKey_BTC;
                            delete item.privateKey_ETH;
                            delete item.wif_BTC;
                            delete item.privateKey_USDT;
                        });
                    }

                    return callback(null, { count, items: results })
                }
            )
        }
    },

    scanWallet: (email, callback) => {
        if (void 0 === email) {
            callback(new Error('Email user không hợp lệ'));
            return;
        } else {
            handleWallet(email).then(callback)
        }
    },
    scanWalletAdmin: (email, callback) => {
        if (void 0 === email) {
            callback(new Error('Email user không hợp lệ'));
            return;
        } else {
            handleWalletAdmin(email).then(callback)
        }
    },
    handleWalletAdminNoneFee: (email, callback) => {
        if (void 0 === email) {
            callback(new Error('Email user không hợp lệ'));
            return;
        } else {
            handleWalletAdminNoneFee(email).then(callback)
        }
    },

    getUserById: (id, callback) => {
        db.query(
            `select * from users where id = ?`,
            [id], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                if (results.length) {
                    results.forEach(item => {
                        delete item.privateKey_BTC;
                        delete item.privateKey_ETH;
                        delete item.wif_BTC;
                        delete item.privateKey_USDT;
                    });
                }

                return callback(null, results[0])
            }
        )
    },

    updateUserById: (data, callback) => {
        let levelVip = data.level_vip;

        if (data.vip_user === 0 || data.vip_user === "0") {
            levelVip = 0;
        }

        if (!!data.password) {
            let qr = `update users set email = ?, nick_name = ?, first_name = ?, last_name = ?, vip_user = ?, level_vip = ?, password = ?, updated_at=now() where id = ?`;
            db.query(
                qr,
                [
                    data.email,
                    data.nick_name,
                    data.first_name,
                    data.last_name,
                    data.vip_user,
                    levelVip,
                    data.password,
                    data.id
                ], (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    return callback(null, results)
                }
            )
        } else {
            let qr = `update users set email = ?, nick_name = ?, first_name = ?, last_name = ?, vip_user = ?, level_vip = ?, updated_at=now() where id = ?`;
            db.query(
                qr,
                [
                    data.email,
                    data.nick_name,
                    data.first_name,
                    data.last_name,
                    data.vip_user,
                    levelVip,
                    data.id
                ], (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    return callback(null, results)
                }
            )
        }
    },

    updateInfoVerify: (data, callback) => {
        db.query(
            `update users set first_name=?, last_name=?, country=?, so_cmnd = ?, verified = 2 where email = ?`,
            [
                data.first_name,
                data.last_name,
                data.country,
                data.cmnd,
                data.email
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                const title = {
                    title: 'Xác minh danh tính đang chờ xử lý',
                    title_en: 'Identity verification pending',
                    title_cam: 'ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណកំពុងរង់ចាំ'
                }
        
                const content = {
                    content: `Xác minh danh tính của bạn đã được phê duyệt. Vui lòng đợi ít nhất 7 ngày làm việc.`,
                    content_en: `Your identity verification has been approved. Please wait at least 7 business days.`,
                    content_cam: `ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណរបស់អ្នកត្រូវបានអនុម័ត។ សូមរង់ចាំយ៉ាងហោចណាស់ 7 ថ្ងៃធ្វើការ។`
                }

                // SEND_THONG_BAO('kyc', data.email, data.email, 'Xác minh danh tính đang chờ xử lý', `Xác minh danh tính của bạn đã được phê duyệt. Vui lòng đợi ít nhất 7 ngày làm việc.`);

                SEND_THONG_BAO_LANGS('kyc', data.email, data.email, title, content);

                Tele.sendMessThongBao(`📇📇📇Người dùng <b>${data.email}</b> vừa thực hiện xác minh tài khoản:\n
                    Số căn cước (CMT): <b>${data.cmnd}</b>
                    Họ tên: <b>${data.last_name} ${data.first_name}</b>
                 `);

                return callback(null, results);
            }
        )
    },

    addMoneyMember: (data, callback) => {
        db.query(
            `UPDATE users SET money_usdt = money_usdt - ?, money_btc = money_btc - ?, money_eth = money_eth - ?, money_paypal = money_paypal - ?, money_vn = money_vn - ? WHERE nick_name = ?`,
            [
                data.aUSDT,
                data.aBTC,
                data.aETH,
                data.aPAYPAL,
                data.aVND,
                data.nick
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                Tele.sendMessThongBao(`🧑ADMIN vừa thực hiện trừ tiền tới người dùng: <b>${data.nick}</b>\n
                    USDT: <b>-${data.aUSDT}</b>
                    BTC: <b>-${data.aBTC}</b>
                    ETH: <b>-${data.aETH}</b>
                    PAYPAL: <b>-${data.aPAYPAL}</b>
                    VNĐ: <b>-${data.aVND}</b>`);
                return callback(null, results)
            }
        )
    },

    updateUserMoneyById: (data, callback) => {
        db.query(
            `update users set money_btc=money_btc+?, money_eth=money_eth+?, money_usdt=money_usdt+?, money_vn=money_vn+? where id = ?`,
            [
                data.money_btc,
                data.money_eth,
                data.money_usdt,
                data.money_vn,
                data.id
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                db.query(`INSERT INTO add_money_history (email, nick_name, type, price_USDT, price_BTC, price_ETH, price_PAYPAL, price_VN, created_at) 
                 VALUES(?,?,?,?,?,?,?,?,now())`,
                    [
                        data.email,
                        data.nick_name,
                        data.type,
                        data.money_usdt,
                        data.money_btc,
                        data.money_eth,
                        data.money_paypal,
                        data.money_vn,
                    ]);
                Tele.sendMessThongBao(`🧑ADMIN vừa thực hiện thêm tiền tới người dùng: <b>${data.nick_name}</b>\n
                    USDT: <b>${data.money_usdt}</b>
                    BTC: <b>${data.money_btc}</b>
                    ETH: <b>${data.money_eth}</b>
                    PAYPAL: <b>${data.money_paypal}</b>
                    VNĐ: <b>${data.money_vn}</b>`);

                return callback(null, results)
            }
        )
    },

    activeUser: (data, callback) => {
        db.query(
            `update users set active = 1, code_secure = ? where email = ?`,
            [
                makeid(4),
                data.email
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                creatAccountUser(data);
                Tele.sendMessThongBao(`🧑Tài khoản mới: <b>${data.email}</b> vừa kích hoạt thành công!`);
                return callback(null, results)
            }
        )
    },

    updateUserPasswordByEmail: (data, callback) => {
        db.query(
            `UPDATE users SET password = ? WHERE email = ?`,
            [
                data.password,
                data.email
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results)
            }
        )
    },

    deleteUserById: async (id, callback) => {
        const emailById = await new Promise((resolve, reject) => {
            db.query(`select email from users where id = ?`, [id], (err, res) => {
                if (err) reject(err);
                return resolve(res);
            })
        });

        if (emailById.length && emailById[0].email) {
            const email = emailById[0].email;
            db.query(
                `UPDATE users SET deleted_at = now() WHERE id = ?`,
                [id], (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    db.query(`UPDATE account SET deleted_at = now() where email = ?`, [email], (error, results) => {
                        if (error) {
                            return callback(error);
                        }

                        for (let l in USER_ONLINE) {
                            if (USER_ONLINE[l].email == email) {
                                let ws = USER_ONLINE[l].ws;
                                let mess = { type: 'disAccount', mess: 'Tài khoản đã bị khoá!', style: 'danger' };
                                ws.send(JSON.stringify({ type: 'mess', data: mess }));
                                break;
                            }
                        }

                        return callback(null, results)
                    });
                }
            )
        }
    },

    recoverUserById: async (id, callback) => {
        const emailById = await new Promise((resolve, reject) => {
            db.query(`select email from users where id = ?`, [id], (err, res) => {
                if (err) reject(err);
                return resolve(res);
            })
        });

        if (emailById.length && emailById[0].email) {
            const email = emailById[0].email;
            db.query(
                `UPDATE users SET deleted_at = NULL WHERE id = ?`,
                [id], (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    db.query(`UPDATE account SET deleted_at = NULL where email = ?`, [email], (error, results) => {
                        if (error) {
                            return callback(error);
                        }

                        return callback(null, results)
                    });
                }
            )
        }
    },

    getUserByUserEmail: (email, callback) => {
        db.query(
            `SELECT email, nick_name, password, active_2fa, secret_2fa, deleted_at,active,active_type,code_telegram,email_send,verified_telegram,telegram_id,verified,marketing FROM users WHERE email = ? OR username = ?`,
            [email, email], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                if (results.length == 0) {
                    return callback(null)
                }

                if (!!results[0].deleted_at) {
                    return callback(null)
                }

                return callback(null, results[0])
            }
        )
    },

    getAdminByAdminUsername: (username, callback) => {
        db.query(
            `select email, nick_name, password from users where username = ? AND manage_supers = 1`,
            [username], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results[0])
            }
        )
    },

    verifiedAccount: (data, callback) => {
        db.query(
            `update users set verified = ? where id = ?`,
            [data.verified, data.id], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                if (data.verified) {
                    const title = {
                        title: 'Xác minh danh tính thành công',
                        title_en: 'Identity verification successful',
                        title_cam: 'ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណបានជោគជ័យ'
                    }
            
                    const content = {
                        content: `Danh tính của bạn đã được admin phê duyệt.`,
                        content_en: `Your identity has been approved by the admin.`,
                        content_cam: `អត្តសញ្ញាណរបស់អ្នកត្រូវបានយល់ព្រមដោយអ្នកគ្រប់គ្រង។`
                    }

                    db.query(
                        `SELECT email FROM users WHERE id = ?`,
                        [data.id], (error, result, fields) => {
                            // SEND_THONG_BAO('kyc', result[0].email, result[0].email, 'Xác minh danh tính thành công', `Danh tính của bạn đã được admin phê duyệt.`)
                            SEND_THONG_BAO_LANGS('kyc', result[0].email, result[0].email, title, content);
                            Tele.sendMessThongBao(`📇📇📇 Đã <i>BẬT</i> xác minh tài khoản cho người dùng <b>${result[0].email}</b>`);
                        })
                }

                return callback(null, results);
            }
        )
    },

    // get đại lý
    getListAgency: callback => {
        db.query(
            `select * from users where vip_user = 1 order by id desc`,
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                if (results.length) {
                    results.forEach(item => {
                        delete item.privateKey_BTC;
                        delete item.wif_BTC;
                        delete item.privateKey_ETH;
                        delete item.privateKey_USDT;
                    });
                }

                return callback(null, results)
            }
        )
    },

    viewMemberAgency: (id, callback) => {
        db.query(
            `select COUNT(upline_id) as totalPeopel from users where upline_id = ?`,
            [id], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results)
            }
        )
    },

    reloadMoneyDemo: (email, callback) => {
        db.query(
            `update account set balance = 1000 where email = ? AND type = 0`,
            [
                email
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results)
            }
        )
    },

    checkMoneyUser: (email, callback) => {
        db.query(
            `select money_usdt as balance from users where email = ?`,
            [
                email
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results[0])
            }
        )
    },

    listHisBO: (email, callback) => {
        db.query(
            `select u_id from account where email = ? order by id desc`,
            [
                email
            ], (error, results, fields) => {
                var listAcc = []
                results.forEach(function (res) {
                    listAcc.push(res.u_id)
                })

                db.query(
                    `select 
                        buy_sell as bs,
                        currency as c,
                        type_account as t,
                        amount_win as aw,
                        amount_lose as al,
                        amount_bet as ab,
                        open as o,
                        close as cl,
                        created_at as d 
                        from bet_history where (id_account = ? or id_account = ?) and status = 1 AND DATE(created_at) = DATE(now()) order by id desc`,
                    [
                        listAcc[0],
                        listAcc[1]
                    ], (error, results, fields) => {
                        if (error) {
                            return callback(error);
                        }

                        return callback(null, results)
                    }
                )
            }
        )

        //
    },

    UsdtToLive: (data, callback) => {
        db.query(
            `select money_usdt from users where email = ?`,
            [
                data.email
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                if (results[0].money_usdt >= data.m) {
                    //=======
                    db.query(`update users set money_usdt = money_usdt - ? where email = ?`,
                        [
                            data.m,
                            data.email
                        ])
                    db.query(
                        `update account set balance = balance + ? where email = ? AND type = 1`,
                        [
                            data.m,
                            data.email
                        ], (error, results, fields) => {
                            if (error) {
                                return callback(error);
                            }

                            //==== IN vào lịch sử

                            const type = {
                                type: 'Chuyển tiền từ (Nội bộ) -> Live Account',
                                type_en: 'Transfer money from (Internal) -> Live Account',
                                type_cam: 'ផ្ទេរប្រាក់ពី (ផ្ទៃក្នុង) -> គណនីផ្ទាល់'
                            }

                            db.query(`insert into trade_history (email, from_u, to_u, type_key, type, type_en, type_cam, currency, amount, note, status, created_at)
                            values(?,?,?,?,?,?,?,?,?,?,?,now())`,
                                [
                                    data.email,
                                    data.nick,
                                    'Live Account',
                                    'ctsa', // Chuyển Tiền
                                    type.type,
                                    type.type_en,
                                    type.type_cam,
                                    'usdt',
                                    data.m,
                                    null,
                                    1
                                ])

                            return callback(null, results)
                        }
                    )
                } else {
                    return callback(null)
                }
            }
        )
    },

    LiveToUsdt: (data, callback) => {
        db.query(
            `select balance from account where email = ? AND type = 1`,
            [
                data.email
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                if (results[0].balance >= data.m) {
                    db.query(`update account set balance = balance - ? where email = ? AND type = 1`,
                        [
                            data.m,
                            data.email
                        ])
                    db.query(
                        `update users set money_usdt = money_usdt + ? where email = ?`,
                        [
                            data.m,
                            data.email
                        ], (error, results, fields) => {
                            if (error) {
                                return callback(error);
                            }

                            //==== IN vào lịch sử

                            const type = {
                                type: 'Chuyển tiền từ Live Account -> (Nội bộ)',
                                type_en: 'Transfer money from Live Account -> (Internal)',
                                type_cam: 'ផ្ទេរប្រាក់ពីគណនីផ្ទាល់ -> (ផ្ទៃក្នុង)'
                            }

                            db.query(`insert into trade_history (email, from_u, to_u, type_key, type, type_en, type_cam, currency, amount, note, status, created_at)
                            values(?,?,?,?,?,?,?,?,?,?,?,now())`,
                                [
                                    data.email,
                                    'Live Account',
                                    data.nick,
                                    'ctas', // Chuyển Tiền
                                    type.type,
                                    type.type_en,
                                    type.type_cam,
                                    'usdt',
                                    data.m,
                                    null,
                                    1
                                ])

                            return callback(null, results)
                        }
                    )
                } else {
                    return callback(null)
                }
            }
        )
    },

    WithDrawalNoiBo: (data, callback) => {
        dataSys = Helper.getConfig(fileSys);
        db.query(
            `select money_usdt, verified from users where email = ? AND nick_name = ?`,
            [
                data.email,
                data.nick_name
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                // if (results[0].verified != 1) {
                //     return callback(null, { err: 10 });
                // }

                // phí rút 0 usdt
                let phi = dataSys.feeRutUSDTNoiBo;
                let tongPhi = Number(data.amS) + Number(phi);

                if (results[0].money_usdt >= tongPhi) {
                    //======= Từ tiền tài khoản mình
                    db.query(`update users set money_usdt = money_usdt - ? where email = ?`,
                        [
                            tongPhi,
                            data.email
                        ])
                    
                    if(data.marketing){
                        Tele.sendMessRut(`🌟Người dùng ${data.nick_name} MKT vừa thực hiện rút tiền NỘI BỘ tới Nick Name: ${data.address} với <b>$${data.amS}</b>.!`);
                    }else{
                        Tele.sendMessRut(`🌟Người dùng ${data.nick_name} vừa thực hiện rút tiền NỘI BỘ tới Nick Name: ${data.address} với <b>$${data.amS}</b>.!`);
                    }    

                   

                    const title = {
                        title: 'Rút tiền nội bộ',
                        title_en: 'Internal withdrawal',
                        title_cam: 'ការដកប្រាក់ផ្ទៃក្នុង'
                    };

                    const content = {
                        content: `-Số lượng: <b>${formatPrice(data.amS, 2)} USDT</b><br>-Người nhận: <b>${data.address}</b>`,
                        content_en: `-Amount: <b>${formatPrice(data.amS, 2)} USDT</b><br>-Recipient: <b>${data.address}</b>`,
                        content_cam: `-ចំនួន៖ <b>${formatPrice(data.amS, 2)} USDT</b><br>-អ្នកទទួល៖ <b>${data.address}</b>`
                    };

                    SEND_THONG_BAO_LANGS('rut', data.email, data.email, title, content);

                    // SEND_THONG_BAO('rut', data.email, data.email, 'Rút tiền nội bộ', `-Số lượng: <b>${formatPrice(data.amS, 2)} USDT</b><br>-Người nhận: <b>${data.address}</b>`);
                    
                    GET_EMAIL_BY_NICKNAME(data.address)
                        .then((email) => {
                            const title_nt = {
                                title: 'Nạp tiền nội bộ',
                                title_en: 'Internal Recharge',
                                title_cam: 'ការបញ្ចូលថាមពលខាងក្នុង'
                            };

                            const content_nt = {
                                content: `-Số lượng: <b>${formatPrice(data.amS, 2)} USDT</b><br>-Người gửi: <b>${data.nick_name}</b>`,
                                content_en: `-Amount: <b>${formatPrice(data.amS, 2)} USDT</b><br>-Sender: <b>${data.nick_name}</b>`,
                                content_cam: `-ចំនួន៖ <b>${formatPrice(data.amS, 2)} USDT</b><br>-អ្នកផ្ញើ៖ <b>${data.nick_name}</b>`
                            }


                            SEND_THONG_BAO_LANGS('nap', email, email, title_nt, content_nt);

                            // SEND_THONG_BAO('nap', email, email, 'Nạp tiền nội bộ', `-Số lượng: <b>${formatPrice(data.amS, 2)} USDT</b><br>-Người gửi: <b>${data.nick_name}</b>`)
                        })

                    //======= cộng tiền vào tài khoản người khác
                    db.query(`update users set money_usdt = money_usdt + ? where nick_name = ?`,
                        [
                            Number(data.amS),
                            data.address
                        ], (error, results, fields) => {
                            if (error) {
                                return callback(error);
                            }

                            //==== IN vào lịch sử

                            const type = {
                                type: `Rút tiền (Nội bộ) tới ${data.address}`,
                                type_en: `Withdrawal (Internal) to ${data.address}`,
                                type_cam: `ការដកប្រាក់ (ផ្ទៃក្នុង) ទៅ ${data.address}`
                            }

                            db.query(
                                `insert into trade_history (pay_fee, email, from_u, to_u, type_key, type, type_en, type_cam, currency, amount, note, status, created_at) 
                            values (?,?,?,?,?,?,?,?,?,?,?,?,now())`,
                                [
                                    phi,
                                    data.email,
                                    data.nick_name,
                                    data.address,
                                    'rt', // Rút Tiền
                                    type.type,
                                    type.type_en,
                                    type.type_cam,
                                    'usdt',
                                    data.amS,
                                    data.gc,
                                    1
                                ], (error, results, fields) => {
                                    if (error) {
                                        return callback(error);
                                    }
                                })

                            return callback(null, results)
                        })
                } else {
                    return callback(null)
                }
            })
    },

    WithDrawalERC: (data, callback) => {
        dataSys = Helper.getConfig(fileSys);

        db.query(
            `select money_usdt from users where email = ? AND nick_name = ?`,
            [
                data.email,
                data.nick_name
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                // phí rút usdt
                let phi = dataSys.feeRutETHERC20;
                let tongPhi = Number(data.amS) + Number(phi);
                if (results[0].money_usdt >= tongPhi) {
                    //======= Từ tiền tài khoản mình
                    db.query(`update users set money_usdt = money_usdt - ? where email = ?`,
                        [
                            tongPhi,
                            data.email
                        ], (error, results, fields) => {
                            if (error) {
                                return callback(error);
                            }

                            Tele.sendMessRut(`🌟Người dùng ${data.nick_name} vừa thực hiện rút tiền ERC20 tới: ${data.address} với <b>$${data.amS}</b>. Vui lòng kiểm tra!`);
                            Tele.sendMessRut(`ARES-CHECK check ${data.nick_name}`);

                            const type = {
                                type: `Rút tiền ERC20`,
                                type_en: `Withdraw ERC20`,
                                type_cam: `ដក ERC20`
                            };

                            //==== IN vào lịch sử
                            db.query(`insert into trade_history (email, from_u, to_u, type_key, type, type_en, type_cam, currency, amount, note, status, network, created_at)
                         values(?,?,?,?,?,?,?,?,?,?,?,?,now())`,
                                [
                                    data.email,
                                    data.nick_name,
                                    data.address,
                                    'rt', // Rút Tiền
                                    type.type,
                                    type.type_en,
                                    type.type_cam,
                                    'usdt',
                                    data.amS,
                                    data.gc,
                                    0,
                                    data.nw
                                ], (error, results, fields) => {
                                    Tele.sendMessRut(`ARES-ACCPET rut ${results.insertId}`);
                                })

                            return callback(null, results)
                        })
                } else {
                    return callback(null)
                }
            })
    },

    WithDrawalBSC: (data, callback) => {
        dataSys = Helper.getConfig(fileSys);

        db.query(
            `select money_usdt, verified from users where email = ? AND nick_name = ?`,
            [
                data.email,
                data.nick_name
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                // if (results[0].verified != 1) {
                //     return callback(null, { err: 10 });
                // }

                // phí rút usdt
                let phi = Number(dataSys.feeRutUSDTBEP20);

                let tongPhi = Number(data.amS) + phi;
                if (results[0].money_usdt >= tongPhi) {
                    //======= Trừ tiền tài khoản mình
                    db.query(`UPDATE users SET money_usdt = money_usdt - ? WHERE email = ?`,
                        [
                            tongPhi,
                            data.email
                        ], (error, results, fields) => {
                            if (error) {
                                return callback(error);
                            }

                            Tele.sendMessRut(`🌟Người dùng ${data.nick_name} vừa thực hiện rút tiền BEP20 về Ví: ${data.address} với <b>$${data.amS}</b>. !\nSử dụng lệnh dưới vào BOT để thực hiện lệnh KIỂM TRA và RÚT:`);
                            Tele.sendMessRut(`ARES-CHECK check ${data.nick_name}`);

                            GET_EMAIL_BY_NICKNAME(data.nick_name)
                                .then((email) => {
                                    const title = {
                                        title: 'Rút tiền BEP20',
                                        title_en: 'Withdrawal BEP20',
                                        title_cam: 'ការដកប្រាក់ BEP20'
                                    }
    
                                    const content = {
                                        content: `-Số lượng: <b>${formatPrice(data.amS, 2)} USDT</b>`,
                                        content_en: `-Amount: <b>${formatPrice(data.amS, 2)} USDT</b>`,
                                        content_cam: `-ចំនួន៖ <b>${formatPrice(data.amS, 2)} USDT</b>`
                                    }

                                    SEND_THONG_BAO_LANGS('rut', data.email, email, title, content);


                                    // SEND_THONG_BAO('rut', data.email, email, 'Rút tiền BEP20', `-Số lượng: <b>${formatPrice(data.amS, 2)} USDT</b>`)
                                })

                                const type = {
                                    type: `Rút tiền BEP20 (BSC) về Ví: ${data.address}`,
                                    type_en: `Withdraw BEP20 (BSC) to Wallet: ${data.address}`,
                                    type_cam: `ដក BEP20 (BSC) ទៅកាបូប៖ ${data.address}`
                                };

                            //==== IN vào lịch sử
                            db.query(`insert into trade_history (email, from_u, to_u, type_key, type, type_en, type_cam, currency, amount, note, status, network, fee_withdraw, created_at)
                        values(?,?,?,?,?,?,?,?,?,?,?,?,?,now())`,
                                [
                                    data.email,
                                    data.nick_name,
                                    data.address,
                                    'rt', // Rút Tiền
                                    type.type,
                                    type.type_en,
                                    type.type_cam,
                                    'usdt',
                                    data.amS,
                                    data.gc,
                                    0,
                                    data.nw,
                                    phi
                                ], (error, results, fields) => {
                                    Tele.sendMessRut(`ARES-ACCPET rut ${results.insertId}`);
                                })

                            return callback(null, results)
                        })
                } else {
                    return callback(null)
                }
            })
    },

    WithDrawalVND: (data, callback) => {
        dataSys = Helper.getConfig(fileSys);

        db.query(
            `select money_usdt, verified from users where email = ? AND nick_name = ?`,
            [
                data.email,
                data.nick_name
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                // if (results[0].verified != 1) {
                //     return callback(null, { err: 10 });
                // }

                const tongPhi = Number(data.amS);
                const fee =  (Number(data.amS) * 0.02);
                const tongNhan = Number(data.amS) + fee;

                if (results[0].money_usdt >= tongNhan) {
                    //======= Trừ tiền tài khoản mình
                    db.query(`UPDATE users SET money_usdt = money_usdt - ? WHERE email = ?`,
                        [
                            tongNhan,
                            data.email
                        ], (error, results, fields) => {
                            if (error) {
                                return callback(error);
                            }

                            Tele.sendMessRut(`🌟Người dùng ${data.nick_name}, account: ${data.email}, NH: ${data.tenNganHang}, STK: ${data.soTaiKhoan} vừa thực hiện rút tiền \n- Số tiền ${tongPhi} USD \n- phí: ${fee} USD\n\nSử dụng lệnh dưới vào BOT để thực hiện lệnh KIỂM TRA và RÚT:`);
                            Tele.sendMessRut(`ARES-CHECK check ${data.nick_name}`);

                            GET_EMAIL_BY_NICKNAME(data.nick_name)
                                .then((email) => {
                                    const title = {
                                        title: 'Rút tiền Bank',
                                        title_en: 'Withdrawal Bank',
                                        title_cam: 'ដកប្រាក់ដុង'
                                    }
    
                                    const content = {
                                        content: `-Số lượng: <b>${formatPrice(data.amS, 2)} USDT</b>`,
                                        content_en: `-Amount: <b>${formatPrice(data.amS, 2)} USDT</b>`,
                                        content_cam: `-ចំនួន៖ <b>${formatPrice(data.amS, 2)} USDT</b>`
                                    }

                                    SEND_THONG_BAO_LANGS('rut', data.email, email, title, content)

                                    // SEND_THONG_BAO('rut', data.email, email, 'Rút tiền VNĐ', `-Số lượng: <b>${formatPrice(data.amS, 2)} USDT</b>`)
                                })

                            /**
                             * note user | tên ngân hàng | chi nhánh ngân hàng | số tài khoản | chủ tài khoản
                             */
                            const bankNote = `${data.tenNganHang}|${data.chiNhanhNganHang}|${data.soTaiKhoan}|${data.chuTaiKhoan}`;

                            const type = {
                                type: `Rút tiền về Bank`,
                                type_en: `Withdraw money to Bank`,
                                type_cam: `ដកប្រាក់ទៅ Bank`
                            };

                            //==== IN vào lịch sử
                            db.query(`insert into trade_history (email, from_u, type_key, type, type_en, type_cam, currency, amount, real_amount, bank, note, status, created_at,network,pay_fee)
                        values(?,?,?,?,?,?,?,?,?,?,?,?,now(),?,?)`,
                                [
                                    data.email,
                                    data.nick_name,
                                    'rt', // Rút Tiền
                                    type.type,
                                    type.type_en,
                                    type.type_cam,
                                    'vnd',
                                    tongPhi,
                                    tongNhan,
                                    bankNote,
                                    data.gc,
                                    0,
                                    'bank',
                                    fee
                                ], (error, results, fields) => {
                                    Tele.sendMessRut(`ARES-ACCPET rut ${results.insertId}`);
                                })

                            return callback(null, results)
                        })
                } else {
                    return callback(null)
                }
            })
    },

    WithDrawalPaypalAc: (data, callback) => {
        db.query(
            `select money_paypal from users where email = ? AND nick_name = ?`,
            [
                data.email,
                data.nick_name
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                // phí rút usd
                let phi = dataSys.feeRutPaypalAcc;
                let tongPhi = Number(data.amS) + Number(phi)
                if (results[0].money_paypal >= tongPhi) {
                    //======= Từ tiền tài khoản mình
                    db.query(`update users set money_paypal = money_paypal - ? where email = ?`,
                        [
                            tongPhi,
                            data.email
                        ], (error, results, fields) => {
                            if (error) {
                                return callback(error);
                            }

                            const type = {
                                type: `Rút tiền tài khoản Paypal`,
                                type_en: `Withdraw Paypal account`,
                                type_cam: `ដកគណនី Paypal`
                            };

                            //==== IN vào lịch sử
                            db.query(`insert into trade_history (from_u, to_u, type_key, type, type_en, type_cam, currency, amount, note, status, created_at)
                         values(?,?,?,?,?,?,?,?,now())`,
                                [
                                    data.nick_name,
                                    data.address,
                                    'rt', // Rút Tiền
                                    type.type,
                                    type.type_en,
                                    type.type_cam,
                                    'usd',
                                    data.amS,
                                    data.gc,
                                    1
                                ])

                            return callback(null, results)
                        })
                } else {
                    return callback(null)
                }
            })
    },

    WithDrawalPaypalNB: (data, callback) => {
        db.query(
            `select money_paypal from users where email = ? AND nick_name = ?`,
            [
                data.email,
                data.nick_name
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                // phí rút 0 usdt
                let phi = dataSys.feeRutPaypalNoiBo;
                let tongPhi = Number(data.amS) + Number(phi);

                if (results[0].money_paypal >= tongPhi) {
                    //======= Từ tiền tài khoản mình
                    db.query(`update users set money_paypal = money_paypal - ? where email = ?`,
                        [
                            tongPhi,
                            data.email
                        ])
                    //======= cộng tiền vào tài khoản người khác
                    db.query(`update users set money_paypal = money_paypal + ? where nick_name = ?`,
                        [
                            Number(data.amS),
                            data.nick
                        ], (error, results, fields) => {
                            if (error) {
                                return callback(error);
                            }

                            //==== IN vào lịch sử

                            const type = {
                                type: `Rút tiền Paypal (Nội bộ)`,
                                type_en: `Withdraw Paypal (Internal)`,
                                type_cam: `ដកប្រាក់ Paypal (ខាងក្នុង)`
                            };

                            db.query(
                                `insert into trade_history (from_u, to_u, type_key, type, type_en, type_cam, currency, amount, note, status, created_at) 
                            values (?,?,?,?,?,?,?,?,?,?,now())`,
                                [
                                    data.nick_name,
                                    data.nick,
                                    'rt', // Rút Tiền
                                    type.type,
                                    type.type_en,
                                    type.type_cam,
                                    'usd',
                                    data.amS,
                                    data.gc,
                                    1
                                ], (error, results, fields) => {
                                    if (error) {
                                        return callback(error);
                                    }
                                })

                            return callback(null, results)
                        })
                } else {
                    return callback(null)
                }
            })
    },

    BalanceWallet: (email, callback) => {
        db.query(
            `select 
                money_usdt as usdt,
                money_eth as eth,
                money_btc as btc,
                money_paypal as paypal 
                from users where email = ?`,
            [
                email
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results[0])
            }
        )
    },

    BankInfo: (callback) => {
        const redataSys = Helper.getConfig(fileSys);
        return callback(null, redataSys.bankInfo || '');
    },

    DepositToWallet: (data, callback) => {
        const redataSys = Helper.getConfig(fileSys);

        let currUse = redataSys.typeCurrUseSys.toLowerCase()
        let money = 0
        if (currUse == 'usdt' || currUse == 'paypal') {
            money = data.m
        } else if (currUse == 'eth') {
            money = data.m * currUse.quotePriceETH
        } else if (currUse == 'btc') {
            money = data.m * currUse.quotePriceBTC
        }

        // money là tổng nhận
        // data.mlaf số tiền nhập

        // nạp nhanh
        if (!!money && money >= 11) {
            db.query(
                (`update users set money_${mysql_real_escape_string(currUse)} = money_${mysql_real_escape_string(currUse)} - ? where email = ?`),
                [
                    data.m,
                    data.email
                ],
                (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    //update vào tài khoản thật
                    db.query(`update account set balance = balance + ? where email = ? and type = 1`, [money, data.email])

                    const type = {
                        type: `Nạp nhanh ${currUse.toUpperCase()} -> Live Account`,
                        type_en: `Quick Load ${currUse.toUpperCase()} -> Live Account`,
                        type_cam: `ផ្ទុករហ័ស ${currUse.toUpperCase()} -> គណនីផ្ទាល់`
                    };

                    //==== IN vào lịch sử
                    db.query(`insert into trade_history (email, from_u, to_u, type_key, type, type_en, type_cam, currency, amount, note, status, created_at)
                      values(?,?,?,?,?,?,?,?,?,?,?,now())`,
                        [
                            data.email,
                            data.nick,
                            data.uidLive,
                            'nn', // Nạp nhanh
                            type.type,
                            type.type_en,
                            type.type_cam,
                            currUse,
                            data.m,
                            data.gc,
                            1
                        ])

                    return callback(null, results)
                }
            )
        } else {
            return callback(null, [])
        }
    },

    UserBuyVIP: (data, callback) => {
        const redataSys = Helper.getConfig(fileSys);

        let currUse = redataSys.typeCurrUseSys.toLowerCase()
        let money = 0
        if (currUse == 'usdt' || currUse == 'paypal') {
            money = data.amount
        } else if (currUse == 'eth') {
            money = data.amount / currUse.quotePriceETH
        } else if (currUse == 'btc') {
            money = data.amount / currUse.quotePriceBTC
        }

        db.query(
            mysql_real_escape_string(`update users set money_${currUse} = money_${currUse} - ?, vip_user = 1, level_vip = 1 where email = ?`),
            [
                money,
                data.email
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                const type = {
                    type: `Mua thành viên VIP`,
                    type_en: `Buy VIP membership`,
                    type_cam: `ទិញសមាជិកភាព VIP`
                };

                //==== IN vào lịch sử
                db.query(`insert into trade_history (email, from_u, to_u, type_key, type, type_en, type_cam, currency, amount, note, status, created_at)
                values(?,?,?,?,?,?,?,?,?,?,?,now())`,
                    [
                        data.email,
                        data.nick,
                        data.nick,
                        'mv', // Mua Vip
                        type.type,
                        type.type_en,
                        type.type_cam,
                        currUse,
                        data.amount,
                        '',
                        1
                    ], (error, results, fields) => {
                        if (error) {
                            return callback(error);
                        }

                        // chia tiền Hoa Hồng VIP cho F1 của mình 50%
                        // kiểm tra ai là f1 của mình
                        CongTienHoaHongVIP(data.email)
                    })
                return callback(null, results)
            }
        )
    },

    getNguoiGioiThieu: async (email, callback) => {
        let obj = {
            nick: '', // tên người giới thệu
            tsdl: 0, // tổng số đại lý
            tsngd: 0, // tổng số nhà giao dịch
            hhdl: 0, // Hoa hồng đại lý
            hhgd: 0, // hoa hồng giao dịch
            hhttisMe: 0, // hoa hồng tuần của f1 đại lý
            tsdlisMe: 0, // tổng số đại lý
            tslgdCD1: 0, // tổng số lượng giao dịch tháng này
            tslgdCD2: 0, // tổng số lượng giao dịch tháng 2
            tslgdCD3: 0, // tổng số lượng giao dịch tháng 3
            tslgdCD4: 0, // tổng số lượng giao dịch tháng 4
            t1: '',
            t2: '',
            t3: '',
            t4: '',
        }, upline_id = '', refForMe = '', lvVip = 0;

        await new Promise((resolve, reject) => {
            // lấy tên người f1 mà chính mình đã đăng ký
            db.query(
                `SELECT upline_id, ref_code, level_vip, pending_commission AS hhforme, commission_vip AS hhdl FROM users WHERE email = ?`,
                [
                    email
                ],
                (error, results, fields) => {
                    if (error) {
                        resolve([]);
                    }

                    upline_id = results[0].upline_id ? results[0].upline_id : '';
                    refForMe = results[0].ref_code
                    lvVip = results[0].level_vip
                    obj.hhdl = results[0].hhdl

                    resolve();
                })

                
        })

        await new Promise((resolve, reject) => {
            db.query(
                `select 
                SUM(pending_commission) AS tshhMoi 
                FROM commission_history WHERE ref_id = ?`,
                [
                    refForMe
                ], (error, results, fields) => {
                    if (error) {
                        resolve([]);
                    }

                    obj.hhgd = Number.parseFloat(results[0].tshhMoi) || 0;
                    resolve();
                })
        });

        await new Promise((resolve, reject) => {
            // Tổng số hoa hồng tháng trước
            db.query(
                `select 
                SUM(personal_trading_volume) AS tslgdCD,
                COUNT(personal_trading_volume) AS tslgdMoi,
                COUNT(pending_commission) AS tshhMoi 
                FROM commission_history WHERE upline_id = ? AND MONTH(created_at) = MONTH(NOW()) - 1`,
                [
                    refForMe
                ], (error, results, fields) => {
                    if (error) {
                        resolve([]);
                    }

                    obj.tshhmtt = Number.parseFloat(results[0].tshhMoi) || 0;
                    resolve();
                })
        })


        let listAgent = await new Promise((resolve, reject) => {
            // tổng số đại lý ( đã mua vip ) của bản thân
            // AND vip_user = ?
            db.query(
                `SELECT email FROM users WHERE upline_id = ? AND vip_user = ?`,
                [
                    refForMe,
                    1
                ], (error, results, fields) => {
                    if (error) {
                        resolve([]);
                    }

                    if (results[0]) {
                        obj.tsdlisMe = results.length
                    }

                    resolve(results);
                })
        })

       
        let volGD = await new Promise((resolve, reject) => {
            // tổng số đại lý ( đã mua vip ) của bản thân
            // AND vip_user = ?
            db.query(
                `SELECT COALESCE(SUM(bet_history.amount_bet),0) AS hhttisMe FROM bet_history
                JOIN users ON bet_history.email = users.email
                WHERE users.upline_id = ? AND bet_history.type_account = 1 AND bet_history.marketing = 0 AND WEEKOFYEAR(bet_history.created_at) = WEEKOFYEAR(NOW()) `,
                [
                    refForMe
                ], (error, results, fields) => {
                    if (error) {
                        resolve([]);
                    }

                    resolve(results[0].hhttisMe);
                })
        })

        let volCP = await new Promise((resolve, reject) => {
            // tổng số đại lý ( đã mua vip ) của bản thân
            // AND vip_user = ?
            db.query(
                `SELECT COALESCE(SUM(copy_trade_history.value),0) AS hhttisMe FROM copy_trade_history
                JOIN users ON copy_trade_history.email = users.email
                WHERE users.upline_id = ? AND copy_trade_history.acc_type = 1 AND users.marketing = 0 AND WEEKOFYEAR(copy_trade_history.created_at) = WEEKOFYEAR(NOW())
                                                         `,
                [
                    refForMe
                ], (error, results, fields) => {
                    if (error) {
                        resolve([]);
                    }

                    resolve(results[0].hhttisMe);
                })
        })

        let tongNhaDauTu = await new Promise((resolve, reject) => {
            
            db.query(
                `SELECT COUNT(u.id) as count, SUM(case when u.vip_user = 1 then 1 else 0 end) as vip FROM 
                (
                
                SELECT c1.* FROM users as main 
                JOIN users as c1 ON c1.upline_id = main.ref_code 
                WHERE main.ref_code = ?
                
                UNION
                SELECT c2.* FROM users as main 
                JOIN users as c1 ON c1.upline_id = main.ref_code 
                JOIN users as c2 ON c1.ref_code = c2.upline_id
                WHERE main.ref_code = ?
                
                UNION 
                SELECT c3.* FROM users as main 
                JOIN users as c1 ON c1.upline_id = main.ref_code 
                JOIN users as c2 ON c1.ref_code = c2.upline_id
                JOIN users as c3 ON c2.ref_code = c3.upline_id
                WHERE main.ref_code = ?
                
                UNION 
                
                SELECT c4.* FROM users as main 
                JOIN users as c1 ON c1.upline_id = main.ref_code 
                JOIN users as c2 ON c1.ref_code = c2.upline_id
                JOIN users as c3 ON c2.ref_code = c3.upline_id
                JOIN users as c4 ON c3.ref_code = c4.upline_id
                WHERE main.ref_code = ?
                
                UNION
                
                SELECT c5.* FROM users as main 
                JOIN users as c1 ON c1.upline_id = main.ref_code 
                JOIN users as c2 ON c1.ref_code = c2.upline_id
                JOIN users as c3 ON c2.ref_code = c3.upline_id
                JOIN users as c4 ON c3.ref_code = c4.upline_id
                JOIN users as c5 ON c4.ref_code = c5.upline_id
                WHERE main.ref_code = ?
                ) as u 
                WHERE u.marketing = 0`,
                [
                    refForMe,
                    refForMe,
                    refForMe,
                    refForMe,
                    refForMe,
                ], (error, results, fields) => {
                    if (error) {
                        resolve([]);
                    }

                    resolve(results[0]);
                })
        })
        
        obj.hhttisMe = parseFloat(volCP) + parseFloat(volGD);
        obj.tsngd = tongNhaDauTu.count;
        obj.tsdl = tongNhaDauTu.vip;

        if (upline_id !== '') {
            await new Promise((resolve, reject) => {
                // nếu tồn tại F0 của mình 
                db.query(
                    `SELECT nick_name FROM users WHERE ref_code = ?`,
                    [upline_id], (error, results, fields) => {
                        if (error) {
                            resolve([]);
                        }

                        try {
                            obj.nick = results[0].nick_name
                        } catch (error) {
                            upline_id = '-------';
                        }

                        //==================================================
                        resolve();
                        //return callback(null, obj)
                    })
            })
        } else {
            upline_id = '-------';
        }

        return callback(null, obj);
    },

    getBoStatistics: async (email, callback) => {
        // lấy tài khoản thực của email

        var obj = {
            //bet_amount: order_amount,
            down: 0, // số lần sell
            down_rate: 0, // tỉ lệ sell

            lose: 0,
            profits: 0, // lợi nhuận rồng
            refund: 0, // hoàn tiền           
            revenue: 0, // tổng doanh thu

            trades: 0, // tổng tiền giao dịch

            up: 0, // số lần buy
            up_rate: 0, // tỉ lệ buy

            win: 0,
            win_rate: 0
        }, uid = 0;
        await new Promise((resolve, reject) => {
            db.query(
                `select * from account where email = ? and type = 1`,
                [
                    email
                ],
                (error, results, fields) => {
                    if (results.length == 0) {
                        //return callback(null);
                        resolve()
                    }

                    let rs = results[0];
                    uid = rs.u_id;

                    let win = rs.win;
                    let lose = rs.lose;
                    //let withdrawal = results[0].withdrawal
                    //let deposit = results[0].deposit
                    let order_amount = rs.order_amount;

                    let total = win + lose;

                    let rateWin = (win / total) * 100;

                    obj.profits = win - lose; // lợi nhuận rồng   
                    obj.revenue = win; // tổng doanh thu

                    obj.trades = order_amount; // tổng tiền giao dịch
                    obj.win_rate = rateWin
                    resolve();
                })
        })
        if (uid == 0) {
            return callback(null);
        }

        await new Promise((resolve, reject) => {
            // lấy tổng lần đánh thắng, thua
            db.query(
                `SELECT 
                COUNT(amount_win) AS totalWin
                FROM bet_history WHERE id_account = ? AND type_account = 1 AND amount_win > 0 AND DATE(created_at) = DATE(NOW())`,
                [
                    uid
                ], (error, result, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    obj.win = result[0].totalWin
                    resolve();
                })
        })
        await new Promise((resolve, reject) => {
            db.query(
                `SELECT 
                COUNT(amount_lose) AS totalLose
                FROM bet_history WHERE id_account = ? AND type_account = 1 AND amount_lose > 0 AND DATE(created_at) = DATE(NOW())`,
                [
                    uid
                ], (error, result, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    obj.lose = result[0].totalLose
                    resolve();
                })
        })
        //Tong thang thua copy trade
        await new Promise((resolve, reject) => {
            db.query(
                `SELECT 
                COUNT(id) AS totalWin
                FROM copy_trade_history WHERE email = ? AND acc_type = 1 AND sum > 0 AND DATE(created_at) = DATE(NOW())`,
                [
                    email
                ], (error, result, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    obj.win += +result[0].totalWin
                    resolve();
                })
        })
        await new Promise((resolve, reject) => {
            db.query(
                `SELECT 
                COUNT(id) AS totalLose
                FROM copy_trade_history WHERE email = ? AND acc_type = 1 AND sum < 0 AND DATE(created_at) = DATE(NOW())`,
                [
                    email
                ], (error, result, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    obj.lose += +result[0].totalLose
                    resolve();
                })
        })
        //
        await new Promise((resolve, reject) => {
            db.query(
                `SELECT 
                COUNT(buy_sell) AS totalBUY
                FROM bet_history WHERE id_account = ? AND buy_sell = ? AND type_account = 1 AND DATE(created_at) = DATE(NOW())`,
                [
                    uid,
                    'buy'
                ], (error, result, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    obj.up = result[0].totalBUY
                    resolve();
                })
        })
        await new Promise((resolve, reject) => {
            db.query(
                `SELECT 
                COUNT(buy_sell) AS totalSell
                FROM bet_history WHERE id_account = ?  AND buy_sell = ? AND type_account = 1 AND DATE(created_at) = DATE(NOW())`,
                [
                    uid,
                    'sell'
                ], (error, result, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    obj.down = result[0].totalSell
                    resolve();
                })
        })

        // Buy SELL copy trade
        await new Promise((resolve, reject) => {
            db.query(
                `SELECT 
                COUNT(id) AS totalBUY
                FROM copy_trade_history WHERE email = ? AND trend = ? AND acc_type = 1 AND DATE(created_at) = DATE(NOW())`,
                [
                    email,
                    'buy'
                ], (error, result, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    obj.up += +result[0].totalBUY
                    resolve();
                })
        })

        await new Promise((resolve, reject) => {
            db.query(
                `SELECT 
                COUNT(id) AS totalSell
                FROM copy_trade_history WHERE email = ?  AND trend = ? AND acc_type = 1 AND DATE(created_at) = DATE(NOW())`,
                [
                    email,
                    'sell'
                ], (error, result, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    obj.down += +result[0].totalSell

                    let tt = obj.up + obj.down
                    let rateUp = (obj.up / tt) * 100
                    obj.up_rate = rateUp

                    resolve();
                })
        })
        //

        return callback(null, obj);
    },

    getBoStatisticsCurrentDay: async (email, callback) => {
        const obj = {
            win: 0,
            lose: 0,
        };
        await new Promise((resolve, reject) => {
            // lấy tổng lần đánh thắng, thua
            db.query(
                `SELECT 
                SUM(amount_bet) AS totalWin
                FROM bet_history WHERE email = ? AND type_account = 1 AND amount_win > 0 AND CAST(created_at AS DATE) = CAST(CURRENT_DATE() AS DATE)`,
                [email], (error, result, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    obj.win = result[0].totalWin || 0;
                    resolve();
                })
        })
        await new Promise((resolve, reject) => {
            db.query(
                `SELECT 
                SUM(amount_lose) AS totalLose
                FROM bet_history WHERE email = ? AND type_account = 1 AND amount_lose > 0 AND CAST(created_at AS DATE) = CAST(CURRENT_DATE() AS DATE)`,
                [email], (error, result, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    obj.lose = result[0].totalLose || 0;
                    resolve();
                })
        })

        return callback(null, obj);
    },

    getListHisOrder: (email, callback) => {
        // lấy tài khoản thực của email
        db.query(
            `select u_id from account where email = ? and type = 1`,
            [
                email
            ],
            async (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                if (!results) {
                    return callback(null, results[0])
                }

                let rs = results[0]
                var uid = rs.u_id

                // lấy danh sách order tài khoản thực
                const betHist = await new Promise((res, rej) => {
                    db.query(
                        `select 
                            amount_bet as ab,
                            amount_lose as al,
                            amount_win as aw,
                            buy_sell as bs,
                            close as c,
                            open as o,
                            created_at as d,
                            session as oss,
                            currency as cu from bet_history where id_account = ? and type_account = 1 AND DATE(created_at) = DATE(now()) ORDER BY id DESC LIMIT 20`,
                        [
                            uid
                        ],
                        (error, results, fields) => {
                            if (error) {
                                console.log(error)
                            }

                            return res(results)
                        })
                });

                var aiBetHist = await new Promise((res, rej) => {
                    db.query(
                        `SELECT 
                            value as ab,
                            sum as al,
                            sum as aw,
                            trend as bs,
                            close as c,
                            open as o,
                            created_at as d,
                            order_id as oss
                            FROM copy_trade_history WHERE (email = ? and acc_type = 1) AND DATE(created_at) = DATE(now()) ORDER BY id DESC LIMIT 20`,
                        [
                            email
                        ],
                        (error, results, fields) => {
                            if (error) {
                                console.log(error)
                            }

                            res(results)
                        })
                });

                return callback(null, [...betHist, ...aiBetHist].sort((a, b) => {
                    return new Date(b.d) - new Date(a.d)
                }).slice(0, 20))
            })
    },

    getListHisOrderDate: (data, callback) => {
        console.log(data)
        // lấy tài khoản thực của email
        db.query(
            `select u_id from account where email = ? and type = 1`,
            [
                data.email
            ],
            async (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                if (!results) {
                    return callback(null, results[0])
                }

                let rs = results[0]
                let uid = rs.u_id

                // lấy danh sách order tài khoản thực
                var betHist = await new Promise((res, rej) => {
                    db.query(
                        `SELECT 
                            amount_bet as ab,
                            amount_lose as al,
                            amount_win as aw,
                            buy_sell as bs,
                            close as c,
                            open as o,
                            created_at as d,
                            session as oss,
                            currency as cu FROM bet_history WHERE (id_account = ? and type_account = 1) AND DATE(created_at) = DATE(NOW()) ORDER BY id DESC`,
                        [
                            uid
                        ],
                        (error, results, fields) => {
                            res(results)
                        })
                });

                var aiBetHist = await new Promise((res, rej) => {
                    db.query(
                        `SELECT 
                            value as ab,
                            sum as al,
                            sum as aw,
                            trend as bs,
                            close as c,
                            open as o,
                            created_at as d,
                            order_id as oss
                            FROM copy_trade_history WHERE (email = ? and acc_type = 1) AND (created_at >= ? AND created_at < ?) ORDER BY id DESC`,
                        [
                            data.email,
                            data.s,
                            data.e + ' 23:59:59'
                        ],
                        (error, results, fields) => {
                            if (error) {
                                console.log(error)
                            }

                            res(results)
                        })
                });

                return callback(null, [...betHist, ...aiBetHist].sort((a, b) => {
                    return new Date(b.d) - new Date(a.d)
                }))
            })
    },

    getListHisTradeWallet: (nick, callback) => {
        db.query(
            `SELECT * FROM trade_history WHERE (from_u = ? OR to_u = ?) ORDER BY id DESC LIMIT 10 `,
            [
                nick,
                nick
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                // tổng reco 
                db.query(
                    `SELECT COUNT(from_u) AS totalCount FROM trade_history WHERE (from_u = ? OR to_u = ?)`,
                    [
                        nick,
                        nick
                    ],
                    (error, result, fields) => {
                        if (error) {
                            return callback(error);
                        }

                        results['count'] = result[0].totalCount
                        return callback(null, results)
                    })
            })
    },

    getListHisTradeWalletPage: (data, callback) => {
        // lấy tài khoản thực của email
        let count_per_page = 10;
        let page_number = Number(data.page)
        if (page_number == 1) page_number = 0
        let next_offset = (page_number - 1) * count_per_page

        db.query(
            `SELECT * FROM trade_history WHERE from_u = ? AND type_key != ? AND DATE(created_at) = DATE(now()) ORDER BY id DESC LIMIT ? OFFSET ? `,
            [
                data.nick,
                'hh',
                count_per_page,
                next_offset > 0 ? next_offset : 0
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results)
            })
    },

    getListHisTradeWalletHH: (email, callback) => {
        db.query(
            `SELECT ref_code FROM users WHERE email = ?`,
            [
                email,
            ], (error, res, fields) => {
                let ref_id = res[0].ref_code;
                // lấy tài khoản thực của email
                db.query(
                    `SELECT * FROM commission_history WHERE ((upline_id = ? AND type = ?) OR (ref_id = ? AND type = ?)) AND DATE(created_at) = DATE(now()) ORDER BY id DESC LIMIT 10`,
                    [
                        ref_id,
                        'hhv',
                        ref_id,
                        'klgd',
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return callback(error);
                        }

                        results['count'] = results.length;
                        return callback(null, results)
                    })
            })
    },

    getListHisTradeWalletHHPage: (data, callback) => {
        // lấy tài khoản thực của email
        let count_per_page = 10;
        let page_number = Number(data.page)
        if (page_number == 1) page_number = 0
        let next_offset = page_number * count_per_page
        db.query(
            `SELECT ref_code FROM users WHERE email = ?`,
            [
                data.email,
            ], (error, res, fields) => {
                let ref_id = res[0].ref_code;
                db.query(
                    `SELECT * FROM commission_history WHERE ((upline_id = ? AND type = ?) OR (ref_id = ? AND type = ?)) AND DATE(created_at) = DATE(now()) ORDER BY id DESC LIMIT ? OFFSET ?`,
                    [
                        ref_id,
                        'hhv',
                        ref_id,
                        'klgd',
                        count_per_page,
                        next_offset
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return callback(error);
                        }

                        return callback(null, results)
                    })
            })
    },

    getListHisTradeWalletWGD: (nick, callback) => {
        // lấy tài khoản thực của email
        db.query(
            `SELECT * FROM trade_history WHERE (from_u = ? OR to_u = ?) AND (type_key = ? OR type_key = ?) AND DATE(created_at) = DATE(now()) ORDER BY id DESC LIMIT 10`,
            [
                nick,
                nick,
                'ctas',
                'ctsa'
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                // tổng reco 
                db.query(
                    `SELECT COUNT(from_u) AS totalCount FROM trade_history WHERE (from_u = ? OR to_u = ?) AND (type_key = ? OR type_key = ?) AND DATE(created_at) = DATE(now())`,
                    [
                        nick,
                        nick,
                        'ctas',
                        'ctsa'
                    ],
                    (error, result, fields) => {
                        if (error) {
                            return callback(error);
                        }

                        results['count'] = result[0].totalCount
                        return callback(null, results)
                    })
            })
    },

    getListHisTradeWalletWGDPage: (data, callback) => {
        // lấy tài khoản thực của email
        let count_per_page = 10;
        let page_number = Number(data.page)
        if (page_number == 1) page_number = 0
        let next_offset = page_number * count_per_page

        db.query(
            `SELECT * FROM trade_history WHERE from_u = ? AND (type_key = ? OR type_key = ?) AND DATE(created_at) = DATE(now()) ORDER BY id DESC LIMIT ? OFFSET ? `,
            [
                data.nick,
                'ctas',
                'ctsa',
                count_per_page,
                next_offset
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results)
            })
    },

    getComDetails: (email, callback) => {
        // lấy
        db.query(
            `select ref_code from users where email = ?`,
            [
                email
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                if (!results) {
                    return callback(null, results[0])
                }

                let rs = results[0]
                let uid = rs.ref_code

                db.query(
                    `SELECT 
                        SUM(pending_commission) AS thanhtoan, 
                        COUNT(pending_commission) AS soluongGD,
                        COUNT(upline_id) AS sonhaGD,
                        created_at AS dt 
                        FROM commission_history WHERE upline_id = ? GROUP BY DATE(created_at) ORDER BY id DESC LIMIT 10`,
                    [
                        uid
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return callback(error);
                        }

                        // tổng reco 
                        db.query(
                            `SELECT 
                                COUNT(pending_commission) AS totalCount 
                                FROM commission_history WHERE upline_id = ? GROUP BY DATE(created_at) ORDER BY id DESC`,
                            [
                                uid
                            ],
                            (error, result, fields) => {
                                if (error) {
                                    return callback(error);
                                }

                                if (result.length != 0) {
                                    results['count'] = result[0].totalCount
                                } else {
                                    results['count'] = 0
                                }

                                return callback(null, results)
                            })
                    })
            })
    },

    getComDetailsPage: (data, callback) => {
        // lấy tài khoản thực của email
        let count_per_page = 10;
        let page_number = Number(data.page)
        if (page_number == 1) page_number = 0
        let next_offset = page_number * count_per_page

        // lấy tài khoản thực của email
        db.query(
            `select ref_code from users where email = ?`,
            [
                data.email
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                if (!results) {
                    return callback(null, results[0])
                }

                let rs = results[0]
                let uid = rs.ref_code

                db.query(
                    `SELECT 
                        SUM(pending_commission) AS thanhtoan, 
                        COUNT(pending_commission) AS soluongGD,
                        COUNT(upline_id) AS sonhaGD,
                        created_at AS dt 
                        FROM commission_history WHERE upline_id = ? GROUP BY DATE(created_at) ORDER BY id DESC LIMIT ? OFFSET ? `,
                    [
                        uid,
                        count_per_page,
                        next_offset
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return callback(error);
                        }

                        return callback(null, results)
                    })
            })
    },

    getComDetailsDate: async (data, callback) => {
        let Rs = [];

        await new Promise((res, rej) => {
            // lấy
            db.query(
                `select ref_code from users where email = ?`,
                [
                    data.email
                ],
                (error, results, fields) => {
                    if (error) {
                        //return callback(error);
                        res(Rs);
                    }

                    if (!results) {
                        //return callback(null, results[0])
                        res(Rs);
                    }

                    let rs = results[0];
                    let uid = rs.ref_code;

                    let daysBetween = (Date.parse(data.e) - Date.parse(data.s)) / (24 * 3600 * 1000)

                    if (daysBetween < 0) {
                        //return callback(null, Rs)
                        res(Rs);
                    }

                    daysBetween++; // cộng thêm 1 ngày

                    let min = 0;

                    if (data.t == 1) {
                        // khối lượng hoa hồng giao dịch
                        for (let i = 0; i < daysBetween; i++) {
                            db.query(
                                `SELECT 
                                    SUM(pending_commission) AS thanhtoan, 
                                    SUM(personal_trading_volume) AS klgd,
                                    COUNT(pending_commission) AS soluongGD,
                                    DATE_FORMAT(created_at, '%Y-%m-%d') AS dt 
                                    FROM commission_history WHERE type = ? AND ref_id = ? AND DATE(created_at) = DATE(?) - ? GROUP BY DATE_FORMAT(created_at, '%Y-%m-%d')`,
                                [
                                    'klgd', // hoa hồng giao dịch
                                    uid,
                                    data.e,
                                    i
                                ],
                                (error, results, fields) => {
                                    if (error) {
                                        //return callback(error);
                                        res(Rs);
                                    }

                                    min++;
                                    if (Array.isArray(results) && results.length > 0) Rs.push(results[0]);
                                    if (min == daysBetween) res();
                                })
                        }
                    } else {
                        // khối lượng hoa hồng vip giao dịch
                        for (let i = 0; i < daysBetween; i++) {
                            db.query(
                                `SELECT 
                                    SUM(vip_commission) AS doanhso, 
                                    created_at AS dt 
                                    FROM commission_history WHERE type = ? AND ref_id = ? AND DATE(created_at) = DATE(?) - ? GROUP BY DATE(created_at)`,
                                [
                                    'hhv',
                                    uid,
                                    data.e,
                                    i
                                ],
                                (error, results, fields) => {
                                    if (error) {
                                        res(error);
                                    }

                                    min++;
                                    if (results.length > 0) Rs.push(results[0])
                                    if (min == daysBetween) res();
                                })
                        }
                    }
                })
        })
        return callback(null, Rs);
    },

    getAgencySearchLevel: async (data, callback) => {
        let dt = moment().tz("Asia/Ho_Chi_Minh");
        let dt1 = moment().tz("Asia/Ho_Chi_Minh");
        let dt2 = moment().tz("Asia/Ho_Chi_Minh");

        let cach30ngay = dt.subtract(30, 'days').format("YYYY-MM-DD");
        let cach7ngay = dt1.subtract(7, 'days').format("YYYY-MM-DD");
        let cach1ngay = dt2.subtract(1, 'days').format("YYYY-MM-DD");

        //let currentDate = new Date()
        //let cach30ngay =  new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDay() - 30) 
        //let cach7ngay =  new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDay() - 7) 
        //let cach1ngay =  new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDay() - 1) 

        //let c30n =  cach30ngay.getFullYear() + '-' + cach30ngay.getMonth() + '-' + cach30ngay.getDay()
        //let c7n =  cach7ngay.getFullYear() + '-' + cach7ngay.getMonth() + '-' + cach7ngay.getDay()
        //let c1n =  cach1ngay.getFullYear() + '-' + cach1ngay.getMonth() + '-' + cach1ngay.getDay()

        let c30n = cach30ngay;
        let c7n = cach7ngay;
        let c1n = cach1ngay;

        let n = data.kc, ac = 0;

        if (n == 30) {
            ac = c30n;
        } else if (n == 7) {
            ac = c7n;
        } else if (n == 1) {
            ac = c1n;
        } else {
            ac = 0;
        }

        let refID, UpID, listCap = [];
        let Level = data.id;
        // lấy danh sách 7 cấp dưới của mình 
        let listData = {
            "cap1": [],
            "cap2": [],
            "cap3": [],
            "cap4": [],
            "cap5": [],
            "cap6": [],
            "cap7": [],
            "cap8": [],
            "cap9": [],
            "cap10": [],
            "cap11": [],
            "cap12": [],
            "cap13": [],
            "cap14": [],
            "cap15": []
        };

        await new Promise((res, rej) => {
            db.query(
                `SELECT upline_id, ref_code FROM users WHERE email = ?`,
                [
                    data.email
                ],
                (error, results, fields) => {
                    if (error) {
                        res([]);
                    }

                    if (!results) {
                        res([]);
                    }

                    let rs = results[0];
                    refID = rs.ref_code; // ref_code của mình
                    UpID = rs.upline_id;
                    res();
                }
            )
        });

        // let dataList = await new Promise((res, rej) => {
        // 	//SELECT  upline_id, ref_code 
        // 	//FROM (SELECT * FROM users
        //     //            ORDER BY upline_id) users_sorted,
        //     //            (SELECT @pv := 'RYIFCWS') initialisation
        //     //    WHERE find_in_set(upline_id, @pv)
        //     //    AND length(@pv := concat(@pv, ',', ref_code));

        //     db.query(`with recursive cte (level_vip, tklgd, ref_code, upline_id, nick_name) as (
        // 			  select     level_vip,
        // 						 pricePlay,
        // 						 ref_code,
        // 						 upline_id,
        // 						 nick_name
        // 			  from       users
        // 			  where      upline_id = ?
        // 			  union all
        // 			  select     p.level_vip,
        // 						 p.pricePlay,
        // 						 p.ref_code,
        // 						 p.upline_id,
        // 						 p.nick_name
        // 			  from       users p
        // 			  inner join cte
        // 					  on p.upline_id = cte.ref_code
        // 			)
        // 			select * from cte;`, 
        //         [
        // 			refID
        // 		], (error, result, fields) => {
        // 			//console.log(result);
        //             //let count = result.length;
        //             //if(count > 0){
        //                 res(result)
        //             //}
        //         }
        //     )

        // });

        let cap1 = false, cap2 = false, cap3 = false, cap4 = false, cap5 = false, cap6 = false, cap7 = false;
        // lấy cấp 1
        await new Promise((res, rej) => {
            db.query(
                `SELECT level_vip, order_amount AS tklgd, ref_code, upline_id, nick_name FROM users
                JOIN account ON users.email = account.email AND account.type = 1
                WHERE upline_id = ?`,
                [
                    refID
                ], (error, result, fields) => {
                    if (result.length > 0) {
                        result.forEach((ele) => {
                            listData['cap1'].push(ele);
                        })
                        cap1 = true;
                    }

                    res();
                }
            )
        })

        if (cap1) {
            for (let i = 0; i < listData['cap1'].length; i++) {
                await new Promise((resolve, reject) => {
                    db.query(
                        `SELECT level_vip, order_amount AS tklgd, ref_code, upline_id, nick_name FROM users
                        JOIN account ON users.email = account.email AND account.type = 1
                        WHERE upline_id = ?`,
                        [
                            listData['cap1'][i].ref_code
                        ], (error, result, fields) => {
                            if (result.length > 0) {
                                result.forEach((ele) => {
                                    listData['cap2'].push(ele);
                                });
                                cap2 = true;
                            }

                            resolve();
                        }
                    )
                })
            }
        }

        if (cap2) {
            for (let i = 0; i < listData['cap2'].length; i++) {
                await new Promise((resolve, reject) => {
                    db.query(
                        `SELECT level_vip, order_amount AS tklgd, ref_code, upline_id, nick_name FROM users
                        JOIN account ON users.email = account.email AND account.type = 1
                        WHERE upline_id = ?`,
                        [
                            listData['cap2'][i].ref_code
                        ], (error, result, fields) => {
                            if (result.length > 0) {
                                result.forEach((ele) => {
                                    listData['cap3'].push(ele);
                                });
                                cap3 = true;
                            }

                            resolve();
                        }
                    )
                })
            }
        }

        if (cap3) {
            for (let i = 0; i < listData['cap3'].length; i++) {
                await new Promise((resolve, reject) => {
                    db.query(
                        `SELECT level_vip, order_amount AS tklgd, ref_code, upline_id, nick_name FROM users
                        JOIN account ON users.email = account.email AND account.type = 1
                        WHERE upline_id = ?`,
                        [
                            listData['cap3'][i].ref_code
                        ], (error, result, fields) => {
                            if (result.length > 0) {
                                result.forEach((ele) => {
                                    listData['cap4'].push(ele);
                                });
                                cap4 = true;
                            }

                            resolve();
                        }
                    )
                })
            }
        }

        if (cap4) {
            for (let i = 0; i < listData['cap4'].length; i++) {
                await new Promise((resolve, reject) => {
                    db.query(
                        `SELECT level_vip, order_amount AS tklgd, ref_code, upline_id, nick_name FROM users
                        JOIN account ON users.email = account.email AND account.type = 1
                        WHERE upline_id = ?`,
                        [
                            listData['cap4'][i].ref_code
                        ], (error, result, fields) => {
                            if (result.length > 0) {
                                result.forEach((ele) => {
                                    listData['cap5'].push(ele);
                                });
                                cap5 = true;
                            }

                            resolve();
                        }
                    )
                })
            }
        }

        if (cap5) {
            for (let i = 0; i < listData['cap5'].length; i++) {
                await new Promise((resolve, reject) => {
                    db.query(
                        `SELECT level_vip, order_amount AS tklgd, ref_code, upline_id, nick_name FROM users
                        JOIN account ON users.email = account.email AND account.type = 1
                        WHERE upline_id = ?`,
                        [
                            listData['cap5'][i].ref_code
                        ], (error, result, fields) => {
                            if (result.length > 0) {
                                result.forEach((ele) => {
                                    listData['cap6'].push(ele);
                                });
                                cap6 = true;
                            }

                            resolve();
                        }
                    )
                })
            }
        }

        if (cap6) {
            for (let i = 0; i < listData['cap6'].length; i++) {
                await new Promise((resolve, reject) => {
                    db.query(
                        `SELECT level_vip, order_amount AS tklgd, ref_code, upline_id, nick_name FROM users
                        JOIN account ON users.email = account.email AND account.type = 1
                        WHERE upline_id = ?`,
                        [
                            listData['cap6'][i].ref_code
                        ], (error, result, fields) => {
                            if (result.length > 0) {
                                result.forEach((ele) => {
                                    listData['cap7'].push(ele);
                                });
                                cap7 = true;
                            } else {
                                cap7 = false;
                            }

                            resolve();
                        }
                    )
                })
            }
        }

        //if(cap7){
        //   for(let i = 0;  i < listData['cap7'].length; i++){
        //       db.query(
        //           `SELECT level_vip, pricePlay AS tklgd, ref_code, upline_id, nick_name FROM users WHERE upline_id = ?`, 
        //           [
        //               listData['cap7'][i].ref_code
        //           ], (error, result, fields) => {
        //               if(result.length > 0){
        //                   result.forEach((ele) => {
        //                       listData['cap7'].push(ele);
        //                   });
        //                  //cap7 = true;
        //              }
        //          }
        //      )
        //      await sleep(50);
        //  }
        //}

        // if(dataList.length > 0){
        //     let u = 0, check = '';
        //     dataList.forEach((ele) => {
        // 		if(check != ele.upline_id){
        // 			u++;
        // 			check = ele.upline_id;
        // 		} 
        // 		if(u <= 7){
        // 			listData[`cap${u}`].push(ele);
        // 		}

        //     })

        // }

        //await sleep(100);

        for (let i = 0; i < listData[`cap${Level}`].length; i++) {
            let qrr = `SELECT SUM(pending_commission) AS thhn FROM commission_history WHERE ref_id = ? AND type = ? AND created_at > '${mysql_real_escape_string(ac)}'`;
            db.query((qrr),
                [
                    listData[`cap${Level}`][i].ref_code,
                    'klgd'
                ],
                (error2, resu, fields2) => {
                    if (resu[0].thhn !== null) {
                        listData[`cap${Level}`][i].thhn = resu[0].thhn;
                    } else {
                        listData[`cap${Level}`][i].thhn = 0;
                    }
                });
            await sleep(100);
        }

        return callback(null, listData[`cap${Level}`]);
    },

    getAgencySearchName: async (data, callback) => {
        if (data.name == '') return callback(null);

        let dt = moment().tz("Asia/Ho_Chi_Minh");
        let dt1 = moment().tz("Asia/Ho_Chi_Minh");
        let dt2 = moment().tz("Asia/Ho_Chi_Minh");

        let cach30ngay = dt.subtract(30, 'days').format("YYYY-MM-DD");
        let cach7ngay = dt1.subtract(7, 'days').format("YYYY-MM-DD");
        let cach1ngay = dt2.subtract(1, 'days').format("YYYY-MM-DD");

        let c30n = cach30ngay;
        let c7n = cach7ngay;
        let c1n = cach1ngay;

        let n = data.kc, ac = 0;

        if (n == 30) {
            ac = c30n;
        } else if (n == 7) {
            ac = c7n;
        } else if (n == 1) {
            ac = c1n;
        } else {
            ac = 0;
        }

        let listData = await new Promise((res, rej) => {
            db.query(
                `select ref_code from users where email = ?`,
                [
                    data.email
                ],
                (error, results, fields) => {
                    if (error) {
                        res([])
                    }

                    if (!results) {
                        res([])
                    }

                    let rs = results[0]
                    let uid = rs.ref_code; // ref_code của mình
                    let name = data.name

                    let qr = ''

                    // lấy thông tin đại lý 
                    if (ac == 0) {
                        qr = `select level_vip, pricePlay AS tklgd, nick_name, ref_code from users where nick_name LIKE CONCAT('%${name}%') ORDER BY id DESC`
                    } else {
                        qr = `select level_vip, pricePlay AS tklgd, nick_name, ref_code from users where (nick_name LIKE CONCAT('%${name}%') AND created_at > '${ac}') ORDER BY id DESC`
                    }

                    db.query((qr),
                        [
                            uid
                        ],
                        (error, results, fields) => {
                            if (error) {
                                rej(error);
                            }

                            if (results.length == 0) {
                                return callback(null);
                            }

                            res(results)
                        })
                })
        });

        await new Promise((res, rej) => {
            let qrr = '';
            //if(ac == 0){
            //    qrr = `select SUM(personal_trading_volume) AS thhn from commission_history where ref_id = ? ORDER BY id DESC`
            //}else{
            qrr = `SELECT SUM(pending_commission) AS thhn FROM commission_history WHERE ref_id = ? AND type = ? AND created_at > '${mysql_real_escape_string(ac)}'`
            //}

            let min = 0;
            let max = listData.length;

            if (max == 0) res([]);

            listData.forEach(function (result) {
                // lấy thông tin hoa hồng // personal_trading_volume AS thhn,
                db.query((qrr),
                    [
                        result.ref_code,
                        'klgd'
                    ],
                    (error, resu, fields) => {
                        if (void 0 !== resu) listData[min].thhn = resu[0].thhn;
                        min++;
                        if (min == max) res(listData);
                    })
            });
        });

        return callback(null, listData)
    },

    updateSecret2FA: (data, callback) => {
        db.query(
            `UPDATE users SET active_2fa = 1, secret_2fa = ?, code_secure = ?, active_type = ? WHERE email = ?`,
            [
                data.s,
                null,
                1,
                data.e,
            ], (error, results, fields) => {
                if (error) {
                    return error;
                }

                return callback(null, results)
            }
        )
    },
    active2FA: async (data, callback) => {

        let user = await new Promise((resolve, reject) => {
            db.query(
                `SELECT email, code_telegram, generate_code_time, active_2fa FROM users WHERE email = ?`, [data.email], (error, results, fields) => {
                    if (error) {
                        resolve([]);
                    }
    
                    resolve(results);
                })
        });

        if(user.length == 0){

            return callback(null, {
                success:0,
                message: "Not found user"
            });
        }


        if(user[0].active_2fa){
            return callback(null, {
                success:0,
                message: "user actived"
            });
        }

        if(user[0].code_telegram != data.code){
            return callback(null, {
                success:2,
                message: "Code not matching"
            });
        }

        db.query(
            `UPDATE users SET active_2fa = 1,active_type = 2 WHERE email = ?`,
            [
                data.email
            ], (error, results, fields) => {
                if (error) {
                    return error;
                }

                return callback(null, results)
            }
        )

        return callback(null, {
            success:1,
        });

    },
    unactive2FA: async (data, callback) => {

        let user = await new Promise((resolve, reject) => {
            db.query(
                `SELECT email, code_telegram, generate_code_time, active_2fa FROM users WHERE email = ?`, [data.email], (error, results, fields) => {
                    if (error) {
                        resolve([]);
                    }
    
                    resolve(results);
                })
        });

        if(user.length == 0){

            return callback(null, {
                success:0,
                message: "Not found user"
            });
        }


        if(!user[0].active_2fa){
            return callback(null, {
                success:0,
                message: "user not active"
            });
        }

        if(user[0].code_telegram != data.code){
            return callback(null, {
                success:2,
                message: "Code not matching"
            });
        }

        db.query(
            `UPDATE users SET active_2fa = 0,active_type = 0 WHERE email = ?`,
            [
                data.email
            ], (error, results, fields) => {
                if (error) {
                    return error;
                }

                return callback(null, results)
            }
        )

        return callback(null, {
            success:1,
        });

    },

    Disabled2FA: (email, callback) => {
        db.query(
            `UPDATE users SET active_2fa = 0, secret_2fa = null, code_secure = null,active_type=0 WHERE email = ?`,
            [
                email
            ], (error, results, fields) => {
                if (error) {
                    return error;
                }

                return callback(null, results)
            }
        )
    },

    updateCodeSecure: (data, callback) => {
        db.query(
            `UPDATE users SET code_secure = ? WHERE email = ?`,
            [
                data.code,
                data.email
            ], (error, results, fields) => {
                if (error) {
                    return error;
                }

                return callback(null, results)
            }
        )
    },
    updateCodeSecureTele: (data, callback) => {
        db.query(
            `UPDATE users SET code_telegram = ?,generate_code_time = NOW() WHERE email = ?`,
            [
                data.code,
                data.email,

            ], (error, results, fields) => {
                if (error) {
                    return error;
                }

                return callback(null, results)
            }
        )
    },

    getSecrect2FA: (email, callback) => {
        db.query(
            `select secret_2fa from users where email = ?`,
            [
                email,
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results[0])
            }
        )
    },

    checkCodeSecure2FA: (data, callback) => {
        db.query(
            `select code_secure, password from users where email = ? AND code_secure = ?`,
            [
                data.email,
                data.code
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results[0])
            }
        )
    },

    getListAnalytics: async (data, callback) => {
        const obj = {
            nNDK: 0, // số người đăng ký
            nNDXM: 0,  // số người xác minh
            nDL: 0, // số đại lý ( thành viên VIP )
            tsTN: 0, // tổng số tiền nạp

            tsNNT: 0, // tổng số người nạp tiền

            tsNNT7N: 0, // tổng số người nạp tiền 7 ngày qua
            tsFee: 0, // thuế phí
            tsTNFEE: 0, // tổng số thu nhập ( trừ ra thuế phí)
            tsTNPAYPAL: 0, // tổng số thu nhập người dùng

            tsTNUSD: 0, // tổng số tiền nạp USD,
            tsTNBTC: 0, // tổng số tiền nạp Bitcoin
            tsTNETH: 0, // tổng số tiền nạp ETH
            tsTNVN: 0 // tổng số tiền nạp VN
        }

        await new Promise((res, rej) => {
            //=====================
            db.query(
                `SELECT COUNT(users.id) as nNDK, 
                SUM(money_paypal) as tsTNPAYPAL, 
                SUM(money_eth) as tsTNETH, 
                SUM(money_btc) as tsTNBTC, 
                SUM(money_usdt + account.balance) as tsTNUSD, 
                SUM(money_vn) as tsTNVN 
                FROM users
                LEFT JOIN account ON users.email = account.email AND account.type = 1
                WHERE active = 1 AND  users.marketing = 0`, (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                obj.nNDK = results[0].nNDK
                obj.tsTNPAYPALN = results[0].tsTNPAYPAL

                obj.tsTNUSDN = results[0].tsTNUSD;
                obj.tsTNBTCN = results[0].tsTNBTC;
                obj.tsTNETHN = results[0].tsTNETH;
                obj.tsTNVNN = results[0].tsTNVN;
                res();
            })
        })

        await new Promise((res, rej) => {
            //===================
            db.query(
                `SELECT COUNT(id) as nNDXM FROM users WHERE verified = 1`, (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    obj.nNDXM = results[0].nNDXM;
                    res();
                })
        })

        await new Promise((res, rej) => {
            //===================
            db.query(
                `SELECT COUNT(id) as nDL FROM users WHERE vip_user = 1`, (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    obj.nDL = results[0].nDL;
                    res();
                })
        })

        await new Promise((res, rej) => {
            //===================
            //===================
            db.query(
                `SELECT SUM(amount) AS tsTNUSD, SUM(pay_fee) AS Fee, SUM(real_amount) AS tnBNB FROM trade_history WHERE type_key = ? AND status = 1`,
                [
                    'nt'
                ],
                (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    obj.tsTNUSD = results[0].tsTNUSD;
                    obj.tsFee = results[0].Fee;

                    //let total = results[0].tsTN - results[0].Fee;
                    obj.tsTNThuc = results[0].tnBNB;
                    res();
                })
        })

        await new Promise((res, rej) => {
            //===================
            //===================
            db.query(
                `SELECT COUNT(from_u) as tsNNT FROM trade_history WHERE status = 1 AND type_key = ? GROUP BY from_u`,
                [
                    'nt'
                ]
                , (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    if (results.length != 0) {
                        obj.tsNNT = results[0].tsNNT;
                    }

                    res();
                })
        })

        await new Promise((res, rej) => {
            //===================
            db.query(
                `SELECT COUNT(from_u) as tsNNT7N FROM trade_history WHERE status = 1 AND type_key = ? AND WEEKOFYEAR(created_at) = WEEKOFYEAR(NOW()) GROUP BY from_u`,
                [
                    'nt'
                ]
                , (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    obj.tsNNT7N = results.length > 0 ? results[0].tsNNT7N : 0;
                    res();
                })
        })

        await new Promise((res, rej) => {
            //===================
            db.query(
                `SELECT SUM(amount_win) AS tsWin, SUM(amount_lose) AS tsLose FROM bet_history WHERE marketing = ? AND status = 1 AND type_account = ? `,
                [
                    0,
                    1 // tài khoản thực
                ]
                , (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    obj.tsWin = results.length > 0 ? results[0].tsWin : 0;
                    obj.tsLose = results.length > 0 ? results[0].tsLose : 0;
                    res();
                })
        })

        await new Promise((res, rej) => {
            //===================
            db.query(
                `SELECT COALESCE(SUM(cp_win.sum),0) as total_win
                FROM users
                JOIN copy_trade_history as cp_win ON users.email = cp_win.email AND cp_win.sum > 0
                WHERE users.marketing = 0 AND cp_win.acc_type = 1`,
                [
                ]
                , (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    obj.tsWin_CP = results[0].total_win;

                    res();
                })
        })

        await new Promise((res, rej) => {
            //===================
            db.query(
                `SELECT COALESCE(SUM(cp_win.sum),0)*-1 as total_win
                FROM users
                JOIN copy_trade_history as cp_win ON users.email = cp_win.email AND cp_win.sum < 0
                WHERE users.marketing = 0 AND cp_win.acc_type = 1`,
                [
                ]
                , (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    obj.tsLose_CP = results[0].total_win;

                    res();
                })
        })

        await new Promise((res, rej) => {
            //===================
            db.query(
                `SELECT SUM(account.balance + users.money_usdt) as total, SUM(account.win) as user_win, SUM(account.order_amount) as user_bet, SUM(account.lose) as user_lose,SUM(users.commission_vip) as user_hh
                FROM account
                JOIN users on  account.email = users.email
                WHERE users.marketing = 0 AND account.type = 1  `,
                [
                ]
                , (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    obj.user_win = results[0].user_win;
                    obj.user_lose = results[0].user_lose;
                    obj.system_amount = results[0].total;
                    obj.user_bet = results[0].user_bet;
                    obj.user_hh = results[0].user_hh;
                    res();
                })
        })

        await new Promise((res, rej) => {
            //===================
            db.query(
                `SELECT SUM(pending_commission) AS tsHHong FROM commission_history WHERE marketing = ? AND type = ?`,
                [
                    0,
                    'klgd',
                ]
                , (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    obj.tsHHong = results.length > 0 ? results[0].tsHHong : 0;
                    res();
                })
        })

        return callback(null, obj);
    },

    thongKeGetListF1F7: async (query, callback) => {
        const refForMe = await new Promise((resolve, reject) => {
            db.query(`select ref_code from users where email = ?`, [query.email], (err, data) => {
                if (err) {
                    return reject(err);
                }

                if (Array.isArray(data) && data.length) {
                    return resolve(data[0].ref_code);
                }

                return callback(null, [])
            })
        })

        //========== TỔNG SỐ NHÀ GIAO DỊCH
        let listData = {
            cap1: [],
            cap2: [],
            cap3: [],
            cap4: [],
            cap5: [],
            cap6: [],
            cap7: [],
            cap8: [],
            cap9: [],
            cap10: [],
            cap11: [],
            cap12: [],
            cap13: [],
            cap14: [],
            cap15: [],
        };

        let cap1 = false,
            cap2 = false,
            cap3 = false,
            cap4 = false,
            cap5 = false,
            cap6 = false,
            cap7 = false,
            cap8 = false;

        const refItems = [];

        // lấy cấp 1
        await new Promise((res, rej) => {
            db.query(
                `SELECT ref_code, email FROM users WHERE upline_id = ?`,
                [refForMe],
                (error, result, fields) => {
                    if (result.length > 0) {
                        result.forEach((ele) => {
                            listData["cap1"].push(ele);
                            refItems.push({ ref_code: ele.ref_code, email: ele.email });
                            cap1 = true;
                        });
                    }

                    res();
                }
            );
        });

        if (cap1) {
            for (let i = 0; i < listData["cap1"].length; i++) {
                db.query(
                    `SELECT ref_code, email FROM users WHERE upline_id = ?`,
                    [listData["cap1"][i].ref_code],
                    (error, result, fields) => {
                        if (result.length > 0) {
                            result.forEach((ele) => {
                                listData["cap2"].push(ele);
                                refItems.push({ ref_code: ele.ref_code, email: ele.email });
                            });
                            cap2 = true;
                        }
                    }
                );
                await sleep(50);
            }
        }

        if (cap2) {
            for (let i = 0; i < listData["cap2"].length; i++) {
                db.query(
                    `SELECT ref_code, email FROM users WHERE upline_id = ?`,
                    [listData["cap2"][i].ref_code],
                    (error, result, fields) => {
                        if (result.length > 0) {
                            result.forEach((ele) => {
                                listData["cap3"].push(ele);
                                refItems.push({ ref_code: ele.ref_code, email: ele.email });
                            });
                            cap3 = true;
                        }
                    }
                );
                await sleep(50);
            }
        }

        if (cap3) {
            for (let i = 0; i < listData["cap3"].length; i++) {
                db.query(
                    `SELECT ref_code, email FROM users WHERE upline_id = ?`,
                    [listData["cap3"][i].ref_code],
                    (error, result, fields) => {
                        if (result.length > 0) {
                            result.forEach((ele) => {
                                listData["cap4"].push(ele);
                                refItems.push({ ref_code: ele.ref_code, email: ele.email });
                            });
                            cap4 = true;
                        }
                    }
                );
                await sleep(50);
            }
        }

        if (cap4) {
            for (let i = 0; i < listData["cap4"].length; i++) {
                db.query(
                    `SELECT ref_code, email FROM users WHERE upline_id = ?`,
                    [listData["cap4"][i].ref_code],
                    (error, result, fields) => {
                        if (result.length > 0) {
                            result.forEach((ele) => {
                                listData["cap5"].push(ele);
                                refItems.push({ ref_code: ele.ref_code, email: ele.email });
                            });
                            cap5 = true;
                        }
                    }
                );
                await sleep(50);
            }
        }

        if (cap5) {
            for (let i = 0; i < listData["cap5"].length; i++) {
                db.query(
                    `SELECT ref_code, email FROM users WHERE upline_id = ?`,
                    [listData["cap5"][i].ref_code],
                    (error, result, fields) => {
                        if (result.length > 0) {
                            result.forEach((ele) => {
                                listData["cap6"].push(ele);
                                refItems.push({ ref_code: ele.ref_code, email: ele.email });
                            });
                            cap6 = true;
                        }
                    }
                );
                await sleep(50);
            }
        }

        if (cap6) {
            for (let i = 0; i < listData["cap6"].length; i++) {
                db.query(
                    `SELECT ref_code, email FROM users WHERE upline_id = ?`,
                    [listData["cap6"][i].ref_code],
                    (error, result, fields) => {
                        if (result.length > 0) {
                            result.forEach((ele) => {
                                listData["cap7"].push(ele);
                                refItems.push({ ref_code: ele.ref_code, email: ele.email });
                            });
                            cap7 = true;
                        }
                    }
                );
                await sleep(50);
            }
        }

        if (cap7) {
            for (let i = 0; i < listData["cap7"].length; i++) {
                db.query(
                    `SELECT ref_code, email FROM users WHERE upline_id = ?`,
                    [listData["cap8"][i].ref_code],
                    (error, result, fields) => {
                        if (result.length > 0) {
                            result.forEach((ele) => {
                                listData["cap8"].push(ele);
                                refItems.push({ ref_code: ele.ref_code, email: ele.email });
                            });
                            cap8 = true;
                        }
                    }
                );
                await sleep(50);
            }
        }

        if (!refItems.length) {
            return callback(null, [])
        }

        let sql = `select email, sum(amount_win) as tongWin, sum(amount_lose) as tongThua, sum(amount_bet) as tongDatCuoc from bet_history where`;

        if (refItems.length) {
            sql += ' email in (?) and'
        }

        sql += ' type_account = 1'

        let f = '';
        if (void 0 !== query.f) {
            switch (query.f) {
                case 'hom-nay':
                    f = ' and DATE(created_at) = DATE(NOW())'
                    break;
                case 'hom-qua':
                    f = ' and DATE(created_at) = DATE(NOW()) - 1'
                    break;
                case 'tuan-nay':
                    f = ' and WEEK(created_at)=WEEK(now())'
                    break;
                case 'tuan-truoc':
                    f = ' and WEEK(created_at)=WEEK(now()) - 1'
                    break;
                case 'thang-nay':
                    f = ' and MONTH(created_at)=MONTH(now())'
                    break;
                case 'thang-truoc':
                    f = ' and MONTH(created_at)=MONTH(now()) - 1'
                    break;

                default:
                    break;
            }
        }

        if (void 0 !== query.from && void 0 !== query.to) {
            // YYYY-MM-DD
            f += ` and created_at BETWEEN '${query.from}' and '${query.to}'`;
        }

        sql += f;
        sql += ' GROUP BY email'

        let thongKe = await new Promise((resolve, reject) => {
            db.query(sql, [refItems.map((e) => e.email)], ((err, data) => {
                if (err) {
                    reject(err);
                }

                resolve(data);
            }))
        });

        const napRut = await new Promise((resolve, reject) => {
            let sql1 = `SELECT * from trade_history WHERE`;

            if (thongKe.length) {
                sql1 += ' email in (?) and'
            }

            sql1 += ` (type_key = 'nt' OR type_key = 'rt') ${f}`

            db.query(sql1, [thongKe.map((e) => e.email)], ((err, data) => {
                if (err) {
                    reject(err);
                }

                resolve(data);
            }))
        });

        function groupBy(objectArray, property) {
            return objectArray.reduce(function (acc, obj) {
                var key = obj[property];
                if (!acc[key]) {
                    acc[key] = [];
                }

                acc[key].push(obj);
                return acc;
            }, {});
        }

        if (thongKe.length) {
            const napRutByEmail = groupBy(napRut, 'email');
            thongKe = thongKe.map((e) => {
                e.napRut = napRutByEmail[e.email] || [];
                return e;
            })
        }

        return callback(null, thongKe)
    },

    changeAccType: async (data, callback) => {
        // if (data.type === 1) {
        //     await new Promise((resolve, reject) => {
        //         db.query(`SELECT COUNT(ref_code) as isParent FROM users WHERE ref_code = (select upline_id from users WHERE id = ?)`, [data.id], (err, res) => {
        //             if (err) {
        //                 return reject(err);
        //             }
        //             if (res[0].isParent > 0) {
        //                 return callback(null, -1);
        //             } else {
        //                 return resolve("");
        //             }
        //         })
        //     });
        // }

        db.query(
            `UPDATE users SET marketing = ?, updated_at=now() WHERE id = ?`,
            [
                data.type,
                data.id
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                db.query(
                    `SELECT nick_name FROM users WHERE id = ?`,
                    [
                        data.id
                    ], (error, results, fields) => {
                        let nick = results[0].nick_name;
                        if (data.type == 1) {
                            Tele.sendMessThongBao(`🧑ADMIN vừa thực hiện <i>BẬT</i> Marketing người dùng: <b>${nick}</b>`);
                        } else {
                            Tele.sendMessThongBao(`🧑ADMIN vừa thực hiện <i>TẮT</i> Marketing người dùng: <b>${nick}</b>`);
                        }
                    });
                return callback(null, results)
            }
        )
    },

    changPassAd: (data, callback) => {
        db.query(
            `UPDATE users SET password = ? WHERE id = ?`,
            [
                data.pass,
                1
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results)
            }
        )
    },

    getLiveAccount: async (ref, callback) => {
        const email = await new Promise((resolve, reject) => {
            db.query(
                `SELECT email FROM users WHERE ref_code = ?`,
                [ref], (error, results, fields) => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(results[0].email)
                }
            )
        });

        db.query(
            `SELECT * FROM account WHERE email = ?`,
            [email], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results)
            }
        )
    },

    getSuperior: async (ref, callback) => {
        db.query(
            `SELECT * FROM users WHERE ref_code = ?`,
            [ref], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                if (results.length) {
                    results.forEach(item => {
                        delete item.privateKey_BTC;
                        delete item.wif_BTC;
                        delete item.privateKey_ETH;
                        delete item.privateKey_USDT;
                    });
                }

                return callback(null, results[0])
            }
        )
    },

    getListF1F7: async (data, callback) => {
        let refID = data.ref;
        let startDate = data.startDate;
        let endDate = data.endDate;
        let isFilterDate = false;

        if (startDate && startDate != "" && endDate && endDate != "") {
            isFilterDate = true;
        }

        //let listCap = [];
        // lấy danh sách 7 cấp dưới của mình 
        let listData = {
            "cap1": [],
            "cap2": [],
            "cap3": [],
            "cap4": [],
            "cap5": [],
            "cap6": [],
            "cap7": [],
            "cap8": [],
            "cap9": [],
            "cap10": [],
            "cap11": [],
            "cap12": [],
            "cap13": [],
            "cap14": [],
            "cap15": []
        };
        // let listCap = {
        // 	"cap1": [],
        // 	"cap2": [],
        // 	"cap3": [],
        // 	"cap4": [],
        // 	"cap5": [],
        // 	"cap6": [],
        // 	"cap7": []
        // };
        //listCap['cap1'].push(refID);

        let obj = {};

        // let uIdAccount = await new Promise((resolve, reject)=>{
        //     // get account name
        //     db.query(
        //         `SELECT u_id FROM account WHERE email = ? AND type = 1`, 
        //         [
        //             data.email
        //         ],
        //         (error, results, fields) => {
        //             if(error){
        //                 return callback(error);
        //             }
        //             resolve(results[0].u_id);
        //         })
        // })

        obj.filterVolumn = 0;
        obj.filterCp = 0;
        obj.filterHH = 0;
        obj.filterHHvip = 0;
        obj.filterSodu = 0;

        await new Promise((resolve, reject) => {
            // tổng số lượng giao dịch cấp dưới tháng này
            //SELECT SUM(personal_trading_volume) AS tslgdCD FROM commission_history WHERE from_upid = ? AND ref_id = ? AND MONTH(created_at) = MONTH(NOW())
            db.query(
                `SELECT SUM(personal_trading_volume) AS tslgdCD, SUM(pending_commission) AS tshhCD FROM commission_history WHERE upline_id = ? AND type = ? AND MONTH(created_at) = MONTH(NOW())`,
                [
                    //uIdAccount,
                    refID,
                    'klgd'
                ], (error, results, fields) => {
                    if (error) {
                        resolve([]);
                    }

                    obj.tslgdCD1 = Number.parseFloat(results[0].tslgdCD) || 0;
                    obj.tshhCD = Number.parseFloat(results[0].tshhCD) || 0;
                    resolve();
                })
        })

        await new Promise((resolve, reject) => {
            // tổng số lượng giao dịch cấp dưới cách 1 tháng

            db.query(
                `SELECT SUM(personal_trading_volume) AS tslgdCD FROM commission_history WHERE upline_id = ? AND type = ? AND MONTH(created_at) = MONTH(NOW()) - 1`,
                [
                    //uIdAccount,
                    refID,
                    'klgd'
                ], (error, results, fields) => {
                    if (error) {
                        resolve([]);
                    }

                    obj.tslgdCD2 = results[0].tslgdCD || 0;
                    resolve();
                })
        })
        await new Promise((resolve, reject) => {
            // tổng số lượng giao dịch cấp dưới cách 2 tháng

            db.query(
                `SELECT SUM(personal_trading_volume) AS tslgdCD FROM commission_history WHERE upline_id = ? AND type = ? AND MONTH(created_at) = MONTH(NOW()) - 2`,
                [
                    //uIdAccount,
                    refID,
                    'klgd'
                ], (error, results, fields) => {
                    if (error) {
                        resolve([]);
                    }

                    obj.tslgdCD3 = results[0].tslgdCD || 0;
                    resolve();
                })
        })
        await new Promise((resolve, reject) => {
            // cách 3 tháng
            db.query(
                `select SUM(personal_trading_volume) AS tslgdCD FROM commission_history WHERE upline_id = ? AND type = ? AND MONTH(created_at) = MONTH(NOW()) - 3`,
                [
                    //uIdAccount,
                    refID,
                    'klgd'
                ], (error, results, fields) => {
                    if (error) {
                        resolve([]);
                    }

                    obj.tslgdCD4 = results[0].tslgdCD || 0;
                    resolve();
                })
        })

        // lấy danh sách 7 cấp
        // let max = false;

        // for(let i = 0; i < 7; i++){
        //     db.query(
        //         `SELECT ref_code FROM users WHERE upline_id = ?`, 
        //         [
        //             refID
        //         ], (error, result, fields) => {
        //             if(result.length > 0){
        //                 result.forEach((ele) => {
        //                     listCap['cap1'].push(ele.ref_code);
        //                 })
        //                 //refID = result[0].ref_code;
        //             }else{
        //                 max = true;
        //             }
        //         }
        //     )
        //     if(max) break;
        //     await sleep(200);
        // }

        let cap1 = false, cap2 = false, cap3 = false, cap4 = false, cap5 = false, cap6 = false, cap7 = false;

        let compareDateTrade = "";
        if (isFilterDate) {
            compareDateTrade = ` AND (DATE(trade_history.created_at) >= '${startDate}' AND DATE(trade_history.created_at) <= '${endDate}' )`;
        }

        // lấy cấp 1
        await new Promise((res, rej) => {
            db.query(
                `SELECT level_vip, account.order_amount AS tklgd, account.win AS priceWin, account.lose AS priceLose, ref_code, upline_id, nick_name, users.email,users.pending_commission, users.commission_vip,account.balance,users.money_usdt FROM users
                 JOIN account ON users.email = account.email AND account.type = 1 
                WHERE upline_id = ?`,
                [
                    refID
                ], async (error, result, fields) => {
                    if (result.length > 0) {
                        await Promise.all(result.map(async (ele) => {
                            const res = await new Promise((resolve, reject) => {
                                db.query(`SELECT sum(amount) as amount from trade_history WHERE email = ? AND type_key ='nt' AND network IN ('bep20','bank') ${compareDateTrade}`, [ele.email], (error, results) => {
                                    if (error) {
                                        return reject(error);
                                    }

                                    return resolve(results);
                                });
                            });

                            const res_rut = await new Promise((resolve, reject) => {
                                db.query(`SELECT sum(amount) as amount from trade_history WHERE email = ? AND type_key ='rt' AND network IN ('bep20','bank') ${compareDateTrade}`, [ele.email], (err, res) => {
                                    if (err) {
                                        return reject(err);
                                    }

                                    return resolve(res);
                                })
                            })

                            if (isFilterDate) {
                                const res_filter = await new Promise((resolve, reject) => {
                                    db.query(`SELECT SUM(amount_bet) as 'bet',SUM(amount_win) as 'win',SUM(amount_lose)  as 'lose' FROM bet_history WHERE email = ? AND type_account = 1 AND DATE(created_at) >= '${startDate}' AND DATE(created_at) <= '${endDate}'`,
                                        [ele.email], (err, res) => {
                                            if (err) {
                                                return reject(err);
                                            }

                                            return resolve(res);
                                        })
                                })

                                const res_filter_cp = await new Promise((resolve, reject) => {
                                    db.query(`SELECT SUM(value) as 'bet' FROM copy_trade_history WHERE email = ? AND acc_type = 1 AND DATE(created_at) >= '${startDate}' AND DATE(created_at) <= '${endDate}'`,
                                        [ele.email], (err, res) => {
                                            if (err) {
                                                return reject(err);
                                            }

                                            return resolve(res);
                                        })
                                })

                                const res_filter_cm = await new Promise((resolve, reject) => {
                                    db.query(`SELECT SUM(pending_commission) as 'hhgd',SUM(vip_commission) as 'hhvip' FROM commission_history WHERE email = ? AND DATE(created_at) >= '${startDate}' AND DATE(created_at) <= '${endDate}'`,
                                        [ele.email], (err, res) => {
                                            if (err) {
                                                return reject(err);
                                            }

                                            return resolve(res);
                                        })
                                })

                                obj.filterCp += Number(res_filter_cp[0].bet != null ? res_filter_cp[0].bet : 0);
                                obj.filterHH += Number(res_filter_cm[0].hhgd != null ? res_filter_cm[0].hhgd : 0);
                                obj.filterHHvip += Number(res_filter_cm[0].hhvip != null ? res_filter_cm[0].hhvip : 0);

                                obj.filterVolumn += Number(res_filter[0].bet != null ? res_filter[0].bet : 0);

                                ele.f_bet = res_filter[0].bet != null ? res_filter[0].bet : 0;
                                ele.f_win = res_filter[0].win;
                                ele.f_lose = res_filter[0].lose;
                            }

                            ele.rut = res_rut[0].amount || 0;

                            ele.amt = res[0].amount || 0;
                            listData['cap1'].push(ele);
                            cap1 = true;
                        }))
                    }

                    res();
                }
            )
        })

        if (cap1) {
            for (let i = 0; i < listData['cap1'].length; i++) {
                await new Promise((res, rej) => {
                    db.query(
                        `SELECT level_vip, account.order_amount AS tklgd, account.win AS priceWin, account.lose AS priceLose, ref_code, upline_id, nick_name, users.email,users.pending_commission, users.commission_vip,account.balance,users.money_usdt FROM users
                        JOIN account ON users.email = account.email AND account.type = 1 
                       WHERE upline_id = ?`,
                        [
                            listData['cap1'][i].ref_code
                        ], async (error, result, fields) => {
                            if (void 0 !== result) {
                                if (result.length > 0) {
                                    await Promise.all(result.map(async (ele) => {
                                        const res = await new Promise((resolve, reject) => {
                                            db.query(`SELECT sum(amount) as amount from trade_history WHERE email = ? AND type_key ='nt' AND network IN ('bep20','bank') ${compareDateTrade}`, [ele.email], (err, res) => {
                                                if (err) {
                                                    return reject(err);
                                                }

                                                return resolve(res);
                                            })
                                        })

                                        const res_rut = await new Promise((resolve, reject) => {
                                            db.query(`SELECT sum(amount) as amount from trade_history WHERE email = ? AND type_key ='rt' AND network IN ('bep20','bank') ${compareDateTrade}`, [ele.email], (err, res) => {
                                                if (err) {
                                                    return reject(err);
                                                }

                                                return resolve(res);
                                            })
                                        })

                                        if (isFilterDate) {
                                            const res_filter = await new Promise((resolve, reject) => {
                                                db.query(`SELECT SUM(amount_bet) as 'bet',SUM(amount_win) as 'win',SUM(amount_lose)  as 'lose' FROM bet_history WHERE email = ? AND type_account = 1 AND DATE(created_at) >= '${startDate}' AND DATE(created_at) <= '${endDate}'`,
                                                    [ele.email], (err, res) => {
                                                        if (err) {
                                                            return reject(err);
                                                        }

                                                        return resolve(res);
                                                    })
                                            })

                                            const res_filter_cp = await new Promise((resolve, reject) => {
                                                db.query(`SELECT SUM(value) as 'bet' FROM copy_trade_history WHERE email = ? AND acc_type = 1 AND DATE(created_at) >= '${startDate}' AND DATE(created_at) <= '${endDate}'`,
                                                    [ele.email], (err, res) => {
                                                        if (err) {
                                                            return reject(err);
                                                        }

                                                        return resolve(res);
                                                    })
                                            })

                                            const res_filter_cm = await new Promise((resolve, reject) => {
                                                db.query(`SELECT SUM(pending_commission) as 'hhgd',SUM(vip_commission) as 'hhvip' FROM commission_history WHERE email = ? AND DATE(created_at) >= '${startDate}' AND DATE(created_at) <= '${endDate}'`,
                                                    [ele.email], (err, res) => {
                                                        if (err) {
                                                            return reject(err);
                                                        }

                                                        return resolve(res);
                                                    })
                                            })

                                            obj.filterCp += Number(res_filter_cp[0].bet != null ? res_filter_cp[0].bet : 0);
                                            obj.filterHH += Number(res_filter_cm[0].hhgd != null ? res_filter_cm[0].hhgd : 0);
                                            obj.filterHHvip += Number(res_filter_cm[0].hhvip != null ? res_filter_cm[0].hhvip : 0)

                                            obj.filterVolumn += Number(res_filter[0].bet != null ? res_filter[0].bet : 0);

                                            ele.f_bet = res_filter[0].bet != null ? res_filter[0].bet : 0;
                                            ele.f_win = res_filter[0].win;
                                            ele.f_lose = res_filter[0].lose;
                                        }

                                        ele.rut = res_rut[0].amount || 0;
                                        ele.amt = res[0].amount || 0;
                                        listData['cap2'].push(ele);
                                    }));
                                    cap2 = true;
                                }
                            }

                            res()
                        }
                    )
                })

                await sleep(50);
            }
        }

        if (cap2) {
            for (let i = 0; i < listData['cap2'].length; i++) {
                await new Promise((res, rej) => {
                    db.query(
                        `SELECT level_vip, account.order_amount AS tklgd, account.win AS priceWin, account.lose AS priceLose, ref_code, upline_id, nick_name, users.email,users.pending_commission, users.commission_vip,account.balance,users.money_usdt FROM users
                        JOIN account ON users.email = account.email AND account.type = 1 
                    WHERE upline_id = ?`,
                        [
                            listData['cap2'][i].ref_code
                        ], async (error, result, fields) => {
                            if (result.length > 0) {
                                await Promise.all(result.map(async (ele) => {
                                    const res = await new Promise((resolve, reject) => {
                                        db.query(`SELECT sum(amount) as amount from trade_history WHERE email = ? AND type_key ='nt' AND network= IN ('bep20','bank') ${compareDateTrade}`, [ele.email], (err, res) => {
                                            if (err) {
                                                return reject(err);
                                            }

                                            return resolve(res);
                                        })
                                    })

                                    const res_rut = await new Promise((resolve, reject) => {
                                        db.query(`SELECT sum(amount) as amount from trade_history WHERE email = ? AND type_key ='rt' AND network IN ('bep20','bank') ${compareDateTrade}`, [ele.email], (err, res) => {
                                            if (err) {
                                                return reject(err);
                                            }

                                            return resolve(res);
                                        })
                                    })

                                    if (isFilterDate) {
                                        const res_filter = await new Promise((resolve, reject) => {
                                            db.query(`SELECT SUM(amount_bet) as 'bet',SUM(amount_win) as 'win',SUM(amount_lose)  as 'lose' FROM bet_history WHERE email = ? AND type_account = 1 AND DATE(created_at) >= '${startDate}' AND DATE(created_at) <= '${endDate}'`,
                                                [ele.email], (err, res) => {
                                                    if (err) {
                                                        return reject(err);
                                                    }

                                                    return resolve(res);
                                                })
                                        })

                                        const res_filter_cp = await new Promise((resolve, reject) => {
                                            db.query(`SELECT SUM(value) as 'bet' FROM copy_trade_history WHERE email = ? AND acc_type = 1 AND DATE(created_at) >= '${startDate}' AND DATE(created_at) <= '${endDate}'`,
                                                [ele.email], (err, res) => {
                                                    if (err) {
                                                        return reject(err);
                                                    }

                                                    return resolve(res);
                                                })
                                        })

                                        const res_filter_cm = await new Promise((resolve, reject) => {
                                            db.query(`SELECT SUM(pending_commission) as 'hhgd',SUM(vip_commission) as 'hhvip' FROM commission_history WHERE email = ? AND DATE(created_at) >= '${startDate}' AND DATE(created_at) <= '${endDate}'`,
                                                [ele.email], (err, res) => {
                                                    if (err) {
                                                        return reject(err);
                                                    }

                                                    return resolve(res);
                                                })
                                        })

                                        obj.filterCp += Number(res_filter_cp[0].bet != null ? res_filter_cp[0].bet : 0);
                                        obj.filterHH += Number(res_filter_cm[0].hhgd != null ? res_filter_cm[0].hhgd : 0);
                                        obj.filterHHvip += Number(res_filter_cm[0].hhvip != null ? res_filter_cm[0].hhvip : 0)

                                        obj.filterVolumn += Number(res_filter[0].bet != null ? res_filter[0].bet : 0);

                                        ele.f_bet = res_filter[0].bet != null ? res_filter[0].bet : 0;
                                        ele.f_win = res_filter[0].win;
                                        ele.f_lose = res_filter[0].lose;
                                    }

                                    ele.rut = res_rut[0].amount || 0;

                                    ele.amt = res[0].amount || 0;
                                    listData['cap3'].push(ele);
                                }));
                                cap3 = true;
                            }

                            res()
                        }
                    )
                })
                await sleep(50);
            }
        }

        if (cap3) {
            for (let i = 0; i < listData['cap3'].length; i++) {
                await new Promise((res, rej) => {
                    db.query(
                        `SELECT level_vip, account.order_amount AS tklgd, account.win AS priceWin, account.lose AS priceLose, ref_code, upline_id, nick_name, users.email,users.pending_commission, users.commission_vip,account.balance,users.money_usdt FROM users
                        JOIN account ON users.email = account.email AND account.type = 1 
                    WHERE upline_id = ?`,
                        [
                            listData['cap3'][i].ref_code
                        ], async (error, result, fields) => {
                            if (result.length > 0) {
                                await Promise.all(result.map(async (ele) => {
                                    const res = await new Promise((resolve, reject) => {
                                        db.query(`SELECT sum(amount) as amount from trade_history WHERE email = ? AND type_key ='nt' AND network IN ('bep20','bank') ${compareDateTrade}`, [ele.email], (err, res) => {
                                            if (err) {
                                                return reject(err);
                                            }

                                            return resolve(res);
                                        })
                                    })

                                    const res_rut = await new Promise((resolve, reject) => {
                                        db.query(`SELECT sum(amount) as amount from trade_history WHERE email = ? AND type_key ='rt' AND network IN ('bep20','bank') ${compareDateTrade}`, [ele.email], (err, res) => {
                                            if (err) {
                                                return reject(err);
                                            }

                                            return resolve(res);
                                        })
                                    })

                                    if (isFilterDate) {
                                        const res_filter = await new Promise((resolve, reject) => {
                                            db.query(`SELECT SUM(amount_bet) as 'bet',SUM(amount_win) as 'win',SUM(amount_lose)  as 'lose' FROM bet_history WHERE email = ? AND type_account = 1 AND DATE(created_at) >= '${startDate}' AND DATE(created_at) <= '${endDate}'`,
                                                [ele.email], (err, res) => {
                                                    if (err) {
                                                        return reject(err);
                                                    }

                                                    return resolve(res);
                                                })
                                        })

                                        const res_filter_cp = await new Promise((resolve, reject) => {
                                            db.query(`SELECT SUM(value) as 'bet' FROM copy_trade_history WHERE email = ? AND acc_type = 1 AND DATE(created_at) >= '${startDate}' AND DATE(created_at) <= '${endDate}'`,
                                                [ele.email], (err, res) => {
                                                    if (err) {
                                                        return reject(err);
                                                    }

                                                    return resolve(res);
                                                })
                                        })

                                        const res_filter_cm = await new Promise((resolve, reject) => {
                                            db.query(`SELECT SUM(pending_commission) as 'hhgd',SUM(vip_commission) as 'hhvip' FROM commission_history WHERE email = ? AND DATE(created_at) >= '${startDate}' AND DATE(created_at) <= '${endDate}'`,
                                                [ele.email], (err, res) => {
                                                    if (err) {
                                                        return reject(err);
                                                    }

                                                    return resolve(res);
                                                })
                                        })

                                        obj.filterCp += Number(res_filter_cp[0].bet != null ? res_filter_cp[0].bet : 0);
                                        obj.filterHH += Number(res_filter_cm[0].hhgd != null ? res_filter_cm[0].hhgd : 0);
                                        obj.filterHHvip += Number(res_filter_cm[0].hhvip != null ? res_filter_cm[0].hhvip : 0)

                                        obj.filterVolumn += Number(res_filter[0].bet != null ? res_filter[0].bet : 0);

                                        ele.f_bet = res_filter[0].bet != null ? res_filter[0].bet : 0;
                                        ele.f_win = res_filter[0].win;
                                        ele.f_lose = res_filter[0].lose;
                                    }

                                    ele.rut = res_rut[0].amount || 0;
                                    ele.amt = res[0].amount || 0;

                                    listData['cap4'].push(ele);
                                }));
                                cap4 = true;
                            }

                            res()
                        }
                    )
                });

                await sleep(50);
            }
        }

        if (cap4) {
            for (let i = 0; i < listData['cap4'].length; i++) {
                await new Promise((res, rej) => {
                    db.query(
                        `SELECT level_vip, account.order_amount AS tklgd, account.win AS priceWin, account.lose AS priceLose, ref_code, upline_id, nick_name, users.email,users.pending_commission, users.commission_vip,account.balance,users.money_usdt FROM users
                        JOIN account ON users.email = account.email AND account.type = 1 
                    WHERE upline_id = ?`,
                        [
                            listData['cap4'][i].ref_code
                        ], async (error, result, fields) => {
                            if (result.length > 0) {
                                await Promise.all(result.map(async (ele) => {
                                    const res = await new Promise((resolve, reject) => {
                                        db.query(`SELECT sum(amount) as amount from trade_history WHERE email = ? AND type_key ='nt' AND network IN ('bep20','bank') ${compareDateTrade}`, [ele.email], (err, res) => {
                                            if (err) {
                                                return reject(err);
                                            }

                                            return resolve(res);
                                        })
                                    })

                                    const res_rut = await new Promise((resolve, reject) => {
                                        db.query(`SELECT sum(amount) as amount from trade_history WHERE email = ? AND type_key ='rt' AND network IN ('bep20','bank') ${compareDateTrade}`, [ele.email], (err, res) => {
                                            if (err) {
                                                return reject(err);
                                            }

                                            return resolve(res);
                                        })
                                    })

                                    if (isFilterDate) {
                                        const res_filter = await new Promise((resolve, reject) => {
                                            db.query(`SELECT SUM(amount_bet) as 'bet',SUM(amount_win) as 'win',SUM(amount_lose)  as 'lose' FROM bet_history WHERE email = ? AND type_account = 1 AND DATE(created_at) >= '${startDate}' AND DATE(created_at) <= '${endDate}'`,
                                                [ele.email], (err, res) => {
                                                    if (err) {
                                                        return reject(err);
                                                    }

                                                    return resolve(res);
                                                })
                                        })

                                        const res_filter_cp = await new Promise((resolve, reject) => {
                                            db.query(`SELECT SUM(value) as 'bet' FROM copy_trade_history WHERE email = ? AND acc_type = 1 AND DATE(created_at) >= '${startDate}' AND DATE(created_at) <= '${endDate}'`,
                                                [ele.email], (err, res) => {
                                                    if (err) {
                                                        return reject(err);
                                                    }

                                                    return resolve(res);
                                                })
                                        })

                                        const res_filter_cm = await new Promise((resolve, reject) => {
                                            db.query(`SELECT SUM(pending_commission) as 'hhgd',SUM(vip_commission) as 'hhvip' FROM commission_history WHERE email = ? AND DATE(created_at) >= '${startDate}' AND DATE(created_at) <= '${endDate}'`,
                                                [ele.email], (err, res) => {
                                                    if (err) {
                                                        return reject(err);
                                                    }

                                                    return resolve(res);
                                                })
                                        })

                                        obj.filterCp += Number(res_filter_cp[0].bet != null ? res_filter_cp[0].bet : 0);
                                        obj.filterHH += Number(res_filter_cm[0].hhgd != null ? res_filter_cm[0].hhgd : 0);
                                        obj.filterHHvip += Number(res_filter_cm[0].hhvip != null ? res_filter_cm[0].hhvip : 0)

                                        obj.filterVolumn += Number(res_filter[0].bet != null ? res_filter[0].bet : 0);

                                        ele.f_bet = res_filter[0].bet != null ? res_filter[0].bet : 0;
                                        ele.f_win = res_filter[0].win;
                                        ele.f_lose = res_filter[0].lose;
                                    }

                                    ele.rut = res_rut[0].amount || 0;

                                    ele.amt = res[0].amount || 0;
                                    listData['cap5'].push(ele);
                                }));
                                cap5 = true;
                            }

                            res()
                        }
                    )
                });
                await sleep(50);
            }
        }

        if (cap5) {
            for (let i = 0; i < listData['cap5'].length; i++) {
                await new Promise((res, rej) => {
                    db.query(
                        `SELECT level_vip, account.order_amount AS tklgd, account.win AS priceWin, account.lose AS priceLose, ref_code, upline_id, nick_name, users.email,users.pending_commission, users.commission_vip,account.balance,users.money_usdt FROM users
                        JOIN account ON users.email = account.email AND account.type = 1 
                    WHERE upline_id = ?`,
                        [
                            listData['cap5'][i].ref_code
                        ], async (error, result, fields) => {
                            if (result.length > 0) {
                                await Promise.all(result.map(async (ele) => {
                                    const res = await new Promise((resolve, reject) => {
                                        db.query(`SELECT sum(amount) as amount from trade_history WHERE email = ? AND type_key ='nt' AND network IN ('bep20','bank') ${compareDateTrade}`, [ele.email], (err, res) => {
                                            if (err) {
                                                return reject(err);
                                            }

                                            return resolve(res);
                                        })
                                    })

                                    const res_rut = await new Promise((resolve, reject) => {
                                        db.query(`SELECT sum(amount) as amount from trade_history WHERE email = ? AND type_key ='rt' AND network IN ('bep20','bank') ${compareDateTrade}`, [ele.email], (err, res) => {
                                            if (err) {
                                                return reject(err);
                                            }

                                            return resolve(res);
                                        })
                                    })

                                    if (isFilterDate) {
                                        const res_filter = await new Promise((resolve, reject) => {
                                            db.query(`SELECT SUM(amount_bet) as 'bet',SUM(amount_win) as 'win',SUM(amount_lose)  as 'lose' FROM bet_history WHERE email = ? AND type_account = 1 AND DATE(created_at) >= '${startDate}' AND DATE(created_at) <= '${endDate}'`,
                                                [ele.email], (err, res) => {
                                                    if (err) {
                                                        return reject(err);
                                                    }

                                                    return resolve(res);
                                                })
                                        })

                                        const res_filter_cp = await new Promise((resolve, reject) => {
                                            db.query(`SELECT SUM(value) as 'bet' FROM copy_trade_history WHERE email = ? AND acc_type = 1 AND DATE(created_at) >= '${startDate}' AND DATE(created_at) <= '${endDate}'`,
                                                [ele.email], (err, res) => {
                                                    if (err) {
                                                        return reject(err);
                                                    }

                                                    return resolve(res);
                                                })
                                        })

                                        const res_filter_cm = await new Promise((resolve, reject) => {
                                            db.query(`SELECT SUM(pending_commission) as 'hhgd',SUM(vip_commission) as 'hhvip' FROM commission_history WHERE email = ? AND DATE(created_at) >= '${startDate}' AND DATE(created_at) <= '${endDate}'`,
                                                [ele.email], (err, res) => {
                                                    if (err) {
                                                        return reject(err);
                                                    }

                                                    return resolve(res);
                                                })
                                        })

                                        obj.filterCp += Number(res_filter_cp[0].bet != null ? res_filter_cp[0].bet : 0);
                                        obj.filterHH += Number(res_filter_cm[0].hhgd != null ? res_filter_cm[0].hhgd : 0);
                                        obj.filterHHvip += Number(res_filter_cm[0].hhvip != null ? res_filter_cm[0].hhvip : 0)

                                        obj.filterVolumn += Number(res_filter[0].bet != null ? res_filter[0].bet : 0);

                                        ele.f_bet = res_filter[0].bet != null ? res_filter[0].bet : 0;
                                        ele.f_win = res_filter[0].win;
                                        ele.f_lose = res_filter[0].lose;
                                    }

                                    ele.rut = res_rut[0].amount || 0;

                                    ele.amt = res[0].amount || 0;
                                    listData['cap6'].push(ele);
                                }));
                                cap6 = true;
                            }

                            res()
                        }
                    )
                });
                await sleep(50);
            }
        }

        if (cap6) {
            for (let i = 0; i < listData['cap6'].length; i++) {
                await new Promise((res, rej) => {
                    db.query(
                        `SELECT level_vip, account.order_amount AS tklgd, account.win AS priceWin, account.lose AS priceLose, ref_code, upline_id, nick_name, users.email,users.pending_commission, users.commission_vip,account.balance,users.money_usdt FROM users
                        JOIN account ON users.email = account.email AND account.type = 1 
                    WHERE upline_id = ?`,
                        [
                            listData['cap6'][i].ref_code
                        ], async (error, result, fields) => {
                            if (result.length > 0) {
                                await Promise.all(result.map(async (ele) => {
                                    const res = await new Promise((resolve, reject) => {
                                        db.query(`SELECT sum(amount) as amount from trade_history WHERE email = ? AND type_key ='nt' AND network IN ('bep20','bank')  ${compareDateTrade}`, [ele.email], (err, res) => {
                                            if (err) {
                                                return reject(err);
                                            }

                                            return resolve(res);
                                        })
                                    })

                                    const res_rut = await new Promise((resolve, reject) => {
                                        db.query(`SELECT sum(amount) as amount from trade_history WHERE email = ? AND type_key ='rt' AND network IN ('bep20','bank') ${compareDateTrade}`, [ele.email], (err, res) => {
                                            if (err) {
                                                return reject(err);
                                            }

                                            return resolve(res);
                                        })
                                    })

                                    if (isFilterDate) {
                                        const res_filter = await new Promise((resolve, reject) => {
                                            db.query(`SELECT SUM(amount_bet) as 'bet',SUM(amount_win) as 'win',SUM(amount_lose)  as 'lose' FROM bet_history WHERE email = ? AND type_account = 1 AND DATE(created_at) >= '${startDate}' AND DATE(created_at) <= '${endDate}'`,
                                                [ele.email], (err, res) => {
                                                    if (err) {
                                                        return reject(err);
                                                    }

                                                    return resolve(res);
                                                })
                                        })

                                        const res_filter_cp = await new Promise((resolve, reject) => {
                                            db.query(`SELECT SUM(value) as 'bet' FROM copy_trade_history WHERE email = ? AND acc_type = 1 AND DATE(created_at) >= '${startDate}' AND DATE(created_at) <= '${endDate}'`,
                                                [ele.email], (err, res) => {
                                                    if (err) {
                                                        return reject(err);
                                                    }

                                                    return resolve(res);
                                                })
                                        })

                                        const res_filter_cm = await new Promise((resolve, reject) => {
                                            db.query(`SELECT SUM(pending_commission) as 'hhgd',SUM(vip_commission) as 'hhvip' FROM commission_history WHERE email = ? AND DATE(created_at) >= '${startDate}' AND DATE(created_at) <= '${endDate}'`,
                                                [ele.email], (err, res) => {
                                                    if (err) {
                                                        return reject(err);
                                                    }

                                                    return resolve(res);
                                                })
                                        })

                                        obj.filterCp += Number(res_filter_cp[0].bet != null ? res_filter_cp[0].bet : 0);
                                        obj.filterHH += Number(res_filter_cm[0].hhgd != null ? res_filter_cm[0].hhgd : 0);
                                        obj.filterHHvip += Number(res_filter_cm[0].hhvip != null ? res_filter_cm[0].hhvip : 0)

                                        obj.filterVolumn += Number(res_filter[0].bet != null ? res_filter[0].bet : 0);

                                        ele.f_bet = res_filter[0].bet != null ? res_filter[0].bet : 0;
                                        ele.f_win = res_filter[0].win;
                                        ele.f_lose = res_filter[0].lose;
                                    }

                                    ele.rut = res_rut[0].amount || 0;

                                    ele.amt = res[0].amount || 0;
                                    listData['cap7'].push(ele);
                                }));
                                cap7 = true;
                            }

                            res()
                        }
                    )
                });
                await sleep(50);
            }
        }

        //if(cap7){
        //   for(let i = 0;  i < listData['cap7'].length; i++){
        //      db.query(
        //           `SELECT level_vip, pricePlay AS tklgd, ref_code, upline_id, nick_name FROM users WHERE upline_id = ?`, 
        //         [
        //               listData['cap7'][i].ref_code
        //          ], (error, result, fields) => {
        //              if(result.length > 0){
        //                   result.forEach((ele) => {
        //                      listData['cap7'].push(ele);
        //                   });
        //cap7 = true;
        //               }
        //           }
        //      )
        //      await sleep(50);
        //  }
        // }

        // await new Promise((res, rej) => {
        // 	//SELECT  upline_id, ref_code 
        // 	//FROM (SELECT * FROM users
        //     //            ORDER BY upline_id) users_sorted,
        //     //            (SELECT @pv := 'RYIFCWS') initialisation
        //     //    WHERE find_in_set(upline_id, @pv)
        //     //    AND length(@pv := concat(@pv, ',', ref_code));

        //     db.query(`with recursive cte (level_vip, tklgd, ref_code, upline_id, nick_name) as (
        // 			  select     level_vip,
        // 						 pricePlay,
        // 						 ref_code,
        // 						 upline_id,
        // 						 nick_name
        // 			  from       users
        // 			  where      upline_id = ?
        // 			  union all
        // 			  select     p.level_vip,
        // 						 p.pricePlay,
        // 						 p.ref_code,
        // 						 p.upline_id,
        // 						 p.nick_name
        // 			  from       users p
        // 			  inner join cte
        // 					  on p.upline_id = cte.ref_code
        // 			)
        // 			select * from cte;`, 
        //         [
        // 			refID
        // 		], (error, result, fields) => {
        //             let count = result.length;
        // 			if(count === 0) res();
        //             if(count > 0){
        //                 let i = 0, u = 0, check = '';
        //                 result.forEach((ele) => {
        // 					if(check != ele.upline_id){
        // 						u++;
        // 						check = ele.upline_id
        // 					} 
        // 					if(u <= 7){
        // 						listData[`cap${u}`].push(ele);
        // 					}
        // 					res();
        //                 })

        //             }
        //         }
        //     )

        // });

        let listD = {
            data: listData,
            obj: obj
        }

        return callback(null, listD);
    },

    getListCmsHis: async (data, callback) => {
        let email = data.e;

        let rs = [];
        await new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM commission_history WHERE email = ? AND type = ?`,
                [
                    email,
                    'klgd'
                ], (error, results, fields) => {
                    rs = results;
                    resolve();
                })
        })

        return callback(null, rs);
    },

    getListNotifi: async (data, callback) => {
        let email = data.email;
    
        let rs = [];
        await new Promise((resolve, reject) => {
            db.query(
                // `SELECT * FROM notifi WHERE cu_email = ? OR email = ? ORDER BY id DESC`, 
                `SELECT * FROM notifi WHERE cu_email = ? OR email = ? ORDER BY id DESC`,
                [
                    email,
                    email
                ], (error, results, fields) => {
                    rs = results;

                    resolve();
                })
        })

        return callback(null, rs);
    },

    updateListNotifi: async (data, callback) => {
        let email = data.e;

        await new Promise((resolve, reject) => {
            db.query(
                `UPDATE notifi SET views = ? WHERE cu_email = ?`,
                [
                    1,
                    email
                ], (error, results, fields) => {
                    resolve();
                })
        })

        return callback(null);
    },
    getCurrentSession: callback => {
        db.query(
            `SELECT session_history.session,session_history.open,session_history.close,session_history.win,session_history.created_at FROm session_history ORDER BY created_at DESC LIMIT 1`,
            [
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results[0])
            }
        )
    },
    addLoginHistory: async (email, ip, callback) => {
        await new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO login_history(email,created_at,ip_address) VALUE(?,NOW(),?)`,
                [
                    email,
                    ip
                ], (error, results, fields) => {
                    resolve();
                })
        })
    },
    getAllLuckyReward: async (email, callback) => {
        const user = await new Promise((resolve, reject) => {
            db.query(
                `select id, email, is_new from users where email = ?`,
                [email], (error, results, fields) => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(results);
                }
            )
        });

        const isOldUser = user[0]['is_new'] == 0 ? true : false;

        db.query(
            `select id, name from lucky_reward where is_w = ?`,
            [1], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results)
            }
        )
    },

    checkSpinsUser: async (email, callback) => {
        db.query(
            `select spin_count, id from users where email = ?`,
            [email], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results)
            }
        )
    },

    luckyRewardSpinUser: async (id, callback) => {
        const user = await new Promise((resolve, reject) => {
            db.query(
                `select id, email, spin_count, is_new from users where email = ?`,
                [id], (error, results, fields) => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(results);
                }
            )
        });

        if (user[0].spin_count == 0 || !user[0].spin_count) {
            return callback("Bạn không có lượt quay nào!");
        }

        const isOldUser = user[0]['is_new'] == 0 ? true : false;
        let rewards = [];

        if (isOldUser) {
            rewards = await new Promise((resolve, reject) => {
                db.query(
                    `select id, name, percent_old as percent from lucky_reward where is_w = ? and percent_old != ?`,
                    [1, 0], (error, results, fields) => {
                        if (error) {
                            return reject(error);
                        }

                        return resolve(results);
                    }
                )
            });
        } else {
            rewards = await new Promise((resolve, reject) => {
                db.query(
                    `select id, name, percent from lucky_reward where is_w = ? and percent != ? AND total > ?`,
                    [1, 0, 0], (error, results, fields) => {
                        if (error) {
                            return reject(error);
                        }

                        return resolve(results);
                    }
                )
            });
        }

        let sum = 0;
        let reward_result;

        rewards.forEach((reward) => {
            sum = sum + reward['percent'];
        });

        const rand = Math.floor(Math.random() * sum);

        do {
            const array_sum = rewards.reduce(function (carry, item) {
                return carry + item['percent'];
            }, 0);

            if (rand <= array_sum && rand >= array_sum - rewards[rewards.length - 1]['percent']) {
                reward_result = rewards[rewards.length - 1];
                break;
            }
        } while (rewards.pop());

        if (reward_result) {
            await new Promise((resolve, reject) => {
                db.query(
                    `Update users SET spin_count = spin_count - 1 Where email = ?`,
                    [id], (error, results, fields) => {
                        if (error) {
                            return reject(error);
                        }

                        return resolve(results);
                    }
                )

                db.query(
                    `insert into result_reward (email, balance, lucky_reward_id, time, created_at)
                        values(?,?,?,now(),now())`,
                    [
                        user[0].email,
                        reward_result.name,
                        reward_result.id
                    ]
                );

                db.query(
                    `update account set balance = balance + ? where email = ? AND type = 1`,
                    [
                        Number(reward_result.name),
                        user[0].email
                    ], (error, results, fields) => {
                        if (error) {
                        }
                    }
                );

                db.query(
                    `Update lucky_reward SET total = total - 1 Where id = ?`,
                    [reward_result.id], (error, results, fields) => {
                        if (error) {
                            return reject(error);
                        }

                        return resolve(results);
                    }
                )

                if (Number(reward_result.name) >= 1) {
                    db.query(
                        `select id, email from account where type = 1`,
                        (error, results, fields) => {
                            if (error) {
                                return reject(error);
                            }

                            results.forEach((account, index) => {
                                const email = account.email;
                                const title = {
                                    title: 'Vòng quay may mắn',
                                    title_en: 'Lucky Wheel',
                                    title_cam: 'កង់នៃសំណាង'
                                }

                                const content = {
                                    content: `<b>Chúc mừng người chơi: ${user[0]['email'].substring(0, 3)}*** đã trúng thưởng $${reward_result.name} trong vòng quay may mắn.</b>`,
                                    content_en: `<b>Congratulations to the player: ${user[0]['email'].substring(0, 3)}*** won $${reward_result.name} in lucky spin.</b>`,
                                    content_cam: `<b>សូមអបអរសាទរដល់កីឡាករ: ${user[0]['email'].substring(0, 3)}*** ឈ្នះ $${reward_result.name} នៅក្នុងការបង្វិលសំណាង។</b>`
                                }

                                SEND_THONG_BAO_LANGS('lucky-reward', email, email, title, content);
                            });

                            return resolve(results);
                        }
                    )
                }
            });
        }

        return callback(null, { id: reward_result.id, name: reward_result.name });
    },

    regPresenterUser: async (data, callback) => {
        await new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO users_presenter(email, presenter, created_at) VALUES(?,?,NOW())`,
                [
                    data.email,
                    data.code
                ], (error, results, fields) => {
                    resolve();
                })
        })

        const total = await new Promise((resolve, reject) => {
            db.query(
                `select count(*) as 'total' from users_presenter where presenter = ? AND DATE(created_at) = DATE(NOW())`,
                [data.code], (error, results, fields) => {
                    if (error) {
                        return reject(error);
                    }

                    if (results.length > 0) {
                        return resolve(results[0].total);
                    } else {
                        return resolve(0);
                    }
                }
            )
        });

        const user = await new Promise((resolve, reject) => {
            db.query(
                `select * from users where ref_code = ?`,
                [data.code], (error, results, fields) => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(results);
                }
            )
        });

        const reward = await new Promise((resolve, reject) => {
            db.query(
                `select count(*) as 'total' from users_presenter_reward where email = ? AND DATE(created_at) = DATE(NOW())`,
                [user[0].email], (error, results, fields) => {
                    if (error) {
                        return reject(error);
                    }

                    if (results.length > 0) {
                        return resolve(results[0].total);
                    } else {
                        return resolve(0);
                    }
                }
            )
        });

        if (total >= 3 && reward == 0) {
            db.query(`UPDATE users SET spin_count = spin_count + 1 WHERE email = '${user[0].email}'`);
            db.query(`INSERT INTO  users_presenter_reward(email, created_at) VALUE('${user[0].email}',NOW())`);
        }
    },

    getLuckyActive: async (callback) => {
        db.query(
            `select * from lucky where id = 1`,
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results)
            }
        )
    },
    getUserInfoAdmin: async (data, callback) => {
        db.query(
            `SELECT users.email, users.nick_name, users.address_USDT,account.balance as 'live_balance', users.money_usdt as 'wallet_balance',(users.money_usdt + account.balance) as 'total_balance', copy_trade.experts as 'expert',copy_trade.day_lose as 'cp_lose',copy_trade.day_win as 'cp_win', copy_trade.amount 'cp_amount', copy_trade.money_per_day as 'cp_today', copy_trade.rate = 1 as 'cp_rate',copy_trade.is_active = 1 as 'cp_active', user_up.nick_name as 'upline_user' FROm users
            LEFT JOIN users as user_up ON users.upline_id = user_up.ref_code
            JOIN account ON users.email = account.email AND account.type = ?
            LEFT JOIN copy_trade ON users.email = copy_trade.email
            WHERE users.id = ?    
            `, [
            1, data.id
        ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results[0])
            }
        )
    },
    getUserTradeAnalyze: async (data, callback) => {
 
        let his_query =
            `SELECT  COALESCE(SUM(uni_trade.amount_bet),0) as 'amount_bet', COALESCE(SUM(uni_trade.amount_win),0) as 'amount_win',  COALESCE(SUM(uni_trade.amount_lose),0) as 'amount_lose' FROM 
        (
        SELECT SUM(amount_bet) as 'amount_bet', SUM(amount_win) as 'amount_win', SUM(amount_lose) as 'amount_lose',entry_date,email  FROM bet_history_day 
        GROUP BY entry_date ,email
        UNION
        SELECT SUM(amount_bet) as 'amount_bet', SUM(amount_win) as 'amount_win', SUM(amount_lose) as 'amount_lose',DATE(created_at) as 'entry_date',email FROM bet_history
        WHERE DATE(created_at)  = DATE(NOW())
        GROUP BY email
        ) as uni_trade
        JOIN users ON uni_trade.email = users.email
        WHERE
        users.id=?
        `;

        if(data.start_date && data.end_date){
            his_query+=` AND DATE(uni_trade.entry_date) >= DATE('${data.start_date}') AND DATE(uni_trade.entry_date) <= DATE('${data.end_date}')`;
        }

        const trade_his = await new Promise((res, rej) => {
            db.query(his_query,
                [data.id],
                (error, results, fields) => {
                    res(results)
                }
            )
        })
       
        let his_cpt_query = 
        `SELECT  COALESCE(SUM(uni_trade.amount_bet),0) as 'amount_bet',  COALESCE(SUM(uni_trade.amount_win),0) as 'amount_win',  COALESCE(SUM(uni_trade.amount_lose),0) as 'amount_lose' FROM 
        (
        SELECT SUM(value) as 'amount_bet', SUM(win) as 'amount_win', SUM(lose) as 'amount_lose',entry_date,email  FROM copy_trade_history_day 
        GROUP BY entry_date ,email
        UNION
        SELECT SUM(value) as 'amount_bet', SUM(sum) as 'amount_win', 0 as 'amount_lose',DATE(created_at) as 'entry_date',email FROM copy_trade_history
        WHERE DATE(created_at)  = DATE(NOW()) AND sum >= 0
        GROUP by email
        UNION
        SELECT SUM(value) as 'amount_bet',0 as 'amount_win',  SUM(sum) as 'amount_lose',DATE(created_at) as 'entry_date',email FROM copy_trade_history
        WHERE DATE(created_at)  = DATE(NOW()) AND sum < 0
        GROUP by email
        ) as uni_trade
        JOIN users ON uni_trade.email = users.email
        WHERE
        users.id=?
        `

        if(data.start_date && data.end_date){
            his_cpt_query+=` AND DATE(uni_trade.entry_date) >= DATE('${data.start_date}') AND DATE(uni_trade.entry_date) <= DATE('${data.end_date}')`;
        }

        const trade_his_cpt = await new Promise((res, rej) => {
            db.query(his_cpt_query,
                [data.id, data.start_date, data.end_date],
                (error, results, fields) => {
                    res(results)
                }
            )
        })
        
        let total ={
            amount_bet: parseFloat(trade_his[0].amount_bet) + parseFloat(trade_his_cpt[0].amount_bet),
            amount_win: parseFloat(trade_his[0].amount_win) + parseFloat(trade_his_cpt[0].amount_win),
            amount_lose: parseFloat(trade_his[0].amount_lose) + parseFloat(trade_his_cpt[0].amount_lose),
        }
        
        return callback(null, {
            bet: trade_his[0],
            cp: trade_his_cpt[0],
            total:total
        });

    },
    getUserBalanceAnalyze: async (data, callback) => {

        const balance_his = await new Promise((res, rej) => {
            db.query(`SELECT COALESCE(SUM(nt.nt_vol),0) as nt_vol,COALESCE(SUM(rt.rt_vol),0) as rt_vol,COALESCE(SUM(hhgd.pending_commission),0) as pending_commission,COALESCE(SUM(hhvip.vip_commission),0) as vip_commission  FROM 
            users 
            LEFT JOIN
            (
            SELECT SUM(amount) as 'nt_vol',email,DATE(created_at) entry_date FROm trade_history  WHERE type_key = 'nt' AND network IN ('bep20','bank')
            GROUP by email, DATE(created_at) 
            ) as nt on users.email = nt.email
            LEFT JOIN
            (
                SELECT SUM(amount) as 'rt_vol',email,DATE(created_at) entry_date FROm trade_history WHERE type_key = 'rt' AND network IN ('bep20','bank')
                GROUP BY email, DATE(created_at) 
            ) as rt ON users.email = rt.email
            LEFT JOIN (
            SELECT SUM(pending_commission) as pending_commission,ref_id,DATE(created_at) entry_date FROM commission_history 
                                WHERE type='klgd'
                                GROUP BY ref_id,DATE(created_at)
            ) as hhgd ON users.ref_code = hhgd.ref_id
            LEFT JOIN (
             SELECT upline_id,SUM(vip_commission) as vip_commission,DATE(created_at) entry_date  FROM commission_history 
                            GROUP BY upline_id,DATE(created_at)
            ) as hhvip ON users.ref_code = hhvip.upline_id
            WHERE users.id = ?
            `,
                [data.id],
                (error, results, fields) => {
                    res(results)
                }
            )
        })

        return callback(null,balance_his[0]);
    },
    changeAccountInfo: (data, callback) => {
        db.query(
            `update users set first_name= ?,last_name=?, email_send=? where email = ?`,
            [data.first_name,
            data.last_name,
            data.email_send,
            data.email
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, {success:1})
            }
        )
    },
    checkTeleCode: (email,code, callback) => {
        db.query(
            `SELECT email, nick_name, password, active_2fa, secret_2fa, deleted_at,active,active_type,code_telegram,email_send,generate_code_time FROM users WHERE email = ? OR username = ?`,
            [email, email], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                if (results.length == 0) {
                    return callback(null)
                }

                if (!!results[0].deleted_at) {
                    return callback(null)
                }

                if(results[0].code_telegram == code.toString()){
                    const genreate_time = new Date(results[0].generate_code_time);
                    let genreate_time_time = genreate_time.getTime() + 600000;
                    
                    var current = new Date().getTime();

                    if(genreate_time_time>=current){
                        db.query(`UPDATE users SET code_telegram = NULL, generate_code_time = NULL WHERE email = ?`, [email]);
                        return callback(null, true)
                    }else{
                        return callback(null, false)
                    }
                    
                }

                return callback(null, false)
            }
        )
    },
    requestDeposit: async (data, callback) => {
       
        let user = await new Promise((resolve, reject) => {
            db.query(
                `select * from users where users.email = ?`, [data.email], (error, results, fields) => {
                    if (error) {
                        resolve([]);
                    }

                    resolve(results[0]);
                })
        })
        
        let teleText = `Thông báo nạp tiền: `;

        teleText+=`\n User: ${user.email} | ${user.nick_name}`;
        teleText+=`\n Bank: ${data.bank_name}`;
        teleText+=`\n Bank number: ${data.bank_number}`;
        teleText+=`\n Amount: ${data.bank_amount} $`;

        let user_deposit = DEPOSIT_USER[user.id];
      
        let diff = new Date().getTime() - user_deposit;
        let diffMinute = Math.round(diff / 60000);
       
        if(!user_deposit || (diffMinute >= 10)){

            db.query(`INSERT INTO bank_orders(email,nick_name,amount,created_at,bank_name,bank_number,status) VALUES(?,?,?,NOW(),?,?,0)`, [user.email,user.nick_name,data.bank_amount,data.bank_name,data.bank_number]);

            DEPOSIT_USER[user.id] = new Date().getTime();
            Tele.sendMessDeposit(teleText);
        }else{
            return callback(null,5 - diffMinute)
        }

        return callback(null, 0)
    },
    addDeposit: async (data, callback) => {
   

        if(data.code != "PxqwggQtVHAX"){
            return callback(null, -2);
        }

        let user = await new Promise((resolve, reject) => {
            db.query(
                `select * from users where users.nick_name = ? OR email = ?`, [data.nick_name,data.nick_name], (error, results, fields) => {
                    if (error) {
                        resolve([]);
                    }

                    resolve(results[0]);
                })
        })
       
        
        if(!user){
            return callback(null, -1);
        }

        if(Number(data.amount) <= 0){
            return callback(null, -1);
        }
        
        db.query(
            `UPDATE users SET money_usdt = money_usdt + ? WHERE email = ?`,
            [
              Number(data.amount),
              user.email,
            ], (error, results) => {
              if (error) reject2(error);
            }
          )

          const type = {
            type: 'Nạp tiền USDT (Bank)',
            type_en: 'USDT Deposit (Bank)',
            type_cam: 'ការដាក់ប្រាក់ USDT (Bank)'
          }
    

          db.query(`INSERT INTO trade_history (email, from_u, type_key, type, type_en, type_cam, currency, amount, real_amount, pay_fee, network, status, created_at)
          values(?,?,?,?,?,?,?,?,?,?,?,?,now())`,
            [
              user.email,
              user.nick_name,
              'nt',
              type.type,
              type.type_en,
              type.type_cam,
              'vnd',
              Number(data.amount),
              0,
              0,
              'bank',
              1,
            ], (err, results) => {
              if (err) {

              }
              else {
                Tele.sendMessNap(`Nạp thành công $${Number(data.amount)} ! \n Tài khoản  `+ user.email + " | "+user.nick_name, Number(data.amount));
                return callback(null, 1);
            }
            });
    },
    getAllUsers: async (callback) => {

        const balance_his = await new Promise((res, rej) => {
            db.query(`SELECT email as e, nick_name FROM users`,
                [],
                (error, results, fields) => {
                    res(results)
                }
            )
        })

        return callback(null,balance_his);
    },
    changeAdminInfo: async (data, callback) => {
   
        let user = await new Promise((resolve, reject) => {
            db.query(
                `select * from users where users.nick_name = ?`, [data.upline_id], (error, results, fields) => {
                    if (error) {
                        resolve([]);
                    }

                    resolve(results[0]);
                })
        })
       
        
        if(!user){
            return callback(null, -1);
        }

        db.query(`UPDATE users 
        SET upline_id = ? WHERE email = ?`,
        [user.ref_code, data.email
        ], (error, results, fields) => {
            if (error) {
                return callback(error)
            }

            return callback(null, 1)
        })
    },
}

