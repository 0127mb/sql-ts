"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Courserouter = void 0;
const express_1 = require("express");
const course_entity_1 = require("../../entities/course.entity");
const Course_data_1 = require("../../Data/Course-data");
exports.Courserouter = (0, express_1.Router)();
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
exports.Courserouter.post("/", async (req, res) => {
    try {
        const { title, full_name, discount, price_now, category, about, way } = req.body;
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
exports.Courserouter.put("/", async (req, res) => {
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
