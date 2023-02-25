'use strict';

const express = require("express");
const router = express.Router();
const BankbookCtrl = require("../controllers/Bankbook.controller");

router.get("/", BankbookCtrl.getAllBooks);

module.exports = router;