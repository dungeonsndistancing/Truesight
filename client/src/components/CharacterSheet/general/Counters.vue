<template>
    <div class='counters'>
        <h2>Counters</h2>
        <div class='scrolldiv'>
            <div @click='edit(id)' class='count-div clickable' v-for='(counter,id) in counters' :key='id'>
                <h5>{{counter.name}}</h5>
                <div class='count-inner'>
                    <h4>Total:{{counter.max}}</h4>
                </div>
                <div>
                    <h4>Current:{{counter.current}}</h4>
                </div>
                <button @click.stop='countup(id)' class='count-inner fill'>+</button>
                <button @click.stop='countdown(id)' class='count-inner fill'>-</button>
            </div>
            <button class='add' @click='addCounter()'>Add Counter</button>
        </div>
        <popup v-if='pop' @close='close'>
            <div class='popup'>
                <h5>name:</h5>
                <input class='input wide' v-model='counters[popid].name'>
                <h5>max:</h5><input type='number' class='input small' v-model='counters[popid].max'><br>
                <button @click='close()'>Close</button><button @click='removeCounter(popid)'>Delete</button>
            </div>
        </popup>
    </div>
</template>

<script>
import popup from '../../Popups/Popup'
import Counter from '../../../../../shared/classes/counter'
export default {
    props:['counters'],
    data: function() {
        return {
            pop:false,
            popid:0,


        }
    }, components: {
        popup
    },
    methods: {
        countup(id){
            this.counters[id].increase()
            this.update()
        },
        countdown(id){
            this.counters[id].decrease()
            this.update()
        },
        addCounter(){
            this.counters.push(new Counter('name',1,1))
            this.update()
        },
        removeCounter(id){
            this.popid=0
            this.counters.splice(id,1)
            this.close()
            
        },
        edit(id) {
            this.pop=true
            this.popid = id
        },
        close(){
            this.pop=false
            this.update()
        },
        update() {
            this.$emit('update',{keys:['counters'],values:[this.counters]})
        }
    }


}
</script>

<style lang='scss' scoped>
@import '../../../scss/variables';
.counters{
    grid-column-start: 5;
    grid-column-end:7;
    grid-row-start:3;
    grid-row-end:7;
    background-color: rgb(228, 228, 228);
    margin:0;
    padding:0;
}
.spellcounters{
    grid-column-start: 7;
    grid-column-end:9;
    grid-row-start:2;
    grid-row-end:9;
}
.scrolldiv{
    display:grid;
    max-height:90%;
    overflow-y: scroll;
    grid-template-columns: 1fr 1fr;
    column-gap:10px;
    row-gap:10px;
}
.count-div{
    text-align: center;
    padding:0 0 0 7%;
    align-content: center;
    align-items: center;
    height:5em;
    border:1px solid black;
    background-color:white;
}
.add{
    height:5em;
}
.count-inner{

    float:left;
}
.fill{
    margin:auto;
    width:40%;
}
h4{
    margin:0.2em 0;
}

@media only screen and (max-width:$medium-screen) {
    .counters{
        grid-column-start: 1;
        grid-column-end:3;
        grid-row-start:11;
        grid-row-end:15;
        font-size:2vw;
    }
}
@media only screen and (max-width:$small-screen) {
    .counters{
        grid-column-start: 1;
        grid-column-end:3;
        grid-row-start:19;
        grid-row-end:23;
        font-size:3.1vw;
    }

}
</style>