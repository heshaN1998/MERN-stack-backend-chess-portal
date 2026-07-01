const Player = require("../models/Player");

const create = (data) => Player.create(data);
const findAll = (query) => Player.find(query);
const findById = (id) => Player.findById(id);
const update = (id, data) =>
    Player.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });
const remove = (id) => Player.findByIdAndDelete(id);

module.exports = {
    create,
    findAll,
    findById,
    update,
    remove
};