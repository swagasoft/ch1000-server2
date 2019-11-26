const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const database = 'mongodb://localhost:27017/channel1000';
// const database = 'mongodb+srv://swagasoft:simoopam222@cluster0-bv5fx.mongodb.net/test?retryWrites=true&w=majority';

// #### cloud database ####

// #### local database ####
mongoose.connect(database,{useNewUrlParser : true}, (err) => {
    if(!err) console.log('mongodb connection successful..');
    else
    console.log("error in connection"+ JSON.stringify(err, undefined, 2));
    console.log(database);

});

require('./user.models');
require('./model_trans');
require('./invest_model');
require('./payout_model');