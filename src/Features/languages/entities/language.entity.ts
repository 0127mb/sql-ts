import {BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Book} from "../../../Book/entity/book.entity";

@Entity("language")
export  class  Language extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    language:string;
    @ManyToMany(() => Book, book => book.languages)
    book:Book[];
}