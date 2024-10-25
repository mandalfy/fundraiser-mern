const mongoose = require("mongoose");

const fundraiserSchema = new mongoose.Schema({
   title: { type: String, required: true },
   description: { type: String, required: true },
   goalAmount: { type: Number, required: true },
   amountRaised: { type: Number, default: 0 },
   createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Fundraiser", fundraiserSchema);
