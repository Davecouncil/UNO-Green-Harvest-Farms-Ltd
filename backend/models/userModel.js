const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    userName:{type: String, required: true},
    email:{type: String, required: true, unique: true},
    password: { type: String, required: true},
    phone: {type: String, required: true},
    role: { type: String ,
        enum: ['buyer', 'seller'],
        required: true,
        default: 'buyer'        
     },
} ,     {timestamps: true}
)

const User =  mongoose.model('User', userSchema)

module.exports = User;
