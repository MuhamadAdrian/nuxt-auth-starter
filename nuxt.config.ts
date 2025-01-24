// https://nuxt.com/docs/api/configuration/nuxt-config
import Icons from 'unplugin-icons/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@sidebase/nuxt-auth',
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui',
  },
  googleFonts: {
    display: 'swap',
    families: {
      Poppins: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  },
  auth: {
    globalAppMiddleware: true,
    provider: {
      type: 'local',
      pages: {
        login: '/auth/login',
      },
      token: {
        signInResponseTokenPointer: '/data/token',
      },
      refresh: {
        isEnabled: false,
        token: {
          signInResponseRefreshTokenPointer: '/data/refresh_token',
          refreshRequestTokenPointer: '/refresh_token',
          cookieName: 'auth.refresh-token',
        },
        refreshOnlyToken: false,
      },
      session: {
        dataType: {
          id: 'string | number',
          name: 'string',
          email: 'string',
        },
        dataResponsePointer: '/data',
      },
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        getSession: { path: '/user', method: 'post' },
        signOut: { path: '/logout', method: 'post' },
      },
    },
  },
  vue: {
    propsDestructure: true,
  },
  runtimeConfig: {
    public: {
      authSecret: 'SECRET',
      baseApiUrl: 'http://localhost:5000/api'
    },

  },
  vite: {
    plugins: [
      Icons({
        autoInstall: true, // Automatically installs missing icon packages
      }),
    ],
  },
  typescript: {
    typeCheck: false,
  },
})
