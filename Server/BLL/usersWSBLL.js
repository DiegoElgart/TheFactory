const usersWS = require("../DAL/usersWS");
const User = require("../models/userModel");
const actionsBLL = require("../BLL/actionsBLL");

const getAllUsers = async () => {
    let { data: users } = await usersWS.getAllUsers();

    const updatedUsers = await Promise.all(
        users.map(async user => {
            const userDB = await User.findOne({ fullName: user.name });
            const actions = await actionsBLL.getActionsById(userDB._id);
            return {
                id: userDB._id,
                fullName: userDB.name,
                username: user.username,
                email: user.email,
                actionAllowed: actions,
            };
        })
    );

    return updatedUsers;
};

const getUserByEmailAndUsername = async (username, email) => {
    let users = await getAllUsers();
    const user = users.find(
        user => user.email === email && user.username === username
    );
    if (user) {
        const userDB = await User.findOne({ fullName: user.name });
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

// const updateMaxActionsInDB = async id => {
//     const user = await User.findById(id);
//     user.numOfActions = user.numOfActions - 1;
//     const result = await user.save();
//     console.log(result);
// };
// For Injecting to DB
const insertMany = async arr => {
    const result = await User.insertMany(arr);
    return result;
};
module.exports = {
    getAllUsers,
    getUserByEmailAndUsername,
    insertMany,
    // updateMaxActionsInDB,
};
