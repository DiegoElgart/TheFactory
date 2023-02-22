const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        startWorkYear: Number,
        departmentID: mongoose.Types.ObjectId,
    },
    { versionKey: false }
);

const Employee = mongoose.model("employee", employeeSchema);

module.exports = Employee;
