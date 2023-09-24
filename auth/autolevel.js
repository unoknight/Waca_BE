const cron = require("cron");
var db = require("../database");

const job = new cron.CronJob({
    cronTime: "1 0 * * 1", // 0h tháng mới
    onTick: async () => {
        cleanData();
    }
});

async function cleanData() {
    let listUsers = await new Promise((resolve, reject) => {
        console.log("Start auto update level");
        // tổng số đại lý ( đã mua vip ) của bản thân
        // AND vip_user = ?
        db.query(
            `SELECT userMain.email,userMain.level_vip,userMain.vip_user, COALESCE(SUM(bet.amount_bet),0) as 'amount_bet', COALESCE(SUM(cp.amount_cp),0) as 'amount_cp',SUM(CASE WHEN userChild.vip_user=1 THEN 1 ELSE 0 END) as 'count' FROM users as userMain
            LEFT JOIN users as userChild ON userMain.ref_code  = userChild.upline_id 
            LEFT JOIN (
                                SELECT bet_history.email,COALESCE(SUM(bet_history.amount_bet),0) as 'amount_bet' FROM bet_history
                                WHERE bet_history.marketing = 0 AND bet_history.type_account = 1 
                                AND WEEKOFYEAR(bet_history.created_at) = (WEEKOFYEAR(NOW()) - 1)
                                GROUP BY bet_history.email) as bet ON userChild.email = bet.email
                                LEFT JOIN(
                                        SELECT copy_trade_history.email,SUM(copy_trade_history.value) as 'amount_cp' FROM copy_trade_history 
                                        WHERE copy_trade_history.acc_type = 1 AND WEEKOFYEAR(copy_trade_history.created_at) = (WEEKOFYEAR(NOW()) - 1)
                                        GROUP BY copy_trade_history.email
            ) as cp ON userChild.email = cp.email
            WHERE userMain.vip_user = ?
            AND userMain.marketing = 0
            AND userMain.nick_name NOT IN('henry2019','wacaglobal','racatop','badung98a','bitcoin99','bitcoin8989','ciaozay','protrade37','niko7777','laonhaque69','wacacambodia')
            GROUP BY userMain.email, userMain.level_vip,userMain.vip_user`,[1], (error, results, fields) => {
                if (error) {
                    resolve([]);
                }

                resolve(results);
            })
    })

    await new Promise((resolve, reject) => {
        listUsers.forEach(function (item) {
            let totalDLVip = item.count * 1;

            let hhTuanNay = Number.parseFloat(item.amount_bet) + Number.parseFloat(item.amount_cp);
            let lvVip = Number.parseInt(item.level_vip);

            console.log("Email :" + item.email + " HH:" + hhTuanNay);

            // UPDATE vip level nếu đủ tổng hoa hồng
            if (lvVip <= 8) {
                let level = 1;
                
                if (totalDLVip >= 3 && hhTuanNay >= 2000) {
                    level = 2;
                } 
                
                if (totalDLVip >= 4 && hhTuanNay >= 4000) {
                    level = 3;
                }
                
                if (totalDLVip >= 5 && hhTuanNay >= 8000) {
                   level = 4;
                }
                
                if (totalDLVip >= 6 && hhTuanNay >= 16000) {
                   level = 5;
                } 
                if (totalDLVip >= 7 && hhTuanNay >= 32000) {
                    level = 6;
                } 
                if (totalDLVip >= 8 && hhTuanNay >= 64000) {
                  level = 7;
                }
                if(totalDLVip < 3 || hhTuanNay < 2000){
                    level = 1;
                }

                db.query(`UPDATE users SET level_vip = ? WHERE email = ?`, [level,item.email])
            }
        });
    })

    //   db.query(`delete from trade_history WHERE MONTH(created_at) != MONTH(now())`);
    //   db.query(`delete from commission_history WHERE MONTH(created_at) != MONTH(now())`);
    //   db.query(`delete from bet_history WHERE MONTH(created_at) != MONTH(now())`);
}

job.start();
