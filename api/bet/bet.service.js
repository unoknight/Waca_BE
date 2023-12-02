const db = require("./../../database");
const Tele = require("../../auth/telegram_notify");

module.exports = {
    getAllBetHis: async (query, callback) => {
        let sql = `SELECT bet_history.*,users.nick_name FROM bet_history JOIN users ON bet_history.email = users.email WHERE bet_history.status = 1`
        let copyTradeSql = `SELECT  value as amount_bet,
                                    sum as amount_win, 
                                    trend as buy_sell, 
                                    open as open, 
                                    close as close,
                                    'BTC/USDT' as currency,
                                    copy_trade_history.email as email,
                                    order_id as session,
                                    acc_type as type_account,
                                    copy_trade_history.created_at as created_at,
                                    copy_trade_history.id,
                                    users.marketing as marketing,
                                    users.nick_name
                            FROM copy_trade_history
                            JOIN users ON copy_trade_history.email = users.email
                            WHERE acc_type = 1 AND sum IS NOT NULL`
        if (void 0 !== query.email) {
            sql += ` and bet_history.email = '${query.email}' `;
            copyTradeSql += ` and copy_trade_history.email = '${query.email}'`;
        }

        if (void 0 !== query.f) {
            let f = '';
            switch (query.f) {
                case 'hom-nay':
                    f = ' and DATE(bet_history.created_at) = DATE(NOW())'
                    break;
                case 'hom-qua':
                    f = ' and DATE(bet_history.created_at) = DATE(NOW()) - 1'
                    break;
                case 'tuan-nay':
                    f = ' and WEEK(bet_history.created_at)=WEEK(now())'
                    break;
                case 'tuan-truoc':
                    f = ' and WEEK(bet_history.created_at)=WEEK(now()) - 1'
                    break;
                case 'thang-nay':
                    f = ' and MONTH(bet_history.created_at)=MONTH(now())'
                    break;
                case 'thang-truoc':
                    f = ' and MONTH(bet_history.created_at)=MONTH(now()) - 1'
                    break;

                default:
                    break;
            }

            let fcopy = '';
            switch (query.f) {
                case 'hom-nay':
                    fcopy = ' and DATE(copy_trade_history.created_at) = DATE(NOW())'
                    break;
                case 'hom-qua':
                    fcopy = ' and DATE(copy_trade_history.created_at) = DATE(NOW()) - 1'
                    break;
                case 'tuan-nay':
                    fcopy = ' and WEEK(copy_trade_history.created_at)=WEEK(now())'
                    break;
                case 'tuan-truoc':
                    fcopy = ' and WEEK(copy_trade_history.created_at)=WEEK(now()) - 1'
                    break;
                case 'thang-nay':
                    fcopy = ' and MONTH(copy_trade_history.created_at)=MONTH(now())'
                    break;
                case 'thang-truoc':
                    fcopy = ' and MONTH(copy_trade_history.created_at)=MONTH(now()) - 1'
                    break;

                default:
                    break;
            }
            f = ' and WEEK(bet_history.created_at)=WEEK(now())';
            fcopy = ' and WEEK(copy_trade_history.created_at)=WEEK(now())';
            sql += f;

            copyTradeSql += fcopy;
        }

        if (void 0 !== query.from && void 0 !== query.to) {
            // YYYY-MM-DD
            sql += ` and bet_history.created_at BETWEEN '${query.from}' and '${query.to}'`;
            copyTradeSql += ` and copy_trade_history.created_at BETWEEN '${query.from}' and '${query.to}'`;
        }

        sql += ' ORDER BY bet_history.id DESC ';
        copyTradeSql += ' ORDER BY copy_trade_history.id DESC LIMIT 1000';
        const betOrders = await new Promise((res, rej) => {
            db.query(
                sql,
                [], (error, results, fields) => {
                    if (error) {
                        console.log(error)
                    }

                    res(results)
                }
            )
        });

        const copyTradeOrders = await new Promise((res, rej) => {
            db.query(
                copyTradeSql,
                [], (error, results, fields) => {
                    if (error) {
                        console.log(error)
                    }

                    res(results)
                }
            )
        });

        const formatCopyTradeOrders = copyTradeOrders.map((e) => {
            const amount_lose = e.amount_win < 0 ? e.amount_win : 0;
            const amount_win = e.amount_win > 0 ? e.amount_win : 0;
            return Object.assign(e, { id: 0, amount_lose, amount_win });
        })

        const lastResults = [...betOrders, ...copyTradeOrders].sort(function (a, b) {
            return new Date(b.created_at) - new Date(a.created_at)
        })
        return callback(null, lastResults);
    },

    getAllBetHisTrash: callback => {
        db.query(
            `SELECT * FROM bet_history WHERE status = 0 ORDER BY id desc `,
            [], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results)
            }
        )
    },

    deleteBetHisById: (data, callback) => {
        db.query(
            `UPDATE bet_history SET status = ? WHERE id = ?`,
            [data.val,
            data.id
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results)
            }
        )
    },
    getAllChampion: (champion_id, callback) => {
        db.query(
            `SELECT DISTINCT champion_players.balance,users.nick_name FROM champion_players JOIN users ON champion_players.email = users.email WHERE champion_players.champion_id = ? and (users.marketing = 0 OR champion_players.email IN ('top1giaidau@gmail.com','top2giaidau@gmail.com','top3giaidau@gmail.com','top4giaidau@gmail.com','top5giaidau@gmail.com')) ORDER BY champion_players.balance desc LIMIT 20`,
            [champion_id], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                let result_chapmion = [];

                if (results && results.length > 0) {
                    result_chapmion = results.map((item) => {
                        let res_nick = item.nick_name.substring(0, 3) + "***";
                        return {
                            balance: item.balance,
                            nick_name: res_nick
                        };
                    });
                }

                return callback(null, result_chapmion)
            }
        )
    },
    getChampionDetailService: (champion_id, callback) => {
        db.query(
            `SELECT name,dateStart,dateEnd,type,totalRewards,background FROM champions WHERE id = ?`,
            [champion_id], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                if (results && results.length > 0) {
                    return callback(null, results[0]);
                }

                return callback(null, {})
            }
        )
    },
    insertDupLenh: async (data, callback) => {
       try {
        const betOrder = await new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM bet_duplicate WHERE email= ?  and active = ?`,
                [data.email, 1], (error, results, fields) => {
                    if (error) {
                        resolve(null);
                    }

                    if(results.length >0){
                        resolve(results[0])
                    }else{
                        resolve(null);
                    }
                }
            )
        });
       
        if(betOrder){
            return callback({
                status: "exists",
                data: betOrder
            });
        }

        db.query(
            `INSERT INTO bet_duplicate(email,amount, amount_bet,amount_real,active,time_reg) VALUE(?,?,?,?,1,NOW())`,
            [
                data.email,
                data.amount,
                data.amount_bet,
                data.amount_real,
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                Tele.sendMessThongBao(`Admin thêm lệnh dup \n- Email:  ${data.email}\n- Số tiền: ${data.amount} $`);

                return callback({
                    status: "success",
                });
            }
                
        )
       } catch (error) {
        
        
       }
    },
}
