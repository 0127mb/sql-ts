import {BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Author } from "../../Author/entity/author.entity";
import { Book } from "../../Book/entity/book.entity";
import {join} from "node:path";
import {LevelEntity} from "../../Features/difficulty/entity/Level.entity";

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    who: string;
    @ManyToMany(()=>LevelEntity,level => level.category)
    @JoinColumn({ name: "level_id" })
    level: LevelEntity;
    @Column()
    about: string;
    @Column({ nullable: true })
    image: string;
    @ManyToOne(() => Author, author => author.category)
    Author: Author;
    @Column({nullable:true})
    bookId?: number;
    @ManyToMany(() => Book, book => book.category)
    @JoinColumn({ name: "bookId" })
    book: Book[];
}