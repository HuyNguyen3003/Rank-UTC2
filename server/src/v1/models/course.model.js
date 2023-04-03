"use strict";
const mongoose = require("mongoose");

const Course = new mongoose.Schema({
  courseId: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
});

module.exports = mongoose.model("Course", Course);
