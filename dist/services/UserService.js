"use strict";
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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = require("../models/UserModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UserService {
    createUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield UserModel_1.User.findOne({ username });
                if (existingUser) {
                    throw new Error('Username already exist');
                }
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                const newUser = new UserModel_1.User({
                    username,
                    password: hashedPassword
                });
                return newUser.save();
            }
            catch (error) {
                throw new Error(`Error creating user: ${error}`);
            }
        });
    }
    loginUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserModel_1.User.findOne({ username });
                if (!user) {
                    throw new Error("Invalid Username or password");
                }
                const isMatch = yield bcryptjs_1.default.compare(password, user.password);
                if (!isMatch) {
                    throw new Error("Invalid Username or password");
                }
                const token = jsonwebtoken_1.default.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, {
                    expiresIn: '1h',
                });
                return token;
            }
            catch (error) {
                throw new Error('Error logging in');
            }
        });
    }
}
exports.default = new UserService();
