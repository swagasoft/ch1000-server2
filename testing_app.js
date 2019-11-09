const mongoose = require('mongoose');

// const User = mongoose.model('User');
// const Transaction = mongoose.model('Transaction');
// const Invest = mongoose.model('Payment');
// const PayoutModel = mongoose.model('Payout');



// User.findOne(
//     {$and: [
//         {role: 'INVESTOR'},
//         {$where: 'this.downline.length < 64'},
//         {activate: true}
//       ]}
// ).sort({date: 1}).then(( doc)=> {
//     console.log(doc);
// })