<template>
    <div>
        <NavbarTemplate />
        <section class="main container-fluid mt-3">
            <div v-if="controllPanel" class="controllPanel">
                <h1 class="heading1" @click="adding('h1')">Heading 1</h1>
                <h2 class="heading2" @click="adding('h2')">Heading 2</h2>
                <h3 class="heading3" @click="adding('h3')">Heading 3</h3>
                <p class="paragraph" @click="adding('p')">Paragraph</p>
                <img src="" alt="image" class="image">
            </div>
            <div class="appearance container-fluid">
                <div class="cover rounded-2">
                    <label for="cvr" class="cover rounded"><input :style="{display:'none',}" type="file" name="img" id="cvr" value="Cover">cover</label>
                </div>
                <div class="description container-fluid">
                    <div class="wrap">
                        <h1 contenteditable="true" autofocus >Title</h1>
                        <p contenteditable="true">Description</p>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                            categories
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><div class="dropdown-item"><input type="checkbox" name="All" id="All"><label for="All">All</label></div></li>
                            <li><div class="dropdown-item"><input type="checkbox" name="Folk Lore" id="Folk"><label for="Folk">Folk Lore</label></div></li>
                            <li><div class="dropdown-item"><input type="checkbox" name="Horror" id="Horror"><label for="Horror">Horror</label></div></li>
                            <li><div class="dropdown-item"><input type="checkbox" name="History" id="History"><label for="History">History</label></div></li>
                            <li><div class="dropdown-item"><input type="checkbox" name="Legend" id="Legend"><label for="Legend">Legend</label></div></li>
                            <li><div class="dropdown-item"><input type="checkbox" name="Myth" id="Myth"><label for="Myth">Myth</label></div></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="content mt-4">

            </div>
            <span class="controller rounded-2 container-fluid" @click="cpanel">+</span>
        </section>
        <FooterTemplate />
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
                elements: {
                    "content": document.querySelector('.content'),
                    "h1": document.createElement("h1").setAttribute('contenteditable',true),
                    "h2": document.createElement("h2").setAttribute('contenteditable',true),
                    "h3": document.createElement("h3").setAttribute('contenteditable',true),
                    "h4": document.createElement("h4").setAttribute('contenteditable',true),
                    "p": document.createElement("p").setAttribute('contenteditable',true),

                }
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
                this.elements.content.appendChild(this.elements[elm])
            }
        }
    }
</script>
<style>
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
        color: rgb(189, 189, 189);
        font-weight: 500;
    }
    .appearance{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0%;
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
    }
    .wrap{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 70%;
    }

    .controller{
        width: 100%;
        height: 15vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 0.4vw solid rgb(189, 189, 189);
        font-weight: 500;
        font-size: 10vw;
        text-align: center;
        color: rgb(189, 189, 189);
    }
</style>
