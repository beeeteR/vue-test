<script lang="ts" setup>

const cartStore = useCartStore()
const countItems = computed(() => cartStore.getCartCountItems)

</script>

<template>
    <div class="header wrapper">
        <nuxt-link to="/" class="header__logo">
            <nuxt-img src="images/logo.png" />
        </nuxt-link>
        <nuxt-link to="/cart" class="header__cart-btn">
            <nuxt-img src="icons/cart.svg" />
            <span class="cart-btn__count" v-if="countItems">{{ countItems }}</span>
        </nuxt-link>
    </div>
</template>

<style lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 8px 1px map-get($colors, 'light-grey');

    @media screen and (max-width: map-get($display-breakpoints, 'sm')) {
        padding-left: 2rem;
        padding-right: 2rem;
    }

    &__logo {
        min-width: 120px;

        img {
            width: 100%;
        }
    }

    &__cart-btn {
        position: relative;
        width: 40px;
        aspect-ratio: 1;

        img {
            height: 100%;
        }

        .cart-btn__count {
            position: absolute;
            min-width: 36px;
            padding: 4px;
            margin: 0 2px;
            top: -16px;
            right: -24px;
            text-align: center;
            font-weight: 500;
            color: white;
            background-color: map-get($colors, $key: 'pink');
            border-radius: 1rem;
            z-index: 1;
        }
    }
}
</style>