<template>
    <div class="m-nav">
        <ul class="nav">
            <li class="list">
                <nuxt-link to="/my">我的美团</nuxt-link>
                <dl>
                    <dd><nuxt-link to="/order">我的订单</nuxt-link></dd>
                    <dd><nuxt-link to="/order">我的收藏</nuxt-link></dd>
                    <dd><nuxt-link to="/order">抵用券</nuxt-link></dd>
                    <dd><nuxt-link to="/order">账户管理</nuxt-link></dd>
                </dl>
            </li>
            <li>
                <nuxt-link to="/order">手机app</nuxt-link>
            </li>
            <li class="list bd">
                <nuxt-link to="/center">商家中心</nuxt-link>
            </li>
            <li class="list site">
                <nuxt-link to="/site">网站导航</nuxt-link>
                <div class="subContainer">
                    <dl class="hotel">
                        <dt>酒店旅欧</dt>
                        <dd>吉山酒店</dd>
                        <dd>吉山酒店</dd>
                        <dd>吉山酒店</dd>
                        <dd>吉山酒店</dd>
                        <dd>吉山酒店</dd>
                        <dd>吉山酒店</dd>
                        <dd>吉山酒店</dd>
                        <dd>吉山酒店</dd>
                        <dd>吉山酒店</dd>
                    </dl>
                    <dl class="food">
                        <dt>吃美食</dt>
                        <dd>烧烤</dd>
                        <dd>烧烤</dd>
                        <dd>烧烤</dd>
                        <dd>烧烤</dd>
                        <dd>烧烤</dd>
                        <dd>烧烤</dd>
                        <dd>烧烤</dd>
                        <dd>烧烤</dd>
                        <dd>烧烤</dd>
                    </dl>
                    <dl class="movie">
                        <dt>看电影</dt>
                        <dd>驯龙高手</dd>
                        <dd>驯龙高手</dd>
                        <dd>驯龙高手</dd>
                        <dd>驯龙高手</dd>
                        <dd>驯龙高手</dd>
                        <dd>驯龙高手</dd>
                        <dd>驯龙高手</dd>
                        <dd>驯龙高手</dd>
                    </dl>
                    <dl class="app">
                        <dt>手机应用</dt>
                        <dd>
                            <a href="#">
                                <img
                                    src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/appicons/meituan.png"
                                    title="美团app"
                                    alt="美团app">
                            </a>
                        </dd>
                        <dd>
                            <a href="#">
                                <img
                                    src="//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/waimai.png"
                                    title="外卖app"
                                    alt="外卖app">
                            </a>
                        </dd>
                        <dd>
                            <a href="#">
                                <img
                                    src="//s0.meituan.net/bs/fe-web-meituan/404d350/img/appicons/zhenguo.png"
                                    title="榛果app"
                                    alt="榛果app">
                            </a>
                        </dd>
                        <dd>
                            <a href="#">
                                <img
                                    src="//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/dianping.png"
                                    title="点评app"
                                    alt="点评app">
                            </a>
                        </dd>
                        <dd>
                            <a href="#">
                                <img
                                    src="//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/maoyan.png"
                                    title="猫眼app"
                                    alt="猫眼app">
                            </a>
                        </dd>
                    </dl>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    
} 
</script>
<style lang="css"></style>
