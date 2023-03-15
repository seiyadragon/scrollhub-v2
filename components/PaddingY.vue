<template>
    <div class="paddingY">
        <slot />
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps({
        padding: Number,
    })
</script>

<style lang="scss" scoped>
    .paddingY {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        padding-top: v-bind('`${padding}px`');
        padding-bottom: v-bind('`${padding}px`');
    }
</style>