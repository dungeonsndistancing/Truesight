<template>
    <div class="container">
        <div class="center">
                        <img id='logo' src='../assets/logo2.png'/>
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

.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
#logo {
    width:300px;
}
#login {
    text-align:center;
    margin-top: 60px;
    background-color: #214478;
    width: 500px;
    height: 350px;
    border-radius: 5vh;
    filter: drop-shadow(2px 2px 5px #222222)
}

#form {
    padding-top:30px;
    margin:auto;
    width:95%;
    height:95%;
}

#form button{
    height: 30px;
    width: 70px;
    margin:20px;
}

#login input{
    text-align: center;
    width: 70%;
    height: 10%;
    border-radius: 10px;
    border-style: solid;
    border-width: 1px;
    margin-top:20px;
    margin-bottom:20px;
}
</style>