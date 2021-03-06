const pkg = require('./package')


module.exports = {
  mode: 'universal',
 

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
// 本地调试
  configureWebpack: {
    devtool: 'source-map'
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/reset.css',
    'element-ui/lib/theme-chalk/index.css',
    '~assets/css/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // '@/plugins/element-ui'
    { src: '@/plugins/element-ui', ssr: false}
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios' // 请求地址
  ],

  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {// 和视频不一样
    },
    cashe: false  // 解决 document undefined 报错
  }
}
