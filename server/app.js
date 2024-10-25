const express = require("express");
const mongoose = require("mongoose");
const fundraiserRoutes = require("./routes/fundraiser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/fundraisers", fundraiserRoutes);

app.get('/', (req, res) => {
   res.send('Welcome Barsha');
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log("Connected to MongoDB"))
   .catch(err => console.log("Failed to connect to MongoDB", err));

app.listen(port, () => {
   console.log(`Server running on http://localhost:${port}`);
});
