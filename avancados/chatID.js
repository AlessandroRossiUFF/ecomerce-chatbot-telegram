token = '5713310795:AAE4impasXSHVO2QTRVRcqYCyp07ZHaBLfo'
const Telegraf = require('telegraf')
const bot = new Telegraf(token)

bot.start(ctx => {
    console.log(ctx.chat.id === ctx.update.message.from.id)
})

bot.startPolling()