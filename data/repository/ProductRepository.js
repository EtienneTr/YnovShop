const Product = require('../entity/Product');

class ProductRepository {

    constructor(){
        this.Product = Product;
    }

    getAll(){
        return this.Product.find({});
    }

    getByName(name){
        return this.Product.findOne({
            'name': name
        }).then(product => {
            return product;
        })
    }

    insert(product){
        let newProduct = new this.Product(product);

        return newProduct.save();
    }

    remove(product){
        return product.delete();
    }

    update(product){
        return this.Product.save(product);
    }
}

module.exports = ProductRepository;