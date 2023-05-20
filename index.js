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


//routes
app.use('/', require('./routes/indexRouter'));
app.use('/report', require('./routes/ReportRouter'));
app.use('/bankbook', require('./routes/BankbookRouter'));
app.use('/update', require('./routes/TransactRouter') );
app.use('/customer', require('./routes/CustomerRouter'));
app.use('/transact', require('./routes/TransactRouter'));

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