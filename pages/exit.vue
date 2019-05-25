<template>
  <div class=""/>
</template>

<script>
export default {
  layout:'black',
    // 组件的中间件什么时候执行 没有按钮到达页面自动化执行
  middleware: async (ctx) => {
    let {status, data} = await ctx.$axios.get('/users/exit')
    if(status === 200 && data && data.code === 0){
            window.location.href = '/'
          } 
  }
// 方法2
  // middleware: (ctx) => {

  //     ctx.$axios.get('/users/exit').then(({status, data}) => {
  //         if(status === 200 && data && data.code === 0){
  //           window.location.href = '/'
  //         } 
  //     })
  //   }
}
</script>