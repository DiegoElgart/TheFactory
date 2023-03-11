const express = require("express");
const employeeBLL = require("../BLL/employeeBLL");
const shiftBLL = require("../BLL/shiftBLL");
const actionsMiddleware = require("../middleware/actionsMiddleware");

const router = express.Router();
// Route for injecting to DB
router.route("/insertMany").post(async (req, res) => {
    const users = req.body;
    const result = await employeeBLL.insertMany(users);
    res.json(result);
});

router.route("/").get(async (req, res) => {
    const employees = await employeeBLL.getAllEmployees();
    res.json(employees);
});

router.route("/:id/dept").get(async (req, res) => {
    const { id } = req.params;
    const employees = await employeeBLL.getEmployeeByDept(id);
    res.json(employees);
});
router.route("/:id/shifts").get(async (req, res) => {
    const { id } = req.params;
    const shift = await shiftBLL.getShiftsByEmployeeId(id);
    res.json(shift);
});
router.route("/:id").get(async (req, res) => {
    const { id } = req.params;
    const employee = await employeeBLL.getEmployeeById(id);
    //const employee = await employeeBLL.getEmployeeShifts(id);
    res.json(employee);
});

router.route("/add").post(async (req, res) => {
    const department = req.body;
    const result = await employeeBLL.addEmployee(department);
    res.json(result);
});

router.route("/:id").post(async (req, res) => {
    const obj = req.body;
    const { id } = req.params;
    const result = await employeeBLL.updateEmployee(id, obj);
    res.json(result);
});

router.route("/delete/:id").post(async (req, res) => {
    const { id } = req.params;
    const result = await employeeBLL.deleteEmployee(id);
    res.json(result);
});

module.exports = router;
