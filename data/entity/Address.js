let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let Address = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['billing', 'shipping', 'both'],
        default: 'both'
    },
    firstLine: {
        type: String,
        maxLength: 100
    },
    secondLine: {
        type: String,
        maxLength: 100
    },
    postalCode: String,
    city: String,
    country: {
        type: String,
        uppercase: true
    },
    enabled: Boolean
});

let addressModel = mongoose.model('Address', Address);

module.exports = addressModel;