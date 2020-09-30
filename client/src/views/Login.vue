<template>
    <div class="container">
        <div class="center">
            <img class='logo' src='../assets/logo.svg'/>
            <div id="login">
                <div id="form" @submit="login">
                    <input v-model="email" placeholder="enter your email">
                    <input v-model="password" type="password" placeholder="enter your password" v-on:keyup.enter="login"><br>
                    Stay signed in:<br><input v-model="long" type="checkbox" id="long"><br>
                    <button @click="register">Register</button><button @click="login">Login</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import authservice from '../services/AuthenticationService.js' 
export default {
    data: function(){
        return {
            email: '',
            password: '',
            long: false,
            error: null
        }
    },
    methods: {
        async login() {
            const result = await authservice.login(this.email,this.password, this.long)
            if(result == "error") {
                console.log("ERROR")
                window.alert("bad credentials")
            }
            const token = result.data.token
            const longtoken = result.data.longtoken
            if(longtoken) {
                localStorage.setItem("longtoken",longtoken)
            } else {
                localStorage.removeItem('longtoken')
            }
            if(token) {
                localStorage.setItem("token",token)
                this.$router.push("/characters")
            }
        },
        register() {
            this.$router.push("/register")
        }
    },
    components: {
    }
}
</script>
<style lang='scss' scoped>
@import '../scss/variables';
.container{
    padding-top:0.5em;
    background-color:$offwhite;
}

.logo {
    width:30vh;
}

#login {
    text-align:center;
    margin-top: 2em;
    background-color: white;
    width: 30em;
    max-width:90vw;
    height: 15em;
    left:0;
    right:0;
    margin:auto;
    border-radius: 5vh;
    border: 1px solid rgb(201, 201, 201);
}

#form {
    padding-top:1em;
    margin:auto;
    text-align:center;
    text-justify: distribute;
    width:95%;
    height:95%;
}

#form button{
    height: 30px;
    width: 70px;
    margin:1em;
}

#login input{
    text-align: center;
    width: 70%;
    height: 10%;
    border-radius: 10px;
    border-style: solid;
    border-width: 1px;
    margin-top:0.3em;
    margin-bottom:0.3em;
}
</style>