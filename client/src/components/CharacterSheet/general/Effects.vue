<template>
    <div class='effects'>
        <h2>Effects & Conditions</h2>

        <div class='ver-scroll'>
            <div class='effect-card clickable' v-for='(effect,id) in effects' :key='id' @click='mouseover(id)'>
                <img class='effect-img'  :src='require(`../../../assets/icons/effects/${effect.icon}`)'>
                <transition name='pop'>
                    <div @mouseover.stop class='effect-info' v-if='showid == id'>
                        <h3>{{effect.name}}</h3>
                        <p>{{effect.description}}</p>
                        <button class='remove-button' @click.stop='removeEffect(id)'>Remove</button>
                    </div>
                </transition>
            </div>
            <div class='create-div' v-if='effects.length < 8'>
                <button @click='createEffect()' class='plusbutton'><b v-if='!create'>+</b><b v-if='create'>-</b></button>
                <div class='add-effect' v-if='create'>
                    <h4>Add a standard effect</h4>
                    <select class='input' v-model='neweffectid'>
                        <option v-for='(effect,id) in effectlist' :value='id' :key='id'>{{effect.name}}</option>
                    </select>
                    <button @click.stop='addEffect()'>Add</button>
                    <br>
                    <h4>Or input your own:</h4>
                    <h5>name</h5>
                    <input v-model='neweffect.name' class='input medium' type="text">
                    <h5>icon</h5>
                    <div class='iconselection clickable' @click='iconshow = !iconshow'>
                        <div class='icondisplay'>
                            <img class='displayicon' :src='require(`../../../assets/icons/effects/${neweffect.icon}`)' alt="">
                            <img class='icondrop' src='../../../assets/dropdown.png'>
                        </div>
                        <div v-if='iconshow' class='iconscroll'>
                            <img @click.stop='selectIcon(id)' v-for='(icon,id) in effectlist' class='displayicon' :key='id'  :src='require(`../../../assets/icons/effects/${icon.icon}`)'>
                        </div>
                    </div>
                    <h5>Description</h5>
                    <textarea v-model='neweffect.description'></textarea>
                    <button @click.stop='saveNewEffect()'>Save</button><button @click.stop='create=false'>Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import effectlist from '../../../assets/effects.json'
import Effect from '../../../../../shared/classes/effect'
export default {
    props:['effects'],
    data: function() {
        return {
            showid:-1,
            create:false,
            neweffect:{},
            neweffectid:0,
            iconshow:false
        }
    },
    computed: {
        editeffects: function() {
            return Object.assign([],this.effects)
        },
        effectlist: function() {
            return effectlist
        }
    },
    methods: {
        createEffect() {
            this.neweffect = new Effect('name','charmed.svg','')
            this.create = !this.create
        },
        addEffect() {
            this.editeffects.push(effectlist[this.neweffectid])
            this.create = false
            this.update()
        },
        saveNewEffect() {
            this.editeffects.push(this.neweffect)
            this.create = false
            this.update()
        },
        removeEffect(id) {
            var temp = {effects:[]}
            temp.effects.push(id)
            this.$emit('update',[{task:'remove',data:temp}])
            this.showid=-1
        },
        mouseover(id) {
            if(this.showid != id) {
                this.showid = id
            } else {
                this.showid = -1
            }
        },
        update() {
            var temp = {effects:{}}
            temp.effects[this.editeffects.length - 1] = this.editeffects[this.editeffects.length -1]
            this.$emit('update',[{task:'update',data:temp}])
        },
        selectIcon(id) {
            this.iconshow = false
            this.neweffect.icon = effectlist[id].icon
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../../../scss/variables';

textarea{
    width:90%;
    height:8em;
    resize: none;
    font-size:0.8vw;
}
.icondisplay{
    position: relative;
    height:3em;
    width:5em;
}
.icondrop{
    position: absolute;
    width:2em;
    top:0;
    right:0;
    bottom:0;
    margin:auto;
}
.pop-enter-active, .pop-leave-active{
    transition: all .3s ease;
}
.pop-enter, .pop-leave-to{
    transform:translateY(50%);
    opacity:0;
}
.add-effect{

    padding:10px;
    position:absolute;
    background-color:white;
    border:1px solid black;
    top:-20em;
    left:0;
    height:20em;
    width:15em;
}

.remove-button{
    position:absolute;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
}
.plusbutton{
    border: 1px solid black;
    background-color:white;
    border-radius: 0.2em ;
    font-size:3.3vw;
    width:100%;
    height:100%;
}
.plusbutton:hover{
    background-color:rgb(214, 214, 214);
}
.plusbutton:focus{
    outline:none;
}
.effect-img{
   height:2.5em;
}
.effects{
    font-size:1vw;
    grid-column-start: 5;
    grid-column-end:7;
    grid-row-start: 7;
    grid-row-end:9;
    background-color: rgb(228, 228, 228);
}
.effect-card{
    border-radius:2em;
}
.ver-scroll{
    padding:10px;
    position:relative;
    height:70%;
    display:grid;
    grid-template-rows: repeat(2,1fr);
    grid-template-columns: repeat(5,1fr);
}

.effect-info{
    font-size:1vw;
    padding:10px;
    width:20em;
    height:10em;
    position:absolute;
    background-color:white;
    border:1px solid black;
    top:calc(-10em - 20px);
    left:0;
    margin: auto;
}
.iconselection{
    position: relative;

    border:1px solid black;
    border-radius:0.5em 0.5em 0 0;
    background-color:rgb(196, 196, 196);
    width:5em;
    justify-self: center;
    left:2.5em;
}
.iconscroll{
    overflow:scroll;
    position:absolute;
    bottom:-15em;
    left:-1px;
    margin:0;
    height:15em;
    width:inherit;
    border:1px solid black;
    background-color:white;
}
.displayicon{
    float:left;
    margin:0.1em;
    width:2.8em;
    height:2.8em;
}

@media only screen and (max-width:$medium-screen) {
    .effects{
        grid-column-start: 1;
        grid-column-end:3;
        grid-row-start: 15;
        grid-row-end:17;  
        font-size:1.7vw; 
    }
    .effect-info{
        font-size:2vw;
    }
    .create-div{
        font-size:2vw;
    }
}
@media only screen and (max-width:$small-screen) {
    .effects{
        grid-column-start: 1;
        grid-column-end:3;
        grid-row-start: 23;
        grid-row-end:25;   
        font-size:3.8vw; 
    }
    .effect-info{
        font-size:3.2vw;
    }
    .create-div{
        font-size:3.8vw;
    }
}
</style>