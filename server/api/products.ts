import {products} from '../data/products'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const perPage = parseInt(query.perPage as string) || 6

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const start = (page - 1) * perPage
    const end = start + perPage

    // Filtered products
    const category = query.category as string
    const search = (query.search as string)?.toLowerCase() || ''

    let filtered = products

    if (category && category !== 'all') {
        filtered = filtered.filter(p => p.categoryEn === category)
    }

    if (search) {
        filtered = filtered.filter(p => {
            const translatedName = p.name.toLowerCase()
            return translatedName.includes(search)
        })
    }

    const paginated = filtered.slice(start, end)

    return {
        products: paginated,
        total: filtered.length
    }
})
