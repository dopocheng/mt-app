import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex)
const store = () => new Vuex.Store({
    modules: {
        geo,
        home
    },
    actions: {
        async nuxtServerInit({ // 什么时候执行
            commit
        }, {req, app}){
            const { 
                status, 
                data: {
                    province, 
                    city
                }
            } = await app.$axios.get('/geo/getPosition')
            // console.log('store请求接口', province, city, status)
            commit('geo/setPosition', status === 200 ? {province, city} : {province:'',city: ''})
            const {status: status2, data: { menu }} = await app.$axios.get('geo/menu')
            // console.log('store请求接口',status2, menu)
            commit('home/setMenu', status2 === 200 ? menu : [])
            const {status: status3, data:{ hotPlace }} = await app.$axios.get('/search/hotPlace',{
                params: {
                    city: app.store.state.geo.position.city.replace('市', '')
                }
            })
            // console.log('store请求接口','status3:'+status3, hotPlace)            
            commit('home/setHotPlace', status3 === 200 ? hotPlace : [])
        }
    }
})

export default store