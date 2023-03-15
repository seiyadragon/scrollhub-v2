<template>
    <div class="navigationWrapper">
        <NuxtLink class="link" href="/">
            home
        </NuxtLink>
        <NuxtLink class="link" href="/books">
            books
        </NuxtLink>
    </div>
</template>

<style lang="scss" scoped>
    .navigationWrapper {
        color: #f4933b;
        height: 64px;
        font-size: 18px;
        display: flex;
        column-gap: 8px;

        a {
            text-decoration: none;
        }
    }
</style>