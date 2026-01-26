"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddilware = AuthMiddilware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function AuthMiddilware(req, res, next) {
    const authheader = req.headers.authorization;
    if (!authheader) {
        return res.status(401).send("No token provided");
    }
    const token = authheader.split('')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.secretkey || "secretkey");
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).send("No token provided");
    }
}
//# sourceMappingURL=Auth.middilware.js.map