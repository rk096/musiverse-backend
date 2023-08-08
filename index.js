const express = require("express");
const mongoose = require("mongoose");
const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const authRoutes = require("./routes/auth");

require("dotenv").config();
const port = 8000;
const app = express();


app.use(express.json());


// console.log(process.env);

mongoose.connect("mongodb+srv://richakamani:"+ 
process.env.MONGO_PASS
+"@cluster0.iyjifo2.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then((x) => {
        console.log("Connected to Mongo!");
    })
    .catch((err) => {
        console.log("Error while connecting to Mongo");
    });


// setup passport-jwt
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "thisKeyIsSupposedToBeSecret";
passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({ _id: jwt_payload.identifier }, function (err, user) {
            // done(error, doesTheUserExist)
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    })
);

app.get("/", (req, res) => {
    res.send("hello world");

});


app.use("/auth", authRoutes);


app.listen(port, () => {
    console.log("App is running on port " + port);
})