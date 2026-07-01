const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const connectDB=require("./config/db");
const playerRoutes=require("./routes/playerRoutes");
const authRoutes=require("./routes/authRoutes");
const errorHandler=require("./middleware/errorMiddleware");


dotenv.config();
const app=express();
connectDB();

//middleware
app.use(cors());
app.use(express.json());
app.use("/api/players",playerRoutes);
app.use("/api/auth",authRoutes);
app.use(errorHandler);

//tesing route
app.get("/",(req,res)=>{
    res.send("API TESTING STRATEGY");
});

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`);});

