let UserService = require('../services/UserService');
let test = require("unit.js");
let should = test.should;


describe("UserService methods should", () => {

    let userService;
    const userTest = {
        name: "test",
        surname: "surname",
        email: "email@mail.fr",
        password: "123456"
    };

    beforeEach(()=> {
       userService = new UserService();
    });

    it("createUser() should return same user", ()=>{

        test.promise
            .given(userTest)
            .when((body) => {
                const newUser = userService.createUser(body);
                return newUser;
            })
            .then((newUser) => {
                newUser.should.have.property('name', 'test');
            });

    });
});