'use strict';

const express = require("express");
const {body, validationResult } = require("express-validator");
const router = express.Router();
const BankbookCtrl = require("../controllers/BankbookController");
const TransactCtrl = require("../controllers/TransactController");
const CustomerCtrl = require("../controllers/CustomerController");



module.exports = router;