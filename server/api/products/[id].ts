import {products} from '../../data/products'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const productId = Number(id)

    const product = products.find(p => p.id === productId)

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (!product) {
        throw createError({
            statusCode: 404,
            message: "product not found"
        })
    }

    return {
        ...product
    }
})