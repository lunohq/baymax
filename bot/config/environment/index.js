import { merge } from 'lodash'

const config = {
  env: process.env.NODE_ENV || 'development',
  bot: {
    token: process.env.BOT_TOKEN,
    adminChannel: process.env.BOT_ADMIN_CHANNEL,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
  winston: {
    logger: {
      console: {
        level: process.env.WINSTON_LOGGER_CONSOLE_LEVEL || 'info',
      },
    },
  },
  redis: {
    host: process.env.REDIS_HOST,
  },
  luno: {
    hostname: process.env.LUNO_HOSTNAME || 'https://app.lunohq.com',
    adminroute: process.env.LUNO_ADMIN_ROUTE || 'l/admin',
  },
}

export default merge(config, require(`./${config.env}`).default)
