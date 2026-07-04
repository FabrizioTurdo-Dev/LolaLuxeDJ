const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = async (req, res) => {
  try {
    const imagenes = await cloudinary.search
      .expression('folder=lola-galery AND resource_type:image')
      .sort_by('created_at', 'desc')
      .max_results(500)
      .execute();

    const videos = await cloudinary.search
      .expression('folder=lola-galery AND resource_type:video')
      .sort_by('created_at', 'desc')
      .max_results(500)
      .execute();

    const recursos = [
      ...imagenes.resources,
      ...videos.resources
    ];

    res.status(200).json({
      success: true,
      count: recursos.length,
      resources: recursos.map(item => ({
        public_id: item.public_id,
        url: item.secure_url,
        width: item.width,
        height: item.height,
        resource_type: item.resource_type
      }))
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
