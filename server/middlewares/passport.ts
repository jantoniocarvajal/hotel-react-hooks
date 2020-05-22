import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from "../config";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
};

export default new Strategy(opts, async (payload, done) => {
  try {
    if (payload.username && payload.username !== "") {
      return done(null, payload.username);
    }
    return done(null, false);
  } catch (error) {
    console.log(error);
  }
});