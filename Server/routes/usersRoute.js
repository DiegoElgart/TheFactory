const express = require("express");
const usersWSBLL = require("../BLL/usersWSBLL");
const actionsBLL = require("../BLL/actionsBLL");

const router = express.Router();

router.route("/").get(async (req, res) => {
    const users = await usersWSBLL.getAllUsers();

    res.json(users);
});

router.route("/actions").get(async (req, res) => {
    const { id } = req.body;
    const actions = await actionsBLL.getActionsById(id);
    res.json(actions);
});

// Route for injecting to DB
// router.route("/insertMany").post(async (req, res) => {
//     const users = req.body;
//     console.log(users);
//     const result = await usersBLL.insertMany(users);
//     res.json(result);
// });

module.exports = router;
