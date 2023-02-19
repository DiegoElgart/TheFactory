const jsonfile = require("jsonfile");
const file = "./data/actions.json";

const getActions = () => {
    return jsonfile.readFile(file);
};

const setActions = async obj => {
    await jsonfile.writeFile(file, obj);
    return "Done!";
};

module.exports = { getActions, setActions };
