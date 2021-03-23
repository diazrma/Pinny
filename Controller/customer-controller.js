'use strict';

const db = require("../Config/database");
const moment = require("moment");
const now = moment().format('MM/DD/YYYY');;

exports.post = (req, res, next) => {

    if (db.get('customers')
        .some(email => email.email === req.body.email)
        .value()) {
        res.send(false);
    } else {
        const collection = {
            name: req.body.name,
            contact: req.body.contact,
            email: req.body.email,
            origin: req.body.origin,
            created_at: now
        }

        db.get('customers')
            .insert(collection)
            .write()
        res.send(true);
    }
};


exports.delete = (req, res, next) => {
    db.get('customers').remove({ id: req.body.id }).write();
    res.send(true);
};