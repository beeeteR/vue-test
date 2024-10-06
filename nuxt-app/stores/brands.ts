import { defineStore } from 'pinia'
import brands from '~/public/brands.json'
import type { IBrand } from '~/shared/types/brand'

export const useBrandsStore = defineStore('brandsStore', {
    state: () => ({
        brands: brands as  IBrand[]
    }),
    getters: {
        getBrandById: (state) => (id: number) => state.brands.find(item => item.id === id)
    },
    actions: {}
})