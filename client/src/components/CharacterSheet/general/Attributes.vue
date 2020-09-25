<template>
    <div class='attributes'>
        <div class='at-title'><h3>Attributes</h3></div>
        <div class='attr clickable' @click='change(attrid)' v-for='(attribute,attrid) in attributes' :key='attrid'>
            <h5>{{attrid}}</h5>
            <h2>{{attribute.value}}</h2>
            <div class='mod'><b v-if='attribute.mod > 0'>+</b><b>{{attribute.mod}}</b></div>
        </div>
        <popup v-show='atpop' @close='close'>
            <div class='popup long'>
                <h2>{{updateid}}</h2>
                <h3>{{realattributes[updateid].value}}</h3>
                <h5>Base:</h5>
                <input class='input small' type='text' v-model='realattributes[updateid].base'>
                <h5>Modifiers:</h5>
                <div class='scrollcontainer'>
                    <div class='mod-div' v-for='(mod,id) in realattributes[updateid].modifiers' :key='mod._id'>
                        <h5>Name:</h5><input class='input wide' type='text' v-model='mod.name'>
                        <h5>Value:</h5><input class='input wide' type='number' v-model='mod.value'>
                        <h5>Source:</h5><input class='input wide' type='text' v-model='mod.source'><br>
                        <button @click='removemodifier(updateid,id)'>Remove Modifier</button>
                    </div>
                </div>
                <br>
                <button @click='addmodifier(updateid)' >Add modifier</button>
                <button @click='close()'>Save</button>
            </div>
        </popup>
    </div>
</template>

<script>
import popup from '../../Popups/Popup'
export default {
    props:['attributes'],
    components: {
        popup
    },
    data: function() {
        return {
            atpop:false,
            updateid:'strength',
        }
    },
    computed: {
        realattributes: function() {
            if(typeof this.attributes != 'undefined') {
                return Object.assign({},this.attributes)
            }
            return {}
        }
    },
    methods: {
        change(id) {
            this.updateid=id
            this.atpop=true
        },
        close() {
            this.update()
            this.updateid='strength'
            this.atpop=false
        },
        update(){
            var temp = {attributes:{}}
            temp['attributes'][this.updateid] = this.realattributes[this.updateid]
            this.$emit('update',[{task:'update',data:temp}])
        },
        addmodifier(updateid) {
            var temp = {attributes:{}}
            temp.attributes[updateid] = {modifiers:{}}
            temp.attributes[updateid].modifiers[this.attributes[updateid].modifiers.length] = {name: "",value:0,source:''}
            this.$emit('update',[{task:'update',data:temp}])
        },
        removemodifier(updateid,id) {
            var temp = {attributes:{}}
            temp.attributes[updateid] = {modifiers:[id]}
            this.$emit('update',[{task:'remove',data:temp}])
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../../../scss/variables';
.scrollcontainer{
    border-style:solid none solid none;
    border-width:1px;
    height:50%;
    background-color:rgb(223, 223, 223);
    overflow-y: scroll;
}
.mod-div{
    padding:0.5em;
    margin:0.3em 15% 0.3em 15%;
    border:1px solid black;
}
.attributes{
    padding:5px;
    grid-column-start:1;
    grid-column-end:2;
    grid-row-start:5;
    grid-row-end:9;
    row-gap: 10px;
    column-gap: 10px;
    display:grid;
    grid-template-columns: repeat(2,1fr);
    grid-template-rows:0.1fr 1fr 1fr 1fr;
    background-color: rgb(228, 228, 228);
}
.attr{
    overflow:hidden;
    background-color:white;
    margin:0;
    padding:0;
    border: 1px solid black;
}
.mod{
    border: 1px solid black;
    width:2.5em;
    height:35%;
    font-size:1.5vw;
    line-height:1.5em;
    border-radius:50%;
    margin:0 auto 0 auto;
    
}

.at-title{
    grid-column-start:1;
    grid-column-end:3;
}

h5{
    margin-top:0.1em;

}

@media only screen and (max-width:$medium-screen) {
    .mod {
        font-size:2.5vw;
    }
}

@media only screen and (max-width:$small-screen) {
    .attributes {
        grid-column-start:1;
        grid-column-end:2;
        grid-row-start:7;
        grid-row-end:11;
    }
    .mod {
        font-size:3.5vw;
    }
}
</style>