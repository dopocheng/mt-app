import Router from 'koa-router'
import  axios from './untils/axios'

let router = new Router({prefix: '/search'})

const sign = '123'// 根据自己账生成

// 搜索框
router.get('/top', async (ctx) => {
let { status,data:{top} } = await axios.get(`http://cp-tools.cn/search/top`,{ // 接口请求错误 多加了?sign=${sign}
    params: {
        input: ctx.query.input,// 注意字符串编码问题 encodeURIComponent()
        city: ctx.query.city,
        sign
    }
})
    ctx.body = {
        top : status === 200 ? top : []
    }
})

// 热门景点
router.get('/hotPlace', async (ctx) => {
    let city = ctx.store ? ctx.store.state.geo.position.city : ctx.query.city // query 用法
    // console.log('hotPlace 后端数据',ctx.store, city)
    let {status, data: {result}} =await axios.get(`http://cp-tools.cn/search/hotPlace`, { // 少 await 服务会报错 result 也要和后台相对应
        params: {
            sign,
            city
        }
    })
    ctx.body = {
        hotPlace : status === 200 ? result : []
    }
})

// artistic 页面接口
router.get('/resultsByKeywords', async (ctx) => {
    const {city, keyword} = ctx.query // 或 city: ctx.query.city
    let {status, data: {count, pois}} = await axios.get('http://cp-tools.cn/search/resultsByKeywords',{
        params: {
            city,
            keyword,
            sign
        }
    })
    ctx.body = {
        count: status === 200 ? count : 0,
        pois: status === 200 ? pois : []
    }
})

export default router