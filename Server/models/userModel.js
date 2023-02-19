const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullName: String,
        numOfActions: Number,
    },
    { versionKey: false }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
