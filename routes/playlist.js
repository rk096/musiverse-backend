const express = require("express");
const passport = require("passport");
const Playlist = require("../models/Playlist");
const User = require("../models/User");
const Song = require("../models/Song");

const router = express.Router();

// Route 1: Create a playlist
router.post(
    "/create",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        const currentUser = req.user;
        const {name, thumbnail, songs} = req.body;
        if (!name || !thumbnail || !songs) {
            return res.status(301).json({err: "Insufficient data"});
        }
        const playlistData = {
            name,
            thumbnail,
            songs,
            owner: currentUser._id,
            collaborators: [],
        };
        const playlist = await Playlist.create(playlistData);
        return res.status(200).json(playlist);
    }
);

// Route 2: Get a playlist by ID
// we will get the playlist ID as a route parameter and we will return teh playlist having that id
router.get(
    "/get/playlist/:playlistId",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        // This concept is called req.params
        const playlistId = req.params.playlistId;
        // I need to find a playlist with the _id = playlistId
        const playlist = await Playlist.findOne({_id: playlistId});
        if (!playlist) {
            return res.status(301).json({err: "Invalid ID"});
        }
        return res.status(200).json(playlist);
    }
);

module.exports = router;
