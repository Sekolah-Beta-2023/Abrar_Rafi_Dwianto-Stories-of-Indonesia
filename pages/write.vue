<template>
    <div class="wraper" >
        <loadingTemplate v-if="!islogin || loading"/>
        <div v-if="controllPanel" id="cntrlWrap" @click="cpanel">
            <div class="controllPanel rounded shadow">
                <h1 class="heading1 mb-3" @click="adding('h1', 'Heading 1')">Heading 1</h1>
                <h2 class="heading2 mb-3" @click="adding('h2', 'Heading 2')">Heading 2</h2>
                <h3 class="heading3 mb-3" @click="adding('h3', 'Heading 3')">Heading 3</h3>
                <p class="paragraph mb-3" @click="adding('p', 'Paragraph')">Paragraph</p>
                <p class="paragraph mb-3" @click="adding('img', 'image')"> image </p>
            </div>
        </div>
        <NavbarTemplate :user="user" :islogin="islogin" :class="islogin? 'lgnn' : ''"/>
        <main :style="{height: islogin? 'calc(100% - (3rem + 12px + 4vh))' : 'calc(100% - (6rem + 20px + 5vh))', padding: islogin? '':'0% 15%'}">
            <SidebarTemplate :user="user" :class="islogin? 'lgns' : ''" v-if="islogin" />
            <section class="main container-fluid">
                <div>
                    <div class="appearance container-fluid rounded shadow">
                        <div class="cover rounded-2">
                            <label for="cvr" class="cover rounded">
                                <input :style="{display:'none',}" 
                                type="file" name="img" id="cvr" value="Cover" accept="image/png, image/jpeg, image/jpg, image/svg" 
                                @change="bindcvr"><img :src="form.cover? cimg : require('@/static/img/transparent.png')" alt="cover" 
                                :style="{width:'100%', height:'100%', objectFit: 'cover'}" class="rounded">
                            </label>
                        </div>
                        <div class="description container-fluid">
                            <div class="wrap">
                                <input type="text" placeholder="Title" class="h2" v-model="form.title">
                                <input type="text" placeholder="Description" class="p" v-model="form.description">
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
                    <div class="cntnImgSetter" :style="{display: 'none'}">
                        <label for="cntnCvr" class="rounded shadow"></label>
                        <input type="file" name="img" id="cntnCvr" value="Cover" accept="image/png, image/jpeg, image/jpg, image/svg" class="rounded" @change="cntnImgSetter">
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
    import { nanoid } from "nanoid"
    import FooterTemplate from '~/components/FooterTemplate.vue'
    import NavbarTemplate from '~/components/NavbarTemplate.vue'
    import SidebarTemplate from '~/components/SidebarTemplate.vue'
    import LoadingTemplate from '~/components/LoadingTemplate.vue'

    export default {
        components:{
            NavbarTemplate,
            FooterTemplate,
            SidebarTemplate,
            LoadingTemplate,
        },
        data() {
            return {
                controllPanel: false,
                islogin: this.$store.state.userControl.islogin,
                form: {
                    'cover': '',
                    'title': '',
                    'description': '',
                    'categories': [],
                    'content': '',
                    'author': '',
                    'cvrFile': '',
                    'files': [],
                },
                user: this.$store.state.userControl.user,
                cimg: '',
                target: '',
                loading: false,
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
        },
        computed:{
            
        },
        methods:{
            cpanel(){
                this.controllPanel = !this.controllPanel;
            },
            adding(elm, name) {
                const cntn = document.querySelector('.content');
                let node;
                if(name !== "image"){
                    node = document.createElement(elm);
                    node.setAttribute("contenteditable", true);
                    node.setAttribute('placeholder', name);
                    node.addEventListener('keydown', (e) =>{
                        if(e.key === 'Backspace' && node.innerText === ''){
                            if(node.previousElementSibling){
                                node.previousElementSibling.focus();
                            }
                            node.remove();
                        }
                    });
                } else{
                    node = document.createElement('div');
                    node.setAttribute('class', 'cimg non rounded');
                    node.innerHTML = `<img src="" alt="" class="cntnImg rounded">
                                    <button class="cImgBtn btn btn-md rounded-circle bi bi-x-circle"></button>`;
                    node.querySelector('button').addEventListener('click',this.cntnImgDel);
                    node.addEventListener('click', this.setUp);
                    node.querySelector('img').src = require('@/static/img/transparent.png');
                }
                cntn.appendChild(node);
                node.focus();
            },
            setUp(e){
                const setter = document.querySelector('.cntnImgSetter').querySelector('label');
                this.target = e.target.tagName === 'IMG'? e.target : e.target.querySelector('img');
                if (e.target.tagName !== 'BUTTON'){
                    setter.click();
                }
            },
            cntnImgSetter(e){
                let file; 
                if(e.target.files.length >0){
                    file = new File([e.target.files[0]], nanoid(12), {type: e.target.files[0].type});
                    this.form.files.forEach((f,i) => {
                        if (f.name === this.target.alt){
                            this.form.files.splice(i,1);
                        }
                    });
                    this.target.src = URL.createObjectURL(file);
                    this.target.alt = file.name;
                    this.target.parentElement.setAttribute('class', 'cimg rounded');

                    document.querySelector('img::after');
                    this.form.files.push([file,this.target]);
                }
            },
            cntnImgDel(e){
                const name = e.target.previousElementSibling;
                this.form.files.forEach((f,i) => {
                    if (f[1] === name){
                        this.form.files.splice(i,1);
                    }
                });
                e.target.parentElement.remove();
            },

            bindcvr(e){
                if (e.target.files.length > 0){
                    const file = new File([e.target.files[0]], nanoid(12), {type: e.target.files[0].type});
                    this.form.cover = file.name;
                    this.form.cvrFile = file;
                    this.cimg = URL.createObjectURL(file);
                }
            },
            dropadd(e){
                const name = e.target.name;
                if (this.form.categories.includes(name, undefined)){
                    this.form.categories = this.form.categories.filter(itm =>{
                        return itm !== name;
                    });
                }
                else{
                    this.form.categories.push(name);
                }
            },
            bind(){
                this.loading = true;
                const content = document.querySelector('.content');
                let value;
                
                value = content.querySelectorAll("[contenteditable]");
                value.forEach(element => {
                    element.removeAttribute('contenteditable');
                });
                
                value = content.querySelectorAll('.cimg .cntnImg');
                value.forEach(element => {
                    console.log(element);
                    element.nextElementSibling.remove();
                    element.removeAttribute('on-click');
                    element.src = `https://wytinjsgermcnjpcupns.supabase.co/storage/v1/object/public/storiesoi/${this.user.id}/content/${element.alt}`;
                });
                
                this.form.cover = `https://wytinjsgermcnjpcupns.supabase.co/storage/v1/object/public/storiesoi/${this.user.id}/stories/${this.form.cover}`;
                this.form.content = document.querySelector('.content').innerHTML;
                this.form.author = this.user.name;
                console.log(this.form);
                this.storeData();
                
            },
            async storeData(){
                // store text data
                try {
                    await this.$axios.post('/rest/v1/stories',{
                        'cover': this.form.cover,
                        'title': this.form.title,
                        'description': this.form.description,
                        'categories': this.form.categories,
                        'content': this.form.content,
                        'author': this.form.author,
                        'author_Id': this.user.id,
                    },{
                        'headers':{
                            'apikey': this.user.token,
                            "Authorization": `Bearer ${this.user.userToken}`,
                        }
                    })
                } catch (error) {
                    console.log(error);
                }

                // store file
                let file = new FormData();
                try {
                    // cover
                    if (this.form.cvrFile !== ''){
                        file.append('file', this.form.cvrFile);
                        await this.$axios.post(`/storage/v1/object/storiesoi/${this.user.id}/stories/${this.form.cvrFile.name}`, file, {
                            'headers':{
                                'Authorization': `Bearer ${this.user.userToken}`,
                            }
                        });
                    }
                }
                catch(err){
                    console.log('error cover', err);
                }
                // content 
                let complete=0;
                if (this.form.files.length > 0){
                    this.form.files.forEach(async (itm,i)=>{
                        try{
                            file = new FormData();
                            file.append(`file${i}`, itm[0]);
                            itm[1].alt = itm[0].name;
                            await this.$axios.post(`/storage/v1/object/storiesoi/${this.user.id}/content/${itm[0].name}`, file, {
                                'headers':{
                                    'Authorization': `Bearer ${this.user.userToken}`,
                                }
                            }).then(()=>{
                                complete++;
                                if (complete === this.form.files.length){
                                    this.$router.push('/explore');
                                }
                            });
                        }catch (error) {
                            console.log('error content',error);
                        }
                    });
                }else{
                    this.$router.push('/explore');
                }
                
            },
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
    label.cover::after{
        content: "set cover";
        position: absolute;
        color: #00000066;
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

    /* content image */
    div.cimg{
        width: 100%;
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        margin: 2% 0%;
    }
    div.cimg img{
        width: 40%;
        object-fit: cover;
        height: fit-content;
    }
    div.non::after{
        width: 40%;
        height: 100%;
        content: 'Add your photo';
        border: 2px solid #00000066;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: inherit;
        font-size: 1rem;
        text-align: center;
    }
    .cImgBtn{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: -1rem;
        left: calc(70% - 1rem);
        padding: 0%;
        margin: 0%;
        font-size: 2rem;
        background-color: whitesmoke;
        z-index: 1;
    }

    /* categories dropdown */
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

    /* appearance div*/
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
    .description .h2, .description .p{
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
        position: relative;
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

    /* controler div */
    .controller{
        width: 100%;
        color: #00000066;
        font-weight: 500;
        border-bottom: 1px solid #00000066;
    }
    #cntrlWrap{
        width: 100vw;
        height: 100vh;
        position: absolute;
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

        div.cimg img{
            width: 80%;
        }
        div.non::after{
            width: 80%;
        }
        .cImgBtn{
            font-size: 1.5rem;
            top: -0.75rem;
            left: calc(90% - 0.75rem);
        }
    }
</style>

<!-- {
    "cover": "",
    "title": "Lorem Ipsum",
    "description": "lorem ipsum sit amet dolor constrestus",
    "categories": [],
    "content": "<p placeholder=\"Paragraph\"><div>Lorem ipsum etiam netus at sollicitudin pharetra sed arcu euismod eros, hac velit sem habitant nulla congue sociosqu eget quisque urna, pulvinar proin viverra nostra proin odio donec nunc fringilla. Morbi bibendum venenatis curabitur morbi nullam vulputate nibh enim quisque per, accumsan sem commodo lectus eros porta augue felis nulla, interdum a tempor dictumst felis himenaeos nibh accumsan potenti. Pulvinar primis libero urna varius potenti tortor tempus tristique pharetra, semper vehicula est consectetur mi hac egestas quam facilisis molestie, nulla pulvinar volutpat fusce egestas ac elementum interdum.</div><div><br></div><div>Metus faucibus consequat est commodo mauris potenti commodo odio enim ut sodales semper praesent nunc malesuada interdum, id phasellus nostra quisque elementum nunc proin diam duis litora conubia venenatis morbi aenean arcu. Commodo tempor dolor curae quam ultricies ac porttitor duis praesent bibendum ante augue vivamus posuere vehicula ornare ultrices, nec vel mattis dui fusce a eleifend in donec fermentum conubia condimentum nunc non sit.</div></p>",
    "author": "Abrar Rafi"
} -->

<!-- {
    "cover": "bedawang.jpg",
    "title": "Lorem Ipsum",
    "description": "Lorem ipsum aliquam ante consectetur integer sollicitudin, lobortis leo suspendisse metus convallis.",
    "categories": [
        "Folk Lore",
        "History",
        "Myth"
    ],
    "content": "<p placeholder=\"Paragraph\">Lorem ipsum aliquam nam felis aenean ipsum massa nibh, eget vestibulum cras tempus sodales neque scelerisque nisi, fusce urna vel egestas nec a donec. Tristique quam fermentum nibh neque fusce orci massa ullamcorper quisque class, adipiscing neque est primis quisque urna fermentum maecenas tristique. Eget etiam aenean quam integer condimentum consectetur placerat amet nunc, vitae vehicula consequat nam lacus porta himenaeos orci, rhoncus dictumst primis quisque nibh sed taciti tellus.</p><div class=\"cimg rounded\"><img src=\"https://wytinjsgermcnjpcupns.supabase.co/storage/v1/object/public/storiesoi/content/bNLAegmm_D0d\" alt=\"bNLAegmm_D0d\" class=\"cntnImg rounded\">\n                                    </div><p placeholder=\"Paragraph\">Lorem ipsum ullamcorper erat sed eget elit aliquam arcu nec praesent, pellentesque sapien eget duis mollis donec fusce primis nisl, iaculis nullam per cursus interdum integer lobortis suscipit eros. Magna molestie phasellus fames fermentum maecenas non aenean ullamcorper tristique eros, inceptos praesent vitae rhoncus nostra laoreet potenti adipiscing vestibulum dictumst, morbi feugiat sociosqu amet etiam quam velit etiam vestibulum. Diam nibh faucibus feugiat erat convallis ullamcorper dictum, odio nisl lacinia nulla purus egestas felis, condimentum habitasse nisi curabitur sit hac.<div><br></div><div>Lorem ipsum blandit cras sapien blandit donec lobortis magna, fermentum ad vulputate volutpat dolor sem proin libero pharetra, pellentesque etiam bibendum volutpat donec duis convallis. Suscipit fringilla tempus augue feugiat scelerisque dapibus nostra, dui quam varius adipiscing gravida morbi orci facilisis, dictumst auctor id congue vel amet. Purus platea vitae habitasse platea justo varius suscipit quis suscipit taciti sodales, blandit faucibus sit aenean felis faucibus lacinia quam molestie primis aenean, egestas aliquam risus sagittis venenatis posuere semper aliquam venenatis tempor.<br></div></p><h2 placeholder=\"Heading 2\">Lorem</h2><p placeholder=\"Paragraph\">Lorem ipsum faucibus facilisis cubilia vivamus cursus torquent ac auctor, a eleifend risus condimentum in lobortis bibendum erat at turpis, ut massa fringilla volutpat tortor nisl ante sagittis. Ipsum litora purus rutrum himenaeos donec purus viverra tellus tempus, hendrerit tellus sagittis ad pellentesque aliquam lectus semper torquent, lectus nec ante feugiat dui aenean aliquet posuere. Faucibus vehicula malesuada eleifend ac rhoncus fermentum interdum inceptos, sit felis quis laoreet feugiat euismod congue.</p><div class=\"cimg rounded\"><img src=\"https://wytinjsgermcnjpcupns.supabase.co/storage/v1/object/public/storiesoi/content/PJ1QXr6Ka7-X\" alt=\"PJ1QXr6Ka7-X\" class=\"cntnImg rounded\">\n                                    </div><p placeholder=\"Paragraph\">Lorem ipsum lorem ultrices mollis quis gravida porta varius, porta pulvinar est primis at morbi pretium volutpat, hac taciti eu integer netus est ante. Fermentum torquent faucibus diam mauris nibh quis fames lorem, euismod sollicitudin pharetra ligula eros curabitur vulputate, vitae torquent faucibus lorem tortor a dui. Euismod molestie primis aliquet hendrerit interdum feugiat rhoncus sodales est etiam semper, donec pretium leo quisque tincidunt condimentum sollicitudin ultrices aliquam taciti litora, nulla magna fusce sem semper rhoncus eros convallis ut elit.</p><h2 placeholder=\"Heading 2\">Ipsum</h2><div class=\"cimg rounded\"><img src=\"https://wytinjsgermcnjpcupns.supabase.co/storage/v1/object/public/storiesoi/content/jffrQ-b6Zrzv\" alt=\"jffrQ-b6Zrzv\" class=\"cntnImg rounded\">\n                                    </div><p placeholder=\"Paragraph\">Lorem ipsum etiam vivamus habitant dolor nullam phasellus mauris, sed condimentum gravida imperdiet lectus netus. Justo neque sit tempus sed pellentesque pretium phasellus risus placerat condimentum et habitasse ante, quis sodales purus duis ac cubilia amet ullamcorper maecenas consectetur gravida. Purus ipsum nostra integer suscipit tellus fusce nisi sodales lectus interdum class, vehicula aliquam rutrum laoreet sed adipiscing odio magna dapibus nisl. Erat placerat donec ut cras euismod urna, faucibus sociosqu lacus porttitor neque sed, ad ut diam bibendum dapibus.</p>",
    "author": "Abrar Rafi",
    "files": [
        {},
        {},
        {}
    ]
} -->