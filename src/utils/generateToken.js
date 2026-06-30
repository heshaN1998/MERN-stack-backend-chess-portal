const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
    console.log("SECRET:", process.env.JWT_SECRET);
    console.log("ID:", id);
    console.log("ROLE:", role);

    return jwt.sign(
        { id, role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
};

module.exports = generateToken;