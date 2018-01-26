const User = require('../entity/User');

class UserRespository {

    constructor(){
        this.User = User;
    }

    get(){
        return User.find({});
    }

    getByUsername(userName){
        return User.findOne({
            'username': userName
        }).then(user => {
            return user;
        })
    }

    getByEmail(email){
        return User.findOne({
            'email': email
        });
    }

    insert(user){

        let newUser = new User(user);

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