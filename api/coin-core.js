const config = require('../config')
const Helper = require("../helpers");
const fileSys = config.PATH_SYS_CONFIG
const EthereumTx = require('ethereumjs-tx').Transaction
const common = require('ethereumjs-common')
const Web3 = require('web3')

let dataSys = Helper.getConfig(fileSys);

var TOKEN_KEY_Bsc = 'NPP2344QXA2PF1QTU96I7BI567W9NEN8DK', apiBsc = null, web3Bsc = null;

var ContractAddress = null, USDTJSON = null, USDT_BSC = null;

function setConnectSmartChain(type) {
    if (!type) { // mainnet
        USDTJSON = Helper.getConfig(config.ABI_USDT_MAINNET); //require('./config/USDT_BEP20_mainnet.json');

        ContractAddress = dataSys.CONTRACT_USDT_MAIN; // mặc địch của //BUSD-T Stablecoin

        /* 
            Config BSC Scan BEP20
        */
        apiBsc = require("bscscan-api").init(TOKEN_KEY_Bsc, 'mainnet')  // 97: Testnet. 56: mainnet
        web3Bsc = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed1.binance.org')) //https://bsc-dataseed1.binance.org (mainnet)

        USDT_BSC = new web3Bsc.eth.Contract(USDTJSON, ContractAddress);
    } else {
        USDTJSON = Helper.getConfig(config.ABI_USDT_TESTNNET); //require('./config/USDT_BEP20_testnet.json');

        ContractAddress = dataSys.CONTRACT_USDT_TEST; // mặc địch của //Binance USD (BUSD) (test)

        /* 
           Config BSC Scan BEP20
       */
        apiBsc = require("bscscan-api").init(TOKEN_KEY_Bsc, 'testnet')  // 97: Testnet. 56: mainnet
        web3Bsc = new Web3(new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545')) //https://bsc-dataseed1.binance.org (mainnet)

        USDT_BSC = new web3Bsc.eth.Contract(USDTJSON, ContractAddress);
    }
}

setConnectSmartChain(dataSys.IS_TEST_SMART_CHAIN);

setInterval(() => {
    dataSys = Helper.getConfig(fileSys);
    setConnectSmartChain(dataSys.IS_TEST_SMART_CHAIN);
}, 60000);

function sendCoinBNB(addressFrom, keyAddressFrom, adressTo, priceUSDT) {
    return new Promise((resolve, reject) => {
        if (!!addressFrom && addressFrom != '' || !!keyAddressFrom && keyAddressFrom != '') {
            var balanceEther = apiBsc.account.balance(addressFrom);
            balanceEther.then((balanceData) => {
                if (balanceData.status == 1) {
                    let price = Number(balanceData.result); // price lấy số dư hiện tại
                    // convert từ $ muốn rút sang BNB
                    let cvtoBSC = priceUSDT / dataSys.quotePriceBNB;
                    let amountTransaction = web3Bsc.utils.toWei(cvtoBSC.toString(), 'ether'); // chuyển từ $ sang price BNB

                    let gasP = 10, gasL = 21000;
                    //let fee = gasL*gasP*1000000000; // giới hạn Gas  * giá Gas * 100 * 1.000.000.000 ( 1 tỉ )
                    let fee = web3Bsc.utils.toWei((gasL * gasP).toString(), 'gwei');

                    let tongTienChuyen = Number(amountTransaction) + Number(fee);
                    //let soTienConLai = web3Bsc.utils.fromWei((price - tongTienChuyen).toString(), 'ether');

                    if (price > amountTransaction) {
                        let privateKeyAccount = Buffer.from(keyAddressFrom.replace('0x', ''), 'hex'); // Private KEY for Admin
                        // chuyển về Ví user
                        web3Bsc.eth.getTransactionCount(addressFrom, (err, txCount) => {
                            if (err) {
                                reject(err);
                            }

                            const txObj = {
                                nonce: web3Bsc.utils.toHex(txCount),
                                from: addressFrom,
                                to: adressTo, // đây là ví khách hàng
                                value: web3Bsc.utils.toHex(amountTransaction), //web3Bsc.utils.toWei(amountTransaction.toString(), 'ether')
                                gasLimit: web3Bsc.utils.toHex(gasL),
                                gasPrice: web3Bsc.utils.toHex(web3Bsc.utils.toWei(gasP.toString(), 'gwei'))
                            }

                            // sign the transaction
                            let id = dataSys.IS_TEST_SMART_CHAIN ? 97 : 56;

                            const chain = common.default.forCustomChain(
                                'mainnet', {
                                name: 'bnb',
                                networkId: id,
                                chainId: id
                            },
                                'petersburg'
                            )

                            // sign the transaction
                            const tx = new EthereumTx(txObj, { common: chain })
                            tx.sign(privateKeyAccount)

                            const serializedTx = tx.serialize();
                            const raw = '0x' + serializedTx.toString('hex');

                            // broadcast the transation
                            web3Bsc.eth.sendSignedTransaction(raw, (err, txHash) => {
                                let bscchuyen = web3Bsc.utils.fromWei(tongTienChuyen.toString(), 'ether');
                                let priceGoc = web3Bsc.utils.fromWei(amountTransaction.toString(), 'ether');
                                let phi = web3Bsc.utils.fromWei(fee.toString(), 'ether');

                                resolve({
                                    bscchuyen,
                                    priceGoc,
                                    phi,
                                    txHash,
                                });
                            })
                        });
                    } else {
                        let soTienConLai = web3Bsc.utils.fromWei(price.toString(), 'ether');
                        let soTienCanChuyen = web3Bsc.utils.fromWei(tongTienChuyen.toString(), 'ether');
                        reject(`⚡️Số dư BSC hiện tại: ${soTienConLai} không đủ để thanh toán cho số tiền: <b>${soTienCanChuyen}</b>`);
                    }
                } else {
                    reject('Hệ thống bảo trì');
                }
            });
        } else {
            reject('Địa chỉ gửi tiền chưa thiết lập!');
        }
    });
}

function sendCoinBNBByAdmin(addressFrom, keyAddressFrom, adressTo) {
    console.log('admin chuyen BNB')
    return new Promise((resolve, reject) => {
        if (!!addressFrom && addressFrom != '' || !!keyAddressFrom && keyAddressFrom != '') {
            var balanceEther = apiBsc.account.balance(addressFrom);
            balanceEther.then((balanceData) => {
                if (balanceData.status == 1) {
                    let price = Number(balanceData.result); // price lấy số dư hiện tại
                    let gasP = 37, gasL = 21000;
                    let fee = web3Bsc.utils.toWei((gasL * gasP).toString(), 'gwei');
                    let tongTienChuyen = web3Bsc.utils.toWei('0.0021', 'ether');

                    if (price > tongTienChuyen) {
                        let privateKeyAccount = Buffer.from(keyAddressFrom.replace('0x', ''), 'hex'); // Private KEY for Admin
                        // chuyển về Ví user
                        web3Bsc.eth.getTransactionCount(addressFrom, (err, txCount) => {
                            if (err) {
                                reject(err);
                            }

                            const txObj = {
                                nonce: web3Bsc.utils.toHex(txCount),
                                from: addressFrom,
                                to: adressTo, // đây là ví khách hàng
                                value: web3Bsc.utils.toHex(tongTienChuyen), //web3Bsc.utils.toWei(amountTransaction.toString(), 'ether')
                                gasLimit: web3Bsc.utils.toHex(gasL),
                                gasPrice: web3Bsc.utils.toHex(web3Bsc.utils.toWei(gasP.toString(), 'gwei'))
                            }

                            // sign the transaction
                            let id = dataSys.IS_TEST_SMART_CHAIN ? 97 : 56;

                            const chain = common.default.forCustomChain(
                                'mainnet', {
                                name: 'bnb',
                                networkId: id,
                                chainId: id
                            },
                                'petersburg'
                            )

                            // sign the transaction
                            const tx = new EthereumTx(txObj, { common: chain })
                            tx.sign(privateKeyAccount)

                            const serializedTx = tx.serialize();
                            const raw = '0x' + serializedTx.toString('hex');

                            // broadcast the transation
                            web3Bsc.eth.sendSignedTransaction(raw, (err, txHash) => {
                                let bscchuyen = web3Bsc.utils.fromWei(tongTienChuyen.toString(), 'ether');
                                let phi = web3Bsc.utils.fromWei(fee.toString(), 'ether');

                                resolve({
                                    bscchuyen,
                                    phi,
                                    txHash,
                                });
                            })
                        });
                    } else {
                        let soTienConLai = web3Bsc.utils.fromWei(price.toString(), 'ether');
                        let soTienCanChuyen = web3Bsc.utils.fromWei(tongTienChuyen.toString(), 'ether');
                        reject(`⚡️Số dư BSC hiện tại: ${soTienConLai} không đủ để thanh toán cho số tiền: <b>${soTienCanChuyen}</b>`);
                    }
                } else {
                    reject('Hệ thống bảo trì');
                }
            });
        } else {
            reject('Địa chỉ gửi tiền chưa thiết lập!');
        }
    });
}

function sendCoinBep20(addressFrom, keyAddressFrom, adressTo, priceUSDT, nick_name) {
    return new Promise((resolve, reject) => {
        if (addressFrom == null || keyAddressFrom == null) {
            reject(`⚡️Địa chỉ chưa được thiết lập`);
        }

        let balanceToken = USDT_BSC.methods.balanceOf(addressFrom).call(); // lấy token usdt
        balanceToken.then((res) => {
            if (res > 0) {
                let balanceBsc = apiBsc.account.balance(addressFrom); // get phí BNB
                balanceBsc.then((res2) => {
                    try {
                        if (res2.status == 1) {
                            let fee = Number(web3Bsc.utils.toWei('0.0021', 'ether'));

                            let balance = res2.result;
                            let price = Number(balance);

                            if (price >= fee) {
                                let priceChuyen = web3Bsc.utils.toWei(priceUSDT.toString(), 'ether');
                                let amount = web3Bsc.utils.toHex(priceChuyen);
                                let gasP = 10, gasL = 210000;
                                let gasPrice = web3Bsc.utils.toWei(gasP.toString(), 'gwei');
                                let privateKeyAccount = Buffer.from(keyAddressFrom.replace('0x', ''), 'hex');

                                web3Bsc.eth.getTransactionCount(addressFrom)
                                    .then((count) => {
                                        let rawTransaction = {
                                            from: addressFrom,
                                            gasPrice: web3Bsc.utils.toHex(gasPrice),
                                            gasLimit: web3Bsc.utils.toHex(gasL),
                                            to: ContractAddress,
                                            value: "0x0",
                                            data: USDT_BSC.methods.transfer(adressTo, amount).encodeABI(),
                                            nonce: web3Bsc.utils.toHex(count)
                                        }

                                        let id = dataSys.IS_TEST_SMART_CHAIN ? 97 : 56;

                                        const chain = common.default.forCustomChain(
                                            'mainnet', {
                                            name: 'bnb',
                                            networkId: id,
                                            chainId: id
                                        },
                                            'petersburg'
                                        )

                                        const tx = new EthereumTx(rawTransaction, { common: chain });
                                        tx.sign(privateKeyAccount);

                                        const serializedTx = tx.serialize();
                                        const raw = '0x' + serializedTx.toString('hex');

                                        web3Bsc.eth.sendSignedTransaction(raw, (err, txHash) => {
                                            if (err) {
                                                reject(`🙅<b>${JSON.stringify(err)}</b>`);
                                            }

                                            if (void 0 !== txHash) {
                                                web3Bsc.eth.estimateGas(rawTransaction)
                                                    .then((gasUsed) => {
                                                        let phi = gasUsed * web3Bsc.utils.fromWei(gasP.toString(), 'gwei');

                                                        resolve(`🏆Địa chỉ BSC: ${addressFrom} |${nick_name} hiện tại: vừa chuyển <b>$${priceUSDT} USDT</b> cho ${adressTo}\nPhí: <b>${phi} BNB</b>`);
                                                    }).catch((error) => {
                                                        reject(`🙅<i>Không lấy được phí GAS hợp đồng</i> ${JSON.stringify(error)}`);
                                                    });
                                            }
                                        })
                                    }).catch((error) => {
                                        reject(`🙅<i>Không tạo được smartcontract: </i> ${error}`);
                                    });
                            } else {
                                let conlaiFee = fee - price;
                                reject(`
                                🏘Địa chỉ: ${addressFrom}
                                🏋️Số dư hiện tại BNB: <b>${web3Bsc.utils.fromWei(price.toString(), 'ether')}</b>
                                💸Số dư tối thiểu BNB: <b>0.0021</b> để làm phí chuyển
                                - Vui lòng nạp thêm: 💸<b>${web3Bsc.utils.fromWei(conlaiFee.toString(), 'ether')}</b> BNB phí`);
                            }
                        }
                    } catch (e) {
                        reject(`Hệ thống bảo trì ${JSON.stringify(e)}`);
                    }
                })
            } else {
                let soTienConLai = web3Bsc.utils.fromWei(res.toString(), 'ether');
                let soTienCanChuyen = priceUSDT;
                reject(`⚡️Số dư USDT hiện tại: $${soTienConLai} không đủ để thanh toán cho: <b>$${soTienCanChuyen}</b>`);
            }
        });
    })
}

async function getUSDTFrom(address) {
    const balanceToken = await USDT_BSC.methods.balanceOf(address).call();
    return Number(web3Bsc.utils.fromWei(balanceToken.toString(), 'ether'));
}

async function isAdminBNBAvaiable(address) {
    var balanceData = await apiBsc.account.balance(address);
    const bnbAdmin = Number(balanceData.result);

    let gasP = 37, gasL = 21000;
    let fee = web3Bsc.utils.toWei((gasL * gasP).toString(), 'gwei');
    let tongTienChuyen = Number(fee);

    return bnbAdmin >= tongTienChuyen;
}

module.exports = {
    sendCoinBNB,
    sendCoinBep20,
    getUSDTFrom,
    sendCoinBNBByAdmin,
    isAdminBNBAvaiable,
}