'use strict';

const express = require("express");
const router = express.Router();
const controller = require("../controllers/BankbookController");

router.get("/", controller.getAllBooks);

module.exports = router;