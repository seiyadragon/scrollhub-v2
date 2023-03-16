<template>
    <PaddingX>
        <Panel class="booksPanel">
            <BooksNavigation :page="page + 1" @prevPage="prevPage" @nextPage="nextPage" @pageJump="pageJump" @firstPage="firstPage" >
                <BooksSearch @onSearch="onSearch" :should-reset="shouldResetSearch"/>
            </BooksNavigation>
            <NuxtLink v-if="loaded" :href="`/books/${book.id}`" v-for="book, index in books" class="book" :class="index % 2 == 0 ? 'light' : ''">
                <Book :book="book" :max_books="maxBooks"/>
            </NuxtLink>
            <img src="/loading.gif" alt="Loading animation" v-if="!loaded" class="loadingImage">
        </Panel>
    </PaddingX>
    <Footer />
</template>

<script lang="ts" setup>
import { title } from 'process';

    let supabaseClient = useSupabaseClient()

    const getBooksTableLength = async (query: string) => {
        if (query === "") {
            let {count}: any = await supabaseClient
            .from("ScrollHubBooks")
            .select("*", {count: 'exact', head: true})

            return count
        }

        let {count}: any = await supabaseClient
        .from("ScrollHubBooks")
        .select("*", {count: 'exact', head: true})
        .or(`title.ilike.%${query}%,author.ilike.%${query}%`)

        return count
    }

    const reloadBooks = async () => {
        let {data, error}: any = await supabaseClient
        .from("ScrollHubBooks")
        .select("*")
        .order('id', {ascending: true})
        .range((page.value * 32) + 0, (page.value * 32) + 31)

        return data
    }

    const reloadBooksMatching = async (search: string) => {
        if (search === "")
            return await reloadBooks()

        let {data, error}: any = await supabaseClient
        .from("ScrollHubBooks")
        .select("*")
        .order('id', {ascending: true})
        .range((page.value * 32) + 0, (page.value * 32) + 31)
        .or(`title.ilike.%${search}%,author.ilike.%${search}%`)

        return data
    }

    let lastPage = 0
    let lastScroll = 0
    
    let page = ref(0)
    let books = ref([] as any[])
    let loaded = ref(false)
    let searchTerm = ref("")
    let shouldResetSearch = ref(false)
    let maxBooks = ref(await getBooksTableLength(""))

    watch(books, async (currentValue, oldValue) => {
        if (books.value.length > 0) {
            loaded.value = true
        }
    })

    onMounted(async () => {
        books.value = await reloadBooksMatching("")
        lastPage = ((maxBooks.value / 32) - 2) +  (1 - ((await getBooksTableLength(searchTerm.value) / 32) - 2) % 1)

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
        lastPage = ((await getBooksTableLength(searchTerm.value) / 32) - 2) +  (1 - ((await getBooksTableLength(searchTerm.value) / 32) - 2) % 1)
        shouldResetSearch.value = true
        books.value = await reloadBooksMatching(searchTerm.value)
    }

    const onSearch = async (search: string) => {
        loaded.value = false
        page.value = 0
        searchTerm.value = search
        lastPage = ((await getBooksTableLength(searchTerm.value) / 32) - 2) +  (1 - ((await getBooksTableLength(searchTerm.value) / 32) - 2) % 1)
        books.value = await reloadBooksMatching(searchTerm.value)
    }
</script>

<style lang="scss" scoped>
    @keyframes fallIn {
        from {
            opacity: 0%;
            transform: translate(0px, -512px);
        }
        to {
            opacity: 100%;
            transform: translate(0px, 0px);
        }
    }
    .booksPanel {
        display: flex;
        flex-direction: column;
        border-bottom: solid white 1px;
        
        .book {
            text-decoration: none;
            position: relative;
            animation: fallIn 1000ms ease-in-out;

            &::after {
                position: absolute;
                height: 6px;
                background-color: #f4933b;
                width: 100%;
                content: '';
                bottom: 0;
                left: 0;
                transform-origin: bottom right;
                transform: scaleX(0);
                transition: all 1000ms ease-in-out;
                border-radius: 100%;
            }

            &:hover, &:focus {
                &::after {
                    transform: scale(1);
                    transform-origin: bottom left;
                    border-radius: 0%;
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