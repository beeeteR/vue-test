<script lang="ts" setup>
import { EWallet, type TProduct } from '~/shared/types/product';

interface IPropsProductItemComponent {
    product: TProduct
}

const cartStore = useCartStore()
const brandsStore = useBrandsStore()
const props = defineProps<IPropsProductItemComponent>()
const brandTitle = computed(() => brandsStore.getBrandById(props.product.brand)?.title)
const inCart = computed(() => cartStore.checkProductInCart(props.product.id))
const countProductInCart = computed(() => cartStore.getCartItemForProductId(props.product.id)?.count)
let cartItemId: number | null = null

function addItemToCart() {
    cartItemId = cartStore.addCartItem(props.product.id)
}

function emitChangeCartItemCount(action: '+' | '-') {
    changeCartItemCount(cartItemId!, action)
}

onMounted(() => {
    if (inCart.value) {
        cartItemId = cartStore.getCartItemForProductId(props.product.id)!.id
    }
})

</script>
<template>
    <div class="product__item">
        <div class="product__img">
            <nuxt-img preload :src="`${product.image}`" />
        </div>
        <div class="product__info">
            <h3 class="product__info-title">{{ product.title }}</h3>
            <p class="product__info-brand">{{ brandTitle }}</p>
            <div class="product__info-price">
                <span class="price__wallet">{{ EWallet[product.regular_price.currency] }}</span>
                <span class="price__value">{{ product.regular_price.value }}</span>
            </div>
        </div>
        <products-btn-add-to-cart :count="countProductInCart" :in-cart="inCart" :small-btns="true" @add-to-cart="addItemToCart"
            @change-count="emitChangeCartItemCount" class="product__add-btn" />
    </div>
</template>

<style lang="scss">
.product {
    &__item {
        padding: 1rem 1.5rem;
        box-shadow: inset 0 0 4px 1px map-get($colors, $key: 'light-grey');
        transition: all 500ms;

        @media screen and (max-width: map-get($display-breakpoints, 'lg')) {
            padding: 1rem;
        }

        @media screen and (max-width: map-get($display-breakpoints, 'xm')) {
            padding: .5rem;
        }

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

        @media screen and (max-width: map-get($display-breakpoints, 'lg')) {
            display: flex;
            flex-direction: column;
            gap: .25rem;
        }

        @media screen and (max-width: map-get($display-breakpoints, 'xm')) {
            font-size: 16px;
        }

        &-title {
            grid-column: 1 / 3;
            font-size: 20px;
            font-weight: 500;

            @media screen and (max-width: map-get($display-breakpoints, 'xm')) {
                font-size: 18px;
            }
        }

        &-price {
            justify-self: end;
        }
    }
}
</style>