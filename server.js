const express = require('express');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const app = express();

cloudinary.config({
    cloud_name: "dfrlp8drp",
    api_key: "127854629763219",
    api_secret: "Q1QzZRKSeaKUMK1yg9FlnFrc9rg"
});
app.use(cors());
app.use(express.json());
app.use(express.static('./'));
 
// Ruta para obtener imágenes
app.get('/api/imagenes', async (req, res) => {
    try {
        const resultado = await cloudinary.api.resources({
            type: 'upload',
            max_results: 500,
            direction: 'desc'
        });
 
        res.json({
            success: true,
            count: resultado.resources.length,
            resources: resultado.resources.map(img => ({
                public_id: img.public_id,
                url: img.secure_url,
                width: img.width,
                height: img.height
            }))
        });
 
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});
 
// Para localhost
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`✅ Servidor en http://localhost:${PORT}`);
    });
}
 
// Exportar para Vercel
module.exports = app;