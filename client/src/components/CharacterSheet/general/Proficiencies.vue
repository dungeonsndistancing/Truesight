<template>
  <div class='proficiencies'>
        <div class='inner'>
        <h2>Proficiencies</h2>
        <div class='prof-cont'>
            <div @click='edit(num)' class='prof clickable' v-for='(prof,num) in character.proficiencies' :key='num'>
                <h3>{{prof.name}}</h3>
                <p>{{prof.description}}</p>
            </div>
        </div>
        <button class='bottom-button' @click='newProf()'>Add Proficiency</button>
      </div>
      <popup v-if='pop' @close='close'>
          <div class='popup long'>
              <h3>Name:</h3>
              <input class='input' type='text' v-model = proficiencies[profnum].name><br>
              <h3>Content:</h3>
              <textarea class='input' v-model='proficiencies[profnum].description'></textarea>
              <button @click='close()'>Save</button><button @click='del()'>Delete Proficiencies</button>
          </div>
      </popup>

  </div>
</template>

<script>
import popup from '../../Popups/Popup'
import Proficiency from '../../../../../shared/classes/proficiency'
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
                return Array.from(this.character.proficiencies)
            }
        }
    },
    methods: {
        edit(num) {
            this.profnum = num
            this.pop = true
        },
        close() {
            this.update()
            this.pop = false
        },
        update() {
            var temp = {proficiencies:{}}
            temp.proficiencies[this.profnum] = this.proficiencies[this.profnum]
            this.$emit('update',[{task:'update',data:temp}])
        },
        del() {
            var temp = {proficiencies:[]}
            temp.proficiencies.push(this.profnum)
            this.pop = false
            this.$emit('update',[{task:'remove',data:temp}])
        },
        newProf() {
            this.proficiencies.push(new Proficiency("name",""))
            this.profnum=this.proficiencies.length-1
            this.update()
            this.pop=true
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../../../scss/variables';
.inner{
    position: relative;
    height:100%;
}
.bottom-button{
    position: absolute;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
}
.proficiencies{
    grid-column-start:7;
    grid-column-end:9;
    grid-row-start:1;
    grid-row-end:3;
    border:1px solid $border-color;
    border-radius:$border-radius;
    background-color:white;
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
    height:68%;
    overflow-x:hidden;
    overflow-y:scroll;
    margin:0;
}
.prof:nth-child(odd) {
    background-color:$list-dark;
}
.prof:hover {
    background-color: $selecting;
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