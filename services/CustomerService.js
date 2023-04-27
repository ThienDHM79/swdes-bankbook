'use strict';
const models = require("../models");

module.exports = class CustomerService{
    static async Exist(input_cmnd){
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
}

