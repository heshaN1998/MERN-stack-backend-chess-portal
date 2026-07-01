const mongoose=require("mongoose");

const playerSchema=new mongoose.Schema(
    {
        name:{type:String, required:true},
        country:{type:String,required:true},
        age:{type:Number,required:true},
        fideRating:{type:Number,required:true},
        experienceYears:{type:Number,require:true},
        level:{type:String,enum:["BEGINNER","INTERMEDIATE","EXPERT"],default:"BEGINNER"},
        image:{type:String,default:""}
    },{timestamps:true}
);
module.exports=mongoose.model("Player",playerSchema);