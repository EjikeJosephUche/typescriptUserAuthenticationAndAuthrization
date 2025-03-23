"use strict";
// controllers/registerUserController
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../services/UserService"));
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield UserService_1.default.createUser(username, password);
                return res.status(201).json({
                    message: "User created Successfully",
                    user,
                });
            }
            catch (error) {
                return res.status(400).json({
                    message: "Error creating user",
                });
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const token = yield UserService_1.default.loginUser(username, password);
                return res.status(200).json({
                    message: 'Login successful',
                    token,
                });
            }
            catch (error) {
                return res.status(400).json({
                    message: "Invalid credentials"
                });
            }
        });
    }
}
exports.default = new UserController();
