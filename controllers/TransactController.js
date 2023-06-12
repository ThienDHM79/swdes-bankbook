'use strict';
const res = require('express/lib/response');
const models = require('../models');
const BankbookService = require("../services/BankbookService");
const TransactService = require("../services/TransactService");
module.exports = class Transact{
    static async show (req, res, next){
        const pages = ['withdraw', 'update'];
        if (pages.includes( req.params.page)){
            return await res.render(req.params.page);
        }
        next();
    }
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
    static async createTransactClose(req, res){
        try{
            //ON GOING
            /* ? cac step
                b1: cap nhat bankbook amount trong csdl
                    b1.1: khi nao cap nhat? ans: khi co giao dich rut.
                    dat 2 bankbook service: 1) show amount du kien, 2) update amount khi co giao dich ,co dung (1)
                b2: tao transact dung amount moi nhat
                b3: dong bankbook
            */

            let Update = await BankbookService.updateInterest(req, res);
            req.session.amount = Update.amount;
            let Transact = await TransactService.createTransactClose(req,res);
            if (Transact){
                let Closed = await BankbookService.updateBookClose(req, res);
                let message = `${Transact.description} + " current amount: " + ${Update.amount}`;
                res.render('error', {message});
            }
        }
        catch( error){
            res.status(500).json( {error : error});
        }
    }
}