const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const fs = require('fs');
const token = process.env['token']


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

function ArqvToArray(arquivo) {
  let array = []
  let dataBufferContainer = '';
  dataBufferContainer = fs.readFileSync(arquivo);
  let data = dataBufferContainer.toString();
  linhas = data.split(/\r?\n/);
  linhas.forEach(function(linha) {
    array.push(linha)
  })
  return array
}

function ArrayToArrayStruct(array) {
  let arrStruct = []
  for (let i = 0; i < array.length; i += 6) {
    let struct = {
      'codigo': i,
      'classe': array[i],
      'produto': array[i + 1],
      'imagem': array[i + 2],
      'preco': Number(array[i + 4]),
      "precos": [Number(array[i + 4])],
      "quantidade": 0.0,
      "variacao": 0,
      'descricao': array[i + 5],
      'observacoes': ''
    }
    arrStruct.push(struct)
  }
  return arrStruct
}

function listarCatalogo(produtos) {
  let lista = []
  console.log('tst')
  for (let i = 0; i < produtos.length; i++) {
    lista.push(produtos[i].produto)
  }
  return lista
}

let clientes = [{
  "id": 0,
  "estado": 0,
  "carrinho": []
}]; var linhas = ''
let subMenus = ArqvToArray('partesCardapio.txt')
let produtos = ArrayToArrayStruct(ArqvToArray('produtosCardapio.txt'))
let todosProdutos = listarCatalogo(produtos)
const bot = new Telegraf(token)
const menuInicial = Extra.markup(Markup.inlineKeyboard([
  Markup.callbackButton('CARDÁPIO', 'cardapio'),
  Markup.callbackButton('PROMOÇÕES', '/inicio'),
  Markup.callbackButton('EVENTOS', '/inicio'),
  Markup.callbackButton('SOBRE NÓS', '/inicio'),
  Markup.callbackButton('🔃 FAZER PEDIDO', '/inicio'),
  Markup.callbackButton('CARRINHO', 'carrinho')
], { columns: 2 }))

bot.start(async ctx => {
  if (!existeEm(ctx.from.id, clientes) && existeNDeEm(ctx.from.id, clientes) < 1) {
    let cliente = {
      "id": ctx.from.id,
      "carrinho": []
    }
    clientes.push(cliente)
  }
  await ctx.replyWithPhoto({ source: `marj.png` },
    { caption: 'Bem vindo ao atendimento automático do ESQUINA DO CHOPP BAR E RESTAURANTE 🥘🍕🍻 /start' })
  await ctx.reply('ESCOLHA ENTRE AS OPÇÕES ABAIXO:', menuInicial)
}) // <- necessário passar para arquivo antes da produção

bot.action('inicio', async ctx => {
  if (!existeEm(ctx.from.id, clientes) && existeNDeEm(ctx.from.id, clientes) < 1) {
    let cliente = {
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
  for (let i = 0; i < subMenus.length; i++) {
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
    if (match == produtos[i].classe)
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
}) // ver submenu 18

bot.hears(todosProdutos, async ctx => {
  let produto = ctx.match
  let id = ctx.from.id
  if (!existeEm(id, clientes) && existeNDeEm(id, clientes) < 1) {
    let cliente = {
      "id": id,
      "carrinho": []
    }
    clientes.push(cliente)
  }
  let iP = indiceDeProdutoEm(produto, todosProdutos)
  produto = {
    'codigo': produtos[iP].codigo,
    "produto": produtos[iP].produto,
    "preco": produtos[iP].preco,
    "quantidade": produtos[iP].quantidade,
    "classe": produtos[iP].classe,
    "variacao": produtos[iP].variacao,
    "precos": produtos[iP].precos,
    "observacoes": produtos[iP].observacoes,
    "descricao": produtos[iP].descricao
  }
  let menuProduto = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('VOLTAR', 'cardapio'),
    Markup.callbackButton('ADICIONAR', produtos[iP].produto)
  ], { columns: 2 }))
  let txt = produtos[iP].produto + '\nPreço: R$' + produtos[iP].preco + '\n' + produtos[iP].descricao
  await ctx.replyWithPhoto({ source: produtos[iP].imagem },
    { caption: txt })
  await ctx.reply('Escolha entre as opções abaixo:', menuProduto)
}) // ver item 31

bot.action(todosProdutos, async ctx => {
  //await ctx.reply(`Nossa! Eu também gosto de ${ctx.match}`)
  let produto = ctx.match
  let id = ctx.from.id
  if (!existeEm(id, clientes) && existeNDeEm(id, clientes) < 1) {
    let cliente = {
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
    "observacoes": produtos[iP].observacoes,
    "descricao": produtos[iP].descricao
  }
  clientes[iC].carrinho.push(produto)
  await ctx.replyWithPhoto({ source: `marj.png` },
    { caption: 'Bem vindo ao atendimento automático do ESQUINA DO CHOPP BAR E RESTAURANTE 🥘🍕🍻' })
  await ctx.reply('ESCOLHA ENTRE AS OPÇÕES ABAIXO:', menuInicial)
  //console.log(carrinho)
}) // adicionar item 31

bot.action('carrinho', async ctx => {
  let id = ctx.from.id
  if (!existeEm(id, clientes) && existeNDeEm(id, clientes) < 1) {
    let cliente = {
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
    txt += clientes[iC].carrinho[i].produto + ' | ' + ' *1' + ' | ' + clientes[iC].carrinho[i].precos[0] + '\n'
  }
  await ctx.replyWithPhoto({ source: `marj.png` },
    { caption: txt })
  let menuCarrinho = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('CARDÁPIO', 'cardapio'),
    Markup.callbackButton('FAZER PEDIDO', 'inicio'),
  ], { columns: 2 }))
  await ctx.reply('ESCOLHA ENTRE AS OPÇÕES ABAIXO:', menuCarrinho)
}) // 24

console.log('rodando')

bot.startPolling()