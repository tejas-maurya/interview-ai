const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
    type: String,
    unique: true,
    required: true
},
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
});

const Usermodal = mongoose.model('User', userSchema);
module.exports = Usermodal;