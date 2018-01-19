let UserRepository = require('../data/repository/UserRespository');
let passwordManager = require('../provider/PasswordProvider');

class UserService {

    constructor() {
        //can't use interface provider, use repository instead
        this.userRepository = new UserRepository();
        this.passManager = new passwordManager()
    }

    async createUser(body) {
        const hashPass = await this.passManager.createPassword(body.password);

        const newUser = {
            name: body.name || "",
            surname: body.surname || "",
            email: body.email || "",
            passwordHash: hashPass,
            registerDate: new Date(),
            enable: 0
        };

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