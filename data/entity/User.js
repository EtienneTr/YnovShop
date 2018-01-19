let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let User = new Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    registerDate: Date,
    enable: Boolean
});

let userModel = mongoose.model('User', User);

module.exports = userModel;