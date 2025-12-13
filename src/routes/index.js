const router = require("express").Router();
const authRoutes = require("./auth");
const noteRoute = require("./notes");
router.use("/auth", authRoutes);
router.use("/notes", noteRoute);
module.exports = router;
