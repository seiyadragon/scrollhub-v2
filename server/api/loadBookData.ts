export default defineEventHandler(async (event) => {
    let {bookString} = getQuery(event)
    let book = JSON.parse(bookString as string)

    if (book.bookData.formats['text/plain; charset=utf-8'] !== undefined)
        var bookTextData: any = await $fetch(`${book.bookData.formats['text/plain; charset=utf-8']}`, {mode: 'no-cors'})

    else if (book.bookData.formats['text/plain'] !== undefined)
        var bookTextData: any = await $fetch(`${book.bookData.formats['text/plain']}`, {mode: 'no-cors'})

    else
        var bookTextData: any = null

    return {
        text: bookTextData,
    }
})