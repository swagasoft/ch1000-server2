const mongoose = require('mongoose');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const passport = require('passport'); 
const nodeMailer = require('nodemailer');


const homePage = (req, res, next)=> {
    res.render('contact');
}

const submitForm = (req, res, next) => {
    console.log(req.body);


    const output= ` <p> you have a new email</p>`

    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "1ad9ff95ea298d6",
          pass: "7bf967715ae155"
        }
      });
      
      var mailOptions = {
        from: '"Example Team" <from@example.com>',
        to: 'user1@example.com, user2@example.com',
        subject: 'Nice Nodemailer test',
        text: 'Hey there, it’s our first message sent with Nodemailer ',
        html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br /><img src="cid:uniq-mailtrap.png" alt="mailtrap" />',
     
      };
      
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
      });
      Out
     
    res.render('contact', {msg: ' Email has been sent.'})
    }
    
 

module.exports = {homePage, submitForm}