import { defineStore } from 'pinia'
import products from '~/public/products.json'
import type { TProduct } from '~/shared/types/product'

export const useProductsStore = defineStore('productsStore', {
    state: () => ({
        products: products as TProduct[]
    }),
    getters: {
        getProducts: (state) => state.products,
        getProductById: (state) => (productId: number) => {
            const product = state.products.find(item => item.id === productId)
            if (product) return product
            throw new Error("Product not found");
        },
        getProductsByBrand: (state) => (brandId: number) => state.products.filter(item => item.brand === brandId)
    },
    actions: {}
})