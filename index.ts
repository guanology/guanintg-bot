#!/usr/bin/env ts-node
import { config } from 'dotenv'
import ProxyAgent from 'proxy-agent'
import { Telegraf } from 'telegraf'

config({})

const PROXY_URL = process.env.HTTP_PROXY
const TOKEN = process.env.TELEGRAM_BOT_TOKEN

let telegramBot: Telegraf = null

if (PROXY_URL) {
  const proxyAgent = new ProxyAgent(PROXY_URL)
  telegramBot = new Telegraf(TOKEN, { telegram: { agent: proxyAgent } })
} else {
  telegramBot = new Telegraf(TOKEN)
}

telegramBot.start(ctx => ctx.reply('Hello!'))

telegramBot.command('help', ctx => {
  ctx.reply('None')
})

telegramBot.launch().then()

// Enable graceful stop
process.once('SIGINT', () => telegramBot.stop('SIGINT'))
process.once('SIGTERM', () => telegramBot.stop('SIGTERM'))
