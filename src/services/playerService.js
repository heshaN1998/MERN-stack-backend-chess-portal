const playerRepository = require("../repository/playerRepository");

const createPlayer = async (data) => {
    return await playerRepository.create(data);
};
const getAllPlayers = async () => {
    return await playerRepository.findAll();
};
const getPlayerById = async (id) => {

    const player = await playerRepository.findById(id);
     if (!player) {
        throw new Error("Player not found");
    }
        return player;
};
const updatePlayer = async (id, data) => {

    const player = await playerRepository.update(id, data);

    if (!player) {
        throw new Error("Player not found");
    }

    return player;
};
const deletePlayer = async (id) => {

    const player = await playerRepository.remove(id);

    if (!player) {
        throw new Error("Player not found");
    }

    return player;
};

module.exports = {
    createPlayer,
    getAllPlayers,
    getPlayerById,
    updatePlayer,
    deletePlayer
};