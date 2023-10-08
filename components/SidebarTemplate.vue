<template>
    <div class="wrapper rounded sd shadow">
        <div>
            <h1>stories of indonesia</h1>
            <ul class="nav nav-pills flex-column mb-auto">
                <li :class="this.$route.path === '/explore' ? 'nav-item mb-2 rounded active':'nav-item mb-2 rounded'">
                    <nuxt-link class="bi bi-search" to="/explore">Explore</nuxt-link>
                </li>
                <li :class="this.$route.path === '/myStories' ? 'nav-item mb-2 rounded active':'nav-item mb-2 rounded'">
                    <nuxt-link class="bi bi-book" to="/myStories">My Stories</nuxt-link>
                </li>
                <li :class="this.$route.path === '/myProfile' ? 'nav-item mb-2 rounded active':'nav-item mb-2 rounded'">
                    <nuxt-link class="bi bi-person-fill" to="/profile">My Profile</nuxt-link>
                </li>
            </ul>
        </div>
        <div class="profile">
            <img :src="`https://wytinjsgermcnjpcupns.supabase.co/storage/v1/object/public/storiesoi/${user.id}/profile/${user.image}`" alt="" class="rounded-circle">
            <h6>{{ user.name }}</h6>
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
            user: Object,
        }
    }
</script>
<style scoped>
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