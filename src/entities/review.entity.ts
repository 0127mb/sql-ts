import {BaseEntity, Column, PrimaryGeneratedColumn} from "typeorm";

 export class rewiew extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    user_full_name!: string;
    @Column()
    user_email?: string;
    @Column()
    user_number?:number;
    @Column()
    about!:string;
    @Column()
    grade!:number;
}