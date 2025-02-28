import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: { id: string; role: string; email: string };
}

class AuthMiddleware {
  static authenticate(req: AuthRequest, res: Response, next: NextFunction): void {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Access denied" });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; role: string; email: string };
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  }

  static isAdmin(req: AuthRequest, res: Response, next: NextFunction): void {
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    next();
  }
}

export default AuthMiddleware;
