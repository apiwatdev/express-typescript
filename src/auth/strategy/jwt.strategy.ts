import ConfigService from "../../config";
import { UserService } from "../../user/user.service";
import { ExtractJwt, Strategy } from "passport-jwt";
import { HttpException } from "../../exception";
import { HttpStatusCode } from "../../enum/http-status-code";

export class JwtStrategy {
  private config: ConfigService;
  constructor() {
    this.config = new ConfigService();
  }

  async validation(payload: any, done: any) {
    if (payload.userId) {
      const userService = new UserService();
      const user = await userService.findById(payload.userId);
      if (user) delete user.password;

      if (user && user.isActive) {
        return done(null, user);
      }
    }
    return done(
      new HttpException(HttpStatusCode.FORBIDDEN, "Forbidden"),
      false
    );
  }

  strategy() {
    return new Strategy(this.jwtOptions(), this.validation);
  }
  jwtOptions() {
    return {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: this.config.get("JWT_SECRET"),
    };
  }
}
