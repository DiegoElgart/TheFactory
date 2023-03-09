const actionsBLL = require("../BLL/actionsBLL");
const dateUtil = require("../utils/dateSetter");
const jwt = require("jsonwebtoken");

const checkMaxActionsById = async (req, res, next) => {
    try {
        const token = req.header("access-Token");
        const { id } = jwt.decode(token, process.env.SECRET_KEY);
        console.log(id);
        const date = dateUtil.getDate();
        const actions = await actionsBLL.getActionsById(id);
        const actionsByDate = actions.filter(action => action.date === date);
        const len = actionsByDate.length - 1;
        if (actionsByDate[len].actionAllowed >= 1) {
            actionsByDate[len]["actionAllowed"] =
                actionsByDate[len]["actionAllowed"] - 1;
            await actionsBLL.addAction(actionsByDate[len]);
            next();
        } else {
            res.status(400).json("No more actions for today");
        }
    } catch (err) {
        res.status(500).json("Internal Error");
    }
};

module.exports = checkMaxActionsById;
