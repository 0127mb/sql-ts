import 'dotenv/config';
import 'reflect-metadata';
import express, {Request, Response} from 'express';
import {AppDataSource} from './core/data-source';
import {Bookrouter} from "./Features/Libary/Book.controller";
import {authorrouter} from "./Features/Libary/Author.controller";
import {Courserouter} from "./Features/Libary/Course.controller";

const app = express();
app.use(express.json());


AppDataSource.initialize()
    .then(() => {
        console.log('Data connected');


        app.use("/authors", authorrouter);
        app.use("/books", Bookrouter);
        app.use('/course',Courserouter)


        app.listen(5000, () => console.log("Server is listening on port 5000"));
    })
    .catch((err) => {
        console.error('Database did not connect', err);
    });
