const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema(
    {
        date: Date,
        start: Number,
        end: Number,
        employeesList: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Employee",
                required: false,
            },
        ],
    },
    { versionKey: false }
);

const Shift = mongoose.model("shift", shiftSchema);

module.exports = Shift;
