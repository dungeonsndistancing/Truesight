<template>
    <div class='features'>
        <h2>Features and Traits</h2>
        <div class='scroll'>
            <div @click='toggleFeature(feature)' class='feature-info clickable' v-for='(feature,id) in features' :key='feature.id'>
                <h3>{{feature.name}}</h3>
                <h5>{{feature.source}}</h5>
                <div v-if='feature.show' class='feature-details'>
                    <p>{{feature.description}}</p>
                    <button class='feature-button' @click.stop='edit(id)'>edit</button>
                </div>
            </div>
        </div>
        <button @click='addfeature()'>Add Feature/Trait</button>
        <popup @close='close()' v-if='pop'>
            <div class='popup long'>
                <h2>Edit Feature</h2>
                <h5>name:</h5><input v-model='features[featid].name' type='text'>
                <h5>source:</h5><input v-model='features[featid].source' type='text'>
                <h5>description:</h5><textarea v-model='features[featid].description'></textarea>
                <button @click='close()'>Save</button><button @click='del()'>Delete Feature</button>
            </div>
        </popup>
  </div>
</template>

<script>
import popup from '../Popups/Popup'
import Feature from '../../../../shared/classes/feature'
export default {
    props:['features'],
    components:{
        popup
    },
    data: function() {
        return {
            pop:false,
            featid:0,

        }
    },
    methods: {
        toggleFeature(feature) {
            feature.show= !feature.show
            feature.name = feature.name + 'i'
            feature.name = feature.name.substring(0,feature.name.length-1)  
        },
        edit(id){
            this.featid = id
            this.pop = true
        },
        close(){
            //save the updates
            this.$emit('update',{keys:['traits'],values:[this.features]})
            this.pop=false
        },
        del() {
            this.features.splice(this.featid,1)
            this.close()
        },
        addfeature() {
            this.features.push(new Feature('name','source',''))
            this.edit(this.features.length-1)
        }
    }
}
</script>

<style scoped>
.scroll{
height:90%;
overflow-y:scroll;
}
.features{
    grid-column-start:7;
    grid-column-end:9;
    grid-row-start:3;
    grid-row-end:9;
    border:1px solid black;
}
.feature-info{
    min-height:5px;
    position: relative;
    padding:0;
    margin:0;
}
textarea{
    width:90%;
    height:40%;
    resize:none;
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
h3, h5{
    padding:0px;
    margin:0em;
}
</style>