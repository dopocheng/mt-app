<template>
    <div class="page-register">
        <article class="header">
            <header>
                <a href="/" class="site-logo"></a>
                <span class="login">
                    <em class="bold">已有美团账号</em>
                    <a href="/login">
                        <el-button
                            type="primary"
                            size="small">登录</el-button>
                    </a>
                </span>
            </header>
        </article>
        <section>
            <el-form 
                ref="ruleForm" 
                :model="ruleForm" 
                :rules="rules" 
                label-width="100px" 
                class="demo-ruleForm">
                <el-form-item 
                    label="昵称" 
                    prop="name">
                    <el-input 
                        v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item 
                    label="邮箱" 
                    prop="email">
                    <el-input v-model="ruleForm.email"/>
                    <el-button 
                        size="mini" 
                        round 
                        @click="sendMsg">发送验证码</el-button>
                    <span class="status">{{ statusMsg }}</span>
                </el-form-item>
                <el-form-item 
                    label="验证码" 
                    prop="code">
                    <el-input v-model="ruleForm.code" maxlength="4"/>
                </el-form-item>
                <el-form-item 
                    label="密码" 
                    prop="pwd">
                    <el-input v-model="ruleForm.pwd" type="password"/>
                </el-form-item>
                <el-form-item 
                    label="确认密码" 
                    prop="cpwd">
                    <el-input v-model="ruleForm.cpwd" type="password"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="register">同意一下协议并注册</el-button>
                    <div class="error">{{ error }}</div>
                </el-form-item>
                <el-form-item>
                协议内容
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
    data(){
        return {
            statusMsg: '',
            error: '',
            ruleForm: {
                name: '',
                code: '',
                pwd: '',
                cpwd: '',
                email: ''
            },
            rules: {
                name: [{
                    required: true,type:'string',message:'请输入昵称',trigger:'blur'
                }],
                email: [{
                    required: true,type:'email',message:'请输入邮箱',trigger:'blur'
                }],
                pwd: [{
                    required: true,message:'创建密码',trigger:'blur'
                }],
                cpwd: [{
                    required: true,
                    validator: (rule, value, callback) => {
                    // console.log('确认密码',value)
                    if (value === '') {
                      callback(new Error('请再次输入密码'))
                    } else if (value !== this.ruleForm.pwd) {
                      callback(new Error('两次输入密码不一致'))
                    } else {
                      callback()
                    }
                  },
                  trigger: 'blur'
                }]
            }
        }
    },
    layout: 'blank',
    methods: {
        sendMsg: function() {
            console.log('再次点击发送验证码')
            const self = this
            let namePass 
            let emailPass
            console.log(self.timerid)
            if(self.timerid) {
                return false
            }
            console.log('发送验证码',this.$refs)
            this.$refs['ruleForm'].validateField('name', (valid) => {
                namePass = valid
            })
            self.statusMsg = ''
            if(namePass) {
                return false
            }        
            this.$refs['ruleForm'].validateField('email', (valid) => {
                emailPass = valid
            })
            if(!namePass && !emailPass){
                // console.log('发送',self)
                self.$axios.post('/users/verify', {
                    username: encodeURIComponent(self.ruleForm.name),
                    email: self.ruleForm.email
                }).then(({
                    status,
                    data
                    }) => {
                    if (status === 200 && data.code, data.code ===0 ){
                        let count = 60
                        self.statusMsg = `验证码已发送,剩余 ${ count-- }`
                        self.timerid = setInterval(function() {
                            self.statusMsg = `验证码已发送，剩余 ${ count-- }`
                            if( count === 0) {
                                clearInterval(self.timerid) // 清除定时器但 self.timerid 还在要清0
                                self.self.timerid = 0
                                // console.log('发送即时结束后：',self.timerid)
                                self.statusMsg = ''   
                            }
                        }, 1000)
                    } else {
                        self.statusMsg = data.msg
                    }
                })
            }
        },
        register: function() {
            let self = this
            this.$refs['ruleForm'].validate((valid) => {
                if(valid){
                    self.$axios.post('/users/signup', {
                        username:encodeURIComponent(self.ruleForm.name),
                        email:self.ruleForm.email,
                        password:CryptoJS.MD5(self.ruleForm.pwd).toString(),
                        code:self.ruleForm.code
                    }).then(({
                        status,
                        data
                    }) => {                     
                        if(status === 200){
                            if(data && data.code === 0){
                                location.href = '/login'
                            }else{
                                self.error = data.msg
                            }
                        }else{
                            self.error = `服务器出错，错误码：${status}`
                        }
                        setTimeout(function(){
                            self.error= ''
                        }, 1500)
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss">
    @import "@/assets/css/register/index.scss";
</style>


