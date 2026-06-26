const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");

dotenv.config();
const app=express();

//middleware
app.use(cors());
app.use(express.json());

//tesing route
app.get("/",(req,res)=>{
    res.send("API TESTING STRATEGY");
});

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`);});