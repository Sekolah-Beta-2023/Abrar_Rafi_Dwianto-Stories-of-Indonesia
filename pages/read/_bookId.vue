<template>
    <div class="wraper">
        <loadingTemplate v-if="loading"/>
        <NavbarTemplate :user="user" :islogin="islogin" :class="islogin? 'lgnn' : ''"/>
        <main :style="{height: islogin? 'calc(100% - (3rem + 12px + 4vh))' : 'calc(100% - (6rem + 20px + 5vh))', padding: islogin? '':'0% 15%'}">
            <SidebarTemplate :user="user" :class="islogin? 'lgns' : ''" v-if="islogin" />
            <section class="main container-fluid">
                <div>
                    <div id="wrapcntn" :class="islogin? 'rounded shadow' : 'rounded shadow mt-4'">
                        <div class="content">
                        </div>
                    </div>
                    <section class="action" v-if="book.author_Id === user.id">
                        <nuxt-link :to="`/edit/${this.$route.params.bookId}`" :class="'btn btn-primary mt-3'">edit</nuxt-link>
                        <button :class="'btn btn-danger mt-3'" @click="del">delete</button>
                    </section>
                    <ComentTemplate class="mt-5" :islogin="islogin" :user="user" :stories="`${this.$route.params.bookId}`" />
                </div>
            </section>
        </main>
        <FooterTemplate />
    </div>
</template>
<script>
    import ComentTemplate from '~/components/ComentTemplate.vue'
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
            ComentTemplate,
        },
        data() {
            return {
                controllPanel: false,
                islogin: this.$store.state.userControl.islogin,
                book: {},
                user: this.$store.state.userControl.user,
                cimg:'',
                cvrLink:'',
                delFiles:[],
                loading: false,
            }
        },
        async fetch(){
            try {
                await this.$axios.get(`/rest/v1/stories?id=eq.${this.$route.params.bookId}&select=*`,{
                    'headers':{
                        'apikey': this.user.token,
                        'Authorization': `Bearer ${this.user.userToken}`,
                    }
                }).then(res=>{
                    this.book = res.data[0];
                    this.preparingDel();
                });
            } catch (error) {
                console.log(error.message);
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
        mounted() {

        },
        computed:{
            
        },
        methods:{
            preparingDel(){
                // set content
                const cntn = document.querySelector('.content');
                cntn.innerHTML = this.book.content;
                this.cvrLink = this.book.cover;
                this.cvrLink = this.cvrLink.split('/');
                this.cvrLink = this.cvrLink.slice(-1)[0];
                
                cntn.querySelectorAll('div.cimg').forEach((itm)=>{
                    this.delFiles.push(itm.querySelector('.cntnImg').alt);
                });
            },
            async del(){
                this.loading = true;
                let complete = 0;
                // delete rows
                try {
                    await this.$axios.delete(`/rest/v1/stories?id=eq.${this.$route.params.bookId}`,{
                        'headers':{
                            'apikey': `${this.user.token}`,
                            'Authorization': `Bearer ${this.user.userToken}`,
                        },
                    });
                } catch (error) {
                    console.log(error.message);
                }
                // cover
                if (this.cvrLink !== ''){
                    try {
                        await this.$axios.delete(`/storage/v1/object/storiesoi/${this.user.id}/stories/${this.cvrLink}`, {
                            'headers':{
                                'Authorization': `Bearer ${this.user.userToken}`,
                            },
                        });
                    } catch (error) {
                        console.log(error.message);
                    }
                }
                // delete files cntn
                if (this.delFiles.length > 0) {
                    this.delFiles.forEach(async (itm)=>{
                        try {
                            await this.$axios.delete(`/storage/v1/object/storiesoi/${this.user.id}/content/${itm}`, {
                                'headers':{
                                    'Authorization': `Bearer ${this.user.userToken}`,
                                },
                            }).then(()=>{
                                complete++;
                                if (complete === this.delFiles.length){
                                    this.$router.push('/explore');
                                }
                            });
                        } catch (error) {
                            console.log(error.message);
                        }
                    });
                } else {
                    this.$router.push('/explore');
                }
                
                
            }
        }
    }
</script>
<style scoped>

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
    .content{
        text-align: center;
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
