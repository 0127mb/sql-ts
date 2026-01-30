"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Languagerauter = void 0;
const language_entity_1 = require("../entities/language.entity");
const express_1 = require("express");
const Validationmiddilware_1 = require("../../../core/Validationmiddilware");
const language_dto_1 = require("../dto/language.dto");
exports.Languagerauter = (0, express_1.Router)();
/**
 * @swagger
 * /language/api:
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
exports.Languagerauter.post('/api', (0, Validationmiddilware_1.Validationmiddlware)(language_dto_1.CreateLanguageDto), async (req, res) => {
    const { language } = req.body;
    const dto = Object.assign(new language_entity_1.Language(), req.body);
    if (!language) {
        return res.status(400).send("Language is required");
    }
    const creaedlangauge = language_entity_1.Language.create({ language });
    const savedlanguage = await language_entity_1.Language.save(creaedlangauge);
    return res.status(200).send(savedlanguage);
});
//# sourceMappingURL=Language.controller.js.map