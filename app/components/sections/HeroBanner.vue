<script setup lang="ts">
const { t } = useI18n()
const localeRoute = useLocaleRoute();

const links = ref<ButtonProps[]>([
  {
    label: t('markazia.browse_collection'),
    to: localeRoute({ name: 'products' }),
    color: 'primary',
    variant: 'solid',
    icon: 'i-lucide-search'
  },
  {
    label: t('markazia.contact_us'),
    to: localeRoute({ name: 'contact' }),
    color: 'neutral',
    variant: 'subtle',
    icon: 'i-lucide-mail'
  }
])
</script>

<template>
  <UPageHero
      :description="$t('markazia.hero.description')"
      :links="links"
  >
    <template #title>
      <div class="text-xxl lg:text-9xl">
        <span>{{ $t('markazia.hero.title_line1') }}</span>
        <br>
        <span class="text-primary">{{ $t('markazia.hero.title_line2') }}</span>
        <br>
        <span class="text-primary">{{ $t('markazia.hero.title_line3') }}</span>
      </div>
    </template>

    <template #description>
      <div class="whitespace-pre-line"
           v-html="$t('markazia.hero.description')">
      </div>
    </template>
  </UPageHero>
</template>
