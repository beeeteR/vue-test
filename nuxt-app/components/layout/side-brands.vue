<script lang="ts" setup>

import brands from '~/public/brands.json';

const selectedBrandId = ref<number | null>(null)
const route = reactive(useRoute())

function selectBrand(id: number, inWatcher?: boolean) {
    if (inWatcher) return
    selectedBrandId.value = selectedBrandId.value === id ? null : id
    changeQueryParams()
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
}

function changeQueryParams() {
    const route = useRoute()
    const query = selectedBrandId.value ? { brandId: selectedBrandId.value } : {}
    useRouter().push({ path: route.path, query: query })
}

watchEffect(() => {
    const brandId = route.query['brandId']
    if (brandId) selectBrand(Number(brandId), true)
    else selectedBrandId.value = null
})

</script>
<template>
    <div class="brands --shadow-section">
        <h2 class="brands__title" @click="unSelectBrand">All Brands</h2>
        <div class="brand__item" :class="{ 'brand__item-active': selectedBrandId === item.id }"
            v-for="(item, index) in brands" :key="index" @click="selectBrand(item.id)">
            <p class="brand__title">{{ item.title }}</p>
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
    height: fit-content;
    border-radius: .5rem;

    &__title {
        font-size: 24px;
        font-weight: 600;
        padding-bottom: 1rem;
        cursor: pointer;
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

        &__title {
            font-size: 20px;
            font-weight: 500;
        }
    }
}
</style>