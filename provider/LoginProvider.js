let PasswordProvider = require('./PasswordProvider');
let UserService = require('../services/UserService')

class LoginProvider {
    constructor(){
        this.passwordProvider = new PasswordProvider();
        this.userService = new UserService();
    }

    async authenticate(username, password) {

        let user = await this.userService.find(username);
        if(!user){
            throw new Error("invalid user");
        } else {
            let res = await this.passwordProvider.comparePassword(password, user.password);
            if(res){
                return user;
            } else {
                return Promise.reject("Wrong password");
            }
        }
    }
}

module.exports = LoginProvider;