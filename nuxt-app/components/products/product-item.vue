<script lang="ts" setup>
import { EWallet, type TProduct } from '~/shared/types/product';
import brands from '~/public/brands.json'

interface IPropsProductItem {
    product: TProduct
}

const cartStore = useCartStore()
const props = defineProps<IPropsProductItem>()
const brandTitle = computed(() => brands.find(brand => props.product.brand === brand.id)?.title)
const inCart = computed(() => cartStore.checkProductInCart(props.product.id))
let cartItemId: number | null = null

function addItemToCart() {
    if (inCart.value) useRouter().push('/cart')
    else {
        cartItemId = cartStore.addCartItem(props.product.id)
    }
}

function changeCartItemCount(action: '+' | '-') {
    cartStore.changeCountCartItem(cartItemId!, action)
}

</script>
<template>
    <div class="product__item">
        <div class="product__img">
            <NuxtImg preload :src="`${props.product.image}`" />
        </div>
        <div class="product__info">
            <h3 class="product__info-title">{{ props.product.title }}</h3>
            <p class="product__info-brand">{{ brandTitle }}</p>
            <div class="product__info-price">
                <span class="price__wallet">{{ EWallet[props.product.regular_price.currency] }}</span>
                <span class="price__value">{{ props.product.regular_price.value }}</span>
            </div>
        </div>
        <div class="product__add-btn">
            <button class="btn add-btn" :class="{ '--in-cart': inCart }" @click="addItemToCart">
                <div class="add-btn__link-to-cart" v-show="inCart">
                    <span>In Cart</span>
                    <span>Go to Cart</span>
                </div>
                <span v-show="!inCart">Add to Cart</span>
            </button>
            <div class="add-btn__actions" v-if="inCart">
                <button class="btn actions__item" @click="changeCartItemCount('-')">-</button>
                <span class="actions__item actions__count-product">{{
                    cartStore.getCartitemForProductId(props.product.id)?.count }}
                </span>
                <button class="btn actions__item" @click="changeCartItemCount('+')">+</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.product {
    &__item {
        padding: 1rem 1.5rem;
        box-shadow: inset 0 0 4px 1px map-get($colors, $key: 'light-grey');
        transition: all 500ms;

        &:hover {
            background-color: map-get($colors, $key: 'light-grey');
        }
    }

    &__img {
        border-bottom: 1px solid black;

        img {
            width: 100%;
        }
    }

    &__info {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: .5rem;
        font-size: 18px;
        padding-top: 1rem;

        &-title {
            grid-column: 1 / 3;
            font-size: 20px;
            font-weight: 500;
        }

        &-price {
            justify-self: end;
        }
    }

    &__add-btn {
        display: flex;
        gap: .5rem;
        margin-top: 1rem;
        transition: all 300ms;

        .--in-cart {
            background-color: map-get($colors, 'green');
            min-width: 7rem;
            width: fit-content;
        }

        .add-btn {
            &__link-to-cart {
                display: flex;
                flex-direction: column;
                gap: .25rem;

                span {
                    &:nth-child(2) {
                        font-weight: 400;
                        font-size: 16px;
                    }
                }
            }

            &__actions {
                position: relative;
                display: flex;
                align-items: center;
                width: 100%;

                .actions {
                    &__item {
                        max-width: 56px;
                        height: 100%;
                        user-select: none;
                    }

                    &__count-product {
                        margin: 0 4px;
                        min-width: 36px;
                        text-align: center;
                        font-size: 18px;
                        font-weight: 500;
                        height: fit-content;
                    }
                }
            }
        }
    }
}
</style>