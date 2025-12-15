<script setup lang="ts">
</script>

<template>
  <UPage
      class="flex items-center justify-center p-8 h-screen text-center"
  >
    <div class="space-y-6">
      <div class="text-6xl">
        <UIcon name="i-lucide-lock-keyhole" class="w-12 h-12 text-primary" />
      </div>

      <h2 class="text-3xl font-bold ">
        {{ $t('markazia.page_locked.title') }}
      </h2>

      <p class="">
        {{ $t('markazia.page_locked.description') }}
      </p>

      <UButton
          color="primary"
          size="lg"
          href="https://www.linkedin.com/in/otba02/"
          target="_blank"
          class="px-10 py-3 rounded-xl"
      >
        {{ $t('markazia.page_locked.button') }}
      </UButton>
    </div>
  </UPage>
</template>