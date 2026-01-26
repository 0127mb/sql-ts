"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
const category_entity_1 = require("../../entities/category.entity");
const express_1 = require("express");
const upload_middileware_1 = require("../Middileware/upload.middileware");
const Validationmiddilware_1 = require("../../core/Validationmiddilware");
const category_dto_1 = require("../../dto/category.dto");
exports.CategoryRouter = (0, express_1.Router)();
exports.CategoryRouter.post("/createCategory", (0, Validationmiddilware_1.Validationmiddlware)(category_dto_1.CreateCategoryDto), upload_middileware_1.upload.single('image'), async (req, res) => {
    const { who, about } = req.body;
    const dto = Object.assign(new category_entity_1.Category(), req.body);
    if (!who) {
        return res.status(400).send('Wrong request');
    }
    const createdcategory = category_entity_1.Category.create({ who, about, image: req.path });
    const savedcategroy = await category_entity_1.Category.save(createdcategory);
    return res.status(200).send(savedcategroy);
});
/**
 * @swagger
 * /api/categories/createCategory:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Create a new category
 *     description: Create a new category entry with image upload
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               who:
 *                 type: string
 *                 description: Category name
 *               about:
 *                 type: string
 *                 description: Category description
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Category image file
 *             required:
 *               - who
 *     responses:
 *       200:
 *         description: Category created successfully
 *       400:
 *         description: Invalid request body
 */
exports.CategoryRouter.post("/createCategory", upload_middileware_1.upload.single('image'), async (req, res) => {
    const { who, about } = req.body;
    const dto = Object.assign(new category_entity_1.Category(), req.body);
    if (!who) {
        return res.status(400).send('Wrong request');
    }
    const createdcategory = category_entity_1.Category.create({ who, about, image: req.path });
    const savedcategroy = await category_entity_1.Category.save(createdcategory);
    return res.status(200).send(savedcategroy);
});
/**
* @swagger
* /api/categories/createCategory:
*   post:
*     tags:
*       - Categories
*     summary: Create a new category
*     description: Create a new category entry with image upload
*     requestBody:
*       required: true
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               who:
*                 type: string
*                 description: Category name
*               about:
*                 type: string
*                 description: Category description
*               image:
*                 type: string
*                 format: binary
*                 description: Category image file
*             required:
*               - who
*     responses:
*       200:
*         description: Category created successfully
*       400:
*         description: Invalid request body
*/
exports.CategoryRouter.post("/createCategory", upload_middileware_1.upload.single('image'), async (req, res) => {
    const { who, about } = req.body;
    const dto = Object.assign(new category_entity_1.Category(), req.body);
    if (!who) {
        return res.status(400).send('Wrong request');
    }
    const createdcategory = category_entity_1.Category.create({ who, about, image: req.path });
    const savedcategroy = await category_entity_1.Category.save(createdcategory);
    return res.status(200).send(savedcategroy);
});
//# sourceMappingURL=Category.controller.js.map