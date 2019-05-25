<template>
    <div class="m-user">
        <template v-if="user">
            欢迎您,<span class="username">{{ user }}</span>
            [<nuxt-link to="/exit">退出</nuxt-link>]
        </template>
        <template v-else>
            <nuxt-link
                class="login"
                to="/login">立即登录</nuxt-link>
            <nuxt-link
                class="register"
                to="/register">注册</nuxt-link>

        </template>
    </div>
</template>

<script>
export default {
    data () {
        return{
            user: '' 
        }
    },
    mounted: function() {
        this.$axios.get('/users/getUser').then(({status, data:{user,info}}) =>{
            // console.log('11111',user)
            if(status === 200){
                if(user){
                    this.user = user
                }else{
                    console.log('获取user失败'+ info)
                }
            }else{
                console.log('获取用户信息失败' + status)
            }
        }) 
    }
}
</script>
