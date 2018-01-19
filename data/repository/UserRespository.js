const User = require('../entity/User');

class UserRespository {

    constructor(){
        this.User = User;
    }

    get(){
        return User.find({});
    }

    getByName(userName){
        return User.findOne({
            'name': userName
        });
    }

    getByEmail(email){
        return User.findOne({
            'email': email
        });
    }

    insert(user){

        let newUser = new User({
            name: user.name,
            surname: user.surname,
            email: user.email,
            passwordHash: user.passwordHash,
            registerDate: user.registerDate,
            enable: user.enable
        });

        return newUser.save();
    }

    remove(user){
        return user.delete();
    }

    update(user){
        return User.save(user);
    }
}

module.exports = UserRespository;