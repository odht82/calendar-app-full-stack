const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Event = require("../models/eventModel");

//@route  GET  /api/events
const getEvents = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const events = await Event.find({ user: req.user.id });
  res.status(200).json(events);
});

//@route POST  /api/events
const createEvents = asyncHandler(async (req, res) => {
  const { title } = req.body;
  console.log(req);
  if (!title) {
    res.status(400);
    throw new Error("please add title");
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const eventsData = await Event.create({
    user: req.user.id,
    title,
    ...req.body,
  });
  res.status(200).json(eventsData);
});

//@route  DELETE  /api/events/:id
const deleteEvent = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("event not found");
  }
  if (event.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }
  await event.remove();
  res.status(200).json(event._id);
});

//@route  PUT  /api/events/:id
const updateEvent = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("event not found");
  }
  if (event.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }
  const updatedEvent = await Event.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedEvent);
});

module.exports = {
  getEvents,
  createEvents,
  updateEvent,
  deleteEvent,
};
