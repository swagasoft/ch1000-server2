const mongoose = require('mongoose');
// var Transaction = require('../models/model_trans');

const User = mongoose.model('User');
const Transaction = mongoose.model('Transaction');
const Invest = mongoose.model('Payment');
const PayoutModel = mongoose.model('Payout');

var levelOnePay = 300;
var levelOnePayWithoutRef = 300;
var levelTwopay = 1400;
var levelThreePay = 3840;
var levelFourPay = 21504;




 function updateUser(body, id){
  var invest = new Invest();
  invest.user = body.user;
  invest.user_id = id;
  invest.investment = body.amount;
  invest.amount = body.amount;
  invest.save().then(()=> {
    // activate user to true...
   var userAccount =  User.findByIdAndUpdate(id, {$set: {activate: true}});

  });
  return;
 }

const transaction = async (req, res, next) => {
  // update user's account in databse..
  await User.updateOne({_id: req._id},{$set: {activate : true, investment: req.body.amount}});

await User.findOne({_id: req._id}, (error, document)=> {
  var getMyReferal = document.ref;
 
  var tranx = new Transaction();
    tranx.amount = req.body.amount;
    tranx.status = req.body.status;
    tranx.user_id = req._id;
    tranx.message = req.body.message;
    tranx.user = req.body.user;
    tranx.email = req.body.email;
    tranx.transaction = req.body.trans;
    tranx.reference = req.body.reference;
     tranx.save().then(()=> {
                User.findOne({$and: [ {username: getMyReferal}, {activate: true} ]}
                ).then((doc)=> {
                  if(doc){
                    if(doc.level === 'LEVEL-1'){
                      console.log('MY REFERAL FOUND', doc);
    
                       doc.earnings += levelOnePay;
                       doc.point += 1;
                       doc.save();
                     }else{
                      User.findOne({$and: [{role: 'INVESTOR'},{point: {$lt: 16}},{level: "LEVEL-1"}, {activate: true}]}
                      ).sort({date: 1}).then((doc)=> {
                         if(doc){
                          doc.earnings += levelOnePay;
                          doc.point += 1;
                          doc.save().then(()=> {
                            res.status(200).send({status: true, message: 'payment saved!'});
                          });
                         }else{
                           console.log('MAYBE USER IS NOT SCTIVATEED')
                           res.status(200).send({status: true, message: 'payment saved!'});
                         }
                      });
                     }
                  }else{
                    User.findOne({$and: [{role: 'INVESTOR'},{point: {$lt: 16}},{level: "LEVEL-1"}, {activate: true}]}
                    ).sort({date: 1}).then((doc)=> {
                       if(doc){
                        doc.earnings += levelOnePay;
                        doc.point += 1;
                        doc.save().then(()=> {
                          res.status(200).send({status: true, message: 'payment saved!'});
                        });
                       }else{
                         console.log('MAYBE USER IS NOT SCTIVATEED')
                         res.status(200).send({status: true, message: 'payment saved!'});
                       }
                    });
                  }
                 
                }
             
                );
                       
    })
      // former send response
  });

}



investmentCreate = (req,res, next)=> {
    console.log('redirection successful..');
    console.log(req._id);
}

const payOutUser = async (req, res) => {
  var newPayout = new PayoutModel();

      let values = req.params.values;
      console.log('VALUES', values);
      let nameArr = values.trim().split(',');
      user_ID = nameArr[0];
      reqUsername = nameArr[1];
      cashAmount = nameArr[2];
       amountInt = parseInt(cashAmount);
       user_ID.trim();
     await User.updateOne({_id: user_ID},{$set: {cashout: 0}});;
    
     
      newPayout.amount = cashAmount;
      newPayout.user_id = user_ID;
      newPayout.username = reqUsername;
      console.log(reqUsername);
      newPayout.save().then(()=> {
      });
      await  User.find().where('cashout').gte(1).exec((error, result)=> {
        console.log('sending result....');
        res.status(200).send({result});
});
 }

 const getCurrentPayouts = (req, res)=> {
  PayoutModel.find().sort({date : -1}).limit(20).then((doc)=> {
    res.status(200).send({message: ' current payouts fires', doc});

  });
 }

 const getHighRanked = async (req, res, next) => {
   await Invest.findOne().sort({earnings:-1}).limit(3).then((doc) => {
     console.log('TOP EARNERS',doc);
   });
 }


module.exports = {transaction, updateUser, investmentCreate, payOutUser, getCurrentPayouts, getHighRanked}