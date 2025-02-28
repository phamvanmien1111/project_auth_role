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
const user_model_1 = __importDefault(require("../models/user.model"));
class UserController {
    getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_1.default.find();
                res.json(users);
            }
            catch (error) {
                next(error);
            }
        });
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Request Body:", req.body); // 📌 Debug
                const { username, email, password, role } = req.body;
                if (!password) {
                    return res.status(400).json({ message: "Password is required" });
                }
                if (yield user_model_1.default.findOne({ email })) {
                    return res.status(400).json({ message: "Email already in use" });
                }
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                // 🟢 Kiểm tra nếu role bị undefined hoặc null
                const newUser = new user_model_1.default({
                    username,
                    email,
                    password: hashedPassword,
                    role: role && ["user", "admin"].includes(role) ? role : "user"
                });
                yield newUser.save();
                return res.status(201).json({ message: "User registered successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield user_model_1.default.findOne({ email });
                if (!user)
                    return res.status(400).json({ message: "Invalid credentials" });
                if (!(yield bcryptjs_1.default.compare(password, user.password))) {
                    return res.status(400).json({ message: "Invalid credentials" });
                }
                const secret = process.env.JWT_SECRET;
                if (!secret)
                    throw new Error("JWT_SECRET is not defined");
                console.log("User Role:", user.role); // 📌 Debug
                const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, secret, { expiresIn: "1h" });
                return res.json({
                    token,
                    user: { id: user._id, username: user.username, email: user.email, role: user.role }
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new UserController();
