import {Router} from "express";
import {Validationmiddlware} from "../../../core/Validationmiddilware";
import {CreateDto} from "../dto/Level.dto";
import {upload} from "../../Middileware/upload.middileware";
import {LevelEntity} from "../entity/Level.entity";


export const LevelRouter = Router()
LevelRouter.post("/", Validationmiddlware(CreateDto), upload.single("image"), async (req, res) => {
    const createlevel = LevelEntity.create(req.body);
    await LevelEntity.save(createlevel);
    return res.status(201).json(req.body);
})