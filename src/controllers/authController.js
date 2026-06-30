const User =require("../models/User");
const bcrypt=require("bcryptjs");
const generateToken=require("../utils/generateToken");

const register = async(req,res)=>{
    try{
        const { userName,password }=req.body;

        const existingUser=await User.findOne({ userName });
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user already exists"
            });
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user =await User.create({
            userName,
            password:hashedPassword,
            role:"USER"
        });

        res.status(201).json({
            success:true,
            message:"user registered successfully",
            // user:{
            //     id:user._id,
            //     username:user.userName,
                
            //     role:user.role
            // }
        });

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

const login=async(req,res)=>{
    try{
        const { userName,password }=req.body;
        const user=await User.findOne({ userName });
        if(!user){
            return res.status(401).json({
                success:false,
                message:"invalid username or password"
            });
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"invalid username or password"
            });        }
        //generate JWT token
        const token=generateToken(user._id,user.role);
        res.status(200).json({
            success:true,
            token,
            user:{
                id:user._id,
                userName:user.userName,
                role:user.role
            }
        });


    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}


module.exports={ register,login };