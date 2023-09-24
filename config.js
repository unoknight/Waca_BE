let USE_SSL = true;

module.exports = {
	USE_SSL,
	CF_SSL: {
		key: 'certs/panazic.key',
		cert: 'certs/panazic.crt'
	},

	DOMAIN: 'https://wacaglobal.net',
	REAL_DOMAIN:"https://wacaglobal.net",
	TITLE_SITE: 'WacaGlobal',
	CONTACT: 'support@wacaglobal.net',

	MAIL_LOGO: 'https://wacaglobal.net/logo.png',
	MAIL_IMG_FOOTER: 'https://racaglobal.net/line.png',
	MAIL_USERNAME: '',
	MAIL_PASSWORD: '',

	SO_GIAY_DEM_NGUOC: 30,
	RATE_NHA_THUONG: 95,
	BET_MAX: 0.1,

	BINANCE_APIKEY: 'srBGjy1ATl33Lzb5ZmeXneanYnygQw3QRCGNq0zKV9vvPM5O95CjV8aNX9C9HCUZ',
	BINANCE_APISECRET: 'AVoHbbQcrOuUhdvkhdxyGuTk9FJlTJBgH02LPwA9TcUxxMCTnF8p1WL3ZPWw4C1T',

	// THANH TOÁN PAYPAL
	//PAYPAL_MODE: 'live', //sandbox or live
	//PAYPAL_CLIENT_ID: 'AbubWI5Cc-21tFJnqK7B6cFuSa2es3nqJYY0McPI9EBLiCyDQjJEJ7_vUcZTBNdiHVhfOEWUsTPL0mcf',//'AakUAPg0hA5WSN5IdhfLV_VsPWd8kLktvesDPEDgbsdzOLwI9UPQj9NAYEyVIVKKzRsdC_2HbnAFy10p',
	//PAYPAL_CLIENT_SECRET: 'EFX50IOpCcqREF8npYA9iavGBvqeW8W7zZ1wfM_dn147xyelQyGwSa9U-WJrl44BrSmnj7JFNqMcY8fk',//'EMEZw9QceAhl2UztIWGH62xh95z7---kuu6npJTRj09TVJRQnG-hyIfKUfsptfPIGcBvuwxeBhCtjYT_',

	PAYPAL_MODE: 'sandbox', //sandbox or live
	PAYPAL_CLIENT_ID: 'AakUAPg0hA5WSN5IdhfLV_VsPWd8kLktvesDPEDgbsdzOLwI9UPQj9NAYEyVIVKKzRsdC_2HbnAFy10p',//'',
	PAYPAL_CLIENT_SECRET: 'EMEZw9QceAhl2UztIWGH62xh95z7---kuu6npJTRj09TVJRQnG-hyIfKUfsptfPIGcBvuwxeBhCtjYT_',//'',
	// KẾT THÚC THANH TOÁN PAYPAL

	DATA_HOST: 'localhost',
	DATA_USER: 'root',
	DATA_PASS: '8GFy9CQwCCSfanCI',
	DATA_DB: 'db_production',
	DATA_PORT: 3306,

	PORT_TRADE: 2096, // default 443 ssl
	PORT_SYS: 2087,
	PORT_NAP: 2083,
	PORT_NOTIFY: 2053,
	PORT_SERVER: 8888,

	TOKEN_KEY: '7ovNxUYpJl',

	PATH_SYS_CONFIG: 'stSys',
	PATH_SYS_COMMISSION: 'stCommission',
	PATH_SYS_COMMISSION_VIP: 'stCommissionVip',

	ABI_USDT_MAINNET: 'USDT_BEP20_mainnet',
	ABI_USDT_TESTNNET: 'USDT_BEP20_testnet',
	IS_TELEGRAM:true,
	TELEGRAM_TOKEN: '6010101591:AAHIvk7jmqaNd3wUC-lztyhzMrSgplO5ykI',
	TELEGRAM_BET_ID: 'waca_bet',
	TELEGRAM_RUT_ID: 'waca_rut',
	TELEGRAM_NAP_ID: 'waca_nap',
	TELEGRAM_BET_AMOUNT: 'waca_bet_amount',
	TELEGRAM_BET_THONG_BAO: 'waca_bet_noty',
	TELEGRAM_BET_PHIM_LENH: 'waca_botglobal',
}