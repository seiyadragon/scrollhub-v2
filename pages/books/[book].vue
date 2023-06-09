<template>
    <PaddingX>
        <Panel class="panel">
            <BooksNavigation :page="page + 1" @prevPage="prevPage" @nextPage="nextPage" class="pages" @firstPage="firstPage" @pageJump="pageJump">
                <!-- BooksSearch /-->
            </BooksNavigation>
            <section>
                <Book v-if="mounted" :book="book" :max_books="maxBooks" />
                <p v-if="mounted">{{ bookText }}</p>
                <img src="/loading.gif" alt="Loading animation" v-if="!mounted" class="loadingImage">
            </section>
        </Panel>
    </PaddingX>
    <Footer />
</template>

<script lang="ts" setup>
    let supabaseClient = useSupabaseClient()
    let route = useRoute()

    const PAGE_SCROLL_SPEED = 8

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

    let bookID = route.params.book

    let book = ref([] as any[])
    let bookText = ref("")
    let mounted = ref(false)
    let page = ref(0)
    let maxBooks = ref(await getBooksTableLength(""))

    watch(page, (before, after) => {
        localStorage.setItem(bookID as string, page.value.toString())
    })

    onMounted(async () => {
        let {data, error: err1} = await supabaseClient
        .from("ScrollHubBooks")
        .select("*")
        .eq("id", bookID)

        if (err1 !== null)
            console.log(err1)

        book.value = (data as any[])[0]

        let {data: bookData, error} = await useFetch(`/api/loadBookData?bookString=${JSON.stringify(book.value)}`)

        bookText.value = bookData.value?.text as string
        mounted.value = true

        let savedPage = localStorage.getItem(bookID as string)
        if (savedPage !== null) {
            page.value = parseInt(savedPage as string)
            scrollUpByUntil(PAGE_SCROLL_SPEED * page.value, page.value * (120 * 16))
        }
    })

    const scrollUpByUntil = (by: number, until: number) => {
        if (document.documentElement.scrollTop < until) {
            document.documentElement.scrollTop += by

            setTimeout(() => {
                scrollUpByUntil(by, until)
            }, (by / until - (page.value * (120 * 16))) * 100)
        }
    }

    const scrollDownByUntil = (by: number, until: number) => {
        if (document.documentElement.scrollTop > until) {
            document.documentElement.scrollTop -= by

            setTimeout(() => {
                scrollDownByUntil(by, until)
            }, (by / until - (page.value * (120 * 16))) * 100)
        }
    }

    if (process.client)
        window.onscroll = () => {
            page.value = parseInt((document.documentElement.scrollTop / (120 * 16)).toString())
        }

    const prevPage = () => {
        if (page.value < 1)
            return

        page.value--
        scrollDownByUntil(PAGE_SCROLL_SPEED, page.value * (120 * 16))
    }

    const nextPage = () => {
        if (page.value > document.documentElement.scrollHeight / (120 * 16))
            return
            
        page.value++
        scrollUpByUntil(PAGE_SCROLL_SPEED, page.value * (120 * 16))
    }

    const firstPage = async () => {
        let prevPageValue = page.value
        page.value = 0
        scrollDownByUntil(PAGE_SCROLL_SPEED * prevPageValue, page.value)
    }

    const pageJump = (toPage: number) => {
        if (toPage < 0)
            toPage = 0

        if (toPage > document.documentElement.scrollHeight / (120 * 16))
            toPage = document.documentElement.scrollHeight / (120 * 16)

        if (toPage > page.value) {
            page.value = toPage
            scrollUpByUntil(PAGE_SCROLL_SPEED * page.value, page.value * (120 * 16))
        }
        else {
            page.value = toPage
            scrollDownByUntil(PAGE_SCROLL_SPEED * page.value, page.value * (120 * 16))
        }
    }
</script>

<style lang="scss" scoped>
    .panel {
        position: relative;
        border-bottom: 1px solid white;
        padding-bottom: 32px;

        p {
            white-space: pre-wrap;
            padding-left: 8px;
            padding-right: 8px;
            padding-top: 4px;
            padding-bottom: 4px;
        }

        .invPage {
            background-color: darken(white, 70%);
        }
    
        .loadingImage {
            width: 100%;
            filter: blur(16px);
        }
    }
</style>