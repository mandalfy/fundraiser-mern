const Fundraiser = require("../models/Fundraiser");

// Create a new fundraiser
exports.createFundraiser = async (req, res) => {
   const { title, description, goalAmount } = req.body;
   try {
      const fundraiser = new Fundraiser({ title, description, goalAmount });
      await fundraiser.save();
      res.status(201).json(fundraiser);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Get all fundraisers
exports.getAllFundraisers = async (req, res) => {
   try {
      const fundraisers = await Fundraiser.find();
      res.status(200).json(fundraisers);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
