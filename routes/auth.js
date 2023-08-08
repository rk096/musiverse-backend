const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers");

// This POST route will help to register a user
router.post("/register", async (req, res) => {

    const { email, password, firstName, lastName, username } = req.body;

    // Does a user with this email already exist? If yes, we throw an error.
    const user = await User.findOne({ email: email });
    if (user) {

        return res
            .status(403)
            .json({ error: "A user with this email already exists" });
    }

    // Create a new user in the DB
    // we convert the plain text password to a hash.

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserData = {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        username,
    };
    const newUser = await User.create(newUserData);
    console.log(newUserData);

    // We want to create the token to return to the user
    const token = await getToken(email, newUser);

    //Return the result to the user
    const userToReturn = { ...newUser.toJSON(), token };
    console.log(userToReturn);
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});

module.exports = router;