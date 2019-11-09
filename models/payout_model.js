const mongoose = require('mongoose');

var payoutMSchema = mongoose.Schema({

    amount : {
        type: Number
    },
    username : {
        type: String
    },
    user_id : {
        type: String
    },
    date : {
        type: Date, default: Date.now()
    },
  
});

mongoose.model('Payout', payoutMSchema);
