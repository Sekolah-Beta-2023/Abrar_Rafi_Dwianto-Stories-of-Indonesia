<template>
  <div>
    <div class="container-fluid">
      <NavbarTemplate :user="user" :islogin="islogin" :class="islogin ? 'lgn1' : '' "/>
      <div class="row justify-content-center align-items-stretch">
        <SidebarTemplate :user="user" :class="islogin ? 'lgn2 col-1' : '' " v-if="islogin" />
        <div class="welcome col" data-bs-theme="light">
            <h1>Welcome to Stories of Indonesia</h1>
            <p>know more about Indonesian legends, folklore, scary stories, interesting rumors, and timeless myths</p>
            <button class="btn btn-primary" onclick="window.location.href='/explore'">explore now!</button>
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
  @font-face {
    font-family: 'boutiques of merauke';
    src: url("@/static/font/boutiques-of-merauke-font/BoutiquesOfMerauke.ttf");
  }
  body{
    background-color: rgb(226, 223, 223);
  }
  .welcome{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px 10px;
  }
  .welcome h1{
    font-family: "boutiques of merauke";
    font-size: calc(1.375rem + 5vw);
    
  }
  .welcome h1, .welcome p{
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