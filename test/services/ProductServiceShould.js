let test = require("unit.js");
let should = test.should;
let sinon = require("sinon");

let ProductService = require('../../services/ProductService');
let ProductError = require('../../data/validation/ProductError');

let testProduct = {
    name: 'produit 1',
    onSaleDate: new Date(),
    description: 'a full desc',
    price: 50,
    discount: 0,
    image: 'local//my/path/to/image',
    stock: 10
};

describe("ProductService validator : no error", ()=>{

    let productService;
    beforeEach(() => {
        productService = new ProductService();
    });

    it('Should not throw when valid product', () => {

        return test.promise
            .given(testProduct)
            .when(product => {
                return productService.validateProduct(product);
            })
            .then((res) => {
                //ok, this function return nothing
                should(res).be.equal(undefined);
            })
            .catch((err) => {
               test.fail('Sould not throw error : ' + err.message );
            });
    });


});

describe("ProductService validator : expection on create", () => {

    let productService;

    beforeEach(() => {
        productService = new ProductService();
    });

    it('Should throw ProductError on invalid name', () => {

        return test.promise
            .given(testProduct)
            .when(product => {
                product.name = null;
                return productService.validateProduct(product);
            })
            .then((res) => {
                //fail if no error
                test.fail('need throw error');
            })
            .catch(err => {
                should(err).be.an.instanceof(ProductError);
                should(err.field).be.equal('name');
            })
    });

    it('Should throw ProductError when description length > 255', () => {

        return test.promise
            .given(testProduct)
            .when(product => {
                let desc = "myDesc";
                product.description = desc.repeat(100);
                return productService.validateProduct(product);
            })
            .then((res) => {
                //fail if no error
                test.fail('need throw error');
            })
            .catch(err => {
                should(err).be.an.instanceof(ProductError);
                should(err.field).be.equal('description');
            })
    });

    it('Should throw ProductError when invalid price', () => {

        return test.promise
            .given(testProduct)
            .when(product => {
                product.price = -1;
                return productService.validateProduct(product);
            })
            .then((res) => {
                //fail if no error
                test.fail('need throw error');
            })
            .catch(err => {
                should(err).be.an.instanceof(ProductError);
                should(err.field).be.equal('price');
            })
    });

    it('Should throw ProductError when discount exist and is not number', () => {

        return test.promise
            .given(testProduct)
            .when(product => {
                product.discount = "10";
                return productService.validateProduct(product);
            })
            .then((res) => {
                //fail if no error
                test.fail('need throw error');
            })
            .catch(err => {
                should(err).be.an.instanceof(ProductError);
                should(err.field).be.equal('discount');
            })
    });

    it('Should throw ProductError when stock exist and is not number', () => {

        return test.promise
            .given(testProduct)
            .when(product => {
                product.stock = "10";
                return productService.validateProduct(product);
            })
            .then((res) => {
                //fail if no error
                test.fail('need throw error');
            })
            .catch(err => {
                should(err).be.an.instanceof(ProductError);
                should(err.field).be.equal('stock');
            })
    });

    it('Should throw ProductError when image exist and is not a string', () => {
        return test.promise
            .given(testProduct)
            .when(product => {
                product.image = 123456;
                return productService.validateProduct(product);
            })
            .then((res) => {
                //fail if no error
                test.fail('need throw error');
            })
            .catch(err => {
                should(err).be.an.instanceof(ProductError);
                should(err.field).be.equal('image');
            })
    });
});

let ProductRepository = require('../../data/repository/ProductRepository');
describe('ProductService create product', () => {

    let productService;
    beforeEach(() => {
        productService = new ProductService();
        //mock repository > return created user
        sinon.stub(ProductRepository.prototype, 'insert').resolves(testProduct);
        productService.ProductRepository = new ProductRepository();
    });

   it('Should return created object', () => {

       return test.promise
           .given(testProduct)
           .when(product => {
               return productService.createProduct(product);
           })
           .then(result => {
               result.should.be.equal(testProduct);
           })
           .catch(err => {
               test.fail(err.message);
           });

   });
});