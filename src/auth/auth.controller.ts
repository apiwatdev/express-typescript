import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exception";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";

export class AuthController {
  authService: AuthService;
  userService: UserService;
  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
  }
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body;
      const result = await this.authService.signup(dto);
      res.send(result);
    } catch (error) {

      next(error);
    }
  }

  async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body;
      const result = await this.authService.signin(dto);
      res.send(result);
    } catch (error) {

      next(error);
    }
  }
}
