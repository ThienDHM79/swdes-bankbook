'use strict';
const res = require('express/lib/response');
const models = require('../models');
const BankbookService = require("../services/BankbookService");
const ReportService = require('../services/ReportService');
const DaySum = require('./daySum');

module.exports = class Report {
    static async monthExtract(req, res){
        try{
            const yearMonth = await req.body.month;
            const inputArr = yearMonth.split("-");
            const month = inputArr[1];
            const monthnum = parseInt(month);
            return month;
        } catch(error){
            res.status(500).json( {error: error});
        }
    }
    static async getDaySum(req, res){
        try {
            let month = await Report.monthExtract(req, res);
            let bankbookMonth = await BankbookService.getBookOpenbyMonth(month);
            let bankbookOnList = await BankbookService.getBookbyStatus(bankbookMonth,true);
            let OpenSum = ReportService.getSum(bankbookOnList);
            
            let bankbookOffList = await BankbookService.getBookbyStatus(bankbookMonth,false);
            let ClosedSum = ReportService.getSum(bankbookOffList);

            let Delta = OpenSum - ClosedSum;
            let DayLine = {"month": month, "OpenSum": OpenSum, "ClosedSum": ClosedSum, "Delta": Delta};
            res.locals.DayLine = DayLine;
            res.render('report-monthly');
        } catch (error){
            res.status(500).json( {error: error});
        }
    }

    static async show(req, res){
        try {
            res.render('report-monthly');
        } catch (error) {
            res.status(500).json( {error: error});
        }
    }
}