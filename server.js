const express = require('express');
const cors = require('cors');
const db = require('./db/connection');
const jobRoutes = require('./routes/jobs');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Rutas
app.use('/jobs', jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
