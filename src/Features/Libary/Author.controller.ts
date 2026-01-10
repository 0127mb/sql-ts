import {Router, Request, Response} from "express";
import {Author} from "../../entities/author.entity";


export const authorrouter = Router();

authorrouter.get("/", async (req: Request, res: Response) => {

    if (Author.length === 0) {
        const cards = [{
            name: "Robert",
            surname: 'Fisher',
        },
            {
                name: "Jonatan",
                surname: "Dez"
            },
            {
                name: "Andre",
                surname: 'Miladze'
            }, {
                name: "David",
                surname: 'Bronstein'
            }, {
                name: "Mikhail",
                surname: "Litvin"
            }

        ]
        return res.json(cards)
    }
});


authorrouter.post("/", async (req: Request, res: Response) => {
    try {
        const newAuthor = Author.create(req.body);
        await Author.save(newAuthor);
        res.status(201).json(newAuthor);
    } catch (err) {
        res.status(500).json({message: "Server error", error: err});
    }
});
