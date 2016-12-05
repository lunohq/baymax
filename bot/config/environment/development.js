export default {
  sentry: {
    dsn: 'https://acdfd43baa9d4280a9d97aa5b4db906d:9b3a1cc598a04c8283279b5be33713a4@app.getsentry.com/75754',
  },
  winston: {
    logger: {
      console: {
        level: process.env.WINSTON_LOGGER_CONSOLE_LEVEL || 'info',
      },
    },
  },
  luno: {
    hostname: 'localhost:3000',
  },
}
