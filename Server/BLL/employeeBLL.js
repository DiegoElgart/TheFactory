const Employee = require("../models/employeeModel");
const departmentBLL = require("../BLL/departmentBLL");
const shiftBLL = require("../BLL/shiftBLL");

const getAllEmployees = () => {
    return Employee.find({});
};

const getEmployeeById = id => {
    return Employee.findById({ _id: id });
};

const getEmployeeByDept = async deptID => {
    const employees = await getAllEmployees();
    const employeesFiltered = employees.filter(
        employee => employee.departmentID == deptID
    );
    return employeesFiltered;
};

const getEmployeeShifts = async id => {
    const { shifts } = await Employee.findById(id);
    const emploeeyShifts = shifts.filter(
        async shift => await shiftBLL.getShiftById(shift.toString())
    );
    return emploeeyShifts;
};

const addEmployee = async obj => {
    const employee = new Employee(obj);
    if (employee.departmentID) {
        const department = await departmentBLL.getDepartmentById(
            employee.departmentID
        );
        department.employeesList.push(employee._id);
        await departmentBLL.updateDepartment(department._id);
        department.save();
    }

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
const insertMany = async arr => {
    const result = await Employee.insertMany(arr);
    return result;
};
module.exports = {
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    insertMany,
    getEmployeeByDept,
    getEmployeeShifts,
};
