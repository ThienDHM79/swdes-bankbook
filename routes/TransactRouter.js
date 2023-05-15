'use strict';

const express = require("express");
const {body, validationResult } = require("express-validator");
const router = express.Router();
const BankbookCtrl = require("../controllers/BankbookController");
const TransactCtrl = require("../controllers/TransactController");
const CustomerCtrl = require("../controllers/CustomerController");


router.post("/add", (req,res) => {
    console.log(`success`);
})
module.exports = router;