import express from 'express';

import mongoose from 'mongoose';

import cors from 'cors';

import bodyParser from 'body-parser';

import path from 'path';



// Initialize Express app 

const app = express();

const port = process.env.PORT || 3000;



// Middleware 

app.use(cors()); // Enable CORS for all requests 

app.use(bodyParser.json()); // Parse JSON request bodies 



// Serve static files from the 'public' directory 

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'public')));



// MongoDB connection 

const mongoURI = 'mongodb://localhost:27017/TrackingData';

mongoose.connect(mongoURI, {

    useNewUrlParser: true,

    useUnifiedTopology: true

})

    .then(() => {

        console.log('Connected to MongoDB');

    })

    .catch((err) => {

        console.error('Error connecting to MongoDB:', err);

    });



// Define schema and model for UserData with timeSpent 

const userDataSchema = new mongoose.Schema({

    timestamp: { type: String, required: true },

    event: { type: String, required: true },

    description: { type: String, required: true },

    timeSpent: { type: Number, default: 0 }, // Store time spent in seconds 

});



const UserData = mongoose.model('UserData', userDataSchema);



// API endpoint to save user data 

app.post('/api/userdata', async (req, res) => {

    console.log("Received event data:", req.body); // Log incoming data 

    try {

        const newUserData = new UserData(req.body);

        await newUserData.save();

        res.status(201).json({ message: 'UserData saved successfully!' });

    } catch (error) {

        console.error('Error saving data:', error);

        res.status(500).json({ error: 'Failed to save user data' });

    }

});



// API endpoint to fetch all user data 

app.get('/api/userdata', async (req, res) => {

    try {

        const userData = await UserData.find();

        res.status(200).json(userData);

    } catch (error) {

        console.error('Error fetching data:', error);

        res.status(500).json({ error: 'Failed to fetch user data' });

    }

});



// Root route to serve a welcome message 

app.get('/', (req, res) => {

    res.send('Welcome to the TrackingData API');

});



// Start server 

app.listen(port, () => {

    console.log(`Server running at http://localhost:${port}`);

});



