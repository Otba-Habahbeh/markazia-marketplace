<script setup lang="ts">
import { CountUp } from 'countup.js'

// Lifecycle Hooks
onMounted(() => {
  const section = document.querySelector('.level')
  const counters = document.querySelectorAll<HTMLElement>('.js-count-up')

  // Count Start Function
  function countStart() {
    counters.forEach(item => {
      const value = item.dataset.value
      if (!value) return
      const counter = new CountUp(item, parseInt(value), {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        suffix: '+'
      })
      counter.start()
    })
  }

  if (section) {
    const observer = new IntersectionObserver(
        (entries, observer) => {
          if (entries[0]?.isIntersecting) {
            countStart()
            observer.disconnect()
          }
        },
        { threshold: 0.5 }
    )
    observer.observe(section)
  }
})
</script>

<template>
  <section class="level py-12 sm:py-16 mb-20 sm:mb-32 lg:mb-40 bg-gray-50 dark:bg-gray-900">
    <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
      <div>
        <h3 class="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary js-count-up" data-value="50">0</h3>
        <p class="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300">
          {{ $t('markazia.stats.products') }}
        </p>
      </div>
      <div>
        <h3 class="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary js-count-up" data-value="200">0</h3>
        <p class="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300">
          {{ $t('markazia.stats.clients') }}
        </p>
      </div>
      <div>
        <h3 class="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary js-count-up" data-value="10">0</h3>
        <p class="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300">
          {{ $t('markazia.stats.countries') }}
        </p>
      </div>
    </div>
  </section>
</template>