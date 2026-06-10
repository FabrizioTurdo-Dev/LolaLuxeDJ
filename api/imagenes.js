const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = async (req, res) => {
  try {
    const resultado = await cloudinary.api.resources({
      type: 'upload',
      max_results: 500,
      direction: 'desc'
    });

    res.status(200).json({
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
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};