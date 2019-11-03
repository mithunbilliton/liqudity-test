var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String

    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    dob: Date,
    address: String,
    phone:{type: Number,
       min: 1000000000,
    max : 9999999999
    },
    department: String
});

var user = new mongoose.model('User', schema);

module.exports = user;
