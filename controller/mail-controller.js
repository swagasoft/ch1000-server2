 
const  mailController = require('./mail-controller');

 

   async function  emailUser(address, username){
    var testAccount =  nodemailer.createTestAccount();
    var transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      secure: false,
      auth: {
        user: 'ad9ff95ea298d6', // generated ethereal user
        pass: '7bf967715ae155' // generated ethereal password
      }
    });
    
    var mailOptions = {
      from: 'Channnel1000',
      to:  address,
      subject: `<h6 style=" text-center"> Welcome to channel1000</h6>`,
      text: `hello ${username}`,
      html: `<p> 
      Welcome to channel1000, you new way to success has began </p>`
    };
    
    // node mailer system
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info);
      }
    });
    }

    module.exports = {emailUser}