const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../../models/user");
var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE,
};

const jwtStrategy = new Strategy(opts, async (jwt_payload, done) => {
  const user = await User.findOne({ _id: jwt_payload.userId });

  if (!user) {
    return done(null, false);
  }
  return done(null, user);
});

module.exports = jwtStrategy;
