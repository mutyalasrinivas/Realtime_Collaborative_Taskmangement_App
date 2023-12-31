const mongoose= require('mongoose');

const Schema =mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minLength:5
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
})

module.exports= mongoose.model('User',userSchema);