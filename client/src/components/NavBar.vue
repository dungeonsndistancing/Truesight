<template>
    <div class="NavBar">
        <img id="navbarlogo" @click="home" src='../assets/logo2.png'/>
        <a @click="logout">Logout</a>
    </div>
</template>
<script>
import authservice from '../services/AuthenticationService.js' 
export default {
    methods: {
        async logout() {
            await authservice.logout()
            this.$router.push('/')
        },
        async home() {
            this.$router.push('/home')
        }
    }
}
</script>

<style>
.NavBar {
    top:0;
    margin-top:0px;
    padding-top:0px;
    padding-bottom:0px;
    width:100%;
    height:50px;
    margin-bottom:0px;
    background-color: #214478;
}
#navbarlogo {
    margin-top:0.25%;
    margin-left:1%;
    float:left;
    height:80%;
}

.NavBar a {
    color: white;
    float: left;
    display: block;
    background-color:#214478;
    height: 50%;
    width: 100px;
    text-align: center;
    padding-top:12pt;
}
</style>