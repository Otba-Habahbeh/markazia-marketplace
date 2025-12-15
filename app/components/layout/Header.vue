<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { en, ar } from '@nuxt/ui/locale'
import Logo from "~/components/layout/Logo.vue";

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
  to: localeRoute({ name: 'about' }),
  active: route.path.startsWith('/docs/components')
}, {
  label: t('markazia.market'),
  to: localeRoute({ name: 'products' }),
  active: route.path.startsWith('/docs/components')
}, {
  label: t('markazia.contact_us'),
  to: localeRoute({ name: 'contact' }),
  active: route.path.startsWith('/docs/components')
}])
</script>

<template>
  <UHeader
      :toggle="{
      color: 'primary',
      variant: 'subtle',
      class: 'rounded-full'
    }"
    :to="$localePath('index')"
  >
    <template #title>
      <Logo class="h-6 w-auto" />
    </template>

    <UNavigationMenu :items="items" class="gap-2"/>

    <template #right>
      <UColorModeButton />

      <ULocaleSelect :model-value="locale"
                     :locales="uiLocales"
                     @update:model-value="setLocale($event)" />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>