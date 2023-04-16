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
            console.log(customercmnd.toJSON());
            return customercmnd;
        } catch (error){
            console.log(`could not fetch ${error}`);
        }
    }
}
