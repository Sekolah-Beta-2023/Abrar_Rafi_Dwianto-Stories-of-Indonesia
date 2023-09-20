<template>
    <div>
        <div v-if="controllPanel" id="cntrlWrap" @click="cpanel">
            <div class="controllPanel rounded shadow">
                <h1 class="heading1 mb-3" @click="adding('h1')">Heading 1</h1>
                <h2 class="heading2 mb-3" @click="adding('h2')">Heading 2</h2>
                <h3 class="heading3 mb-3" @click="adding('h3')">Heading 3</h3>
                <p class="paragraph mb-3" @click="adding('p')">Paragraph</p>
                <img src="" alt="image" class="image">
            </div>
        </div>
        <NavbarTemplate />
        <section class="main container-fluid mt-3">
            <div class="appearance container-fluid rounded shadow">
                <div class="cover rounded-2">
                    <label for="cvr" class="cover rounded"><input :style="{display:'none',}" type="file" name="img" id="cvr" value="Cover" accept="image/png, image/jpeg, image/jpg, image/svg" @change="bindcvr"><img :src="form.cover? cimg : require('~/src/img/transparent.png')" alt="cover" :style="{width:'100%', height:'100%', objectFit: 'cover'}" class="rounded"></label>
                </div>
                <div class="description container-fluid">
                    <div class="wrap">
                        <h1 @input="bindTitle" contenteditable="true" placeholder="Title" autofocus></h1>
                        <p @input="bindDesc" contenteditable="true" placeholder="Description"></p>
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
        </section>
        <FooterTemplate :style="{marginTop: '3%',}"/>
    </div>
</template>
<script>
    import FooterTemplate from '~/components/FooterTemplate.vue'
    import NavbarTemplate from '~/components/NavbarTemplate.vue'

    export default {
        components:{
            NavbarTemplate,
            FooterTemplate,
        },
        data() {
            return {
                controllPanel: false,
                form: {
                    'cover': '',
                    'title': '',
                    'description': '',
                    'categories': [],
                    'content': '',
                    'author': '',
                    'bookId': '',
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
            adding(elm) {
                const cntn = document.querySelector('.content');
                const node = document.createElement(elm);
                node.setAttribute("contenteditable", true);
                node.setAttribute('placeholder', elm);
                cntn.appendChild(node);
            },
            // binding to form data
            bindTitle(e){
                this.form.title = e.target.innerText;
            },
            bindDesc(e){
                this.form.description = e.target.innerText;
            },
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
    [contenteditable]:empty::before{
        content: attr(placeholder);
        display: block;
        height: 100%;
        color: #00000066;
    }
    [contenteditable]{
        outline: none;
    }
    .main{
        width: 100%;
        min-height: 85vh;
    }
    .dropdown{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-left: 5%;
    }
    .dropdown-item{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
    label{
        width: 100%;
        margin-left: 4%;
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
        padding: 0%;
        background-color: whitesmoke;
    }
    .description{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width:85vw;
        padding: 0%;
    }
    .description h1, .description p{
        width: 100%;
        overflow: hidden;
    }
    .cover{
        width: 10vw;
        height: 10vw;
    }
    label.cover{
        border: 0.3vw solid rgb(189, 189, 189);
        width: 10vw;
        height: 10vw;
        margin: 0%;
    }
    .dropdown-item label{
        color: black;
    }
    .wrap{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 70%;
    }


    .controller{
        /* 
        height: 15vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 0.3vw solid rgb(189, 189, 189);
        font-size: 10vw; */
        width: 100%;
        color: #00000066;
        font-weight: 500;
        border-bottom: 1px solid #00000066;
        /* padding: 0%; */
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
</style>
