<template>
    <section class="m-istyle">
        <dl >
            <dt>有格调</dt>
            <dd
                :class="{active:kind==='all'}"
                kind="all"
                keyword="景点">全部</dd>
            <dd
                :class="{active:kind==='part'}"
                kind="part"
                keyword="美食">约会聚餐</dd>
            <dd
                :class="{active:kind==='spa'}"
                kind="spa"
                keyword="丽人">丽人SPA</dd>
            <dd
                :class="{active:kind='movie'}"
                kind="movie"
                keyword="电影">电影演出</dd>
            <dd
                :class="{active:kind='travel'}"
                kind="travel"
                keyword="旅游">品质出游</dd>
        </dl>

        <ul class="ibody">
            <li
                v-for="item in cur" :key="item.title">
                <el-card
                    :body-style="{ padding: '0px' }"
                    shadow="never">
                    <img 
                        :src="item.img" 
                        class="image">
                    <ul class="cbody">
                        <li class="title">{{ item.title }}</li>
                        <li class="pos">{{ item.pos }}</li>
                        <li class="price">￥<em>{{ item.price }}</em><span>/起</span></li>
                    </ul>
                </el-card>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    data: () => {
        return {
            kind: 'all',
            list: {
                all: [{
                    title: '吉山尚合酒店',
                    pos: '酒店周边',
                    price: '530',
                    img: '//p1.meituan.net/tdchotel/836bb3e109b1c705d2e5f50d9bff70dc9820182.jpg@368w_208h_1e_1c',
                    url: '//abc.com'
                }, {
                    title: '耀莱国际影城',
                    pos: '免押金，可停车',
                    price: Math.ceil(Math.random() * 400),
                    img: '//p1.meituan.net/tdchotel/836bb3e109b1c705d2e5f50d9bff70dc9820182.jpg@368w_208h_1e_1c',
                    url: '//abc.com'
                }, {
                    title: '三只耳河鲜馆',
                    pos: '双人套餐',
                    price: '520',
                    img: '//p1.meituan.net/tdchotel/836bb3e109b1c705d2e5f50d9bff70dc9820182.jpg@368w_208h_1e_1c',
                    url: '//abc.com'
                }, {
                    title: '良子健身',
                    pos: '良子健身',
                    price: '510',
                    img: '//p1.meituan.net/tdchotel/836bb3e109b1c705d2e5f50d9bff70dc9820182.jpg@368w_208h_1e_1c',
                    url: '//abc.com'
                }],
                part: [],
                spa: [],
                movie: [],
                travel: []
            }
        }
    },

    computed: {
    cur: function () {
      return this.list['all']
    }
  },

  methods: {
      over: function() {

      }
  }
}
</script>

<style lang="scss">
    @import '@/assets/css/index/artistic.scss';
</style>

