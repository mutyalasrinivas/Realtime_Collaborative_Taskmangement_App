const mongoose =require("mongoose");

const Schema=mongoose.Schema;

const taskSchema=new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        trim:true,
    },
    date:{
        type:Date,
        default:Date.now
    },
    completed:{
        type:Boolean,
        deault:false,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
});


module.exports=  mongoose.model("Task",taskSchema);