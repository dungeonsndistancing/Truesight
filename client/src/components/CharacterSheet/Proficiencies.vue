<template>
  <div class='proficiencies'>
      <h2>Proficiencies</h2>
      <div class='prof-cont'>
          <div @click='edit(num)' class='prof clickable' v-for='(prof,num) in character.proficiencies' :key='prof.id'>
              <h3>{{prof.name}}</h3>
              {{prof.description}}
          </div>
      </div>
      <button>Add Proficiency</button>
      <popup v-if='pop' @close='close'>
          <div class='popup long'>
              <h3>Name:</h3>
              <input type='text' v-model = character.proficiencies[profnum].name><br>
              <h3>Content:</h3>
              <textarea v-model='character.proficiencies[profnum].description'></textarea>
              <button @click='close()'>Save</button><button @click='del()'>Delete Proficiencies</button>
          </div>
      </popup>

  </div>
</template>

<script>
import popup from '../Popups/Popup'
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
    methods: {
        edit(num) {
            this.profnum = num
            this.pop = true
        },
        close() {
            this.pop = false
        },
        del() {
            this.pop = false
            this.character.removeProficiency(this.character.proficiencies[this.profnum])
        }
    }
}
</script>

<style>
.proficiencies{
    grid-column-start:7;
    grid-column-end:9;
    grid-row-start:1;
    grid-row-end:3;
    border:1px solid black;
}
.prof{
    position:relative;
    margin:0.1em;
    padding: 0 50px 0 0;
}
.prof-cont{
    height:70%;
    overflow-y:scroll;
}
.prof:nth-child(odd) {
    background-color:rgb(226, 226, 226);
}
.edit-button{
    position:absolute;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
    height:30px;
}
textarea{
    width:90%;
    height:40%;
    resize:none;
}
</style>