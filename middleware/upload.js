// config/upload.js

import multer from "multer"; // Import multer
import path from "path"; // Import path module

// Define the storage destination and filename for uploaded files
export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "assets/uploads/avatars/"); // Set the destination folder
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname); // Get file extension (e.g., .jpg)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Unique suffix to avoid name conflicts
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExt); // Final file name: avatar-123456789.jpg
    }
});

// Create the multer upload instance separately
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/; // Allowed file types
        const mimeType = fileTypes.test(file.mimetype); // Check MIME type
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase()); // Check file extension
        if (mimeType && extname) {
            return cb(null, true); // Accept the file
        }
        cb(new Error("Only image files (jpg, jpeg, png, gif) are allowed"), false); // Reject the file
    }
});

// Export upload instance as default
export default upload;
