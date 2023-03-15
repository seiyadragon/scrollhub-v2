<template>
    <PaddingX>
        <Panel class="booksPanel">
            <BooksNavigation :page="page + 1" @prevPage="prevPage" @nextPage="nextPage" @pageJump="pageJump" @firstPage="firstPage" >
                <BooksSearch @onSearch="onSearch"/>
            </BooksNavigation>
            <NuxtLink v-if="loaded" :href="`/books/${book.id}`" v-for="book, index in books" class="book" :class="index % 2 == 0 ? 'light' : ''">
                <Book :book="book" />
            </NuxtLink>
            <img src="/loading.gif" alt="Loading animation" v-if="!loaded" class="loadingImage">
        </Panel>
    </PaddingX>
</template>

<script lang="ts" setup>
import { title } from 'process';

    let supabaseClient = useSupabaseClient()

    const reloadBooks = async () => {
        let {data, error}: any = await supabaseClient
        .from("ScrollHubBooks")
        .select("*")
        .range((page.value * 32) + 0, (page.value * 32) + 31)

        return data
    }

    const reloadBooksMatching = async (search: string) => {
        if (search === "")
            return await reloadBooks()

        let {data, error}: any = await supabaseClient
        .from("ScrollHubBooks")
        .select("*")
        .range((page.value * 32) + 0, (page.value * 32) + 31)
        .or(`title.ilike.%${search}%,author.ilike.%${search}%`)

        return data
    }

    let lastPage = (46688 / 32) - 2

    let page = ref(0)
    let books = ref([] as any[])
    let loaded = ref(false)
    let searchTerm = ref("")

    watch(books, async (currentValue, oldValue) => {
        if (currentValue.length > 0) {
            loaded.value = true
        }
    })

    onMounted(async () => {
        books.value = await reloadBooksMatching("")

        if (books.value.length === 0) {
            let {data, error} = await useFetch("/api/loadDatabase")

            setTimeout(async () => {
                books.value = await reloadBooksMatching("")
            }, 5000)

        } else {
            loaded.value = true
        }
    })

    const nextPage = async () => {
        if (page.value > lastPage)
            return

        loaded.value = false
        page.value++
        books.value = await reloadBooksMatching(searchTerm.value)
    }

    const prevPage = async () => {
        if (page.value == 0)
            return

        loaded.value = false
        page.value--
        books.value = await reloadBooksMatching(searchTerm.value)
    }

    const pageJump = async (toPage: number) => {
        if (toPage < 0)
            toPage = 0

        if (toPage > lastPage)
            toPage = lastPage

        loaded.value = false
        page.value = toPage
        books.value = await reloadBooksMatching(searchTerm.value)
    }

    const firstPage = async () => {
        loaded.value = false
        searchTerm.value = ""
        page.value = 0
        books.value = await reloadBooksMatching(searchTerm.value)
    }

    const onSearch = async (search: string) => {
        loaded.value = false
        page.value = 0
        searchTerm.value = search
        books.value = await reloadBooksMatching(searchTerm.value)
    }
</script>

<style lang="scss" scoped>
    .booksPanel {
        display: flex;
        flex-direction: column;

        .book {
            text-decoration: none;
            position: relative;

            &::after {
                position: absolute;
                height: 1px;
                background-color: white;
                width: 100%;
                content: '';
                bottom: 0;
                left: 0;
                transform-origin: bottom right;
                transform: scaleX(0);
                transition: all 500ms ease-in-out;
            }

            &:hover, &:focus {
                &::after {
                    transform: scale(1);
                    transform-origin: bottom left;
                }
            }
        }

        .light {
            background-color: darken(white, 70%);
        }

        .loadingImage {
            width: 100%;
            filter: blur(16px);
        }
    }
</style>