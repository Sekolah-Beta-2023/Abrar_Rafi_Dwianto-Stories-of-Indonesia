<template>
    <!-- form input add story -->
    <div id="start">
        <NavbarTemplate :islogin="islogin" :profilePhoto="user.image" :profileName="user.name" :class="islogin ? 'lgn1' : '' "/>
        <div class="mainwrap" :style="{height: islogin? 'calc(97% - (2rem + 5px))' : 'calc(100% - (6rem + 20px + 1vh))'}">
            <SidebarTemplate :profilePhoto="user.image" :profileName="user.name" :class="islogin ? 'lgn2' : '' " v-if="islogin" />
            <div class="main">
                <div class="box container-fluid">
                    <div class="dropdown filter">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                            Filter categories
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><div class="dropdown-item"><input @click="dropfltr" type="checkbox" name="All" id="All" :checked="all"><label for="All">All</label></div></li>
                            <li><div class="dropdown-item"><input @click="dropfltr" type="checkbox" name="Folk Lore" id="Folk" checked><label for="Folk">Folk Lore</label></div></li>
                            <li><div class="dropdown-item"><input @click="dropfltr" type="checkbox" name="Horror" id="Horror" checked><label for="Horror">Horror</label></div></li>
                            <li><div class="dropdown-item"><input @click="dropfltr" type="checkbox" name="History" id="History" checked><label for="History">History</label></div></li>
                            <li><div class="dropdown-item"><input @click="dropfltr" type="checkbox" name="Legend" id="Legend" checked><label for="Legend">Legend</label></div></li>
                            <li><div class="dropdown-item"><input @click="dropfltr" type="checkbox" name="Myth" id="Myth" checked><label for="Myth">Myth</label></div></li>
                        </ul>
                    </div>
                    <form class="d-flex search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    </form>
                </div>
                <div class="content row row-cols-auto g-4" :style="{padding: islogin ? '0px 4%': ''}">
                    <nuxt-link v-for="(dt,id) in show" :key="id" class="col"  :to="`read/${dt.id}`">
                        <div class="card shadow" :style="{width: 'calc(8rem + 6vw)', height:'100%'}">
                            <div class="wrap" style="height: 45%; width: 100%; overflow: hidden; margin: 0%;">
                                <img :src="dt.cover" width="200" height="110" class="card-img-top" alt="img" :style="{objectFit: 'cover'}">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">{{ dt.title }}</h5>
                                <p class="card-text categories"><small class="text-muted">{{ dt.categories.join(', ') }}</small></p>
                                <p class="card-text preview">{{ dt.description.slice(0,75)}}...</p>
                                <p class="card-text"><small class="text-muted">By {{ dt.author }}</small></p>
                            </div>
                        </div>
                    </nuxt-link>
                    <nuxt-link class="col" to="/write">
                        <div class="add card shadow" :style="{width: 'calc(8rem + 6vw)', height:'100%'}">
                            <h1>+</h1>
                        </div>
                    </nuxt-link>
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
        data(){
            return{
                db: '',
                show: this.db,
                filter: ['Folk Lore', 'Horror', 'History', 'Legend', 'Myth'],
                all: true,
                addcomp: false,
                islogin: true,
                form: {
                    'cover':'',
                    'title':'',
                    'content':'',
                    'author':'',
                    'categories':[]
                },
                user: this.$store.state.apiControl.user,
            }
        },
        components: {
            NavbarTemplate,
            FooterTemplate,
            SidebarTemplate,
        },
        async fetch(){
            console.log(this.user.nam);
            await this.$axios.get(`/rest/v1/stories?author=eq.${this.user.name}&select=*`,{
                'headers': {
                    'apikey': this.user.token,
                }
            }).then(ress=>{
                this.db = ress.data;
                this.show = this.db;
            });
        },
        mounted(){

        },
        methods:{
            addstory(){
                const setUp = {
                    'cover': this.form.cover,
                    'title': this.form.title,
                    'content': this.form.content,
                    'author': this.form.author,
                    'categories': this.form.categories,
                }
                this.db.push(setUp);
                this.addcomp = !this.addcomp;
            },
            dropfltr(e){
                const checkbox = document.querySelector('.filter').querySelectorAll('.dropdown-item');
                const name = e.target.name;
                if (name === 'All'){
                    this.all = true;
                    checkbox.forEach(c =>{
                        c.getElementsByTagName('input')[0].checked = true;
                    });
                    this.filter = ['Folk Lore', 'Horror', 'History', 'Legend', 'Myth',];
                    this.show = this.db;
                    return;
                }
                else if (this.filter.includes(name)){
                    this.all = false;
                    this.filter = this.filter.filter(itm =>{
                        return itm !== name;
                    });
                }
                else{
                    this.filter.push(name);
                }
                this.show = this.filterCategories;
            },
            dropadd(e){
                const name = e.target.name;
                if (this.form.categories.includes(name)){
                    this.form.categories = this.form.categories.filter(itm =>{
                        return itm !== name;
                    });
                }
                else{
                    this.form.categories.push(name);
                }

            },
            filebind(e){
                this.form.cover = URL.createObjectURL(e.target.files[0]);
            },
        },
        computed: {
            filterCategories(){
                const show = [];
                this.db.forEach(dt => {
                    if(dt.categories.some(ca => this.filter.includes(ca))){
                        show.push(dt);
                    }
                });
                return show;
            },
        },
    }
</script>
<style>
    body{
        background-color: rgb(226, 223, 223);
    }
    @font-face {
        font-family: 'boutiques of merauke';
        src: url("~/static/font/boutiques-of-merauke-font/BoutiquesOfMerauke.ttf");
    }
    #start{
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: stretch;
    }
    .mainwrap{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: stretch;
        width: 100%;
        padding: 2% 3%;
    }
    .main{
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
    .content.row{
        box-sizing: border-box;
        margin: 20px 0px 0px 0px;
        padding: 0px 4%;
        max-height: fit-content;
        margin-bottom: auto;
        justify-content: center;
        background-color: rgb(226, 223, 223);
        position: relative;
        overflow-y: auto;
    }
    .content.row h1{
        font-size: calc(1.375rem + 6vw);
    }
    .col{
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 15px 0px;
        text-align: center;
        text-decoration: none;
    }
    .card-title{
        font-size: calc(0.45rem + 1vw);
        margin-bottom: 0%;
    }
    .card-text{
        font-size: calc(0.2rem + 0.7vw);
        text-align: left;
        margin-bottom: 4%;
    }
    .preview{
        text-align: center;
    }
    .card-body{
        height: min-content;
    }
    .box{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0% 5%;
    }
    .dropdown-item{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin: 0%;
    }
    p.categories{
        text-align: center;
        margin-bottom: 0%;
    }
    label{
        width: 100%;
        margin-left: 4%;
    }
    .add.card{
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .lgn1{
        display: none !important;
    }
    .lgn2{
        display: flex !important;
    }
    @media only screen and (max-width: 950px){
        .content.row{
            padding: 0px 8%;
            width: 100%;
            height: fit-content;
        }
        .mainwrap{
            height: calc(100% - (6rem + 20px + 1vh)) !important;
        }
        .lgn1{
            display: block !important;
        }
        .lgn2{
            display: none !important;
        }
    }
    @media only screen and (max-width: 440px){
        .card{
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            width: 100% !important;
        }
        .box{
            margin-bottom: 3%;
        }
        .content.row{
            padding: 0px;
            margin: 0%;
            margin-bottom: auto;
        }
        .wrap{
            min-width: 80px;
            width: 30% !important;
            height: 100% !important ;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .card-body{
            width: 100% !important;
            overflow: hidden;
            position: relative;
        }
        img.card-img-top{
            border-radius: var(--bs-card-inner-border-radius);
        }
        h5.card-title{
            width: 100%;
            text-align: left;
            font-size: 14px;
            margin-bottom: 0%;
        }
        p.card-text{
            width: 100%;
            font-size: 9px;
        }
        .preview{
            text-align: left;
            height: auto;
            max-height: 27px;
            overflow: hidden;
        }
        .col{
            margin: 8px 0px;
        }
        p.categories{
            text-align: left;
            margin: 0%;
        }
        .add.card h1{
            width: 96vw;
        }
    }
</style>
