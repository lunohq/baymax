export async function softMention({ ctx, message, next }) {
  const { identities: { bot: { name } } } = ctx
  if (message.text && message.text.startsWith(name)) {
    if (message.event === 'ambient') {
      message.event = 'soft_mention'
      message.text = message.text.replace(name, '').trim()
    }
  }
  return next()
}
