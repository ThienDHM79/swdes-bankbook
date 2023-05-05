'use strict';
const models = require("../models");

const sequelize = require('sequelize');
const { Sequelize } = require("../models");
const Op = sequelize.Op;

module.exports = class BankbookService{
    static async getAllBooks(){
        try {
            let bankbooks = await models.Bankbook.findAll();
            return bankbooks;
        } catch (error){
            console.log(`could not fetch ${error}`);
        }
    }
    static async getBookbyStatus(bookList,input_status){
        try {
            let bankbooks = [];
            bankbooks = bookList.filter(book => book.status === input_status);
            return bankbooks;
        } catch (error){
            console.log(`could not fetch ${error}`);
        }
    }
    static async generateBookNo(){
        try{
            let bookNo = await models.Bankbook.max('id') + 1;
            console.log(bookNo);
            return bookNo;
        } catch (error){
            console.log(`could not fetch ${error}`);
        }
    }
    static async getBookOpenbyMonth(inputMonth){
        try{
            const timezoneOffset = '+07:00';
            let bookList = await models.Bankbook.findAll({
                where: Sequelize.literal(`EXTRACT(MONTH FROM "openDate" AT TIME ZONE '${timezoneOffset}') = ${inputMonth}`)
            });
            return bookList;
        } catch (error){
            console.log(`could not fetch ${error}`);
        }
    }
}
