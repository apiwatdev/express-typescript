import { Router } from "express";
import { validationMiddleware } from "../middleware";
import { AuthController } from "./auth.controller";
import { SignInDto, SignUpDto } from "./dto";


const authController = new AuthController();
const router = Router();

router.post("/signin", validationMiddleware(SignInDto), authController.signin.bind(authController));
router.post("/signup", validationMiddleware(SignUpDto), authController.signup.bind(authController));

export default router;
