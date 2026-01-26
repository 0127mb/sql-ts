import { Router, Request, Response } from "express";
import { Author } from "../../entities/author.entity";
import { Category } from "../../entities/category.entity";
import { upload } from "../Middileware/upload.middileware";
import { validate } from "class-validator";
import { CreateAuthorDto } from "../../dto/author.dto";
import { Validationmiddlware } from "../../core/Validationmiddilware";

export const authorrouter = Router();

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

authorrouter.get("/books", async (req: Request, res: Response) => {
    try {
        const books = await require("../../entities/book.entity").Book.find({ relations: ["author", "category"] });
        return res.status(200).json(books);
    } catch (error) {
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
authorrouter.get("/", async (req: Request, res: Response) => {
    const getall = await Author.find({ relations: ['books'] })

    return res.status(200).json(getall)
});


authorrouter.post("/", upload.single('image'), Validationmiddlware(CreateAuthorDto), async (req: Request, res: Response) => {
    try {
        const dto = Object.assign(new Author(), req.body);
        const { authorId, name, surname } = req.body
        const newAuthor = Author.create(req.body);
        await Author.save(newAuthor);
        res.status(201).json(newAuthor);
    } catch (err) {
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
authorrouter.post("/", upload.single('image'), Validationmiddlware(CreateAuthorDto), async (req: Request, res: Response) => {
    try {
        const dto = Object.assign(new Author(), req.body);

        const newAuthor = Author.create(req.body);
        await Author.save(newAuthor);
        res.status(201).json(newAuthor);
    } catch (err) {
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
authorrouter.delete("/", async (req: Request, res: Response) => {
    const { id } = await req.body
    const find = await Author.findOne({ where: { id } })
    try {
        if (!id) {
            return res.status(400).send('the id must have in body')
        }
        const deleted = Author.remove(find)
        return res.status(200).json(deleted)
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error });
    }
})