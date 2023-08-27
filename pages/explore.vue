<template>
    <div>
        <NavbarTemplate />
        <div class="content">
            <h1>Coming Soon</h1>
        </div>
        <FooterTemplate />
    </div>
</template>

<script>
</script>

<style>
    body{
        background-color: rgb(226, 223, 223);
    }
    @font-face {
            font-family: 'boutiques of merauke';
            src: url("@/src/font/boutiques-of-merauke-font/BoutiquesOfMerauke.ttf");
    }
    .content{
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items:center ;
        text-align: center;
        font-family: 'boutiques of merauke';
    }
    .content h1{
        font-size: calc(1.375rem + 6vw);
    }
</style>