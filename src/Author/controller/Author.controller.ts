import { Router, Request, Response } from "express";
import { Author } from "../entity/author.entity";
import { Category } from "../../Category/entity/category.entity";
import { upload } from "../../Features/Middileware/upload.middileware";
import { validate } from "class-validator";
import { CreateAuthorDto } from "../dto/author.dto";
import { Validationmiddlware } from "../../core/Validationmiddilware";

export const authorrouter = Router();

/**
 * @swagger
 * books:
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
        const books = await require("../../Book/entity/book.entity").Book.find({ relations: ["author", "category"] });
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
authorrouter.get("/profile", async (req: Request, res: Response) => {

    res.status(200).json({ message: "Protected author profile" });
});

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

