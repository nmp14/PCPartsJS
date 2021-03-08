const router = require("express").Router();
const User = require("../../models/Users");

router.get("/", (req, res) => {
    User.findAll().then((userData) => {
        res.json(userData);
    });
});

module.exports = router;