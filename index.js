// https://github.com/cod3rcursos/curso-chatbot-telegram/tree/master/exercicios

function between(min, max) {
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

function existeEm(elemento, array) {
  for (let i = 0; i < array.length; i++)
    if (elemento == array[i].id)
      return true;
  return false;
}

function existeNDeEm(elemento, array) {
  let n = 0;
  for (let i = 0; i < array.length; i++)
    if (elemento == array[i].id)
      n++;
  return n;
}

function indiceDeEm(valor, lista) {
  for (let i = 0; i < lista.length; i++)
    if (valor == lista[i].id)
      return i;
} //
function indiceDeProdutoEm(valor, lista) {
  for (let i = 0; i < lista.length; i++)
    if (valor == lista[i])
      return i;
} //

token = '5785772507:AAF2gFn2FkcwqufDdXk2b6EX4-gqimbDJsI'
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf(token)

// node index.js
//let arrayContagem = []; let i = 0
let clientes = []
let cliente = {
  "id": 0,
  "estado": 0,
  "carrinho": []
}
clientes.push(cliente)
function listarIds(clientes) {
  let lista = []
  for (let i = 0; i < clientes.length; i++) {
    lista.push(clientes[i].id)
  }
  return lista
}
let lista = listarIds(clientes)
let carrinho = []
let produto = {
  'codigo': 1,
  "produto": "/Pizza_Frango_Catupiry",
  "preco": 0.0,
  "quantidade": 0.0,
  "classe": 0,
  "variacao": 0,
  "precos": [37.90, 47.90, 57.90],
  "observacoes":"",
  "descricao": "Ingredientes: Frango e Catupiry.\nPequena: R$37.90 | Grande: R$47.90 | Família: 57.90"
  //"registration": new Date('2017-01-03'),
}
let produtos = []
produtos.push(produto)
produto = {
  'codigo': 2,
  "produto": "/Pizza_Calabresa",
  "preco": 0.0,
  "quantidade": 0.0,
  "classe": 0,
  "variacao": 0,
  "precos": [37.90, 47.90, 57.90],
  "observacoes":"",
  "descricao": "Ingredientes: Calabresa e cebola.\nPequena: R$37.90 | Grande: R$47.90 | Família: 57.90"
  //"registration": new Date('2017-01-03'),
}
produtos.push(produto)
console.log(produtos)
function listarCatalogo(produtos) {
  let lista = []
  console.log('tst')
  for (let i = 0; i < produtos.length; i++) {
    lista.push(produtos[i].produto)

  }
  return lista
}
let todosProdutos = listarCatalogo(produtos)
console.log(todosProdutos)

function listarProdutos(carrinho) {
  let lista = []
  for (let i = 0; i < carrinho.length; i++) {
    lista.push(carrinho[i].preco)
  }
  return lista
}
clientes[0].carrinho.push(produto)
clientes[0].carrinho.push(produto)
lista = listarProdutos(clientes[0].carrinho)
//console.log(bot.telegram)

const menuInicial = Extra.markup(Markup.inlineKeyboard([
  Markup.callbackButton('🍻🥘CARDÁPIO🍕🍤', 'cardapio'),
  Markup.callbackButton('PROMOÇÕES', '/inicio'),
  Markup.callbackButton('EVENTOS', '/inicio'),
  Markup.callbackButton('SOBRE NÓS', '/inicio'),
  Markup.callbackButton('🔃 FAZER PEDIDO', '/inicio'),
  Markup.callbackButton('CARRINHO', 'carrinho')
], { columns: 2 }))

const menuCardapio = Extra.markup(Markup.inlineKeyboard([
  Markup.callbackButton('🍕 PIZZAS 🍕', 'pizzas'),
  Markup.callbackButton('🍤 PETISCOS 🍤', 'pizzas'),
  //Markup.callbackButton('🍽️ REFEIÇÕES 🍽️', 'add 10'),
  Markup.callbackButton('🥞 CREPES 🥞', 'pizzas'),
  Markup.callbackButton('🍵 CALDOS 🍵', 'pizzas'),
  //Markup.callbackButton('🍸 DRINKS 🍸', 'sub 1'),
  Markup.callbackButton('🍻 BEBIDAS 🍻', 'pizzas'),
  //Markup.callbackButton('🥤 REFRIS 🥤', 'sub 1'),
  //Markup.callbackButton('🍊 SUCOS 🍊', 'sub 1'),
  Markup.callbackButton('🛒 CARRINHO 🛒', 'carrinho'),
  Markup.callbackButton('◀️ VOLTAR ◀️', '/inicio')
], { columns: 2 }))

const menuPizzas = Extra.markup(Markup.inlineKeyboard([
  Markup.callbackButton('🍕 FRANGO C/ CATUPIRY 🍕', 'cardapio'),
  Markup.callbackButton('QUATRO QUEIJOS: R$39.90, R$ 49.90, R$59.90 R$69.90', 'pizza'),
  Markup.callbackButton('🍕 CALABRESA 🍕', 'pizza'),
  Markup.callbackButton('🛒 CARRINHO 🛒', 'carrinho'),
  Markup.callbackButton('◀️ VOLTAR ◀️', 'cardapio')
], { columns: 1 }))

bot.action('tst', async ctx => {
  let array = ['Coca', 'Pepsi'];
  await ctx.reply(`Seja bem vindo, ${ctx.update.message.from.first_name}!`)
  await ctx.reply(`Qual bebida você prefere?`,
    Markup.keyboard(array).resize().oneTime().extra())
}); // MENU DE BOTOES DINAMICO

// 🍊🥭🥩🥓🍟🍖🍗🥃🍷🧉🍸🍽️🍺🍤🍻🍕🍤🧆🍽️🍵🥞

bot.start(async ctx => {
  console.log('Sera?')
  console.log(ctx.from.id)
  //const nome = ctx.update.message.from.first_name
  //console.log(nome)

  await ctx.replyWithPhoto({ source: `marj.png` },
    { caption: 'Bem vindo ao atendimento automático do ESQUINA DO CHOPP BAR E RESTAURANTE 🥘🍕🍻' })
  await ctx.reply('ESCOLHA ENTRE AS OPÇÕES ABAIXO:', menuInicial)
})

bot.action('inicio', async ctx => {
  console.log('Sera?')
  console.log(ctx.from.id)

  if (!existeEm(ctx.from.id, clientes) && existeNDeEm(ctx.from.id, clientes) < 1) {
    console.log(existeNDeEm(ctx.from.id, clientes))
    cliente = {
      "id": ctx.from.id,
      "carrinho": []
    }
    clientes.push(cliente)
    console.log(existeNDeEm(ctx.from.id, clientes))
  }

  lista = listarIds(clientes)
  console.log(lista)
  await ctx.replyWithPhoto({ source: `marj.png` },
    { caption: 'Bem vindo ao atendimento automático do ESQUINA DO CHOPP BAR E RESTAURANTE 🥘🍕🍻 /start' })
  await ctx.reply('ESCOLHA ENTRE AS OPÇÕES ABAIXO:', menuInicial)
})
bot.hears('/inicio', async ctx => {
  console.log('Sera?')
  console.log(ctx.from.id)

  if (!existeEm(ctx.from.id, clientes) && existeNDeEm(ctx.from.id, clientes) < 1) {
    console.log(existeNDeEm(ctx.from.id, clientes))
    cliente = {
      "id": ctx.from.id,
      "carrinho": []
    }
    clientes.push(cliente)
    console.log(existeNDeEm(ctx.from.id, clientes))
  }

  lista = listarIds(clientes)
  console.log(lista)
  await ctx.replyWithPhoto({ source: `marj.png` },
    { caption: 'Bem vindo ao atendimento automático do ESQUINA DO CHOPP BAR E RESTAURANTE 🥘🍕🍻 /start' })
  await ctx.reply('ESCOLHA ENTRE AS OPÇÕES ABAIXO:', menuInicial)
})

bot.action('cardapio', async ctx => {
  console.log(ctx.from.id)
  console.log('\nTeste')
  await ctx.replyWithPhoto({ source: `marj.png` },
    { caption: 'Bem vindo ao atendimento automático do ESQUINA DO CHOPP BAR E RESTAURANTE 🥘🍕🍻' })
  await ctx.reply('ESCOLHA ENTRE AS OPÇÕES ABAIXO:', menuCardapio)
  //console.log(ctx)
})

bot.action('pizzas', async ctx => {
  let txt = ''
  for (let i = 0; i < produtos.length; i++) {
    txt += produtos[i].produto + '\n' + produtos[i].descricao + '\n'// + produtos[i].precos + '\n'
  }
  await ctx.replyWithPhoto({ source: `marj.png` },
    { caption: '🍕 UHUMMM, NOSSAS PIZZAS SÃO UMA DELICIA! MASSA FININHA E MUITO BEM RECHEADAS 🍕\nObservação:todas pizzas são forradas com mussarela e todas pizzas salgadas contém molho e orégano.\n' + txt })
  await ctx.reply('ESCOLHA ENTRE AS OPÇÕES ABAIXO:', menuPizzas)
})

bot.hears(todosProdutos, async ctx => {
  let produto = ctx.match
  let id = ctx.from.id
  if (!existeEm(id, clientes) && existeNDeEm(id, clientes) < 1) {
    console.log(existeNDeEm(id, clientes))
    cliente = {
      "id": id,
      "carrinho": []
    }
    clientes.push(cliente)
    console.log(existeNDeEm(id, clientes))
  }
  let iC = indiceDeEm(id, clientes)
  let iP = indiceDeProdutoEm(produto, todosProdutos)
  produto = {
    'codigo': produtos[iP].codigo,
    "produto": produtos[iP].produto,
    "preco": produtos[iP].preco,
    "quantidade": produtos[iP].quantidade,
    "classe": produtos[iP].classe,
    "variacao": produtos[iP].variacao,
    "precos": produtos[iP].precos,
    "observacoes":produtos[iP].observacoes,
    "descricao": produtos[iP].descricao
  }
  let menuProduto = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('VOLTAR AO CARRINHO', 'carrinho'),
    Markup.callbackButton('ADICIONAR AO CARRINHO', produtos[iP].produto)
    ], { columns: 1 }))
 
  await ctx.reply(produtos[iP].produto+'\nPreço: R$'+produtos[iP].preco+'\n'+produtos[iP].descricao, menuProduto)
}) // ver item

bot.action(todosProdutos, async ctx => {
  //await ctx.reply(`Nossa! Eu também gosto de ${ctx.match}`)
  let produto = ctx.match
  let id = ctx.from.id
  if (!existeEm(id, clientes) && existeNDeEm(id, clientes) < 1) {
    console.log(existeNDeEm(id, clientes))
    cliente = {
      "id": id,
      "carrinho": []
    }
    clientes.push(cliente)
    console.log(existeNDeEm(id, clientes))
  }
  let iC = indiceDeEm(id, clientes)
  let iP = indiceDeProdutoEm(produto, todosProdutos)
  produto = {
    'codigo': produtos[iP].codigo,
    "produto": produtos[iP].produto,
    "preco": produtos[iP].preco,
    "quantidade": produtos[iP].quantidade,
    "classe": produtos[iP].classe,
    "variacao": produtos[iP].variacao,
    "precos": produtos[iP].precos,
    "observacoes":produtos[iP].observacoes,
    "descricao": produtos[iP].descricao
  }
  clientes[iC].carrinho.push(produto)
  //carrinho.push(produto)
  await ctx.replyWithPhoto({ source: `marj.png` },
    { caption: 'Bem vindo ao atendimento automático do ESQUINA DO CHOPP BAR E RESTAURANTE 🥘🍕🍻' })
  await ctx.reply('ESCOLHA ENTRE AS OPÇÕES ABAIXO:', menuInicial)
  console.log(carrinho)
}) // adicionar item

bot.action('carrinho', async ctx => {
  let id = ctx.from.id
  if (!existeEm(id, clientes) && existeNDeEm(id, clientes) < 1) {
    console.log(existeNDeEm(id, clientes))
    cliente = {
      "id": id,
      "carrinho": []
    }
    clientes.push(cliente)
    console.log(existeNDeEm(id, clientes))
  }
  let iC = indiceDeEm(id, clientes)
  console.log(id) // id do cliente
  console.log(iC) // indice do cliente
  console.log(ctx.from.id)
  console.log(ctx.from.id)
  let txt = 'CARRINHO\n'
 
  txt += '\nPRODUTO | QTD | R$\n'
  for (let i = 0; i < clientes[iC].carrinho.length; i++) {
    txt += clientes[iC].carrinho[i].produto +' | ' + ' *1' + ' | '+clientes[iC].carrinho[i].precos[0] + '\n'
  }
  await ctx.replyWithPhoto({ source: `marj.png` },
    { caption: txt })
  let menuCarrinho = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('INICIO', 'inicio'),
    Markup.callbackButton('🔃 FAZER PEDIDO', 'inicio')
    ], { columns: 2 }))
 
  await ctx.reply('ESCOLHA ENTRE AS OPÇÕES ABAIXO:', menuCarrinho)
  console.log(carrinho)
  })
console.log('rodando')

bot.startPolling()
// node ecomerce.js