const {
    saveConfig,
    saveAdminConfig,
    getConfig,
    saveAiConfig,
    getExpertsList,
    getTopExpertsList,
    getExpertsInfoList,
    getExpertsSuperInfoList,
    getProfitHistory,
    getFollowAccount,
    getAiProfitHistory,
    removeExpert,
    addExpert,
    getRevenue,
    logout,
    removeFollow,
    resetMoneyPerDay,
    addExpertSuper,
    saveConfigSuper,
    saveContentSuper,
    getTopSuperExpertsList,
    saveFollowSuper,
    getSuperFollowAccount,
    getSuperProfitHistory,
    getRevenueSuper
} = require("./cptrade.service");

module.exports = {
    saveConfig: (req, res) => {
        const email = req.user.email;
        const data = req.body
        data.email = email;
        saveConfig(data, (err, ressult) => {
            if (err) {
                console.log(err);
                return;
            }
            
            return res.json({
                success: 1,
            })
        })
    },
    saveConfigAdmin: (req, res) => {
        const data = req.body;
        saveAdminConfig(data, (err, ressult) => {
            if (err) {
                console.log(err);
                return;
            }
            
            return res.json({
                success: 1,
            })
        })
    },
    saveFollowSuper: (req, res) => {
        const email = req.user.email;
        const data = req.body
        data.email = email;
       
        saveFollowSuper(data, (err, ressult) => {
            if (err) {
                console.log(err);
                return;
            }
            
            return res.json(ressult)
        })
    },
    saveConfigSuper: (req, res) => {
        const email = req.user.email;
        const data = req.body
        data.email = email;
        saveConfigSuper(data, (err, ressult) => {
            if (err) {
                console.log(err);
                return;
            }
            
            return res.json({
                success: 1,
            })
        })
    },
    saveContentSuper: (req, res) => {
        const email = req.user.email;
        const data = req.body
        data.email = email;
        saveContentSuper(data, (err, ressult) => {
            if (err) {
                console.log(err);
                return;
            }
            
            return res.json({
                success: 1,
            })
        })
    },
    resetMoneyPerDay: (req, res) => {
        const email = req.user.email;
       
        resetMoneyPerDay(email, (err, ressult) => {
            if (err) {
                console.log(err);
                return;
            }
            
            return res.json({
                success: 1,
            })
        })
    },
    saveAiConfig: (req, res) => {
        const email = req.user.email;
        const data = req.body
        data.email = email;

        saveAiConfig(data, (err, ressult) => {
            if (err) {
                console.log(err);
                return;
            }
            
            return res.json({
                success: 1,
            })
        })
    },

    getConfig: (req, res) => {
        const email = req.user.email;
        getConfig(email, (err, ressult) => {
            if (err) {
                console.log(err);
                return;
            }

            return res.json({
                success: 1,
                data: ressult
            })
        })
    },
    
    getExpertsList: (req, res) => {
        getExpertsList( (err, ressult) => {
            if (err) {
                console.log(err);
                return;
            }

            return res.json({
                success: 1,
                data: ressult
            })
        })
    },
    getTopExpertsList: (req, res) => {
        getTopExpertsList( (err, ressult) => {
            if (err) {
                console.log(err);
                return;
            }

            return res.json({
                success: 1,
                data: ressult
            })
        })
    },
    getTopSuperExpertsList: (req, res) => {
        const email = req.user.email;
        getTopSuperExpertsList(email, (err, ressult) => {
            if (err) {
                console.log(err);
                return;
            }

            return res.json({
                success: 1,
                data: ressult
            })
        })
    },
    getExpertsInfoList: (req, res) => {
        getExpertsInfoList( (err, ressult) => {
            if (err) {
                console.log(err);
                return;
            }

            return res.json({
                success: 1,
                data: ressult
            })
        })
    },
    getExpertsSuperInfoList: (req, res) => {
        getExpertsSuperInfoList( (err, ressult) => {
            if (err) {
                console.log(err);
                return;
            }

            return res.json({
                success: 1,
                data: ressult
            })
        })
    },
    getProfitHistory: (req, res) => {
        const email = req.user.email;
        getProfitHistory(email, (err, ressult) => {
            if (err) {
                console.log(err);
                return;
            }

            return res.json({
                success: 1,
                data: ressult
            })
        })
    },
    getSuperProfitHistory: (req, res) => {
        const id = req.params.id;
        getSuperProfitHistory(id, (err, ressult) => {
            if (err) {
                console.log(err);
                return;
            }

            return res.json({
                success: 1,
                data: ressult
            })
        })
    },
    getFollowAccount: (req, res) => {
        const nickname = req.user.nick_name;
        getFollowAccount(nickname, (err, ressult) => {
            if (err) {
                console.log(err);
                return;
            }

            return res.json({
                success: 1,
                data: ressult
            })
        })
    },
    getSuperFollowAccount: (req, res) => {
        const nickname = req.user.nick_name;
        getSuperFollowAccount(nickname, (err, ressult) => {
            if (err) {
                console.log(err);
                return;
            }

            return res.json({
                success: 1,
                data: ressult
            })
        })
    },


    getAiProfitHistory: (req, res) => {
        const email = req.user.email;
        getAiProfitHistory(email, (err, ressult) => {
            if (err) {
                console.log(err);
                return;
            }

            return res.json({
                success: 1,
                data: ressult
            })
        })
    },
    
    removeExpert: (req, res) => {
        const id = req.params.id;
        removeExpert(id, (err, ressult) => {
            if (err) {
                console.log(err);
                return;
            }

            return res.json({
                success: 1,
            })
        })
    },
   

    addExpert: (req, res) => {
        const nick = req.body.nick_name;
        addExpert(nick, (err, ressult) => {
            if (err) {
                console.log(err);
                return;
            } else{
                if(ressult){
                    return res.json({
                        success: 1,
                        data: ressult
                    })
                } else{
                    return res.json({
                        success: 0
                    });
                }
            }
        })
    },
    addExpertSuper: (req, res) => {
        const nick = req.body.nick_name;
        addExpertSuper(nick, (err, ressult) => {
            if (err) {
                console.log(err);
                return;
            } else{
                if(ressult){
                    return res.json({
                        success: 1,
                        data: ressult
                    })
                } else{
                    return res.json({
                        success: 0
                    });
                }
            }
        })
    },

    getRevenue: (req, res) => {
        const data = {
            type: req.query.type,
            email: req.user.email
        }

        getRevenue(data, (err, ressult) => {
            if (err) {
                console.log(err);
                return;
            }

            return res.json({
                success: 1,
                data: ressult
            })
        })
    },
    getRevenueSuper: (req, res) => {
        const id = req.params.id;
        getRevenueSuper(id, (err, ressult) => {
            if (err) {
                console.log(err);
                return;
            }

            return res.json({
                success: 1,
                data: ressult
            })
        })
    },

    logout: (req, res) => {
        const email = req.user.email

        logout(email, (err, ressult) => {
            if (err) {
                console.log(err);
                return;
            }

            return res.json({
                success: 1
            })
        })
    },

    removeFollow: (req, res) => {
        const email = req.body.email

        removeFollow(email, (err, ressult) => {
            if (err) {
                console.log(err);
                return;
            }

            return res.json({
                success: 1
            })
        })
    },
}