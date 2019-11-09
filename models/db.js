const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
// const database = 'mongodb://localhost:27017/channel1000';
// const database = 'mongodb+srv://swagasoft:simoopam222@cluster0-bv5fx.mongodb.net/test?retryWrites=true&w=majority';

// #### cloud database ####

// #### local database ####
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser : true}, (err) => {
    if(!err) console.log('mongodb connection successful..');
    else
    console.log("error in connection"+ JSON.stringify(err, undefined, 2));
    console.log(process.env.MONGODB_URI);

});

require('./user.models');
require('./model_trans');
require('./invest_model');
require('./payout_model');