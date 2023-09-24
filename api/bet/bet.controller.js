const { 
    getAllBetHis,
    getAllBetHisTrash,
    deleteBetHisById,
    getAllChampion,
    getChampionDetailService
} = require("./bet.service")

const config = require("./../../config")

module.exports = {
    getAllBetHis: (req, res) => {
        getAllBetHis(req.query, (err, results) => {
            if(err){
                console.log(err);
                return;
            }

            return res.json({
                success: 1,
                data: results
            })
        })
    },

    getAllBetHisTrash: (req, res) => {
        getAllBetHisTrash((err, results) => {
            if(err){
                console.log(err);
                return;
            }

            return res.json({
                success: 1,
                data: results
            })
        })
    },

    deleteBetHisById: (req, res) => {
        const data = req.body;
        deleteBetHisById(data, (err, results) => {
            if(err){
                console.log(err);
                return;
            }

            return res.json({
                success: 1,
                message: "Delete success"
            })
        })
    },

    getChampion: (req, res) => {
        const id = req.query.id;
        getAllChampion(id, (err, results) => {
            if(err){
                console.log(err);
                return;
            }

            return res.json({
                success: 1,
                data: results
            })
        })
    },
    getChampionDetail: (req, res) => {
        const id = req.query.id;
        getChampionDetailService(id, (err, results) => {
            if(err){
                console.log(err);
                return;
            }

            return res.json({
                success: 1,
                data: results
            })
        })
    },
}