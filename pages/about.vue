<template>
    <div>
        <div class="container-fluid">
            <NavbarTemplate :user="user" :islogin="islogin" :class="islogin ? 'lgn1' : '' "/>
            <div class="row justify-content-center align-items-stretch">
                <SidebarTemplate :user="user" :class="islogin ? 'lgn2 col-1' : '' " v-if="islogin" />
                <div class="content col">
                    <h1>Stories of Indonesia</h1>
                    <p>"Stories of Indonesia" is a wiki website dedicated to preserving the captivating essence of Indonesian legends, folklore, scary stories, interesting rumors, and timeless myths. On this website, everyone can access stories or write their own stories. Whether to unravel old tales or contribute new tales of their own.</p>
                </div>
            </div>
        </div>
        <FooterTemplate />
    </div>
</template>

<script>
    import NavbarTemplate from '~/components/NavbarTemplate.vue';
    import FooterTemplate from '~/components/FooterTemplate.vue';
    import SidebarTemplate from '~/components/SidebarTemplate.vue';

    export default {
        components: {
            NavbarTemplate,
            FooterTemplate,
            SidebarTemplate,
        },
        data(){
            return{
                islogin: this.$store.state.userControl.islogin,
                user: this.$store.state.userControl.user,
            }
        },
        async beforeMount(){
            if (this.islogin === false){
                if( await this.$store.dispatch('userControl/checkIsLogin') ){
                    this.islogin = true;
                    this.user = this.$store.state.userControl.user;
                }
            }
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
    .lgn1{
    display: none !important;
  }
  .lgn2{
    display: flex !important;
  }
  .col-1{
    height: calc(100vh - 3rem + 12px) !important;
    margin-left: 2%;
    margin-top: 2%;
  }
  @media only screen and (max-width: 950px){
    .lgn1{
      display: block !important;
    }
    .lgn2{
      display: none !important;
    }
  }
</style>