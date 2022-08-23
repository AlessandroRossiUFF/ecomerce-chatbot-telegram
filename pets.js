// https://www.section.io/engineering-education/telegram-bot-in-nodejs/
// https://github.com/telegraf/telegraf/blob/3.38.0/docs/examples/echo-bot.js

// node botPets.js
function between(min, max) {
  return Math.floor(
    Math.random() * (max - min) + min
  )
}
// LISTAR ARQUIVOS EM DIRETÓRIO
const fs = require('fs').promises;
async function listarArquivosDoDiretorio(diretorio, arquivos) {
  if (!arquivos)
    arquivos = [];
  let listaDeArquivos = await fs.readdir(diretorio);
  for (let k in listaDeArquivos) {
    let stat = await fs.stat(diretorio + '/' + listaDeArquivos[k]);
    if (stat.isDirectory())
      await listarArquivosDoDiretorio(diretorio + '/' + listaDeArquivos[k], arquivos);
    else
      arquivos.push(diretorio + '/' + listaDeArquivos[k]);
  }
  return arquivos;
}
async function listarDiretorio(diretorio) {
  let arquivos = await listarArquivosDoDiretorio(diretorio); // coloque o caminho do seu diretorio
  console.log(arquivos); // DOGUINHOS GATINHOS
  return arquivos;
}

token = '5693799944:AAH-oIQNOQwRCF-gYRagR6FNPC_isZcN3MU'
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf(token)

const menuInicial = Extra.markup(Markup.inlineKeyboard(
  [
    Markup.callbackButton('🐶DOGUINHOS❤️', 'dog'),
    Markup.callbackButton('🐱GATINHOS❤️', 'cat'),
  ], { columns: 2 }
))

bot.start(async ctx => {
  const nome = ctx.update.message.from.first_name
  await ctx.replyWithPhoto({ source: `IMAGENS/GATINHOS/cat1.jpg` },
    { caption: 'Olha o estilo!' })
  //wait(1)
  await ctx.reply(`Olá ${nome}!\nBem vindo(a) ao BotPets\nEscolha de qual pet quer receber a próxima fotinha fofa aleatória❤️🐶🐱❤️`, menuInicial)
})

bot.hears('/pets', async ctx => {
  const nome = ctx.update.message.from.first_name
  await ctx.replyWithPhoto({ source: `IMAGENS/GATINHOS/cat1.jpg` },
    { caption: 'Olha o estilo!' })
  //wait(1)
  await ctx.reply(`Olá ${nome}!\nBem vindo(a) ao BotPets\nEscolha de qual pet quer receber a próxima fotinha fofa aleatória❤️🐶🐱❤️`, menuInicial)
})

// listarDiretorio('IMAGENS/GATINHOS');
let imagensDeDoguinhos = [
  'IMAGENS/DOGUINHOS/4dgns.jpg',
  'IMAGENS/DOGUINHOS/dog.jpg',
  'IMAGENS/DOGUINHOS/happy.jpg',
  'IMAGENS/DOGUINHOS/rusk.jpg'
]
let imagensDeGatinhos = [
  'IMAGENS/GATINHOS/cat1.jpg',
  'IMAGENS/GATINHOS/cat2.jpg',
  'IMAGENS/GATINHOS/cat3.jpg',
  'IMAGENS/GATINHOS/cat4.jpeg',
]

bot.action('dog', async ctx => {
  await ctx.replyWithPhoto({ source: `${imagensDeDoguinhos[between(0, imagensDeDoguinhos.length)]}` },
    { caption: 'Olha só que coisinha linda! ❤️🐶🐱❤️' })
  await ctx.reply(`Escolha de qual pet quer receber a próxima fotinha fofa aleatória ❤️🐶🐱❤️`, menuInicial)
  //console.log(contagem)
})

bot.action('cat', async ctx => {
  await ctx.replyWithPhoto({ source: `${imagensDeGatinhos[between(0, imagensDeGatinhos.length)]}` },
    { caption: 'Olha só que coisinha linda! ❤️🐶🐱❤️' })
  await ctx.reply(`Escolha de qual pet quer receber a próxima fotinha fofa aleatória ❤️🐶🐱❤️`, menuInicial)
  //console.log(contagem)
})

bot.startPolling()
// node pets.js
