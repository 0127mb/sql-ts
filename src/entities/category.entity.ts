import {BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Author} from "./author.entity";
import {Book} from "./book.entity";

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    who: string;
    @Column()
    about: string;
    @ManyToOne(() => Author, author => author.category)
    Author: Author;
    @ManyToMany(() => Book, book => book.category)
    book: Book[];
}