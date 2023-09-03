<template>
    <div>
        <NavbarTemplate />
        <div class="content">
            <h1>Stories of Indonesia</h1>
            <p>"Stories of Indonesia" is a wiki website dedicated to preserving the captivating essence of Indonesian legends, folklore, scary stories, interesting rumors, and timeless myths. On this website, everyone can access stories or write their own stories. Whether to unravel old tales or contribute new tales of their own.</p>
        </div>
        <FooterTemplate />
    </div>
</template>

<script>
    import NavbarTemplate from '~/components/NavbarTemplate.vue';
    import FooterTemplate from '~/components/FooterTemplate.vue';

    export default {
        components: {
            NavbarTemplate,
            FooterTemplate,
        },
    }
</script>

<style>
    body{
        background-color: rgb(226, 223, 223);
    }
    .content{
        width: 100%;
        height: 100vh;
        padding: 3%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .content h1, .content p{
        text-align: center;
    }
</style>