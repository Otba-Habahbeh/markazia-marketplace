import { defineStore } from 'pinia'

export const useProductStore = defineStore('productStore', () => {
    // State
    const { t } = useI18n()
    const activeCategory = ref('')
    const searchQuery = ref('')
    const currentPage = ref(1)
    const perPage = ref(6)
    const products = ref<any[]>([])
    const totalItems = ref(0)
    const pending = ref(false)
    const error = ref<string | null>(null)
    const categories = ref([
        { id: 'all', title: 'markazia.products.categories.all' },
        { id: 'electronics', title: 'markazia.products.categories.electronics' },
        { id: 'interior', title: 'markazia.products.categories.interior' },
        { id: 'engine', title: 'markazia.products.categories.engine' },
        { id: 'replacement', title: 'markazia.products.categories.replacement' },
        { id: 'accessories', title: 'markazia.products.categories.accessories' },
        { id: 'care', title: 'markazia.products.categories.care' },
        { id: 'tools', title: 'markazia.products.categories.tools' }
    ])

    // Computed
    const hasProducts = computed(() => products.value.length > 0)
    const totalPages = computed(() => Math.ceil(totalItems.value / perPage.value))

    // Methods
    const setCategory = (category: string) => {
        activeCategory.value = category
        currentPage.value = 1
    }

    const setSearch = (query: string) => {
        searchQuery.value = query
        currentPage.value = 1
    }

    const setPage = (page: number) => {
        currentPage.value = page
    }

    const resetFilters = () => {
        activeCategory.value = ''
        searchQuery.value = ''
        currentPage.value = 1
    }

    const fetchProducts = async () => {
        // Scroll to top smoothly
        if (typeof window !== 'undefined') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }

        pending.value = true
        try {
            const query = new URLSearchParams({
                page: currentPage.value.toString(),
                perPage: perPage.value.toString(),
                category: activeCategory.value || 'all',
                search: searchQuery.value
            })
            const res: any = await $fetch('/api/products?' + query.toString())
            products.value = res.products
            totalItems.value = res.total
            error.value = null
        } catch (e: any) {
            error.value = e.message || t('markazia.errors.failed_fetch_products')
        } finally {
            pending.value = false
        }
    }

    return {
        activeCategory,
        searchQuery,
        currentPage,
        perPage,
        products,
        totalItems,
        pending,
        error,
        hasProducts,
        totalPages,
        categories,
        setCategory,
        setSearch,
        setPage,
        resetFilters,
        fetchProducts
    }
})