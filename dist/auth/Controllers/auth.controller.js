"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const upload_middileware_1 = require("../../Features/Middileware/upload.middileware");
const Validationmiddilware_1 = require("../../core/Validationmiddilware");
const User_dto_1 = require("../Dto/User.dto");
const User_entity_1 = require("../entites/User.entity");
const Auth_middilware_1 = require("../middilware/Auth.middilware");
const Config_1 = require("../../core/Config");
exports.AuthRouter = (0, express_1.Router)();
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
 *                 type: string
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
exports.AuthRouter.post('/register', upload_middileware_1.upload.single("image"), (0, Validationmiddilware_1.Validationmiddlware)(User_dto_1.RegisterUserDto), async (req, res, next) => {
    const { phoneNumber, email, password } = req.body;
    const existing = await User_entity_1.User.findOne({ where: { phoneNumber: phoneNumber, email: email } });
    if (existing) {
        return res.status(400).send("Email already exists");
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 12);
    const user = User_entity_1.User.create({ phoneNumber, email, password: hashedPassword });
    await User_entity_1.User.save(user);
    return res.status(201).send("successfully created user");
});
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
 *                 type: string
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
exports.AuthRouter.post('/login', async (req, res, next) => {
    const { full_name, email, phoneNumber, password } = req.body;
    const user = await User_entity_1.User.findOne({ where: { phoneNumber, email } });
    if (!user) {
        return res.status(401).send('User not found or not added');
    }
    const ismatch = await bcryptjs_1.default.compare(password, user.password);
    if (!ismatch) {
        return res.status(401).send('User password invalid');
    }
    const payload = {
        id: user.id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
    };
    const token = jsonwebtoken_1.default.sign(payload, Config_1.JWT_SECRET, { expiresIn: "3h" });
    const refreshToken = jsonwebtoken_1.default.sign(payload, Config_1.JWT_REFRESH, { expiresIn: "1d" });
    return res.json({ token, refreshToken });
    next();
});
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
exports.AuthRouter.get('/get', Auth_middilware_1.AuthMiddilware, (req, res) => {
    return res.json({ user: req.user });
});
console.log("AUTH ROUTER LOADED");
//# sourceMappingURL=auth.controller.js.map