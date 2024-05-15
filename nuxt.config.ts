import eslintPlugin from "vite-plugin-eslint";
const PORT = Number(process.env.APP_PORT) || 3000;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true
  },
  srcDir: "src",
  devServer: {
    port: PORT
  },
  typescript: {
    shim: false
  },
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: [["defineStore", "definePiniaStore"]]
      }
    ],
    "@nuxtjs/device",
    "@vueuse/nuxt",
    "radix-vue/nuxt",
    "@nuxtjs/i18n"
  ],
  i18n: {
    locales: [
      { code: "ru", file: "ru.json" },
      { code: "en", file: "en.json" },
      { code: "kk", file: "kk.json" }
    ],
    strategy: "no_prefix",
    lazy: true,
    langDir: "shared/assets/locales",
    defaultLocale: "ru",
    detectBrowserLanguage: false,
    vueI18n: "i18n.config.ts"
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      devToken: process.env.NUXT_PUBLIC_DEV_TOKEN
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "ru"
      },

      title: "Кабинет Seenday",

      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" },
        { hid: "description", name: "description", content: "" },
        { hid: "keywords", name: "keywords", content: "" },
        { name: "yandex-verification", content: "02181fad083eb12a" }
      ],

      link: [
        { rel: "icon", type: "image/x-icon", href: "/lk/favicon.ico" },
        { rel: "stylesheet", href: "/lk/fonts/open-sans-regular/stylesheet.css" },
        { rel: "stylesheet", href: "/lk/fonts/open-sans-semibold/stylesheet.css" },
        { rel: "stylesheet", href: "/lk/fonts/pt-sans-regular/stylesheet.css" },
        { rel: "stylesheet", href: "/lk/fonts/FuturaPT-Bold/stylesheet.css" },
        { rel: "stylesheet", href: "/lk/fonts/fontawesome/stylesheet.css" }
      ]
    },
    baseURL: "/lk/",
    cdnURL: "/lk/"
  },

  css: ["~/shared/assets/styles/main.scss"],

  vite: {
    plugins: [eslintPlugin()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/shared/assets/styles/global/main.scss" as *;'
        }
      }
    },
    server: {
      proxy: {
        "/lk/method": {
          target: process.env.NUXT_PUBLIC_API_BASE,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/lk/, "")
        }
      }
    }
  },

  ssr: false,

  components: false,

  dir: {
    plugins: "shared/plugins",
    public: "shared/public",
    assets: "shared/assets",
    pages: "../pages",
    layouts: "../layouts"
  },

  experimental: {
    typedPages: true
  }
});
