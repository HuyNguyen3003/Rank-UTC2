"use strict";
const mongoose = require("mongoose");

const Student = new mongoose.Schema({
  studentId: { type: String, required: true },
  fullname: { type: String, required: true },
  gender: { type: Boolean },
  hometown: { type: String },
  dayOfBirth: { type: Date },
  classId: { type: String, required: true },
});

module.exports = mongoose.model("Student", Student);
