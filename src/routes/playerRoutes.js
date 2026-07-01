const express=require("express");
const router=express.Router();
const protect=require("../middleware/authMiddleware");
const authorizeRoles=require("../middleware/roleMiddleware");

const { createPlayer,getAllPlayers,getPlayerById,updatePlayer,deletePlayer } = require("../controllers/playerController");
const { validate } = require("../models/Player");
const { playerValidation }=require("../validators/playerValidator");

router.get("/",getAllPlayers);
router.get("/:id",getPlayerById);
router.put("/:id",updatePlayer);
router.delete("/:id",deletePlayer);
router.post("/", protect,authorizeRoles("ADMIN"),playerValidation,validate, createPlayer);
router.put("/:id", protect,authorizeRoles("ADMIN"), updatePlayer);
router.delete("/:id", protect,authorizeRoles("ADMIN"), deletePlayer);

module.exports=router;