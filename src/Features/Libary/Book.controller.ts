import {Router, Request, Response} from "express";
import {Book} from "../../entities/book.entity";
import {Author} from "../../entities/author.entity";
import {authorrouter} from "./Author.controller";
import {cards} from "../../Data/Book.data";


export const Bookrouter = Router();

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
Bookrouter.get('/', async (req: Request, res: Response) => {

    try {

        let relationsToTest = ["author", "languages", "category", "cart"];
        let books = null;
        let errorRelation = null;
        for (const rel of relationsToTest) {
            try {
                books = await Book.find({ relations: [rel] });
            } catch (err) {
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

        books = await Book.find({ relations: relationsToTest });
        return res.status(200).json(books);
    } catch (error) {
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
Bookrouter.post("/", async (req: Request, res: Response) => {
    const {title, discount, price_now, category, author, languages, cart} = req.body;
    const dto = Object.assign(new Book(), req.body)
    try {
        if (!title || !discount || !price_now || !category || !author) {
            return res.status(400).json({ message: 'Missing required fields: title, discount, price_now, category, author' });
        }

        const book = Book.create({ title, discount, price_now, category, author, languages, cart });
        await Book.save(book);
        return res.status(201).json(book);
    } catch (error) {
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
Bookrouter.delete('/', async (req: Request, res: Response) => {
    const {id} = req.body
    try {
        const newbooks = await Book.findOne({where: {id}})
        if (!newbooks) {
            res.send('kitob topilmadi')
        }
        await Book.remove(newbooks)
        return res.status(203).send('Kitob ochirildi')
    } catch (error) {
        res.send(error);
    }

})
