// const path = require('path')
// const vuxLoader = require('vux-loader')
const pkg = require('./package')

module.exports = {
  loading: '@/components/loading/index.vue',
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1,maximum-scale=1,viewport-fit=cover'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    script: [
      {
        type: 'text/javascript',
        src: `//at.alicdn.com/t/${pkg.iconFont}.js`,
        defer: true,
        async: true
      }
    ],
    link: [
      {
        href: `//at.alicdn.com`,
        rel: 'dns-prefetch'
      },
      {
        href: `//at.alicdn.com/t/${pkg.iconFont}.css`,
        rel: 'stylesheet'
      }
    ]
  },

  // /*
  //  ** Customize the progress-bar color
  //  */
  // loading: {
  //   color: '#fff'
  // },

  /*
   ** Global CSS
   */
  css: [],

  env: {
    PRODUCT_TYPE: process.env.PRODUCT_TYPE
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/utils/base.js',
    '@/plugins/request.js',
    {
      src: '@/plugins/utils/client.js',
      ssr: false
    },
    {
      src: '@/plugins/directive/ccscroll/index.js',
      ssr: false
    }
    // {
    //   src: '~/plugins/vux-plugins',
    //   ssr: false
    // },
    // {
    //   src: '~/plugins/vux-components',
    //   ssr: true
    // }
  ],
  router: {
    // middleware: 'router'
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  styleResources: {
    less: './assets/**/*.less'
  },

  /*
   ** Build configuration
   */
  build: {
    publicPath: '/my-doctor-ssr/h5/dist/',
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      // const configs = vuxLoader.merge(config, {
      //   options: {
      //     ssr: true
      //   },
      //   plugins: [
      //     'vux-ui'
      //     // {
      //     //   name: 'less-theme',
      //     //   path: path.join(__dirname, './styles/theme.less')
      //     // }
      //   ]
      // })

      // return configs
    }
  }
}
