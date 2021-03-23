'use strict';

require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const db = require("../Config/database");
const md5 = require('md5');

exports.post = (req, res, next) => {
    console.log(req.body)
    let username = db.get('users')
        .some(username => username.username === req.body.username)
        .value();
    let password = db.get('users')
        .some(user => user.password === md5(req.body.password))
        .value();
    if (username === true && password === true) {

        const token = jwt.sign({ username }, process.env.SECRET, {
            expiresIn: 100000
        });

        res.send({ auth: true, token: token });
    } else {
        res.send(false);

    }


};