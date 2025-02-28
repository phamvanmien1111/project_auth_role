import express from "express";
import UserController from "../controllers/auth.controller";
import AuthMiddleware from "../middlewares/auth.middleware";  
import checkRole from "../middlewares/checkRole";

const router = express.Router();
router.get("/users", UserController.getAllUsers);
router.post("/register", UserController.register.bind(UserController) as express.RequestHandler);
router.post("/login", UserController.login.bind(UserController) as express.RequestHandler);


router.get("/admin", AuthMiddleware.authenticate, AuthMiddleware.isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

router.get("/user", AuthMiddleware.authenticate, checkRole(["user", "admin"]), (req, res) => {
  res.json({ message: "Welcome User!" });
});

export default router;
