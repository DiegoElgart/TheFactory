const express = require("express");
const departmentBLL = require("../BLL/departmentBLL");

const router = express.Router();

router.route("/").get(async (req, res) => {
    const depts = await departmentBLL.getAllDepartments();
    res.json(depts);
});

router.route("/:id").get(async (req, res) => {
    const { id } = req.params;
    const dept = await departmentBLL.getDepartmentById(id);
    res.json(dept);
});

router.route("/add").post(async (req, res) => {
    const department = req.body;
    const result = await departmentBLL.addDepartment(department);
    res.json(result);
});
router.route("/:id").post(async (req, res) => {
    const obj = req.body;
    const { id } = req.params;
    const result = await departmentBLL.updateDepartment(id, obj);
    res.json(result);
});

router.route("/:id").post(async (req, res) => {
    const { id } = req.params;
    const result = await departmentBLL.deleteDepartment(id);
    res.json(result);
});

// Route for injecting to DB
// router.route("/insertMany").post(async (req, res) => {
//     const users = req.body;
//     console.log(users);
//     const result = await departmentBLL.insertMany(users);
//     res.json(result);
// });

module.exports = router;
