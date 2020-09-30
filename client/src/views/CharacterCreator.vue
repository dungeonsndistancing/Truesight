<template>
    <div class="container">

        <h1>Create your character</h1>         
        <div class='listorganizer'>
            <generalInfo :character='character' class='lista' />
            <div class="savebutton">
                <h1>Save</h1>
            <button @click='save()'>Save</button>
        </div>
        </div>
    </div>
</template>

<script>
import generalInfo from '../components/CharacterCreator/GeneralInfo'
import CharacterService from '../services/CharacterService'
import Character from '../../../shared/classes/character'
export default {
    data: function() {
        return{
            character: new Character()
        }
    },
    components: {
        generalInfo,
    },
    methods: {
        async save() {
            await CharacterService.makeCharacter(this.character)
            this.$router.push('/characters')
        }
    }
}

</script>
<style scoped>
.skills{
    width: 23em;
}
.features{
    width: 23em;
}

.skill{
    width:45%;
    float:left;
}
.listorganizer{
    justify-content:space-around;

}
.attributes, .savingthrows{
    width:13em;
}

.lista{
    overflow-x:hidden;
    overflow-y:scroll;
    margin:0.5em 0 0.5em 0;
    padding: 0;
}
.content-left{
    align-content: left;
    align-items: left;
    text-align: left;
}
::-webkit-scrollbar {
    /* //Width of vertical scroll bar */
    width: 8px;
    /* // Height of horizontal scroll bar */
    height: 10px;

  }
  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: #c2c9d2;
  }
</style>
