<template>
    <div class='features'>
        <h2>Features and Traits</h2>
        <div class='scroll'>
            <div @click='toggleFeature(id)' class='feature-info clickable' v-for='(feature,id) in features' :key='feature.id'>
                <h3>{{feature.name}}</h3>
                <h5>{{feature.source}}</h5>
                <div v-if='showid == id' class='feature-details'>
                    <p>{{feature.description}}</p>
                    <button class='feature-button' @click.stop='edit(id)'>edit</button>
                </div>
            </div>
        </div>
        <button @click='addfeature()'>Add Feature/Trait</button>
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
            console.log("TOGGLING")
            if(this.showid == id) {
                console.log('off')
                this.showid = -1
            } else {
                console.log('on')
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
            var tempfeatures = {}
            tempfeatures[this.featid] = this.featurearray[this.featid]
            this.$emit('update',{keys:['traits'],values:[tempfeatures]})
        },
        del() {
            this.$emit('remove',{keys:['traits'],values:[this.featid]})
            this.pop=false
        },
        addfeature() {
            this.featurearray.push(new Feature('name','source',''))
            this.edit(this.featurearray.length-1)
            this.update()
            
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../../../scss/variables';
.scroll{
height:90%;
overflow-y:scroll;
}
.features{
    grid-column-start:7;
    grid-column-end:9;
    grid-row-start:3;
    grid-row-end:9;
    font-size:1vw;
    border:1px solid black;
}
.feature-info{
    min-height:5px;
    overflow-x:hidden;
    position: relative;
    padding:0;
    margin:0;
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
    background-color:rgb(226, 226, 226);
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