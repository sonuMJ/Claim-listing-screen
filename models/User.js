const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstname:{
        required:true,
        type:String
    },
    lastname:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    role:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    pincode:{
        type:String
    }
})

const User = mongoose.model("User", UserSchema);

module.exports = User;