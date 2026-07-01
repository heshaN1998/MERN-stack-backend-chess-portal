const express=require("express");
const router=express.Router();
const protect=require("../middleware/authMiddleware");
const authorizeRoles=require("../middleware/roleMiddleware");
const upload=require("../middleware/uploadMiddleware");
const  validate  =require("../middleware/validationMiddleware");

const { createPlayer,getAllPlayers,getPlayerById,updatePlayer,deletePlayer } = require("../controllers/playerController");
const { playerValidation }=require("../validators/playerValidator");
//those are public routes
router.get("/",getAllPlayers);
router.get("/:id",getPlayerById);
//below Admin (Authenticated) routes
router.post("/", protect,authorizeRoles("ADMIN"),upload.single("image"),playerValidation,validate, createPlayer);
router.put("/:id", protect,authorizeRoles("ADMIN"), updatePlayer);
router.delete("/:id", protect,authorizeRoles("ADMIN"), deletePlayer);

module.exports=router;