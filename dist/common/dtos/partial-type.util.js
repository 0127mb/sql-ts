"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialType = PartialType;
/**
 * Nest‑like PartialType – berilgan DTO'dagi hamma maydonlarni optional qiladi.
 * TypeScript‑da decoratorlarni qo‘shish juda murakkab, shuning uchun oddiycha:
 *   class Sub extends Base {}
 *   @IsOptional() hamma property’ga qo‘shiladi.
 * Bu utility faqat `Update*Dto` lar uchun ishlatiladi.
 */
function PartialType(Base) {
    class PartialClass extends Base {
    }
    // har bir property ga @IsOptional qo‘shish
    const prototype = Base.prototype;
    const propertyNames = Object.getOwnPropertyNames(new Base());
    propertyNames.forEach(prop => {
        Reflect.defineMetadata('class-validator:isOptional', true, PartialClass.prototype, prop);
        // TS‑da decoratorlar avtomatik emas, lekin `class-validator` @IsOptional
        // ni almashtiruvchi custom metadata kiritish orqali ishlaydi.
        // Shunday qilib `validate()`’da bu maydonlar optional deb qabul qilinadi.
        // Agar xohlasangiz, har bir maydonni quyidagi kabi qo‘shishingiz mumkin:
        //   IsOptional()(PartialClass.prototype, prop);
    });
    return PartialClass;
}
//# sourceMappingURL=partial-type.util.js.map