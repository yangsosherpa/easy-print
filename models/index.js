const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const db = {};


db.mongoose = mongoose;
db.vendor = require('./Vendor');
db.file = require('./File');

db.ROLES = ['vendor', 'admin'];


module.exports = db;