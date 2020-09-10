<template>
    <div class='features'>
        <h2>Features and Traits</h2>
        <div class='feature-info' v-for='feature in features' :key='feature.id'>
            <h3>{{feature.name}}</h3>
            <h5>{{feature.source}}</h5>
            <button @click='toggleFeature(feature)' class='feature-button' v-if='!feature.show'>+</button>
            <button @click='toggleFeature(feature)' class='feature-button' v-else>-</button>
            <div v-if='feature.show' class='feature-details'>
                <p>{{feature.description}}</p>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    props:['features'],
    methods: {
        toggleFeature(feature) {
            feature.show= !feature.show
            feature.name = feature.name + 'i'
            feature.name = feature.name.substring(0,feature.name.length-1)
            
        }
    }
}
</script>

<style>
.features{
    overflow-y:scroll;
    grid-column-start:5;
    grid-column-end:7;
    grid-row-start:3;
    grid-row-end:9;
    border:1px solid black;
}
.feature-info{
    position: relative;
    padding:0;
    margin:0.2em 0 0.2em 0;
    border-bottom:1px solid black;
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