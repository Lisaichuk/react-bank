const {Schema, model} = require('mongoose')
const mongoose = require("mongoose");

const User = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: false},
    // diskSpace: {type: Number, default: 1024 ** 3 * 10},
    // usedSpace: {type: Number, default: 0},
    // avatar: {type: String},
    //  files: [{type:objectId, ref: 'file'}]

})

module.exports = model('User', User)