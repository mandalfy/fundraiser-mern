const express = require("express");
const mongoose = require("mongoose");
const fundraiserRoutes = require("./routes/fundraiser");
const Fundraiser = require("./models/Fundraiser");
const http = require('http'); 
const socketIo = require('socket.io');
const app = express();
const cors = require('cors');


require("dotenv").config();

app.use(cors());1
app.use(express.json());
app.use("/fundraisers", fundraiserRoutes);

//MONGO DB CONNECTION 
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log("Connected to MongoDB"))
   .catch(err => console.log("Failed to connect to MongoDB", err));

const port = process.env.PORT || 3000;
const server = http.createServer(app); 
const io = socketIo(server);

   server.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
   });

   io.on('connection', (socket) => {
      console.log('New client connected');
  
      // Listen for disconnections
      socket.on('disconnect', () => {
          console.log('Client disconnected');
      });
  });
  
   
app.get('/', (req, res) => {
   res.send('Welcome to our Fundraising platform!');
});


app.post('/fundraisers', async(req, res) => {
   try{
      const fundraiser=new Fundraiser(req.body);
      await fundraiser.save();
      res.status(201).send(fundraiser);
   } catch(error) {
      res.status(400).send(error);
   }
});

app.get('/fundraisers', async (req, res) => {
   try {
       const fundraisers = await Fundraiser.find();
       res.status(200).send({ message: 'Fundraisers retrieved successfully.', fundraisers });
   } catch (error) {
       res.status(500).send({ message: 'Error retrieving fundraisers.', error });
   }
});

app.get('/fundraisers/:id', async (req, res) => {
   try {
       const fundraiser = await Fundraiser.findById(req.params.id);
       if (!fundraiser) {
           return res.status(404).send({ message: 'Fundraiser not found.' });
       }
       res.status(200).send({ message: 'Fundraiser retrieved successfully.', fundraiser });
   } catch (error) {
       res.status(500).send({ message: 'Error retrieving fundraiser.', error });
   }
});

app.patch('/fundraisers/:id', async (req, res) => {
   try {
       const fundraiser = await Fundraiser.findByIdAndUpdate(req.params.id, req.body, { new: true });
       if (!fundraiser) {
           return res.status(404).send({ message: 'Fundraiser not found.' });
       }
       res.status(200).send({ message: 'Fundraiser updated.', fundraiser });
   } catch (error) {
       res.status(400).send({ message: 'Error updating fundraiser.', error });
   }
});

app.delete('/fundraisers/:id', async (req, res) => {
   try{
      const fundraiser = await Fundraiser.findByIdAndDelete(req.params.id);
      if(!fundraiser){
         return res.status(404).send({message: 'Fundraiser not found.'});
      }
      res.status(200).send({message: 'Fundraiser has been deleted sucessfully.', fundraiser});
   } catch (error){
      res.status(500).send({message: 'Error deleting the Fundraiser.', error});
   }
})

app.post('/donate', async (req, res) => {
   try {
       const donation = new Donation(req.body); 
       await donation.save();

       io.emit('newDonation', donation); // EMIT THE DONATION DATA TO ALL CONNECTED CLIENTS

       res.status(201).send(donation);
   } catch (error) {
       res.status(400).send(error);
   }
});


