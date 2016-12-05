import { db } from 'luno-core'

import Flow from './Flow'
import config from '../config/environment'

const debug = require('debug')('bot:flows:Assume')

class Assume extends Flow {
  events = ['direct_mention', 'soft_mention', 'direct_message']
  patterns = [/^assume/]

  run = async ({ ctx, message }) => {
    const { bot } = ctx
    if (message.channel !== config.bot.adminChannel) {
      debug('Rejecting assume, non admin channel', { message })
      return bot.reply(
        message,
        `You can only run \`assume\` within <#${config.bot.adminChannel}|admin> for security purposes`
      )
    }

    const command = message.text.replace('assume', '').trim()
    const parts = command.split(' ')
    let type = parts[0]
    let id = parts[1]
    if (id === undefined && type.startsWith('T')) {
      id = type
      type = 'team'
    } else if (id === undefined && type.startsWith('U')) {
      id = type
      type = 'user'
    }

    const adminSlackUserId = message.user
    let targetUserId
    let targetTeamId
    let user

    switch (type) {
      case 'user': {
        targetUserId = id
        user = await db.user.getUser(id)
        if (!user) {
          return bot.reply(message, `I couldn't find a user with id: \`${id}\``)
        }
        targetTeamId = user.teamId
        break
      }
      case 'team': {
        targetTeamId = id
        const users = await db.user.getAdmins(id)
        if (!users.length) {
          return bot.reply(message, `I couldn't find any users for team: \`${id}\``)
        }
        user = users[Math.floor(Math.random() * users.length)]
        targetUserId = user.id
        break
      }
      default:
        return bot.reply(message, `I didn't understand: \`${message.text}\`. See \`baymax help\` for details.`)
    }

    const token = await db.admin.createToken({ adminSlackUserId, targetUserId, targetTeamId })
    return bot.reply(message, {
      text: `Link to assume user, \`${user.user}\`, in \`${targetTeamId}\`: ${config.luno.hostname}/${config.luno.adminroute}/${token.id}/`,
      unfurl_links: false,
    })
  }
}

export default Assume
