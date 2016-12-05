import Flow from './Flow'

class Help extends Flow {
  events = ['direct_mention', 'direct_message', 'soft_mention']
  patterns = ['help']

  run = async ({ ctx, message }) => {
    await ctx.bot.reply(message, `
Hi, I\'m Baymax. I\'m here to help you build Luno.

I know how to do the following:

*Assume Identites*

To login as a specific user:
\`baymax assume user <user_id>\`

To login as any user on a specific team:
\`baymax assume team <team_id>\`

You can also drop the \`type\` (team or user) and I can infer it based on the
prefix of the id:
\`baymax assume T2342342\`

Will assume the identity of a user in team T2342342.
  `)
  }
}

export default Help
