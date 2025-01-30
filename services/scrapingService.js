const puppeteer = require('puppeteer');
const db = require('../db/connection');

const scrapeJobs = async () => {
    const url = 'https://www.computrabajo.com.co/ofertas-de-trabajo/?q=frontend';

    try {
        const browser = await puppeteer.launch({
            headless: false, 
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-blink-features=AutomationControlled'
            ],
        });

        const page = await browser.newPage();
         await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        );
        await page.setViewport({ width: 1280, height: 800 });

        page.on('framenavigated', async (frame) => {
            console.log('🔄 Redirección detectada:', frame.url());
        });

  
        await page.goto(url, { waitUntil: 'networkidle0' }).catch(() => {
            console.log('🔁 Reintentando carga de la página...');
            return page.reload({ waitUntil: 'networkidle0' });
        });

      
        await page.waitForSelector('.box_offer', { timeout: 60000, visible: true });

    
        const jobs = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.box_offer')).map(job => ({
                title: job.querySelector('.js-o-link')?.innerText.trim() || 'No disponible',
                company: job.querySelector('.fs16')?.innerText.trim() || 'No disponible',
                location: job.querySelector('.fs13')?.innerText.trim() || 'No disponible',
                description: job.querySelector('.mb10')?.innerText.trim() || 'No disponible',
                link: job.querySelector('.js-o-link')?.href || 'No disponible',
            }));
        });

        await browser.close();

        if (jobs.length === 0) {
            console.log('No se encontraron trabajos.');
            return;
        }

        await db('jobs').insert(jobs);
        console.log('Trabajos guardados en la base de datos:', jobs.length);

    } catch (error) {
        console.error('Error en scraping:', error.message);
    }
};

module.exports = { scrapeJobs };
