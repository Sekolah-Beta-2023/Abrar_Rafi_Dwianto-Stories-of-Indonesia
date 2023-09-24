<template>
    <div class="wraper">
        <div v-if="controllPanel" id="cntrlWrap" @click="cpanel">
            <div class="controllPanel rounded shadow">
                <h1 class="heading1 mb-3" @click="adding('h1', 'Heading 1')">Heading 1</h1>
                <h2 class="heading2 mb-3" @click="adding('h2', 'Heading 2')">Heading 2</h2>
                <h3 class="heading3 mb-3" @click="adding('h3', 'Heading 3')">Heading 3</h3>
                <p class="paragraph mb-3" @click="adding('p', 'Paragraph')">Paragraph</p>
                <img src="" alt="image" class="image">
            </div>
        </div>
        <NavbarTemplate :islogin="islogin" :profilePhoto="user.image" :profileName="user.name" :class="islogin? 'lgnn' : ''"/>
        <main :style="{height: islogin? 'calc(100% - (3rem + 12px + 4vh))' : 'calc(100% - (6rem + 20px + 5vh))', padding: islogin? '':'0% 15%'}">
            <SidebarTemplate :profilePhoto="user.image" :profileName="user.name" :class="islogin? 'lgns' : ''" v-if="islogin" />
            <section class="main container-fluid">
                <div>
                    <div class="appearance container-fluid rounded shadow">
                        <div class="cover rounded-2">
                            <label for="cvr" class="cover rounded">
                                <input :style="{display:'none',}" 
                                type="file" name="img" id="cvr" value="Cover" accept="image/png, image/jpeg, image/jpg, image/svg" 
                                @change="bindcvr"><img :src="form.cover? cimg : require('~/src/img/transparent.png')" alt="cover" 
                                :style="{width:'100%', height:'100%', objectFit: 'cover'}" class="rounded">
                            </label>
                        </div>
                        <div class="description container-fluid">
                            <div class="wrap">
                                <input type="text" placeholder="Title" class="h1" v-bind="form.title">
                                <input type="text" placeholder="Description" class="p" v-bind="form.description">
                            </div>
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                                    categories
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><div @click="dropadd" class="dropdown-item"><input type="checkbox" name="Folk Lore" id="Folk"><label for="Folk">Folk Lore</label></div></li>
                                    <li><div @click="dropadd" class="dropdown-item"><input type="checkbox" name="Horror" id="Horror"><label for="Horror">Horror</label></div></li>
                                    <li><div @click="dropadd" class="dropdown-item"><input type="checkbox" name="History" id="History"><label for="History">History</label></div></li>
                                    <li><div @click="dropadd" class="dropdown-item"><input type="checkbox" name="Legend" id="Legend"><label for="Legend">Legend</label></div></li>
                                    <li><div @click="dropadd" class="dropdown-item"><input type="checkbox" name="Myth" id="Myth"><label for="Myth">Myth</label></div></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div id="wrapcntn" class="rounded shadow mt-4">
                        <div class="content">

                        </div>
                        <p class="controller rounded-2 container-fluid" @click="cpanel">add format</p>
                        <button type="button" class="btn btn-primary" @click.prevent="bind">Save & Publish</button>
                    </div>
                </div>
            </section>
        </main>
        <FooterTemplate />
    </div>
</template>
<script>
    import FooterTemplate from '~/components/FooterTemplate.vue'
    import NavbarTemplate from '~/components/NavbarTemplate.vue'
    import SidebarTemplate from '~/components/SidebarTemplate.vue'

    export default {
        components:{
            NavbarTemplate,
            FooterTemplate,
            SidebarTemplate,
        },
        data() {
            return {
                controllPanel: false,
                islogin: false,
                form: {
                    'cover': '',
                    'title': '',
                    'description': '',
                    'categories': [],
                    'content': '',
                    'author': '',
                    'bookId': '',
                },
                user:{
                    name: 'Abrar Rafi',
                    image: require('@/src/img/bedawang.jpg')
                },
                cimg:'',
            }
        },
        mounted() {

        },
        computed:{
            
        },
        methods:{
            cpanel(){
                this.controllPanel = !this.controllPanel;
            },
            adding(elm, name) {
                const cntn = document.querySelector('.content');
                const node = document.createElement(elm);
                node.setAttribute("contenteditable", true);
                node.setAttribute('placeholder', name);
                node.addEventListener('keydown', e =>{
                    if(node.innerHTML === '' &&  e.key === 'Backspace'){
                        node.remove();
                    }
                })
                cntn.appendChild(node);
            },
            // binding to form data
            // bindTitle(e){
            //     this.form.title = e.target.innerText;
            // },
            // bindDesc(e){
            //     this.form.description = e.target.innerText;
            // },
            bindcvr(e){
                this.cimg = URL.createObjectURL(e.target.files[0]);
                this.form.cover = e.target.files[0].name;
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
            bind(){
                this.form.content = document.querySelector('.content').innerHTML;
                console.log(this.form);
            },
        }
    }
</script>
<style>
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
    label.cover::after{
        content: "set cover";
        position: absolute;
        color: #00000066;
        z-index: 999;
        font-size: 0.8rem;
    }

    [contenteditable]:empty::before{
        content: attr(placeholder);
        display: block;
        height: 100%;
        color: #00000066;
    }
    [contenteditable]{
        outline: none;
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
    .appearance{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        background-color: whitesmoke;
        padding: 0%;
    }
    .description{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width:100%;
        margin-right: auto;
        padding: 0%;
    }
    .description .h1, .description .p{
        width: 100%;
        border: none;
        background: none;
        outline: none;
    }
    .description .p{
        height: 1.5rem;
        overflow: auto;
    }
    label.cover{
        border: 0.3vw solid rgb(189, 189, 189);
        width: calc(4rem + 1.5vw);
        margin: 0%;
    }
    .dropdown-item label{
        color: black;
    }
    .wrap{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        margin: 0% 2%;
    }


    .controller{
        width: 100%;
        color: #00000066;
        font-weight: 500;
        border-bottom: 1px solid #00000066;
    }
    #cntrlWrap{
        width: 100vw;
        height: 100vh;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0%;
        padding: 0%;
        box-sizing: border-box;
    }
    .controllPanel{
        width: 40vw;
        z-index: 999;
        background-color: whitesmoke;
        padding: 5%;
        margin: 0%;
    }

    #wrapcntn{
        width: 100%;
        height: auto;
        background-color: whitesmoke;
        padding: 5%;
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

        .controllPanel{
            width: 70vw;
        }
    }
</style>
