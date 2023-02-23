const actionsBLL = require("../BLL/actionsBLL");
router.route("/actions").get(async (req, res) => {
    const { id } = req.body;
    const actions = await actionsBLL.getActionsById(id);
    res.json(actions);
});

router.route("/actionsByID").get(async (req, res) => {
    const { id } = req.body;
    const actions = await actionsBLL.checkMaxActionsById(id);
    res.json(actions);
});

router.route("/actionsUpdate").get(async (req, res) => {
    const { id } = req.body;
    const actions = await actionsBLL.updateMaxActions(id);
    res.json(actions);
});

module.exports = router;
