<template>
    <div class='container'>
      <div>name:<br><input class='input' v-model='editspell.name' type='text'></div>
      <div>level:<br><input class='input small' v-model='editspell.level' type='number'></div>
      <div>Casting time:<br><input class='input' v-model='editspell.castingtime' type='text'></div>
      <div>Duration:<br><input class='input' v-model='editspell.duration' type='text'></div>
      <div>Range/Area:<br><input class='input' v-model='editspell.distance' type='text'></div>
      <div>Attack/Save:<br><input class='input' v-model='editspell.attack' type='text'></div>
      <div>School:<br><input class='input' v-model='editspell.school' type='text'></div>
      <div>Damage/Effect:<br><input class='input' v-model='editspell.effect' type='text'></div>
      <div>Components:<br><input class='input' v-model='editspell.components' type='text'></div>
      <div>Concentration:<input class='input' v-model='editspell.concentration' type='checkbox'></div>
      <div>Description:<br><textarea v-model='editspell.description'></textarea></div>
      <div><button @click='save()'>Save</button><button @click='remove()'>Remove</button></div>
    </div>
</template>

<script>
import Spell from '../../../shared/classes/spell'
import spellservice from '../services/SpellService'
export default {
    props:['spell'],
    data: function() {
        return {
        editspell: new Spell('name',1,'casting time','duration','range','attack','school','effect','components','description',false)
        }
    },
    methods: {
        save(){
          spellservice.updateSpell(this.editspell)
          this.$router.push('/spells')
        },
        async getSpell() {
            this.editspell = Spell.from(await spellservice.getSpell(this.spell))
        },
        remove() {
          spellservice.removeSpell(this.editspell._id)
          this.$router.push('/spells')
        }
    },
    beforeMount() {
        this.getSpell()
    }

}
</script>

<style scoped>
.container{
  text-align:center;
  display:grid;
  min-width:50%;
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