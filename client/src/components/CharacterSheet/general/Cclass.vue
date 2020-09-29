<template>
    <div class='class clickable' @click='edit()'>
        <div class='fill'>
        <h5>Class</h5>    
            <div > 
                <b> {{cclass.level}}</b><i v-if="cclass.level == parseInt(1)" >st</i>
                <i v-else-if="(cclass.level > 3 && cclass.level < 21)" >th</i>
                <i v-else-if="cclass.level == 2">nd</i>
                <i v-else>rd</i>
                level <i><b>{{cclass.name}}</b></i>
                <h6><i>{{cclass.subclass}}</i></h6>
            </div>
        </div>
        <transition name='roll'>
            <div v-if='show' class='popup' @click.stop>
                <h5>Class</h5>
                <input class='input medium' v-model='editcclass.name' type="text">
                <h5>Sub-class</h5>
                <input class='input wide' v-model='editcclass.subclass' type="text">
                <h5>Level</h5>
                <input class='input small' v-model='editcclass.level' type="number"><br>
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
                return Cclass.from(this.cclass)
            }
            return new Cclass()
        }
    },
    methods: {
        edit() {
                this.show= !this.show
        },
        update() {
            var temp = {cclass:this.editcclass}
            this.$emit('update',[{task:'update',data:temp}])
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../../../scss/variables';
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
    transform: translateY(-5em) scaleY(0) ;
}
.popup {
    overflow:hidden;
    position:absolute;
    left:-1px;
    width:100%;
    height:calc(10em);
    background-color:white;
    border:1px solid black;
    z-index:3;
    animation-name: test;
    animation-duration: 0.5s;
}
.class{
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