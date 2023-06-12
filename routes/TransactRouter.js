'use strict';

const express = require("express");
const {body, validationResult } = require("express-validator");
const router = express.Router();
const BankbookCtrl = require("../controllers/BankbookController");
const TransactCtrl = require("../controllers/TransactController");
const CustomerCtrl = require("../controllers/CustomerController");

const CustomerService = require("../services/CustomerService");
const ConfigService = require("../services/ConfigService");

router.get('/:page', TransactCtrl.show);

router.post("/add",
body('cmnd').notEmpty().withMessage('CMND is required'),
body('amount').notEmpty().withMessage('amount is required'), 
body('cmnd').custom(value => CustomerService.GetCustomerbyCMND(value)),
body('amount').custom( value => ConfigService.checkMinInput(value)),
    (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()){
            let errorArray = errors.array();
            let message = '';
            for (let i = 0; i < errorArray.length; i++) {
                message += errorArray[i].msg + "<br/>"
            }
            return res.render('error', {message});
        }
        next();
    },
    (req,res, next) => {
        req.session.customercmnd = req.body.cmnd;
        req.session.amount = req.body.amount;
        req.session.bookid = req.body.bookid;
        next();
    },
    TransactCtrl.createTransactAdd
);

router.post("/close",
//body('cmnd').notEmpty().withMessage('CMND is required'),
// body('cmnd').custom(value => CustomerService.GetCustomerbyCMND(value)),
//     (req, res, next) => {
//         let errors = validationResult(req);
//         if (!errors.isEmpty()){
//             let errorArray = errors.array();
//             let message = '';
//             for (let i = 0; i < errorArray.length; i++) {
//                 message += errorArray[i].msg + "<br/>"
//             }
//             return res.render('error', {message});
//         }
//         next();
//     },
    (req,res, next) => {
        req.session.bookid = req.body.bookid;
        next();
    },
    TransactCtrl.createTransactClose
);
module.exports = router;