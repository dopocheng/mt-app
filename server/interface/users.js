import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'   // 发送邮件验证信息插件
import User from '../dbs/models/users'
import Passport from './untils/passport'
import Email from '../dbs/config'
import axios from './untils/axios'

let router = new Router({
    prefix: '/users'
})

let Store = new Redis().client   // 获取 redis 客户端
// 一、用户注册
router.post('/signup', async (ctx) => {
    console.log('进入 signup 接口')
    const {username, password, email, code} = ctx.request.body  // 结构赋值
    // 发送验证码
    if(code) {// 发送验证码
        // redis获取, nodemail 发验证码会先存储
        const saveCode = await Store.hget(`nodemail:${username}`, 'code') // 存储key 值nodemail username做关联的
        // 过期时间
        const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')// Redis Hget 命令用于返回哈希表中指定字段的值。
        if(code === saveCode) {
            if(new Date().getTime() - saveExpire > 0 ){
                ctx.body = {
                    code: -1,
                    msg: '验证码已过期'
                }
                return false
            }
        }else {
            ctx.body = {
                code:-1,
                msg: '请填写正确的验证码'
            }         
        }
    }else {
        ctx.body = {
            code: -1,
            msg: '请填写验证码'
        }
    }
    // 是否是注册用户
    let user = await User.find({ username })
    if(user.length ) {
        ctx.body = {
            code: -1,
            msg: '(user)已被注册'
        }
        return
    }
    let nuser = await User.create({ // 创建新用户
        username,
        password,
        email
    })
    if(nuser) {
        let res = await axios.post('/users/signin', {username, password})
        if(res.data && res.data.code === 0){
            ctx.body = {
                code: 0,
                msg: '注册成功',
                user: res.data.user
            }
        }else {
            ctx.body = {
                code: -1,
                msg: 'error'
            }
        }
    }else{
        ctx.body = {// 写库操作
            code: -1,
            msg: '注册失败'
        }
    }
})

// 二 、用户登录

router.post('/signin', async (ctx, next) => {
    // console.log('登录接口', ctx)
    return Passport.authenticate('local', function(error, user, info, status){
        if(error) {
            ctx.body = {
                code: -1,
                msg: error
            }
        }else{
            if(user){
                ctx.body = {
                    code: 0,
                    msg: '登陆成功',
                    user
                }
                return ctx.login(user)  // 登录动作
            }else{  // 没有用户
                ctx.body = {
                    code: 1,
                    info
                }
            }
        }
    })(ctx, next)
})

// 三、邮件验证
router.post('/verify', async (ctx, next) => {
    console.log('到达：verify')
    let username = ctx.request.body.username
    // 如何获得过期时间，没有代码体现 新用户是 null
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    console.log('过期时间 saveExpire', '当前时间:',new Date().getTime(), '过期时间:', saveExpire, new Date().getTime()-saveExpire)
    if(saveExpire && new Date().getTime() - saveExpire < 0){
        ctx.body = {
            code: -1,
            msg: "1分钟请求一次"
        }
        return false
    }

    //发邮件 发送信息
    let transport = nodeMailer.createTransport({
        host: Email.smtp.host,
        port: 587,
        secure: false,  // ture false 监听其他端口
        auth:{  // 验证
            user: Email.smtp.user,
            pass: Email.smtp.pass
        }
    })
    // 要接收方的信息
    let ko = {
        code: Email.smtp.code(),
        expire: Email.smtp.expire(),
        email: ctx.request.body.email,
        user: ctx.request.body.username
    }
    // 显示信息
    let mailOptions = {
        from: `"认证邮箱"<${Email.smtp.user}>`,
        to: ko.email,
        subject: '《美团网实战》 注册码',
        html: `您在《美团实战》 中注册， 您的验证码是${ko.code}`
    }
    // 发送邮件
    await transport.sendMail(mailOptions, (err, info) => {
        if(err) {
            return console.log('发送邮件', err)
        }else{
            Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)// 是 hmset() 不是hset
        }
    })
    ctx.body = {
        code: 0,
        msg: '验证码已发送，会有延迟，有效期1分钟'
    }
})

// 退出
router.get('/exit', async (ctx, next) => {
    await ctx.logout()
    if(!ctx.isAuthenticated()){
        ctx.body = {
            code: 0
        }
    }else{
        ctx.body = {
            code: -1
        }
    }
})

// 获取用户名接口

router.get('/getUser', (ctx, next) => {
    if(ctx.isAuthenticated()) { // 查看是否登录
        const {username, email} = ctx.session.passport.user
        ctx.body = {
            user: username,
            email
        }
    }else{
        ctx.body = {
            user: '',
            email: '',
            info:'当前无用户登录'
        }
    }
})

export default router



