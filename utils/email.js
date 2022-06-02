const nodemailer = require('nodemailer');
const pug = require('pug');
const dotenv = require('dotenv');
const { htmlToText } = require('html-to-text');

dotenv.config({ path: './config.env' });


//Creacte a conecction with a email service
class Email {
  constructor() {}
  createTransport() {
    nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });
  }
  // Send a email with to a newly created account
  async send() {
    //Get the pug file that needs to be send
    const html = pug.renderFile(`${__dirname}/../views/emails/baseEmail.pug`, {
      title: 'Email send from NodeJS',
    });
   await  this.createTransport().sendMail({
      from: 'academloEcommerce@gmail.com',
      to: 'jome@gmail.com',
      subject: 'nes Account',
      html,
      text: htmlToText(html),
    });
  }
  // send a email to newly created account
  async sendWelcome() {
await this.send()
  }
}
module.exports = { Email };
