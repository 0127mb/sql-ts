"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validationmiddlware = Validationmiddlware;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function Validationmiddlware(DtoClass) {
    return async (req, res, next) => {
        const dto = (0, class_transformer_1.plainToInstance)(DtoClass, req.body);
        const errors = await (0, class_validator_1.validate)(dto, {
            whitelist: true,
        });
        if (errors.length > 0) {
            const messages = errors.map(error => Object.values(error.constraints || {}))
                .flat();
            return res.status(400).json(messages);
        }
        req.body = dto;
        next();
    };
}
//# sourceMappingURL=Validationmiddilware.js.map