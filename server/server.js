// server/src/server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const adminRoutes = require('./routes/adminRoutes');
const hotelsRoutes = require('./routes/hotelsRoutes');
const vehiclesRoutes = require('./routes/vehiclesRoutes');
const regionsRoutes = require('./routes/regionsRoutes');
// const  setupWebSocket  = require('./config/websocket');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/hotels', hotelsRoutes);
app.use('/api/vehicles', vehiclesRoutes);
app.use('/api/regions', regionsRoutes);

const db = require('./config/db')
db()
// // WebSocket setup
// const server = app.listen(PORT, () => {
//   console.log(`Server is running on port http://localhost:${PORT}`);
// });
// setupWebSocket(server);



app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });