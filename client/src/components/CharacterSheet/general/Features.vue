<template>
    <div class='features'>
        <div class='inner-features'>
            <h2>Features and Traits</h2>
            <div class='scroll' @dragover='allowDrop($event)' @drop.self='drop($event,features.length)'>
                <div @click='toggleFeature(id)' class='feature-info clickable' v-for='(feature,id) in features' :key='feature.id' draggable="true" @dragover="allowDrop($event)" @drop='drop($event,id)' @dragstart='drag($event,id)'>
                    <h3>{{feature.name}}</h3>
                    <h5>{{feature.source}}</h5>
                    <div v-if='showid == id' class='feature-details'>
                        <p>{{feature.description}}</p>
                        <button class='feature-button' @click.stop='edit(id)'>edit</button>
                    </div>
                </div>
            </div>
            <button class='bottom-button' @click='addfeature()'>Add Feature/Trait</button>
        </div>
        <popup @close='close()' v-if='pop'>
            <div class='popup long'>
                <h2>Edit Feature</h2>
                <h5>name:</h5><input class='input' v-model='featurearray[featid].name' type='text'>
                <h5>source:</h5><input class='input' v-model='featurearray[featid].source' type='text'>
                <h5>description:</h5><textarea  v-model='featurearray[featid].description'></textarea>
                <button @click='close()'>Save</button><button @click='del()'>Delete Feature</button>
            </div>
        </popup>
  </div>
</template>

<script>
import popup from '../../Popups/Popup'
import Feature from '../../../../../shared/classes/feature'
export default {
    props:['features'],
    components:{
        popup
    },
    data: function() {
        return {
            pop:false,
            featid:0,
            showid:-1

        }
    },
    computed: {
        featurearray: function() {
            if(typeof this.features != 'undefined') {
                return Array.from(this.features)
            }
            return new Array()
        }
    },
    methods: {
        toggleFeature(id) {
            if(this.showid == id) {
                this.showid = -1
            } else {
                this.showid = id
            }
        },
        edit(id){
            this.featid = id
            this.pop = true
        },
        close(){
            //save the updates
            this.pop=false
            this.update()
            
        },
        update() {
            var temp = {traits:{}}
            temp.traits[this.featid] = this.featurearray[this.featid]
            this.$emit('update',[{task:'update',data:temp}])
        },
        del() {
            var temp = {traits:[]}
            temp.traits.push(this.featid)
            this.$emit('update',[{task:'remove',data:temp}])
            this.pop=false
        },
        addfeature() {
            this.featurearray.push(new Feature('name','source',''))
            this.edit(this.featurearray.length-1)
            this.update()
            
        },
        drag(ev,id) {
            ev.dataTransfer.setData('id',id)
            ev.dataTransfer.setData('origin','features')
        },
        allowDrop(ev) {
            ev.preventDefault()
        },
        drop(ev,id) {
            if(ev.dataTransfer.getData('origin') === 'features') {
                let oldid = parseInt(ev.dataTransfer.getData('id'))
                this.insert(oldid,id)
            }
        },
        insert(oldid,id) {
            var remove = {traits:[]}
            remove.traits.push(oldid)
            var insert = {traits:{}}
            insert.traits[id] = this.features[oldid]
            this.$emit('update',[{task:'remove',data:remove},{task:'insert',data:insert}])
        },
    }
}
</script>

<style lang='scss' scoped>
@import '../../../scss/variables';
.scroll{
height:88%;
overflow-y:scroll;
}
.features{
    grid-column-start:7;
    grid-column-end:9;
    grid-row-start:3;
    grid-row-end:9;
    font-size:1vw;
    border:1px solid $border-color;
    border-radius:$border-radius;
    background-color:white;
}
.inner-features{
    position:relative;
    height:100%;
}
.feature-info{
    min-height:5px;
    overflow-x:hidden;
    position: relative;
    padding:0;
    margin:0;
}
.bottom-button{
    position:absolute;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
}
textarea{
    width:90%;
    height:40%;
    resize:none;
    font-size:0.8em;
}
.feature-details{
    white-space: pre-wrap;
}
.feature-info:nth-child(even){
    background-color:$list-dark;
}
.feature-info:hover{
    background-color:$selecting;
}
.feature-button{
    position:absolute;
    right:0;
    top:0;
    float:right;
}
@media only screen and (max-width:$medium-screen) {
    .features{
        grid-column-start:3;
        grid-column-end:5;
        grid-row-start:11;
        grid-row-end:17;  
        font-size:2vw;
    }
}
@media only screen and (max-width:$small-screen) {
    .features{
        grid-column-start:1;
        grid-column-end:3;
        grid-row-start:25;
        grid-row-end:31;  
        font-size:3.5vw;
    }
}
</style>