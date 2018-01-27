let express = require('express');
let router = express.Router();

let productService = require('../services/ProductService');

router.get('/', (req, res)=>{
    new productService()
        .getAll()
        .then(products => {
            res.status(200).json({status: 200, products: products});
        })
        .catch(err => {
            res.status(500).json({status: 500, message: err.message});
        });
});

router.get('/detail/:productId', (req, res)=>{
    const id = req.params.productId;
    new productService()
        .getOne(id)
        .then(product => {
            res.status(200).json({status: 200, product: product});
        })
        .catch(err => {
            res.status(500).json({status: 500, message: err.message});
        });
});

router.post('/new', function(req, res){
    new productService()
        .createProduct(req.body.product)
        .then(product => {
            res.status(200).json({status: 200, product: product});
        })
        .catch(err => {
            res.status(500).json({status: 500, message: err.message});
        });
});

module.exports = router;
