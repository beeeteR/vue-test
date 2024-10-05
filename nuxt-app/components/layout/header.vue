<script lang="ts" setup>

const cartStore = useCartStore()
const countItems = computed(() => cartStore.getCartCountItems)

</script>

<template>
    <div class="header">
        <nuxt-link to="/" class="header__logo">
            <NuxtImg src="images/logo.png" />
        </nuxt-link>
        <nuxt-link to="/cart" class="header__cart-btn">
            <NuxtImg src="icons/cart.svg" />
            <span class="cart-btn__count" v-if="countItems">{{ countItems }}</span>
        </nuxt-link>
    </div>
</template>

<style lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 6rem;
    box-shadow: 0 2px 8px 1px map-get($colors, 'light-grey');

    &__cart-btn {
        position: relative;
        width: 40px;
        aspect-ratio: 1;

        img {
            height: 100%;
        }

        .cart-btn__count {
            position: absolute;
            min-width: 28px;
            min-height: 28px;
            padding: 3px;
            top: -16px;
            right: -16px;
            text-align: center;
            font-weight: 500;
            color: white;
            background-color: map-get($colors, $key: 'pink');
            border-radius: 50%;
            z-index: 1;
        }
    }
}
</style>