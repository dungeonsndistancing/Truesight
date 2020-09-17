<template>
  <div id="spells">
    <div class="container">
      <div class='search-container'>
      <form @submit.prevent=getSpells>
        <input type='text' id='searchquery' v-model='querytext' placeholder='search based on name, type, attributes..'>
        <button type='submit'>Search</button>
        <input type='button' value='Create Spell' @click="load('/newspell')">
        <input type='checkbox' v-model='editable' @change='getSpells()'> Edit my entries
      </form>
      </div>
      <div class='page-container'>
        <div class="pageselector" v-for="n in totalpages" @click='update(n)' :key='n' :class="{selected: isActive(n)}">{{n}} </div>
      </div>

      <div class='spell-container'>
        <div class='spell-card' v-for='spell in spells' :class='{extended:spell.show}' :key='spell._id' @click="show(spell)">
          <div class="card-org">
            <div class="spell-button"><div @click='load(`/editspell/${spell._id}`)' v-if='editable'>edit</div></div>
            <div class="spell-text">
            
              <div class="spell-name">{{spell.name}}<img class='concentration' v-if='spell.concentration' src='../assets/icons/concentration.svg'></div>
              <div class="spell-type">{{spell.level}}<i v-if="spell.level == parseInt(1)" >st</i>
        <i v-else-if="(spell.level > 3 && spell.level < 21)" >th</i>
        <i v-else-if="spell.level == 2">nd</i>
        <i v-else>rd</i>
         level {{spell.school}} <i>({{spell.components}})</i></div>
            </div>
          </div>
          <div class="spell-content" v-if="spell.show">
            <div class="spell-top">
              <b>Casting time:</b>{{spell.castingtime}} <b>Duration:</b>{{spell.duration}}
               <b>Distance/Area:</b>{{spell.distance}} <b>Attack/Save:</b>{{spell.attack}}
               <b>Damage/Effect:</b>{{spell.effect}}
            </div>
            <div class="spell-bottom">
              {{spell.description}}
            </div>
          </div>
        </div>
      </div>
      <div class='page-container'>
        <div class="pageselector" v-for="n in totalpages" @click='update(n)' :key='n' :class="{selected: isActive(n)}">{{n}} </div>
      </div>
      <div class='vertfil'></div>
    </div>
  </div>
</template>

<script>
import spellService from '../services/SpellService'
import Spell from '../../../shared/classes/spell'
export default {
  data: function () {
      return {
        spells: [],
        curpage: 1,
        totalspells: 0,
        totalpages:1,
        querytext: '',
        editable: false
      }
  },
  methods: {
    async getSpells() {
      this.spells = []
      var temp = await spellService.getSpells(this.querytext,this.curpage,this.editable)
      for(var i = 0; i < temp.length; i++) {
        let spell = Spell.from(temp[i])
        this.spells.push(spell)
      }
    
    },
    async update(page) {
      this.curpage = page
      await this.getSpells()
    },
    isActive(n) {
      return n == this.curpage
    },
    show(spell) {
      spell.show = !spell.show
      spell._id += '1'
      spell._id = spell._id.substring(0, spell._id.length -1)
    },load(url) {
      this.$router.push(url)
    }
  }, beforeMount: async function() {
    this.totalspells = await spellService.getCount()
    this.totalpages = Math.ceil(this.totalspells/20)
    
    this.getSpells(this.querytext,this.curpage)
  }

}
</script>

<style scoped>
.concentration{
  height:0.7em;
  padding-top:0.2em;
  margin-left:0.2em;
}
.vertfil{
  flex:1;
  background-color: #f9f9f9ff;
}
.search-container{
  padding: 1.5em;
}
input[type=button], button{
  background-color: rgb(212, 212, 212);
  padding:0.2em 0.5em;
  margin:0.5em 1em;
  font-size:1.2em;
  border-style: solid;
  border-width:1px;
  border-color: rgb(226, 226, 226);
  border-radius:0.5em;
}
input[type=button]:hover, button:hover{
background-color: rgb(231, 231, 231);
border-style:solid;
border-width:1px;
}
input[type=text]{
  margin: 0.5em 1em;
  padding:0.1em 0.5em;
  font-size:1.2em;
  border-width:1px;
  border-color:rgb(209, 209, 209);
  border-style:solid;
  border-radius: 0.5em;
}
.spell-button{
  line-height:3.5em;
  float:right;
  margin:0px;
  padding:0em 1em;
  font-size:1em;
  color:rgb(85, 85, 85);
}
.spell-button:hover {
  color:rgb(172, 172, 172);
}
.spell-top{
  text-align:left;
  padding:0.3em 0;
  margin-top:0.95em;
  border-top: 0.09em solid #e6e6e6;
  border-bottom: 0.09em solid #e6e6e6;

}
.spell-top p {
  margin:0;
  padding:0;
}
.spell-bottom{
  padding:0.3em 0;
  white-space: pre-wrap;
  text-align:left;
}
.spell-content{
  clear:both;
}
.spell-text{
  display: block;
  padding:0em 0.5em;
  text-align: left;
}
.spell-name{
  max-width:100%;
  max-height:1.2em;
  overflow: hidden;
  padding:0;
  font-size:1.5em;
  font-weight: 700;
}
.spell-type{
  padding:0;
  margin:0;
}

#items{
  min-height:calc(100vh - 50px);
  flex:1;
  margin:0;
  padding:0;
  background-color: #f9f9f9ff;
}
.container{
  margin:auto;
  max-width:90%;
  width:1000px;
}
.pageselector{
  line-height: 2em;
  padding:0;
  margin:0.5em;
  width:2em;
  height:2em;
  background-color: rgb(158, 158, 158);
  display:inline-block;
  border-radius:0.3em;
}
.spell-container{
  justify-items: center;
  grid-template-columns: 50fr 50fr;
  display:grid;
}
.spell-extra{
  display:flex;
  flex-wrap:wrap;
}
.spell-extra div {
  padding: 1px 5px 1px 5px;
}
.spell-card{
  background-color: white;
  max-height:3.5em;
  padding:0.2em;
  margin:5px;
  width:96%;
  border-style: solid;
  border-color: #e6e6e6;
  border-radius:0.7em;
  border-width:0.09em;
}
.extended {
  max-height:fit-content;
}
.spell-card:hover{
  -webkit-box-shadow: 2px 3px 10px -5px rgba(0,0,0,0.75);
  -moz-box-shadow: 2px 3px 10px -5px rgba(0,0,0,0.75);
  box-shadow: 2px 3px 10px -5px rgba(0,0,0,0.75);
}
.selected{
  background-color: rgb(216, 216, 216);
  border-style: solid;
  border-color: rgb(158, 158, 158);
  border-width: 1px;
}

@media only screen and (max-width: 1100px) {
  .spell-container{
    grid-template-columns: 100fr;
  }
}
</style>