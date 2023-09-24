var db = require("../database");
const moment = require('moment-timezone');
const cors = require('cors');
const express = require('express');
const app = express();
const WebSocket = require('ws');
const config = require('../config.js');
const mailer = require("./../auth/mail")
const Helper = require("../helpers");
const { v1: uuidv1 } = require('uuid');
const cron = require("cron");
const staking_rate = require("../htmlMail/staking_rate");
const fileSys = config.PATH_SYS_CONFIG

let linkLogo = config.MAIL_LOGO
let linkFooter = config.MAIL_IMG_FOOTER
let titleSite = config.TITLE_SITE

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
 }));

var httpServer = null;

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

httpServer.listen(config.PORT_NOTIFY);
console.log('Server Notify run port: ' + config.PORT_NOTIFY);

class PlayerData {
    constructor(id, uid) {
        this.id = id
        this.uid = uid
    }
}

const ARES_USERS = {};

wss.on('connection', function (ws) {
    ws.on('message', d => {
        var data = JSON.parse(d);
        let obj = data.data;

        if (data.type === 'accountDetail') {
            let player = new PlayerData(uuidv1(), 0);
            player.ws = ws;
            player.email = obj.email;
            ARES_USERS[player.id] = player;
        }
    });

    ws.on('close', message => {
        for (let obj in ARES_USERS) {
            if (ARES_USERS[obj].ws == ws) {
                delete ARES_USERS[obj];
                break;
            }
        }
    });
})

function formatPrice(value, minimum) {
    var formatter = new Intl.NumberFormat('en-US', {
        //style: 'currency',
        //currency: '',
        minimumFractionDigits: minimum
    });
    return formatter.format(value);
}

const job = new cron.CronJob({
    cronTime: "0 7 * * *", // 7h sang https://crontab.guru/#0_7_*_*_*
    onTick: async () => {
        SEND_COMMISSION_USER();
        stakingRate();
    }
});
job.start();

async function stakingRate() {
  const dataSys = Helper.getConfig("stakingRate");
  const stakingRate = dataSys.stakingRate;
  if (stakingRate && !Number.isNaN(stakingRate)) {
    const accountMoneyOk = await new Promise((res, rej) => {
      db.query(
          `SELECT email, balance FROM account WHERE type = 1 AND balance > 0`,
          [],
          (error, results, fields) => {
              res(results || []);
          })
    });

    const groupMoneyByEmail = {};

    accountMoneyOk.forEach((item) => {
        if (void 0 === groupMoneyByEmail[item.email]) {
            groupMoneyByEmail[item.email] = {};
        }

        if (void 0 === groupMoneyByEmail[item.email].tkLive) {
            groupMoneyByEmail[item.email].tkLive = 0;
        }

        groupMoneyByEmail[item.email].tkLive += Number(item.balance);
    });

    const userMoneyOk = await new Promise((res, rej) => {
      db.query(
          `SELECT email, nick_name, money_usdt FROM users WHERE money_usdt > 0`,
          [],
          (error, results, fields) => {
              res(results || []);
          })
    });

    userMoneyOk.forEach((item) => {
        if (void 0 === groupMoneyByEmail[item.email]) {
            groupMoneyByEmail[item.email] = {};
        }

        if (void 0 === groupMoneyByEmail[item.email].tkVi) {
            groupMoneyByEmail[item.email].tkVi = 0;
        }

        groupMoneyByEmail[item.email].tkVi += Number(item.money_usdt);
    });

    try {
      await Promise.all(
        Object.keys(groupMoneyByEmail).map(async (email) => {
          if (!groupMoneyByEmail[email]) return;
          const precentPerDay = stakingRate / 365 / 100;
          const moneyTotal = groupMoneyByEmail[email].tkLive + groupMoneyByEmail[email].tkVi;

          const nick_name = await new Promise((res, rej) => {
            db.query(
                `select nick_name from users WHERE email = ?`,
                [email],
                (error, results, fields) => {
                    res(results[0].nick_name);
                })
          });

          await new Promise((res, rej) => {
            db.query(
                `UPDATE users SET money_usdt = money_usdt + ? WHERE email = ?`,
                [moneyTotal * precentPerDay, email],
                (error, results, fields) => {
                    res(results);
                })
          });

          await sleep(50);
          const subject = `${config.TITLE_SITE} Staking`;
        //   const content = `Bạn vừa nhận được $${(moneyTotal * precentPerDay).toFixed(2)} tiền lãi qua đêm từ số dư TK thực: $${groupMoneyByEmail[email].tkLive.toFixed(2)} và TK Ví: $${groupMoneyByEmail[email].tkVi.toFixed(2)} (APY: ${stakingRate}%).`;

          const title_sta = {
            title: `${config.TITLE_SITE} Staking`,
            title_en: `${config.TITLE_SITE} Staking`,
            title_cam: `${config.TITLE_SITE} Staking`,
          };

          const content = {
            content: `Bạn vừa nhận được $${(moneyTotal * precentPerDay).toFixed(2)} tiền lãi qua đêm từ số dư TK thực: $${groupMoneyByEmail[email].tkLive.toFixed(2)} và TK Ví: $${groupMoneyByEmail[email].tkVi.toFixed(2)} (APY: ${stakingRate}%).`,
            content_en: `You just received $${(moneyTotal * precentPerDay).toFixed(2)} overnight interest from real account balance: $${groupMoneyByEmail[email].tkLive.toFixed(2)} and Wallet account: $${groupMoneyByEmail[email].tkVi.toFixed(2)} (APY: ${stakingRate}%).`,
            content_cam: `អ្នកទើបតែទទួលបាន $${(moneyTotal * precentPerDay).toFixed(2)} ការប្រាក់ពេញមួយយប់ពីសមតុល្យគណនីពិត៖ $${groupMoneyByEmail[email].tkLive.toFixed(2)} និងគណនីកាបូប៖ $${groupMoneyByEmail[email ].tkVi.toFixed(2)} (APY: ${stakingRate}%).`,
          };

          const body = staking_rate.htmlStakingRate(content, nick_name, linkLogo, linkFooter, titleSite, subject)

          if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
            //   mailer.sendMail(email, subject, body)
          }

          db.query(`insert into trade_history (email, from_u, to_u, type_key, type, type_en, type_cam, currency, amount, note, status, created_at)
            values(?,?,?,?,?,?,?,?,?,?,?,now())`,
            [
                email,
                config.TITLE_SITE,
                nick_name,
                'staking_rate',
                content.content,
                content.content_en,
                content.content_cam,
                'usdt',
                Number((moneyTotal * precentPerDay).toFixed(2)),
                null,
                1
            ]);

            SEND_THONG_BAO_LANGS('staking', email, email, title_sta, content);

        //   SEND_THONG_BAO('staking', email, email, subject, content);
        })
      );
    } catch (error) {
      console.log(error); 
    }
  }
}

async function SEND_COMMISSION_USER() { // tổng kết hoa hồng mỗi ngày

    let data = await new Promise((res, rej) => {
        db.query(
            `SELECT email FROM users WHERE pending_commission > 0`,
            [],
            (error, results, fields) => {
                res(results);
            })
    })

    for (let i = 0; i < data.length; i++) {
        let email = data[i].email;
        await new Promise((res, rej) => {
            db.query(
                `SELECT SUM(pending_commission) AS totalCM 
                FROM commission_history WHERE email = ? AND DATE(created_at) = DATE(NOW() - INTERVAL 1 DAY);`,
                [
                    email
                ],
                (error, result, fields) => {
                    let dt2 = moment().tz("Asia/Ho_Chi_Minh");
                    let cach1ngay = dt2.subtract(1, 'days').format("YYYY-MM-DD");
                    // let noidung = `Bạn đã nhận thành công hoa hồng giao dịch giá <b>${formatPrice(result[0].totalCM, 2)} USDT</b> cho ngày <b>${cach1ngay}</b>`
                    // let title = 'Bạn đã nhận Hoa hồng Giao dịch';

                    const title = {
                        title: 'Bạn đã nhận Hoa hồng Giao dịch',
                        title_en: 'You have received Trading Commission',
                        title_cam: 'អ្នកបានទទួលគណៈកម្មការជួញដូរ'
                    }

                    const content = {
                        content: `Bạn đã nhận thành công hoa hồng giao dịch giá <b>${formatPrice(result[0].totalCM, 2)} USDT</b> cho ngày <b>${cach1ngay}</b>`,
                        content_en: `<b>Congratulations to the player: ${user[0]['email'].substring(0, 3)}*** won $${reward_result.name} in lucky spin.</b>`,
                        content_cam: `អ្នកបានទទួលដោយជោគជ័យនូវកម្រៃជើងសារពាណិជ្ជកម្ម <b>${formatPrice(result[0].totalCM, 2)} USDT</b> សម្រាប់ <b>${cach1ngay}</b>`
                    }


                    SEND_THONG_BAO_LANGS('vip', email, email, title, content);
                    res();
                })
        });
    }
}

function SEND_THONG_BAO(type, cuem, email, title, content) {
    for (let obj in ARES_USERS) {
        let em = ARES_USERS[obj].email;
        if (em === email) {
            let ws = ARES_USERS[obj].ws;
            ws.send(JSON.stringify({ typeSocket: 'notifiSms', type, title: title, content: content }));
        }
    }

    SAVE_LOG_NOTIFI(type, cuem, email, title, content);
}

function SEND_THONG_BAO_LANGS(type, cuem, email, title, content) {
    const title_en = title.title_en;
    const title_cam = title.title_cam;
    const title_vn = title.title;

    const content_en = content.content_en; 
    const content_cam = content.content_cam;
    const content_vn = content.content;           

    for (let obj in ARES_USERS) {
        let em = ARES_USERS[obj].email;
        if (em === email) {
            let ws = ARES_USERS[obj].ws;
            ws.send(JSON.stringify({ 
                typeSocket: 'notifiSms', type,
                title: title_vn, title_en: title_en, title_cam: title_cam,
                content: content_vn, content_en: content_en, content_cam: content_cam
            }));
        }
    }

    SAVE_LOG_NOTIFI_LANGS(type, cuem, email, title, content);
}

function SAVE_LOG_NOTIFI_LANGS(type, cue, email, title, content) {
    db.query(`INSERT INTO notifi (cu_email, email, content, content_en, content_cam, title, title_en, title_cam, type, created_at)
    VALUES (?,?,?,?,?,?,?,?,?,now())`,
        [
            cue,
            email,
            content.content,
            content.content_en,
            content.content_cam,
            title.title,
            title.title_en,
            title.title_cam,
            type
        ], (error, results, fields) => {
            if (error) {
                console.log(error);
            }

            console.log('insert notifi success!');
        })
}


function SAVE_LOG_NOTIFI(type, cue, email, title, content) {
    db.query(`INSERT INTO notifi (cu_email, email, content, title, type, created_at)
    VALUES (?,?,?,?,?,now())`,
        [
            cue,
            email,
            content,
            title,
            type
        ], (error, results, fields) => {
            if (error) {
                console.log(error);
            }

            console.log('insert notifi success!');
        })
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, ms)
  })
}

module.exports = {
    SEND_THONG_BAO: SEND_THONG_BAO,
    SAVE_LOG_NOTIFI,
    SEND_THONG_BAO_LANGS: SEND_THONG_BAO_LANGS,
    SAVE_LOG_NOTIFI_LANGS,
}