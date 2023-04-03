"use strict";
const mongoose = require("mongoose");

const Score = new mongoose.Schema({
  semester: { type: String, required: true },
  scholastic: { type: String, required: true },
  coefficientFour: { type: Number, required: true },
  coefficientTen: { type: Number, required: true },
  studentId: { type: String, required: true },
});

module.exports = mongoose.model("Score", Score);
