const router = require("express").Router();
const Build = require("../../models/Builds.js");

router.get("/checkAll/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const buildInfo = await Build.findAll({
            where: {
                user_id: id
            }
        });
        console.log(buildInfo);
        // If no builds found
        if (!buildInfo) {

            res.status(404).json(
                { message: "User not found" }
            );
            return;
        }

        res.status(200).json({ build: buildInfo, message: "Successfully retrived builds" });
    } catch (e) {
        res.status(500).json(e);
    }
})


module.exports = router;