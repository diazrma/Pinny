'use strict'

require("dotenv-safe").config();

const db = require("./Config/database");
const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const port = process.env.PORT;

nunjucks.configure(path.join(__dirname, 'Views'), {
    autoescape: true,
    express: app
})



app.use('/public', express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/jquery/dist')));
app.listen(port, () => console.log(`http://${process.env.HOSTNAME}:${port}`));


//routes
const loginRoute = require('./Routes/login-route');
const customerRoute = require('./Routes/customer-route');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/', function(req, res, next) {
    let data = {
        title: process.env.APP,
        description: 'Entrar na sua conta'
    }

    res.render('index.njk', data)
})



app.get('/home', function(req, res, next) {
    let data = {
        title: process.env.APP,
        customers: db.get('customers').value()
    }

    res.render('home.njk', data);
})

// Habilita o CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/api/login', loginRoute);
app.use('/api/customer', customerRoute);

module.exports = app;