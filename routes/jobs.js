const express = require('express');
const { scrapeJobs } = require('../services/scrapingService');
const db = require('../db/connection');

const router = express.Router();

// Obtener todos los empleos
router.get('/', async (req, res) => {
    console.log('Ruta /jobs alcanzada');
    try {
        const jobs = await db.select('*').from('jobs');
        res.json(jobs);
    } catch (error) {
        console.error('Error obteniendo empleos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ejecutar scraping manualmente
router.get('/scrape', async (req, res) => {
    try {
        await scrapeJobs();
        res.json({ message: 'Scraping completado y datos guardados' });
    } catch (error) {
        console.error('Error en scraping:', error);
        res.status(500).json({ error: 'Error en el scraping' });
    }
});

module.exports = router;
