<template>
    <div class="container">
        <div class="center">
            <img id='logo' src='../assets/logo2.png'/>
            <div id="login">
                <div id="form" @submit="login">
                    <input v-model="email" placeholder="enter your email"> <br>
                    <input v-model="password" type="password" placeholder="enter your password" v-on:keyup.enter="login"><br>
                    <label for="long">Stay signed in: </label><br><input v-model="long" type="checkbox" id="long"><br>
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
            }
            if(token) {
                localStorage.setItem("token",token)
                this.$router.push("/home")
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
    color: white;
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