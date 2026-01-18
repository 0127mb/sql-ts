"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Courserouter = void 0;
const express_1 = require("express");
const course_entity_1 = require("../../entities/course.entity");
const Course_data_1 = require("../../Data/Course-data");
const course_dto_1 = require("../../dto/course.dto");
exports.Courserouter = (0, express_1.Router)();
/**
 * @swagger
 * /api/courses:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Get all courses
 *     description: Retrieve a list of all courses
 *     responses:
 *       200:
 *         description: List of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       500:
 *         description: Server error
 */
exports.Courserouter.get("/", async (req, res) => {
    try {
        const course = await course_entity_1.CourseEntity.find();
        if (course.length === 0) {
            const newcard = course_entity_1.CourseEntity.create(Course_data_1.cards1);
            await course_entity_1.CourseEntity.save(newcard);
            await course_entity_1.CourseEntity.save(newcard);
            return res.status(200).send(newcard);
        }
        return res.status(200).send(course);
    }
    catch (error) {
        return res.status(500).send("xatolik yuz berdi");
    }
});
/**
 * @swagger
 * /api/courses:
 *   post:
 *     tags:
 *       - Courses
 *     summary: Create a new course
 *     description: Create a new course entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Server error
 */
exports.Courserouter.post("/", async (req, res) => {
    try {
        const { title, full_name, discount, price_now, category, about, way } = req.body;
        const dto = Object.assign(new course_dto_1.CreateCourseDto(), req.body);
        if (!title || !full_name || !discount || !price_now || !category || !about || !way) {
            return res.status(400).send("body should not be empty or invalid");
        }
        const course = course_entity_1.CourseEntity.create(req.body);
        const saved_cards = await course_entity_1.CourseEntity.save(course);
        return res.status(201).send(saved_cards);
    }
    catch (error) {
        return res.status(500).send("xatolik yuz berdi");
    }
});
/**
 * @swagger
 * /api/courses:
 *   put:
 *     tags:
 *       - Courses
 *     summary: Update a course
 *     description: Update an existing course by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               title:
 *                 type: string
 *               full_name:
 *                 type: string
 *               discount:
 *                 type: number
 *               price_now:
 *                 type: number
 *               category:
 *                 type: string
 *               about:
 *                 type: string
 *               way:
 *                 type: string
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       404:
 *         description: Course not found
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Server error
 */
exports.Courserouter.post("/", async (req, res) => {
    try {
        const { id, title, full_name, discount, price_now, category, about, way } = req.body;
        if (!id || !title || !full_name || !discount || !price_now || !category || !about || !way) {
            return res.status(400).json({
                message: "Body to‘liq emas"
            });
        }
        const course = await course_entity_1.CourseEntity.findOne({ where: { id } });
        if (!course) {
            return res.status(404).json({ message: "Raqam topilmadi" });
        }
        course.title = title;
        course.full_name = full_name;
        course.discount = discount;
        course.price_now = price_now;
        course.category = category;
        course.about = about;
        course.way = way;
        const updatedCourse = await course_entity_1.CourseEntity.save(course);
        return res.status(200).json({
            message: "Course muvaffaqiyatli yangilandi",
            course: updatedCourse
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Server error",
            error
        });
    }
});
//# sourceMappingURL=Course.controller.js.map