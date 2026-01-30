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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const enum_1 = require("../../core/constns/enum");
const review_entity_1 = require("../../Features/review/review.entity");
let User = class User extends typeorm_1.BaseEntity {
    id;
    email;
    full_name;
    phoneNumber;
    password;
    image;
    role;
    reviews;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 30 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 30, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "full_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 20, unique: true, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 128 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: enum_1.Role, default: enum_1.Role.User, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Reviews, reviews => reviews.user),
    __metadata("design:type", review_entity_1.Reviews)
], User.prototype, "reviews", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)("User")
], User);
//# sourceMappingURL=User.entity.js.map