const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = async (req, res) => {
  try {
    console.log('🔍 [API] Iniciando consulta a Cloudinary...');
    console.log('🔍 [API] Cloud name:', process.env.CLOUDINARY_CLOUD_NAME ? 'configurado' : 'NO CONFIGURADO');
    console.log('🔍 [API] API Key:', process.env.CLOUDINARY_API_KEY ? 'configurado' : 'NO CONFIGURADO');
    console.log('🔍 [API] API Secret:', process.env.CLOUDINARY_API_SECRET ? 'configurado' : 'NO CONFIGURADO');

    const imagenes = await cloudinary.api.resources({
      resource_type: 'image',
      type: 'upload',
      prefix: 'lola-galery/',
      max_results: 500,
      direction: 'desc'
    });

    console.log('🔍 [API] Imágenes encontradas:', imagenes.resources.length);
    if (imagenes.resources.length > 0) {
      console.log('🔍 [API] Primera imagen public_id:', imagenes.resources[0].public_id);
    }

    const videos = await cloudinary.api.resources({
      resource_type: 'video',
      type: 'upload',
      prefix: 'lola-galery/',
      max_results: 500,
      direction: 'desc'
    });

    console.log('🔍 [API] Videos encontrados:', videos.resources.length);

    const recursos = [
      ...imagenes.resources,
      ...videos.resources
    ];

    console.log('🔍 [API] Total recursos:', recursos.length);

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
    console.error('❌ [API] Error:', error.message);
    console.error('❌ [API] Stack:', error.stack);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

