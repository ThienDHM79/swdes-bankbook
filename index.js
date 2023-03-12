'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;


//handle-bar
const expressHandlebars = require('express-handlebars');
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