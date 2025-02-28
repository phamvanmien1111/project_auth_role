"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const checkRole_1 = __importDefault(require("../middlewares/checkRole"));
const router = express_1.default.Router();
router.get("/users", auth_controller_1.default.getAllUsers);
router.post("/register", auth_controller_1.default.register.bind(auth_controller_1.default));
router.post("/login", auth_controller_1.default.login.bind(auth_controller_1.default));
router.get("/admin", auth_middleware_1.default.authenticate, auth_middleware_1.default.isAdmin, (req, res) => {
    res.json({ message: "Welcome Admin!" });
});
router.get("/user", auth_middleware_1.default.authenticate, (0, checkRole_1.default)(["user", "admin"]), (req, res) => {
    res.json({ message: "Welcome User!" });
});
exports.default = router;
