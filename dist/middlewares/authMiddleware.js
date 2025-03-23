"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer', '').trim();
    if (!token) {
        res.status(401).json({
            message: 'Access denied, token is missing'
        });
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        res.status(500).json({
            messge: 'server error: JWT_SECRET is not defined'
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        if (typeof decoded === 'object' && decoded !== null && '_id' in decoded && 'username' in decoded) {
            req.user = decoded;
        }
        next();
    }
    catch (error) {
        console.log('JWT verification failed', error);
        res.status(401).json({
            message: 'invalid token'
        });
    }
};
exports.default = authMiddleware;
