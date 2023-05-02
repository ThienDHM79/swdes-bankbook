'use strict';
const models = require("../models");

module.exports = class CustomerService{
    static async GetCustomerbyCMND(input_cmnd){
        try {
            let customercmnd = await models.Customer.findOne({
                where: {
                    cmnd: input_cmnd
                }
            });
            if(!customercmnd){
                throw new Error(`khong tim thay khach`);
            }
            return customercmnd;
        } catch (error){
            throw new Error(`Khong tim thay khach hang. ${error}`);
        }
    }
    static async GetCustomerbyId(input_id){
        try {
            let customer = await models.Customer.findOne({
                where: {
                    id: input_id
                }
            });
            if(!customer){
                throw new Error(`khong tim thay khach`);
            }
            return customer;
        } catch (error){
            throw new Error(`Khong tim thay khach hang. ${error}`);
        }
    }
    
}

