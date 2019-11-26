const mongoose = require('mongoose');

const User = mongoose.model('User');
const Transaction = mongoose.model('Transaction');
const Invest = mongoose.model('Payment');
const level2 = 'LEVEL-2';
const level3 = 'LEVEL-3';
const level4 = 'LEVEL-4';

var levelOnePay =  1200;
var levelTwopay = 1400;
var levelThreePay = 3840;
var levelFourPay = 21504;




postUserToLevel2 = async (req, res, next) => {
     let getDocumentID = req.params.id;
     const funds_from4 = 4000;
     let dividend =  (funds_from4 * 0.3) ;
     let re_investment = (funds_from4 * 0.5);
     let marketer_share = ( funds_from4 * 0.2);
 
    //  # update user LEVEL
     await User.updateOne({_id: getDocumentID},
       {$set: {level : level2, investment: re_investment}});

       await User.updateOne({_id: getDocumentID}, {$inc : {earnings : dividend}}).then(()=> {
        res.status(200).send({ status: true}); 
       });

    // update top user point
  //  await User.findOne({$and: [{role: 'INVESTOR'},{point: {$lt: 16}},{level: level2}, {activate: true}]}
  //   ).sort({date: 1}).then(result16 => {
  //     if(result16){
  //        result16.point += 1;
  //         result16.save();
  //     }else{
  //       console.log('NO USER HAS POINT LESS 16, SO FIND POINT 4 AND ABOVE ')
    
  //     }
  //   });

         
                  
}

postUserToLevel3 = async (req, res, next) => {
    // ####### SHARING PROFIT
     let getDocumentID = req.params.id;
     const funds_from16 = 32000;
     let dividend =  (funds_from16 * 0.7) ;
     let re_investment = (funds_from16 * 0.3);
                     
     await User.updateOne({_id: getDocumentID},
      {$set: {level : level3, investment: re_investment}});

      await User.updateOne({_id: getDocumentID}, {$inc : {earnings : dividend}}).then(()=> {
       res.status(200).send({ status: true}); 
      });
}


postUserToLevel4 = async (req, res, next) => {
    // ####### SHARING PROFIT
     let getDocumentID = req.params.id;
     const funds_from64 = 614400;
     let dividend =  (funds_from64 * 0.4) ;
     let re_investment = (funds_from64 * 0.1);
  
     await User.updateOne({_id: getDocumentID},
      {$set: {level : level4, investment: re_investment}});

      await User.updateOne({_id: getDocumentID}, {$inc : {earnings : dividend}}).then(()=> {
       res.status(200).send({ status: true}); 
      });
    res.status(200).send({ status: true});  
}



module.exports = {postUserToLevel2, postUserToLevel3, postUserToLevel4}