const express = require("express");
const employeeBLL = require("../BLL/employeeBLL");

const router = express.Router();

router.route("/").get(async (req, res) => {
    const employees = await employeeBLL.getAllEmployees();
    res.json(employees);
});

router.route("/:id").get(async (req, res) => {
    const { id } = req.params;
    const employee = await employeeBLL.getEmployeeById(id);
    res.json(employee);
});

router.route("/add").post(async (req, res) => {
    const department = req.body;
    const result = await employeeBLL.addEmployee(department);
    res.json(result);
});

// Route for injecting to DB
// router.route("/insertMany").post(async (req, res) => {
//     const users = req.body;
//     //console.log(users);
//     const result = await employeeBLL.insertMany(users);
//     res.json(result);
// });

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
