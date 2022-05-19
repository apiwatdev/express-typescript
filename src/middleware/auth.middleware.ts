import passport from "passport";
import { JwtStrategy } from "../auth/strategy/jwt.strategy";
const jwtStrategy = new JwtStrategy()
passport.use(jwtStrategy.strategy());
const authMiddleware = passport.authenticate("jwt", { session: false, failWithError: true });
export { authMiddleware };
