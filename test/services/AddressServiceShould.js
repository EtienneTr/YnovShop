let test = require("unit.js");
let should = test.should;
let sinon = require("sinon");

let AddressService = require('../../services/AddressService');
let AddressError = require('../../data/validation/AddressError');
let AddressRepository = require('../../data/repository/AddressRepository');

let testAddress = {
    name: "My billing address",
    type: "billing",
    firstLine: "1 rue de Marseille",
    postalCode: "69003",
    city: "Lyon",
    country: "France"
};

describe('AddresseService validator : no error', () => {

    let addressService;
    beforeEach(() => {
        addressService = new AddressService();
    });

    it('Should return no error for valid data', ()=>{
        return test.promise
            .given(testAddress)
            .when((address) => {
                return addressService.validateAddress(address);
            })
            .then(res => {
                //ok, return nothing
                should(res).be.equal(undefined);
            })
            .catch(e => {
                test.fail("Unexpected error : " + e.message);
            });
    });
});

describe('AddressService validator throw error', () => {

    let addressService;
    beforeEach(() => {
        addressService = new AddressService();
    });

    it('Should throw AddressError if no name defined', ()=>{

        return test.promise
            .given(testAddress)
            .when((address) => {
                address.name = null;
                return addressService.validateAddress(address)
            })
            .then(res => {
                test.fail('Should throw an AddressError on field name');
            })
            .catch(e => {
                should(e).be.an.instanceof(AddressError);
                should(e.field).be.equal('name');
            });
    });

    it('Should throw AddressError if invalid type', () => {
        return test.promise
            .given(testAddress)
            .when((address) => {
                address.type = "bill";
                return addressService.validateAddress(address)
            })
            .then(res => {
                test.fail('Should throw an AddressError on field type');
            })
            .catch(e => {
                should(e).be.an.instanceof(AddressError);
                should(e.field).be.equal('type');
            });
    });

    it('Should throw AddressError if firstLine length > 100', () => {
        return test.promise
            .given(testAddress)
            .when((address) => {
                address.firstLine = "rue".repeat(50);
                return addressService.validateAddress(address)
            })
            .then(res => {
                test.fail('Should throw an AddressError on field firstLine');
            })
            .catch(e => {
                should(e).be.an.instanceof(AddressError);
                should(e.field).be.equal('firstLine');
            });
    });

    it('Should throw AddressError if secondLine length > 100', () => {
        return test.promise
            .given(testAddress)
            .when((address) => {
                address.secondLine = "rue".repeat(50);
                return addressService.validateAddress(address)
            })
            .then(res => {
                test.fail('Should throw an AddressError on field secondLine');
            })
            .catch(e => {
                should(e).be.an.instanceof(AddressError);
                should(e.field).be.equal('secondLine');
            });
    });
});

describe('AddressService post valid address', () => {

    let addressService;
    beforeEach(() => {
        addressService = new AddressService();
        //mock repository > return created address
        sinon.stub(AddressRepository.prototype, 'insert').resolves(testAddress);
        addressService.AddressRepository = new AddressRepository();
    });

    it('Should return created address', () => {

        return test.promise
            .given(testAddress)
            .when(address => {
                return addressService.postAddress(address);
            })
            .then(result => {
                result.should.be.equal(testAddress);
            })
            .catch(err => {
                test.fail(err.message);
            });

    });
});