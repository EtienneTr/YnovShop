const Product = require('../entity/Product');

class ProductRepository {

    constructor(){
        this.Product = Product;
    }

    findAll(){
        return this.Product.find({});
    }

    getByName(name){
        return this.Product.findOne({
            'name': name
        }).then(product => {
            return product;
        })
    }

    getById(_id) {
        return this.Product.findById(_id);
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