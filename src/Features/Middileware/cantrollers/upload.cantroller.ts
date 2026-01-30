import {Router, Request, Response} from "express";
import {upload} from "../upload.middileware";

export const uploadRouter = Router();

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
uploadRouter.post('/', upload.single("image"), async (req: Request, res: Response) => {
    //@ts-ignore
    if (!req.file) {
        return res.status(404).send("Not Found")
    }
    return res.status(201).send("created")
})