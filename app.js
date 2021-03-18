'use strict'

require("dotenv-safe").config();

const db = require("./config/database");
const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;

nunjucks.configure(path.join(__dirname, 'Views'), {
    autoescape: true,
    express: app
})

app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/jquery/dist')));
app.listen(port, () => console.log(`http://${process.env.HOSTNAME}:${port}`));


//routes
const customerRoute = require('./Routes/customer-route');


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({

    limit: '5mb'
}));



app.get('/', function(req, res, next) {
    let data = {
        title: process.env.APP,
        description: 'Entrar na sua conta'
    }

    res.render('index.njk', data)
})



app.get('/dashboard', function(req, res, next) {
    let data = {
        content: 'Hello world!',
        title: process.env.APP,
        customers: db.get('customers').value()
    }

    res.render('dashboard.njk', data);
})


app.use('/api/customer', customerRoute);