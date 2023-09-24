const cron = require("cron");
var db = require("../database");

const job = new cron.CronJob({
  cronTime: "01 00 * * *", // đầu ngày reset lại lợi nhuận hằng ngày
  onTick: async () => {
      db.query(`update copy_trade set money_per_day = 0`);
  }
});

job.start();