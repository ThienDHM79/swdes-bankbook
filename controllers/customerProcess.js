'use strict';

class CustomerProcess {
    constructor(customer){
        this.id = customer.id || 1;
    }
    update(id){
        this.customer.id = id;
        return customer;
    }
}
module.exports = CustomerProcess;