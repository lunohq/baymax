import { Controller } from 'converse'
import identities from 'converse/lib/contrib/middleware/receive/identities'
import events from 'converse/lib/contrib/middleware/receive/events'
import stripped from 'converse/lib/contrib/middleware/receive/stripped'

import config from './config/environment'
import logger from './logger'
import flows from './flows'
import { softMention } from './middleware'

const debug = require('debug')('bot')

async function getTeam(token) {
  return { token }
}

const controller = new Controller({ getTeam, logger })

controller.middleware.receive.use(identities)
controller.middleware.receive.use(events)
controller.middleware.receive.use(softMention)
controller.middleware.receive.use(stripped)
controller.middleware.receive.use(flows)

controller.start().then(async () => {
  debug('Starting controller', config.bot.token)
  controller.spawn(config.bot.token)
  logger.info('Started controller')
}).catch(err => logger.error('Error starting controller', err))
