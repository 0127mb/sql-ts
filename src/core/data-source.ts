import 'reflect-metadata'
import {DataSource} from "typeorm"
import {Book} from "../entities/book.entity";
import {Author} from "../entities/author.entity";
import {CourseEntity} from "../entities/course.entity";
export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DB_URL,
    entities: [Book, Author, CourseEntity],
    synchronize: true,
    logging: true
})
