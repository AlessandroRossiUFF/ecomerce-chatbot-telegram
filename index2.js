const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const fs = require('fs');
const token = "5785772507:AAF2gFn2FkcwqufDdXk2b6EX4-gqimbDJsI"

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
  return -1
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
      "variacao": array[i + 3],
      'descricao': array[i + 5],
      'observacoes': ''
    }
    arrStruct.push(struct)
  }
  return arrStruct
}

function listarCatalogo(produtos) {
  let lista = []
  for (let i = 0; i < produtos.length; i++) {
    lista.push(produtos[i].produto)
  }
  return lista
}

function sufixarStrings(array, sufixo) {
  let lista = []
  for (let i = 0; i < array.length; i++) {
    lista.push(array[i] + sufixo)
  }
  return lista
}

function concat(array1, array2) {
  for (let i = 0; i < array2.length; i++) {
    array1.push(array2[i])
  }
  return array1
}

let clientes = []; var linhas = ''; var listaComandos = []
let subMenus = ArqvToArray('partesCardapio.txt')
let produtos = ArrayToArrayStruct(ArqvToArray('produtosCardapio.txt'))
let todosProdutos = listarCatalogo(produtos)
let produtosMenager = sufixarStrings(todosProdutos, 'Menager')
let comandos = {
  "lista": todosProdutos,
  "lista0": sufixarStrings(todosProdutos, '0'),
  "lista1": sufixarStrings(todosProdutos, '1'),
  "lista2": sufixarStrings(todosProdutos, '2'),
  "lista3": sufixarStrings(todosProdutos, '3'),
  "lista4": sufixarStrings(todosProdutos, '4'),
  "lista5": sufixarStrings(todosProdutos, '5')
}
listaComandos = concat(listaComandos, todosProdutos)
listaComandos = concat(listaComandos, sufixarStrings(todosProdutos, '0'))
listaComandos = concat(listaComandos, sufixarStrings(todosProdutos, '1'))
listaComandos = concat(listaComandos, sufixarStrings(todosProdutos, '2'))
listaComandos = concat(listaComandos, sufixarStrings(todosProdutos, '3'))
listaComandos = concat(listaComandos, sufixarStrings(todosProdutos, '4'))
listaComandos = concat(listaComandos, sufixarStrings(todosProdutos, '5'))
console.log(listaComandos)
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
  let id = ctx.from.id
  if (!existeEm(id, clientes) && existeNDeEm(id, clientes) < 1) {
    let cliente = {
      "estado": '',
      "id": id,
      "carrinho": []
    }
    clientes.push(cliente)
  }
  let iC = indiceDeEm(id, clientes)
  clientes[iC].estado = 'cardapio'
  await ctx.replyWithPhoto({ source: `marj.png` },
    { caption: 'Bem vindo ao atendimento automático do ESQUINA DO CHOPP BAR E RESTAURANTE 🥘🍕🍻 /start' })
  await ctx.reply('ESCOLHA ENTRE AS OPÇÕES ABAIXO:', menuInicial)
}) // <- necessário passar para arquivo antes da produção

bot.action('inicio', async ctx => {
  let id = ctx.from.id
  if (!existeEm(id, clientes) && existeNDeEm(id, clientes) < 1) {
    let cliente = {
      "estado": '',
      "id": id,
      "carrinho": []
    }
    clientes.push(cliente)
  }
  let iC = indiceDeEm(id, clientes)
  clientes[iC].estado = 'cardapio'
  await ctx.replyWithPhoto({ source: `marj.png` },
    { caption: 'Bem vindo ao atendimento automático do ESQUINA DO CHOPP BAR E RESTAURANTE 🥘🍕🍻 /start' })
  await ctx.reply('ESCOLHA ENTRE AS OPÇÕES ABAIXO:', menuInicial)
}
)

bot.action('cardapio', async ctx => {
  let id = ctx.from.id
  if (!existeEm(id, clientes) && existeNDeEm(id, clientes) < 1) {
    let cliente = {
      "estado": '',
      "id": id,
      "carrinho": []
    }
    clientes.push(cliente)
  }
  let iC = indiceDeEm(id, clientes)
  clientes[iC].estado = 'cardapio'
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
}
) // <- falta estado

bot.action(subMenus, async ctx => {
  let id = ctx.from.id
  if (!existeEm(id, clientes) && existeNDeEm(id, clientes) < 1) {
    let cliente = {
      "estado": '',
      "id": id,
      "carrinho": []
    }
    clientes.push(cliente)
  }
  let iC = indiceDeEm(id, clientes)
  clientes[iC].estado = 'submenus'
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
}) // ver submenu 18 <- falta estado

bot.hears(todosProdutos, async ctx => {
  let produto = ctx.match
  let id = ctx.from.id
  if (!existeEm(id, clientes) && existeNDeEm(id, clientes) < 1) {
    let cliente = {
      "estado": '',
      "id": id,
      "carrinho": []
    }
    clientes.push(cliente)
  }
  let iC = indiceDeEm(id, clientes)
  clientes[iC].estado = produto
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
  let menager = produtos[iP].produto + 'Menager'
  console.log(menager)
  let menuProduto = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('VOLTAR', 'cardapio'),
    Markup.callbackButton('ADICIONAR/MUDAR', menager)
  ], { columns: 3 }))
  await ctx.replyWithPhoto({ source: produtos[iP].imagem }, { caption: 'Item: ' + produtos[iP].produto + '\nQuantidade do item no carrinho: ' + produtos[iP].quantidade + '\nValor unitário do item: R$' + produtos[iP].preco + '\nValor total do item no carrinho: R$' + (produtos[iP].preco * produtos[iP].quantidade) + '\nDescrição: ' + produtos[iP].descricao, menuProduto })
  await ctx.reply('Escolha: ', menuProduto)
}) // ver item 31 <- estado

bot.action(produtosMenager, async ctx => {
  let produto = ctx.match
  produto = produtos[indiceDeProdutoEm(produto, produtosMenager)].produto
  let id = ctx.from.id
  console.log(produto)
  if (!existeEm(id, clientes) && existeNDeEm(id, clientes) < 1) {
    let cliente = {
      "estado": '',
      "id": id,
      "carrinho": []
    }
    clientes.push(cliente)
  }
  let iC = indiceDeEm(id, clientes)
  clientes[iC].estado = produto
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
    Markup.callbackButton('0', comandos.lista0[iP]),
    Markup.callbackButton('+1', comandos.lista1[iP]),
    Markup.callbackButton('+2', comandos.lista2[iP]),
    Markup.callbackButton('+3', comandos.lista3[iP]),
    Markup.callbackButton('+4', comandos.lista4[iP]),
    Markup.callbackButton('+5', comandos.lista5[iP]),
    Markup.callbackButton('VOLTAR', 'cardapio')
  ], { columns: 3 }))
  let txt = produtos[iP].produto + '\nQuantidade do item no carrinho: ' + produtos[iP].quantidade + '\nValor unitário do item: R$' + produtos[iP].preco + '\nValor total do item no carrinho: R$' + (produtos[iP].preco * produtos[iP].quantidade) + '\n'
  await ctx.replyWithPhoto({ source: produtos[iP].imagem }, { caption: txt + "\nPara alterar esse item pelo menú: escolha 0 para tirar todos itens do carrinho ou a opção correspondente ao novo valor.\nPara alterar esse item pelo teclado: digite 0 para zerar a quantidade desse produto no carrinho ou outro número correspondente à quantidade dele que desejar." })
  await ctx.reply('Escolha: ', menuProduto)
}) // ver item 31 <- estado

function tiraSufixo(string) {
  let aux = ""
  for (let i = 0; i < string.length - 1; i++)
    aux += string[i]
  return aux
}

function pegaSufixo(string) {
  return string[string.length - 1]
}

bot.action(listaComandos, async ctx => {
  console.log(ctx.match)
  let produto = ctx.match // 
  let sufixo = pegaSufixo(produto)
  produto = tiraSufixo(produto)

  let id = ctx.from.id
  if (!existeEm(id, clientes) && existeNDeEm(id, clientes) < 1) {
    let cliente = {
      "estado": '',
      "id": id,
      "carrinho": []
    }
    clientes.push(cliente)
  }

  let iC = indiceDeEm(id, clientes)
  let iP = indiceDeProdutoEm(produto, todosProdutos)

  console.log(iP)
  clientes[iC].estado = produto
  produto = {
    'codigo': produtos[iP].codigo,
    "produto": produtos[iP].produto,
    "preco": produtos[iP].preco,
    "quantidade": sufixo,
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
}) // adicionar item 31 <- estado

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
    if (clientes[iC].carrinho[i].variacao == '0') {
      clientes[iC].carrinho[i].variacao = ''
    }
    txt += clientes[iC].carrinho[i].produto + ' ' + clientes[iC].carrinho[i].variacao + ' | ' + clientes[iC].carrinho[i].quantidade + ' | ' + clientes[iC].carrinho[i].precos[0] + '\n'
  }
  await ctx.replyWithPhoto({ source: `marj.png` },
    { caption: txt })
  let menuCarrinho = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('CARDÁPIO', 'cardapio'),
    Markup.callbackButton('FAZER PEDIDO', 'inicio'),
  ], { columns: 2 }))
  await ctx.reply('ESCOLHA ENTRE AS OPÇÕES ABAIXO:', menuCarrinho)
}) // 24 <- estado

console.log('rodando')

bot.startPolling()

// node index.js

// Resolver listagem de itens no carrinho -> classificar produtos por quantidade

// programar especificidades dos produtos

// criar interface gráfica de usuário