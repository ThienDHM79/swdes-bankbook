'use strict';
const res = require('express/lib/response');
const models = require('../models');
const BankbookService = require("../services/BankbookService");
const ConfigService = require('../services/ConfigService');
const CustomerService = require('../services/CustomerService');

module.exports = class Bankbook{
    static async show (req, res, next){
        return await res.render('request-create');
        next();
    }
    static async getAllBooks(req, res){
        try {
            let bankbooks = await BankbookService.getAllBooks();
            if(!bankbooks){
                res.status(404).json("no books");
            }
            await Promise.all(bankbooks.map( async (book) => {
                let customer = await CustomerService.GetCustomerbyId(book.customerId);
                book.customerName = customer.name;
            }));
            // bankbooks.forEach( async (book) =>{
            //     let customer = await CustomerService.GetCustomerbyId(book.customerId);
            //     book.customerName = customer.name;
            // })
            res.locals.bankbooks = bankbooks;
            res.render('report-book');
        } catch (error){
            res.status(500).json( { error: error});
        }
        
    }
    static async GetCustomer(req,res){
        try{
            let customer = await CustomerService.GetCustomerbyCMND(req.body.customercmnd);
            if (!customer){
                res.status(404).json('no customer');
            }
            console.log(customer);

            req.session.customerId = customer.id;
        }
        catch(error){
            res.status(500).json( { error : error});
        }
    }
    static async generateBookNo(){
        try{
            let BookNo = await BankbookService.generateBookNo();
            if (!BookNo){
                res.status(404).json('no customer');
            }
            console.log(BookNo);

            res.locals.bookNo = BookNo;
        }
        catch(error){
            res.status(500).json( { error : error});
        }
    }
    static async showConfirm(req,res){
        let customer = await CustomerService.GetCustomerbyCMND(req.body.customercmnd);
        if (customer){
            res.locals.customer = customer;
            req.session.customer = customer;
            res.locals.amount  = req.body.amount;
            //wait to refactor
            let BookNo = await BankbookService.generateBookNo();
            res.locals.bookNo = BookNo;

            //get savetype
            let SaveType =  await ConfigService.getAllSaveType();
            res.locals.saveType = SaveType;

            res.render('bankbook-confirm');
        } else {
            res.redirect('/request-create');
        }
    }

    static async createBankbook( req, res){
        try{
            let BookCreate = await BankbookService.createBankbook(req, res);
            if (!BookCreate){
                res.status(404).json('no bankbook created');
            }
            let message = `new bankbook created ${BookCreate.name} at ${BookCreate.openDate}`;
            res.render('error', {message});
        }
        catch(error){
            res.status(500).json( { error : error});
        }
    }

    //ongoing
    static async checkMinInput(req, res){
        try{
            let config = await ConfigService.checkMinInput (req.query.amount);
            let result = 'OK';
            //SETUP on-going, turn on khi update xong configservice chi return ko check
            if (config){
                if (parseInt(req.query.amount) < parseInt(config.minInput)){
                    result = `so nhap toi thieu nho hon quy dinh la ${config.minInput}`;
                }
            }
            return res.json ( { message: result});            
        }
        catch(error){
            res.status(500).json( { error : error});
            throw new Error(`${error}`);
        }
    }
    static async getBookbyId(req, res){
        try{
            let Bankbook = await BankbookService.getBookbyId(req, res);
            return res.json ( {
                Bankbook
            });

        } catch(error){
            res.status(500).json( {error : error});
        }
    }

    static async getBookbyCustomerid(req, res){
        try{
            let Bankbooks = await BankbookService.getBookbyCustomerid(req, res);
            return res.json ( {
                Bankbooks
            });

        } catch(error){
            res.status(500).json( { error: error});
        }
    }

    static async getBookDuebyCustomerid(req,res){
        try{
            let Bankbooks = await BankbookService.getBookbyCustomerid(req, res);
            let Savetypes = await ConfigService.getAllSaveType();
            let curDate = new Date();
            let BankbooksOn = Bankbooks.filter( (book) => {return book.status == true;});
            const  ONEDAY = 1000 * 3600 * 24;
            let filterBankbooks = BankbooksOn.filter( (book) => {
                //tim time period cua bankbook
                book.period = Savetypes.find( (type) => type.id == book.savetypeId ).timeperiod;
                book.rate = Savetypes.find( (type) => type.id == book.savetypeId ).rate;
                let DateDiffer = (curDate.getTime() - book.openDate.getTime() ) / ONEDAY;
                if ( book.status == true && (DateDiffer/ book.period) >= 1) {
                    let InterestPeriod = Math.floor(DateDiffer/book.period);
                    book.amount = book.amount + book.amount*InterestPeriod * book.rate;
                    return book;
                }
            } );
            return res.json ( {
                Bankbooks:filterBankbooks
            });

        } catch(error){
            res.status(500).json( { error: error});
        }
    }


    
}
// const controller = {};
// const models = require('../models')


// controller.getAllBooks = async(req, res) => {
//     const Bankbook = models.Bankbook;
//     const bankbooks = await Bankbook.findAll();
//     res.render('reportbook', { bankbooks});
// };