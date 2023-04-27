'use strict';
const res = require('express/lib/response');
const models = require('../models');
const BankbookService = require("../services/BankbookService");
const CustomerService = require('../services/CustomerService');

module.exports = class Bankbook{
    static async getAllBooks(req, res){
        try {
            let bankbooks = await BankbookService.getAllBooks();
            if(!bankbooks){
                res.status(404).json("no books");
            }
            res.locals.bankbooks = bankbooks;
            res.render('reportbook');
        } catch (error){
            res.status(500).json( { error: error});
        }
        
    }

    static async showConfirm(req,res){
        try{
            let customer = await CustomerService.Exist(cmnd);
            if (!customer){
                res.status(404).json('no customer');
            }
            console.log(customer);
            //res.render('bankbook-confirm');
        }
        catch(error){
            res.status(500).json( { error : error});
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