"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorrouter = void 0;
const express_1 = require("express");
const author_entity_1 = require("../../entities/author.entity");
exports.authorrouter = (0, express_1.Router)();
exports.authorrouter.get("/", async (req, res) => {
    if (author_entity_1.Author.length === 0) {
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
        ];
        return res.json(cards);
    }
});
exports.authorrouter.post("/", async (req, res) => {
    try {
        const newAuthor = author_entity_1.Author.create(req.body);
        await author_entity_1.Author.save(newAuthor);
        res.status(201).json(newAuthor);
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});
