'use strict';
const res = require('express/lib/response');
const models = require('../models');
const BankbookService = require("../services/BankbookService");

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
    static async show(req, res){
        res.render('bankbook-confirm');
    }
}
// const controller = {};
// const models = require('../models')


// controller.getAllBooks = async(req, res) => {
//     const Bankbook = models.Bankbook;
//     const bankbooks = await Bankbook.findAll();
//     res.render('reportbook', { bankbooks});
// };