const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
    {
        name: String,
        manager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
    },
    { versionKey: false }
);

const Department = mongoose.model("department", departmentSchema);

module.exports = Department;
