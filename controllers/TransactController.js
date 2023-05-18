'use strict';
const res = require('express/lib/response');
const models = require('../models');
const BankbookService = require("../services/BankbookService");
const TransactService = require("../services/TransactService");
module.exports = class Transact{
    static async createTransactAdd(req, res){
        try{
            let Transact = await TransactService.createTransactAdd(req,res);
            if (Transact){

                let BookUpdate = await BankbookService.updateBookAdd(req,res);

                let message = `${Transact.description} + " current amount: " + ${BookUpdate.amount}`;
                res.render('error', {message});
            }
        }
        catch( error){
            res.status(500).json( {error : error});
        }
    }
}