<template>
    <div class="NavBar">
        <div class='container'>
            <div id='logocontainer'>
                <img id="navbarlogo" @click="open('/home')" src='../assets/logo2.png'/>
            </div>
            <div id='linkcontainer'>
                <a @click="open('/characters')">Characters</a>|
                <a @click="open('/spells')">Spells</a> |
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
    top:0;
    margin-top:0px;
    padding-top:0px;
    padding-bottom:0px;
    width:100%;
    height:50px;
    margin-bottom:0px;
    background-color: #214478;
    clear:both;
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
    width: 70px;
    text-align: center;
    padding-top:12pt;
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