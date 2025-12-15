<script setup lang="ts">
import type { NuxtError } from '#app'
import Header from "~/components/layout/Header.vue";
import Footer from "~/components/layout/Footer.vue";

const props = defineProps<{
  error: NuxtError
}>()

const route = useRoute()
const { isRtl } = useDirection()
</script>

<template>
  <UApp>
    <Header />

    <UError
        :dir="isRtl ? 'rtl' : 'ltr'"
        :clear="{
          color: 'neutral',
          size: 'xl',
          icon: `${isRtl ? 'i-lucide-arrow-right' : 'i-lucide-arrow-left'}`,
          class: 'rounded-full',
          label: $t('markazia.errors.back_to_home')
        }"
        :redirect="$localePath({name: 'index'})"
        :error="{
          ...error,
          statusMessage: error.statusCode === 404
                    ? `${$t('markazia.errors.page_not_found')}: ${route.fullPath}`
                    : error.statusMessage,
          message: ''
        }"
    >
      <template #statusCode>
        <h2 class="text-6xl">
          {{ error.statusCode }}
        </h2>
      </template>
    </UError>

    <Footer />
  </UApp>
</template>
