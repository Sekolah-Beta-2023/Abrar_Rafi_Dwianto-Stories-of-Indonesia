<template>
    <div class="loadingwrp">
        <div class="spinner"></div>
    </div>
</template>
<script>
    export default {
        
    }
</script>

<style>
    .loadingwrp{
        background-color: #ffffffad;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
    }
    .spinner {
        width: 10vw;
        height: 10vw;
        display: grid;
        border-radius: 50%;
        mask: radial-gradient(farthest-side,#0000 40%,#909090 41%);
        background: linear-gradient(0deg ,rgba(144,144,144,0.5) 50%,rgba(144,144,144,1) 0) center/4.5px 100%,
                linear-gradient(90deg,rgba(144,144,144,0.25) 50%,rgba(144,144,144,0.75) 0) center/100% 4.5px;
        background-repeat: no-repeat;
        animation: spinner-d3o0rx 1s infinite steps(12);
    }

    .spinner::before,
    .spinner::after {
        content: "";
        grid-area: 1/1;
        border-radius: 50%;
        background: inherit;
        opacity: 0.915;
        transform: rotate(30deg);
    }

    .spinner::after {
        opacity: 0.83;
        transform: rotate(60deg);
    }

    @keyframes spinner-d3o0rx {
        100% {
            transform: rotate(1turn);
        }
    }
</style>