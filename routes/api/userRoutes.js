const router = require("express").Router();
const nanoid = require("nanoid");
const User = require("../../models/Users");

router.get("/", (req, res) => {
    User.findAll().then((userData) => {
        res.json(userData);
    });
});
// Login
router.get("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const userInfo = await User.findOne({
            where: {
                username: username
            }
        });

        // Check if not found.
        if (!userInfo) {
            res.status(404).json({
                message: "User not founds"
            });
            return;
        }

        // Check if valid password
        const validPass = await userInfo.passwordCheck(password);
        if (!validPass || userInfo.username !== username) {
            res.status(401).json({
                message: "Incorrect username or password"
            });
            return;
        }

        res.status(200).json({ user: userInfo, message: "Successful login" });
    } catch (e) {
        res.status(500).json(e);
    }
})

// Create user
router.post("/", async (req, res) => {
    try {
        const body = req.body;
        body.id = nanoid.nanoid();

        const user = await User.create(body);
        res.status(201).json(user);
    } catch (e) {
        res.status(500).json(e);
    }
})

// Change password
router.put("/changePassword/:id", async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const adminInfo = await Admin.findOne({
            where: {
                admin_id: req.params.id
            }
        });

        // Check if not found
        if (!adminInfo) {
            res.status(404).json({
                message: "User not found"
            });
            return
        }
        // Check if valid password
        const validPass = await adminInfo.passwordCheck(oldPassword);
        if (!validPass) {
            res
                .status(401)
                .json({ message: "Incorrect password." });
            return;
        }

        // If valid change password;
        const newAdmin = await Admin.update({ password: newPassword }, {
            where: {
                admin_id: req.params.id
            },
            individualHooks: true
        })
        res.status(200).json(newAdmin);
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;