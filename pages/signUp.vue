<template>
  <div>
    <div class="container">
        <form class="form rounded shadow" @submit.prevent="send">
            <h1>Sign Up</h1>
            <div class="form-group mt-3">
                <label for="exampleInputEmail1">Email address</label>
                <input v-model="form.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group mt-3">
                <label for="exampleInputPassword1">Password</label>
                <input v-model="form.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" required>
            </div>
            <button type="submit" class="btn btn-primary mt-3">Submit</button>
            <p>already have an account? <nuxt-link to="/logIn">Log In</nuxt-link></p>
        </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    data(){
        return{
            form: {
                username: '',
                email: '',
                password: '',
            },
        }
    },
    methods:{
        ...mapActions('userControl',['signUp']),
        send(){
            console.log(this.$store.state.userControl.user);
            const payload = this.form;
            this.signUp(payload);
        },
    }
}
</script>

<style scoped>
    body{
        background-color: rgb(226, 223, 223);
    }
    .container{
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .container form{
        width: 35%;
        min-width: 412px;
        height: auto;
        background-color: whitesmoke;
        padding: 3%;
        box-sizing: border-box;
    }
    .container form h1{
        text-align: center;
    }
    .container form p{
        text-align: center;
    }
    .container form .btn{
        width: 100%;
    }
</style>