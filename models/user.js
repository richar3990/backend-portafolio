'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});
module.exports = mongoose.model('User', UserSchema);
