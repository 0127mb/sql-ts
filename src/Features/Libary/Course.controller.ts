import {Router, Request, Response} from "express";
import {CourseEntity} from "../../entities/course.entity";
import {cards1} from "../../Data/Course-data";

export const Courserouter = Router();
Courserouter.get("/", async (req: Request, res: Response) => {
    try {
        const course = await CourseEntity.find();

        if (course.length === 0) {
            const newcard = CourseEntity.create(cards1 as Partial<CourseEntity>[]);
            await CourseEntity.save(newcard);

            await CourseEntity.save(newcard);
            return res.status(200).send(newcard);
        }

        return res.status(200).send(course);

    } catch (error) {
        return res.status(500).send("xatolik yuz berdi");
    }
});

Courserouter.post("/", async (req: Request, res: Response) => {
    try {
        const {
            title,
            full_name,
            discount,
            price_now,
            category,
            about,
            way
        } = req.body;

        if (!title || !full_name || !discount || !price_now || !category || !about || !way) {
            return res.status(400).send("body should not be empty or invalid");
        }

        const course = CourseEntity.create(req.body);
        const saved_cards = await CourseEntity.save(course);

        return res.status(201).send(saved_cards);

    } catch (error) {
        return res.status(500).send("xatolik yuz berdi");
    }
});
Courserouter.put("/", async (req: Request, res: Response) => {
    try {
        const {
            id,
            title,
            full_name,
            discount,
            price_now,
            category,
            about,
            way
        } = req.body;


        if (!id || !title || !full_name || !discount || !price_now || !category || !about || !way) {
            return res.status(400).json({
                message: "Body to‘liq emas"
            });
        }


        const course = await CourseEntity.findOne({ where: { id } });
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

        const updatedCourse = await CourseEntity.save(course);

        return res.status(200).json({
            message: "Course muvaffaqiyatli yangilandi",
            course: updatedCourse
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error
        });
    }
});
