<script lang="ts" setup>
import type { ICartItem } from '~/shared/types/cart';
import { EWallet } from '~/shared/types/product';

interface IPropsCartItemComponent {
    cartItem: ICartItem
}

const brandsStore = useBrandsStore()
const cartStore = useCartStore()
const productsStore = useProductsStore()
const props = defineProps<IPropsCartItemComponent>()
const productItem = productsStore.getProductById(props.cartItem.productId)
const brandTitle = computed(() => brandsStore.getBrandById(productItem.brand)?.title)
const totalPrice = computed(() => `${EWallet[productItem.regular_price.currency]}${(props.cartItem.count * productItem.regular_price.value).toFixed(2)}`)
function emitChangeCountCartItem(action: '+' | '-') {
    changeCartItemCount(props.cartItem.id, action)
}
function delCartItem() {
    cartStore.deleteCartItem(props.cartItem.id)
}

</script>

<template>
    <div class="cart-item">
        <div class="cart-item__info">
            <nuxt-img :src="productItem?.image" class="info__img" />
            <div class="info__text">
                <h3 class="info__text-title">{{ productItem?.title }}</h3>
                <p class="info__text-brand">{{ brandTitle }}</p>
            </div>
        </div>
        <div class="cart-item__config">
            <p class="config__price">{{
                `${EWallet[productItem.regular_price.currency]}${productItem.regular_price.value}` }}</p>
            <products-btn-add-to-cart class="config__qty" :in-cart="true" :count="cartItem.count"
                @changeCount="emitChangeCountCartItem" />
            <p class="config__total-price">{{ totalPrice }}</p>
            <button class="btn cart-item__delete-btn" @click="delCartItem">
                <svg class="delete-btn__svg" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path fill="#000000"
                            d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z">
                        </path>
                    </g>
                </svg>
            </button>
        </div>
    </div>
</template>

<style lang="scss">
.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    font-size: 20px;
    font-weight: 500;
    border-bottom: 2px solid black;

    @media screen and (max-width: map-get($display-breakpoints, 'sm')) {
        flex-direction: column;
        align-items: unset;
        gap: 2rem;
    }

    &__info {
        display: flex;
        gap: 1rem;

        .info {
            &__img {
                max-width: 128px;
            }

            &__text {
                display: flex;

                @media screen and (max-width: map-get($display-breakpoints, 'xm')) {
                    flex-direction: column;
                }

                &-brand {
                    order: -1;

                    &::after {
                        content: '/';
                        margin: 0 4px;

                        @media screen and (max-width: map-get($display-breakpoints, 'xm')) {
                            display: none;
                        }
                    }
                }
            }
        }

    }

    &__config {
        display: grid;
        align-items: center;
        text-align: center;
        gap: 3rem;
        grid-template-columns: 1fr 1fr 1fr 64px;

        @media screen and (max-width: map-get($display-breakpoints, 'lg')) {
            gap: 0;
        }

        @media screen and (max-width: map-get($display-breakpoints, 'md')) {
            grid-template-columns: 1fr 1fr 64px;
        }

        @media screen and (max-width: map-get($display-breakpoints, 'sm')) {
            display: flex;
            gap: 2rem;
        }

        @media screen and (max-width: map-get($display-breakpoints, 'xm')) {
            gap: 1rem;
        }

        .config {
            &__price {
                @media screen and (max-width: map-get($display-breakpoints, 'md')) {
                    display: none;
                }
            }

            &__qty {
                margin: unset;

                @media screen and (max-width: map-get($display-breakpoints, 'md')) {}
            }

            &__total-price {
                text-align: center;
                margin: 0 4px;
            }
        }
    }

    &__delete-btn {
        width: fit-content;
        background-color: unset;
        padding: unset;
        transition: all 300ms;

        @media screen and (max-width: map-get($display-breakpoints, 'sm')) {
            margin-left: auto;
        }

        &:hover {
            background-color: map-get($colors, 'red');
        }

        .delete-btn__svg {
            width: 32px;
            height: 32px;
            fill: black;
        }
    }
}
</style>