const TelegramBot = require('node-telegram-bot-api')
const express = require("express");
const helmet = require("helmet");
const config = require('./config');

const { Telegraf } = require('telegraf');
var db = require("./database");
const { genSaltSync, hashSync, compareSync } = require("bcrypt")
const bot = new Telegraf("6665163378:AAGM32i4MgRt3lV6Y6p82lbRC9ewM7UrMuQ");

function makeid(length) {
    var result = [];
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }

    return result.join('');
}

bot.command('start', ctx => {

	let str = `Wellcome, <strong>${ctx.chat.first_name}</strong>! \n`;
	str += "Use the <a href='https://wacatrade.com/'>Wacatrade.com</a> Authentication Bot According to the instructions bellow: \n";
	str += "Commands: \n";
	str += "/help - Help \n";
	str += "/verify - Enter phone_number/password: Verify <a href='https://wacatrade.com/'>Wacatrade.com</a> account with this telegram account to get and received authentication code \n";
	str += "- example: /verify example@gmail.com/456123\n";
	str += "/code - Get verify code \n";
	str += "/status - View <a href='https://wacatrade.com/'>Wacatrade.com</a> account verification.\n";
	str += "/clear - remove account linked from <a href='https://wacatrade.com/'>Wacatrade.com</a> .\n";

	bot.telegram.sendMessage(ctx.chat.id, str, {
		parse_mode: "HTML"
	});
})

bot.command('help', ctx => {

	let str = `Wellcome, <strong>${ctx.chat.first_name}</strong>! \n`;
	str += "Use the <a href='https://wacatrade.com/'>Wacatrade.com</a> Authentication Bot According to the instructions bellow: \n";
	str += "Commands: \n";
	str += "/help - Help \n";
	str += "/verify - Enter phone_number/password: Verify <a href='https://wacatrade.com/'>Wacatrade.com</a> account with this telegram account to get and received authentication code \n";
	str += "- example: /verify example@gmail.com/456123\n";
	str += "- **note: phone_number with dialCode(855,84, ...) \n";
	str += "/code - Get verify code \n";
	str += "/status - View <a href='https://wacatrade.com/'>Wacatrade.com</a> account verification.\n";
	str += "/clear - remove account linked from <a href='https://wacatrade.com/'>Wacatrade.com</a> .\n";

	bot.telegram.sendMessage(ctx.chat.id, str, {
		parse_mode: "HTML"
	});
})

bot.command('verify', async ctx => {
	try {
		let arr_payload = ctx.payload.trim().split('/');
		
		let username = arr_payload[0].trim();
		let password = arr_payload[1].trim();

		if (!username || !password) {
			let str = "Please enter phone_number & password \n";
			str += `/verify - Enter phone_number/password \n`;
			bot.telegram.sendMessage(ctx.chat.id, str, {
				parse_mode: "HTML"
			});

			return;
		}

		let user = await new Promise((resolve, reject) => {
			db.query(
				`SELECT email, nick_name, password, active_2fa, secret_2fa, deleted_at,active,verified_telegram,verified_time FROM users WHERE email = ? OR username = ?`, [username, username], (error, results, fields) => {
					if (error) {
						resolve([]);
					}

					resolve(results);
				})
		});

		if (user.length == 0) {
			let str = `Not found account with username: ${username} \n`;
			str += `/verify - Enter username/password \n`;
			bot.telegram.sendMessage(ctx.chat.id, str, {
				parse_mode: "HTML"
			});
			return;
		}

		const result = compareSync(password, user[0].password);

		if (!result) {
			let str = `password account: ${username} not match \n`;
			str += `/verify - Enter username/password \n`;
			bot.telegram.sendMessage(ctx.chat.id, str, {
				parse_mode: "HTML"
			});
			return;
		}

		if(user[0].verified_telegram =="1"){
			let str = `Account: ${username} verified at ${user[0].verified_time}\n`;
			bot.telegram.sendMessage(ctx.chat.id, str, {
				parse_mode: "HTML"
			});
			return;
		}

		db.query(`UPDATE users SET verified_telegram = ?,telegram_id=?,verified_time=NOW() WHERE email = ?`, [1,ctx.chat.id,user[0].email]);

		let str = `Account ${username} verified`;

		bot.telegram.sendMessage(ctx.chat.id, str, {
			parse_mode: "HTML"
		});


	} catch (e) {

	}

});


bot.command('code', async ctx => {
	
	let user = await new Promise((resolve, reject) => {
		db.query(
			`SELECT email, nick_name, password, active_2fa, secret_2fa, deleted_at,active,verified_telegram,verified_time FROM users WHERE telegram_id = ?`, [ctx.chat.id], (error, results, fields) => {
				if (error) {
					resolve([]);
				}

				resolve(results);
			})
	});

	if(user.length == 0){
		let str = `Not found linked account with your telegram account`;
			bot.telegram.sendMessage(ctx.chat.id, str, {
				parse_mode: "HTML"
			});
			return;
	}

	let id = makeid(6);

	db.query(`UPDATE users SET code_telegram = ?, generate_code_time = NOW() WHERE email = ?`, [id,user[0].email]);
	
	let str = "Verify Code is: \n <strong><u>"+id+"</u></strong>";
	str += `\n  The code is valid for a time and 10 minutes`;
	str += `\n  If you dif not request the code, your account may be compromised, please chnage your password as soon as possible.`;
	bot.telegram.sendMessage(ctx.chat.id, str, {
		parse_mode: "HTML"
	});

})

bot.command('status', async ctx => {
	
	let user = await new Promise((resolve, reject) => {
		db.query(
			`SELECT email, nick_name, password, active_2fa, secret_2fa, deleted_at,active,verified_telegram,verified_time FROM users WHERE telegram_id = ?`, [ctx.chat.id], (error, results, fields) => {
				if (error) {
					resolve([]);
				}

				resolve(results);
			})
	});

	if(user.length == 0){
		let str = `Not found linked account with your telegram account`;
			bot.telegram.sendMessage(ctx.chat.id, str, {
				parse_mode: "HTML"
			});

		return;
	}

	let str = `Your active account: ${user[0].email}`;
	bot.telegram.sendMessage(ctx.chat.id, str, {
		parse_mode: "HTML"
	});

})

bot.command('clear', async ctx => {
	
	let user = await new Promise((resolve, reject) => {
		db.query(
			`SELECT email, nick_name, password, active_2fa, secret_2fa, deleted_at,active,verified_telegram,verified_time FROM users WHERE telegram_id = ?`, [ctx.chat.id], (error, results, fields) => {
				if (error) {
					resolve([]);
				}

				resolve(results);
			})
	});

	if(user.length == 0){
		let str = `Not found linked account with your telegram account`;
			bot.telegram.sendMessage(ctx.chat.id, str, {
				parse_mode: "HTML"
			});

		return;
	}

	db.query(`UPDATE users SET verified_telegram = ?,telegram_id=?,verified_time=NOW() WHERE email = ?`, [0,'',user[0].email]);

	let str = `Account: ${user[0].email} is clear`;
	bot.telegram.sendMessage(ctx.chat.id, str, {
		parse_mode: "HTML"
	});

})

bot.launch();


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
//require('./auth/autoNotiChampions');
//require('./auth/autoAddSpin');
// const mailer = require('./auth/mail')
// mailer.sendMail("trungnm.it@gmail.com", "Test", "Test")

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
