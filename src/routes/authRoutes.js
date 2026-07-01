const express=require("express");
const router=express.Router();

const { register, login } =require("../controllers/authController");
const{ registerValidation }=require("../validators/authValidator");
const validate= require("../middleware/validationMiddleware");

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 example: heshan
 *               password:
 *                 type: string
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/register",registerValidation,validate,register);
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *                 example: heshan
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Username already exists
 *       500:
 *         description: Internal server error
 */
router.post("/register", registerValidation, validate, register);
router.post("/login", login);
router.post("/login",login);
module.exports=router;