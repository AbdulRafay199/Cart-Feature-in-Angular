const mongoose = require("mongoose");

const transactionschema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    service:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    cart:{
        type: Array,
        required: true,
    },
})

const transactionmodel = mongoose.model('transaction',transactionschema);

module.exports = transactionmodel;