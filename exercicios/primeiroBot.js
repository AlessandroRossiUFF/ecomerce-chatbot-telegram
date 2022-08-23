token = '5713310795:AAE4impasXSHVO2QTRVRcqYCyp07ZHaBLfo'
const Telegraf = require('telegraf')
const bot = new Telegraf(token)

bot.start(ctx => {
  const from = ctx.update.message.from
  console.log(from)
  ctx.reply(`Seja bem vindo, ${from.first_name}!`)
})

bot.on('text', async (ctx, next) => {
  await ctx.reply('Mid 1')
  next()
})

bot.on('text', async ctx => {
  await ctx.reply('Mid 2')
})

bot.startPolling()