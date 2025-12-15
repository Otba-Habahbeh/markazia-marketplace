export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@pinia/nuxt', '@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  app: {
      head: {
          link: [
              { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
              { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icon-16x16.png' },
              { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icon-32x32.png' },
              { rel: 'icon', type: 'apple-touch-icon', href: '/apple-touch-icon.png' },
              { rel: 'manifest', href: '/site.webmanifest' }
          ]
      }
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json', isCatchallLocale: true },
      { code: 'ar', name: 'Arabic', file: 'ar.json' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  }
})