import {BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity("Favorite")
export class Favorite extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    is_liked:boolean;
    @Column()
    count:number;

}