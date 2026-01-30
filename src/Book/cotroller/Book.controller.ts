import {Router, Request, Response} from "express";
import {Book} from "../entity/book.entity";

import { upload } from "../../Features/Middileware/upload.middileware";
import {Validationmiddlware} from "../../core/Validationmiddilware";
import {CreateBookDto} from "../dto/book.dto";

const relationsToTest = ["author", "languages", "category"];


export const Bookrouter = Router();

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

Bookrouter.post("/", Validationmiddlware(CreateBookDto), upload.single('image'), async (req: Request, res: Response) => {
    const { title, discount, price_now, category, languages } = req.body;
    try {
        if (!title || !discount || !price_now || !category ) {
            return res.status(400).json({ message: 'Missing required fields: title, discount, price_now, category, author' });
        }

        const book = Book.create({ title, discount, price_now, category,  languages,});
        await Book.save(book);
        return res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error?.message || error });
    }
});



