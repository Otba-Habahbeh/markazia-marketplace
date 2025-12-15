<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { en, ar } from '@nuxt/ui/locale'

const { t, locale, setLocale } = useI18n()
const localeRoute = useLocaleRoute();
const route = useRoute()
const uiLocales = [en, ar]

const items = computed<NavigationMenuItem[]>(() => [{
  label: t('markazia.home'),
  to: localeRoute({ name: 'index' }),
  active: route.path.startsWith('/docs/getting-started')
}, {
  label: t('markazia.about_us'),
  active: route.path.startsWith('/docs/components')
}, {
  label: t('markazia.market'),
  to: localeRoute({ name: 'products' }),
  active: route.path.startsWith('/docs/components')
}, {
  label: t('markazia.contact_us'),
  active: route.path.startsWith('/docs/components')
}])
</script>

<template>
  <UFooter>
    <template #left>
      <p class="text-muted text-sm"> {{ $t('markazia.copyright', {year: new Date().getFullYear()}) }} </p>
    </template>

<!--    <UNavigationMenu :items="items" variant="link" />-->

    <template #right>
      <UButton
          icon="i-simple-icons-facebook"
          color="neutral"
          variant="ghost"
          to="https://www.facebook.com/almarkaziajo/"
          target="_blank"
          aria-label="facebook"
      />
      <UButton
          icon="i-simple-icons-instagram"
          color="neutral"
          variant="ghost"
          to="https://www.instagram.com/markazia_group"
          target="_blank"
          aria-label="instagram"
      />
      <UButton
          icon="i-simple-icons-linkedin"
          color="neutral"
          variant="ghost"
          to="https://www.linkedin.com/company/markazia"
          target="_blank"
          aria-label="linkedin"
      />
    </template>
  </UFooter>
</template>
