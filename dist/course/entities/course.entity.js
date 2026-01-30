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
exports.CourseEntity = void 0;
const typeorm_1 = require("typeorm");
const author_entity_1 = require("../../Author/entity/author.entity");
let CourseEntity = class CourseEntity extends typeorm_1.BaseEntity {
    id;
    x;
    title;
    author;
    discount;
    price_now;
    category;
    about;
    way;
    image;
};
exports.CourseEntity = CourseEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CourseEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 128 }),
    __metadata("design:type", String)
], CourseEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => author_entity_1.Author, author => author.courses, { onDelete: 'CASCADE' }),
    __metadata("design:type", author_entity_1.Author)
], CourseEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CourseEntity.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CourseEntity.prototype, "price_now", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseEntity.prototype, "about", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseEntity.prototype, "way", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CourseEntity.prototype, "image", void 0);
exports.CourseEntity = CourseEntity = __decorate([
    (0, typeorm_1.Entity)('courses')
], CourseEntity);
//# sourceMappingURL=course.entity.js.map