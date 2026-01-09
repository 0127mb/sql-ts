import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { Author } from "./author.entity";

@Entity("Books")
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 128 })
    title: string;

    @Column()
    description: string;

    @Column()
    authorId: number;

    @ManyToOne(() => Author, author => author.books, { onDelete: "RESTRICT" })
    @JoinColumn({ name: 'authorId' })
    author: Author;
}
