require('dotenv').config();




export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Boilerplate',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name:'application-name', content:'&nbsp;'},
      { name:'msapplication-TileColor', content:'#FFFFFF' },
      { name:'msapplication-TileImage', content:'/favicon/mstile-144x144.png' },
      { name:'msapplication-square70x70logo', content:'/favicon/mstile-70x70.png' },
      { name:'msapplication-square150x150logo', content:'/favicon/mstile-150x150.png' },
      { name:'msapplication-wide310x150logo', content:'/favicon/mstile-310x150.png' },
      { name:'msapplication-square310x310logo', content:'/favicon/mstile-310x310.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
      { rel:'apple-touch-icon-precomposed', sizes:'57x57', href:'/favicon/apple-touch-icon-57x57.png'},
        { rel:'apple-touch-icon-precomposed', sizes:'114x114', href:'/favicon/apple-touch-icon-114x114.png'},
        { rel:'apple-touch-icon-precomposed', sizes:'72x72', href:'/favicon/apple-touch-icon-72x72.png'},
        { rel:'apple-touch-icon-precomposed', sizes:'144x144', href:'/favicon/apple-touch-icon-144x144.png'},
        { rel:'apple-touch-icon-precomposed', sizes:'60x60', href:'/favicon/apple-touch-icon-60x60.png'},
        { rel:'apple-touch-icon-precomposed', sizes:'120x120', href:'/favicon/apple-touch-icon-120x120.png'},
        { rel:'apple-touch-icon-precomposed', sizes:'76x76', href:'/favicon/apple-touch-icon-76x76.png'},
        { rel:'apple-touch-icon-precomposed', sizes:'152x152', href:'/favicon/apple-touch-icon-152x152.png'},
        { rel:'icon', type:'image/png', href:'/favicon/favicon-196x196.png', sizes:'196x196'},
        { rel:'icon', type:'image/png', href:'/favicon/favicon-96x96.png', sizes:'96x96'},
        { rel:'icon', type:'image/png', href:'/favicon/favicon-32x32.png', sizes:'32x32'},
        { rel:'icon', type:'image/png', href:'/favicon/favicon-16x16.png', sizes:'16x16'},
        { rel:'icon', type:'image/png', href:'/favicon/favicon-128.png', sizes:'128x128'},
        
      // Adobe fonts
      { rel:"stylesheet", href:"https://use.typekit.net/coc7iap.css" }
    ]
  },
  // Public config variables
  publicRuntimeConfig: {
    nodeEnv:process.env.NODE_ENV,
    graphqlPath:process.env.GRAPHQL_PATH,
    serverHost:process.env.SERVER_HOST,
    serverPort:process.env.SERVER_PORT,
    apiBaseUrl:process.env.API_BASE_URL,
    baseUrl:process.env.BASE_URL,
    graphqlToken:process.env.GRAPHQL_TOKEN
  },
  // private config variables
  privateRuntimeConfig: {
    //graphqlToken:process.env.GRAPHQL_TOKEN
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
     '~/plugins/flexboxgrid/index',
     '~/plugins/vue-lazyload.client',
     '~/plugins/flickity.client.js'
  ],

  // dev mode
  dev: process.env.NODE_ENV !== 'production',

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/dotenv',
  ],


  // server settngs for host and port
  server: {
    port: process.env.SERVER_PORT, // default: 3000
    host: process.env.SERVER_HOST // default: localhost
  },


// server functions rendered before nuxt renders the site
  serverMiddleware: [
    // will force the www version of the production domain
    //'~/api/force-domain'
  ],



// Customize the progress-bar color
  loading: { color: '#FBE4D3', height: '4px' },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
  '@nuxtjs/apollo',
  '@nuxtjs/style-resources',
  //'nuxt-i18n',
  // 'nuxt-seomatic-meta',
  // '@nuxtjs/axios', // needed for nuxt seomatic meta
  ],

  // Internationalization for multi-languages

  i18n: {
    locales: [
      {code:'en', iso:'en-GB', file:'en-GB.js', name:'English'}
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    seo: false,
    lazy:true,
    langDir: 'lang/',
    detectBrowserLanguage: { 
      alwaysRedirect: false, 
      fallbackLocale: '', 
      onlyOnRoot: true, 
      useCookie: true, 
      cookieCrossOrigin: false, 
      cookieDomain: null, 
      cookieKey: 'i18n_redirected', 
    cookieSecure: false },
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          welcome: 'Welcome'
        },
      }
    }
  },

  // Apollo config and endpoint for graph ql
  apollo: {
    includeNodeModules: true,
    clientConfigs: {
      default: '@/apollo/client-configs/default.js'
    }
  },

  // CSS style resources for sass compiling - variables only - no actual css.
  styleResources: {
    scss: [
      '~/assets/scss/_variables/colors.scss',
      '~/assets/scss/_variables/borders.scss',
      '~/assets/scss/_variables/max-widths.scss',
      '~/assets/scss/_variables/multiples.scss',
      '~/assets/scss/_variables/breakpoints.scss',
      '~/assets/scss/_variables/easings.scss',
      '~/assets/scss/_variables/fonts.scss',
      '~/assets/scss/_variables/shadows.scss',
      '~/assets/scss/_mixins/*.scss',

    ]
  },

  // SEOMATIC config
  // seomaticMeta: {
  //   debug: process.env.NODE_ENV !== 'production',
  //   backendUrl: process.env.API_BASE_URL,
  //   graphqlPath: process.env.GRAPHQL_PATH,
  //   graphqlToken: process.env.GRAPHQL_TOKEN,
  // },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/scss/global'
  ],

  // Proxy
  proxy: {
      //'/graphql': { target: process.env.API_BASE_URL },
      //'/actions/': { target: process.env.API_BASE_URL },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    // extend webpack here
    extend (config, ctx) {
      config.node = {
        fs: 'empty'
      },
      config.resolve = config.resolve || {}
      config.resolve.symlinks = false
    }
  }
}
