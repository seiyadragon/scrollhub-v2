<template>
    <div class="panel">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
    .panel {
        background-color: transparent;
        border-left: solid 1px white;
        border-right: solid 1px white;
        color: white;
    }
</style>