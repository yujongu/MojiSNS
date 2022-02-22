const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    USER_ID: String,

    USER_EMAIL: {
        type: String,
        required: [true, "Enter your email!"]
    },

    USER_PW: {
        type: String,
        required: [true, "Enter your password!"]
    },

    USER_BIRTHDAY: {
        type: Date,
        default: Date.now()
    },

    USER_DESCRIPTION: {
        type: String,
        default: "",
    },

    USER_SEX: {
        type: String,
        enum: ['Male', 'Female']
    }

});

module.exports = mongoose.model('User', userSchema);