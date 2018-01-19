let bcrypt = require('bcrypt');

class PasswordProvider {

    constructor(){
        this.bcrypt = bcrypt;
    }

    hashPassword(password, salt = 10) {
        return this.bcrypt.hash(password, salt);
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

    comparePassword(password, hashPassword){
        return bcrypt.compare(password, hashPassword);
    }
}

module.exports = PasswordProvider;