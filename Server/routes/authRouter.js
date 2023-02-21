const express = require("express");
const jwt = require("jsonwebtoken");
const usersWSBLL = require("../BLL/usersWSBLL");
const actionsBLL = require("../BLL/actionsBLL");
const dateSetter = require("../utils/dateSetter");

require("dotenv").config();

const router = express.Router();

// Entry point 'http://localhost:4000/auth'

router.route("/login").post(async (req, res) => {
    const { username, email } = req.body;
    const user = await usersWSBLL.getUserByEmailAndUsername(username, email);
    if (user) {
        const userId = user.id;
        const ACCESS_SECRET_TOKEN = process.env.SECRET_KEY;
        const accessToken = jwt.sign({ id: userId }, ACCESS_SECRET_TOKEN);
        const actions = await actionsBLL.checkMaxActionsById(userId.toString());
        console.log(actions);
        actionsBLL.addAction({
            id: userId,
            maxActions: user.numOfActions,
            date: dateSetter.getDate(),
            actionAllowed: user.numOfActions,
        });
        res.json({ accessToken, user });
    } else {
        res.status(401).json("Wrong Email or Username");
    }
});

module.exports = router;
