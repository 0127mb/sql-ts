import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity} from "typeorm";
import {Author} from "./author.entity";
import {isBooleanObject} from "node:util/types";

@Entity("Books")
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 128,nullable: true })
    title: string;

    @Column({length: 24, nullable: true})
    discount: string;
    @Column({length: 24, nullable: true})
    price_now: string;
    @Column({nullable: true, length: 20})
    category: string;
    @Column({length: 15, nullable: true})
    about: string;

    @Column({nullable: true})
    authorId: number;

    @ManyToOne(() => Author, author => author.books, {onDelete: "CASCADE", nullable: true})
    @JoinColumn({name: 'authorId'})
    author: Author;
}
