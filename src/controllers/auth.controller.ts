import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

class UserController {
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        next(error);
    }
}
  async register(req: Request, res: Response, next: NextFunction) {
    try {
        console.log("Request Body:", req.body); // 📌 Debug
        
        const { username, email, password, role } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Cần có pass" });
        }

        if (await User.findOne({ email })) {
            return res.status(400).json({ message: "Email đã được sử dụng" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // 🟢 Kiểm tra nếu role bị undefined hoặc null
        const newUser = new User({ 
            username, 
            email, 
            password: hashedPassword, 
            role: role && ["user", "admin"].includes(role) ? role : "user"
        });

        await newUser.save();

        return res.status(201).json({ message: "Đăng Ký Thành công" });
    } catch (error) {
        next(error);
    }
}


async login(req: Request, res: Response, next: NextFunction) {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) return res.status(400).json({ message: "Thông tin không hợp lệ" });

      if (!(await bcrypt.compare(password, user.password))) {
          return res.status(400).json({ message: "Thông tin không hợp lệ" });
      }

      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error("JWT_SECRET không xác định");

      console.log("User Role:", user.role); // 📌 Debug

      const token = jwt.sign(
          { id: user._id, role: user.role }, 
          secret, 
          { expiresIn: "1h" }
      );

      return res.json({
          token,
          user: { id: user._id, username: user.username, email: user.email, role: user.role }
      });
  } catch (error) {
      next(error);
  }
}
async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { username, email, password, role } = req.body;

        // Tìm user
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User không tồn tại" });
        }
        if (username) user.username = username;
        if (email) user.email = email;
        if (role && ["user", "admin"].includes(role)) user.role = role;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        return res.json({ message: "Cập nhật thành công", user });
    } catch (error) {
        next(error);
    }
}

async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User không tồn tại" });
        }
        await User.findByIdAndDelete(id);

        return res.json({ message: "Xóa user thành công" });
    } catch (error) {
        next(error);
    }
}
}

export default new UserController();
