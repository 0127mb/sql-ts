"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookReviewController = void 0;
const express_1 = require("express");
const book_entity_1 = require("../../../Book/entity/book.entity");
const Validationmiddilware_1 = require("../../../core/Validationmiddilware");
const review_dto_1 = require("../dto/review.dto");
const User_entity_1 = require("../../../auth/entites/User.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
;
exports.BookReviewController = (0, express_1.Router)();
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
exports.BookReviewController.post('/', (0, Validationmiddilware_1.Validationmiddlware)(review_dto_1.CreateReviewDto), async (req, res) => {
    const { grade, user_email, user_number, user_full_name, user_password, Comment } = req.body;
    try {
        const user = await User_entity_1.User.findOne({ where: { phoneNumber: user_number, email: user_email, full_name: user_full_name } });
        const ismatch = await bcryptjs_1.default.compare(user_password, user.password);
        if (!ismatch) {
            return res.status(400).send("user password invalid");
        }
        if (!grade) {
            return res.status(400).send("kitobni baholang");
        }
        if (!Comment) {
            return res.status(400).send("comment yozishingiz shart");
        }
        const createReview = await book_entity_1.Book.create(req.body);
        await book_entity_1.Book.save(createReview);
        return res.status(201).json(createReview);
    }
    catch (err) {
        return res.status(400).send(err);
    }
});
//# sourceMappingURL=Book.review.controller.js.map