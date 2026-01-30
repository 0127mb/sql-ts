"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorrouter = void 0;
const express_1 = require("express");
const author_entity_1 = require("../../entities/author.entity");
const upload_middileware_1 = require("../Middileware/upload.middileware");
const author_dto_1 = require("../../dto/author.dto");
const Validationmiddilware_1 = require("../../core/Validationmiddilware");
exports.authorrouter = (0, express_1.Router)();
/**
 * @swagger
 * /books:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get all books
 *     description: Retrieve a list of all books with their authors and categories
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
exports.authorrouter.get("/books", async (req, res) => {
    try {
        const books = await require("../../entities/book.entity").Book.find({ relations: ["author", "category"] });
        return res.status(200).json(books);
    }
    catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
});
/**
 * @swagger
 * /authors:
 *   get:
 *     tags:
 *       - Authors
 *     summary: Get all authors
 *     description: Retrieve a list of all authors with their books
 *     responses:
 *       200:
 *         description: List of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /authors/profile:
 *   get:
 *     summary: Get author profile (protected)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 */
exports.authorrouter.get("/profile", async (req, res) => {
    res.status(200).json({ message: "Protected author profile" });
});
exports.authorrouter.get("/", async (req, res) => {
    const getall = await author_entity_1.Author.find({ relations: ['books'] });
    return res.status(200).json(getall);
});
exports.authorrouter.post("/", upload_middileware_1.upload.single('image'), (0, Validationmiddilware_1.Validationmiddlware)(author_dto_1.CreateAuthorDto), async (req, res) => {
    try {
        const dto = Object.assign(new author_entity_1.Author(), req.body);
        const { authorId, name, surname } = req.body;
        const newAuthor = author_entity_1.Author.create(req.body);
        await author_entity_1.Author.save(newAuthor);
        res.status(201).json(newAuthor);
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});
/**
 * @swagger
 * /authors:
 *   post:
 *     tags:
 *       - Authors
 *     summary: Create a new author
 *     description: Create a new author entry with image upload
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               authorId:
 *                 type: integer
 *                 description: Author ID
 *               name:
 *                 type: string
 *                 description: Author name
 *               surname:
 *                 type: string
 *                 description: Author surname
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Author image file
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Author created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       500:
 *         description: Server error
 */
exports.authorrouter.post("/", upload_middileware_1.upload.single('image'), (0, Validationmiddilware_1.Validationmiddlware)(author_dto_1.CreateAuthorDto), async (req, res) => {
    try {
        const dto = Object.assign(new author_entity_1.Author(), req.body);
        const newAuthor = author_entity_1.Author.create(req.body);
        await author_entity_1.Author.save(newAuthor);
        res.status(201).json(newAuthor);
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});
/**
 * @swagger
 * /api/authors:
 *   delete:
 *     tags:
 *       - Authors
 *     summary: Delete an author
 *     description: Delete an author by ID
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
 *       200:
 *         description: Author deleted successfully
 *       400:
 *         description: ID is required
 *       500:
 *         description: Server error
 */
exports.authorrouter.delete("/", async (req, res) => {
    const { id } = await req.body;
    const find = await author_entity_1.Author.findOne({ where: { id } });
    try {
        if (!id) {
            return res.status(400).send('the id must have in body');
        }
        const deleted = author_entity_1.Author.remove(find);
        return res.status(200).json(deleted);
    }
    catch (error) {
        return res.status(500).json({ message: "Server error", error: error });
    }
});
//# sourceMappingURL=Author.controller.js.map