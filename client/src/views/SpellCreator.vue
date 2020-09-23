<template>
    <div class='container'>
      <div>name:<br><input class='input' v-model='spell.name' type='text'></div>
      <div>level:<br><input class='input small' v-model='spell.level' type='number'></div>
      <div>Casting time:<br><input class='input' v-model='spell.castingtime' type='text'></div>
      <div>Duration:<br><input class='input' v-model='spell.duration' type='text'></div>
      <div>Range/Area:<br><input class='input' v-model='spell.distance' type='text'></div>
      <div>Attack/Save:<br><input class='input' v-model='spell.attack' type='text'></div>
      <div>School:<br><input class='input' v-model='spell.school' type='text'></div>
      <div>Damage/Effect:<br><input class='input' v-model='spell.effect' type='text'></div>
      <div>Components:<br><input class='input' v-model='spell.components' type='text'></div>
      <div>Concentration:<input class='input' v-model='spell.concentration' type='checkbox'></div>
      <div>Description:<br><textarea v-model='spell.description'></textarea></div>
      <div><button @click='save()'>Save</button></div>
    </div>
</template>

<script>
import Spell from '../../../shared/classes/spell'
import spellservice from '../services/SpellService'
export default {
  data: function() {
    return {
      spell: new Spell('name',1,'casting time','duration','range','attack','school','effect','components','description',false)
    }
  },
  methods: {
    save(){
      spellservice.saveSpell(this.spell)
      this.$router.push('/spells')
    }
  }
}
</script>

<style scoped>
.container{
  text-align:center;
  background-color:red;
  display:grid;
  min-width:50%;
  width:400px;
  grid-template-columns: 1fr;
}
h3{
  margin:0;
}
textarea{
  width:50%;
  height:20vh;
  resize: none;
}
</style>