const db = require("./../../database");
const moment = require('moment-timezone');
const { mysql_real_escape_string } = require('../../helper/sqlFriend')
const { makeid } = require('../../helper/stringHelpers')



module.exports = {
    saveConfig: async (data, callback) => {
        const count = await new Promise((res, rej) => {
            db.query(`SELECT COUNT(id) as count from copy_trade where email = ?`,
                [data.email],
                (error, results, fields) => {
                    res(results[0].count)
                }
            )
        })
        if (!count) {
            db.query(`INSERT INTO copy_trade (email, amount, day_win, day_lose, experts, ai, rate, run, acc_type, created_at)
            VALUES (?,?,?,?,?,0,?,?,?,now())`
                , [data.email, data.amount, data.cLaiDay, data.cLoDay, data.experts, data.rate, data.run, data.acc_type
                ], (error, results, fields) => {
                    if (error) {
                        return callback(error)
                    }

                    return callback(null, results)
                })
        } else {
            db.query(`UPDATE copy_trade 
                    SET amount = ?, day_win = ?, day_lose = ?, experts = ?, ai = 0, rate = ?, run = ?, acc_type = ?, updated_at = now() 
                    WHERE email = ?`,
                [data.amount, data.cLaiDay, data.cLoDay, data.experts, data.rate, data.run, data.acc_type, data.email
                ], (error, results, fields) => {
                    if (error) {
                        return callback(error)
                    }

                    return callback(null, results)
                })
        }
    },
    saveAdminConfig: async (data, callback) => {
        db.query(`UPDATE copy_trade 
        SET amount = ?, day_win = ?, day_lose = ?, experts = ?, ai = 0, rate = ?, run = ?, is_active = ?, updated_at = now() 
        WHERE email = ?`,
        [data.amount, data.day_win, data.day_lose, data.experts, data.rate, data.run, data.is_active, data.email
        ], (error, results, fields) => {
            if (error) {
                return callback(error)
            }

            return callback(null, 1)
        })
    },
    saveFollowSuper: async (data, callback) => {
        console.log("🚀 ~ file: cptrade.service.js:41 ~ saveFollowSuper: ~ data:", data)


        const cg = await new Promise((res, rej) => {
            db.query(`SELECT mst_super_copytrade.* from mst_super_copytrade JOIN users ON users.email = mst_super_copytrade.email where users.nick_name = ?`,
                [data.expert],
                (error, results, fields) => {
                    res(results)
                }
            )
        })
        
        if (cg.length > 0) {
            const follow = await new Promise((res, rej) => {
                db.query(`SELECT * from mst_super_copytrade_follow where email = ? AND status = ? AND experts = ?`,
                    [data.email, 0, data.expert],
                    (error, results, fields) => {
                        res(results)
                    }
                )
            })

            const user = await new Promise((res, rej) => {
                db.query(`SELECT * from users where email = ?`,
                    [data.email],
                    (error, results, fields) => {
                        res(results)
                    }
                )
            })

            if(user.length == 0){
                return callback(null, {
                    error: -1 // lỗi bất thường
                });
            }

            if (follow.length == 0) {
                let balance_min = 500;
                let day = 30;

                if (cg[0].type == 1) {
                    balance_min = 1000;
                    day = 60;
                }

                const account = await new Promise((res, rej) => {
                    db.query(`SELECT * from account where email = ? AND type = ?`,
                        [data.email, 1],
                        (error, results, fields) => {
                            res(results)
                        }
                    )
                })
              
                if (account.length == 0) {
                    return callback(null, {
                        error: -1 // lỗi bất thường
                    });
                }

                let acc_balance = parseFloat(account[0].balance)
                
                if ( acc_balance < balance_min || acc_balance < data.balance ) {
                    return callback(null, {
                        error: 2 //  không đủ tiền
                    });
                }

                // create temp user

                let random = makeid(12);
		let nick_name =  user[0].nick_name + "."+random;
                let random_email = nick_name  + "@gmail.com";
                let ref = makeid(7);

                db.query(
                    `insert into users (email, nick_name,main_user,working,created_at,marketing,ref_code)
                    values(?,?,?,0,now(),?,?)`,
                    [
                        random_email,
                        nick_name,
                        user[0].email,
                        user[0].marketing,
                        ref
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return callback(error);
                        }

                        db.query(
                            `insert into account (email, type, u_id, created_at,balance)
                                values(?,1,?,now(),?)`,
                            [
                                random_email,
                                makeid(10),
                                data.balance
                            ],
                            (error1, results, fields) => {
                                if (error1) {
                                    return callback(error1);
                                }

                                db.query(`INSERT INTO copy_trade (email, amount, day_win, day_lose, experts, ai, rate, run, acc_type,is_active,type, created_at)
                                VALUES (?,?,?,?,?,0,?,?,?,?,?,now())`
                                    , [random_email, data.amount, data.cLaiDay, data.cLoDay, data.expert, data.rate,1 , 1, 1,1
                                    ])

                                    db.query(
                                        `UPDATE account SET balance = balance - ? WHERE u_id = ? AND type = ?`,
                                        [
                                            data.balance,
                                            account[0].u_id,
                                            1
                                        ]
                                    )

                                    const type = {
                                        type: 'Chuyển tiền từ (Nội bộ) -> Super Copy Trade',
                                        type_en: 'Transfer money from (Internal) -> Super Copy Trade',
                                        type_cam: 'ផ្ទេរប្រាក់ពី (ផ្ទៃក្នុង) -> គណនីផ្ទាល់'
                                    }

                                    db.query(`insert into trade_history (email, from_u, to_u, type_key, type, type_en, type_cam, currency, amount, note, status, created_at)
                                    values(?,?,?,?,?,?,?,?,?,?,?,now())`,
                                        [
                                            user[0].email,
                                            user[0].nick_name,
                                            'Super Copy Trade',
                                            'super_in',
                                            type.type,
                                            type.type_en,
                                            type.type_cam,
                                            'usdt',
                                            data.balance,
                                            null,
                                            1
                                        ])

                                    db.query(
                                        `INSERT INTO mst_super_copytrade_follow(email,type,status,balance,created_at,updated_at,experts,started_at,ended_at,nick_name) 
                                        VALUES(?,?,0,?,NOW(),NOW(),?,NOW(),DATE(DATE_ADD(NOW(),INTERVAL ${day} DAY)),?)`,
                                        [
                                            data.email,
                                            cg[0].type,
                                            data.balance,
                                            data.expert,
                                            nick_name
                                        ]
                                    )
                            }
                        );

                    }
                );

                return callback(null, {
                    success: 1,
                });

            } else {
                return callback(null, {
                    error: 1 // đã đăng ký
                });
            }


        }

        // if (user.length > 0 && user[0].active == 0) {
        //     db.query(`UPDATE mst_super_copytrade SET type = ?,user_recieved = ?,updated_at = NOW(),active=? WHERE email = ?`, [data.type, data.acc_recieved, 1, data.email], (error, results, fields) => {

        //         console.log("🚀 ~ file: cptrade.service.js:55 ~ db.query ~ error:", error)
        //     });
        // }

        return callback(null, null);

    },
   
    saveConfigSuper: async (data, callback) => {


        const user = await new Promise((res, rej) => {
            db.query(`SELECT * from mst_super_copytrade where email = ?`,
                [data.email],
                (error, results, fields) => {
                    res(results)
                }
            )
        })

	 const account = await new Promise((res, rej) => {
            db.query(`SELECT * from account where email = ? and type = ?`,
                [data.email,1],
                (error, results, fields) => {
                    res(results)
                }
            )
        })
console.log(account);
	    
        if (user.length > 0 && user[0].active == 0) {
            db.query(`UPDATE mst_super_copytrade SET type = ?,user_recieved = ?,updated_at = NOW(),active=?,balance=? WHERE email = ?`, [data.type, data.acc_recieved, 1,account[0].balance, data.email], (error, results, fields) => {

                console.log("🚀 ~ file: cptrade.service.js:55 ~ db.query ~ error:", error)
            });
        }

        return callback(null, user);

    },
    saveContentSuper: async (data, callback) => {

        const user = await new Promise((res, rej) => {
            db.query(`SELECT * from mst_super_copytrade where email = ?`,
                [data.email],
                (error, results, fields) => {
                    res(results)
                }
            )
        })


        if (user.length > 0) {
            db.query(`UPDATE mst_super_copytrade SET content = ?,updated_at = NOW() WHERE email = ?`, [data.content, data.email], (error, results, fields) => {
            });
        }

        return callback(null, user);

    },
    resetMoneyPerDay: async (email, callback) => {
        db.query(`UPDATE copy_trade 
                SET money_per_day = 0, updated_at = now() 
                WHERE email = ?`,
            [email
            ], (error, results, fields) => {
                if (error) {
                    return callback(error)
                }

                return callback(null, results)
            })
    },
    saveAiConfig: async (data, callback) => {
        const count = await new Promise((res, rej) => {
            db.query(`SELECT COUNT(id) as count from copy_trade where email = ?`,
                [data.email],
                (error, results, fields) => {
                    res(results[0].count)
                }
            )
        })

        if (!count) {
            db.query(`INSERT INTO copy_trade (email, amount, day_win, day_lose, ai, run, acc_type, created_at)
            VALUES (?,?,?,?,?,0,?,now())`
                , [data.email, data.amount, data.cLaiDay, data.cLoDay, data.ai, data.acc_type
                ], (error, results, fields) => {
                    if (error) {
                        return callback(error)
                    }

                    return callback(null, results)
                })
        } else {
            db.query(`UPDATE copy_trade 
                    SET amount = ?, day_win = ?, day_lose = ?, ai = ?, run = 0, acc_type = ?, updated_at = now() 
                    WHERE email = ?`,
                [data.amount, data.cLaiDay, data.cLoDay, data.ai, data.acc_type, data.email
                ], (error, results, fields) => {
                    if (error) {
                        return callback(error)
                    }

                    return callback(null, results)
                })
        }
    },

    getConfig: async (email, callback) => {
        const config = await new Promise((res, rej) => {
            db.query(`SELECT * from copy_trade  WHERE email = ?`,
                [email
                ], (error, results, fields) => {
                    if (error) {
                        console.log(error);
                    }

                    res(results[0] || {})
                })
        });

        const win = await new Promise((res, rej) => {
            db.query(`SELECT COUNT(id) as count FROM copy_trade_history WHERE email = ? AND acc_type = 1 AND sum > 0 AND DATE(created_at) = DATE(NOW())`,
                [
                    email
                ], (error, results, fields) => {
                    if (error) {
                        console.log(error)
                    }

                    res(results[0])
                })
        })

        const win_amount = await new Promise((res, rej) => {
            db.query(`SELECT SUM(sum) as vol FROM copy_trade_history WHERE email = ? AND acc_type = 1 AND sum > 0 AND DATE(created_at) = DATE(NOW())`,
                [
                    email
                ], (error, results, fields) => {
                    if (error) {
                        console.log(error)
                    }

                    res(results[0])
                })
        })

        const lose = await new Promise((res, rej) => {
            db.query(`SELECT COUNT(id) as count FROM copy_trade_history WHERE email = ? AND acc_type = 1 AND sum < 0 AND DATE(created_at) = DATE(NOW())`,
                [
                    email
                ], (error, results, fields) => {
                    if (error) {
                        console.log(error)
                    }

                    res(results[0])
                })
        })

        const lose_amount = await new Promise((res, rej) => {
            db.query(`SELECT SUM(sum) as vol FROM copy_trade_history WHERE email = ? AND acc_type = 1 AND sum < 0 AND DATE(created_at) = DATE(NOW())`,
                [
                    email
                ], (error, results, fields) => {
                    if (error) {
                        console.log(error)
                    }

                    res(results[0])
                })
        })

        config.win_amount = win_amount.vol;
        config.lose_amount = lose_amount.vol;

        config.winTotal = win.count;
        config.loseTotal = lose.count;
        return callback(null, config);
    },

    getExpertsList: (callback) => {
        db.query(`SELECT nick_name FROM users WHERE is_expert = 1`,
            [
            ], (error, results, fields) => {
                if (error) {
                    return callback(error)
                }

                return callback(null, results)
            })
    },
    getTopExpertsList: (callback) => {
        db.query(`SELECT u.profile_image,u.nick_name,COALESCE(bh_win.count,0) win_count, COALESCE(bh_lose.count,0) as lose_count, COALESCE(COUNT(cta.id),0) as follow, COALESCE(SUM(cta.balance),0) as 'balance' FROM users u
        LEFT JOIN 
        (
            SELECT email,COALESCE(COUNT(id),0) as count FROM bet_history 
            WHERE amount_win <> 0
            GROUP BY email
        ) as bh_win ON u.email = bh_win.email
        
        LEFT JOIN 
        (
            SELECT email,COALESCE(COUNT(id),0) as count FROM bet_history 
            WHERE amount_lose <> 0
            GROUP BY email
        ) as bh_lose ON u.email = bh_lose.email
        
        LEFT JOIN 
				(
					SELECT ct.id,ct.email,acc.balance,ct.experts FROM copy_trade ct 
					JOIN account acc ON ct.email = acc.email AND acc.type = 1
				) AS cta ON cta.experts = u.nick_name
        WHERE u.is_expert = 1
        GROUP BY u.nick_name, u.profile_image
        ORDER BY follow DESC
        LIMIT 20`,
            [
            ], (error, results, fields) => {
                if (error) {
                    return callback(error)
                }

                return callback(null, results)
            })
    },
    getTopSuperExpertsList: (email,callback) => {
        db.query(`SELECT mst_super_copytrade.content,mst_super_copytrade.type,u.profile_image, u.nick_name,COALESCE(bh_win.count,0) win_count, COALESCE(bh_lose.count,0) as lose_count, COALESCE(COUNT(cta.id),0) as follow, COALESCE(cpf.cpf_balance,0) as 'balance', mst_super_copytrade_follow.id as 'follow_user',mst_super_copytrade.balance as 'old_balance',COALESCE(mst_super_copytrade_follow.balance,0) as 'cp_balance',account.balance as 'current_balance' FROM users u
        JOIN mst_super_copytrade ON u.email = mst_super_copytrade.email 
        JOIN account ON u.email =  account.email AND account.type = 1
        LEFT JOIN mst_super_copytrade_follow ON u.nick_name = mst_super_copytrade_follow.experts AND status = 0 AND  mst_super_copytrade_follow.email = '${email}'
        LEFT JOIN 
        (
            SELECT email,COALESCE(COUNT(id),0) as count FROM bet_history 
            WHERE amount_win <> 0
            GROUP BY email
        ) as bh_win ON u.email = bh_win.email
        
        LEFT JOIN 
        (
            SELECT email,COALESCE(COUNT(id),0) as count FROM bet_history 
            WHERE amount_lose <> 0
            GROUP BY email
        ) as bh_lose ON u.email = bh_lose.email
        
        LEFT JOIN 
				(
					SELECT ct.id,ct.email,acc.balance,ct.experts FROM copy_trade ct 
					JOIN account acc ON ct.email = acc.email AND acc.type = 1 AND ct.type = 1
				) AS cta ON cta.experts = u.nick_name
        LEFT JOIN(
            SELECT SUM(balance) as cpf_balance,experts as cpf_experts FROM mst_super_copytrade_follow
            GROUP BY experts
        ) as cpf ON u.nick_name = cpf.cpf_experts
        WHERE u.is_expert = 2 AND mst_super_copytrade.active = 1
        GROUP BY u.nick_name`,
            [
            ], (error, results, fields) => {
                if (error) {
                    return callback(error)
                }

                results.forEach(element => {
                    console.log("🚀 ~ file: cptrade.service.js:474 ~ element:", element)
                    if(element.win_count == 0 && element.lose_count==0){
                        element.winRate = 0;
                    }else{
                        element.winRate = parseFloat(element.win_count) * 100 / (parseFloat(element.win_count) + parseFloat(element.lose_count));
                    }
                    
                    if(element.balance==0){
                        element.balanceRate = 0*100;
                    }else{
                        element.balanceRate =  (parseFloat(element.current_balance) - parseFloat(element.old_balance))  * 100 /parseFloat(element.old_balance);
                    }
                   
                });

                let followSortes = results.slice().sort((a,b) => b.follow - a.follow);
                let balanceSortes = results.slice().sort((a,b) => b.balance - a.balance);
                let cpBalanceSortes = results.slice().sort((a,b) => b.balanceRate - a.balanceRate);
                
                let winRateSortes = results.slice().sort((a,b) => b.winRate - a.winRate);
               
                let resultRanks = results.map(element => {
                    
                    const followRank = followSortes.findIndex(r => r == element) +1;
                    element.followRank = followRank;

                    const balanceRank = balanceSortes.findIndex(r => r == element) +1;
                    element.balanceRank = balanceRank;

                    const winRateRank = winRateSortes.findIndex(r => r == element) +1;
                    element.winRateRank = winRateRank;

                    const cpBalanceRank = cpBalanceSortes.findIndex(r => r == element) +1;
                    element.cpBalanceRank = cpBalanceRank;

                    element.point = cpBalanceRank * 3 + followRank * 2 + winRateRank + balanceRank;

                    return { ... element};
                })

                let finalResultRanks = resultRanks.slice().sort((a,b) => a.point - b.point);

               
                return callback(null, finalResultRanks)
            })
    },

    getExpertsInfoList: (callback) => {
        db.query(`SELECT id, email, nick_name, address_USDT, money_usdt FROM users WHERE is_expert = 1`,
            [
            ], (error, results, fields) => {
                if (error) {
                    return callback(error)
                }

                return callback(null, results)
            })
    },
    getExpertsSuperInfoList: (callback) => {
        db.query(`SELECT id, email, nick_name, address_USDT, money_usdt FROM users WHERE is_expert = 2`,
            [
            ], (error, results, fields) => {
                if (error) {
                    return callback(error)
                }

                return callback(null, results)
            })
    },

    getProfitHistory: (email, callback) => {
        db.query(`SELECT * FROM copy_trade_history 
                WHERE email = ? AND experts IS NOT NULL AND acc_type = 1 AND CAST(created_at as DATE) = CAST(NOW() as DATE)
                ORDER BY id DESC`,
            [
                email
            ], (error, results, fields) => {
                if (error) {
                    return callback(error)
                }

                return callback(null, results)
            })
    },
    getSuperProfitHistory: async (id, callback) => {
        const cp_his = await new Promise((res, rej) => {
            db.query(`SELECT copy_trade_history.*,users.email as cp_email FROM mst_super_copytrade_follow
            JOIN users ON mst_super_copytrade_follow.nick_name = users.nick_name
            JOIN copy_trade_history ON users.email = copy_trade_history.email
            AND CAST(copy_trade_history.created_at as DATE) = CAST(NOW() as DATE)
            WHERE mst_super_copytrade_follow.id = ?
            ORDER BY copy_trade_history.id DESC`,
                [id],
                (error, results, fields) => {
                    res(results)
                }
            )
        })
        
        const cp_config = await new Promise((res, rej) => {
            db.query(`SELECT mst_super_copytrade_follow.balance,mst_super_copytrade_follow.experts,copy_trade.amount as cp_amount,copy_trade.day_win,copy_trade.day_lose,copy_trade.money_per_day,account.balance as 'follow_amount' FROM mst_super_copytrade_follow
            JOIN users ON mst_super_copytrade_follow.email = users.email 
            JOIN users as user_cp ON  mst_super_copytrade_follow.nick_name = user_cp.nick_name
            JOIN account ON user_cp.email = account.email
            JOIN copy_trade ON user_cp.email = copy_trade.email
            WHERE 
            mst_super_copytrade_follow.id = ?
            ORDER BY mst_super_copytrade_follow.created_at DESC`,
                [id],
                (error, results, fields) => {
                    res(results)
                }
            )
        })

        return callback(null, {
            history: cp_his,
            config: cp_config[0]
        })

    },
    getFollowAccount: (nickname, callback) => {
        db.query(`SELECT copy_trade.*,users.nick_name FROM copy_trade 
        JOIN users ON users.email = copy_trade.email
        WHERE experts = ? AND type = ? ORDER BY created_at DESC`,
            [
                nickname,
                0
            ], (error, results, fields) => {
                if (error) {
                    return callback(error)
                }

                return callback(null, results)
            })
    },
    getSuperFollowAccount: (nickname, callback) => {
        db.query(`SELECT mst_super_copytrade_follow.*,users.nick_name as 'main_nick_name',copy_trade.amount as cp_amount,copy_trade.day_win,copy_trade.day_lose,copy_trade.money_per_day ,account.balance as 'cp_amount' FROM mst_super_copytrade_follow
        JOIN users ON mst_super_copytrade_follow.email = users.email 
        JOIN users as user_cp ON  mst_super_copytrade_follow.nick_name = user_cp.nick_name
        JOIN account ON user_cp.email = account.email
        JOIN copy_trade ON user_cp.email = copy_trade.email
        WHERE 
        mst_super_copytrade_follow.experts = ?
        AND mst_super_copytrade_follow.status = ?
        ORDER BY mst_super_copytrade_follow.created_at DESC`,
            [
                nickname,
                0
            ], (error, results, fields) => {
                if (error) {
                    return callback(error)
                }

                return callback(null, results)
            })
    },
    getAiProfitHistory: (email, callback) => {
        db.query(`SELECT * FROM copy_trade_history 
                WHERE email = ? AND experts IS NULL AND acc_type = 1 AND CAST(created_at as DATE) = CURRENT_DATE 
                ORDER BY id DESC`,
            [
                email
            ], (error, results, fields) => {
                if (error) {
                    return callback(error)
                }

                return callback(null, results)
            })
    },

    removeExpert: (id, callback) => {
        db.query(`UPDATE users SET is_expert = 0 WHERE id = ?`,
            [Number(id)
            ], (error, results, fields) => {
                if (error) {
                    return callback(error)
                }

                return callback(null, results)
            })
    },


    addExpert: (nick_name, callback) => {
        db.query(`UPDATE users SET is_expert = 1 WHERE nick_name = ?`,
            [nick_name
            ], (error, results, fields) => {
                if (error) {
                    return callback(error)
                }

                if (results.affectedRows) {
                    db.query(`SELECT id, email, nick_name, address_USDT, money_usdt FROM users WHERE nick_name = ?`,
                        [nick_name
                        ], (error, results, fields) => {
                            if (error) {
                                return callback(error)
                            }

                            console.log(results)
                            return callback(null, results[0])
                        })
                } else {
                    return callback(null)
                }
            })
    },
    addExpertSuper: (nick_name, callback) => {
        db.query(`UPDATE users SET is_expert = 2 WHERE nick_name = ?`,
            [nick_name
            ], (error, results, fields) => {
                if (error) {
                    return callback(error)
                }

                if (results.affectedRows) {
                    db.query(`SELECT id, email, nick_name, address_USDT, money_usdt FROM users WHERE nick_name = ?`,
                        [nick_name
                        ], (error, results, fields) => {
                            if (error) {
                                return callback(error)
                            }

                            db.query(`INSERT INTO mst_super_copytrade(email,active,created_at,updated_at) VALUES(?,?,NOW(),NOW())`, [results[0].email, 0
                            ]);

                            return callback(null, results[0])
                        })
                } else {
                    return callback(null)
                }
            })
    },

    getRevenue(data, callback) {
        if (data.type == "month") {
            db.query(`SELECT SUM(sum) as t, MONTH(created_at) as month FROM copy_trade_history 
                        WHERE email = ? AND YEAR(created_at) = YEAR(NOW())
                        GROUP BY MONTH(created_at) `,
                [data.email
                ], (error, results, fields) => {
                    if (error) {
                        return callback(error)
                    }

                    const resultsByMonths = Array(12).fill(0)
                    results.forEach(e => {
                        resultsByMonths[e.month - 1] = e.t
                    });
                    return callback(null, resultsByMonths)
                })
        }

        else {
            db.query(`SELECT SUM(sum) as t, DAY(created_at) as day FROM copy_trade_history 
                     WHERE email = ? AND MONTH (created_at) = MONTH(NOW())
                     GROUP BY CAST(created_at as DATE) `,
                [data.email
                ], (error, results, fields) => {
                    if (error) {
                        return callback(error)
                    }

                    const now = new Date()
                    const numberDaysOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
                    const resultsByDays = Array(numberDaysOfMonth).fill(0)
                    results.forEach(e => {
                        resultsByDays[e.day - 1] = e.t
                    });
                    return callback(null, resultsByDays)
                })
        }
    },

    getRevenueSuper: async (id, callback) => {
        const cp_config = await new Promise((res, rej) => {
            db.query(`SELECT mst_super_copytrade_follow.balance,mst_super_copytrade_follow.experts,copy_trade.amount as cp_amount,copy_trade.day_win,copy_trade.day_lose,copy_trade.money_per_day,account.balance as 'follow_amount',mst_super_copytrade_follow.type,mst_super_copytrade_follow.started_at,mst_super_copytrade_follow.ended_at FROM mst_super_copytrade_follow
            JOIN users ON mst_super_copytrade_follow.email = users.email 
            JOIN users as user_cp ON  mst_super_copytrade_follow.nick_name = user_cp.nick_name
            JOIN account ON user_cp.email = account.email
            JOIN copy_trade ON user_cp.email = copy_trade.email
            WHERE 
            mst_super_copytrade_follow.id = ?
            ORDER BY mst_super_copytrade_follow.created_at DESC`,
                [id],
                (error, results, fields) => {
                    res(results)
                }
            )
        })

        const cp_today = await new Promise((res, rej) => {
            db.query(`SELECT COALESCE(SUM(copy_trade_history.sum),0) as 'volumn' FROM mst_super_copytrade_follow
            JOIN users ON mst_super_copytrade_follow.email = users.email 
            JOIN users as user_cp ON  mst_super_copytrade_follow.nick_name = user_cp.nick_name
            JOIN account ON user_cp.email = account.email
            JOIN copy_trade_history ON user_cp.email = copy_trade_history.email
            WHERE 
            mst_super_copytrade_follow.id = ?
            AND DATE(copy_trade_history.created_at) = DATE(NOW())`,
                [id],
                (error, results, fields) => {
                    res(results)
                }
            )
        })
        
        const cp_his_wl =  await new Promise((res, rej) => {
            db.query(`SELECT COALESCE(SUM(case when copy_trade_history.sum > 0 then 1 else 0 end),0) as 'win', COALESCE(SUM(case when copy_trade_history.sum < 0 then 1 else 0 end),0) as 'lose' FROM mst_super_copytrade_follow
            JOIN users ON mst_super_copytrade_follow.email = users.email 
            JOIN users as user_cp ON  mst_super_copytrade_follow.nick_name = user_cp.nick_name
            JOIN account ON user_cp.email = account.email
            JOIN copy_trade_history ON user_cp.email = copy_trade_history.email
            WHERE 
            mst_super_copytrade_follow.id = ?`,
                [id],
                (error, results, fields) => {
                    res(results)
                }
            )
        })

        const cp_his_days =  await new Promise((res, rej) => {
            db.query(`SELECT COALESCE(SUM(date_values.revu),0) as 'revu_day',date_list.display,date_list.selected_date  FROM (select DATE_FORMAT(selected_date,'%d-%m') as display,selected_date from 
            (select adddate('1970-01-01',t4*10000 + t3*1000 + t2*100 + t1*10 + t0) selected_date from
             (select 0 t0 union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t0,
             (select 0 t1 union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t1,
             (select 0 t2 union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t2,
             (select 0 t3 union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t3,
             (select 0 t4 union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t4) v
            where selected_date between DATE(?) and DATE(?)) as date_list
            LEFT JOIN (
                SELECT copy_trade_history.sum as 'revu',DATE(copy_trade_history.created_at) as 'date' FROM mst_super_copytrade_follow
                        JOIN users ON mst_super_copytrade_follow.email = users.email 
                        JOIN users as user_cp ON  mst_super_copytrade_follow.nick_name = user_cp.nick_name
                        JOIN account ON user_cp.email = account.email
                        JOIN copy_trade_history ON user_cp.email = copy_trade_history.email
                        WHERE 
                        mst_super_copytrade_follow.id = ?
            ) as date_values ON date_list.selected_date = date_values.date
            GROUP BY date_list.display,date_list.selected_date
            order by date_list.selected_date ASC
            `,
                [cp_config[0].started_at,cp_config[0].ended_at,id],
                (error, results, fields) => {
                    res(results)
                }
            )
        })

        return callback(null, {
            config: cp_config[0],
            today: cp_today[0],
            his_wl: cp_his_wl[0],
            days: cp_his_days

        })

    },
    logout(email, callback) {
        db.query(`UPDATE copy_trade SET is_active = 1 WHERE email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }

                return callback(null, results)
            })
    },

    removeFollow(email, callback) {
        db.query(`UPDATE copy_trade SET is_active = 0 WHERE email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }

                return callback(null, results)
            })
    }
}
