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
            <div class="offcanvas-header">
              <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-2">
                <li class="nav-item h" >
                  <a :class="this.$route.path === '/' ? 'nav-link active':'nav-link'" aria-current="page" href=".">Home</a>
                </li>
                <li class="nav-item a">
                  <a :class="this.$route.path === '/about' ? 'nav-link active':'nav-link'" href="/about">About</a>
                </li>
                <li class="nav-item e">
                  <a :class="this.$route.path === '/explore' ? 'nav-link active':'nav-link'" href="/explore" class="nav-link">Explore</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
</template>

<script>
</script>
<style>
  @font-face {
      font-family: 'boutiques of merauke';
      src: url("@/src/font/boutiques-of-merauke-font/BoutiquesOfMerauke.ttf");
  }
  .navbar{
      border-bottom: 2px solid rgba(245, 245, 245, 0.116);
      height: calc((25px + 1rem) *2);
  }
  .navbar .container-fluid{
      margin-top: 1%;
      width: 98%;
      height: 90%;
      border-radius: 10px;
  }
  .navbar .container-fluid button.navbar-toggler{
      border: none !important;
  }
  .navbar .container-fluid .navbar-brand{
      font-family: "boutiques of merauke";
      font-size: 25px;
  }
  .offcanvas-backdrop{
      display: none !important;
  }
</style>