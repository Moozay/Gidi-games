const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    lname: String,
    city: String,
    mobile: Number,
    score: Number
})

module.exports = mongoose.model('User', userSchema)