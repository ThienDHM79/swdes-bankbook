'use strict';
const models = require("../models");
const ConfigService = require("./ConfigService");

module.exports = class BankbookService{
    static async getAllBooks(){
        try {
            let bankbooks = await models.Bankbook.findAll();
            return bankbooks;
        } catch (error){
            console.log(`could not fetch ${error}`);
        }
    }
    static async generateBookNo(){
        try{
            let bookNo = await models.Bankbook.max('id') + 1;
            console.log(bookNo);
            return bookNo;
        } catch (error){
            console.log(`could not fetch ${error}`);
        }
    }

    static async createBankbook(req){
        try{
            let customerId = req.session.customerId;
            let bookName = "b" + req.body.savetype + "-" + req.body.cmnd;
            let saveType = await ConfigService.getSaveTypebyName(req.body.savetype);
            let Newbankbook = await models.Bankbook.create({
                customerId: customerId,
                savetypeId : saveType.id,
                savetype: req.body.savetype,
                name: bookName,
                amount: req.body.amount,
                status: true
            });
            return Newbankbook;
        } catch( error){
            console.log(`could not create ${error}`);
        }
    }
}
