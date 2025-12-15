<script setup lang="ts">
import { useRoute } from 'vue-router'

const config = useRuntimeConfig()
const route = useRoute()
const { isRtl } = useDirection()
const isAddedToCart = ref(false)
const quantity = ref(1)

// Fetch Product Details
const { data: product, pending, error } = await useFetch(`${config.public.apiBase}/api/products/${route.params.id}`, { server: false, lazy: true })

// Computed
const discountPercent = computed(() => {
  if (product.value?.priceBefore && product.value?.priceAfter) {
    return Math.round(((product.value.priceBefore - product.value.priceAfter) / product.value.priceBefore) * 100)
  }
  return 0
})

// Methods
const handleAddToCart = () => {
  isAddedToCart.value = true
  setTimeout(() => {
    isAddedToCart.value = false
  }, 2000)
}
</script>

<template>
  <UContainer class="py-8 sm:py-12">
    <!-- Back Button -->
    <UButton
        :to="$localePath({ name: 'products' })"
        variant="outline"
        size="md"
        :icon="`${isRtl ? 'i-lucide-arrow-right' : 'i-lucide-arrow-left'}`"
        class="mb-8"
    >
      {{ $t('markazia.products.back_to_products') }}
    </UButton>
    <!-- / Back Button -->

    <!-- Skeleton Loading -->
    <template v-if="pending">
      <div class="grid md:grid-cols-2 gap-8">
        <USkeleton class="h-96 w-full rounded-xl" />
        <div class="space-y-4">
          <USkeleton class="h-12 w-3/4 rounded-lg" />
          <USkeleton class="h-8 w-1/2 rounded-lg" />
          <USkeleton class="h-10 w-1/3 rounded-lg" />
          <USkeleton class="h-24 w-full rounded-lg" />
          <div class="flex gap-3 pt-4">
            <USkeleton class="h-12 flex-1 rounded-lg" />
            <USkeleton class="h-12 flex-1 rounded-lg" />
          </div>
        </div>
      </div>
    </template>
    <!-- / Skeleton Loading -->

    <!-- Error State -->
    <template v-else-if="error">
      <UAlert
          icon="i-lucide-alert-circle"
          color="error"
          :title="$t('markazia.errors.error')"
          :description="$t('markazia.errors.failed_load_product')"
          class="mb-8"
      />
    </template>
    <!-- Error State -->

    <!-- Product -->
    <template v-else-if="product">
      <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
        <!-- Image -->
        <UCard class="overflow-hidden relative rounded-xl shadow-sm p-0">
          <div class="relative aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden group">
            <img
                v-if="product.image"
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <UBadge
                v-if="discountPercent > 0"
                class="absolute top-4 right-4 px-3 py-1 text-sm font-semibold"
            >
              -{{ discountPercent }}%
            </UBadge>
          </div>
        </UCard>

        <!-- Info -->
        <div class="flex flex-col justify-between space-y-6">
          <!-- Breadcrumb -->
          <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span>{{ $t(product.category) }}</span>
            <UIcon :name="`${ isRtl ? 'i-lucide-chevron-left' : 'i-lucide-chevron-right'}`" class="w-4 h-4" />
            <span class="text-primary font-medium">
              {{ $t(product.name) }}
            </span>
          </div>
          <!-- / Breadcrumb -->

          <!-- Title & Price -->
          <div>
            <h1 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
              {{ $t(product.name) }}
            </h1>
            <p class="text-slate-600 dark:text-slate-300">
              {{ $t(product.category) }}
            </p>

            <div class="flex items-center gap-4 mt-2">
              <span class="text-4xl font-bold text-slate-900 dark:text-slate-100">
                ${{ product.priceAfter }}
              </span>
              <span
                  v-if="product.priceBefore !== product.priceAfter"
                  class="text-xl text-slate-400 dark:text-slate-500 line-through"
              >
                ${{ product.priceBefore }}
              </span>
            </div>
          </div>
          <!-- / Title & Price -->

          <!-- Ratings -->
          <div class="flex items-center gap-2">
            <UIcon
                v-for="n in 5"
                :key="n"
                :name="n <= Math.round(product.startReview) ?
                  'i-material-symbols-star-rounded' :
                  'i-material-symbols-star-outline-rounded'"
                class="w-5 h-5 text-yellow-400"
            />
            <span class="text-sm text-slate-500 dark:text-slate-400 ml-2">
              {{ product.startReview }} · {{ $t('markazia.products.product_reviews') }}
            </span>
          </div>
          <!-- / Ratings -->

          <!-- Stock & Actions -->
          <UBadge color="success" variant="subtle" class="w-fit mb-4">
            <UIcon name="i-lucide-check-circle" class="w-4 h-4 mr-1" /> {{ $t('markazia.products.in_stock') }}
          </UBadge>

          <div class="flex items-center gap-3">
            <UButton
                @click="handleAddToCart"
                size="lg"
                icon="i-lucide-shopping-cart"
                :disabled="isAddedToCart"
                class="flex-1"
            >
              {{ isAddedToCart ? $t('markazia.products.added_to_cart') : $t('markazia.products.add_to_cart') }}
            </UButton>
            <UButton
                size="lg"
                color="neutral"
                variant="outline"
                icon="i-lucide-heart"
                class="flex-1"
            >
              {{ $t('markazia.products.wishlist') }}
            </UButton>
          </div>
          <!-- / Stock & Actions -->

          <!-- Quantity -->
          <div class="flex items-center gap-4 mt-4">
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300">{{ $t('markazia.products.quantity') }}</span>
            <div class="flex items-center">
              <UInputNumber v-model="quantity" size="lg" :min="0" :max="10" class="w-1/2"/>
            </div>
          </div>
          <!-- / Quantity -->
        </div>
      </div>

      <!-- Tabs -->
      <UTabs :items="[
                { slot: 'details', label: $t('markazia.products.details.title') },
                { slot: 'shipping', label: $t('markazia.products.shipping.title') },
                { slot: 'reviews', label: $t('markazia.products.reviews.title') }
              ]" class="mt-12">
        <template #details>
          <div class="space-y-4 py-6">
            <h4 class="font-semibold text-slate-900 dark:text-slate-100 mb-2">
              {{ $t('markazia.products.details.specifications.title') }}
            </h4>
            <ul class="text-slate-600 dark:text-slate-300 text-sm space-y-1">
              <li>{{ $t('markazia.products.details.specifications.specification1') }}</li>
              <li>{{ $t('markazia.products.details.specifications.specification2') }}</li>
              <li>{{ $t('markazia.products.details.specifications.specification3') }}</li>
              <li>{{ $t('markazia.products.details.specifications.specification4') }}</li>
            </ul>
          </div>
        </template>

        <template #shipping>
          <div class="space-y-4 py-6 text-slate-700 dark:text-slate-300">
            <p>{{ $t('markazia.products.shipping.note1') }}</p>
            <p class="text-sm">{{ $t('markazia.products.shipping.note2') }}</p>
          </div>
        </template>

        <template #reviews>
          <div class="py-6 text-slate-700 dark:text-slate-300">
            <p>{{ $t('markazia.products.reviews.note1') }}</p>
          </div>
        </template>
      </UTabs>
      <!-- / Tabs -->
    </template>
    <!-- / Product -->

    <!-- Zero State -->
    <template v-else>
      <div class="text-center py-12">
        <UIcon name="i-lucide-package-x" class="w-16 h-16 text-slate-300 dark:text-slate-500 mx-auto mb-4" />
        <p class="text-lg text-slate-600 dark:text-slate-400">
          {{ $t('markazia.errors.product_not_found') }}
        </p>
        <UButton :to="$localePath({ name: 'products' })" color="primary" class="mt-6">
          {{ $t('markazia.products.back_to_products') }}
        </UButton>
      </div>
    </template>
    <!-- / Zero State -->
  </UContainer>
</template>