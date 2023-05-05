'use strict';

const express = require("express");
const {body, validationResult } = require("express-validator");
const router = express.Router();
const controller = require("../controllers/BankbookController");

const CustomerService = require("../services/CustomerService");
const ConfigService = require("../services/ConfigService");

//router.get("/reportbook", controller.getAllBooks);
//vao trang co in thong tin can validate khach hang moi/cu de route

router.post("/confirm",
body('customercmnd').notEmpty().withMessage('CMND is required'),
body('amount').notEmpty().withMessage('amount is required'), 
body('customercmnd').custom(value => CustomerService.GetCustomerbyCMND(value)),
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
        req.session.customercmnd = req.body.customercmnd;
        next();
    },
    controller.showConfirm
);


module.exports = router;