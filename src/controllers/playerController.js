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

const getAllPlayers=async(req,res)=>{
    try{
        const players=await Player.find();
        res.status(200).json({
            success:true,
            count:players.length,
            data:players
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });

    }
};


const getPlayerById=async(req,res)=>{
    try{
        const player=await Player.findById(req.params.id);
        if(!player){
            return res.status(404).json({
                success:false,
                message:"Player not found"
            });
        }
        res.status(200).json({
            success:true,
            data:player
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

const deletePlayer=async(req,res)=>{
    try{
        const player =await Player.findByIdAndDelete(req.params.id);
        if(!player){
            return res.status(404).json({
                success:false,
                message:"Player not found"
            });
        }
        res.status(200).json({
            success:true,
            message:"Player deleted successfully"
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

const updatePlayer=async(req,res)=>{
    try{
        const player=await Player.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,
                runValidators:true
            }
        );
        if(!player){
            return res.status(404).json({
                success:false,
                message:"Player not found"
            });
        }
        res.status(200).json({
            success:true,
            data:player
        });

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
module.exports={ createPlayer,getAllPlayers,getPlayerById,deletePlayer,updatePlayer };
