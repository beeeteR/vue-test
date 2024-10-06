<script lang="ts" setup>

const productsStore = useProductsStore()
const route = ref(useRoute())

const filteredProducts = computed(() => {
    const brandId = route.value.query['brandId']
    return brandId ? productsStore.getProductsByBrand(Number(brandId)) : productsStore.getProducts
})

</script>
<template>
    <div class="home">
        <layout-side-brands />
        <div class="catalog --shadow-section">
            <h1 class="section__title">Catalog</h1>
            <div class="catalog__items" v-show="filteredProducts.length">
                <products-product-item v-for="(item, index) in filteredProducts" :key="index" :product="item" />
            </div>
            <common-not-found v-show="filteredProducts.length === 0" />
        </div>
    </div>
</template>

<style lang="scss">
.home {
    display: flex;
    gap: 6rem;

    @media screen and (max-width: map-get($display-breakpoints, 'lg')) {
        gap: 2rem;
    }

    .catalog {
        width: 100%;
        padding: 2rem;
        border-radius: .5rem;

        @media screen and (max-width: map-get($display-breakpoints, 'sm')) {
                padding: 1rem;
            }

        &__items {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;

            @media screen and (max-width: map-get($display-breakpoints, 'lg')) {
                grid-template-columns: repeat(3, 1fr);
            }
            @media screen and (max-width: map-get($display-breakpoints, 'md')) {
                grid-template-columns: repeat(2, 1fr);
            }
            @media screen and (max-width: map-get($display-breakpoints, 'sm')) {
                gap: .5rem;
            }
        }
    }
}
</style>