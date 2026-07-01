const express=require("express");
const router=express.Router();
const protect=require("../middleware/authMiddleware");
const authorizeRoles=require("../middleware/roleMiddleware");
const upload=require("../middleware/uploadMiddleware");
const  validate  =require("../middleware/validationMiddleware");

const { createPlayer,getAllPlayers,getPlayerById,updatePlayer,deletePlayer } = require("../controllers/playerController");
const { playerValidation }=require("../validators/playerValidator");
//those are public routes
/**
 * @swagger
 * /api/players:
 *   get:
 *     summary: Get all players
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: List of players
 */
router.get("/",getAllPlayers);
/**
 * @swagger
 * /api/players/{id}:
 *   get:
 *     summary: Get player by ID
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Player found
 */
router.get("/:id",getPlayerById);
//below Admin (Authenticated) routes
/**
 * @swagger
 * /api/players:
 *   post:
 *     summary: Create player
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               country:
 *                 type: string
 *               age:
 *                 type: integer
 *               fideRating:
 *                 type: integer
 *               experienceYears:
 *                 type: integer
 *               level:
 *                 type: string
 *                 example: GRANDMASTER
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Player created
 */
router.post("/", protect,authorizeRoles("ADMIN"),upload.single("image"),playerValidation,validate, createPlayer);
/**
 * @swagger
 * /api/players/{id}:
 *   put:
 *     summary: Update player
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Player updated
 */
router.put("/:id", protect,authorizeRoles("ADMIN"), updatePlayer);
/**
 * @swagger
 * /api/players/{id}:
 *   delete:
 *     summary: Delete player
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Player deleted
 */
router.delete("/:id", protect,authorizeRoles("ADMIN"), deletePlayer);

module.exports=router;