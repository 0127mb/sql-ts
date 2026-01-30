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
exports.Cart = void 0;
const typeorm_1 = require("typeorm");
const book_entity_1 = require("../../../Book/entity/book.entity");
let Cart = class Cart extends typeorm_1.BaseEntity {
    id;
    is_active;
    book;
};
exports.Cart = Cart;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Cart.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Cart.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => book_entity_1.Book, book => book.cart),
    __metadata("design:type", book_entity_1.Book)
], Cart.prototype, "book", void 0);
exports.Cart = Cart = __decorate([
    (0, typeorm_1.Entity)('Cart')
], Cart);
//# sourceMappingURL=Cart.entity.js.map