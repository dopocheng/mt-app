<template>
    <div>
        <el-row>
            <el-col :span="24">
                <iSelect/>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <hot/>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <category/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import iSelect from '@/components/changeCity/iselect'
import Hot from '@/components/changeCity/hot'
import Category from '@/components/changeCity/categroy'
export default {
    components:{
        iSelect,
        Hot,
        Category
    }
}
</script>

<style>
</style>