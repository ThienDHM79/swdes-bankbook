'use strict';
const controller = {};

controller.showHomepage = async (req, res) =>{
    await res.render('home');
}

controller.showPage = async (req,res, next) => {
    const pages = ['deposit', 'login', 'request-create', 'withdraw'];
    if (pages.includes(req.params.page)){
        return  await res.render(req.params.page);
    }
    next();
}
module.exports = controller;