import {Router, Request, Response} from "express";
import {Book} from "../../entities/book.entity";

import { upload } from "../Middileware/upload.middileware";
import {Validationmiddlware} from "../../core/Validationmiddilware";
import {CreateBookDto} from "../../dto/book.dto";

const relationsToTest = ["author", "languages", "category", "cart"];


export const Bookrouter = Router();

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

Bookrouter.post("/", Validationmiddlware(CreateBookDto), upload.single('image'), async (req: Request, res: Response) => {
    const { title, discount, price_now, category, languages, cart } = req.body;
    try {
        if (!title || !discount || !price_now || !category ) {
            return res.status(400).json({ message: 'Missing required fields: title, discount, price_now, category, author' });
        }

        const book = Book.create({ title, discount, price_now, category,  languages, cart });
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

});
Bookrouter.get('/', async(req: Request, res: Response) => {
    const getall = Book.find({relations:['author', 'languages', 'category', 'cart']})
})