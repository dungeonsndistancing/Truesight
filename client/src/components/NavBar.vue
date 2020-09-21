<template>
    <div class="NavBar">
        <div class='container'>
            <div id='logocontainer'>
                <img id="navbarlogo" @click="open('/home')" src='../assets/logo.svg'/>
            </div>
            <div id='linkcontainer'>
                <a @click="open('/characters')">Characters</a>
                <a @click="open('/spells')">Spells</a> 
                <a @click="open('/items')">items</a>
                <div id='logout'><a @click="logout" float='right'>Logout</a></div>    
            </div>
        </div>
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
        async open(loc) {
            this.$router.push(loc)
        }
    }
}
</script>

<style>
.container{
    margin:auto;
    width:90%;
}
.NavBar {
    font-size:1vw;
    top:0;
    margin-top:0px;
    padding-top:0px;
    padding-bottom:0px;
    width:100%;
    height:50px;
    max-height:6vh;
    margin-bottom:0px;
    background-color: #214478;
    clear:both;
    min-height:5vh;
}
#navbarlogo {
    margin-top:0.0vh;
    margin-left:1%;
    float:left;
    height:80%;
    max-height:4vh;
    min-height:4vh;
}

.NavBar a {
    color: white;
    float: left;
    display: block;
    background-color:#214478;
    height: 50%;
    width:7vw;
    text-align: center;
    padding:1vw 0 0 0;
    padding-top:2vh;
    margin:0;
}
#logout {
    float:right;
}

#logocontainer{
    float:left;
    height:50px;
    margin-left:10px;
    padding-top: 5px;
    padding-right:20px;
}
</style>