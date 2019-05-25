import passport  from 'koa-passport'    // passport 
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'  // 查用户表

// 用法固定

passport.use(new LocalStrategy(async function(username,password,done){
    let where = {
        username
    };
    // console.log('passport', UserModel.findOne(where))
    let result = await UserModel.findOne(where)
    console.log('登录加密前密码passport', password)
    // console.log('数据库查找用户',result,'用户:', username, '密码:', password )
    if(result != null) {
        if(result.password === password) { // 数据库查出来的密码和输入的对比
            console.log('done is not defined',result)
            return done(null, result)
        }else{
            return done(null, false, '密码错误')
        }
    }else{
        return done(null, false, '用户不存在')
    }
}))

    // 用户每次进来用session 进行验证
passport.serializeUser(function(user, done){    // 序列化 登录成功后存在 session 中
    done(null, user)
})

passport.deserializeUser(function(user, done){
    return done(null, user)
})

export default passport