'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;


//handle-bar
const expressHandlebars = require('express-handlebars');
//helper
const {getDate} = require('./controllers/helper');
//session
const session = require('express-session');
//cau hinh public static folder
app.use( express.static(__dirname + '/public'));
//cau hinh su dung express-handlebars
app.engine('hbs', expressHandlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir:__dirname + '/views/partials',
    extname: 'hbs',
    defaultLayout: 'layout',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
}));
app.set('view engine', 'hbs');

//cau hinh doc du lieu post tu body
app.use(express.json());
app.use(express.urlencoded( { extended: false }));

//cau hinh su dung session
app.use( session({
    secret: 'S3cret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 20 * 60 * 1000 //20ph
    }
}));

// //khoi tao customer session
// app.use( (req,res,next) => {
//     let CustomerProcess = require('./controllers/customerProcess');
//     req.session.customer = new CustomerProcess(1);
//     next();
// })

//routes
app.use('/', require('./routes/indexRouter'));
app.use('/bankbook', require('./routes/BankbookRouter'));

//create Table in DB
app.get('/createTables', (req,res)=> {
    let models = require('./models');
    models.sequelize.sync().then(() => {
        res.send('table created!');
    } )
})
//wrong route
app.use( (req, res, next) => {
    res.status(404).render('error', {message: 'File not Found!'});
});
app.use( (error, req, res, next) => {
    console.error(error);
    res.status(500).render('error', {message: 'Internal Server Error!'});
})

//khoi dong web server
app.listen( port, () =>{
    console.log(`server is running on port ${port}`);
})