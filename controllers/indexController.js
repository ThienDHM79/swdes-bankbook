'use strict';
const controller = {};

controller.showHomepage = async (req, res) =>{
    await res.render('request');
}

controller.showPage = (req,res, next) => {
    const pages = ['deposit', 'login', 'reportbook', 'request', 'withdraw'];
    if (pages.includes(req.params.page))
        return  res.render(req.params.page);
    next();
}
module.exports = controller;