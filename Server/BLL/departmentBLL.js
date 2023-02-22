const Department = require("../models/departmentModel");

const getAllDepartments = async () => {
    const departments = await Department.find({});
    return departments;
};

const addDepartment = async obj => {
    const result = await Department.addListener(obj);
    return result;
};

module.exports = { getAllDepartments, addDepartment };
