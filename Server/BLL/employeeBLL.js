const Employee = require("../models/employeeModel");

const getAllEmployees = () => {
    return Employee.find({});
};

const getEmployeeById = id => {
    return Employee.findById({ _id: id });
};

const addEmployee = async obj => {
    const employee = new Employee(obj);
    await employee.save();
    return "Employee Created";
};

const updateEmployee = async (id, obj) => {
    await Employee.findByIdAndUpdate(id, obj);
    return "Employee Updated";
};

const deleteEmployee = async id => {
    await Employee.findByIdAndDelete(id);
    return "Employee Deleted";
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee,
};
