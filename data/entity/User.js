let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let User = new Schema({
    name: String,
    surname: String,
    email: String,
    passwordHash: String,
    salt: String,
    registerDate: Date,
    enable: Boolean
});

let userModel = mongoose.model('User', User);

module.exports = userModel;