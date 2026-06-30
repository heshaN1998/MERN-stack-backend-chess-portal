const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {

        let token;

        // Check header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, no token"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Token failed or expired"
        });
    }
};

module.exports = protect;