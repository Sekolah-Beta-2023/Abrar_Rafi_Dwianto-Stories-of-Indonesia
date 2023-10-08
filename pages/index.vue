<template>
  <div>
    <NavbarTemplate :user="user"  :islogin="islogin"/>
    <div class="welcome" data-bs-theme="light">
      <h1>Welcome to Stories of Indonesia</h1>
      <p>know more about Indonesian legends, folklore, scary stories, interesting rumors, and timeless myths</p>
      <button class="btn btn-primary" onclick="window.location.href='/explore'">explore now!</button>
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
  /* @media only screen and (max-width: 452px){
    .welcome h1, .welcome p{
      text-align: center;
    }
  } */
</style>