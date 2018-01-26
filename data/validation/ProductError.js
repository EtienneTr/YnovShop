module.exports = class ProductError extends Error {

    constructor(field, message){
        super(message);
        this.targetField = field;
    }

    get field (){
        return this.targetField;
    }

}