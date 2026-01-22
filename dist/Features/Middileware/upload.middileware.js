"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uploadDir = path_1.default.join(process.cwd(), "uploads");
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir);
}
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, uploadDir);
    },
    filename: (req, file, callback) => {
        const ext = path_1.default.extname(file.originalname); // .png
        const filename = `image_${Date.now()}${ext}`;
        callback(null, filename);
    },
});
const fileFilter = (req, file, callback) => {
    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
    ];
    if (!allowedTypes.includes(file.mimetype)) {
        callback(new Error("Invalid file type"));
    }
    else {
        callback(null, true);
    }
};
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});
//# sourceMappingURL=upload.middileware.js.map