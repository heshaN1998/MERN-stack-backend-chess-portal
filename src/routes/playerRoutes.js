const express=require("express");
const router=express.Router();
const protect=require("../middleware/authMiddleware");

const { createPlayer,getAllPlayers,getPlayerById,updatePlayer,deletePlayer } = require("../controllers/playerController");
router.post("/",createPlayer);
router.get("/",getAllPlayers);
router.get("/:id",getPlayerById);
router.put("/:id",updatePlayer);
router.delete("/:id",deletePlayer);
router.post("/", protect, createPlayer);
router.put("/:id", protect, updatePlayer);
router.delete("/:id", protect, deletePlayer);

module.exports=router;