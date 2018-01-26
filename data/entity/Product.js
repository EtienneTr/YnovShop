let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let Product = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50
    },
    onSaleDate: Date,
    description: {
        type: String,
        maxLength: 255
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discount: Number,
    image: String,
    stock: Number
});

let productModel = mongoose.model('Product', Product);

module.exports = productModel;