import Router from 'koa-router'
import axios from './untils/axios'

let router = new Router({prefix: '/geo'})

const sign = '123'// 根据自己账号生成

router.get('/getPosition', async(ctx) =>{
    let {
        status,
        data:{
            province,
            city
        }
    } = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)// 慕课 uid 获取自己的签名
    // console.log('后端返回当前城市',)    
    if(status === 200) {
        ctx.body = {
            province,
            city
        }
    } else {
        ctx.body = {
            province: '',
            city: ''
        }
    }
})
// 获取菜单
router.get('/menu', async(ctx) => {
    let {
        status,
        data: { menu }
    } = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`)
    // console.log('后端返回菜单', status)       
    if(status === 200) {
        ctx.body = {
            menu
        }
    } else {
        ctx.body = {
            menu: []
        }
    }
})

// 获取省份
// 2. 线上获取所有数据
router.get('/province', async(ctx) => {
    let {status, data: { province }} = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
    ctx.body = {
       province: status === 200 ? province : []
    }
})

export default router