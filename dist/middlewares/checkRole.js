"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkRole = (roles) => {
    return (req, res, next) => {
        const user = req.user; // Nếu `req.user` không tồn tại, cần ép kiểu
        if (!user || !roles.includes(user.role)) {
            res.status(403).json({ message: "Forbidden" });
            return;
        }
        next();
    };
};
exports.default = checkRole;
