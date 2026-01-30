import {Request, Response, Router} from 'express';
import {Book} from "../../../Book/entity/book.entity";
import {Validationmiddlware} from "../../../core/Validationmiddilware";
import {CreateReviewDto} from "../dto/review.dto";
import {User} from "../../../auth/entites/User.entity";
import bcrypt from "bcryptjs";
;


export const BookReviewController = Router()

/**
 * @swagger
 * reviews/books:
 *   post:
 *     tags:
 *       - Reviews
 *     summary: Kitob uchun review (baholash) yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewCreate'
 *     responses:
 *       201:
 *         description: Review muvaffaqiyatli yaratildi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Yaroqsiz ma'lumot yoki foydalanuvchi paroli noto‘g‘ri
 *       500:
 *         description: Server xatosi
 */
BookReviewController.post('/', Validationmiddlware(CreateReviewDto), async (req: Request, res: Response) => {
    const {grade,user_email,user_number,user_full_name,user_password, Comment} = req.body;

    try {
        const user = await User.findOne({where: {phoneNumber:user_number, email:user_email,full_name:user_full_name}})
        const ismatch  = await bcrypt.compare(user_password,user.password);

        if(!ismatch){
            return res.status(400).send("user password invalid")
        }
        if (!grade) {
            return res.status(400).send("kitobni baholang")
        }
        if (!Comment) {
            return res.status(400).send("comment yozishingiz shart")
        }
        const createReview = await Book.create(req.body)
        await Book.save(createReview);
        return res.status(201).json(createReview);
    } catch (err) {
        return res.status(400).send(err)
    }
})