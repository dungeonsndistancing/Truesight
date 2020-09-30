<template>
    <div class='counters'>
        <h2>Counters</h2>
        <div class='scrolldiv'>
            <div @click='edit(id)' class='count-div clickable' v-for='(counter,id) in counters' :key='id' draggable="true" @dragover="allowDrop($event)" @drop='drop($event,id)' @dragstart="drag($event,id)">
                <h5>{{counter.name}}</h5>
                <div class='count-inner'>
                    <h4>Total:{{counter.max}}</h4><h4>Current:{{counter.current}}</h4>
                </div>
                <div>
                    
                </div>
                <button @click.stop='countup(id)' class='count-inner fill'>+</button>
                <button @click.stop='countdown(id)' class='count-inner fill'>-</button>
            </div>
            <button class='add' @click='addCounter()'>Add Counter</button>
        </div>
        <popup v-if='pop' @close='close'>
            <div class='popup'>
                <h5>name:</h5>
                <input class='input wide' v-model='editcounters[popid].name'>
                <h5>max:</h5><input type='number' class='input small' v-model='editcounters[popid].max'><br>
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
    computed: {
        editcounters: function() {
            if(typeof this.counters !== 'undefined') {
                return Object.assign([],this.counters)
            }
            return new Array()
        }
    },
    methods: {
        countup(id){
            
            this.editcounters[id].increase()
            this.update(id)
        },
        countdown(id){
            this.editcounters[id].decrease()
            this.update(id)
        },
        addCounter(){
            this.editcounters.push(new Counter('name',1,1))
            this.update(this.editcounters.length-1)
        },
        removeCounter(id){
            var temp = {counters:[]}
            temp.counters.push(id)
            console.log(temp)
            this.$emit('update',[{task:'remove',data:temp}])
            this.pop=false
            this.popid = 0;
        },
        edit(id) {
            this.pop=true
            this.popid = id
        },
        close(){
            this.pop=false
            this.update(this.popid)
        },
        update(id) {
            var temp = {counters:{}}
            temp['counters'][id] = this.editcounters[id]
            this.$emit('update',[{task:'update',data:temp}])
        },
        allowDrop(ev) {
            ev.preventDefault()
        },
        drag(ev,id) {
            ev.dataTransfer.setData('id',id)
        },
        drop(ev,id) {
            var oldid = parseInt(ev.dataTransfer.getData('id'))
            var temp = {counters:{}}
            temp.counters[oldid] = this.editcounters[id]
            temp.counters[id] = this.editcounters[oldid]
            console.log(temp)
            this.$emit('update',[{task:'update',data:temp}])
        }
    }


}
</script>

<style lang='scss' scoped>
@import '../../../scss/variables';
h4{
    display: inline-block;
    padding:0 0.3em;
}
.counters{
    grid-column-start: 5;
    grid-column-end:7;
    grid-row-start:3;
    grid-row-end:7;
    background-color: $light-gray;
    border-radius:$border-radius;
    margin:0;
    padding:0 0 0 0.5em;
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
    font-size:1vw;
    text-align: center;
    align-content: center;
    align-items: center;
    justify-content: center;
    height:5em;
    border:1px solid $border-color;
    border-radius:$border-radius;
    background-color:white;
}
.add{
    height:5em;
    border-radius:$border-radius;
    outline:none;
    background-color:white;
    border:1px solid $border-color;
}
.add:hover{
    background-color:$selecting;
}
.fill{
    margin:auto;
    width:40%;
}


@media only screen and (max-width:$medium-screen) {
    .counters{
        grid-column-start: 1;
        grid-column-end:3;
        grid-row-start:11;
        grid-row-end:15;
        font-size:2vw;
    }
    .spellcounters{
        grid-column-start: 3;
        grid-column-end:5;
        grid-row-start:2;
        grid-row-end:9;
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
    .spellcounters{
        grid-column-start: 1;
        grid-column-end:3;
        grid-row-start:10;
        grid-row-end:15;
    }

}
</style>