<template>
    <div class="bookWrapper">
        <div class="bookWrapperInner">
            <img :src="book.bookData.formats['image/jpeg']" alt="Book image">
            <div>
                <h3>{{ book.bookData.title }}</h3>
                <div v-for="author in book.bookData.authors">
                    <h4>{{ author.name }}</h4>
                </div>
            </div>
        </div>
        <div v-if="book.bookData.media_type !== 'Text'" class="audio">
            <Icon name="ion:volume-high" />
        </div>
    </div>
</template>

<script lang="ts" setup>
    let props = defineProps({
        book: null as any
    })
</script>

<style lang="scss" scoped>
    .bookWrapper {
        padding: 8px;
        display: flex;
        justify-content: space-between;

        .bookWrapperInner {
            display: flex;

            img {
                height: 64px;
                width: 48px;
                margin-right: 8px;
            }
                    
            h3 {
                font-size: 24px;
                color: white;
            }
        
            h4 {
                color: white;
            }

        }
        .audio {
            font-size: 32px;
            color: white;
            display: flex;
        }
    }
</style>