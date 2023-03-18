<template>
    <PaddingX>
        <Panel class="panel">
            <BooksNavigation :page="page + 1" @prevPage="prevPage" @nextPage="nextPage" class="pages" @firstPage="firstPage" @pageJump="pageJump">
                <!-- BooksSearch /-->
            </BooksNavigation>
            <section>
                <Book :book="book" :max_books="maxBooks" />
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

    let {data, error} = await supabaseClient
    .from("ScrollHubBooks")
    .select("*")
    .eq("id", bookID)

    if (error !== null)
        console.log(error)

    let book = ref((data as any[])[0])
    let bookText = ref("")
    let mounted = ref(false)
    let page = ref(0)
    let maxBooks = ref(await getBooksTableLength(""))

    watch(page, (before, after) => {
        localStorage.setItem(bookID as string, page.value.toString())
    })

    onMounted(async () => {
        let {data: bookData, error} = await useFetch(`/api/loadBookData?bookString=${JSON.stringify(book.value)}`)
        
        bookText.value = bookData.value?.text as string
        mounted.value = true

        let savedPage = localStorage.getItem(bookID as string)
        if (savedPage !== null) {
            page.value = parseInt(savedPage as string)
            scrollUpByUntil(32, page.value * (120 * 16))
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
        scrollDownByUntil(32, page.value * (120 * 16))
    }

    const nextPage = () => {
        if (page.value > document.documentElement.scrollHeight / (120 * 16))
            return
            
        page.value++
        scrollUpByUntil(32, page.value * (120 * 16))
    }

    const firstPage = async () => {
        page.value = 0
        scrollDownByUntil(32, 0)
    }

    const pageJump = (toPage: number) => {
        if (toPage < 0)
            toPage = 0

        if (toPage > document.documentElement.scrollHeight / (120 * 16))
            toPage = document.documentElement.scrollHeight / (120 * 16)

        if (toPage > page.value) {
            page.value = toPage
            scrollUpByUntil(32, page.value * (120 * 16))
        }
        else {
            page.value = toPage
            scrollDownByUntil(32, page.value * (120 * 16))
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
        }
    
        .loadingImage {
            width: 100%;
            filter: blur(16px);
        }
    }
</style>