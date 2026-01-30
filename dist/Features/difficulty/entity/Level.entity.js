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
exports.LevelEntity = void 0;
const typeorm_1 = require("typeorm");
const category_entity_1 = require("../../../Category/entity/category.entity");
let LevelEntity = class LevelEntity extends typeorm_1.BaseEntity {
    id;
    category;
    difficulty;
    image;
};
exports.LevelEntity = LevelEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LevelEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => category_entity_1.Category, category => category.level, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "category_id" }),
    __metadata("design:type", category_entity_1.Category)
], LevelEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LevelEntity.prototype, "difficulty", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LevelEntity.prototype, "image", void 0);
exports.LevelEntity = LevelEntity = __decorate([
    (0, typeorm_1.Entity)("course")
], LevelEntity);
//# sourceMappingURL=Level.entity.js.map