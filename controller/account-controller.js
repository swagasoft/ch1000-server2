mongoose = require('mongoose');

const User = mongoose.model('User');
const Transaction = mongoose.model('Transaction');
const Invest = mongoose.model('Payment');


const loadBalance = (req, res, next) => {
User.findOne({_id: req._id}, (err, doc) => {
res.status(200).send({doc});
});
}

const processCashout = async(req, res, next)=> {
    console.log(req.params.value);
    let curDate = Date.now();
    let cashout = req.params.value;
    await User.updateOne({_id : req._id},{$inc : {earnings: -cashout}});
    await User.updateOne({_id : req._id}, {$inc : {cashout:cashout}}, {date: curDate});
    await User.findOne({_id: req._id}, (err, doc) => {
        res.status(200).send({doc});
        });
   
}

const getTransactions = (req, res) => {
    Transaction.find({user_id: req._id}, (err, result)=> {
        res.status(200).send({result});
    });
}

const usersCashout = (req, res, next) => {
  User.find().where('cashout').gte(1).exec((error, result)=> {
res.status(200).send({result});
    });
}


module.exports = { loadBalance, usersCashout, getTransactions, processCashout }