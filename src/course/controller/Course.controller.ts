// src/controllers/Course.controller.ts
import { Router, Request, Response } from "express";
import { CourseEntity } from "../entities/course.entity";
import { cards1 } from "../../Features/Data/Course-data";
import { CreateCourseDto } from "../Dto/course.dto";
import { Validationmiddlware } from "../../core/Validationmiddilware";
import { upload } from "../../Features/Middileware/upload.middileware";

export const Courserouter = Router();

/**
 * @swagger
 * /courses:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Barcha kurslarni olish
 *     description: Sistemadagi barcha kurslarni ro‘yxat shaklida qaytaradi
 *     responses:
 *       200:
 *         description: Kurslar ro‘yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       500:
 *         description: Server xatosi
 */
Courserouter.get("/", async (req: Request, res: Response) => {
    try {
        const courses = await CourseEntity.find();

        // birinchi marta bo‘lsa demo ma’lumotni yaratamiz
        if (courses.length === 0) {
            const newCourses = CourseEntity.create(cards1 as Partial<CourseEntity>[]);
            await CourseEntity.save(newCourses);
            return res.status(200).json(newCourses);
        }

        return res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        return res.status(500).send("xatolik yuz berdi");
    }
});

/**
 * @swagger
 * /courses:
 *   post:
 *     tags:
 *       - Courses
 *     summary: Yangi kurs qo‘shish
 *     description: Kurs nomi, tavsifi va rasmini (multipart/form-data) qabul qiladi
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CourseCreate'
 *     responses:
 *       201:
 *         description: Kurs muvaffaqiyatli yaratildi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Yaroqsiz request maʼlumotlari
 *       500:
 *         description: Server xatosi
 */
Courserouter.post(
    "/",
    Validationmiddlware(CreateCourseDto),
    upload.single("image"),
    async (req: Request, res: Response) => {
        try {


            const course = CourseEntity.create(req.body);
            const saved = await CourseEntity.save(course);
            return res.status(201).json(saved);
        } catch (error) {
            console.error(error);
            return res.status(500).send("xatolik yuz berdi");
        }
    }
);
