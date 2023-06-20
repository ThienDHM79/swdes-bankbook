'use strict';
const controller = {};

controller.checkAuth = (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    if (username == 'admin' && password == 'admin'){
        req.session.user_id = 'admin';
        res.locals.username = username;
        res.render('error',{message: "login succesful"});
    } else {
        res.send('invalid username or password');
    }
}

controller.showHomepage = async (req, res) =>{
    await res.render('home');
}

controller.showPage = async (req,res, next) => {
    const pages = ['home', 'login'];
        if (pages.includes( req.params.page)){
            return await res.render(req.params.page);
        }
        next();
    }

module.exports = controller;