import {createClient} from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
    let url = process.env.SUPABASE_URL
    let key = process.env.SUPABASE_KEY

    const supabaseClient = createClient(url as string, key as string)

    let response = {
        message: "",
        passed: false,
    }

    let {data: books, error: error1} = await supabaseClient
    .from("ScrollHubBooks")
    .select("*")

    if (error1 !== null) {
        response.message = error1.message
        response.passed = false
    }

    if ((books as any[]).length <= 0 || books === undefined) {
        books = []

        let gutendex: any = await (await fetch("https://gutendex.com/books")).json()

        gutendex.results.map(async (book: any) => {
            await supabaseClient
            .from("ScrollHubBooks")
            .insert({bookData: book, title: book.title, author: book.authors[0] !== undefined ? book.authors[0].name : "Unknown"})
        })

        while (gutendex.next !== null) {
            gutendex = await (await fetch(gutendex.next)).json()

            gutendex.results.map(async (book: any) => {
                await supabaseClient
                .from("ScrollHubBooks")
                .insert({bookData: book, title: book.title, author: book.authors[0] !== undefined ? book.authors[0].name : "Unknown"})
            })
        }

        response.message = "Books loaded!"
        response.passed = true
    }

    return response
})