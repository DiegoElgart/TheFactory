const usersWS = require("../DAL/usersWS");
const User = require("../models/userModel");
const actionsBLL = require("../BLL/actionsBLL");
const dateUtil = require("../utils/dateSetter");

const getAllUsersFromWs = async () => {
    let { data: users } = await usersWS.getAllUsers();

    users = users.map(user => {
        return {
            fullName: user.name,
            username: user.username,
            email: user.email,
        };
    });
    return users;
};

const getAllUsers = async () => {
    const users = await User.find();
    // const actions = users.map(user=>user)
    return users;
};

const getUserByEmailAndUsername = async (username, email) => {
    let users = await getAllUsersFromWs();
    const user = users.find(
        user => user.email === email && user.username === username
    );
    if (user) {
        const userDB = await User.findOne({ fullName: user.fullName });
        const actions = await actionsBLL.getActionsByIdAndDate(
            userDB._id.toString()
        );

        return {
            id: userDB._id,
            username: user.username,
            email: user.email,
            fullName: userDB.fullName,
            numOfActions: userDB.numOfActions,
        };
    }
    return false;
};

// For Injecting to DB
const insertMany = async arr => {
    const result = await User.insertMany(arr);
    return result;
};

const getUsersInfo = async () => {
    const usersDB = await getAllUsers();
    const date = dateUtil.getDate();

    const userWithActions = await Promise.all(
        usersDB.map(async user => {
            const actions = await actionsBLL.getActionsByIdAndDate(
                user._id.toString()
            );
            const action = actions[actions.length - 1];
            return {
                _id: user._id,
                fullName: user.fullName,
                numOfActions: user.numOfActions,
                actionAllowed: action
                    ? action.actionAllowed
                    : user.numOfActions,
            };
        })
    );

    return userWithActions;
};

module.exports = {
    getAllUsersFromWs,
    getUserByEmailAndUsername,
    insertMany,
    getAllUsers,
    getUsersInfo,
    // updateMaxActionsInDB,
};
