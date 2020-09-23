<template>
    <div class="container">
        <div class="center">
            <img id='logo' src='../assets/logo.svg'/>
            <div id="login">
                <div id="form" @submit="register">
                    <input v-model="name" placeholder="enter your username"> <br>
                    <input v-model="email" placeholder="enter your email"> <br>
                    <input v-model="password" type="password" placeholder="enter your password" v-on:keyup.enter="register"><br>
                    <button @click="register">Register</button>
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
            name: '',
            email: '',
            password: '',
            error: null
        }
    },
    methods: {
        async register() {
            const result = await authservice.register(this.name,this.email,this.password)
            if(result == "error") {
                window.alert("could not register for some reason")
            } else {
                this.$router.push("/")
            }
        }
    }
}
</script>
<style scoped>
.container{
    padding-top:0.5em;
}
#logo {
    width:30vh;
}
#login {
    text-align:center;
    text-justify: ;
    margin-top: 2em;
    background-color: white;
    width: 30em;
    max-width:90vw;
    height: 15em;
    left:0;
    right:0;
    margin:auto;
    border-radius: 5vh;
    border: 2px solid gray;
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
    margin-top:1em;
    margin-bottom:1em;
}
</style>