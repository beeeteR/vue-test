<script lang="ts" setup>

import brands from '~/public/brands.json';

const selectedBrandId = ref<number | null>(null)
const route = reactive(useRoute())
const screenWidth = ref<number>(0)
const showBrands = ref<boolean>(false)

function selectBrand(id: number, inWatcher?: boolean) {
    selectedBrandId.value = selectedBrandId.value === id ? null : id
    if (!inWatcher) changeQueryParams()
    if (screenWidth.value <= 768) changeStateShowBrands(false)
}

function unSelectBrand() {
    selectedBrandId.value = null
    const route = useRoute()
    const queries = route.query
    const currentQueries = Object.keys(queries).
        filter(item => item != 'brandId').
        reduce((acc, item) => {
            acc[item] = queries[item]
            return acc
        }, Object())
    useRouter().push({ path: route.path, query: currentQueries })
    if (screenWidth.value <= 768) changeStateShowBrands(false)
}

function changeQueryParams() {
    const route = useRoute()
    const query = selectedBrandId.value ? { brandId: selectedBrandId.value } : {}
    useRouter().push({ path: route.path, query: query })
}

function updateScreenWidth() {
    screenWidth.value = window.innerWidth
}

function changeStateShowBrands(state?: boolean) {
    showBrands.value = typeof state !== 'boolean' ? !showBrands.value : state
}

onMounted(() => {
    updateScreenWidth()
    window.addEventListener('resize', updateScreenWidth)
})

onUnmounted(() => {
    window.removeEventListener('resize', updateScreenWidth)
})

watchEffect(() => {
    const brandId = route.query['brandId']
    if (brandId) selectBrand(Number(brandId), true)
    else selectedBrandId.value = null
})

</script>
<template>
    <div class="brands__wrapper --shadow-section"
        :class="{ 'brands__unvisible': screenWidth <= 768, 'brands__visible': screenWidth <= 768 && showBrands }">
        <div class="brands">
            <h2 class="brands__title" @click="unSelectBrand">All Brands</h2>
            <div class="brand__item" :class="{ 'brand__item-active': selectedBrandId === item.id }"
                v-for="(item, index) in brands" :key="index" @click="selectBrand(item.id)">
                <p class="brand__title">{{ item.title }}</p>
            </div>
        </div>
        <div class="btn__show-brands" v-if="screenWidth <= 768" @click="changeStateShowBrands()">
            <nuxt-img src="icons/arrow.svg" fill="#ffffff" class="show-brands__img" :class="{ '--rotate': showBrands }" />
        </div>
    </div>
</template>

<style lang="scss">
.brands {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    width: fit-content;
    min-width: 180px;
    padding: 2rem;
    font-size: 20px;
    font-weight: 500;

    @media screen and (max-width: map-get($display-breakpoints, 'md')) {
        padding: 1rem;
    }

    @media screen and (max-width: map-get($display-breakpoints, 'xm')) {
        padding: 1rem;
        gap: .25rem;
        font-size: 18px;
        font-weight: 400;
        min-width: unset;
    }

    &__wrapper {
        display: flex;
        background-color: white;
        border-radius: .5rem;
        height: fit-content;

        .btn__show-brands {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 16px;
            height: 156px;
            top: 50%;
            right: -16px;
            transform: translateY(-50%);
            background-color: map-get($colors, 'pink');
            border-top-right-radius: 1rem;
            border-bottom-right-radius: 1rem;
            transition: all 300ms;

            .--rotate {
                transform: rotateY(180deg);
            }
        }
    }

    &__unvisible {
        position: fixed;
        left: 0;
        transform: translateX(calc(-100% - 1px));
        box-shadow: unset;
        outline: 1px solid black;
        transition: all 300ms;
    }

    &__visible {
        transform: translateX(0);
    }

    &__title {
        font-size: 24px;
        font-weight: 600;
        padding-bottom: 1rem;
        cursor: pointer;

        @media screen and (max-width: map-get($display-breakpoints, 'md')) {
            font-size: 20px;
            padding-bottom: .5rem;
        }
    @media screen and (max-width: map-get($display-breakpoints, 'xm')) {
    font-size: 18px;
    }
    }

    .brand {
        &__item {
            position: relative;
            width: fit-content;
            cursor: pointer;
            transition: all 300ms;
            user-select: none;

            &::after {
                content: "";
                display: block;
                position: absolute;
                bottom: -2px;
                left: -5%;
                width: 110%;
                max-width: 0;
                height: 2px;
                background-color: black;
                transition: max-width 300ms;
            }

            &:hover {
                &::after {
                    max-width: 110%;
                }
            }

            &-active {
                color: map-get($colors, 'pink');

                &::after {
                    max-width: 110%;
                }
            }
        }
    }
}
</style>