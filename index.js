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
    defaultLayout: 'layout',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
}));
app.set('view engine', 'hbs');

//routes
app.use('/', require('./routes/indexRouter'));
app.use('/reportbook', require('./routes/Bankbook.router'));
//create Table in DB
app.get('/createTables', (req,res)=> {
    let models = require('./models');
    models.sequelize.sync().then(() => {
        res.send('table created!');
    } )
})
//wrong route


//khoi dong web server
app.listen( port, () =>{
    console.log(`server is running on port ${port}`);
})