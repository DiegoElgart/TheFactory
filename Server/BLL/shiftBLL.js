const Shift = require("../models/ShiftModel");

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

module.exports = {
    getAllShifts,
    getShiftById,
    addShift,
    updateShift,
    deleteShift,
};
