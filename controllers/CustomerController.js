'use strict';
const models = require('../models');
const BankbookService = require("../services/CustomerService");

module.exports = class Customer{
    static async Exist(req, res){
        try {
            let customercmnd = await BankbookService.Exist(req);
            if(!customercmnd){
                res.locals.customercmnd = customercmnd;
                res.render('Alert-NewCustomer');
            }
            res.sendStatus(200);
        } catch (error){
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