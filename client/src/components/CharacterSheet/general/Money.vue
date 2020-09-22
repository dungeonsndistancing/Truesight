<template>
    <div class='money'>
        <div v-for='(value,id) in money' :key='id'>
            <h3>{{id}}:{{value}}</h3>
            <div>
                <button @click='up(id)'>+</button>
                <button @click='down(id)'>-</button>
            </div>
        </div>
        <div class='money-button'>
            <button @click='popuppop=true'>Add</button>
            <button @click='removepop=true'>Remove</button>
            <button @click='shiftpop=true'>Shift</button>
        </div>
        <popup v-show='popuppop' @close='cancel'>
            <div class='popup'>
                <h3>Add money:</h3>
                <div>pp:<input class='input' v-model='pp' type='number'></div>
                <div>gp:<input class='input' v-model='gp' type='number'></div>
                <div>sp:<input class='input' v-model='sp' type='number'></div>
                <div>cp:<input class='input' v-model='cp' type='number'></div>
                <button @click='add()'>Add</button><button @click='cancel()'>Cancel</button>
            </div>
        </popup>
        <popup v-show='removepop' @close='cancel'>
            <div class='popup'>
                <h3>Remove money:</h3>
                <div>pp:<input class='input' v-model='pp' type='number'></div>
                <div>gp:<input class='input' v-model='gp' type='number'></div>
                <div>sp:<input class='input' v-model='sp' type='number'></div>
                <div>cp:<input class='input' v-model='cp' type='number'></div>
                <button @click='remove()'>Remove</button><button @click='cancel()'>Cancel</button>
            </div>
        </popup>
        <popup v-show='shiftpop'  @close='cancel'>
            <div class='popup'>
                <h2>Irreversible Change</h2>
                <p>This will shift your money so that everything is expressed in lowest possible coin count.
                    <i>(10 copper becomes 1 silver, 10 silves becomes 1 gold, 10 gold becomes 1 platinum)</i>
                </p>
                <button @click='shift()'>Confirm</button><button @click='cancel()'>Cancel</button>
            </div>
        </popup>
  </div>
</template>

<script>
import popup from '../../Popups/Popup'
export default {
    props:['money'],
    components: {
        popup
    },
    data: function() {
        return {
            popuppop:false,
            removepop:false,
            shiftpop:false,
            pp:0,gp:0,sp:0,cp:0
        }
    },
    methods: {
        up(id) {
            console.log(this.money[id])
            this.money[id] = parseInt(this.money[id]) + 1
            this.update()

        },
        down(id) {
            console.log(id)
            this.money[id] = parseInt(this.money[id]) - 1
            this.update()
        },
        add() {
            this.money.add(this.pp,this.gp,this.sp,this.cp)
            this.pp = this.gp = this.sp = this.cp = 0
            this.popuppop = false
            this.update()
        },
        remove() {
            
            this.money.remove(this.pp,this.gp,this.sp,this.cp)
            this.pp = this.gp = this.sp = this.cp = 0
            this.removepop = false
            this.update()
        },
        shift() {
            this.money.shift()
            this.shiftpop=false
            this.update()
        },
        cancel() {
            this.shiftpop = this.removepop = this.popuppop = false
            this.pp = this.gp = this.sp = this.cp = 0
        },
        update() {
            this.$emit('update',{keys:['money'],values:[this.money]})
        }
    }
}
</script>
<style lang='scss' scoped>
@import '../../../scss/variables';

button{
    padding:0.1em 0.2em;
    font-size:0.9vw;
    margin:0;
}
.money{
    display:grid;
    grid-template-columns: repeat(4,1fr);
    grid-template-rows: 3fr 2fr;
    column-gap:10px;
    grid-column-start: 3;
    grid-column-end:5;
    grid-row-start:2;
    grid-row-end:3;
    border:1px solid black;
}
.money-button{
    display:grid;
    padding:2px;
    grid-template-columns:3fr 3fr 1fr;
    column-gap:10px;
    row-gap:10px;
    grid-column-start:1;
    grid-column-end:5;
}

.test{
    position:absolute;
    width:300px;
    height:500px;
    background-color:red;
}

@media only screen and (max-width:$small-screen) {
    .money{
        grid-column-start: 1;
        grid-column-end:3;
        grid-row-start:3;
        grid-row-end:4;        
    }
}
</style>