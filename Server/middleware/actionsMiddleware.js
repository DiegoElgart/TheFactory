const actionsBLL = require("../BLL/actionsBLL");
const dateUtil = require("../utils/dateSetter");

const checkMaxActionsById = async (req, res, next) => {
    try {
        const actionsForId = await actionsBLL.getAllActions();

        const id = actionsForId[actionsForId.length - 1].id;
        const date = dateUtil.getDate();
        const actions = await actionsBLL.getActionsById(id);
        const actionsByDate = actions.filter(action => action.date === date);

        const len = actionsByDate.length - 1;
        if (actionsByDate[len].actionAllowed >= 1) {
            actionsByDate[len]["actionAllowed"] =
                actionsByDate[len]["actionAllowed"] - 1;
            actionsBLL.addAction(actionsByDate[len]);
            next();
        } else {
            res.status(400).json("No more actions for today");
        }
    } catch (err) {
        res.status(400).json("No more actions for today");
    }
};

module.exports = checkMaxActionsById;
