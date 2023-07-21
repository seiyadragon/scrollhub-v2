<template>
    <footer class="footer">
        <PaddingX>
            <h1>About Scrollhub</h1>
            <p>{{ `
                Welcome to our website, a digital library dedicated to 
                bringing the joy of reading to people all around the world. 
                Our mission is to provide free access to over 70,000 books 
                in multiple languages, catering to a wide range of interests and preferences.

                We understand the importance of reading and the impact it can have on one's 
                personal growth and development. That's why we have created this platform to make books more 
                accessible to everyone who loves reading, regardless of their location or financial situation.

                Our collection includes classic literature, contemporary fiction, non-fiction, academic 
                texts, and much more. Whether you're a fan of romance novels or history books, there's 
                something for everyone on our website.

                We believe that access to education and knowledge is a basic right that everyone should 
                have, and we're proud to be a part of the movement that's making that possible. 
                Our website is completely free to use, and we hope that it will inspire you to read 
                more and explore new worlds through the power of literature.

                Thank you for visiting our website, and we hope that you'll enjoy exploring 
                our vast collection of books. If you have any questions or feedback, please 
                don't hesitate to get in touch with us. Happy reading!
            ` }}</p>
            <div class="separator" />
            <h1>About me</h1>
            <div class="aboutMe" >
                <a class="profile" href="https://wevolution.biz">
                    <img 
                        src="https://pbs.twimg.com/profile_images/1663671550254501890/pHEEL7vv_400x400.jpg" 
                        alt="Profile Picture" class="profile-picture" 
                    >
                    <div class="name">
                        <h2>Arlen Molina</h2>
                        <h4>Web developer</h4>
                    </div>
                </a>
                <p>{{ `
                    Welcome to my website! I am a web developer with a passion for creating beautiful 
                    and interactive websites that engage and delight users.

                    With years of experience in web development, I have honed my skills in a 
                    variety of programming languages, including HTML, CSS, JavaScript, and PHP. 
                    My approach to web development is focused on creating websites that not only 
                    look stunning but also provide a seamless user experience.

                    I believe that great web design should be accessible to everyone, 
                    which is why I work closely with my clients to understand their unique 
                    needs and goals. Whether you are looking for a simple website or a complex 
                    web application, I am committed to delivering exceptional results that exceed 
                    your expectations.

                    In addition to my work as a web developer, I am also an avid learner who is always 
                    seeking to improve my skills and stay up-to-date with the latest trends in web development. 
                    This passion for learning and growth is reflected in my work, as I constantly strive to push 
                    the boundaries of what is possible with web design.

                    So if you are looking for a web developer who is passionate about creating beautiful 
                    and interactive websites, look no further. Please take some time to explore my website 
                    and learn more about my work. I look forward to working with you to bring your vision to life!
                ` }}</p>
            </div>
        </PaddingX>
    </footer>
</template>

<style lang="scss" scoped>
    .footer {
        margin-top: 48px;
        margin-bottom: 48px;
        color: white;
        position: relative;
        bottom: 0px;

        .separator {
            width: 100%;
            height: 1px;
            margin-top: 24px;
            margin-bottom: 24px;
            border-bottom: 1px dashed white;
        }

        .aboutMe {
            .profile {
                display: flex;
                color: white;
                text-decoration: none;
                border: solid 1px #f4933b;
                width: 300px;
                padding: 8px;
                margin-top: 16px;
                margin-bottom: 16px;
                transition: all 500ms ease-in-out;
                border-radius: 6px;

                &:hover, &:focus {
                    background-color: #f4933b;
                    color: black;
                }
    
                img {
                    width: 64px;
                    height: 64px;
                    border-radius: 100%;
                }
    
                .name {
                    margin-left: 8px;
                    margin-top: auto;
                    margin-bottom: auto;
                }
            }
        }
    }
</style>