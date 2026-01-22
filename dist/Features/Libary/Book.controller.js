"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookrouter = void 0;
const express_1 = require("express");
const book_entity_1 = require("../../entities/book.entity");
const upload_middileware_1 = require("../Middileware/upload.middileware");
const relationsToTest = ["author", "languages", "category", "cart"];
exports.Bookrouter = (0, express_1.Router)();
/**
 * @swagger
 * /api/books:
 *   post:
 *     tags:
 *       - Books
 *     summary: Create a new book
 *     consumes:
 *       - multipart/form-data
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
 */
exports.Bookrouter.post("/", upload_middileware_1.upload.single('image'), async (req, res) => {
    const { title, discount, price_now, category, languages, cart } = req.body;
    try {
        if (!title || !discount || !price_now || !category) {
            return res.status(400).json({ message: 'Missing required fields: title, discount, price_now, category, author' });
        }
        const book = book_entity_1.Book.create({ title, discount, price_now, category, languages, cart });
        await book_entity_1.Book.save(book);
        return res.status(201).json(book);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error?.message || error });
    }
});
/**
 * @swagger
 * /api/books:
 *   delete:
 *     tags:
 *       - Books
 *     summary: Delete a book
 *     description: Delete a book by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       203:
 *         description: Book deleted successfully
 *       500:
 *         description: Server error
 */
exports.Bookrouter.delete('/', async (req, res) => {
    const { id } = req.body;
    try {
        const newbooks = await book_entity_1.Book.findOne({ where: { id } });
        if (!newbooks) {
            res.send('kitob topilmadi');
        }
        await book_entity_1.Book.remove(newbooks);
        return res.status(203).send('Kitob ochirildi');
    }
    catch (error) {
        res.send(error);
    }
});
//# sourceMappingURL=Book.controller.js.map