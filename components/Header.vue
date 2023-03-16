<template>
    <header class="headerFrame">
        <PaddingX class="headerInner">
            <img src="/scrollhub.png" alt="Scrollhub Logo!" class="scrollhubLogo">
            <Navigation />
        </PaddingX>
    </header>
</template>

<style lang="scss" scoped>
    .headerFrame {
        background-color: transparent;
        height: 64px;
        position: sticky;
        top: 0;
        z-index: 99;
        backdrop-filter: blur(9px);
        border-bottom: solid 4px #f4933b;

        .headerInner {
            display: flex;
            justify-content: space-between;

            .scrollhubLogo {
                height: 64px;
                margin-left: -4px;
            }
        }
    }
</style>