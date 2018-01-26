let PasswordProvider = require('../../provider/PasswordProvider');
let test = require("unit.js");
let should = test.should;

let bcrypt = require('bcrypt');

describe("PasswordProvider methods should", () => {

    let passProvider;

    beforeEach(()=> {
        passProvider = new PasswordProvider();
    });

    it("hashPassword() should use bcrypt", ()=>{

        let passTest = "123456";
        let passTestSalt = "$2a$10$mAohWxIH3axfnjWsCnUoGu";
        let passTestHash = null;

        test.promise
            .given(()=>{
                return new Promise((resolve, reject) => {

                    bcrypt.hash(passTest, passTestSalt, (err, hash) => {
                        passTestHash = hash;
                        resolve(passTest);
                    });

                });
            })
            .when((password) => {
                const hashPassword = passProvider.hashPassword(password, passTestSalt);
                return hashPassword;
            })
            .then((hashPassword) => {
                should(hashPassword).be.equal(passTestHash);
            });

    });
});