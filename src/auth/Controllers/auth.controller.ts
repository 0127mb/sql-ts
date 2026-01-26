import {Router, Request, Response, NextFunction} from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import {upload} from "../../Features/Middileware/upload.middileware";
import {Validationmiddlware} from "../../core/Validationmiddilware";
import {RegisterUserDto} from "../Dto/User.dto";
import {User} from "../entites/User.entity";
import {AuthMiddilware} from "../middilware/Auth.middilware";

export const AuthRouter = Router()
/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     description: Register a new user with email, phone number, password, and optional image upload.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               phoneNumber:
 *                 type: integer
 *               password:
 *                 type: string
 *                 format: password
 *               image:
 *                 type: string
 *                 format: binary
 *             required:
 *               - email
 *               - phoneNumber
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *         description: Email already exists or invalid input
 *       500:
 *         description: Server error
 */
AuthRouter.post('/register', upload.single("image"),
    Validationmiddlware(RegisterUserDto),
    async (req: Request, res: Response, next: NextFunction) => {
        const {phoneNumber, email, password} = req.body;
        const existing = await User.findOne({where: {phoneNumber: phoneNumber, email: email}});
        if (existing) {
            return res.status(400).send("Email already exists");

        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = User.create({phoneNumber, email, password: hashedPassword})
        await User.save(user);
        return res.status(201).send("successfully created user");
    })
/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User login
 *     description: Login with email, phone number, and password to receive a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               phoneNumber:
 *                 type: integer
 *               password:
 *                 type: string
 *                 format: password
 *             required:
 *               - email
 *               - phoneNumber
 *               - password
 *     responses:
 *       200:
 *         description: JWT token returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: User not found or password invalid
 *       500:
 *         description: Server error
 */
AuthRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const {email, phoneNumber, password} = req.body;
    const user = await User.findOne({where: {phoneNumber: phoneNumber, email: email}})
    if (!user) {
        return res.status(401).send('User not found or not added')
    }
    const ismatch = bcrypt.compare(password, user.password)
    if (!ismatch) {
        return res.status(401).send('User password invalid')
    }
    const token = jwt.sign({
            id: user.id,
            email: user.email,
            phoneNumber: user.phoneNumber

        }, process.env.secretkey || "secretkey",
        {expiresIn: '1d'}
    )
   return  res.json({token})
})
/**
 * @swagger
 * /auth/get:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Get current user
 *     description: Get the currently authenticated user (requires JWT token in Authorization header).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
AuthRouter.get('/get', AuthMiddilware, (req: Request, res: Response) => {
      return res.json({user: req.user})
})
console.log("AUTH ROUTER LOADED")