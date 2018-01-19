let express = require('express');
let router = express.Router();

let userService = require('../services/UserService');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/new', function(req, res){
    new userService()
        .createUser(req.body.user)
        .then(
            function(user){
                res.status(200).json({status: 200, user: user});
            },
            function(err) {
                res.status(500).json({status: 500, message: err.message});
            }
        );
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

module.exports = router;
