const usersWS = require("../DAL/usersWS");
const User = require("../models/userModel");

const getAllUsers = async () => {
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

const getUserByEmailAndUsername = async (username, email) => {
    let users = await getAllUsers();
    const user = users.find(
        user => user.email === email && user.username === username
    );
    if (user) {
        const userDB = await User.findOne({ fullName: user.fullName });
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
// const insertMany = async arr => {
//     const result = await User.insertMany(arr);
//     return result;
// };
module.exports = {
    getAllUsers,
    getUserByEmailAndUsername,
    // updateMaxActionsInDB,
};
