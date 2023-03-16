<template>
    <input class="searchContainer" v-model="searchTerm" />
    <button class="searchButton" @click="onSearch">
        <Icon name="ion:search" />
    </button>
</template>

<script lang="ts" setup>
    let props = defineProps({
        shouldReset: Boolean,
    })

    let emit = defineEmits([
        'onSearch'
    ])

    let searchTerm = ref("")
    let shouldReset = ref(props.shouldReset)

    watch(props, (curr, old) => {
        shouldReset.value = props.shouldReset

        if (shouldReset.value)
            searchTerm.value = ""
    })

    let onSearch = () => {
        emit('onSearch', searchTerm.value)
    }
</script>

<style lang="scss" scoped>
    @keyframes slideLeft {
        from {
            opacity: 0%;
            transform: translate(128px, 0px);
        }
        to {
            opacity: 100%;
            transform: translate(0px, 0px);
        }
    }
    .searchContainer {
        position: absolute;
        width: 300px;
        height: 48px;
        border: solid 1px #f4933b;
        border-radius: 6px;
        z-index: 100;
        right: 116px;
        outline: none;
        font-size: 24px;
        background-color: darken(white, 70%);
        color: white;
        padding-left: 8px;
        padding-right: 8px;
        animation: slideLeft 1000ms ease-in-out;

        @media (max-width: 600px) {
            width: 50%;
        }
    }

    .searchButton {
        position: absolute;
        color: white;
        font-size: 24px;
        width: 48px;
        height: 48px;
        background-color: transparent;
        border: none;
        right: 116px;
        z-index: 101;
        transition: all 500ms ease-in-out;
        animation: slideLeft 1000ms ease-in-out;

        &:hover, &:focus {
            transform: scale(1.25, 1.25);
        }
    }
</style>