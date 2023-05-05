'use strict';
const res = require('express/lib/response');
const models = require('../models');
const BankbookService = require("../services/BankbookService");
const { GetCustomerbyId } = require('../services/CustomerService');
const CustomerService = require('../services/CustomerService');

module.exports = class Bankbook{
    static async getAllBooks(req, res){
        try {
            let bankbooks = await BankbookService.getAllBooks();
            if(!bankbooks){
                res.status(404).json("no books");
            }
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
            res.locals.amount  = req.body.amount;
            //wait to refactor
            let BookNo = await BankbookService.generateBookNo();
            res.locals.bookNo = BookNo;
            res.render('bankbook-confirm');
        } else {
            res.redirect('/request-create');
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