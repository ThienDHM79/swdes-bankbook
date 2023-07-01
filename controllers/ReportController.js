'use strict';
const res = require('express/lib/response');
const models = require('../models');
const BankbookService = require("../services/BankbookService");
const ReportService = require('../services/ReportService');
const ConfigService = require('../services/ConfigService');

module.exports = class Report {
    static async monthExtract(req, res){
        try{
            const yearMonth = await req.body.month;
            const inputArr = yearMonth.split("-");
            const month = inputArr[1];
            const monthnum = parseInt(month);
            return monthnum;
        } catch(error){
            res.status(500).json( {error: error});
        }
    }
    static async getDaySum(req, res){
        try {
            //use form post
            let month = await Report.monthExtract(req, res);
            let booktype = await req.body.booktype;
            //get savetype
            let SaveType =  await ConfigService.getAllSaveType();
            res.locals.saveType = SaveType;

            let bankbookMonth = await BankbookService.getBookOpenbyMonth(month);
            let bankbookOnList = await BankbookService.getBookbyStatus(bankbookMonth,true);
            
            let bankbookOffList = await BankbookService.getBookbyStatus(bankbookMonth,false);
            
            //check for savetype all
            if (!SaveType.includes(booktype)){
                var OnList = bankbookOnList;
                var OffList = bankbookOffList;
            } else{
                var OnList = bankbookOnList.filter( book => book.savetype == booktype);
                var OffList = bankbookOffList.filter( book => book.savetype == booktype);
            }

            //make date list
            let DateList = OnList.map( book => book.openDate.getDate());
            OffList.map( book => DateList.push(book.updatedAt.getDate() ));
            DateList = [...new Set(DateList)];
            console.log(DateList);

            let OpenSum = ReportService.getSum(OnList); 
            let ClosedSum = ReportService.getSum(OffList);

            

            let DayLine = DateList.map( createDayLine);
            function createDayLine(item,index){
                OpenSum = ReportService.getSum( OnList.filter(book => book.openDate.getDate() == item)); 
                ClosedSum = ReportService.getSum(OffList.filter(book => book.updatedAt.getDate() == item));
                let Delta = OpenSum - ClosedSum;

                return {
                    "no": `${parseInt(index)+ 1}`,
                    "date": `${item}/${month}`,
                    "OpenSum": OpenSum,
                    "ClosedSum":ClosedSum  ,
                    "Delta": Delta
                }
            }

            let Total = ReportService.getSum(OnList) - ReportService.getSum(OffList);
            res.locals.total = Total;

            
            res.render('report-monthly', {DayLine: DayLine});
        } catch (error){
            res.status(500).json( {error: error});
        }
    }

    static async show(req, res){
        try {

            //get savetype
            let SaveType =  await ConfigService.getAllSaveType();
            res.locals.saveType = SaveType;

            res.render('report-monthly');
            
        } catch (error) {
            res.status(500).json( {error: error});
        }
    }

    static removeParam(key, sourceURL) {
        var rtn = sourceURL.split("?")[0],
            param,
            params_arr = [],
            queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
        if (queryString !== "") {
            params_arr = queryString.split("&");
            for (var i = params_arr.length - 1; i >= 0; i -= 1) {
                param = params_arr[i].split("=")[0];
                if (param === key) {
                    params_arr.splice(i, 1);
                }
            }
            if (params_arr.length) rtn = rtn + "?" + params_arr.join("&");
        }
        return rtn;
    }
}