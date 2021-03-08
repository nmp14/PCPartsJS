const router = require("express").Router();
const userRoutes = reuire("./userRoutes");

router.use("/users", userRoutes);

module.exports = router;