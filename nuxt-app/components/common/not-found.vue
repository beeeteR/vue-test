<script lang="ts" setup></script>
<template>
    <div class="not-found">
    <NuxtImg src="icons/not-found.svg" class="not-found__img" />
        <h1 class="not-found__title">По вашему запросу ничего не найдено.</h1>
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