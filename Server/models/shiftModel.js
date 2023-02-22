const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema(
    { date: Date, starting: Number, ending: Number },
    { versionKey: false }
);

const Shift = mongoose.model("shift", shiftSchema);

module.exports = Shift;
