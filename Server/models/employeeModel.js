const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        startWorkYear: Number,
        departmentID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: false,
        },
        shifts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Shift",
                required: false,
            },
        ],
    },
    { versionKey: false }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
