let test = require("unit.js");
let should = test.should;
let sinon = require('sinon');

let LoginProvider = require('../../provider/LoginProvider');
let UserService = require('../../services/UserService');

describe('Login Provider Should', () => {

    const myUser = {
        name: "test",
        username: "username",
        email: "email@mail.fr",
        password: "$2a$10$mAohWxIH3axfnjWsCnUoGupZvzvYdJFH7w3FH4fiDS.cOrp1..JDy"
    };

    let loginProvider;
    beforeEach(() => {
        loginProvider = new LoginProvider();
        //create mock and replace in provider
        sinon.stub(UserService.prototype, 'find').resolves(myUser);
        loginProvider.userService = new UserService();
    });

    it('authenticate user', ()=> {

        loginProvider.authenticate("username", "123456")
            .then(result => {
                result.should.have.property('name', 'test');
            })
            .catch(err => {
                test.fail(err.message);
            });
    });
});