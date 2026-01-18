import { Category } from "../../entities/category.entity";
import { Request, Response, Router } from "express";
export const CategoryRouter = Router();

/**
* @swagger
* /api/categories/createCategory:
*   post:
*     tags:
*       - Categories
*     summary: Create a new category
*     description: Create a new category entry
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               who:
*                 type: string
*                 description: Category name
*               about:
*                 type: string
*                 description: Category description
*             required:
*               - who
*     responses:
*       200:
*         description: Category created successfully
*       400:
*         description: Invalid request body
*/
CategoryRouter.post("/createCategory", async (req: Request, res: Response) => {
    const { who, about } = req.body;
    const dto = Object.assign(new Category(), req.body)
    if (!who) {
        return res.status(400).send('Wrong request');
    }
    const createdcategory = Category.create({ who, about })
    const savedcategroy = await Category.save(createdcategory)
    return res.status(200).send(savedcategroy);
})