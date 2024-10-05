<script lang="ts" setup>
import products from '~/public/products.json'

const route = ref(useRoute())

const filteredProducts = computed(() => {
    const brandId = route.value.query['brandId']
    return brandId ? products.filter(item => item.brand === Number(brandId)) : products
})

</script>
<template>
    <div class="home">
        <layout-side-brands />
        <div class="catalog --shadow-section">
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

    .catalog {
        width: 100%;
        padding: 2rem;
        border-radius: .5rem;

        &__items {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
        }
    }
}
</style>