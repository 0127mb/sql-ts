"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Languagerauter = void 0;
const language_entity_1 = require("../languages/entities/language.entity");
const express_1 = require("express");
exports.Languagerauter = (0, express_1.Router)();
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
exports.Languagerauter.post('/', async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(404).send("Not Found");
    }
    const creaedlangauge = language_entity_1.Language.create();
    const savedlanguage = await language_entity_1.Language.save(creaedlangauge);
    return res.status(200).send(savedlanguage);
});
//# sourceMappingURL=Language.cantroller.js.map