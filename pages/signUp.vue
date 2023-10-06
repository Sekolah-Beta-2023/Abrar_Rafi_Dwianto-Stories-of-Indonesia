<template>
  <div>
    <div class="container">
        <form class="form rounded shadow">
            <h1>Sign Up</h1>
            <div class="form-group mt-3">
                <label for="exampleInputUsername1">Username</label>
                <input type="email" class="form-control" id="exampleInputUsername1" aria-describedby="emailHelp" placeholder="Enter Username">
                <small id="emailHelp" class="form-text text-muted"></small>
            </div>
            <div class="form-group mt-3">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group mt-3">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-primary mt-3">Submit</button>
        </form>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
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
</style>