<template>
    <div class="wraper">
        <LoadingTemplate v-if="!islogin || loading"/>
        <NavbarTemplate :user="user" :islogin="islogin" :class="islogin? 'lgnn' : ''"/>
        <main :style="{height: islogin? 'calc(100% - (3rem + 12px + 4vh))' : 'calc(100% - (6rem + 20px + 5vh))', padding: islogin? '':'0% 15%'}">
            <SidebarTemplate :user="user" :class="islogin? 'lgns' : ''" v-if="islogin" />
            <section class="main container-fluid">
                <div>
                    <div id="wrapcntn" :class="islogin? 'rounded shadow' : 'rounded shadow mt-4'">
                        <div class="content">
                            <div>
                                <img id="profilePhoto" class="rounded-circle shadow mb-4" :src="`https://wytinjsgermcnjpcupns.supabase.co/storage/v1/object/public/storiesoi/${user.id}/profile/${user.image}`" alt="">
                                <H1 id="name" class="mb-4">{{ form.username }}</H1>
                                <p id="bio">{{ form.bio }}</p>
                            </div>
                        </div>
                    </div>
                    <section class="action">
                        <nuxt-link :class="'btn btn-primary mt-3'" to="/profile/edit" >edit</nuxt-link>
                    </section>
                </div>
            </section>
        </main>
        <FooterTemplate />
    </div>
</template>
<script>
    import FooterTemplate from '~/components/FooterTemplate.vue'
    import LoadingTemplate from '~/components/LoadingTemplate.vue'
    import NavbarTemplate from '~/components/NavbarTemplate.vue'
    import SidebarTemplate from '~/components/SidebarTemplate.vue'

    export default {
        components:{
            NavbarTemplate,
            FooterTemplate,
            SidebarTemplate,
            LoadingTemplate,

        },
        data() {
            return {
                islogin: this.$store.state.userControl.islogin,
                user: this.$store.state.userControl.user,
                loading: false,
                form:{
                    username: '',
                    image: '',
                    bio: '',
                },
                img: '',
            }
        },
        async beforeMount(){
            if (this.islogin === false){
                if( await this.$store.dispatch('userControl/checkIsLogin') ){
                    this.islogin = true;
                    this.user = this.$store.state.userControl.user;
                    // this.$router.push('/profile')
                }else{
                    this.$router.push('/logIn');
                }
            }

            this.form.username = this.user.name;
            this.form.bio = this.user.bio;
        },
        mounted() {

        },
        computed:{
            
        },
        methods:{

        }
    }
</script>
<style scooped>

    body{
        background-color: rgb(226, 223, 223);
    }
    .lgns{
        display: flex !important;
    }
    .lgnn{
        display: none !important;
    }
    .wraper{
        width: 100vw;
        height: 100vh;
        align-items: stretch;
        justify-content: stretch;
        overflow: hidden;
    }
    main{
        width: 96%;
        display: flex;
        flex-direction: row;
        margin: 2vh 2vw;
        align-items: stretch;
        justify-content: stretch;
        overflow: auto;
    }
    section.main{
        width: 100%;
        height: fit-content;
        margin-bottom: auto;
    }
    .dropdown{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-right: 2%;
    }
    .dropdown-item{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
    label{
        display: flex;
        justify-content: center;
        align-items: center;
        color: #00000066;
        font-weight: 500;
    }

    #wrapcntn{
        width: 100%;
        height: auto;
        background-color: whitesmoke;
        padding: 5%;
    }
    #profilePhoto{
        margin-right: 0%;
        width: 20vw;
        height: 20vw;
        object-fit: cover;
    }
    .content{
        padding: 2%;
        width: 100%;
        height: auto;
        text-align: center;
    }
    .content div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .content input{
        width: 100%;
        text-align: center;
        background-color: whitesmoke;
        outline: none;
        border: none;
    }

    @media only screen and (max-width: 950px){
        .lgns{
            display: none !important;
        }
        .lgnn{
            display: block !important;
        }
        main{
            height: calc(100% - (6rem + 20px + 5vh)) !important;
            
        }
    }

    @media only screen and (max-width: 768px){
        main{
            padding: 0% !important;
        }
    }

    @media only screen and (max-width: 425px){
        .btn{
            font-size: 0.7rem;
        }
        h1, .h1{
            font-size: calc(1rem + 1.5vw);
        }

        p, .p{
            font-size: 12px;
        }
        h2, .h2{
            font-size: calc(0.95rem + 0.9vw);
        }
        h3, .h3{
            font-size: calc(0.9rem + 0.6vw);
        }
    }
</style>
