<template>
    <div class="wrapper rounded sd">
        <div>
            <h1>stories of indonesia</h1>
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item mb-2 rounded active">
                    <a class="bi bi-search" href="/explore">Explore</a>
                </li>
                <li class="nav-item mb-2 rounded">
                    <a class="bi bi-book" href="/mystories">My Stories</a>
                </li>
                <li class="nav-item mb-2 rounded">
                    <a class="bi bi-person-fill" href="/profile">My Profile</a>
                </li>
            </ul>
        </div>
        <div class="profile">
            <img :src="profilePhoto" alt="" class="rounded-circle">
            <h6>{{ profileName }}</h6>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
            }
        },
        props:{
            profilePhoto: String,
            profileName: String,
        }
    }
</script>
<style>
    @font-face {
        font-family: 'boutiques of merauke';
        src: url("@/static/font/boutiques-of-merauke-font/BoutiquesOfMerauke.ttf");
    } 
    .wrapper.rounded{
        min-width: 250px;
        width: 30vw;
        height: 100%;
        background-color: whitesmoke;
        display: none;
        flex-direction: column;
        justify-content: space-between;
        padding: 2%;
    }
    .wrapper.sd h1{
        width: 100%;
        font-family: 'boutiques of merauke' !important;
        font-size: 35px;
        font-weight: 300;
        border-bottom: 1px solid #00000066;
    }
    .sd ul a{
        color: black;
        font-size: 1.1rem;
        font-weight: 500;
        text-decoration: none;
        width: 100%;
    }
    .sd ul a::before{
        margin-right: 3%;
    }
    .sd ul li{
        width: 100%;
        height: fit-content;
        padding: 0% 4%;
    }
    .sd ul li.active{
        background-color: rgb(185, 185, 185);
    }
    .sd .profile{
        display: flex;
        flex-direction: row;
        align-items: center;
        border-top: 1px solid #00000066;
        padding-top: 3%;
    }
    img.rounded-circle{
        width: 2.5rem;
        height: 2.5rem;
        border: 1px solid #00000066;
        margin-right: 3%;
    }
</style>