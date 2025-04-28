// config/upload.js

import multer from "multer";
import path from "path";

// Define the storage destination and filename for the uploaded files
export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination folder for uploaded files
        cb(null, "assets/uploads/avatars/");
    },

    filename: (req, file, cb) => {
        // Set the filename of the uploaded file
        const fileExt = path.extname(file.originalname); // Get file extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Add a unique suffix
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExt); // File name: avatar-<uniqueId>.jpg/png/etc.
    }
});

// Set file size limit and file type filters
export const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit for the avatar
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (mimeType && extname) {
            return cb(null, true); // Allow file
        }
        cb(new Error("Only image files (jpg, jpeg, png, gif) are allowed"), false); // Reject file
    }
});
