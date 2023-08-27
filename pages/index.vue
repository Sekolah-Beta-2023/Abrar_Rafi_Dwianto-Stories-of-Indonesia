<template>
  <div>
    <NavbarTemplate />
    <div class="welcome" data-bs-theme="light">
      <h1>Welcome to Stories of Indonesia</h1>
      <p>know more about Indonesian legends, folklore, scary stories, interesting rumors, and timeless myths</p>
      <button class="btn btn-primary" onclick="window.location.href='/explore'">explore now!</button>
    </div>
    <FooterTemplate />
  </div>
</template>

<script>
</script>
<style>
  @font-face {
    font-family: 'boutiques of merauke';
    src: url("@/src/font/boutiques-of-merauke-font/BoutiquesOfMerauke.ttf");
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
  }
  .welcome h1{
    font-family: "boutiques of merauke";
    font-size: calc(1.375rem + 5vw);
    
  }
  @media only screen and (max-width: 452px){
    .welcome h1, .welcome p{
      text-align: center;
    }
  }
</style>