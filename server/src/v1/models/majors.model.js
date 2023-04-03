"use strict";
const mongoose = require("mongoose");

const Majors = new mongoose.Schema({
  majorsId: { type: String, required: true },
  majorsName: { type: String, required: true },
});

module.exports = mongoose.model("Majors", Majors);
