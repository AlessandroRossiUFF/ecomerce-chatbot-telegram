// https://github.com/cod3rcursos/curso-chatbot-telegram/tree/master/exercicios

token = '5785772507:AAF2gFn2FkcwqufDdXk2b6EX4-gqimbDJsI'
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf(token)
const fs = require('fs');

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

let clientes = [{
  "id": 0,
  "estado": 0,
  "carrinho": []
}]

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
// 

// botoes do menu
let dataBufferContainer = '';
dataBufferContainer = fs.readFileSync('partesCardapio.txt');
let data = dataBufferContainer.toString();
let subMenus=[]; 
var linhas = data.split(/\r?\n/);
linhas.forEach(function(linha){
  subMenus.push(linha)
})

// botoes do menu
dataBufferContainer = '';
dataBufferContainer = fs.readFileSync('produtosCardapio.txt');
data = dataBufferContainer.toString();
let products=[]; 
var linhas = data.split(/\r?\n/);
linhas.forEach(function(linha){
  products.push(linha)
})
console.log(products);
let i=0
 

let produtos = []
for(let i=0; i<products.length; i+=5){
  let prdt={
  'codigo': i,
  'classe':products[i],
  'produto':products[i+1],
  'preco':Number(products[i+3]),
  "precos": [Number(products[i+3])],
  "quantidade": 0.0,
  "variacao": 0,
  'descricao':products[i+4],
  'observacoes':''
  }
  produtos.push(prdt)
}
// node index.js

 

function listarCatalogo(produtos) {
  let lista = []
  console.log('tst')
  for (let i = 0; i < produtos.length; i++) {
    lista.push(produtos[i].produto)

  }
  return lista
}
let todosProdutos = listarCatalogo(produtos)


const menuInicial = Extra.markup(Markup.inlineKeyboard([
  Markup.callbackButton('CARDÁPIO', 'cardapio'),
  Markup.callbackButton('PROMOÇÕES', '/inicio'),
  Markup.callbackButton('EVENTOS', '/inicio'),
  Markup.callbackButton('SOBRE NÓS', '/inicio'),
  Markup.callbackButton('🔃 FAZER PEDIDO', '/inicio'),
  Markup.callbackButton('CARRINHO', 'carrinho')
], { columns: 2 }))

const menuCardapio = Extra.markup(Markup.inlineKeyboard([
  Markup.callbackButton('🍕 PIZZAS 🍕', 'pizzas'),
  Markup.callbackButton('🍤 PETISCOS 🍤', 'pizzas'),
  Markup.callbackButton('🥞 CREPES 🥞', 'pizzas'),
  Markup.callbackButton('🍵 CALDOS 🍵', 'pizzas'),
  Markup.callbackButton('🍻 BEBIDAS 🍻', 'pizzas'),
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
  await ctx.replyWithPhoto({ source: `marj.png` },
    { caption: 'Bem vindo ao atendimento automático do ESQUINA DO CHOPP BAR E RESTAURANTE 🥘🍕🍻' })
  await ctx.reply('ESCOLHA ENTRE AS OPÇÕES ABAIXO:', menuInicial)
})

bot.action('inicio', async ctx => {
  if (!existeEm(ctx.from.id, clientes) && existeNDeEm(ctx.from.id, clientes) < 1) {
    cliente = {
      "id": ctx.from.id,
      "carrinho": []
    }
    clientes.push(cliente)
  }
  await ctx.replyWithPhoto({ source: `marj.png` },
    { caption: 'Bem vindo ao atendimento automático do ESQUINA DO CHOPP BAR E RESTAURANTE 🥘🍕🍻 /start' })
  await ctx.reply('ESCOLHA ENTRE AS OPÇÕES ABAIXO:', menuInicial)
})

bot.hears('/inicio', async ctx => {
  if (!existeEm(ctx.from.id, clientes) && existeNDeEm(ctx.from.id, clientes) < 1) {
    cliente = {
      "id": ctx.from.id,
      "carrinho": []
    }
    clientes.push(cliente)
  }
  await ctx.replyWithPhoto({ source: `marj.png` },
    { caption: 'Bem vindo ao atendimento automático do ESQUINA DO CHOPP BAR E RESTAURANTE 🥘🍕🍻 /start' })
  await ctx.reply('ESCOLHA ENTRE AS OPÇÕES ABAIXO:', menuInicial)
})

bot.action('cardapio', async ctx => {
  await ctx.replyWithPhoto({ source: `marj.png` },
    { caption: 'Bem vindo ao atendimento automático do ESQUINA DO CHOPP BAR E RESTAURANTE 🥘🍕🍻' })
  let menuCardapio = []
  for(let i=0; i<subMenus.length;i++){
    menuCardapio.push(Markup.callbackButton(subMenus[i], subMenus[i]))
  }
  menuCardapio.push(Markup.callbackButton('Voltar', 'inicio'))
  menuCardapio.push(Markup.callbackButton('CARRINHO', 'carrinho'))
  let menuProduto = Extra.markup(Markup.inlineKeyboard(menuCardapio, { columns: 2 }))
  await ctx.reply('ESCOLHA ENTRE AS OPÇÕES ABAIXO:', menuProduto)
})

bot.action(subMenus, async ctx => {
  let match = ctx.match
  let txt = ''
  for (let i = 0; i < produtos.length; i++) {
    if(match == produtos[i].classe)
      txt += produtos[i].produto + '\n' + produtos[i].descricao + '\n' + produtos[i].preco + '\n'
  }
  await ctx.replyWithPhoto({ source: `marj.png` },
    { caption: '🍕 UHUMMM, NOSSAS PIZZAS SÃO UMA DELICIA! MASSA FININHA E MUITO BEM RECHEADAS 🍕\nObservação:todas pizzas são forradas com mussarela e todas pizzas salgadas contém molho e orégano.\n' + txt })

  let menuSubmenu = Extra.markup(Markup.inlineKeyboard(
    [
      Markup.callbackButton('Voltar', 'cardapio'),
      Markup.callbackButton('Carrinho', 'carrinho')
    ], { columns: 2 }))

  await ctx.reply('ESCOLHA ENTRE AS OPÇÕES ABAIXO:', menuSubmenu)
}) // ver submenu selecionado
 

bot.hears(todosProdutos, async ctx => {
  let produto = ctx.match
  let id = ctx.from.id
  if (!existeEm(id, clientes) && existeNDeEm(id, clientes) < 1) {
    cliente = {
      "id": id,
      "carrinho": []
    }
    clientes.push(cliente)
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
    Markup.callbackButton('VOLTAR', 'cardapio'),
    Markup.callbackButton('ADICIONAR', produtos[iP].produto)
    ], { columns: 2 }))
 
  await ctx.reply(produtos[iP].produto+'\nPreço: R$'+produtos[iP].preco+'\n'+produtos[iP].descricao, menuProduto)
}) // ver item individualmente

bot.action(todosProdutos, async ctx => {
  //await ctx.reply(`Nossa! Eu também gosto de ${ctx.match}`)
  let produto = ctx.match
  let id = ctx.from.id
  if (!existeEm(id, clientes) && existeNDeEm(id, clientes) < 1) {
    cliente = {
      "id": id,
      "carrinho": []
    }
    clientes.push(cliente)
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
  let txt = 'CARRINHO\n'
 
  txt += '\nPRODUTO | QTD | R$\n'
  for (let i = 0; i < clientes[iC].carrinho.length; i++) {
    txt += clientes[iC].carrinho[i].produto +' | ' + ' *1' + ' | '+clientes[iC].carrinho[i].precos[0] + '\n'
  }
  await ctx.replyWithPhoto({ source: `marj.png` },
    { caption: txt })
  let menuCarrinho = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('CARDÁPIO', 'cardapio'),
    Markup.callbackButton('FAZER PEDIDO', 'inicio'),
    ], { columns: 2 }))
 
  await ctx.reply('ESCOLHA ENTRE AS OPÇÕES ABAIXO:', menuCarrinho)
  console.log(carrinho)
})


console.log('rodando')

bot.startPolling()
// node index.js