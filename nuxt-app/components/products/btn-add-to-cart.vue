<script setup lang="ts">

interface IPropsBtnAddToCartComponent {
    inCart: boolean,
    count?: number,
    smallBtns?: boolean
}

type TEmitsBtnAddToCartComponent = {
    addToCart: [],
    changeCount: [action: '+' | '-']
}

const props = defineProps<IPropsBtnAddToCartComponent>()
const emits = defineEmits<TEmitsBtnAddToCartComponent>()

</script>

<template>
    <div class="product__add-btn">
        <button v-if="!inCart" class="btn add-btn" :class="{ '--in-cart': inCart }"
            @click="emits('addToCart')">Add to Cart</button>
        <div v-if="inCart" class="add-btn__actions" :class="{ 'small': smallBtns }">
            <button class="btn actions__item" @click="emits('changeCount', '-')">-</button>
            <span class="actions__item actions__count-product">
                {{ count }}
            </span>
            <button class="btn actions__item" @click="emits('changeCount', '+')">+</button>
        </div>
    </div>
</template>

<style lang="scss">
.product__add-btn {
    margin-top: 1rem;
    transition: all 300ms;

    .--in-cart {
        background-color: map-get($colors, 'green');
        min-width: 7rem;
        width: fit-content;

        @media screen and (max-width: map-get($display-breakpoints, 'lg')) {
            width: 100%;
            order: 1;
        }
    }

    .add-btn {
        font-weight: 400;
        font-size: 16px;

        &__actions {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;

            .actions {
                .small {
                    .actions__item {
                        @media screen and (max-width: map-get($display-breakpoints, 'lg')) {
                            max-width: 36px;
                            padding: .5rem;
                        }
                    }
                }

                &__item {
                    max-width: 56px;
                    height: 100%;
                    user-select: none;
                    text-align: center;
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
</style>
