const cron = require("cron");
const { SEND_THONG_BAO_LANGS } = require("./notifi");
var db = require("../database");

const job = new cron.CronJob({
  cronTime: "00 18,19,20,21,22 * * *",
  onTick: async () => {
    const championPlayers = await new Promise((resolve, reject) => {
        db.query(
            `SELECT DISTINCT champion_players.balance,users.nick_name FROM champion_players JOIN users ON champion_players.email = users.email 
                WHERE champion_players.champion_id = 2 and (users.marketing = 0 OR champion_players.email IN ('top1giaidau@gmail.com','top2giaidau@gmail.com','top3giaidau@gmail.com','top4giaidau@gmail.com','top5giaidau@gmail.com')) ORDER BY champion_players.balance desc LIMIT 3`,
            (error, results, fields) => {
                if (error) {
                    return reject(error);
                }

                return resolve(results);
            }
        )
    });

    const user1 = championPlayers[0];
    const user2 = championPlayers[1];
    const user3 = championPlayers[2];

    const content_vn = `<b>Top 1: ${user1.nick_name.substring(0,3)}</b>`
        + `<br><b>Top 2: ${user2.nick_name.substring(0,3)}</b>`
        + `<br><b>Top 3: ${user3.nick_name.substring(0,3)}</b>`;

    const content_en = `<b>Top 1: ${user1.nick_name.substring(0,3)}</b>`
    + `<br><b>Top 2: ${user2.nick_name.substring(0,3)}</b>`
    + `<br><b>Top 3: ${user3.nick_name.substring(0,3)}</b>`;

    const content_cam = `<b>កំពូល 1: ${user1.nick_name.substring(0,3)}</b>`
    + `<br><b>កំពូល 2: ${user2.nick_name.substring(0,3)}</b>`
    + `<br><b>កំពូល 3: ${user3.nick_name.substring(0,3)}</b>`;

    const title_vn =  'Chúc mừng các nhà vô địch của giải đấu.';
    const title_en =  'Congratulations to the champions of the tournament.';
    const title_cam =  'សូមអបអរសាទរដល់ម្ចាស់ជើងឯកនៃការប្រកួត';

    const content = { content: content_vn, content_en: content_en, content_cam: content_cam };
    const title = { title: title_vn, title_en: title_en, title_cam: title_cam };

    const accounts = await new Promise((resolve, reject) => {
        db.query(
            `select * from account where type = 1`,
            (error, results, fields) => {
                if (error) {
                    return reject(error);
                }

                return resolve(results);
            }
        )
    });

    accounts.forEach((account) => {
        const email = account.email;
        SEND_THONG_BAO_LANGS('champion', email, email, title, content);
    });
  }
});

function formatPrice(value, minimum) {
    var formatter = new Intl.NumberFormat('en-US', {
        //style: 'currency',
        //currency: '',
        minimumFractionDigits: minimum
    });
    return formatter.format(value);
}

job.start();