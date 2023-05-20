'use strict';
const models = require("../models");
const ConfigService = require("./ConfigService");

module.exports = class TransactService {
    static async createTransactAdd(req, res){
        try{
            let bookid = req.session.bookid;
            console.log(bookid);

            let amount = req.session.amount;

            let NewTransact = await models.Transact.create({
                bankbookId: req.session.bookid,
                amount: req.session.amount,
                trans_type: 0,
                description: "book: "+ req.session.bookid + "-add amount: " + req.session.amount + " at " + new Date()
            });
            return NewTransact;

        } catch (error){
            console.log(`could not create ${error}`);
        }
    }

    static async createTransactClose(req, res){
        try{

            let NewTransact = await models.Transact.create({
                bankbookId: req.session.bookid,
                amount: req.session.amount,
                trans_type: 1,
                description: "book: "+ req.session.bookid + "-withdraw amount: " + req.session.amount + " at " + new Date()
            });
            return NewTransact;

        } catch (error){
            console.log(`could not create ${error}`);
        }
    }
}