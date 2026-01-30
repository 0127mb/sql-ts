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
exports.Author = void 0;
const typeorm_1 = require("typeorm");
const book_entity_1 = require("../../Book/entity/book.entity");
const category_entity_1 = require("../../Category/entity/category.entity");
const course_entity_1 = require("../../course/entities/course.entity");
let Author = class Author extends typeorm_1.BaseEntity {
    id;
    authorId;
    name;
    image;
    category;
    books;
    courses;
};
exports.Author = Author;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Author.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Author.prototype, "authorId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Author.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Author.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => category_entity_1.Category, (category) => category.Author),
    __metadata("design:type", Array)
], Author.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => book_entity_1.Book, book => book.author),
    __metadata("design:type", Array)
], Author.prototype, "books", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => course_entity_1.CourseEntity, course => course.author),
    __metadata("design:type", Array)
], Author.prototype, "courses", void 0);
exports.Author = Author = __decorate([
    (0, typeorm_1.Entity)("Author")
], Author);
//# sourceMappingURL=author.entity.js.map