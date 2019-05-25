export default {
    dbs: 'mongodb://127.0.0.1:27017/student',// 连接数据库
    redis: {
        get host() {    // 只读 主机
            return '127.0.0.1'
        },
        get port() {    // 端口号
            return 6379
        },
    },
    smtp: {
        get host() {
            return 'smtp.qq.com'    // 腾讯服务器地址
        },
        get user() {    // 用户邮箱
            return '747015697@qq.com'
        },
        get pass() {    // qq邮箱生成授权码
            return 'xmblblmncshpbfjb'
        },
        get code() {    // 生成验证码
            return () => {
                return Math.random().toString(16).slice(2,6).toUpperCase() // 转成大写
            }
        },
        get expire() {
            return () => {
                console.log('验证码获取',(new Date().getTime()))// 获得是时间戳
               return new Date().getTime() + 60*1000   // 设置验证码有效时间，任何文件都可取
            }
        }
    }
}