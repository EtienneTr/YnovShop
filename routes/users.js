let express = require('express');
let router = express.Router();

let userService = require('../services/UserService');
let LoginProvider = require('../provider/LoginProvider');
let addressService = require('../services/AddressService');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/register', function(req, res){
    new userService()
        .postUSer(req.body.user)
        .then(
            function(user){
                res.status(200).json({status: 200, user: user});
            },
            function(err) {
                res.status(500).json({status: 500, message: err.message});
            }
        );
});

router.post('/login', (req, res, next) => {
    let authProvider = new LoginProvider();
    const username = req.body.username;
    const password = req.body.password;
    return authProvider.authenticate(username, password)
        .then(user => {
            res.status(200).json({status: 200, message: "Fully authenticated", username: user.username});
        })
        .catch(err => {
            res.status(401).json({status: 401, message: "Username or password invalid : " + err});
        });
});

router.get('/all', (req, res)=>{
    new userService()
        .findAll()
        .then(
            function(users){
                res.status(200).json({status: 200, users: users});
            },
            function(err) {
                res.status(500).json({status: 500, message: err.message});
            }
        );
});

//Add address for a user
router.post('/address/add', (req, res) =>{
    let address = req.body.address;
    let username = req.body.username;
    new addressService()
        .addAddressForUser(username, address)
        .then(result => {
            res.status(200).json({status: 200, message: "Address added for user", username});
        })
        .catch(err => {
            res.status(401).json({status: 401, message: "Username or address invalid : " + err});
        });
});

module.exports = router;
