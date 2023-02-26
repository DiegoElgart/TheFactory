const express = require("express");
const shiftBLL = require("../BLL/shiftBLL");

const router = express.Router();

router.route("/").get(async (req, res) => {
    const shifts = await shiftBLL.getAllShifts();
    res.json(shifts);
});

router.route("/:id").get(async (req, res) => {
    const { id } = req.params;
    const shift = await shiftBLL.getShiftById(id);
    res.json(shift);
});

router.route("/add").post(async (req, res) => {
    const shift = req.body;
    const result = await shiftBLL.addShift(shift);
    res.json(result);
});

// Route for injecting to DB
// router.route("/insertMany").post(async (req, res) => {
//     const users = req.body;
//     //console.log(users);
//     const result = await shiftBLL.insertMany(users);
//     res.json(result);
// });

router.route("/:id").post(async (req, res) => {
    const obj = req.body;
    const { id } = req.params;
    const result = await shiftBLL.updateShift(id, obj);
    res.json(result);
});

module.exports = router;
