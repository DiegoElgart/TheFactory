const express = require("express");
const usersWSBLL = require("../BLL/usersWSBLL");

const router = express.Router();

router.route("/").get(async (req, res) => {
    const users = await usersWSBLL.getAllUsers();
    res.json(users);
});

// Route for injecting to DB
router.route("/insertMany").post(async (req, res) => {
    const users = req.body;
    const result = await usersWSBLL.insertMany(users);
    res.json(result);
});

module.exports = router;
