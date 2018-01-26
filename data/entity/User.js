let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let User = new Schema({
    name: {
        type: String,
        required: true
    },
    username: String,
    email: {
        type: String,
        required: true
    },
    password: String,
    registerDate: Date,
    enable: Boolean
});

let userModel = mongoose.model('User', User);

module.exports = userModel;