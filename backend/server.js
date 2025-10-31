const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//  Charger les variables d'environnement
dotenv.config();

// Connexion à MongoDB
connectDB();

// Initialiser l'application Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir les fichiers statiques (images locales)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

//  Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
