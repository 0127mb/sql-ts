import {Router, Request, Response} from "express";
import {Book} from "../../entities/book.entity";
import {Author} from "../../entities/author.entity";
import {authorrouter} from "./Author.controller";
import {cards} from "../../Data/Book.data";


export const Bookrouter = Router();

Bookrouter.get('/', async (req: Request, res: Response) => {

    try {

        const books = await Book.find({relations: ['author']});
        if (books.length === 0) {
            const newcard = Book.create(cards)
            await Book.save(newcard)
            const savedcards = await Book.find
            ({relations: ['author']})
            return res.status(200).json(savedcards)
        }
        return res.status(200).json(books);
    } catch (error) {
        res.status(500).json({message: "Server error", error: error});
    }
});

Bookrouter.post("/", async (req: Request, res: Response) => {
    const [title, discount, price_now, category, about,name,surname] = req.body;
    try{
        if(!title || !discount || !price_now || !category || about || !name|| surname){
            res.send('body toliq toldirish majburiy')
        }
        const book = Book.create(req.body);
        await Book.save(book)
        return res.status(201).json(req.body).send('created')
    }
    catch(error){

        res.send(error)
    }
});

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
