"use strict";
const mongoose = require("mongoose");

const Class = new mongoose.Schema({
  classId: { type: String, required: true, unique: true },
  className: { type: String, required: true },
  courseId: { type: String, required: true },
  majorsId: { type: String },
});

module.exports = mongoose.model("Class", Class);
