const { time } = require("console");
const mongoose = require("mongoose");
const { stringify } = require("querystring");

const Song = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    track: {
        type: String,
        required: true,
    },
    duration:{
type : String,
required : true,
    },
    artist: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
});

const SongModel = mongoose.model("Song", Song);

module.exports = SongModel;
