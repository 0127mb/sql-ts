// author.controller.ts
import { Router, Request, Response } from "express";
import { Author } from "../../entities/author.entity";

export const authorrouter = Router();

authorrouter.get("/", async (req: Request, res: Response) => {
    try {
        const authors = await Author.find({ relations: ["books"] });
        res.json(authors);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});

authorrouter.post("/", async (req: Request, res: Response) => {
    try {
        const newAuthor = Author.create(req.body);
        await Author.save(newAuthor);
        res.status(201).json(newAuthor);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});
