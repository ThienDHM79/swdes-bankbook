'use strict';

const express = require("express");
const router = express.Router();
const BankbookCtrl = require("../controllers/BankbookController");

router.get("/", BankbookCtrl.getAllBooks);

module.exports = router;