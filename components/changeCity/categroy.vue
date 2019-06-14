<template>
    <div class="">
        <dl class="m-categroy">
            <dt>按拼音首字母选择：</dt>
            <dd
                v-for="item in list" 
                :key="item">
                <a :href="'#city-'+item">{{ item }}</a>
                </dd>
        </dl>
        <!-- 字母和列表 用dl dtdd -->
        <dl
            v-for="item in block"
            :key="item.title"
            class="m-categroy-section">
                <dt :id="'city-'+item.title">{{ item.title }}</dt>
                <dd>
                    <span
                        v-for="c in item.city"
                        :key="c">{{ c }}</span>
                </dd>
        </dl>
    </div>
</template>

<script>
import pyjs from 'js-pinyin'// 拼音处理库
export default {
    data(){
        return {
            // list: ['A','B','C']
            list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
            block:[]
        }
    },
    async mounted() {
        let self = this
        let blocks = []
        let {status, data:{city}}  = await self.$axios.get('/geo/city')
        if(status === 200) {
            let p
            let c
            let d = {}
            city.forEach(item => {
                p = pyjs.getFullChars(item.name).toLocaleLowerCase().slice(0,1) // 获取汉子的拼音首字母
                c = p.charCodeAt(0)
                if(c>96&&c<123) {
                    if(!d[p]){
                        d[p] = []
                    }
                    d[p].push(item.name)// 相对应首字母下的所有城市集合

                }
            });
            // console.log(d,'dddd')
            for(let [k,v] of Object.entries(d)) { // ?
                blocks.push({
                    title: k.toUpperCase(),// 首字母转换城大写
                    city: v
                })
            }
            // console.log(blocks,'bbbbb')
            blocks.sort((a,b) => a.title.charCodeAt(0)-b.title.charCodeAt(0)) // ?
            self.block = blocks
        }
    }
}
</script>

<style lang="scss">
    @import "@/assets/css/changeCity/categroy.scss";
</style>

