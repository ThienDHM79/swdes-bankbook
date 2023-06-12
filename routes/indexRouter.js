'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/indexController');



router.get('/', controller.showHomepage);
router.get('/:page', controller.showPage);
//router.get('/:page',controller.checkAuth, controller.showPage);

router.post('/login',controller.checkAuth);

module.exports = router;

router.get('/createTables', (req, res) =>{
    let models = require('../models');
    models.sequelize.sync().then( () => {
        res.send('tables created');
    })
});