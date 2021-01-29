import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import config from '../config/config'

const strategyOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
}

export default new Strategy(strategyOptions, async (payload, done) => {
  try {
    if (payload.username === config.admin.username)
      return done(null, payload.username)

    return done(null, false)
  } catch (error) {
    console.log(error)
  }
})
