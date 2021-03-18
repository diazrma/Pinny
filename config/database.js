const low = require('lowdb')
const lodashId = require('lodash-id')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter);

db._.mixin(lodashId);

db.defaults({ customers: [] })
    .write();


module.exports = db;