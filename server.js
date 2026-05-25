const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
mongoose.connection.on('connected', () => {
  console.log('Conectado com MongoDB');
});

// Routes
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
