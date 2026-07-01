const bcrypt = require("bcryptjs");
const userRepository = require("../repository/userRepository");

const register = async (data) => {
   const existingUser = await userRepository.findByUserName(data.userName);
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await userRepository.create({
        userName: data.userName,
        password: hashedPassword,
        role: "USER"
    });
    return user;
};
const login = async (data) => {
    const user = await userRepository.findByUserName(data.userName);
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    return user;
};

module.exports = {
    register,
    login
};