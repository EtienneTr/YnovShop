let Address = require('../entity/Address');

class AddressRepository {

    constructor(){
        this.Address = Address;
    }

    insert(address){
        const newAddress = new this.Address(address);
        return newAddress.save();
    }

    update(address){
        return this.Address.save(address);
    }
}

module.exports = AddressRepository;