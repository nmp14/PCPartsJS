const router = require("express").Router();
const userRoutes = require("./userRoutes");
const buildRoutes = require("./buildRoutes");

router.use("/users", userRoutes);
router.use("/builds", buildRoutes);

module.exports = router;