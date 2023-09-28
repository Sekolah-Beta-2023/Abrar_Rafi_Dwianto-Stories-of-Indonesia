<template>
    <div class="wraper">
        <NavbarTemplate :islogin="islogin" :profilePhoto="user.image" :profileName="user.name" :class="islogin? 'lgnn' : ''"/>
        <main :style="{height: islogin? 'calc(100% - (3rem + 12px + 4vh))' : 'calc(100% - (6rem + 20px + 5vh))', padding: islogin? '':'0% 15%'}">
            <SidebarTemplate :profilePhoto="user.image" :profileName="user.name" :class="islogin? 'lgns' : ''" v-if="islogin" />
            <section class="main container-fluid">
                <div>
                    <div id="wrapcntn" class="rounded shadow mt-4">
                        <div class="content" v-html="`<h1> ${book.title} </h1>` + book.content">
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <FooterTemplate />
    </div>
</template>
<script>
    import FooterTemplate from '~/components/FooterTemplate.vue'
    import NavbarTemplate from '~/components/NavbarTemplate.vue'
    import SidebarTemplate from '~/components/SidebarTemplate.vue'

    export default {
        components:{
            NavbarTemplate,
            FooterTemplate,
            SidebarTemplate,
        },
        data() {
            return {
                controllPanel: false,
                islogin: false,
                book: {
                    "cover": require('@/static/img/bedawang.jpg'),
                    "title": "Lorem Ipsum",
                    "description": "lorem ipsum sit amet dolor constrestus",
                    "categories": ['Horror', 'Myth'],
                    "content": "<p placeholder=\"Paragraph\"><div>Lorem ipsum etiam netus at sollicitudin pharetra sed arcu euismod eros, hac velit sem habitant nulla congue sociosqu eget quisque urna, pulvinar proin viverra nostra proin odio donec nunc fringilla. Morbi bibendum venenatis curabitur morbi nullam vulputate nibh enim quisque per, accumsan sem commodo lectus eros porta augue felis nulla, interdum a tempor dictumst felis himenaeos nibh accumsan potenti. Pulvinar primis libero urna varius potenti tortor tempus tristique pharetra, semper vehicula est consectetur mi hac egestas quam facilisis molestie, nulla pulvinar volutpat fusce egestas ac elementum interdum.</div><div><br></div><div>Metus faucibus consequat est commodo mauris potenti commodo odio enim ut sodales semper praesent nunc malesuada interdum, id phasellus nostra quisque elementum nunc proin diam duis litora conubia venenatis morbi aenean arcu. Commodo tempor dolor curae quam ultricies ac porttitor duis praesent bibendum ante augue vivamus posuere vehicula ornare ultrices, nec vel mattis dui fusce a eleifend in donec fermentum conubia condimentum nunc non sit.</div></p>",
                    "author": "Abrar Rafi"
                },
                user:{
                    name: 'Abrar Rafi',
                    image: require('@/static/img/bedawang.jpg'),
                },
                cimg:'',
            }
        },
        mounted() {
            document.querySelector('.content').innerHTML = `<h1>${this.book.title}</h1>` + this.book.content;

            const elm = document.querySelectorAll('[placeholder]');
            elm.forEach(element => {
                element.removeAttribute('placeholder');
            });
        },
        computed:{
            
        },
        methods:{

        }
    }
</script>
<style>
    body{
        background-color: rgb(226, 223, 223);
    }
    .lgns{
        display: flex !important;
    }
    .lgnn{
        display: none !important;
    }
    .wraper{
        width: 100vw;
        height: 100vh;
        align-items: stretch;
        justify-content: stretch;
        overflow: hidden;
    }
    main{
        width: 96%;
        display: flex;
        flex-direction: row;
        margin: 2vh 2vw;
        align-items: stretch;
        justify-content: stretch;
        overflow: auto;
    }
    section.main{
        width: 100%;
        height: fit-content;
        margin-bottom: auto;
    }
    .dropdown{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-right: 2%;
    }
    .dropdown-item{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
    label{
        display: flex;
        justify-content: center;
        align-items: center;
        color: #00000066;
        font-weight: 500;
    }

    #wrapcntn{
        width: 100%;
        height: auto;
        background-color: whitesmoke;
        padding: 5%;
    }
    .content{
        text-align: center;
    }

    @media only screen and (max-width: 950px){
        .lgns{
            display: none !important;
        }
        .lgnn{
            display: block !important;
        }
        main{
            height: calc(100% - (6rem + 20px + 5vh)) !important;
            
        }
    }

    @media only screen and (max-width: 768px){
        main{
            padding: 0% !important;
        }
    }

    @media only screen and (max-width: 425px){
        .btn{
            font-size: 0.7rem;
        }
        h1, .h1{
            font-size: calc(1rem + 1.5vw);
        }

        p, .p{
            font-size: 12px;
        }
        h2, .h2{
            font-size: calc(0.95rem + 0.9vw);
        }
        h3, .h3{
            font-size: calc(0.9rem + 0.6vw);
        }
    }
</style>
