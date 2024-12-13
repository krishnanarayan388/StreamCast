const mongoose = require("mongoose");


const gameSchema = new mongoose.Schema({
    // ObjectId: mongoose.Schema.Types.ObjectId,
    userID : {
        type: String,
        required: true,
    },
    gameDetails: {
        type: Object,

    }
})

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
