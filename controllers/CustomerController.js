'use strict';
const models = require('../models');
const CustomerService = require('../services/CustomerService');
const BankbookService = require("../services/CustomerService");

module.exports = class Customer{
    static async Exist(req,res){
        try {
            let customercmnd = await CustomerService.Exist(req);
            if(!customercmnd){
                res.locals.customercmnd = customercmnd;
            }
            res.sendStatus(200);
        } catch (error){
            res.status(500).json( { error: error});
            throw new Error(`Khong tim thay khach hang. ${error}`);
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