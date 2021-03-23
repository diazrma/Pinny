const low = require('lowdb')
const lodashId = require('lodash-id')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter);
const moment = require("moment");
const now = moment().format('MM/DD/YYYY');
const md5 = require('md5');


db._.mixin(lodashId);

db.defaults({
        customers: [],
        users: [{
            id: "dcb5563c-1866-4c5a-9441-ceafb811c739",
            username: "admin",
            password: md5("12345"),
            created_at: now
        }]
    })
    .write();


module.exports = db;