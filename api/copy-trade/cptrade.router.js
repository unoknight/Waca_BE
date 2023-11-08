const {
    saveConfig,
    saveAiConfig,
    getConfig,
    getExpertsList,
    getTopExpertsList,
    getExpertsInfoList,
    getExpertsSuperInfoList,
    getProfitHistory,
    getAiProfitHistory,
    getFollowAccount,
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
    getRevenueSuper,
    saveConfigAdmin
} = require("./cptrade.controller");

const router = require("express");
const app = router();
const { checkToken, checkAdminToken } = require("../../auth/token_validation");

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.post("/reg-experts", checkToken, saveConfig);
app.post("/reg-super-follow", checkToken, saveFollowSuper);
app.post("/reg-experts-super", checkToken, saveConfigSuper);
app.post("/save-experts-super-content", checkToken, saveContentSuper);
app.post("/reg-ai", checkToken, saveAiConfig);
app.get("/get-config", checkToken, getConfig);
app.get("/experts", checkToken, getExpertsList);
app.get("/top-experts", checkToken, getTopExpertsList);
app.get("/top-experts-super", checkToken, getTopSuperExpertsList);
app.get("/experts-info", checkAdminToken, getExpertsInfoList);
app.get("/experts-info-super", checkAdminToken, getExpertsSuperInfoList);
app.get("/get-profit-history", checkToken, getProfitHistory);
app.get("/get-super-profit-history/:id", checkToken, getSuperProfitHistory);
app.get("/get-follow", checkToken, getFollowAccount);
app.get("/get-follow-super", checkToken, getSuperFollowAccount);
app.get("/get-revenue", checkToken, getRevenue);
app.get("/get-revenue-super/:id", checkToken, getRevenueSuper);

app.get("/ai-profit-history", checkToken, getAiProfitHistory);
app.delete("/experts/:id", checkAdminToken, removeExpert);
app.put("/experts", checkAdminToken, addExpert);
app.put("/experts-super", checkAdminToken, addExpertSuper);
app.post("/logout-cpt", checkToken, logout);

app.post("/remove-follow-cpt", checkToken, removeFollow);
app.post("/reset-money", checkToken, resetMoneyPerDay);
app.post("/save-copy-trade-admin", checkAdminToken, saveConfigAdmin);

module.exports = app;