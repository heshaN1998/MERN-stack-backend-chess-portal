const playerService = require("../services/playerService");

const createPlayer = async (req, res) => {
    try {
        const playerData = {
            ...req.body,
            image: req.file ? req.file.filename : ""
        };
        const player = await playerService.createPlayer(playerData);
        res.status(201).json({
            success: true,
            data: player
        });
        } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
        }
};

const getAllPlayers = async (req, res) => {
    try {
        const players = await playerService.getAllPlayers();
        res.status(200).json({
            success: true,
            data: players
        });
        } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getPlayerById = async (req, res) => {
    try {
        const player = await playerService.getPlayerById(req.params.id);
        res.status(200).json({
            success: true,
            data: player
        });
        } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });

    }
};
const updatePlayer = async (req, res) => {
    try {
        const player = await playerService.updatePlayer(
            req.params.id,
            req.body
        );
        res.status(200).json({
            success: true,
            data: player
        });
        } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
const deletePlayer = async (req, res) => {
      try {
        await playerService.deletePlayer(req.params.id);
        res.status(200).json({
            success: true,
            message: "Player deleted successfully"
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createPlayer,
    getAllPlayers,
    getPlayerById,
    updatePlayer,
    deletePlayer
};