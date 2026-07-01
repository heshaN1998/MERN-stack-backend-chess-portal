const User = require("../models/User");

const create = async (data) => {
    return await User.create(data);
};
const findByUserName = async (userName) => {
    return await User.findOne({ userName });
};
const findById = async (id) => {
    return await User.findById(id);
};

module.exports = {
    create,
    findByUserName,
    findById
};