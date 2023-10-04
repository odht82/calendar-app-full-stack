const express = require("express");
const router = express.Router();
const {
  createEvents,
  getEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const { verify } = require("../middleware/authMiddleware");

router.post("/", verify, createEvents);
router.get("/", verify, getEvents);
router.put("/:id", verify, updateEvent);
router.delete("/:id", verify, deleteEvent);

module.exports = router;
