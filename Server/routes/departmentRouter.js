const express = require("express");
const departmentBLL = require("../BLL/departmentBLL");
const actionsMiddleware = require("../middleware/actionsMiddleware");
const router = express.Router();

// Route for injecting to DB
router.route("/insertMany").post(async (req, res) => {
    const users = req.body;
    const result = await departmentBLL.insertMany(users);
    res.json(result);
});

router.route("/").get(actionsMiddleware, async (req, res) => {
    const depts = await departmentBLL.getAllDepartments();
    res.json(depts);
});

router.route("/:id").get(actionsMiddleware, async (req, res) => {
    const { id } = req.params;
    const dept = await departmentBLL.getDepartmentById(id);
    res.json(dept);
});

router.route("/:id/employees").get(async (req, res) => {
    const { id } = req.params;
    const employees = await departmentBLL.getEmployeesNotInDepartment(id);
    res.json(employees);
});

router.route("/add").post(actionsMiddleware, async (req, res) => {
    const department = req.body;
    const result = await departmentBLL.addDepartment(department);
    res.json(result);
});
router.route("/:id").post(actionsMiddleware, async (req, res) => {
    const obj = req.body;
    const { id } = req.params;
    const result = await departmentBLL.updateDepartment(id, obj);
    res.json(result);
});

router.route("/delete/:id").post(actionsMiddleware, async (req, res) => {
    const { id } = req.params;
    const result = await departmentBLL.deleteDepartment(id);
    //res.json(result);
});

module.exports = router;
