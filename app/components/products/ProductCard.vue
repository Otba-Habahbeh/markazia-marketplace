<script setup lang="ts">

const props = defineProps<{
  product: {
    id: number
    name: string
    category: string
    priceBefore: number
    priceAfter: number
    startReview: number
    image: string
  }
}>()

// Detect discount
const hasDiscount = computed(() => props.product.priceBefore > props.product.priceAfter)

// Discount percentage
const discountPercent = computed(() =>
    hasDiscount.value
        ? Math.round(
            ((props.product.priceBefore - props.product.priceAfter) /
                props.product.priceBefore) *
            100
        )
        : 0
)
</script>

<template>
  <NuxtLinkLocale
      :to="{ name: 'products-id', params: { id: product.id } }"
      class="block"
  >
    <UCard
        class="overflow-hidden transition-all duration-300 hover:shadow-xl rounded-xl"
    >
      <!-- Image -->
      <div class="relative">
        <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-72 object-cover"
        />

        <!-- Discount Badge -->
        <span
            v-if="hasDiscount"
            class="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
        >
          -{{ discountPercent }}%
        </span>
      </div>

      <div class="p-4">
        <!-- Name -->
        <h3 class="font-semibold text-lg line-clamp-1">
          {{ $t(product.name) }}
        </h3>

        <!-- Category -->
        <p class="text-gray-500 text-sm mb-2 capitalize">
          {{ $t(product.category) }}
        </p>

        <!-- Rating -->
        <div class="flex items-center gap-1 mb-3">
          <span
              v-for="i in 5"
              :key="i"
              class="text-yellow-400 text-sm"
          >
            {{ i <= Math.round(product.startReview) ? '★' : '☆' }}
          </span>
          <span class="text-xs text-gray-500">({{ product.startReview }})</span>
        </div>

        <!-- Price -->
        <div class="flex items-center gap-2">
          <p class="text-primary font-bold text-xl">
            ${{ product.priceAfter }}
          </p>

          <p
              v-if="hasDiscount"
              class="text-gray-400 line-through text-sm"
          >
            ${{ product.priceBefore }}
          </p>
        </div>
      </div>
    </UCard>
  </NuxtLinkLocale>
</template>