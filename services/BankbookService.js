'use strict';
const models = require("../models");
const ConfigService = require("./ConfigService");

const sequelize = require('sequelize');
const { Sequelize } = require("../models");
const Op = sequelize.Op;

module.exports = class BankbookService{
    static async getAllBooks(){
        try {
            let bankbooks = await models.Bankbook.findAll();
            return bankbooks;
        } catch (error){
            console.log(`could not fetch ${error}`);
        }
    }
    static async getBookbyStatus(bookList,input_status){
        try {
            let bankbooks = [];
            bankbooks = bookList.filter(book => book.status === input_status);
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
    static async getBookOpenbyMonth(inputMonth){
        try{
            const timezoneOffset = '+07:00';
            //test xoa timezone -> correct do datatype timestamp co timezone
            //`EXTRACT(MONTH FROM "openDate" AT TIME ZONE '${timezoneOffset}') = ${inputMonth}`
            let bookList = await models.Bankbook.findAll({
                where: Sequelize.literal(`EXTRACT(MONTH FROM "openDate") = ${inputMonth}`)
            });
            return bookList;
        } catch (error){
            console.log(`could not fetch ${error}`);
        }
    }

    static async getBookbyCustomerid(req, res){
        try {
            let customerid = isNaN(req.body.customerid) ? 0: parseInt(req.body.customerid);
            let options = {
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
            let Bankbook = {};
            if (!req.query.id){
                Bankbook = await models.Bankbook.findByPk(req);
            } else{
                Bankbook = await models.Bankbook.findByPk(req.query.id);
            }
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
                    amount: updateAmount,
                    updatedAt: new Date()
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

    static async updateBookClose(req,res){
        try{
            let Bankbook = await models.Bankbook.findByPk(req.session.bookid);
            await models.Bankbook.update(
                {
                    status: false,
                    udpatedAt: new Date()
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

    static async calculateInterest(book){
        let Savetypes = await ConfigService.getAllSaveType();
        let curDate = new Date();
        const ONEDAY = 1000 * 3600 * 24;

        book.period = Savetypes.find( (type) => type.id == book.savetypeId ).timeperiod;
        book.rate = Savetypes.find( (type) => type.id == book.savetypeId ).rate;

        let DateDiffer = (curDate.getTime() - book.openDate.getTime() ) / ONEDAY;

        if ( book.status == true && (DateDiffer/ book.period) >= 1) {
            let InterestPeriod = Math.floor(DateDiffer/book.period);
            book.amount = book.amount + Math.floor(book.amount*InterestPeriod * book.rate);
            console.log(`${book.id} have rate ${book.rate}, standard ${book.period} days, open ${DateDiffer} days with ${DateDiffer/book.period} period `);
            return book;
        }
    }
    
    static async updateInterest(req, res){
        try {
            let Bankbook = await models.Bankbook.findByPk(req.session.bookid);
            let ValidBook  = await this.calculateInterest(Bankbook);
            if (ValidBook){
                await models.Bankbook.update(
                    {
                        amount: ValidBook.amount,
                        updatedAt: new Date()
                    },
                    {
                        where: {
                            id: ValidBook.id
                        }
                    }
                ). then ((result) => {console.log (result)} );
            }
            let UpdatedBook = models.Bankbook.findByPk(req.session.bookid);
            return UpdatedBook;

        } catch (error){
            console.log( `cannot update ${error}`);
        }
    }


}
