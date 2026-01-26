import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("Users")
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id?: number;
    @Column({unique:true,length:30})
    email!: string;
    @Column({unique:true})
    phoneNumber!:number
    @Column({unique:true,length:128})
    password!: string;
    @Column({length:30,nullable:true})
    image?: string;
}