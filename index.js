'use strict'

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const expressHandlebars = require('express-handlebars');

//routes
//app.use('/', require('./routes/indexRouter'));

//check res
app.get('/', (req, res) =>{
    res.send('hello bankbook-2');
})
//khoi dong web server
app.listen( port, () =>{
    console.log(`server is running on port ${port}`);
})