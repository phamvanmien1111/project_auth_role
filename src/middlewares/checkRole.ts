import { Request, Response, NextFunction } from "express";

const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user; // Nếu `req.user` không tồn tại, cần ép kiểu

    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    next();
  };
};

export default checkRole;
