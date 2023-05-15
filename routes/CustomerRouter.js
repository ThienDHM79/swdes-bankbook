'use strict';

const express = require("express");
const router = express.Router();
const CustomerCtrl = require("../controllers/CustomerController");

//validator
const { body, resultValidation } = require('express-validator');


router.get('/', CustomerCtrl.GetCustomerNamebyCMND);
module.exports = router;