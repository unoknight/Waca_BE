const cron = require("cron");
const { SEND_THONG_BAO, SEND_THONG_BAO_LANGS } = require("./notifi");
var db = require("../database");

const job = new cron.CronJob({
    cronTime: " 01 00 * * *",
    onTick: async () => {
        db.query(`UPDATE users SET spin_count = 1 WHERE marketing = 0`);
        
        const users = await new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM users WHERE marketing = 0`,
                (error, results, fields) => {
                    if (error) {
                        return reject(error);
                    }
    
                    return resolve(results);
                }
            )
        });

        // const content = `Chúc mừng bạn nhận được 1 lượt vòng quay may mắn, quay ngay nào để trúng giải thưởng lớn!`;

        const title = {
            title: 'Vòng quay may mắn!',
            title_en: 'Lucky Wheel!',
            title_cam: 'កង់នៃសំណាង'
        };

        const content = {
            content: `Chúc mừng bạn nhận được 1 lượt vòng quay may mắn, quay ngay nào để trúng giải thưởng lớn!`,
            content_en: `Congratulations on getting 1 lucky spin, spin now to win a big prize!`,
            content_cam: `អបអរសាទរចំពោះការទទួលបានសំណាងចំនួន 1 បង្វិលឥឡូវនេះ ដើម្បីឈ្នះរង្វាន់ធំ!`
        };

        users.forEach(element => {
            const email = element.email;
            // SEND_THONG_BAO('lucky', email, email, 'Vòng quay may mắn!', content);

            SEND_THONG_BAO_LANGS('lucky', email, email, title, content);
        });
    }
}); 

job.start();