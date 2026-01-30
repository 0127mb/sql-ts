"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddilware = AuthMiddilware;
exports.Roles = Roles;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Config_1 = require("../../core/Config");
function AuthMiddilware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).send("No token provided");
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, Config_1.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).send("Invalid token");
    }
}
function Roles(...allowedRoles) {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !allowedRoles.includes(user.role)) {
            return res.status(403).send("You are not authorized to access this route");
        }
        next();
    };
}
//# sourceMappingURL=Auth.middilware.js.map