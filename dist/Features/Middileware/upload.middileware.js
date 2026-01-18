"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "/uploads");
    },
    filename: (req, file, callback) => {
        const [originName, extension] = file.originalname.split(".");
        const filename = `${originName}_${Date.now()}-${extension}`;
        callback(null, filename);
    }
});
const filter = (req, file, callback) => {
    const Allowedtypess = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!Allowedtypess.includes((file.minetype))) {
        callback(new Error("Invalid file type"));
    }
    else {
        callback(null, true);
    }
};
exports.upload = (0, multer_1.default)({
    storage,
    filter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});
//# sourceMappingURL=upload.middileware.js.map