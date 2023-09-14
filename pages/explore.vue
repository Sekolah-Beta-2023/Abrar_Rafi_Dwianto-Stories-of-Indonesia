<template>
    <div>
        <NavbarTemplate />
        <div class="main">
            <div class="box container-fluid mt-4">
                <form class="d-flex search">
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown button
                        </button>
                        <select v-model="filter" class="dropdown-menu" aria-labelledby="dropdownMenuButton1" multiple>
                            <option @click="active" value="all" class="dropdown-item">all</option>
                            <option @click="active" value="Folk Lore" class="dropdown-item">Folk Lore</option>
                            <option @click="active" value="Horror" class="dropdown-item">Horror</option>
                            <option @click="active" value="History" class="dropdown-item">History</option>
                            <option @click="active" value="Legend" class="dropdown-item">Legend</option>
                            <option @click="active" value="Myth" class="dropdown-item">Myth</option>
                        </select>
                    </div>
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                </form>
            </div>
            <div class="content row row-cols-auto g-4">
                <div v-for="(dt,id) in show" :key="id" class="col">
                    <div class="card shadow" :style="{width: 'calc(8rem + 6vw)', height:'100%'}">
                        <div class="wrap" style="height: 45%; width: 100%; overflow: hidden;">
                            <img :src="dt.cover" width="200" height="110" class="card-img-top" alt="img" :style="{objectFit: 'cover'}">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{{ dt.title }}</h5>
                            <p class="card-text categories"><small class="text-muted">{{ dt.categories.join(', ') }}</small></p>
                            <p class="card-text preview">{{ dt.content.slice(0,75)}}...</p>
                            <p class="card-text"><small class="text-muted">By {{ dt.author }}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <FooterTemplate />
    </div>
</template>

<script>
    import NavbarTemplate from '~/components/NavbarTemplate.vue';
    import FooterTemplate from '~/components/FooterTemplate.vue';
    
    const data = [
        {
            'title': 'Timun Mas',
            'content': 'Sint cupidatat cupidatat nulla aute aliqua quis nostrud duis tempor eu in. Labore commodo ad anim qui excepteur ea irure amet deserunt non mollit commodo. Adipisicing consequat eiusmod officia culpa elit anim id aute ex est commodo id fugiat dolore. Ea eu minim minim sit culpa qui laborum pariatur veniam aute nisi proident velit occaecat. Qui labore eiusmod aute elit. Irure laborum sit nostrud incididunt sit ipsum ex aute incididunt laborum.',
            'author': 'Pina',
            'categories': ['Folk Lore',],
            'cover': require("@/src/img/timun-mas.jpg"),
        },
        {
            'title': 'Kuntilanak',
            'content': 'Esse occaecat duis est enim voluptate exercitation id amet velit voluptate. Dolore ex elit eiusmod id. Tempor eu incididunt non occaecat. Elit laborum officia magna velit voluptate amet magna mollit commodo nisi cupidatat adipisicing do dolore.',
            'author': 'Tirto Adhi',
            'categories': ['Horror',],
            'cover': require("@/src/img/kunti.jpg"),
        },
        {
            'title': 'Bedawang',
            'content': 'Minim laboris adipisicing aute tempor aliquip ut enim. Dolore quis cupidatat proident occaecat dolor consectetur. Nostrud irure Lorem deserunt cillum Lorem. Qui reprehenderit ut reprehenderit consectetur ad nostrud deserunt cillum reprehenderit aliquip eiusmod. Lorem culpa consequat consequat Lorem officia reprehenderit duis aliqua et quis in laboris dolore. Adipisicing esse Lorem deserunt cupidatat sunt occaecat voluptate eu esse occaecat. Aliquip et consequat eu esse et non velit dolore Lorem aute id excepteur adipisicing aliquip.',
            'author': 'Kaluna',
            'categories': ['Myth',],
            'cover': require("@/src/img/bedawang.jpg"),
        },
        {
            'title': 'Palapa',
            'content': 'Minim laboris adipisicing aute tempor aliquip ut enim. Dolore quis cupidatat proident occaecat dolor consectetur. Nostrud irure Lorem deserunt cillum Lorem. Qui reprehenderit ut reprehenderit consectetur ad nostrud deserunt cillum reprehenderit aliquip eiusmod. Lorem culpa consequat consequat Lorem officia reprehenderit duis aliqua et quis in laboris dolore. Adipisicing esse Lorem deserunt cupidatat sunt occaecat voluptate eu esse occaecat. Aliquip et consequat eu esse et non velit dolore Lorem aute id excepteur adipisicing aliquip.',
            'author': 'Rama',
            'categories': ['History',],
            'cover': require("@/src/img/palapa.jpg"),
        },
        {
            'title': 'Roro Jongrang',
            'content': 'Minim reprehenderit sit labore eu aute non fugiat. Ipsum cillum ex eu irure exercitation aliqua deserunt duis exercitation elit labore officia ad. Reprehenderit et sint minim incididunt occaecat Lorem ex in magna nulla nulla sint. Irure incididunt culpa qui incididunt eiusmod id cupidatat. Mollit elit nostrud dolore deserunt.',
            'author': 'Rama',
            'categories': ['Myth', 'Legend'],
            'cover': require("@/src/img/roro-jonggrang.jpg"),
        },
    ]

    export default {
        data(){
            return{
                data,
                show: data,
                filter:[],
            }
        },
        components: {
            NavbarTemplate,
            FooterTemplate,
        },
        mounted(){
            console.log(this.filter);
        },
        methods: {
            active(event){
                event.preventDefault();
                event.target.parentElement.focus();
                event.target.selected = !event.target.selected;
                this.show = this.filterCategories;
                return false;
            }
        },
        computed: {
            filterCategories(){
                const show = [];
                this.data.forEach(dt => {
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
        src: url("~/src/font/boutiques-of-merauke-font/BoutiquesOfMerauke.ttf");
    }
    .main{
        box-sizing: border-box;
        min-height: 100vh;
        width: 100%;
    }
    .content.row{
        box-sizing: border-box;
        margin: 20px 0px;
        padding: 0px 15%;
        height: auto;
        justify-content: center;
        background-color: rgb(226, 223, 223);
        position: relative;
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
        justify-content: space-around;
    }
    .search{
        align-self: flex-end;
        justify-self: flex-end;
    }
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
    p.categories{
        text-align: center;
        margin-bottom: 0%;
    }
    label{
        width: 100%;
        margin-left: 4%;
    }
    @media only screen and (max-width: 950px){
        .content.row{
            padding: 0px 8%;
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
        .content.row{
            padding: 0px 1%;
            margin: 0px;
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
    }
</style>
