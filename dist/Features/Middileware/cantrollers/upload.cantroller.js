"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRouter = void 0;
const express_1 = require("express");
const upload_middileware_1 = require("../upload.middileware");
exports.uploadRouter = (0, express_1.Router)();
/**
 * @swagger
 * /upload:
 *   post:
 *     tags:
 *       - Upload
 *     summary: Upload a file
 *     description: Upload an icon file
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Icon file to upload
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *       404:
 *         description: No file provided
 */
exports.uploadRouter.post('/', upload_middileware_1.upload.single("image"), async (req, res) => {
    //@ts-ignore
    if (!req.file) {
        return res.status(404).send("Not Found");
    }
    return res.status(201).send("created");
});
//# sourceMappingURL=upload.cantroller.js.map