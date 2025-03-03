// server/src/server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const adminRoutes = require('./routes/adminRoutes');
const hotelsRoutes = require('./routes/hotelsRoutes');
const vehiclesRoutes = require('./routes/vehiclesRoutes');
const regionsRoutes = require('./routes/regionsRoutes');
// const  setupWebSocket  = require('./config/websocket');
const cors = require('cors')

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["https://admin-dashboard-js6u.onrender.com", "http://localhost:5173"]
}));
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

app.get('/test', (req, res) => {
  res.status(200).send('Server is up.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });