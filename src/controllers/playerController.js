const Player=require("../models/Player");

//creating player
const createPlayer=async (req,res)=>{
    try{
        const playerData={
            ...req.body,
            image:req.file?req.file.filename:""
        };
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
        const { search,country,level,sort,page=1,limit=5 }=req.query;
        let query={};
        //searching section
        if(search){
            query.name={
                $regex:search,
                $options:"i"
            };
        }
        //filtering section
        if(country){
            query.country=country;
        }
        if(level){
            query.level=level;
        }
        //adding pagination
        const pageNumber=parseInt(page);
        const limitNumber=parseInt(limit);

        const skip=(pageNumber-1)*limitNumber;
        
        //creating mongoose query for project
        let playerQuery=Player.find(query);
        if(sort){
            playerQuery=playerQuery.sort(sort);
        }else{
            playerQuery=playerQuery.sort("-createdAt");
        }

        playerQuery=playerQuery.skip(skip).limit(limitNumber);

        const players=await playerQuery;
        const totalPlayers=await Player.countDocuments(query)
        res.status(200).json({
            success:true,
            page:pageNumber,
            totalPages:Math.ceil(totalPlayers/limitNumber),
            totalPlayers,    
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
            res.status(404);
            throw new Error("player not found");
               
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
            res.status(404);
            throw new Error("player not found");
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
