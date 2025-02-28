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
            return res.status(400).json({ message: "Password is required" });
        }

        if (await User.findOne({ email })) {
            return res.status(400).json({ message: "Email already in use" });
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

        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        next(error);
    }
}


async login(req: Request, res: Response, next: NextFunction) {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) return res.status(400).json({ message: "Invalid credentials" });

      if (!(await bcrypt.compare(password, user.password))) {
          return res.status(400).json({ message: "Invalid credentials" });
      }

      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error("JWT_SECRET is not defined");

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

}

export default new UserController();
