const TelegramBot = require('node-telegram-bot-api')
const express = require("express");
const helmet = require("helmet");
const config = require('./config');

process.on('uncaughtException', function (exception) {
	console.log(exception);
});

if(config.IS_TELEGRAM){
	const TelegramAll = new TelegramBot(config.TELEGRAM_TOKEN, { polling: true })
	TelegramAll.on('polling_error', (error) => {
		if (error.response && error.response.statusCode === 409) {
			//console.log('409 Conflict error: Another instance is already running.');
			// Take appropriate action to stop the duplicate instance
			// For example, you can call `process.exit()` to terminate the current instance
		} else if (error.response && error.response.statusCode === 429) {
			const retryAfter = error.response.headers['retry-after'];
			//console.log(`Too Many Requests: Retry after ${retryAfter} seconds.`);
	
			// Wait for the specified retryAfter period and then start polling again
			// setTimeout(() => {
			// 	TelegramAll.startPolling();
			// }, retryAfter * 1000); // Convert seconds to milliseconds
		} else {
			console.log('Polling error:', error);
		}
	});
	
	global['ARESTele'] = TelegramAll;
}

const app = express();
app.use(helmet());

//require('./hoahong'); // chạy trả thưởng hoa hồng
require('./src/app'); // chạy http
require('./games/trade'); // chạy game
require('./auth/sys_settings'); // chạy thiết lập hệ thống
// require('./auth/mess'); // chạy BOT Telegram
require('./src/nap'); // chạy BOT Nạp
require('./api/autoNapCoin');
require('./auth/notifi'); // chạy thông báo
require('./auth/cleanData');
require('./auth/cleanAutoTrade');
require('./auth/autolevel');
require('./auth/autoNotiChampions');
//require('./auth/autoAddSpin');
// const mailer = require('./auth/mail')
// mailer.sendMail("trungnm.it@gmail.com", "Test", "Test")

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
