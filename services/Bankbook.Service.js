'use strict';
const Bankbook = require("../models/bankbook");

module.exports = class BankbookService{
    static async getAllBooks(){
        try {
            let bankbooks = await Bankbook.findAll();
            return bankbooks;
        } catch (error){
            console.log(`could not fetch ${error}`);
        }
    }
}
