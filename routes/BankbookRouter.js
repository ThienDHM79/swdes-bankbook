'use strict';

const express = require("express");
const router = express.Router();
const controller = require("../controllers/BankbookController");

router.get("/reportbook", controller.getAllBooks);

module.exports = router;