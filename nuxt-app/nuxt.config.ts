// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  pages: true,
  modules: ['@pinia/nuxt', '@nuxt/image'],
  css: [
    '~/assets/style/main.scss',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/style/additional.scss" as *;',
          api: 'modern'
        },
      },
    },
  },
  components: [
    '~/components',
    {
      path: '~/components/common',
      pathPrefix: true,
      prefix: 'common',
    },
    {
      path: '~/components/layout',
      pathPrefix: true,
      prefix: 'layout',
    },
    {
      path: '~/components/products',
      pathPrefix: true,
      prefix: 'products',
    },
  ]
})