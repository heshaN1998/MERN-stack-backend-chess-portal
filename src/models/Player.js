const mongoose=require("mongoose");

const playerSchema=new mongoose.Schema(
    {
        name:{type:String, required:true},
        country:{type:String,required:true},
        age:{type:String,required:true},
        fideRating:{type:Number,required:true},
        level:{type:String,enum:["BEGINNER","INTERMEDIATE","EXPERT"],default:"BEGINNER"}
    },{timestamps:true}
);
module.exports=mongoose.model("Player",playerSchema);