const router = require("express").Router();
const {createPersonalNotes, getPersonalNotes} = require("../controllers/personalNotes");
const authMiddleware = require("../middleware/authMiddleware");
const {deletePersonalNotes} = require("../controllers/personalNotes");
const {updatePersonalNotes} = require("../controllers/personalNotes");

router.post("/createNotes",authMiddleware, createPersonalNotes);
router.delete("/deleteNotes/:id",authMiddleware, deletePersonalNotes);
router.put("/updateNotes/:id",authMiddleware, updatePersonalNotes);
router.get("/getNotes",authMiddleware,getPersonalNotes); 
module.exports = router;
