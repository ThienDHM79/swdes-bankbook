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

    static async createBankbook(req,res){
        try{
            let customerId = req.session.customer.id;
            console.log(customerId);
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

    static async getBookbyCustomerid(req, res){
        try {
            let customerid = isNaN(req.body.customerid) ? 0: parseInt(req.body.customerid);
            let options = {
                attributes: ['id', 'openDate', 'amount', 'savetype'],
                where: {
                    customerId : customerid
                }
            };
            let Bankbooks = await models.Bankbook.findAll(options);

            return Bankbooks;
        } catch (error){
            console.log(`could not fetch ${error}`);
        }
    }

    static async getBookbyId(req, res){
        try {
            let Bankbook = await models.Bankbook.findByPk(req.query.id);
            return Bankbook;

        } catch (error){
            console.log(`could not fetch ${error}`);
        }
    }

    static async updateBookAdd(req,res){
        try{
            let Bankbook = await models.Bankbook.findByPk(req.session.bookid);
            let updateAmount = parseInt(Bankbook.amount) + parseInt(req.session.amount) ;
            await models.Bankbook.update(
                {
                    amount: updateAmount
                },
                {
                    where: {
                        id: req.session.bookid
                    }
                }
            ). then( (result) => {console.log(result)});
            
            Bankbook = await models.Bankbook.findByPk(req.session.bookid);
            return Bankbook;

        } catch (error){
            console.log(`cannot update ${error}`);
        }
    }
}
