const mongoose = require('mongoose');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const lodash = require('lodash');

const User = mongoose.model('User');
const Invest = mongoose.model('Payment');
const nodemailer = require("nodemailer");
// const Base_link = 'http://localhost:4200/#/link/';
const Base_link = 'https://ch1000.netlify.com/#/link/';

const level2 = 'LEVEL-2';
const level3 = 'LEVEL-3';
const level4 = 'LEVEL-4';


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
            const updateReferal = User.findOne({username: ref_username}).then((user)=> {
              if(user){
                user.downline.push(usernameToLower);
                user.ref_count++;
                user.save();
              }else{
                console.log('no downline to push in');
              }
            });
          const findFirstUser = User.findOne({}).sort({date : 1});

      Promise.all([updateReferal, findFirstUser ]).then(()=> {
        
      res.status(201).send(['Registration succesful']);
      });
              }else{
                console.log('asign random user');
                 User.findOne({level: 'LEVEL-1'}).sort({date: 1}).then((user)=> {
                  if(user){
                    user.downline.push(usernameToLower);
                    user.ref_count++;
                    user.save().then(()=> {res.status(201).send(['Registration succesful']);} );
                  }else{
                    console.log('no downline to push in');
                  }
                });
              }

      
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


const userDashboard = async (req, res, next) =>{
 
 await User.findOne({_id: req._id}, (err, doc) => {
   if(doc.point === 4){
    console.log('USER PONIT == 4');
    const funds_from4 = 4000;
    let dividend =  (funds_from4 * 0.3) ;
    let re_investment = (funds_from4 * 0.5);

     const setuserLevel =  User.updateOne({_id: doc._id},{$set: {level : "LEVEL-2", point:5, investment: re_investment}});
     const updateEarnings =   User.updateOne({_id: doc._id}, {$inc : {earnings : dividend}});
     const updateTop = User.findOne({$and: [{role: 'INVESTOR'},{point: {$lt: 16}},{level: "LEVEL-2"}, {activate: true}]}
     ).sort({date: 1}).then(result16 => { if(result16){
       console.log('WE UPDATE THIS USER',result16);
        result16.point += 1;
          result16.save();
     } else{ console.log('NO TOP USER TO UPDATE')}});

     Promise.all([setuserLevel, updateEarnings, updateTop]).then(()=> {
      User.findOne({_id: req._id}, (err, doc) => {    let dashboardInfo = doc;         
      res.status(200).json({status: true, user: lodash.pick(dashboardInfo,
    ['email','fullname', 'username','role', 'ref_link','point','earnings','investment',
    'cust_id','activate','level','cashout','group', 'downline','ref_count'])});
       });
     });

   }else if(doc.point == 16){
    console.log('USER PONIT == 16');
    const funds_from16 = 32000;
    let dividend =  (funds_from16 * 0.7) ;
    let re_investment = (funds_from16 * 0.3);

     const setuserLevel =  User.updateOne({_id: doc._id},{$set: {level : "LEVEL-3", point:17, investment: re_investment}});
     const updateEarnings =   User.updateOne({_id: doc._id}, {$inc : {earnings : dividend}});
     const updateTop = User.findOne({$and: [{role: 'INVESTOR'},{point: {$lt: 64}},{level: "LEVEL-3"}, {activate: true}]}
     ).sort({date: 1}).then(result64 => { if(result64){
       console.log('WE UPDATE THIS USER',result64);
        result64.point += 1;
          result64.save();
     } else{ console.log('NO TOP USER TO UPDATE')}});

     Promise.all([setuserLevel, updateEarnings, updateTop]).then(()=> {
      User.findOne({_id: req._id}, (err, doc) => {    let dashboardInfo = doc;         
      res.status(200).json({status: true, user: lodash.pick(dashboardInfo,
    ['email','fullname', 'username','role', 'ref_link','point','earnings','investment',
    'cust_id','activate','level','cashout','group', 'downline','ref_count'])});
       });
     });

   }else if(doc.point == 64) {
    console.log('USER Y POINT === 64');
    const funds_from64 = 614400;
    let dividend =  (funds_from64 * 0.4) ;
    let re_investment = (funds_from64 * 0.1);

     const setuserLevel =  User.updateOne({_id: doc._id},{$set: {level : "LEVEL-4", point:65, investment: re_investment}});
     const updateEarnings =   User.updateOne({_id: doc._id}, {$inc : {earnings : dividend}});
     const updateTop = User.findOne({$and: [{role: 'INVESTOR'},{point: {$lt: 256}},{level: "LEVEL-4"}, {activate: true}]}
     ).sort({date: 1}).then(result256 => { if(result256){
       console.log('WE UPDATE THIS USER',result256);
        result256.point += 1;
          result256.save();
     } else{ console.log('NO TOP USER TO UPDATE')}});

     Promise.all([setuserLevel, updateEarnings, updateTop]).then(()=> {
      User.findOne({_id: req._id}, (err, doc) => {    let dashboardInfo = doc;         
      res.status(200).json({status: true, user: lodash.pick(dashboardInfo,
    ['email','fullname', 'username','role', 'ref_link','point','earnings','investment',
    'cust_id','activate','level','cashout','group', 'downline','ref_count'])});
       });
     });


   }else if(doc.point == 256){
    console.log('USER Y POINT === 256');
    const funds_from64 = 15728640;
    let dividend =  (funds_from64 * 0.35) ;
    let re_investment = (funds_from64 * 0.1);

     const setuserLevel =  User.updateOne({_id: doc._id},{$set: {level : "LEVEL-5", point:257, investment: re_investment}});
     const updateEarnings =   User.updateOne({_id: doc._id}, {$inc : {earnings : dividend}});

     Promise.all([setuserLevel, updateEarnings, updateTop]).then(()=> {
      User.findOne({_id: req._id}, (err, doc) => {    let dashboardInfo = doc;         
      res.status(200).json({status: true, user: lodash.pick(dashboardInfo,
    ['email','fullname', 'username','role', 'ref_link','point','earnings','investment',
    'cust_id','activate','level','cashout','group', 'downline','ref_count'])});
       });
     });

   }else{
    console.log('USER YET FOR UPDRAGE');
    let dashboardInfo = doc;  
    res.status(200).json({status: true, user: lodash.pick(dashboardInfo,
       ['email','fullname', 'username','role', 'ref_link','point','earnings','investment',
    'cust_id','activate','level','cashout','group', 'downline','ref_count'])});

   }
 
});

}


const autoLevelPush = async (req, res, next) => {
  
  const funds_from4 = 4000;
  let dividend =  (funds_from4 * 0.3) ;
  let re_investment = (funds_from4 * 0.5);
  
   //  # update user LEVEL
  //  await User.updateOne({_id: dashboardInfo._id},
  //   {$set: {level : level2, investment: re_investment}});
  //  await User.updateOne({_id: dashboardInfo._id}, {$inc : {earnings : dividend}});
   
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

module.exports = { register, index, autoLevelPush,
   authenticate, userDashboard, editAccount}
