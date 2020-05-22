import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from "../config";
//import { User } from '../../src/models';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
};

export default new Strategy(opts, async (payload, done) => {
  try {
    //const user = await User.findById(payload.id);
    //if (user) {
      //return done(null, user);
    //}
    return done(null, true);
  } catch (error) {
    console.log(error);
  }
});