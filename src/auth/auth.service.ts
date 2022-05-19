import { UserModel } from "../mysql";
import * as bcrypt from "bcrypt";
import { SignInDto, SignUpDto } from "./dto";
import { IUserCreateModel, IUserModel } from "../mysql/model/interface";
import { HttpException } from "../exception";
import { HttpStatusCode } from "../enum/http-status-code";
import * as jwt from "jsonwebtoken";
import ConfigService from "../config";
export class AuthService {
  userModel: UserModel;
  config: ConfigService;
  constructor() {
    this.userModel = new UserModel();
    this.config = new ConfigService();
  }
  async signup(dto: SignUpDto) {
    const foundUser = await this.userModel.findByEmail(dto.email);
    if (foundUser)
      throw new HttpException(
        HttpStatusCode.CONFLICT,
        "User already exist. Please login."
      );

    dto.password = await await bcrypt.hash(dto.password, 10);
    const user = await this.userModel.create<IUserCreateModel>(dto);
    if (user?.password) delete user.password;
    return user;
  }

  async signin(dto: SignInDto) {
    const user = await this.userModel.findByEmail<IUserModel>(dto.email);
    if (
      !(
        user &&
        user.password &&
        (await bcrypt.compare(dto.password, user.password))
      )
    )
      throw new HttpException(
        HttpStatusCode.UNAUTHORIZED,
        "Credentials incorrect"
      );

    if (user?.password) delete user.password;

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string
  ): Promise<{ access_token: string; expires_in: number }> {
    const payload = {
      userId,
      email,
    };
    const token = await jwt.sign(payload, this.config.get("JWT_SECRET") || "", {
      expiresIn: this.config.get("JWT_EXPIRES_IN")  || "1h",
    });
    const expiresIn = this.tokenExpiresIn(token)
    return {
      access_token: token,
      expires_in: expiresIn,
    };
  }

  tokenExpiresIn(token: string) :number {
    const decoded = jwt.decode(token);
    if(typeof decoded === "object"){
      const iat = typeof decoded?.iat  === "number" ? new Date(decoded?.iat * 1000 ) : null
      const exp = typeof decoded?.exp  === "number" ? new Date(decoded?.exp * 1000 ) : null
      if(iat instanceof Date && exp instanceof Date){
        return (exp.getTime() - iat.getTime()) / 1000;
      }
    }
    return 0

  }
}