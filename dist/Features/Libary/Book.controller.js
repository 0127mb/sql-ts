"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookrouter = void 0;
const express_1 = require("express");
const book_entity_1 = require("../../entities/book.entity");
exports.Bookrouter = (0, express_1.Router)();
/**
 * @swagger
 * /api/books:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get all books
 *     description: Retrieve a list of all books with their authors, languages, categories, and carts
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Server error
 */
exports.Bookrouter.get('/', async (req, res) => {
    try {
        let relationsToTest = ["author", "languages", "category", "cart"];
        let books = null;
        let errorRelation = null;
        for (const rel of relationsToTest) {
            try {
                books = await book_entity_1.Book.find({ relations: [rel] });
            }
            catch (err) {
                errorRelation = rel;
                break;
            }
        }
        if (errorRelation) {
            return res.status(500).json({
                message: `Server error: relation '${errorRelation}' is misconfigured or missing`,
                error: errorRelation
            });
        }
        books = await book_entity_1.Book.find({ relations: relationsToTest });
        return res.status(200).json(books);
    }
    catch (error) {
        console.error('Book GET error:', error);
        return res.status(500).json({
            message: "Server error",
            error: error?.message || error,
            stack: error?.stack || null
        });
    }
});
/**
 * @swagger
 * /api/books:
 *   post:
 *     tags:
 *       - Books
 *     summary: Create a new book
 *     description: Create a new book entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Server error
 */
exports.Bookrouter.post("/", async (req, res) => {
    const { title, discount, price_now, category, author, languages, cart } = req.body;
    const dto = Object.assign(new book_entity_1.Book(), req.body);
    try {
        if (!title || !discount || !price_now || !category || !author) {
            return res.status(400).json({ message: 'Missing required fields: title, discount, price_now, category, author' });
        }
        const book = book_entity_1.Book.create({ title, discount, price_now, category, author, languages, cart });
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