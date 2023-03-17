// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['nuxt-icon', '@nuxtjs/supabase'],
    plugins: [{ src: '~/plugins/vercel.ts', mode: 'client' }],
    app: {
        head: {
            charset: 'utf-16',
            viewport: 'width=device-width, initial-scale=1',
            title: "ScrollHub -- Free books for everyone!",
            meta: [
                {
                    name: 'description', 
                    content: `
                        Find free books, and audiobooks online! Knowledge is powerful,
                        and we want to make it accessible to as many people as possible!
                    `
                }
            ]
        }
    },
})
