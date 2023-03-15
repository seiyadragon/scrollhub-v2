<template>
    <PaddingX>
        <Panel class="booksPanel">
            <BooksNavigation :page="page + 1" @prevPage="prevPage" @nextPage="nextPage" @pageJump="pageJump" @firstPage="firstPage" >
                <BooksSearch @onSearch="onSearch"/>
            </BooksNavigation>
            <NuxtLink :href="`/books/${book.id}`" v-for="book, index in books" class="book" :class="index % 2 == 0 ? 'light' : ''">
                <Book :book="book" />
            </NuxtLink>
        </Panel>
    </PaddingX>
</template>

<script lang="ts" setup>
    let supabaseClient = useSupabaseClient()

    let searchTerm = ref("")

    const reloadBooks = async () => {
        let {data, error}: any = await supabaseClient
        .from("ScrollHubBooks")
        .select("*")
        .range((page.value * 32) + 0, (page.value * 32) + 31)
        .filter("title:bookData->>title", "in", searchTerm.value)

        return data
    }

    let lastPage = (46688 / 32) - 2

    let page = ref(0)
    let books = ref(await reloadBooks())

    const nextPage = async () => {
        if (page.value > lastPage)
            return

        page.value++
        books.value = await reloadBooks()
    }

    const prevPage = async () => {
        if (page.value == 0)
            return

        page.value--
        books.value = await reloadBooks()
    }

    const pageJump = async (toPage: number) => {
        if (toPage < 0)
            toPage = 0

        if (toPage > lastPage)
            toPage = lastPage

        page.value = toPage
        books.value = await reloadBooks()
    }

    const firstPage = async () => {
        page.value = 0
        books.value = await reloadBooks()
    }

    const onSearch = async (search: string) => {
        searchTerm.value = search
        books.value = await reloadBooks()
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
    }
</style>