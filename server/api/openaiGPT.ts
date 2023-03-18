
export default defineEventHandler(async (event) => {
    let openaiKey = process.env.OPENAIKEY

    let {prompt} = getQuery(event)

    console.log(prompt)

    let systemRole = `
        You create web pages.
        Your response should include html css and javascript only.
        No text.
    `.toString().replaceAll('\n', '').replaceAll(/\s\s+/g, ' ')
    
    let finalPrompt = `
        ${prompt}
    `.toString().replaceAll('\n', '').replaceAll(/\s\s+/g, ' ')

    console.log(finalPrompt)

    try {
        const optionsBody = {
            model: "gpt-3.5-turbo",
            max_tokens: 3097,
            temperature: 1.0,
            messages: [
                {"role": "system", "content": `${systemRole}`},
                {"role": "user", "content": `${finalPrompt}`}
            ]
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${openaiKey}`,
            },
            body: JSON.stringify(optionsBody)
        }

        var chat: any = await (await fetch("https://api.openai.com/v1/chat/completions", options as any)).json()

    } catch (exception) {
        console.log(exception)
    }

    return {
        response: chat
    }
})