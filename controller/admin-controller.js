const mongoose = require('mongoose');

const User =  mongoose.model('User');
const Payout = mongoose.model('Payment');
const Transaction = mongoose.model('Transaction');
const AllPayout = mongoose.model('Payout');


    //  admin dashboard route....
const adminDashboard = (req, res, next)=> {
 const findAllInvestor = User.countDocuments({role:'INVESTOR'});  
 const findAllPayout = AllPayout.countDocuments({});
 const findAllTransact = Transaction.countDocuments({});
 const findAllActivate = User.countDocuments({activate: true});
 
 Promise.all([findAllInvestor, findAllPayout,
     findAllTransact,findAllActivate]).then((values)=> {

     const investors = values[0];
     const findAllPayout = values[1];
     const allTransaction = values[2];
     const ActivatedUsers = values[3];

    // console.log('user reult', investors);
    // console.log('investment reult', allInvestment);
    // console.log('traxx reult', allTransaction);
    // console.log('marketer reult', ActivatedUsers);


     res.status(201).send({investors, 
      findAllPayout, allTransaction, ActivatedUsers});
 });

}

// get investor's route....
const getInvestors = (req, res, next) => {

    Invest.find({}, (err, doc) => {
    console.log(doc);
    res.status(200).send({doc});
});
}

const level1Users = async (req, res, next) => {
   console.log("GET LEVEL-1 USERS");

   await User.find(
        {$and: [
          {role: 'INVESTOR'},
          {level: 'LEVEL-1'},
          {point: {$gte: 4} },
          {point: {$lt: 16} },
          {activate: true}
        ]}
      ).then((docs)=> {
        if(docs){
          res.status(200).send({docs, status: true});
        }else{
          res.status(200).send({docs, status: false, message:'users not found!'});
        }
        
      });
}
const level2Users = async (req, res, next) => {
  console.log("GET LEVEL-2 USERS");
   await User.find(
        {$and: [
          {role: 'INVESTOR'},
          {level: 'LEVEL-2'},
          {point: {$gte: 16} },
          {point: {$lt: 64} },
          {activate: true}
        ]}
      ).then((docs)=> {
        if(docs){
          res.status(200).send({docs, status: true}); 
        }else{
          res.status(200).send({docs, status: false, message: 'users not found!'}); 
        }
       
      });
}
const level3Users = async (req, res, next) => {
  console.log("GET LEVEL-3 USERS");
   await User.find(
        {$and: [
          {role: 'INVESTOR'},
          {level: 'LEVEL-3'},
          {point: {$gte: 64}},
          {point: {$lt: 256} },
          {activate: true}
        ]}
      ).then((docs)=> {
        if(docs){
res.status(200).send({docs, status: true});        
        }else {
res.status(200).send({ status: false, message: 'users not found'});        
        }
      });
}
const level4Users = async (req, res, next) => {
  console.log("GET LEVEL-4 USERS");
   await User.find(
        {$and: [
          {role: 'INVESTOR'},
          {level: 'LEVEL-4'},
          {point : {$gt: 256} },
          {activate: true}
        ]}
      ).then((docs)=> {
        if(docs){
          res.status(200).send({docs, status: true});
        }else{
          res.status(200).send({ status: false, message:'users not found'});
        }
        
      });
}

const getInactiveUsers = async (req, res, next) => {
  console.log('inactive fires');

  await User.find(
    {$and: [
      {role: 'INVESTOR'},
      {activate: false}
    ]}
  ).then((doc) => {
  res.status(200).send({doc});

  });
}

const deleteUser = async (req, res ) => {
  let user_id = req.params.id;
  await User.findOneAndRemove({_id: user_id}).then(()=> {
    res.status(200).send({ status: true , message: 'user deleted.'});

  });

}

const deleteTrans = async (req, res) => {
  let user_id = req.params.id;
  await Transaction.findOneAndRemove({_id: user_id}).then(() => {
    res.status(200).send({status: true, message: ' user deleted'});
  })
}

const readAllTransactions = async (req, res) => {
Transaction.find({}).sort({date: -1}).limit(20).then((trans)=> {
  res.status(200).send({trans});
});
}

const queryUser = async (req, res, next)=> {

  let user = req.params.user;
 const queryInvest = await  Invest.findOne({user: user});
const payout = await Payout.find({username: user});
const userDetails = await User.find({username: user});
const trans = await Transaction.find({user: user});

if(userDetails){
  res.status(200).send({queryInvest, payout, userDetails, trans});
}else{
  res.status(402).send({ message: 'user not found'});
  
}
  
}



module.exports = {adminDashboard,queryUser, getInvestors, level1Users,readAllTransactions,
   level2Users , level3Users, level4Users,deleteTrans, getInactiveUsers, deleteUser}