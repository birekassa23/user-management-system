// middlewares/upload.js

import multer from "multer";
import path from "path";

// Define storage for uploaded avatars
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "assets/uploads/avatars/");
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `avatar-${uniqueSuffix}${fileExt}`);
    }
});

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const mimeType = allowedTypes.test(file.mimetype);
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extName) {
        return cb(null, true);
    }
    cb(new Error("Only image files (jpeg, jpg, png, gif) are allowed"));
};

// Create multer instance
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter,
});

// Export upload instance
export default upload;
