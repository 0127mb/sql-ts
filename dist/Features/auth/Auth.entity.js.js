"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import {
//     Entity,
//     PrimaryGeneratedColumn,
//     Column,
//     CreateDateColumn,
//     UpdateDateColumn,
//     BaseEntity,
//     OneToMany,
// } from 'typeorm';
// // import { Favorite } from '../../favorites/entities/favorite.entity';
// // import { Cart } from '../../cart/entities/cart.entity';
//
// @Entity('users')
// export class User extends BaseEntity {
//     @PrimaryGeneratedColumn()
//     id: number;
//
//     @Column({ type: 'varchar', length: 100 })
//     name: string;
//
//     @Column({ type: 'varchar', length: 150, unique: true })
//     email: string;
//
//     @Column({ type: 'varchar' })
//     passwordHash: string;              // bcrypt‑hash
//
//     @Column({ default: 'user' })       // (optional) role: 'user' | 'admin'
//     role: string;
//
//     @CreateDateColumn()
//     createdAt: Date;
//
//     @UpdateDateColumn()
//     updatedAt: Date;
//
//     // ---- relations -------------------------------------------------
//     @OneToMany(() => Favorite, fav => fav.user)
//     favorites: Favorite[];
//
//     @OneToMany(() => Cart, cart => cart.user)
//     cartItems: Cart[];
// }
//# sourceMappingURL=Auth.entity.js.js.map