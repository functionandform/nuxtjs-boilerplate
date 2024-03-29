require('dotenv').config();
import axios from 'axios';



export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'The Writer',
    htmlAttrs: {
      lang: 'en-GB'
    },
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
        { rel:'icon', type:'image/png', href:'/favicon/favicon-128.png', sizes:'128x128'}
        
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
    '~/plugins/vue-check-view.client.js',
    '~/plugins/global-mixins.js',
    '~/plugins/vue-case',
    '~/plugins/filters/date-format',
    '~/plugins/filters/slug-to-title',
    '~/plugins/filters/tidy-url',
    '~/plugins/filters/truncate',
    '~/plugins/filters/camel-to-sentence',
    '~/plugins/filters/pretty-bytes'
  ],


  // transition mode
  pageTransition: {
    name: 'fade',
    mode: 'out-in'
  },

  // dev mode
  dev: process.env.NODE_ENV !== 'production',

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components:true,

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
  loading: false,

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
  '@nuxtjs/apollo',
  '@nuxtjs/style-resources',
  'vue-social-sharing/nuxt',
  'vue-scrollto/nuxt',
  'nuxt-protected-mailto',
  '@nuxtjs/gtm',
  '@nuxtjs/robots',
  '@nuxtjs/proxy'
  //'@nuxtjs/redirect-module'
  ],

  // ROBOTS FOR search engine crawling
  robots: () => {
    if (process.env.ENVIRONMENT && process.env.ENVIRONMENT === 'production') { // production environment - allow robots
      return { 
        sitemap: process.env.BASE_URL+'/sitemaps-1-sitemap.xml',
        UserAgent: '*',
        Disallow: ['/admin', '/.env', '/users']
      }
    } else { // every other environment - block robots
      return { 
        UserAgent: '*',
        Disallow: '/'
      }
    }
  },

  // redirects
//   redirect: async () => {
//     const baseUrl = process.env.API_BASE_URL; // get API url
//     const endpoint = '/actions/retour/api/get-redirects'; // get endpoint path
//     const api = baseUrl+endpoint;
//     const redirects = await axios.get(api) // await axios endpoint query;

    
//     const formattedRedirects = redirects.data.map(redirect => { // map redirect array and reformat it for redirect module requirements
//         let formattedRedirect = {};
//         formattedRedirect.from = redirect.redirectSrcUrl
//         formattedRedirect.to = redirect.redirectDestUrl
//         formattedRedirect.statusCode = redirect.redirectHttpCode
//         return formattedRedirect
//     })
//     return formattedRedirects;
// },

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
      '~/assets/scss/_functions/*.scss',

    ]
  },


  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/scss/global'
  ],

  // Google tag manager using the nuxt GTM module
  gtm: {
    id: process.env.GTM_ID,
    autoInit: false, // turning off auto init so that the cookie consent component can init if accepted
  },

  // Proxy
  proxy: {
    '/*sitemap.xml': process.env.API_BASE_URL,
    '/*sitemap.xsl': process.env.API_BASE_URL,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    // some chunking optimisations
    extractCSS: true,
      optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.(css|vue)$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    html: { // needed for nuxt-protected-mailto component
      minify: {
        decodeEntities: false
      }
    },
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
