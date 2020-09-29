<template>
    <div class='class clickable' @click='edit()'>
        <div class='fill'>
        <h5>Class(es)</h5>    
            <div class='class-div'>
                <div v-for='(temp,id) in cclass' :key='id'> 
                    <b> {{temp.level}}</b><i v-if="temp.level == parseInt(1)" >st</i>
                    <i v-else-if="(temp.level > 3 && temp.level < 21)" >th</i>
                    <i v-else-if="temp.level == 2">nd</i>
                    <i v-else>rd</i>
                    level <i><b>{{temp.name}}</b></i>
                    <h6><i>{{temp.subclass}}</i></h6>
                </div>
            </div>
        </div>
        <transition name='roll'>
            <div v-if='show' class='popup' @click.stop>
                <h4>Edit classes</h4>
                <div class='edit-div'>
                    <div class='class-edit' v-for='(temp,id) in editcclass' :key='id'>
                        <h5>Class</h5>
                        <input class='input medium' v-model='temp.name' type="text">
                        <h5>Sub-class</h5>
                        <input class='input wide' v-model='temp.subclass' type="text">
                        <h5>Level</h5>
                        <input class='input small' v-model='temp.level' type="number">
                        <h5>Hitdice</h5>
                        <input class='input small' v-model='temp.hitdice.dice' type="number"><br>
                        <button @click='removeClass(id)'>Remove class</button>
                    </div>
                </div>
                <button @click='addClass()'>Add class</button>
                <button @click='show = false;update()'>Save</button>
            </div>
        </transition>
    </div>
</template>

<script>
import Cclass from '../../../../../shared/classes/cclass'
export default {
    props:['cclass'],
    data: function() {
        return {
            show:false,
        }
    },
    computed: {
        editcclass: function() {
            if(typeof this.cclass !== 'undefined') {
                return Array.from(this.cclass)
            }
            return new Array()
        }
    },
    methods: {
        edit() {
                this.show= !this.show
        },
        update(id) {
            var temp = {cclass:{}}
            temp.cclass[id] = this.editcclass[id]
            if(typeof id == 'undefined') {
                temp.cclass = this.editcclass
            }
            console.log(temp)
            this.$emit('update',[{task:'update',data:temp}])
        },
        addClass() {
            this.editcclass.push(new Cclass('','',1,0))
            this.update(this.editcclass.length-1)
        },
        removeClass(id) {
            var temp = {cclass:[]}
            temp.cclass.push(id)
            this.$emit('update',[{task:'remove',data:temp}])
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../../../scss/variables';
.class-div{
    height:80%;
    overflow-y:scroll;
}
.class-edit{
    border:1px solid black;
    margin:1em;
}
.edit-div{
    height:80%;
    overflow-y:scroll;
}
.input{
    text-align: center;
}
.fill{
    background-color:#FFFFFF00;
    position:relative;
    height:100%;
    width:100%;
}
.roll-enter-active{
    transition: all .3s ease;
}
.roll-leave-active{
    transition: all .3s ease;
}
.roll-enter, .roll-leave-to{
    transform: translateY(-10em) scaleY(0) ;
}
.popup {
    overflow:hidden;
    position:absolute;
    left:-1px;
    width:100%;
    height:20em;
    background-color:white;
    border:1px solid black;
    z-index:3;
    animation-name: test;
    animation-duration: 0.5s;
}
.class{
    padding-top:0em;
    font-size:1vw;
    position: relative;
    border:1px solid black;
    grid-row-start: 1;
    grid-row-end:2;
    grid-column-start:3;
    grid-column-end:5;
}
h6{
    margin:0.1em;
}
@media only screen and (max-width:$medium-screen) {

    .class{
        font-size:2vw;
        padding:0.3em;
    }
}
@media only screen and (max-width:$small-screen) {

    .class{
        font-size:3.4vw;
        padding:0.3em;
    }
    .class{
        grid-row-start:2;
        grid-row-end:3;
        grid-column-start: 1;
        grid-column-end: 3;
    }
}
</style>