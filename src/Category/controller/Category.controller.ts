import { Category } from "../entity/category.entity";
import { Request, Response, Router } from "express";
import { upload } from "../../Features/Middileware/upload.middileware";
import {Validationmiddlware} from "../../core/Validationmiddilware";
import {CreateAuthorDto} from "../../Author/dto/author.dto";
import {CreateCategoryDto} from "../dto/category.dto";
export const CategoryRouter = Router();

CategoryRouter.post("/createCategory", Validationmiddlware(CreateCategoryDto),upload.single('image'), async (req: Request, res: Response) => {
    const { who, about } = req.body;
    const dto = Object.assign(new Category(), req.body)
    if (!who) {
        return res.status(400).send('Wrong request');
    }
    const createdcategory = Category.create({ who, about, image: req.path })
    const savedcategroy = await Category.save(createdcategory)
    return res.status(200).send(savedcategroy);
})
/**
 * @swagger
 * /categories/createCategory:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Create a new category
 *     description: Create a new category entry with image upload
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               who:
 *                 type: string
 *                 description: Category name
 *               about:
 *                 type: string
 *                 description: Category description
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Category image file
 *             required:
 *               - who
 *     responses:
 *       200:
 *         description: Category created successfully
 *       400:
 *         description: Invalid request body
 */
CategoryRouter.post("/createCategory", upload.single('image'), async (req: Request, res: Response) => {
    const { who, about } = req.body;
    const dto = Object.assign(new Category(), req.body)
    if (!who) {
        return res.status(400).send('Wrong request');
    }
    const createdcategory = Category.create({ who, about, image: req.path })
    const savedcategroy = await Category.save(createdcategory)
    return res.status(200).send(savedcategroy);
})
/**
* @swagger
* /api/categories/createCategory:
*   post:
*     tags:
*       - Categories
*     summary: Create a new category
*     description: Create a new category entry with image upload
*     requestBody:
*       required: true
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               who:
*                 type: string
*                 description: Category name
*               about:
*                 type: string
*                 description: Category description
*               image:
*                 type: string
*                 format: binary
*                 description: Category image file
*             required:
*               - who
*     responses:
*       200:
*         description: Category created successfully
*       400:
*         description: Invalid request body
*/
CategoryRouter.post("/createCategory", upload.single('image'), async (req: Request, res: Response) => {
    const { who, about } = req.body;
    const dto = Object.assign(new Category(), req.body)
    if (!who) {
        return res.status(400).send('Wrong request');
    }
    const createdcategory = Category.create({ who, about, image: req.path })
    const savedcategroy = await Category.save(createdcategory)
    return res.status(200).send(savedcategroy);
})