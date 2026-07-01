const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
};
const register = async (req, res) => {
    try {
        const user = await userService.register(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
const login = async (req, res) => {
    try {
        const user = await userService.login(req.body);
        const token = generateToken(user);
        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                userName: user.userName,
                role: user.role
            }
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    register,
    login
};