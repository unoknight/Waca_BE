const Tele = require("../../auth/telegram_notify");
const config = require("../../config");
const moment = require('moment-timezone');
let guess = 'buy', guessWIN = 0, guessLOSE= 0;

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

module.exports = {
	
	SEND_BOT_DU_BAO(){
		let rd = getRandomInt(2);
		let kq = 'កេីន  ⬆️';
		if(rd){
			kq = 'កេីន  ⬆️';
			guess = 'buy';
		}else {
			kq = 'ធ្លាក់ 🔻';
			guess = 'sell';
		}
		Tele.sendMessBOTTrade(`🏆 Bot ការព្យាករណ៍: វគ្គ បន្ទាប់ទៀត, ${kq}!`);
			
	},

	SEND_TUONG_TAC(){
		Tele.sendMessBOTTrade(`🛎 Tជូនដំណឹង!\n⏱ យើងមានពេល 1 នាទីដើម្បីធ្វើអន្តរកម្ម។.\nសូមពិភាក្សាជាមួយក្រុមដើម្បីអភិវឌ្ឍជាមួយគ្នា!`);
	},

	SEND_BOT_SECOND(s){
		if(s > 0){
			Tele.sendMessBOTTrade(`🔰 សូមធ្វើការបញ្ជាទិញ។ នៅ ${s}s`);
		}else{
			Tele.sendMessBOTTrade(`⌛️ រង់ចាំលទ្ធផល...`);
		}
		
	},

	SEND_RESULT(kq){
		let time = moment().format('HH:mm:ss'); 
		let textKQ = '';
		
		if(guess == kq){

			guessWIN++;
			guessLOSE = 0;

			if(kq == 'buy'){
				textKQ = 'កេីន  ⬆️';
			}else{
				textKQ = 'ធ្លាក់ 🔻';
			}

			Tele.sendMessBOTTrade(`💬 វេនទើបតែបញ្ចប់ (${time}): ${textKQ}!.`);

			if(guessWIN > 1){
				Tele.sendMessBOTTrade(`💬 លទ្ធផល៖ ឈ្នះ  ជាបន្តបន្ទាប់។  ${guessWIN}.${config.TITLE_SITE} BOT គឺឥតគិតថ្លៃទាំងស្រុង`);
			}else if(guessWIN == 1){
				Tele.sendMessBOTTrade(`💬 លទ្ធផល៖ ឈ្នះ  ជាបន្តបន្ទាប់។  ${guessWIN}.${config.TITLE_SITE} BOT គឺឥតគិតថ្លៃទាំងស្រុង`);
			}

		}else{

			guessWIN = 0;
			guessLOSE++;

			if(kq == 'buy'){
				textKQ = 'កេីន  ⬆️';
			}else{
				textKQ = 'ធ្លាក់ 🔻';
			}

			Tele.sendMessBOTTrade(`💬 វេនទើបតែបញ្ចប់ (${time}): ${textKQ}!.`);

			if(guessLOSE > 1){
				Tele.sendMessBOTTrade(`💬 លទ្ធផល៖ ឈ្នះ  ចាញ់ជាបន្តបន្ទាប់ ${guessLOSE}.${config.TITLE_SITE} BOT គឺឥតគិតថ្លៃទាំងស្រុង`);
			}else if(guessLOSE == 1){
				Tele.sendMessBOTTrade(`💬 លទ្ធផល៖ ឈ្នះ  ចាញ់ជាបន្តបន្ទាប់ ${guessLOSE}.${config.TITLE_SITE} BOT គឺឥតគិតថ្លៃទាំងស្រុង`);
			}
		}
		
	}

}
