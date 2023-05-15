'use strict';
const models = require('../models');
const CustomerService = require('../services/CustomerService');
const BankbookService = require("../services/CustomerService");

module.exports = class Customer{
    static async GetCustomerNamebyCMND(req,res){
        try {
            let customer = await CustomerService.GetCustomerbyCMND(req.query.cmnd);
            let result = '0';
            if(customer){
               result = customer.name;
            }
            
            return res.json({ name: result});
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