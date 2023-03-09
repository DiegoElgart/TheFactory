const actionsBLL = require("../BLL/actionsBLL");
const jwt = require("jsonwebtoken");

const checkMaxActionsById = async (req, res, next) => {
    try {
        const token = req.header("access-Token");
        const { id } = jwt.decode(token, process.env.SECRET_KEY);
        const actions = await actionsBLL.getActionsByIdAndDate(id);
        const len = actions.length - 1;
        console.log("Request from:", req.headers);
        if (actions[len].actionAllowed >= 1) {
            actions[len]["actionAllowed"] = actions[len]["actionAllowed"] - 1;
            await actionsBLL.addAction(actions[len]);
        } else {
            //res.status(400).json("No more actions for today");
            console.log("Done for the day");
        }
        next();
    } catch (err) {
        res.status(500).json("Internal error");
    }

    // try {
    //     console.log("Tried");
    //     next();
    //     //res.status(400).json("No more actions for today");
    // } catch (error) {
    //     console.log(error);
    // }
};

module.exports = checkMaxActionsById;
