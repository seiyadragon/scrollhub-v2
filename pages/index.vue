<template>
    <div class="homeBackground">
        <div class="homeBackgroundBlur">
            <PaddingY :padding="128">
                <PaddingX>
                    <section>
                        <h1>KNOWLEDGE IS POWER</h1>
                        <h2>
                            <NuxtLink class="link" href="/books">
                                SEEK IT
                            </NuxtLink>
                        </h2>
                    </section>
                </PaddingX>
            </PaddingY>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .homeBackground {
        background-image: url("/books_background.jpg");
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        .homeBackgroundBlur {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            backdrop-filter: blur(3px);

            h1 {
                text-shadow: 4px 4px darken(white, 50%);
                text-align: center;
                font-size: 48px;
                color: white;

                @media (min-width: 690px) {
                    font-size: 96px;
                }    
            }

            h2 {
                text-align: center;
                font-size: 24px;
                margin-top: 120px;

                @media (min-width: 690px) {
                    font-size: 48px;
                }

                .link {
                    padding-left: 16px;
                    padding-right: 16px;
                    text-shadow: 3px 3px darken(white, 50%);

                    text-decoration: none;

                    &:hover, &:focus {
                        text-shadow: none;
                    }
                }
            }
        }
    }
</style>