<template>
    <div>
      <nav class="navbar navbar-expand-lg" data-bs-theme="light" style="background-color: rgb(226, 223, 223);">
        <div style="background-color: whitesmoke;" class="container-fluid shadow">
          <a class="navbar-brand" href=".">Stories of Indonesia</a>
          <button style="padding: 0%;" class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-body">
              <ul v-if="!islogin" class="navbar-nav justify-content-end flex-grow-1 pe-2">
                <li class="nav-item h" >
                  <nuxt-link :class="this.$route.path === '/' ? 'nav-link active':'nav-link'" to="/">Home</nuxt-link>
                </li>
                <li class="nav-item a">
                  <nuxt-link :class="this.$route.path === '/about' ? 'nav-link active':'nav-link'" to="/about">About</nuxt-link>
                </li>
                <li class="nav-item e">
                  <nuxt-link :class="this.$route.path === '/explore' ? 'nav-link active':'nav-link'" to="/explore">Explore</nuxt-link>
                </li>
                <li class="nav-item e">
                  <nuxt-link :class="this.$route.path === '/logIn' ? 'nav-link active':'nav-link'" to="/logIn">Log In</nuxt-link>
                </li>
              </ul>
              <ul v-if="islogin" class="navbar-nav justify-content-end flex-grow-1 pe-2 nb">
                <div class="profile mb-2">
                  <img :src="`https://wytinjsgermcnjpcupns.supabase.co/storage/v1/object/public/storiesoi/${user.id}/profile/${user.image}`" alt="" class="rounded-circle">
                  <h6>{{ user.name }}</h6>
                </div>
                <li class="nav-item h" >
                  <nuxt-link :class="this.$route.path === '/explore' ? 'active':''" class="nav-link rounded bi bi-search" to="/explore">Explore</nuxt-link>
                </li>
                <li class="nav-item a">
                  <nuxt-link :class="this.$route.path === '/myStories' ? 'active':''" class="nav-link rounded bi bi-book" to="/mystories">My Stories</nuxt-link>
                </li>
                <li class="nav-item e">
                  <nuxt-link :class="this.$route.path === '/profile' ? 'active':''" class="nav-link rounded bi bi-person-fill" to="/profile">My Profile</nuxt-link>
                </li>
              </ul>
            </div>
            <div class="offcanvas-header">
              <button type="button" class="btn-close text-reset rounded-circle" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
          </div>
        </div>
      </nav>
    </div>
</template>

<script>
  export default{
    data(){
      return{
        
      }
    },
    props: {
      user: Object,
      islogin: Boolean,
    }
  }
</script>
<style scoped>
  @font-face {
      font-family: 'boutiques of merauke';
      src: url("@/static/font/boutiques-of-merauke-font/BoutiquesOfMerauke.ttf");
  }
  .navbar{
      border-bottom: 2px solid rgba(245, 245, 245, 0.116);
      height: calc(3rem + 8px + 1vh);
      padding: 1vh;
  }
  .navbar .container-fluid{
      width: 100%;
      height: 100%;
      border-radius: 10px;
  }
  .navbar .container-fluid button.navbar-toggler{
      border: none !important;
  }
  .navbar .container-fluid .navbar-brand{
      font-family: "boutiques of merauke";
      font-size: 25px;
  }
  .ofcanvas-header{
    position: relative;
    width: 100%;
  }
  .offcanvas-backdrop{
    width: 200vw;
    height: 200vh;
    top: calc(50% - 100vh);
    left: calc(50% - 100vw);
  }
  button.btn-close{
    margin-left: calc(50% - 1rem);
    margin-bottom: 1rem !important;
    border: 3px solid #00000066;
  }
  .nb .nav-item .nav-link{
    margin: 2% 0%;
    padding: 0%;
    padding-left: 2%;
    width: 100%;
  }
  .nb .nav-item .nav-link.active{
    background-color: rgb(185, 185, 185);
  }
  .nb .nav-item .nav-link::before{
      margin-right: 3%;
  }
  .nb .profile{
    border-bottom: 1px solid #00000066;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 3%;
  }
  .nb .profile img{
    width: 3rem;
    height: 3rem;
    margin-right: 4%;
  }
  @media only screen and (min-width: 412px){
    .offcanvas{
      min-width: 270px;
      max-width: 30vw;
    }
  }

</style>