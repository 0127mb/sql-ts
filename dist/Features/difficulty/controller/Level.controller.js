"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelRouter = void 0;
const express_1 = require("express");
const Validationmiddilware_1 = require("../../../core/Validationmiddilware");
const Level_dto_1 = require("../dto/Level.dto");
const upload_middileware_1 = require("../../Middileware/upload.middileware");
const Level_entity_1 = require("../entity/Level.entity");
exports.LevelRouter = (0, express_1.Router)();
exports.LevelRouter.post("/", (0, Validationmiddilware_1.Validationmiddlware)(Level_dto_1.CreateDto), upload_middileware_1.upload.single("image"), async (req, res) => {
    const createlevel = Level_entity_1.LevelEntity.create(req.body);
    await Level_entity_1.LevelEntity.save(createlevel);
    return res.status(201).json(req.body);
});
//# sourceMappingURL=Level.controller.js.map