const actionsBLL = require("../BLL/actionsBLL");
const jwt = require("jsonwebtoken");

const checkMaxActionsById = async (req, res, next) => {
    try {
        const token = req.header("access-Token");
        const { id } = jwt.decode(token, process.env.SECRET_KEY);

        const actions = await actionsBLL.getActionsByIdAndDate(id);
        const len = actions.length - 1;

        if (actions[len].actionAllowed >= 1) {
            actionsByDate[len]["actionAllowed"] =
                actionsByDate[len]["actionAllowed"] - 1;
            console.log(actionsByDate[len]);
            await actionsBLL.addAction(actionsByDate[len]);
        } else {
            res.status(400).json("No more actions for today");
        }
        next();
    } catch (err) {
        res.status(500).json("Internal error");
    }
};

module.exports = checkMaxActionsById;
