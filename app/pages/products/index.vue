<script setup lang="ts">
import { useProductStore } from '~/stores/productStore'
import ProductCard from "~/components/products/ProductCard.vue";

// Store
const productStore = useProductStore()

// Watch searchQuery and activeCategory to fetch products
watch(
    () => [productStore.searchQuery, productStore.activeCategory],
    () => {
      productStore.currentPage = 1
      productStore.fetchProducts()
    },
    { immediate: true }
)

const onCategoryChange = (category: string) => {
  productStore.setCategory(category)
  productStore.fetchProducts()
}
</script>

<template>
  <UContainer class="py-12">

    <!-- Search & Category Filter -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <UInput
          v-model="productStore.searchQuery"
          :placeholder="$t('markazia.products.placeholders.search_products')"
          class="flex-1"
          size="xl"
          clearable
      />
      <USelect
          :items="productStore.categories.map(c => ({ label: $t(c.title), value: c.id }))"
          v-model="productStore.activeCategory"
          :placeholder="$t('markazia.products.placeholders.select_category')"
          class="w-full sm:w-64"
          size="xl"
          @update:model-value="onCategoryChange"
      />
    </div>
    <!-- / Search & Category Filter -->

    <!-- Skeleton Loading -->
    <div v-if="productStore.pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <USkeleton class="h-72" v-for="n in productStore.perPage" :key="n" />
    </div>
    <!-- / Skeleton Loading -->

    <!-- Error State -->
    <div v-else-if="productStore.error">
      <p class="text-red-500">{{ productStore.error }}</p>
    </div>
    <!-- / Error State -->

    <!-- Zero State -->
    <div v-else-if="productStore.products.length === 0">
      <p class="text-gray-500 text-center">{{ $t('markazia.errors.no_products_found') }}</p>
    </div>
    <!-- / Zero State -->

    <!-- Products List -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard v-for="product in productStore.products"
                   :key="product.id"
                   :product="product" />
    </div>
    <!-- / Products List -->

    <!-- Pagination -->
    <div v-if="productStore.totalItems > productStore.perPage" class="mt-8 flex justify-center">
      <UPagination
          v-model:page="productStore.currentPage"
          @update:page="productStore.fetchProducts"
          :total="productStore.totalItems"
          :per-page="productStore.perPage"
          :size="'md'"
          :prev-next="true"
      />
    </div>
    <!-- / Pagination -->

  </UContainer>
</template>