const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const path=require("path");
const helmet=require("helmet");
const connectDB=require("./config/db");
const playerRoutes=require("./routes/playerRoutes");
const authRoutes=require("./routes/authRoutes");
const errorHandler=require("./middleware/errorMiddleware");
const setupSwagger=require("./config/swagger");
const apiLimiter=require("./middleware/rateLimit")

dotenv.config();
const app=express();
connectDB();

//middleware
app.use(cors());
app.use(express.json());
setupSwagger(app);
app.use("/api/players",playerRoutes);
app.use("/api/auth",authRoutes);
app.use("/uploads",express.static(path.join(__dirname,"uploads")));
app.use(helmet());
app.use(apiLimiter);


//tesing route
app.get("/",(req,res)=>{
    res.send("API TESTING STRATEGY");
});
app.use(errorHandler);

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`);});

