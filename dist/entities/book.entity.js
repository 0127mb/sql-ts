"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const typeorm_1 = require("typeorm");
const author_entity_1 = require("./author.entity");
const language_entity_1 = require("../Features/languages/entities/language.entity");
const Cart_entity_1 = require("../Features/Cart/entites/Cart.entity");
const category_entity_1 = require("./category.entity");
let Book = class Book extends typeorm_1.BaseEntity {
    id;
    title;
    languages;
    cart;
    discount;
    price_now;
    image;
    category;
    author;
};
exports.Book = Book;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Book.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 128, nullable: true }),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => language_entity_1.Language, language => language.book),
    __metadata("design:type", Array)
], Book.prototype, "languages", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Cart_entity_1.Cart, cart => cart.book),
    __metadata("design:type", Cart_entity_1.Cart)
], Book.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 24, nullable: true }),
    __metadata("design:type", String)
], Book.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 24 }),
    __metadata("design:type", String)
], Book.prototype, "price_now", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Book.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => category_entity_1.Category, category => category.book),
    __metadata("design:type", Array)
], Book.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => author_entity_1.Author, author => author.books, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "authorId" }),
    __metadata("design:type", author_entity_1.Author)
], Book.prototype, "author", void 0);
exports.Book = Book = __decorate([
    (0, typeorm_1.Entity)("books")
], Book);
//# sourceMappingURL=book.entity.js.map