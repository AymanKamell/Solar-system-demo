const path = require('path');
const express = require('express');
const OS = require('os');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/')));

// Serve local images
app.use('/images', express.static(path.join(__dirname, 'images')));

// MongoDB connection
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('❌ MONGO_URI environment variable is required!');
  process.exit(1);
}

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Schema
const planetSchema = new mongoose.Schema({
  name: String,
  id: Number,
  description: String,
  image: String,
  velocity: String,
  distance: String
});

const Planet = mongoose.model('planets', planetSchema);

// Routes
app.post('/planet', (req, res) => {
  const id = req.body.id;

  if (id == null) {
    return res.status(400).json({ error: "Missing 'id' in request body" });
  }

  Planet.findOne({ id: id }, (err, planetData) => {
    if (err) {
      console.error('DB query error:', err);
      return res.status(500).json({ error: "Database error" });
    }
    if (!planetData) {
      return res.status(404).json({ error: "Planet not found" });
    }

    const response = {
      ...planetData.toObject(),
      image: `/images/${planetData.image}`
    };
    res.json(response);
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/os', (req, res) => {
  res.json({
    os: OS.hostname(),
    env: process.env.NODE_ENV
  });
});

app.get('/live', (req, res) => {
  res.json({ status: 'live' });
});

app.get('/ready', (req, res) => {
  res.json({ status: 'ready' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
