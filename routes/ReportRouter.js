'use strict';

const express = require("express");
const BankbookCtrl = require("../controllers/BankbookController");
const ReportCtrl = require("../controllers/ReportController");
const router = express.Router();
//lay danh sach book
router.get("/reportbook", BankbookCtrl.getAllBooks);
router.get("/report-monthly", ReportCtrl.show);
router.post("/report-monthly/search",ReportCtrl.getDaySum);
module.exports = router;