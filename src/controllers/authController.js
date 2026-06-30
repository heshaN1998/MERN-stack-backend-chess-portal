const User =require("../models/User");
const bcrypt=require("bcryptjs");

const register = async(req,res)=>{
    try{
        const { username,email,password }=req.body;

        const existingUser=await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user already exists"
            });
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user =await User.create({
            username,
            email,
            password:hashedPassword
        });

        res.status(201).json({
            success:true,
            message:"user registered successfully",
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
                role:user.role
            }
        });

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

module.exports={ register };