const axios = require("axios");

const getAllUsers = () => {
    return axios.get("https://jsonplaceholder.typicode.com/users");
};

module.exports = { getAllUsers };
