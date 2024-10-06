<script lang="ts" setup>
import { EWallet } from '~/shared/types/product';

const cartStore = useCartStore()
const productsStore = useProductsStore()
const totalCartPrice = computed(() => {
    return cartStore.getCart.reduce((acc, item) => {
        return acc + (item.count * productsStore.getProductById(item.productId).regular_price.value)
    }, 0).toFixed(2)
})

</script>
<template>
    <div class="cart__wrapper --shadow-section">
        <div class="cart " v-if="cartStore.getCart.length">
            <h1 class="section__title">Shopping Cart</h1>
            <ul class="cart__fields">
                <li class="fields__item">Item</li>
                <ul class="cart__fields">
                    <li class="fields__item fields__item-price">Price</li>
                    <li class="fields__item">Qty</li>
                    <li class="fields__item">Total</li>
                </ul>
            </ul>
            <div class="cart__items">
                <cart-item v-for="(item, index) in cartStore.getCart" :key="item.id" :cartItem="item" />
            </div>
            <div class="cart__subtotal">
                <h2 class="subtotal__price">Subtotal: {{ `${EWallet.USD}${totalCartPrice}` }}</h2>
                <button class="btn subtotal__checkout">Checkout</button>
            </div>
        </div>
        <common-not-found title="Сейчас в корзине пусто." notShowIcon v-else />
    </div>
</template>

<style lang="scss">
.cart {
    &__wrapper {
        padding: 2rem;
        border-radius: .5rem;

        @media screen and (max-width: map-get($display-breakpoints, 'lg')) {
            padding: 1rem;
        }
    }

    &__fields {
        display: flex;
        justify-content: space-between;
        gap: 4rem;
        padding: .5rem 0;

        @media screen and (max-width: map-get($display-breakpoints, 'sm')) {
            display: none;
        }

        &:last-child {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 7rem;
            padding: 0;
            margin-right: 10rem;

            @media screen and (max-width: map-get($display-breakpoints, 'lg')) {
                gap: 4rem;
                margin-right: 7rem;
            }

            @media screen and (max-width: map-get($display-breakpoints, 'md')) {
                margin-right: unset;
                gap: 3.5rem;
            }
        }

        .fields__item {
            font-size: 24px;
            font-weight: 600;

            &-price {
                &:nth-child(1) {
                    @media screen and (max-width: map-get($display-breakpoints, 'md')) {
                        display: none;
                    }
                }
            }
        }
    }

    &__items {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    &__subtotal {
        width: fit-content;
        margin-top: 2rem;
        margin-left: auto;
        font-size: 20px;

        .subtotal {
            &__price {
                font-size: 24px;
                font-weight: 500;
            }

            &__checkout {
                margin-top: 1rem;
                background-color: map-get($colors, 'green')
            }

        }
    }
}
</style>