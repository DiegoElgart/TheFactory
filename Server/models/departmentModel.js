const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
    {
        name: String,
        manager: mongoose.Types.ObjectId,
    },
    { versionKey: false }
);

const Department = mongoose.model("department", departmentSchema);

module.exports = Department;
