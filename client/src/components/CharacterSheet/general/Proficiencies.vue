<template>
  <div class='proficiencies'>
      <h2>Proficiencies</h2>
      <div class='prof-cont'>
          <div @click='edit(num)' class='prof clickable' v-for='(prof,num) in proficiencies' :key='prof.id'>
              <h3>{{prof.name}}</h3>
              <p>{{prof.description}}</p>
          </div>
      </div>
      <button @click='newProf()'>Add Proficiency</button>
      <popup v-if='pop' @close='close'>
          <div class='popup long'>
              <h3>Name:</h3>
              <input type='text' v-model = character.proficiencies[profnum].name><br>
              <h3>Content:</h3>
              <textarea v-model='character.proficiencies[profnum].description'></textarea>
              <button @click='close()'>Close</button><button @click='del()'>Delete Proficiencies</button>
          </div>
      </popup>

  </div>
</template>

<script>
import popup from '../../Popups/Popup'
export default {
    props:['character'],
    components: {
        popup
    },
    data: function() {
        return {
            pop:false,
            profnum:0
        }
    },
    computed: {
        proficiencies : function() {
            if(typeof this.character == 'undefined') {
                return []
            } else {
                return this.character.proficiencies
            }
        }
    },
    methods: {
        edit(num) {
            this.profnum = num
            this.pop = true
        },
        close() {
            this.$emit('update',{keys:['proficiencies'],values:[this.character.proficiencies]})
            this.pop = false
        },
        del() {
            this.character.removeProficiency(this.character.proficiencies[this.profnum])
            this.close()
        },
        newProf() {
            this.character.newProficiency()
            this.profnum=this.character.proficiencies.length-1
            this.pop=true
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../../../scss/variables';
.proficiencies{
    grid-column-start:7;
    grid-column-end:9;
    grid-row-start:1;
    grid-row-end:3;
    border:1px solid black;
    row-gap:0;
    column-gap:0;
    margin:0;
    padding:0;
    font-size:1vw;
}
.prof{
    min-height:20px;
    position:relative;
    margin:0em;
    padding: 0 50px 0 0;
}
.prof-cont{
    height:70%;
    overflow-y:scroll;
    margin:0;
}
.prof:nth-child(odd) {
    background-color:rgb(226, 226, 226);
}
textarea{
    width:90%;
    height:40%;
    resize:none;
}
p{
    margin:0;
}
h3{
    margin:0;
}
@media only screen and (max-width:$medium-screen) {
    .proficiencies{
        grid-column-start:3;
        grid-column-end:5;
        grid-row-start:9;
        grid-row-end:11;
        font-size:2vw;
    }
}
@media only screen and (max-width:$small-screen) {
    .proficiencies{
        grid-column-start:1;
        grid-column-end:3;
        grid-row-start:31;
        grid-row-end:33;
        font-size:3.5vw;
    }
    .prof-cont{
        height:65%;
    }
}
</style>