const Department = require("../models/departmentModel");
const Employee = require("../models/employeeModel");

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
    const dept = await Department.findById(id);
    const employeesList = await Employee.find({ departmentID: dept._id });
    employeesList.map(
        async employee => await Employee.findByIdAndDelete(employee._id)
    );

    await Department.findByIdAndDelete(id);
    return "Department Deleted";
};

const getEmployeesNotInDepartment = async departmentId => {
    try {
        // const department = await Department.findById(departmentId).populate(
        //     "employeesList"
        // );
        const allEmployees = await Employee.find();
        const employeesNotInDepartment = allEmployees.filter(
            employee => employee.departmentID.toString() !== departmentId
        );
        return employeesNotInDepartment;
    } catch (error) {
        console.error(error);
        throw new Error("Error getting employees not in department");
    }
};

// For Injecting to DB
const insertMany = async arr => {
    const result = await Department.insertMany(arr);
    return result;
};
module.exports = {
    getAllDepartments,
    addDepartment,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
    insertMany,
    getEmployeesNotInDepartment,
};
