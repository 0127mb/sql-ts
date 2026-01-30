import multer from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";


const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {

        callback(null, uploadDir);
    },

    filename: (req: Request, file, callback) => {
        const ext = path.extname(file.originalname);
        const filename = `image_${Date.now()}${ext}`;
        callback(null, filename);
    },
});

const fileFilter: multer.Options["fileFilter"] = (req, file, callback) => {
    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
        callback(new Error("Invalid file type"));
    } else {
        callback(null, true);
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {

        fileSize: 5 * 1024 * 1024, // 5MB
    },
});
