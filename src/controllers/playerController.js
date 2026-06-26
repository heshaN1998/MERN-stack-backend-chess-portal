const Player=require("../models/Player");

//creating player
const createPlayer=async (req,res)=>{
    try{
        const player=await Player.create(req.body);
        res.status(201).json({
            success:true,
            message:"Player created successfully",
            data:player
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });

    }
};
module.exports={createPlayer};
