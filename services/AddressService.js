let UserService = require('./UserService');
let AddressRepository = require('../data/repository/AddressRepository');
let AddressError = require('../data/validation/AddressError');

class AddressService {

    constructor(){
        this.userService = new UserService();
        this.addressRepository = new AddressRepository();
    }

    async addAddressForUser(username, address){

        let user = await this.userService.find(username);

        if(!user){
            throw new Error('Invalid username');
        }

        const newAddress = await this.postAddress(address);

        user.addresses.push(newAddress);
        return user.save();
    }

    postAddress(address){
        try{
            this.validateAddress(address);

            return this.addressRepository.insert(address);

        } catch (exception) {
            throw exception;
        }
    }

    validateAddress(address){
        const name = address.name;
        if(!name){
            throw new AddressError('name', 'Field name is needed.');
        }

        const type = address.type;
        if(!type || ['billing', 'shipping', 'both'].indexOf(type) < 0){
            throw new AddressError('type', 'Field type is not valid.')
        }

        let firstLine = address.firstLine;
        if(firstLine && firstLine.length > 100){
            throw new AddressError('firstLine', 'Max length for lines fields is 100 characters');
        }

        let secondLine = address.secondLine;
        if(secondLine && secondLine.length > 100){
            throw new AddressError('secondLine', 'Max length for lines fields is 100 characters');
        }
    }
}

module.exports = AddressService;