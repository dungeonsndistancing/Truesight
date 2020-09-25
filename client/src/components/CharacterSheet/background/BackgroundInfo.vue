<template>
  <div class='backgroundinfo'>
      <div class='inner-info clickable' @click='traitshow = true'>
          <h3>Personality Traits</h3>
            <p v-if='!traitshow' v>{{backgroundinfo.traits}}</p>
            <div v-if='traitshow' class='edit-div'>
                <textarea v-model='backgroundinfo.traits' class='editable'>
                </textarea>
                <button @click.stop='traitshow=false;update("traits",backgroundinfo.traits)'>Save</button>
            </div>
        </div>
      <div class='inner-info clickable' @click='idealshow = true'>
          <h3>Ideals</h3>
            <p v-if='!idealshow' v>{{backgroundinfo.ideals}}</p>
            <div v-if='idealshow' class='edit-div'>
                <textarea v-model='backgroundinfo.ideals' class='editable'>
                </textarea>
                <button @click.stop='idealshow=false;update("ideals",backgroundinfo.ideals)'>Save</button>
            </div>
        </div>
      <div class='inner-info clickable' @click='bondshow = true'>
          <h3>Bonds</h3>
            <p v-if='!bondshow' v>{{backgroundinfo.bonds}}</p>
            <div v-if='bondshow' class='edit-div'>
                <textarea v-model='backgroundinfo.bonds' class='editable'>
                </textarea>
                <button @click.stop='bondshow=false;update("bonds",backgroundinfo.bonds)'>Save</button>
            </div>
        </div>
      <div class='inner-info clickable' @click='flawshow = true'>
          <h3>Flaws</h3>
            <p v-if='!flawshow' v>{{backgroundinfo.flaws}}</p>
            <div v-if='flawshow' class='edit-div'>
                <textarea v-model='backgroundinfo.flaws' class='editable'>
                </textarea>
                <button @click.stop='flawshow=false;update("flaws",backgroundinfo.flaws)'>Save</button>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    props:['backgroundinfo'],
    data: function(){
        return {
            traitshow:false,
            idealshow:false,
            bondshow:false,
            flawshow:false
        }
    },
    methods: {
        update(id,value) {
            var temp = {backgroundinfo:{}}
            temp.backgroundinfo[id] = value
            this.$emit('update',[{task:'update',data:temp}])
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../../../scss/variables';
.edit-div{
    height:100%;
    max-height: stretch;
}
.editable{
    font-size: 0.8vw;
    width:90%;
    height:50%;
    resize: none;
}
.backgroundinfo {
    padding:10px;
    background-color: rgb(211, 211, 211);
    grid-row-start: 2;
    grid-row-end:9;
    grid-column-start:3;
    grid-column-end:5;
    display:grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap:10px;
}
.inner-info{
    border:1px solid black;
    background-color:white;
}
@media only screen and (max-width:$small-screen) {
    .backgroundinfo {
        grid-row-start: 10;
        grid-row-end:17;
        grid-column-start:1;
        grid-column-end:3;
    }
}
</style>