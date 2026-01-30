"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookrouter = void 0;
const express_1 = require("express");
const book_entity_1 = require("../entity/book.entity");
const upload_middileware_1 = require("../../Features/Middileware/upload.middileware");
const Validationmiddilware_1 = require("../../core/Validationmiddilware");
const book_dto_1 = require("../dto/book.dto");
const relationsToTest = ["author", "languages", "category"];
exports.Bookrouter = (0, express_1.Router)();
/**
 * @swagger
 * books:
 *   post:
 *     tags:
 *       - Books
 *     summary: Create a new book
 *     description: Create a new book with image upload
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               discount:
 *                 type: number
 *               price_now:
 *                 type: number
 *               category:
 *                 type: string
 *               author:
 *                 type: string
 *               languages:
 *                 type: string
 *               cart:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *             required:
 *               - title
 *               - discount
 *               - price_now
 *               - category
 *               - author
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Server error
 */
exports.Bookrouter.post("/", (0, Validationmiddilware_1.Validationmiddlware)(book_dto_1.CreateBookDto), upload_middileware_1.upload.single('image'), async (req, res) => {
    const { title, discount, price_now, category, languages } = req.body;
    try {
        if (!title || !discount || !price_now || !category) {
            return res.status(400).json({ message: 'Missing required fields: title, discount, price_now, category, author' });
        }
        const book = book_entity_1.Book.create({ title, discount, price_now, category, languages, });
        await book_entity_1.Book.save(book);
        return res.status(201).json(book);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error?.message || error });
    }
});
//# sourceMappingURL=Book.controller.js.map