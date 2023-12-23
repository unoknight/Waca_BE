const db = require("./../../database");
const SmartChain = require("./../sendCoint");
const moment = require('moment-timezone');
const { mysql_real_escape_string } = require('../../helper/sqlFriend')

module.exports = {
    getAllTradeHis: async (query, callback) => {
        const offset = Number(query.offset || 0);
        const limit = Number(query.limit || 20);
        const searchTxt = query.s
        let count = 0;
        if(searchTxt) {
            count = await new Promise((res, rej) => {
                db.query(
                    `select COUNT(id) as count from trade_history where delete_status = 0 and (type_key != "nt" and type_key != "nn") AND email LIKE "%${searchTxt}%"`,
                    [], (error, results, fields) => {
                        res(results[0].count) 
                    }
                )
            });
    
            db.query(
                `select * from trade_history where delete_status = 0 and (type_key != "nt" and type_key != "nn") AND email LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?`,
                [`%${searchTxt}%`, limit, offset], (error, results, fields) => {
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

                    return callback(null, {count, items: results})
                }
            )
        } else {
            count = await new Promise((res, rej) => {
                db.query(
                    `select COUNT(id) as count from trade_history where delete_status = 0 and (type_key != "nt" and type_key != "nn")`,
                    [], (error, results, fields) => {
                        res(results[0].count) 
                    }
                )
            });
    
            db.query(
                `select * from trade_history where delete_status = 0 and (type_key != "nt" and type_key != "nn") ORDER BY id DESC LIMIT ? OFFSET ?`,
                [limit, offset], (error, results, fields) => {
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

                    return callback(null, {count, items: results})
                }
            )
        }
    },

    getAllTradeHisTrash: async (query, callback) => {
        const offset = Number(query.offset || 0);
        const limit = Number(query.limit || 20);
        const searchTxt = query.s
        let count = 0;
        if(searchTxt) {
            count = await new Promise((res, rej) => {
                db.query(
                    `select COUNT(id) as count from trade_history where delete_status = 1 and (type_key != "nt" and type_key != "nn") AND email LIKE ?`,
                    [`%${searchTxt}%`], (error, results, fields) => {
                        res(results[0].count) 
                    }
                )
            });
    
            db.query(
                `select * from trade_history where delete_status = 1 and (type_key != "nt" and type_key != "nn") AND email LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?`,
                [`%${searchTxt}%`, limit, offset], (error, results, fields) => {
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

                    return callback(null, {count, items: results})
                }
            )
        } else {
            count = await new Promise((res, rej) => {
                db.query(
                    `select COUNT(id) as count from trade_history where delete_status = 1 and (type_key != "nt" and type_key != "nn")`,
                    [], (error, results, fields) => {
                        res(results[0].count) 
                    }
                )
            });
    
            db.query(
                `select * from trade_history where delete_status = 1 and (type_key != "nt" and type_key != "nn") ORDER BY id DESC LIMIT ? OFFSET ?`,
                [limit, offset], (error, results, fields) => {
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

                    return callback(null, {count, items: results})
                }
            )
        }
    },

    deleteTradeHisById: (data, callback) => {
        db.query(
            `update trade_history set delete_status= ? where id = ?`,
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

    getAllDepositHis: callback => {
        db.query(
            `select * from trade_history where delete_status = 0 and (type_key = "nt" or type_key = "nn") order by id desc `,
            [], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results)
            }
        )
    },

    getAllDepositHisTrash: async (query, callback) => {
        // db.query(
        //     `select * from trade_history where delete_status = 1 and (type_key = "nt" or type_key = "nn") order by id desc `,
        //     [], (error, results, fields) => {
        //         if (error) {
        //             return callback(error);
        //         }
        //         return callback(null, results)
        //     }
        // )
        
        const offset = Number(query.offset || 0);
        const limit = Number(query.limit || 20);
        const searchTxt = query.s
        let count = 0;
        if(searchTxt) {
            count = await new Promise((res, rej) => {
                db.query(
                    `select COUNT(id) as count from trade_history where delete_status = 1 and (type_key = "nt" or type_key = "nn") AND email LIKE ?`,
                    [`%${searchTxt}%`], (error, results, fields) => {
                        res(results[0].count) 
                    }
                )
            });
    
            db.query(
                `select * from trade_history where delete_status = 1 and (type_key = "nt" or type_key = "nn") AND email LIKE ?  ORDER BY id DESC LIMIT ? OFFSET ?`,
                [`%${searchTxt}%`, limit, offset], (error, results, fields) => {
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

                    return callback(null, {count, items: results})
                }
            )
        } else {
            count = await new Promise((res, rej) => {
                db.query(
                    `select COUNT(id) as count from trade_history where delete_status = 1 and (type_key = "nt" or type_key = "nn")`,
                    [], (error, results, fields) => {
                        res(results[0].count) 
                    }
                )
            });
    
            db.query(
                `select * from trade_history where delete_status = 1 and (type_key = "nt" or type_key = "nn") ORDER BY id DESC LIMIT ? OFFSET ?`,
                [limit, offset], (error, results, fields) => {
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

                    return callback(null, {count, items: results})
                }
            )
        }
    },

    getAllWithDrawalHis: async (query, callback) => {
        let sql = `select * from trade_history where delete_status = 0 and type_key = "rt"`
        
        //Phan trang admin
        if(query.limit || query.offset || query.s){
           const offset = Number(query.offset || 0);
           const limit = Number(query.limit || 20);
           const searchTxt = query.s
           let count = 0;
           if(searchTxt) {
               count = await new Promise((res, rej) => {
                   db.query(
                       `select COUNT(trade_history.id) as count from trade_history JOIN users ON trade_history.email = users.email  where trade_history.delete_status = 0 and trade_history.type_key = "rt" AND (trade_history.email LIKE ? OR users.nick_name LIKE ?)`,
                       [`%${searchTxt}%`,`%${searchTxt}%`], (error, results, fields) => {
                          res(results[0].count) 
                       }
                   )
               });
       
               db.query(
                   `select trade_history.* from trade_history JOIN users ON trade_history.email = users.email where trade_history.delete_status = 0 and trade_history.type_key = "rt" AND (trade_history.email LIKE ? OR users.nick_name LIKE ?)  ORDER BY trade_history.id DESC LIMIT ? OFFSET ?`,
                   [`%${searchTxt}%`,`%${searchTxt}%`, limit, offset], (error, results, fields) => {
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

                       return callback(null, {count, items: results})
                   }
               )
           } else {
               count = await new Promise((res, rej) => {
                   db.query(
                       `select COUNT(id) as count from trade_history where delete_status = 0 and type_key = "rt"`,
                       [], (error, results, fields) => {
                          res(results[0].count) 
                       }
                   )
               });
       
               db.query(
                   `${sql} ORDER BY id DESC LIMIT ? OFFSET ?`,
                   [limit, offset], (error, results, fields) => {
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

                       return callback(null, {count, items: results})
                   }
               )
           }
       }

       if (void 0 !== query.email) {
           sql += ` and email = '${query.email}'`;
       }

       if (void 0 !== query.f) {
           let f = '';
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

           sql += f;
       }

       if (void 0 !== query.from && void 0 !== query.to) {
           // YYYY-MM-DD
           sql += ` and created_at BETWEEN '${query.from}' and '${query.to}'`;
       }

       sql += ' order by id desc';
       db.query(
           sql,
           [], (error, results, fields) => {
               if (error) {
                   return callback(error);
               }

               return callback(null, results)
           }
       )
    },

    getAllDepositHis: async (query, callback) => {
        let sql = `select * from trade_history where delete_status = 0 and (type_key = "nt" or type_key = "nn")`

        //Phan trang admin
        if(query.limit || query.offset || query.s){
            const offset = Number(query.offset || 0);
            const limit = Number(query.limit || 20);
            const searchTxt = query.s
            let count = 0;
            if(searchTxt) {
                count = await new Promise((res, rej) => {
                    db.query(
                        `select COUNT(trade_history.id) as count from trade_history JOIN users ON trade_history.email = users.email where trade_history.delete_status = 0 and (trade_history.type_key = "nt" or trade_history.type_key = "nn") AND (trade_history.email LIKE ? OR users.nick_name LIKE ?)`,
                        [`%${searchTxt}%`,`%${searchTxt}%`], (error, results, fields) => {
                           res(results[0].count) 
                        }
                    )
                });
        
                db.query(
                    `select trade_history.* from trade_history JOIN users ON trade_history.email = users.email  where trade_history.delete_status = 0 and (trade_history.type_key = "nt" or trade_history.type_key = "nn") AND (trade_history.email LIKE ?  OR users.nick_name LIKE ?) ORDER BY trade_history.id DESC LIMIT ? OFFSET ?`,
                    [`%${searchTxt}%`,`%${searchTxt}%`, limit, offset], (error, results, fields) => {
                        if (error) {
                            return callback(error);
                        }

                        console.log(results);
                        if (results.length) {
                            results.forEach(item => {
                                delete item.privateKey_BTC;
                                delete item.privateKey_ETH;
                                delete item.wif_BTC;
                                delete item.privateKey_USDT;
                            });
                        }

                        return callback(null, {count, items: results})
                    }
                )
            } else {
                count = await new Promise((res, rej) => {
                    db.query(
                        `select COUNT(id) as count from trade_history where delete_status = 0 and (type_key = "nt" or type_key = "nn")`,
                        [], (error, results, fields) => {
                           res(results[0].count) 
                        }
                    )
                });
        
                db.query(
                    `${sql} ORDER BY id DESC LIMIT ? OFFSET ?`,
                    [limit, offset], (error, results, fields) => {
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

                        return callback(null, {count, items: results})
                    }
                )
            }
        }

        if (void 0 !== query.email) {
            sql += ` and email = '${query.email}'`;
        }

        if (void 0 !== query.f) {
            let f = '';
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

            sql += f;
        }

        if (void 0 !== query.from && void 0 !== query.to) {
            // YYYY-MM-DD
            sql += ` and created_at BETWEEN '${query.from}' and '${query.to}'`;
        }

        sql += ' order by id desc';
        db.query(
            sql,
            [], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results)
            }
        )
    },

    historyAllAddMoney: async (query, callback) => {
        const offset = Number(query.offset || 0);
        const limit = Number(query.limit || 20);
        const searchTxt = query.s
        let count = 0;
        if(searchTxt) {
            count = await new Promise((res, rej) => {
                db.query(
                    `select COUNT(id) as count from add_money_history where email LIKE ?`,
                    [`%${searchTxt}%`], (error, results, fields) => {
                        res(results[0].count) 
                    }
                )
            });
    
            db.query(
                `select * from add_money_history where email LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?`,
                [`%${searchTxt}%`, limit, offset], (error, results, fields) => {
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

                    return callback(null, {count, items: results})
                }
            )
        } else {
            count = await new Promise((res, rej) => {
                db.query(
                    `select COUNT(id) as count from add_money_history`,
                    [], (error, results, fields) => {
                        res(results[0].count) 
                    }
                )
            });
    
            db.query(
                `select * from add_money_history ORDER BY id DESC LIMIT ? OFFSET ?`,
                [limit, offset], (error, results, fields) => {
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

                    return callback(null, {count, items: results})
                }
            )
        }
    },

    doneWithdrawal: (data, callback) => {
        if (data.network == 'erc20') {
            let r = SmartChain.sendCoinETH_ERC20(data.amount, data.address, data.id);
            r.then((res) => {
                if (res.success == 1) {
                    return callback(null, res);
                } else {
                    return callback(null, res)
                }
            }, reason => {
                console.error(reason); // Error!
            })
        } else {
            let r = SmartChain.sendCoinBSC_BEP20(data.amount, data.address, data.id);
            r.then((res) => {
                if (res.success == 1) {
                    return callback(null, res);
                } else {
                    return callback(null, res)
                }
            }, reason => {
                console.error(reason); // Error!
            })
        }
    },

    doneRefuseWithdrawal: (data, callback) => {
        db.query(`UPDATE trade_history SET status = ? WHERE id = ?`,
            [
                2,
                data.id
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results)
            }
        )

        let amount = Number(data.amount) + Number(data.fee);

        db.query(`UPDATE users SET money_usdt = money_usdt + ? WHERE email = ?`,
            [
                amount,
                data.email
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results)
            }
        )
    },

    getRevenueNap: callback => {
        db.query(
            `SELECT SUM(amount) AS dtUSD, SUM(real_amount) AS dtBNB, SUM(pay_fee) AS freeBNB FROM trade_history WHERE type_key = ? AND status = 1 AND (network = ? OR network = ?)`,
            [
                'nt', // nạp tiền
                'bep20',
                'bank'
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results[0])
            }
        )
    },

    getRevenueRut: callback => {
        db.query(
            `SELECT SUM(amount) AS dtUSD, SUM(real_amount) AS dtBNB, SUM(pay_fee) AS freeBNB FROM trade_history WHERE type_key = ? AND status = 1 AND (network = ? OR network = ?)`,
            [
                'rt', // rút tiền
                'bep20',
                'bank'
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results[0])
            }
        )
    },

    getRevenueTrans: callback => {
        db.query(
            `SELECT SUM(amount) AS dtUSD, SUM(real_amount) AS dtBNB, SUM(pay_fee) AS freeBNB FROM trade_history WHERE status = 1 AND (network = ? OR network = ?)`,
            [
                'bep20',
                'bank'
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results[0])
            }
        )
    },

    getShowDT: async (data, callback) => {
        let type = data.type;

        let dt = moment().tz("Asia/Ho_Chi_Minh");
        let dt1 = moment().tz("Asia/Ho_Chi_Minh");
        let dt2 = moment().tz("Asia/Ho_Chi_Minh");
        let dt3 = moment().tz("Asia/Ho_Chi_Minh");

        let cach90ngay = dt.subtract(90, 'days').format("YYYY-MM-DD");
        let cach30ngay = dt1.subtract(30, 'days').format("YYYY-MM-DD");
        let cach7ngay = dt2.subtract(7, 'days').format("YYYY-MM-DD");
        let homnay = dt3.format("YYYY-MM-DD");

        let qr = '', qr2 = '', qr3 = '', qr4= '', qr_rt = '';
        if (void 0 !== type) {
            if (type == 'all') {
                qr = `SELECT SUM(amount) AS dtUSD, SUM(real_amount) AS dtBNB, SUM(pay_fee) AS freeBNB FROM trade_history WHERE type_key = ? AND status = 1`;
                qr_rt = `SELECT SUM(amount) AS dtUSD, SUM(real_amount) AS dtBNB, SUM(pay_fee) AS freeBNB FROM trade_history WHERE (type_key = ? OR type_key = ?) AND status = 1`;
                qr2 = `SELECT SUM(amount_win) AS tsWin, SUM(amount_lose) AS tsLose FROM bet_history WHERE marketing = ? AND status = 1 AND type_account = ?`;
                qr3 = `SELECT SUM(pending_commission) AS tsHHong FROM commission_history WHERE marketing = ? AND type = ?`;
                qr4 = `SELECT users.email, COALESCE (SUM(copy_trade_history.value),0) as 'total_cp', SUM(
                    CASE WHEN sum>0 THEN sum ELSE 0 END
                    ) as 'total_cp_win', SUM(
                    CASE WHEN sum<0 THEN sum*-1 ELSE 0 END
                    )  as 'total_cp_lose'  FROM copy_trade_history
                    JOIN users ON copy_trade_history.email = users.email
                    WHERE
                    users.marketing = ?
                    AND copy_trade_history.acc_type = ?`
            } else if (type == 'today') {
                qr = `SELECT SUM(amount) AS dtUSD, SUM(real_amount) AS dtBNB, SUM(pay_fee) AS freeBNB FROM trade_history WHERE type_key = ? AND status = 1 AND created_at > '${mysql_real_escape_string(homnay)}'`;
                qr2 = `SELECT SUM(amount_win) AS tsWin, SUM(amount_lose) AS tsLose FROM bet_history WHERE marketing = ? AND status = 1 AND type_account = ? AND created_at > '${mysql_real_escape_string(homnay)}'`;
                qr3 = `SELECT SUM(pending_commission) AS tsHHong FROM commission_history WHERE marketing = ? AND type = ? AND created_at > '${mysql_real_escape_string(homnay)}'`;
                
            } else if (type == 'lastweek') {
                qr = `SELECT SUM(amount) AS dtUSD, SUM(real_amount) AS dtBNB, SUM(pay_fee) AS freeBNB FROM trade_history WHERE type_key = ? AND status = 1 AND created_at > '${mysql_real_escape_string(cach7ngay)}'`;
                qr2 = `SELECT SUM(amount_win) AS tsWin, SUM(amount_lose) AS tsLose FROM bet_history WHERE marketing = ? AND status = 1 AND type_account = ? AND created_at > '${mysql_real_escape_string(cach7ngay)}'`;
                qr3 = `SELECT SUM(pending_commission) AS tsHHong FROM commission_history WHERE marketing = ? AND type = ? AND created_at > '${mysql_real_escape_string(cach7ngay)}'`;
            } else if (type == 'lastmonth') {
                qr = `SELECT SUM(amount) AS dtUSD, SUM(real_amount) AS dtBNB, SUM(pay_fee) AS freeBNB FROM trade_history WHERE type_key = ? AND status = 1 AND created_at > '${mysql_real_escape_string(cach30ngay)}'`;
                qr2 = `SELECT SUM(amount_win) AS tsWin, SUM(amount_lose) AS tsLose FROM bet_history WHERE marketing = ? AND status = 1 AND type_account = ? AND created_at > '${mysql_real_escape_string(cach30ngay)}'`;
                qr3 = `SELECT SUM(pending_commission) AS tsHHong FROM commission_history WHERE marketing = ? AND type = ? AND created_at > '${mysql_real_escape_string(cach30ngay)}'`;
            } else if (type == 'threelastmonth') {
                qr = `SELECT SUM(amount) AS dtUSD, SUM(real_amount) AS dtBNB, SUM(pay_fee) AS freeBNB FROM trade_history WHERE type_key = ? AND status = 1 AND created_at > '${mysql_real_escape_string(cach90ngay)}'`;
                qr2 = `SELECT SUM(amount_win) AS tsWin, SUM(amount_lose) AS tsLose FROM bet_history WHERE marketing = ? AND status = 1 AND type_account = ? AND created_at > '${mysql_real_escape_string(cach90ngay)}'`;
                qr3 = `SELECT SUM(pending_commission) AS tsHHong FROM commission_history WHERE marketing = ? AND type = ? AND created_at > '${mysql_real_escape_string(cach90ngay)}'`;
            }
        }

        let from = data.from;
        let to = data.to;
        if (void 0 !== from && void 0 !== to) {
            qr = `SELECT SUM(amount) AS dtUSD, SUM(real_amount) AS dtBNB, SUM(pay_fee) AS freeBNB FROM trade_history WHERE type_key = ? AND status = 1 AND DATE(created_at) >= '${from}' and DATE(created_at) <= '${to}'`;
            qr2 = `SELECT SUM(amount_win) AS tsWin, SUM(amount_lose) AS tsLose FROM bet_history WHERE marketing = ? AND status = 1 AND type_account = ? AND DATE(created_at) >= '${from}' and  DATE(created_at) <= '${to}'`;
            qr3 = `SELECT SUM(pending_commission) AS tsHHong FROM commission_history WHERE marketing = ? AND type = ? AND DATE(created_at) >= '${from}' and DATE(created_at) <= '${to}'`;
            qr4 = `SELECT COALESCE (SUM(copy_trade_history.value),0) as 'total_cp', SUM(
                CASE WHEN sum>0 THEN sum ELSE 0 END
                ) as 'total_cp_win', SUM(
                CASE WHEN sum<0 THEN sum*-1 ELSE 0 END
                )  as 'total_cp_lose'  FROM copy_trade_history
                JOIN users ON copy_trade_history.email = users.email
                WHERE
                users.marketing = ?
                AND copy_trade_history.acc_type = ? AND DATE(copy_trade_history.created_at) >= '${from}' and DATE(copy_trade_history.created_at) <= '${to}' `;    
                qr_rt = `SELECT SUM(amount) AS dtUSD, SUM(real_amount) AS dtBNB, SUM(pay_fee) AS freeBNB FROM trade_history WHERE (type_key = ? OR type_key = ?) AND status = 1 AND DATE(created_at) >= '${from}' and DATE(created_at) <= '${to}'`;        
        }

        let rsData = {};

        await new Promise((res, rej) => {
            db.query(qr,
                [
                    'nt',
                ], (error, results, fields) => {
                   
                    if (results.length > 0) {
                        rsData.dtUSD = results[0].dtUSD;
                        rsData.dtBNB = results[0].dtBNB;
                        rsData.freeBNB = results[0].freeBNB;
                    }

                    res();
                }
            )
        })

        await new Promise((res, rej) => {
            db.query(qr_rt,
                [
                    'rt',
                    'bep20',
                    'bank'
                ], (error, results, fields) => {
                    
                    if (results.length > 0) {
                        rsData.rtUSD = results[0].dtUSD;
                      
                    }

                    res();
                }
            )
        })
               
                
        await new Promise((res, rej) => {
            db.query(qr2,
                [
                    0,
                    1 // tài khoản thực
                ], (error, results, fields) => {
                    if (results.length > 0) {
                        rsData.tsWin = results[0].tsWin;
                        rsData.tsLose = results[0].tsLose;
                    }

                    res();
                }
            )
        })

        await new Promise((res, rej) => {
            db.query(qr3,
                [
                    0,
                    'klgd',
                ], (error, results, fields) => {
                    if (results.length > 0) {
                        rsData.tsHHong = results[0].tsHHong;
                    }

                    res();
                }
            )
        })

        await new Promise((res, rej) => {
            db.query(qr4,
             
                [
                    0,
                    1 
                ], (error, results, fields) => {
                    if (results.length > 0) {
                        rsData.tsWin = parseFloat(rsData.tsWin) + parseFloat(results[0].total_cp_win);
                        rsData.tsLose = parseFloat(rsData.tsLose) + parseFloat(results[0].total_cp_lose);
                    }

                    res();
                }
            )
        })

        return callback(null, rsData);
    },

    totalAddMoney: callback => {
        db.query(
            `SELECT SUM(price_USDT) AS tUSD, SUM(price_ETH) AS tETH, SUM(price_BTC) AS tBTC, SUM(price_PAYPAL) AS tPAYPAL, SUM(price_VN) AS tVN FROM add_money_history`,
            [
            ], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results[0])
            }
        )
    },
    getRevenueBank: async(query,callback) => {

      
        if(query.limit || query.offset || query.s){
            const offset = Number(query.offset || 0);
            const limit = Number(query.limit || 20);
            const searchTxt = query.s
            let count = 0;
        
            if(searchTxt) {
               
                count = await new Promise((res, rej) => {
                    db.query(
                        `SELECT count(bank_orders.id) FROM bank_orders WHERE email LIKE ? OR nick_name LIKE ?`,
                        [`%${searchTxt}%`,`%${searchTxt}%`], (error, results, fields) => {
                           res(results[0].count) 
                        }
                    )
                });

                db.query(
                    `SELECT bank_orders.* FROM bank_orders WHERE email LIKE ? OR nick_name LIKE ?  ORDER BY bank_orders.id DESC LIMIT ? OFFSET ?`,
                    [`%${searchTxt}%`,`%${searchTxt}%`, limit, offset], (error, results, fields) => {
                        if (error) {
                            return callback(error);
                        }
 
                        return callback(null, {count, items: results})
                    }
                )
            }else{
                count = await new Promise((res, rej) => {
                    db.query(
                        `SELECT count(bank_orders.id) FROM bank_orders `,
                        [], (error, results, fields) => {
                           res(results[0].count) 
                        }
                    )
                });

                db.query(
                    `SELECT * FROM bank_orders ORDER BY id DESC LIMIT ? OFFSET ?`,
                    [limit, offset], (error, results, fields) => {
                       
                        if (error) {
                            return callback(error);
                        }
 
                        return callback(null, {count, items: results})
                    }
                )
            }

        }else{
            return callback(null, {count: 0, items: []})
        }
    },
    getDupBet: (email) => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM bet_duplicate WHERE uid = ? and active=?`,
                [
                    email,1
                ], (error, results, fields) => {

                    if (error) {
                        reject(error);
                    } else {
                        if(results.length>0){
                            resolve(results[0]);
                        }else{
                            resolve(null);
                        }

                    }
                }
            )
        })
    },
    updateDupLenh: (id) => {

        db.query(
            `UPDATE bet_duplicate SET active = ? WHERE id = ?`,
            [
                2,
                id
            ], (error, results, fields) => {


            }
        )

    },
}
