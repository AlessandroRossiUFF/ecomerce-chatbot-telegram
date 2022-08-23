token = '5713310795:AAE4impasXSHVO2QTRVRcqYCyp07ZHaBLfo'
const Telegraf = require('telegraf') 
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf(token)

bot.start(async ctx => {
    const nome = ctx.update.message.from.first_name
    ctx.reply(`Seja bem vindo, ${nome}!\nAvise se precisar de /ajuda`)
})

bot.command('ajuda', async ctx => ctx.reply('/ajuda: vou mostrar as opções'
    + '\n/ajuda2: para testar via hears'
    + '\n/op2: Opção genérica'
    + '\n/op3: Outra opção genérica qualquer'))

bot.hears('/ajuda2', async ctx => ctx.reply('Eu também consigo capturar comandos'
    + ', mas utilize a /ajuda mesmo'))

bot.hears(/\/op(2|3)/i, async ctx => ctx.reply('Resposta padrão para comandos genéricos'))

bot.startPolling()