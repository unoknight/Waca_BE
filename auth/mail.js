const axios = require('axios');
const nodemailer = require('nodemailer')
const config = require("./../config")
//var SibApiV3Sdk = require('sib-api-v3-sdk');

const listemail = [
  `noreply@wacaglobal.net`, `no-reply@wacaglobal.net`
];

const sendMail = async (to, subject, htmlContent) => {
  // var defaultClient = SibApiV3Sdk.ApiClient.instance;
  // var apiKey = defaultClient.authentications['api-key'];
  // apiKey.apiKey = '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';
  // var tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

  // const rd = Math.floor(Math.random() * 2);

  // const sender ={
  //   name:`${config.TITLE_SITE} <${listemail[rd]}>`,
  //   email: listemail[rd]
  // }

  // const recievers = [
  //   {
  //     email: to
  //   }
  // ]

  // tranEmailApi.sendTransacEmail({
  //   sender,
  //   to:recievers,
  //   subject:subject,
  //   htmlContent:htmlContent
  // }).then(console.log).catch(console.log);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'support@wacaglobal.net',
      pass: 'jbgeqxpyzfifrcst'
    }
  })

  transporter.sendMail({
    from: 'Wacaglobal <support@wacaglobal.net>',
    to: to,
    subject: subject,
    html: htmlContent
}).then(console.log).catch(console.log);
}

module.exports = {
  sendMail
}
