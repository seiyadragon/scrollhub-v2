<template>
    <div>
        <Header/>
        <slot />
    </div>
</template>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Bree Serif');

    * {
        margin: 0;
        font-family: 'Bree Serif';
    }

    body {
        background-color: darken(white, 85%);
    }

    .link {
        margin-top: auto;
        margin-bottom: auto;
        transition: all 500ms ease-in-out;
        border: solid 1px #f4933b;
        border-radius: 6px;
        padding: 4px;
        color: white;

        &:focus, &:hover {
            background-color: #f4933b;
            color: black;
        }
    }
</style>