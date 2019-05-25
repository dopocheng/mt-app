import Koa from 'koa'
// const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

import mongoose from 'mongoose'
import bodyParser from 'koa-bodyparser' // 处理 post 相关请求
import session from 'koa-generic-session'
import Redis from 'koa-redis'
import json from 'koa-json' // 处理数据格式 美观
import dbConfig from './dbs/config'
import passport from './interface/untils/passport'
import users from './interface/users'

const app = new Koa()
// 配置 session
app.keys = ['mt', 'keyskeys']// session 相关
app.proxy = true
app.use(session({
  key: 'mt',
  prefix: 'mt:uid',
  store: new Redis()
}))
// 加入解析 post 请求中body的中间件
app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}))
// 加入解析 json 的中间件
app.use(json())
// 连接数据库
mongoose.connect(dbConfig.dbs,{
  userNewUrlParser: true
})
// Passport 是 Node.js 的身份验证中间件
app.use(passport.initialize())
app.use(passport.session())

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
// 定义路由
  app.use(users.routes()).use(users.allowedMethods())// 放其他地方可能失效
  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
