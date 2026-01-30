import {BaseEntity, Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "../../../Category/entity/category.entity";

@Entity("course")
export class LevelEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToMany(() => Category, category => category.level, {onDelete: "CASCADE"})
    @JoinColumn({name: "category_id"})
    category: Category;
    @Column()
    difficulty: string;
    @Column()
    image: string;
}