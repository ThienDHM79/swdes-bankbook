'use strict';
const models = require("../models");
const BankbookService = require("./BankbookService");

module.exports = class ReportService{
    static getSum(bookList){
        var Sum = 0;
        bookList.forEach(book => {
            Sum += parseInt(book.amount);
        })
        return Sum;
    }

}