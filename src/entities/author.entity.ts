import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Book} from "./book.entity";

@Entity("Author")
export class Author extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    surname: string;

    @OneToMany(() => Book, book => book.author)
    books: Book[];
}
