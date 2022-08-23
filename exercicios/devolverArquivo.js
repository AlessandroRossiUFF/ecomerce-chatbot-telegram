token = '5713310795:AAE4impasXSHVO2QTRVRcqYCyp07ZHaBLfo'
const Telegraf = require('telegraf')
const moment = require('moment')
const axios = require('axios')
const bot = new Telegraf(token)

bot.on('voice', async ctx => {
  const id = ctx.update.message.voice.file_id
  const res = await axios.get(`${token.apiUrl}/getFile?file_id=${id}`)
  ctx.replyWithVoice({ url: `${token.apiFileUrl}/${res.data.result.file_path}` })
})

bot.on('photo', async ctx => {
  const id = ctx.update.message.photo[0].file_id
  const res = await axios.get(`${token.apiUrl}/getFile?file_id=${id}`)
  ctx.replyWithPhoto({ url: `${token.apiFileUrl}/${res.data.result.file_path}` })
})

bot.startPolling()