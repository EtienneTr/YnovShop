let ProductRepository = require('../data/repository/ProductRepository');
let ProductError = require('../data/validation/ProductError');

class ProductService {

    constructor(){
        this.ProductRepository = new ProductRepository();
    }

    async createProduct(product){
        try {

            this.validateProduct(product);

            let newProduct = {
                name: product.name,
                onSaleDate: new Date(product.onSaleDate) || new Date(),
                description: product.description || '',
                price: product.price,
                discount: product.discount || 0,
                image: product.image || '',
                stock: product.stock || 0
            };

            return this.ProductRepository.insert(newProduct);
        } catch(execption) {
            throw execption;
        }
    }

    validateProduct(product){

        const name = product.name;
        if(!name || name.length > 50){
            throw new ProductError('name', "Valid field 'name' required.");
        }

        const description = product.description;
        if(description && description.length > 255){
            throw new ProductError('description', "Description field need valid length");
        }

        const price  = product.price;
        if(!price || typeof price !== "number" || price < 0) {
            throw new ProductError('price', "Valid field 'price' required.");
        }

        //not required field but check typeof
        const discount = product.discount;
        if(discount && typeof discount !== "number") {
            throw new ProductError('discount', "Field 'discount' is not a number.");
        }

        const stock = product.stock;
        if(stock && typeof stock !== "number") {
            throw new ProductError('stock', "Field 'stock' is not a number.");
        }

        const image = product.image;
        if(image && typeof image !== "string") {
            throw new ProductError('image', "Field 'image' is not a string.");
        }
    }

}

module.exports = ProductService;