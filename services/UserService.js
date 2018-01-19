let UserRepository = require('../data/repository/UserRespository');
let passwordManager = require('../provider/PasswordProvider');

class UserService {

    constructor() {
        //can't use interface provider, use repository instead
        this.userRepository = new UserRepository();
        this.passProvider = new passwordManager()
    }

    async postUSer(body){
        let user = await this.createUser(body);

        return this.saveUser(user);
    }

    async createUser(body) {
        const hashPass = await this.passProvider.createPassword(body.password);

        const newUser = {
            name: body.name || "",
            surname: body.surname || "",
            email: body.email || "",
            passwordHash: hashPass,
            registerDate: new Date(),
            enable: 0
        };

        return newUser;
    }

    saveUser(newUser){
        return this.userRepository.insert(newUser);
    }

    findAll() {
        return this.userRepository.get();
    }

    deleteByMail(email) {
        const user = this.userRepository.getByEmail(email);
        this.userRepository.remove(user);
    }
}

module.exports = UserService;