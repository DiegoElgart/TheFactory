const Shift = require("../models/ShiftModel");
const Employee = require("../models/employeeModel");
const getAllShifts = () => {
    return Shift.find({});
};

const getShiftById = id => {
    return Shift.findById({ _id: id });
};

const addShift = async obj => {
    const shift = new Shift(obj);
    await shift.save();
    return "Shift Created";
};

const updateShift = async (id, obj) => {
    await Shift.findByIdAndUpdate(id, obj);
    return "Shift Updated";
};

const deleteShift = async id => {
    await Shift.findByIdAndDelete(id);
    return "Shift Deleted";
};
const insertMany = async arr => {
    const result = await Shift.insertMany(arr);
    return result;
};

const getShiftsByEmployeeId = async employeeId => {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
        throw new Error("Non Employee encounterd");
    }
    const shifts = await Shift.find({ employeesList: [employeeId] });
    return shifts;
};
module.exports = {
    getAllShifts,
    getShiftById,
    addShift,
    updateShift,
    deleteShift,
    insertMany,
    getShiftsByEmployeeId,
};
