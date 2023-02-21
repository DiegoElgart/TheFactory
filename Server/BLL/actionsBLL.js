const actionsFile = require("../DAL/actionsFile");
const usersBLL = require("../BLL/usersWSBLL");
const dateUtil = require("../utils/dateSetter");

const getAllActions = async () => {
    const { actions } = await actionsFile.getActions();
    return actions;
};

const getActionsById = async id => {
    const actions = await getAllActions();
    return actions.filter(action => action.id === id);
};

const addAction = async obj => {
    const actions = await getAllActions();
    // const actionsById = await checkMaxActionsById(obj.id.toString());

    actions.push(obj);
    const data = { actions };
    const result = await actionsFile.setActions(data);
    return result;
};

const updateAction = async (id, obj) => {
    const actions = await getAllActions();
    const index = actions.findIndex(action => action.id === id);
    console.log(index);
    if (index !== -1) {
        action[index] = obj;
        const data = { actions };
        const result = await actionsFile.setActions(data);
        return result;
    }
    return "Wrong ID";
};

const checkMaxActionsById = async id => {
    const date = dateUtil.getDate();
    const actions = await getActionsById(id);
    const actionsByDate = actions.filter(action => action.date === date);
    if (actionsByDate.length >= 1) {
        const len = actionsByDate.length - 1;
        if (actionsByDate[len].actionAllowed > 1) {
            return actionsByDate[len].actionAllowed;
        }
        return "No More Actions for today";
    }
    return "No More Actions for today";
};

const updateMaxActions = async id => {
    const date = dateUtil.getDate();
    const actions = await getActionsById(id);
    const actionsByDate = actions.filter(action => action.date === date);
    const len = actionsByDate.length - 1;
    if (actionsByDate[len].actionAllowed > 0) {
        actionsByDate[len]["actionAllowed"] =
            actionsByDate[len]["actionAllowed"] - 1;
        addAction(actionsByDate[len]);
        return actionsByDate[len];
    } else {
        return "No More Actions for today";
    }
};

module.exports = {
    getAllActions,
    getActionsById,
    addAction,
    updateAction,
    checkMaxActionsById,
    updateMaxActions,
};
