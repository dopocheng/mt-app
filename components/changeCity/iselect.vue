<template>
    <div class="m-iselect">
        <span class="name">按省份选择:</span>
        <el-select v-model="pvalue" placeholder="省份">
            <el-option
                v-for="item in province"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <el-select 
            v-model="cvalue" 
            :disabled="!city.length"
            placeholder="城市"
            >
            <el-option
                v-for="item in city"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <span class="name">精确搜索:</span>
        <el-autocomplete
            v-model="input"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入城市拼音"
            @select="handleSelect">
        </el-autocomplete>
    </div>
</template>

<script>

import _ from 'lodash'
export default {
    data(){
        return {
            province:[],
            pvalue:'',
            city: [],
            cvalue: '',
            input: '',
            cities:[]
        }
    },
    watch: {// 监听省份变化，加载相应城市
        pvalue: async function(newPvalue){
            let self = this;
            let {status, data: {city}} = await self.$axios.get(`/geo/province/${newPvalue}`)
            if(status === 200) {
                self.city = city.map(item => {
                    return {
                        value: item.id,
                        label: item.name  
                    }
                })
            self.cvalue=''  
            }
        }
    },
    mounted: async function() {
        // 等待页面加载完成后，请求省份的所有数据
        let self = this
        let {status, data: {province}} = await self.$axios.get('/geo/province')
        if(status === 200) {
            self.province = province.map(item => {
                return {
                    value: item.id,
                    label: item.name
                }
            })
        }
    },
    methods:{
        querySearchAsync:_.debounce(async function(query, cb){
            // 判断有无全国城市列表，有则过滤符合输入条件的数据
            let self = this
            if(self.cities.length) {
                cb(self.cities = self.cities.filter(item => item.value.indexOf(query)>-1))
            } else {
                let {status, data:{city}} = await self.$axios.get('/geo/city')
                if(status === 200) { 
                    self.cities = city.map(item => {
                        return{
                            value: item.name
                        }
                    })
                    cb(self.cities = self.cities.filter(item => item.value.indexOf(query)>-1))
                } else {
                    cb([])
                }
            }
        },200),
        handleSelect: function(item){
            console.log(item.value)
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/css/changeCity/iselect.scss"
</style>

