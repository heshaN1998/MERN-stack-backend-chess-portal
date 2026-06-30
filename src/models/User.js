const mongoose =require("mongoose");
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }
    },
    {
        timestamps:true
    }
);
module.exports=mongoose.model("User",userSchema);