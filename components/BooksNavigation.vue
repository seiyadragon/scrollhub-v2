<template>
    <div class="booksNav" :class="alternate ? 'alternate' : ''">
        <div class="booksButtonSection">
            <button @click="$emit('prevPage')">
                <Icon name="ion:arrow-left-b"/>
            </button>
            <button @click="$emit('firstPage')">
                <Icon name="ion:stop"/>
            </button>
        </div>
        <p contenteditable @input="onPageInput">{{ (page !== undefined ? page : 0) }}</p>
        <div class="booksButtonSection">
            <slot v-if="searchOpen"/>
            <button @click="searchOpen = !searchOpen">
                <Icon name="ion:search" />
            </button>
            <button @click="$emit('nextPage')">
                <Icon name="ion:arrow-right-b"/>
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
    let props = defineProps({
        page: Number,
        alternate: Boolean,
    })

    let emit = defineEmits([
        'pageJump',
        'firstPage',
        'prevPage',
        'nextPage',
    ])

    let searchOpen = ref(false)

    let onPageInput = (event: any) => {
        setTimeout(() => {
            if (event.target.innerText === "" || event.target.innerText === "NaN")
                event.target.innerText = "1"

            console.log("Test")

            emit('pageJump', parseInt(event.target.innerText))
        }, 1000)
    }
</script>

<style lang="scss" scoped>
    .booksNav {
        display: flex;
        justify-content: space-between;
        align-content: center;
        padding-top: 16px;
        padding-bottom: 16px;
        padding-left: 8px;
        padding-right: 8px;
        position: sticky;
        top: 68px;
        z-index: 99;
        background-color: darken(white, 85%);

        .booksButtonSection {
            display: flex;
            column-gap: 8px;

            button {
                background-color: transparent;
                border: solid 1px #f4933b;
                font-size: 32px;
                border-radius: 6px;
                transition: all 500ms ease-in-out;
                color: white;
                margin-top: auto;
                margin-bottom: auto;
                display: flex;
                height: 48px;
    
                .icon {
                    margin-top: auto;
                    margin-bottom: auto;
                }
    
                &:hover, &:focus {
                    color: black;
                    background-color: #f4933b;
                }
            }
        }


        p {
            color: black;
            font-size: 32px;
            background-color: #f4933b;
            padding-left: 32px;
            padding-right: 32px;
            border-radius: 6px;
            margin-top: auto;
            margin-bottom: auto;
            border: solid 1px #f4933b;
            height: 48px;
            outline: none;
        }
    }

    .alternate {
        background-color: darken(white, 70%);
    }
</style>