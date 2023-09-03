<template>
    <div>
        <NavbarTemplate />
        <div class="content row row-cols-auto g-4">
            <div v-for="(dt,id) in data" :key="id" class="col">
                <div class="card shadow" :style="{width: 'calc(8rem + 6vw)', height:'100%'}">
                    <div class="wrap" style="height:45%;">
                        <img src="@/src/img/Screenshot_5.png" class="card-img-top" alt="img" :style="{width:'100%', height:'100%', objectFit:'cover'}">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{ dt.title }}</h5>
                        <p class="card-text">{{ dt.content.slice(0,75)}}...</p>
                        <p class="card-text"><small class="text-muted">by {{ dt.author }}</small></p>
                    </div>
                </div>
            </div>
        </div>
        <FooterTemplate />
    </div>
</template>

<script>
    import NavbarTemplate from '~/components/NavbarTemplate.vue';
    import FooterTemplate from '~/components/FooterTemplate.vue';
    
    const data = []
    for (let i=0;i<11;i++){
        data.push(
            {
                author:'gaharu',
                title: 'testing nih bang',
                content: 'lksmknkjnajklvnjlkjdjkclnasjklncliuffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaniuihuihduiaheiudljknlfjksakbfjlkawbluiagiuwuifiuehuygfyubhdbvjclkajlsncwliahiueuygbhvbdljbakjsknaksndo;wjiohfi',
            }
        );
    }

    export default {
        data(){
            return{
                data,
            }
        },
        components: {
            NavbarTemplate,
            FooterTemplate,
        }
    }
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
        box-sizing: border-box;
        width: auto;
        margin: 20px 0px;
        padding: 0px 15%;
        min-height: 100vh;
        height: auto;
        justify-content: center;
        background-color: rgb(226, 223, 223);
    }
    img.car-img-top{
        height: 45%;
        object-fit: cover;
    }
    .content h1{
        font-size: calc(1.375rem + 6vw);
    }
    .card-title{
        font-size: calc(0.45rem + 1vw);
    }
    .card-text{
        font-size: calc(0.2rem + 0.7vw);
        text-align: left;
    }
    p.card-text{
        margin-bottom: 4%;
    }
    .col{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 15px 0px;
        text-align: center;
    }
    @media only screen and (max-width: 876px){
        .content{
            padding: 0px 10%;
        }
    }
    @media only screen and (max-width: 525px){
        .card{
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            width: 100% !important;
        }
        .content{
            padding: 0px 1%;
            margin: 0px;
        }
        .wrap{
            width: auto !important;
            height: 100% !important ;
        }
        .card-body{
            width: calc(2rem + 55%) !important;
            position: relative;
        }
        img.card-img-top{
            border-radius: var(--bs-card-inner-border-radius);
        }
        h5.card-title{
            width: 100%;
            text-align: left;
            font-size: 14px;
        }
        p.card-text{
            width: 100%;
            font-size: 11px;
        }
        .col{
            margin: 8px 0px;
        }
    }
</style>
