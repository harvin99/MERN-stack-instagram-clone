const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required : true
    },
    ROLE : {
        type: String,
        required: true
    },
    avatarUrl : {
        type:String,
        required : true
    }
})
const User = mongoose.model('User', userSchema, 'users')
module.exports = User