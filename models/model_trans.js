const mongoose = require('mongoose');



var paymentSchema = mongoose.Schema({
    amount: {
        type: Number,
    },
    user_id: {
        type: String,
    },
    reference: {
        type: Number,
    },
    email: {
        type: String,
    },
    status: {
        type: String,
    },
    transaction: {
        type: String,
    },
    message: {
        type: String,
    },
    user: {
        type: String,
    },
    date: {
        type: Date, default: Date.now()
    },
});

mongoose.model('Transaction', paymentSchema);