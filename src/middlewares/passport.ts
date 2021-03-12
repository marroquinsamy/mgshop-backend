import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import config from '../config/config'

const strategyOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
}

const jwtStrategy: Strategy = new Strategy(
  strategyOptions,
  (jwtPayload, done) => {
    const user = config.admin.username
    try {
      if (jwtPayload.username === user) return done(null, user)
    } catch (error) {
      console.log(error)
    }
    return done(null, false)
  }
)

export default jwtStrategy
