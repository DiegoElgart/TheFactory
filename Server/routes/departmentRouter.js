const express = require("express");
const departmentBLL = require("../BLL/departmentBLL");

const router = express.Router();
router.route("/dep").post(async (req, res) => {
    try {
        const department = req.body;
        const result = await departmentBLL.addDepartment(department);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});

// Route for injecting to DB
router.route("/insertMany").post(async (req, res) => {
    const users = req.body;
    console.log(users);
    const result = await departmentBLL.insertMany(users);
    res.json(result);
});

module.exports = router;
