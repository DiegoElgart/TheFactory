const express = require("express");
const shiftBLL = require("../BLL/shiftBLL");
const Employee = require("../models/employeeModel");
const actionsMiddleware = require("../middleware/actionsMiddleware");

const router = express.Router();

router.route("/").get(actionsMiddleware, async (req, res) => {
    const shifts = await shiftBLL.getAllShifts();
    res.json(shifts);
});

router.route("/:id").get(actionsMiddleware, async (req, res) => {
    const { id } = req.params;
    const shift = await shiftBLL.getShiftById(id);
    res.json(shift);
});

router.route("/add").post(actionsMiddleware, async (req, res) => {
    const shift = req.body;
    const result = await shiftBLL.addShift(shift);
    res.json(result);
});

router
    .route("/addEmployeeToShift")
    .post(actionsMiddleware, async (req, res) => {
        const { shift, employee } = req.body;
        const result = await shiftBLL.addEmployeeToShift(shift, employee);
        res.json(result);
    });

// Route for injecting to DB
router.route("/insertMany").post(async (req, res) => {
    const users = req.body;
    const result = await shiftBLL.insertMany(users);
    res.json(result);
});

router.route("/:id").post(actionsMiddleware, async (req, res) => {
    const obj = req.body;
    const { id } = req.params;
    const result = await shiftBLL.updateShift(id, obj);
    res.json(result);
});

module.exports = router;
