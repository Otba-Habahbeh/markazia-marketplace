<script setup lang="ts">
import Header from '~/components/layout/Header'
import Footer from '~/components/layout/Footer'
import * as locales from '@nuxt/ui/locale'

const { t, locale } = useI18n()

// Computed
const lang = computed(() => locales[locale.value].code)
const dir = computed(() => locales[locale.value].dir)
const pageTitle = computed(() => t('markazia.title'))

// Dynamic SEO + localization
useHead({
  htmlAttrs: {
    lang,
    dir
  },
  title: pageTitle,
  meta: [
    { name: 'description', content: t('markazia.description') },
    { property: 'og:title', content: t('markazia.title') },
    { property: 'og:description', content: t('markazia.description') },
    { property: 'og:type', content: 'website' },
  ]
})
</script>

<template>
  <UApp :locale="locales[locale]">
    <Header />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <Footer />
  </UApp>
</template>
