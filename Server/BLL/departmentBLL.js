const Department = require("../models/departmentModel");
const Employee = require('../models/employeeModel')

const getAllDepartments = () => {
    return Department.find({});
};

const getDepartmentById = id => {
    return Department.findById({ _id: id });
};

const addDepartment = async obj => {
    const department = new Department(obj);
    await department.save();
    return "Department Created";
};

const updateDepartment = async (id, obj) => {
    await Department.findByIdAndUpdate(id, obj);
    return "Department Updated";
};

const deleteDepartment = async id => {
    await Department.findByIdAndDelete(id);
    return "Department Deleted";
};

const getEmployeesByDept = async id=>{
await 
}

// For Injecting to DB
// const insertMany = async arr => {
//     const result = await Department.insertMany(arr);
//     return result;
// };
module.exports = {
    getAllDepartments,
    addDepartment,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
    // insertMany,
};
