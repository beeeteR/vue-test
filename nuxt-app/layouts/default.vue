<script lang="ts" setup></script>
<template>
    <div class="page">
        <layout-header />
        <div class="page__content">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss">
.page {
    &__content {
        margin-top: 2rem;
        padding: 1rem 6rem;
    }
}
</style>