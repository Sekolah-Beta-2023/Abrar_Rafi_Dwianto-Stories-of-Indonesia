<template>
    <div>
        <footer class="text-center text-lg-start">
        <!-- Copyright -->
            <div class="text-center p-3">
                <a class="text-dark" href="https://www.github.com/machive5/">by Abrar Rafi Dwianto</a>
                <p> seorang anak SMA berumur 17 tahun asal surabaya yang bermimpi untuk menjadi seorang programmer dan menciptakan inovasi di bidang teknologi.</p>
            </div>

        <!-- Copyright -->
        </footer>
    </div>
</template>
<script>
    export default{
        name:'FooterTemplate',
    }
</script>
<style>
    div footer{
        background-color: whitesmoke;
        border-top: 2px solid rgba(245, 245, 245, 0.116);
    }
    div footer div, div footer a{
        color: rgb(5, 5, 5);
    }
    div footer a{
        font-weight: 500;
    }
    div footer p{
        font-size: 12px;
    }
</style>