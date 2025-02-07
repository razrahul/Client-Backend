import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

// Multer Storage Configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); 
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); 
//   }
// });

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);  
  } else {
    cb('Invalid file type. Only images are allowed.', false);
  }
};

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },  
}).single('image');  

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

export const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return result.secure_url;  
  } catch (error) {
    console.log('Cloudinary upload error:', error);
    throw new Error('Error uploading image to Cloudinary');
  }
};

export { upload };
