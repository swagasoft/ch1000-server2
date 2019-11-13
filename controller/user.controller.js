const mongoose = require('mongoose');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const lodash = require('lodash');

const User = mongoose.model('User');
const Invest = mongoose.model('Payment');
const nodemailer = require("nodemailer");
// const Base_link = 'http://localhost:4200/#/link/';
const Base_link = 'https://ch1000.netlify.com/#/link/';
const MARKETER = 'MARKETER';



var dashboardInfo = {};
var group = 0;

// output mail
const output= ` <div style="text-align: center">
 <p>  Hello </p>  <br>
<p> Thank you for choosing channel1000, you a step
away from becoming our millioniare.</p> <br>

<a href="www.channel1000.com">start now!</a>
</div>`

// email section



  const register = async (req, res, next) => {
    
    //  await User.findOne({}, {},{sort : {'date': -1}}).then((lastUser, err)=> {
      
   
  var user = new User();
    let ref_username = req.body.ref_username;

// convert all m to lower case.
let getEmail = req.body.email;
let email_lower = getEmail.toLowerCase();
let getUsername= req.body.username;
let usernameToLower = getUsername.toLowerCase();
  // hash user password
let hashPassword = cryptr.encrypt(req.body.password);
// let lastUser = 1000;
  let intValue =  0;
user.fullname = req.body.fullname;
user.username = usernameToLower;
user.email = email_lower;
user.ref_link = Base_link+req.body.username;
user.cust_id =  0000;
user.role =  req.body.role;
user.ref = ref_username;
user.downline.push();
user.password = hashPassword;
user.group = 1;
user.cashout = 0;
user.ref_count = 0;
user.investment = 0;
user.earnings = 0;
user.activate = false;
 user.save(( err, doc) => {
      if(!err){
         if(ref_username != null || undefined){
          console.log('REFERRAL IS.', ref_username);
            User.findOne({username:ref_username}).then( result => {
            result.downline.push(usernameToLower);
            result.ref_count++;
            result.save(); });
                  }else{
                      console.log('REFERRAL IS NOT DEFINE.');
                      // User.findOne({$and: [ {sort :{'date' :1}} , {point : {$lt: 4} },
                      //     {activate: true}
                      //   ]}
                      // ).then((user)=> {  
                      //    console.log(user);
                      //   if(user){
                      //     user.downline.push(usernameToLower);
                      //   user.ref_count++;
                      //   user.save();
                      //   }else{
                      //     console.warn('NO USER TO PUSH  DOWN LINE');
                      //   }
                      // })
                  }
      res.status(201).send(['Registration succesful']);
      
      }else {
      console.log('ERROR SAVING DATA....', err);

      if(err.errors.email) {
        res.status(442).send(['User already exist!']);
        }else if(err.errors.username){
            res.status(422).send(['Username has been taken']);
          }else{
            res.status(404).send(['error saving user doc']);
            return next(err);      
          }

    } 
    
}); // end save.


}


// index controller
const index = (req, res)=> {
  res.render('index');
}


// login controller
const authenticate = (req, res, done)=> {
let email = req.body.email.toLowerCase();
let password = req.body.password;
User.findOne({email:email},(errr, user)=> {
  //  unknown user
  if(!user){
    res.status(404).send([' User not found.']);
  }else{
let databaseUser = user.email;
let databasePassword = user.password;
let decrypePass = cryptr.decrypt(databasePassword);

    if(decrypePass === password){
      token = user.generateJwt(user);
      // send user role to client...
      res.json({"token":token ,  doc: lodash.pick(user, ['role'])});

    }else{
      res.status(401).send([' email/password is invalid!']);
    }
}
});
}


const userDashboard = (req, res, next) =>{
User.findOne({_id: req._id}, (err, doc) => {
 dashboardInfo = doc;
}).then( ()=> {
  Invest.findOne({user_id: req._id}, (err, doc) => {
    investInfo = doc;
  });
}).then(()=> {
res.status(200).json({status: true, 
  user: lodash.pick(dashboardInfo,
    ['email','fullname', 'username','role', 'ref_link','point','earnings','investment',
 'cust_id','activate','level','cashout','group', 'downline','ref_count'])});

});

}

const editAccount = (req, res, next) => {
User.findOne({_id: req._id}, (err, doc) => {
  if(!doc){
    return res.status(204).json({status: false, message: 'record not found'});
  }else{
    return res.status(200).json({status: true, 
      user: lodash.pick(doc,['username','fullname', 
      'email','role','cust_id', 'ref_link'])});
  }
});
}

module.exports = { register, index, authenticate, userDashboard, editAccount}
