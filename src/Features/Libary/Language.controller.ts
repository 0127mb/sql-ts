import {Language} from "../languages/entities/language.entity";
import {Request, Response, Router} from "express";

export const Languagerauter = Router()

/**
 * @swagger
 * /api/languages:
 *   post:
 *     tags:
 *       - Languages
 *     summary: Create a new language
 *     description: Create a new language entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: Language ID
 *     responses:
 *       200:
 *         description: Language created successfully
 *       404:
 *         description: ID not found
 */
Languagerauter.post('/',async (req: Request, res: Response) => {
    const { language } = req.body;
    const dto = Object.assign(new Language(), req.body)
    if (!language) {
        return res.status(400).send("Language is required");
    }
    const creaedlangauge = Language.create({ language });
    const savedlanguage = await Language.save(creaedlangauge);
    return res.status(200).send(savedlanguage);
})