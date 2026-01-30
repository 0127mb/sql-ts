import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Author} from "../../Author/entity/author.entity";


@Entity('courses')
export class CourseEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    x
    @Column({length: 128})
    title: string;
    @ManyToOne(() => Author, author => author.courses, {onDelete: 'CASCADE'})
    author: Author;
    @Column({nullable: true})
    discount: string;
    @Column({nullable: true})
    price_now: string;
    @Column()
    category: string;
    @Column()
    about: string;
    @Column()
    way: string;
    @Column({nullable: true})
    image?: string;
}