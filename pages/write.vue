<template>
    <div>
        <NavbarTemplate />
        <div class="main">
            <div v-if="controllPanel" class="controllPanel">
                <h1 class="heading1">Heading 1</h1>
                <h2 class="heading2">Heading 2</h2>
                <h3 class="heading3">Heading 3</h3>
                <p class="paragraph">Paragraph</p>
                <img src="" alt="image" class="image">
            </div>
            <div class="appearance container-fluid">
                <div class="cover">
                    <input type="file" name="" id="" value="Cover">
                </div>
                <div>
                    <h1 contenteditable="true"></h1>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                            Filter categories
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
            <div class="content">

            </div>
            <div class="controller" @click="cpanel">
                <h1>add components</h1>
            </div>
        </div>
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
        }
    }
</script>
<style>
    .dropdown{
        align-self: flex-start;
        justify-self: flex-start;
    }
    .dropdown-item{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin: 0%;
    }
    label{
        width: 100%;
        margin-left: 4%;
    }
    .appearance{
        display: flex;
        flex-direction: row;
    }
</style>
