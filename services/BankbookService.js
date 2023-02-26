'use strict';
const models = require("../models");

module.exports = class BankbookService{
    static async getAllBooks(){
        try {
            let bankbooks = await models.Bankbook.findAll();
            return bankbooks;
        } catch (error){
            console.log(`could not fetch ${error}`);
        }
    }
}
