<template>
    <div  id='menu' class="navbar">

        <div id='logocontainer'>
            <img id="navbarlogo" @click="open('/characters')" src='../assets/logo.svg'/>
        </div>
        <div class='innermenu'>
            <a class='item' @click="open('/characters')">Characters</a>
            <a class='item' @click="open('/spells')">Spells</a> 
            <a class='item' @click="open('/items')">items</a>
            <a class='item' @click="logout" id='logout'>Logout</a>
        </div>
        <img @click='displaymenu()' class='menubutton' src='../assets/icons/menu.svg'>
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
            this.clearmenu()
            this.$router.push(loc)
        },
        displaymenu() {
            var x = document.getElementById('menu')
            console.log(x)
            if(x.className =='navbar') {
                x.className += " responsive"
            } else {
                x.className = 'navbar'
            }
        }, clearmenu() {
            var x = document.getElementById('menu')
            x.className = 'navbar'
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../scss/variables';
.menubutton{
    display:none;
    float:right;
    padding-top:0.75em;
    height:1.5em;
    padding:1em 1em;
}
.menubutton:hover{
    background-color:#386ebe;
}
.navbar {
    z-index:2;
    top:0;
    padding:0 5%;
    margin:0;
    width:calc(90%);
    height:3.5em;
    background-color: #214478;
    clear:both;
}
#navbarlogo {
    margin-left:1%;
    float:left;
    height:100%;
}

.navbar a {
    color: white;
    float: left;
    display: block;
    background-color:#214478;
    height: 3.5em;
    line-height:3.5em;
    width:fit-content;
    text-align: center;
    padding:0 0.5em;
    margin:0;
}
.navbar a:hover {
    background-color:#386ebe;
}
#logout {
    float:right;
}

#logocontainer{
    float:left;
    padding-top:0.2em;
    height:3em;

    margin-left:10px;
    padding-right:20px;
}
@media only screen and (max-width:$small-screen) {
    .menubutton {
        display:block;
    }
    .navbar .item{
        display:none;
    }
}
@media only screen and (max-width:$small-screen) {
    .navbar.responsive {
        position:relative;
    }
    .navbar #navbarlogo {
        margin-left:1%;
        float:left;
        height:100%;
    }
    .navbar.responsive .menubutton{
        position:absolute;
        right:5%;
        top:0;
    }
    .navbar.responsive .innermenu{
        z-index:1;
        position:absolute;
        right:0;
        bottom:-150px;
        display:grid;
        height:150px;
        width:15em;
        background-color:black;
    }
    .navbar.responsive .item {
        border-top:1px solid #386ebe;
        z-index:1;
        height:auto;
        width:100%;
        line-height: 1.5em;
        float:none;
        display:block;
        text-align:left;
    }
    #logout{
        float:none;
    }


}
</style>