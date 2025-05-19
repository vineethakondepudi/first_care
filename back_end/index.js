const express = require('express');
const path = require('path');
const cors = require('cors');
const registrationRoute = require('./routing/router');

// Import MongoDB connection
require('./db/server');




const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "https://first-care-1.onrender.com", // your frontend domain
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Routes
app.use('/', registrationRoute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



