"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Courserouter = void 0;
// src/controllers/Course.controller.ts
const express_1 = require("express");
const course_entity_1 = require("../entities/course.entity");
const Course_data_1 = require("../../Features/Data/Course-data");
const course_dto_1 = require("../Dto/course.dto");
const Validationmiddilware_1 = require("../../core/Validationmiddilware");
const upload_middileware_1 = require("../../Features/Middileware/upload.middileware");
exports.Courserouter = (0, express_1.Router)();
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
exports.Courserouter.get("/", async (req, res) => {
    try {
        const courses = await course_entity_1.CourseEntity.find();
        // birinchi marta bo‘lsa demo ma’lumotni yaratamiz
        if (courses.length === 0) {
            const newCourses = course_entity_1.CourseEntity.create(Course_data_1.cards1);
            await course_entity_1.CourseEntity.save(newCourses);
            return res.status(200).json(newCourses);
        }
        return res.status(200).json(courses);
    }
    catch (error) {
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
exports.Courserouter.post("/", (0, Validationmiddilware_1.Validationmiddlware)(course_dto_1.CreateCourseDto), upload_middileware_1.upload.single("image"), async (req, res) => {
    try {
        const course = course_entity_1.CourseEntity.create(req.body);
        const saved = await course_entity_1.CourseEntity.save(course);
        return res.status(201).json(saved);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("xatolik yuz berdi");
    }
});
//# sourceMappingURL=Course.controller.js.map