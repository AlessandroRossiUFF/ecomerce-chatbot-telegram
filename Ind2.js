// https://github.com/cod3rcursos/curso-chatbot-telegram/tree/master/exercicios

// https://github.com/cod3rcursos/curso-chatbot-telegram/tree/master/exercicios

token = '5785772507:AAF2gFn2FkcwqufDdXk2b6EX4-gqimbDJsI'
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf(token)

let contagem = 0; let arrayContagem = []; let i = 0

const menuInicial = Extra.markup(Markup.inlineKeyboard([
  Markup.callbackButton('🍻🥘CARDÁPIO🍕🍤', 'cardapio'),
  Markup.callbackButton('PROMOÇÕES', 'add 10'),
  Markup.callbackButton('EVENTOS', 'add 100'),
  Markup.callbackButton('SOBRE NÓS', 'sub 1'),
  Markup.callbackButton('🔃 FAZER PEDIDO', 'reset'),
  Markup.callbackButton('CARRINHO', 'result')
], { columns: 2 }))

const menuCardapio = Extra.markup(Markup.inlineKeyboard([
  Markup.callbackButton('🍕 PIZZAS 🍕', 'add 1'),
  Markup.callbackButton('🍤 PETISCOS 🍤', 'add 10'),
  Markup.callbackButton('🍽️ REFEIÇÕES 🍽️', 'add 10'),
  Markup.callbackButton('🥞 CREPES 🥞', 'add 100'),
  Markup.callbackButton('🍵 CALDOS 🍵', 'sub 1'),
  Markup.callbackButton('🍸 DRINKS 🍸', 'sub 1'),
  Markup.callbackButton('🍻 BEBIDAS 🍻', 'sub 1'),
  Markup.callbackButton('🥤 REFRIS 🥤', 'sub 1'),
  Markup.callbackButton('🍊 SUCOS 🍊', 'sub 1'),
  Markup.callbackButton('🛒 CARRINHO 🛒', 'add 10'),
  Markup.callbackButton('◀️ VOLTAR ◀️', 'add 10')
], { columns: 2 }))
// 🍊🥭🥩🥓🍟🍖🍗🥃🍷🧉🍸🍽️🍺🍤🍻🍕🍤🧆🍽️🍵🥞

bot.start(async ctx => {
  const nome = ctx.update.message.from.first_name
  await ctx.reply(`Olá ${nome}!\nBem vindo ao atendimento automático do ESQUINA DO CHOPP BAR E RESTAURANTE 🥘🍕🍻\nNavegue em nosso menú para consultar cardápio, eventos e promoções ou fazer pedidos\nDica: Nossas redes sociais, telefones para contato e + podem ser consultados em SOBRE NÓS`)
  await ctx.reply(`\n\nA contagem atual está em ${contagem}\n`, menuInicial)
  console.log(contagem)
})

bot.action('cardapio', ctx => {
  contagem += parseInt(ctx.match[1])
  ctx.reply(`ESQUINA DO CHOPP BAR E RESTAURANTE 🥘🍕🍻\nNavegue em nosso menú para consultar cardápio, eventos e promoções ou fazer pedidos\nDica: Nossas redes sociais, telefones para contato e + podem ser consultados em SOBRE NÓS`, menuCardapio)
  arrayContagem.push(contagem)
  console.log(arrayContagem[i])
  i++
})

bot.action(/add (\d+)/, ctx => {
  contagem += parseInt(ctx.match[1])
  ctx.reply(`ESQUINA DO CHOPP BAR E RESTAURANTE 🥘🍕🍻\nNavegue em nosso menú para consultar cardápio, eventos e promoções ou fazer pedidos\nDica: Nossas redes sociais, telefones para contato e + podem ser consultados em SOBRE NÓS`, menuInicial)
  arrayContagem.push(contagem)
  console.log(arrayContagem[i])
  i++
})

bot.action(/sub (\d+)/, ctx => {
  contagem -= parseInt(ctx.match[1])
  ctx.reply(`ESQUINA DO CHOPP BAR E RESTAURANTE 🥘🍕🍻\nNavegue em nosso menú para consultar cardápio, eventos e promoções ou fazer pedidos\nDica: Nossas redes sociais, telefones para contato e + podem ser consultados em SOBRE NÓS`, menuInicial)
  arrayContagem.push(contagem)
  console.log(arrayContagem[i])
  i++
})

bot.action('reset', ctx => {
  contagem = 0
  ctx.reply(`ESQUINA DO CHOPP BAR E RESTAURANTE 🥘🍕🍻\nNavegue em nosso menú para consultar cardápio, eventos e promoções ou fazer pedidos\nDica: Nossas redes sociais, telefones para contato e + podem ser consultados em SOBRE NÓS`, menuInicial)
  console.log('Contagem: ' + contagem)
})

bot.action('result', ctx => {
  ctx.reply(`ESQUINA DO CHOPP BAR E RESTAURANTE 🥘🍕🍻\nNavegue em nosso menú para consultar cardápio, eventos e promoções ou fazer pedidos\nDica: Nossas redes sociais, telefones para contato e + podem ser consultados em SOBRE NÓS`, menuInicial)
  console.log(arrayContagem)
  console.log('\nTam: ' + i)
})

bot.startPolling()

// node index.js









