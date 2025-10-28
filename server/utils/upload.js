const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// multer in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

function uploadToCloudinary(buffer, folder = 'mern-blog') {
  return new Promise((resolve, reject) => {
    const upload_stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(upload_stream);
  });
}

module.exports = { upload, uploadToCloudinary };
