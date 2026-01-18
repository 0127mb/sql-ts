"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
const category_entity_1 = require("../../entities/category.entity");
const express_1 = require("express");
exports.CategoryRouter = (0, express_1.Router)();
/**
* @swagger
* /api/categories/createCategory:
*   post:
*     tags:
*       - Categories
*     summary: Create a new category
*     description: Create a new category entry
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               who:
*                 type: string
*                 description: Category name
*               about:
*                 type: string
*                 description: Category description
*             required:
*               - who
*     responses:
*       200:
*         description: Category created successfully
*       400:
*         description: Invalid request body
*/
exports.CategoryRouter.post("/createCategory", async (req, res) => {
    const { who, about } = req.body;
    const dto = Object.assign(new category_entity_1.Category(), req.body);
    if (!who) {
        return res.status(400).send('Wrong request');
    }
    const createdcategory = category_entity_1.Category.create({ who, about });
    const savedcategroy = await category_entity_1.Category.save(createdcategory);
    return res.status(200).send(savedcategroy);
});
//# sourceMappingURL=Category.controller.js.map