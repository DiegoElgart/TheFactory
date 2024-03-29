const express = require("express");
const usersWSBLL = require("../BLL/usersWSBLL");
const actionsMiddleware = require("../middleware/actionsMiddleware");

const router = express.Router();

router.route("/").get(async (req, res) => {
    const users = await usersWSBLL.getAllUsers();
    res.json(users);
});

router.route("/info").get(actionsMiddleware, async (req, res) => {
    const data = await usersWSBLL.getUsersInfo();
    res.json(data);
});
// Route for injecting to DB
// router.route("/insertMany").post(async (req, res) => {
//     const users = req.body;
//     const result = await usersWSBLL.insertMany(users);
//     res.json(result);
// });

module.exports = router;
