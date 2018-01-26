let test = require("unit.js");
let should = test.should;
let mongoose = require('mongoose');

const User = require('../../data/entity/User');

describe('User entity with test database', function() {
    const userTest = {
        name: "test",
        username: "username",
        email: "email@mail.fr",
        password: "123456"
    };

    //create test DB
    before(function (done) {
        mongoose.connect('mongodb://localhost:27017/testDatabase');
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
            console.log('We are connected to test database!');
            done();
        });
    });

    describe('User entity should', function() {
        //Save object with 'name' value of 'Mike"
        it('save new User', function(done) {
            let testName = new User(userTest);

            testName.save(done);
        });
        it('Dont save incorrect user', function(done) {
            //Attempt to save with wrong info. An error should trigger
            let wrongUser = new User({
                notName: 'fzee'
            });
            wrongUser.save(err => {
                if(err) { return done(); }
                throw new Error('Should generate error!');
            });
        });
        it('find created user', function(done) {
            //Look up the 'Mike' object previously saved.
            User.find({name: 'test'}, (err, name) => {
                if(err) {throw err;}
                if(name.length === 0) {throw new Error('No data!');}
                done();
            });
        });
    });

    after(function(done){
        mongoose.connection.db.dropDatabase(function(){
            mongoose.connection.close(done);
        });
    });
});