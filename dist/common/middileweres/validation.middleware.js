"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDto = validateDto;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
/**
 * DTO klassiga asoslangan request body validator.
 * `validateDto(MyDto)` ni route‑ga qo‘shish kifoya.
 */
function validateDto(dtoClass) {
    return async (req, res, next) => {
        const dto = (0, class_transformer_1.plainToInstance)(dtoClass, req.body);
        const errors = await (0, class_validator_1.validate)(dto, {
            whitelist: true, // DTO'da yo‘q atributlar o‘chiriladi
            forbidNonWhitelisted: true, // NO‑TO‑PROVIDE – xato qaytaradi
        });
        if (errors.length) {
            const messages = errors.flatMap(err => Object.values(err.constraints || {}));
            return res.status(400).json({ errors: messages });
        }
        // typed DTOni requestga o‘rnatib, service ga uzatamiz
        req.body = dto;
        next();
    };
}
//# sourceMappingURL=validation.middleware.js.map