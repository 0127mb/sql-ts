import { Router, Request, Response } from "express";
import { Book } from "../../entities/book.entity";

export const Bookrouter = Router();

Bookrouter.get('/', async (req: Request, res: Response) => {
    const books = await Book.find({ relations: ["author"] });
    res.json(books);
});

Bookrouter.post('/', async (req: Request, res: Response) => {
    const newBook = Book.create(req.body);
    await Book.save(newBook);
    res.status(201).json(newBook);
});
