import 'reflect-metadata'
import {DataSource} from "typeorm"
import {Book} from "../Book/entity/book.entity";
import {Author} from "../Author/entity/author.entity";
import {CourseEntity} from "../course/entities/course.entity";

import {Category} from "../Category/entity/category.entity";
import {Language} from "../Features/languages/entities/language.entity";

import {User} from "../auth/entites/User.entity";
import {Reviews} from "../Features/review/review.entity";
import {LevelEntity} from "../Features/difficulty/entity/Level.entity";
export const AppDataSource = new DataSource({type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "123456",
    database: process.env.DB_NAME || "homework",
    entities: [Book, Author, CourseEntity,Category,Language,User,Reviews,LevelEntity],
    synchronize: true,
    logging: true
})
