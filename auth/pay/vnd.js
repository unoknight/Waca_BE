const express = require('express')
const Tele = require("../telegram_notify")
const db = require("../../database");
const app = express();

app.get('/vnd', function (req, res) {
  const { a, n, al, b } = req.query;

  db.query(`SELECT email FROM users WHERE nick_name = ?`, [n], (err, result) => {
    if (err) {
      throw new Error(err);
    }

    if (Array.isArray(result) && result.length) {
      const email = result[0].email;
      /**
       * status: 0: gửi admin phê duyệt
       * 1: success
       * -1: cancel
       */

      const type = {
        type: `Nạp tiền (VNĐ)`,
        type_en: `Deposit (VND)`,
        type_cam: `ដាក់ប្រាក់ (VND)`
      };

      db.query(`INSERT INTO trade_history (email, from_u, type_key, type, type_en, type_cam, currency, amount, real_amount, status, bank, created_at)
      values(?,?,?,?,?,?,?,?,?,?,?,now())`,
        [
          email,
          n,
          'nt',
          type.type,
          type.type_en,
          type.type_cam,
          'vnd',
          a,
          al,
          0,
          b,
        ], (err, result1) => {
          if (err) {
            throw new Error(err);
          }
          res.status(200).json({ success: 1 });
        });
    }
  });
});

app.post('/approval', function (req, res) {
  const body = req.body;
  const {
    status,
    id,
    note,
    amount,
    email,
  } = body;

  db.query(`UPDATE trade_history SET status = ?, note = ? WHERE id = ?`,
    [
      status,
      note,
      id,
    ], (err) => {
      if (err) {
        throw new Error(err);
      }

      if (status === 1) {
        db.query(`UPDATE users SET money_usdt = money_usdt + ? WHERE email = ?`, [
          amount,
          email,
        ], (err1) => {
          if (err1) {
            throw new Error(err1);
          }

          Tele.sendMessNap(`Email: <b>${email}</b>\n
Vừa nạp: <b>$${amount}</b> bằng phương thức chuyển khoản ngân hàng (VNĐ).\n`)

          res.status(200).json({ success: 1 });
        })
      } else {
        res.status(200).json({ success: 1 });
      }
    });
});

app.post('/approval-rut', function (req, res) {
  const body = req.body;
  const {
    status,
    id,
    note,
    amount,
    email,
  } = body;

  db.query(`UPDATE trade_history SET status = ?, note = ? WHERE id = ?`,
    [
      status,
      note,
      id,
    ], (err) => {
      if (err) {
        throw new Error(err);
      }
      // Từ chối rút tiền thì cộng lại tiền cho user
      if (status === -1) {
        db.query(`UPDATE users SET money_usdt = money_usdt + ? WHERE email = ?`, [
          amount,
          email,
        ], (err1) => {
          if (err1) {
            throw new Error(err1);
          }

          res.status(200).json({ success: 1 });
        })
      } else {
        Tele.sendMessNap(`Email: <b>${email}</b>\n
Vừa rút: <b>$${amount}</b> bằng phương thức chuyển khoản ngân hàng (VNĐ).\n`)
        res.status(200).json({ success: 1 });
      }
    });
});


app.post('/approval-bank', async function (req, res) {
  const body = req.body;

  const {
    status,
    id,
    code
  } = body;

  if (code !== "PxqwggQtVHAX") {
   return res.status(200).json({ success: -2 });
  }

  let order = await new Promise((resolve, reject) => {
    db.query(
        `select * from bank_orders where id = ? `, [id], (error, results, fields) => {
            if (error) {
                resolve([]);
            }

            resolve(results[0]);
        })
})
  
  db.query(`UPDATE bank_orders SET status = ? WHERE id = ?`,
    [
      status,
      id,
    ], (err) => {
      if (err) {
        throw new Error(err);
      }

      if (status === 1) {

        db.query(
          `UPDATE users SET money_usdt = money_usdt + ? WHERE email = ?`,
          [
            Number(order.amount),
            order.email,
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
            order.email,
            order.nick_name,
            'nt',
            type.type,
            type.type_en,
            type.type_cam,
            'vnd',
            Number(order.amount),
            0,
            0,
            'bank',
            1,
          ], (err, results) => {
            if (err) {

            }
            else {
              Tele.sendMessNap(`Nạp thành công $${Number(order.amount)} ! \n Tài khoản  ` + order.email + " | " + order.nick_name, Number(order.amount));
            }
          });
        

          return res.status(200).json({ success: 1 });
      } else {
       
        return res.status(200).json({ success: 1 });
      }
    });
});

module.exports = app;