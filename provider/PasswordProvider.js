let bcrypt = require('bcrypt');

class PasswordProvider {

    constructor(){
        this.bcrypt = bcrypt;
    }

    hashPassword(password) {
        return this.bcrypt.hash(password, 10);
    }

    async createPassword(password){
        try {
            const newPassword = await this.hashPassword(password);

            return newPassword;
        }
        catch(exception) {
            throw exception;
        }
    }
}

module.exports = PasswordProvider;