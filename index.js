'use strict'

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
    extname: 'hbs',
    defaultLayout: 'layout'
}));
app.set('view engine', 'hbs');

//routes
app.use('/', require('./routes/indexRouter'));

//wrong route


//khoi dong web server
app.listen( port, () =>{
    console.log(`server is running on port ${port}`);
})