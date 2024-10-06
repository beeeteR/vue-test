<script lang="ts" setup>

interface IPropsNotFoundComponent {
    title?: string,
    notShowIcon?: true
}
const props = defineProps<IPropsNotFoundComponent>()

</script>
<template>
    <div class="not-found">
    <nuxt-img src="icons/not-found.svg" class="not-found__img" v-show="!notShowIcon"/>
        <h1 class="not-found__title">{{ title ? title : 'По вашему запросу ничего не найдено.' }}</h1>
    </div>
</template>

<style lang="scss">
.not-found {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;

    &__img {
        width: 48px;
    }

    &__title {
        font-size: 36px;
        font-weight: 500;
    }
}
</style>