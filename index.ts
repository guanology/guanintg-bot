#!/usr/bin/env ts-node
import { Telegraf } from 'telegraf'
import { config } from 'dotenv'
import * as ProxyAgent from 'proxy-agent'

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
