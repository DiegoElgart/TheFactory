const actionsFile = require("../DAL/actionsFile");

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
    actions.push(obj);
    const data = { actions };
    const result = await actionsFile.setActions(data);
    return result;
};

const updateAction = async (id, obj) => {
    const actions = await getAllActions();
    const index = actions.findIndex(action => action.id === id);
    if (index !== -1) {
        action[index] = obj;
        const data = { actions };
        const result = await actionsFile.setActions(data);
        return result;
    }
    return "Wrong ID";
};

module.exports = { getAllActions, getActionsById, addAction, updateAction };
