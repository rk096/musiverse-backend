const mongoose = require("mongoose");

const imageSchema = new  mongoose.Schema({
    filename: String,
    originalname: String,
    path: String,
    created_at: { type: Date, default: Date.now },
});


const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
