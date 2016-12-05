import { Flow as Base } from 'converse/lib/contrib/middleware/receive/makeFlows'
import { matches } from 'converse/lib/contrib/middleware/receive/stripped'

const debug = require('debug')('bot:flows:Flow')

class Flow extends Base {

  events = []
  patterns = []

  match = async ({ message }) => {
    debug('Attempting match', {
      message,
      events: this.events,
      patterns: this.patterns,
    })
    return message.event && this.events.includes(message.event) && matches(this.patterns, message)
  }

}

export default Flow
