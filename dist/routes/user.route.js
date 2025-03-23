"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const router = express_1.default.Router();
router.post('/register', (req, res) => {
    userController_1.default.createUser(req, res);
});
router.post('/login', (req, res) => {
    userController_1.default.loginUser(req, res);
});
exports.default = router;
