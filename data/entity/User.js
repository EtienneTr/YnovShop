let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Address = require('./Address').schema;

let User = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: String,
    registerDate: Date,
    enable: Boolean,
    addresses: [Address],
});

let userModel = mongoose.model('User', User);

module.exports = userModel;