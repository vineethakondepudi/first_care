const express = require('express');
const path = require('path');
const cors = require('cors');
const registrationRoute = require('./routing/router');
const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Import MongoDB connection
require('./db/server');





const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "https://first-care-1.onrender.com", // your frontend domain
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Routes
app.use('/', registrationRoute);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



