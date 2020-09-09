<template>
    <div class="container">
        <div class="savebutton">
            <h1>Save</h1>
            <button @click='save()'>Save</button>
        </div>
        <h1>Create your character</h1>         
        <div class='listorganizer'>
            <generalInfo :character='character' class='list' />
            <attributes :attributes='character.attributes' class='list attributes' />
            <savingthrows :character='character' class='list savingthrows' />
            <skills :character='character' class='list skills' />
            <features :character='character' class='features list' />
            <proficiencies :character='character' class='proficiencies list' />
        </div>
    </div>
</template>

<script>
import generalInfo from '../components/CharacterCreator/GeneralInfo'
import attributes from '../components/CharacterCreator/Attributes'
import savingthrows from '../components/CharacterCreator/SavingThrows'
import skills from '../components/CharacterCreator/Skills'
import features from '../components/CharacterCreator/Features'
import proficiencies from '../components/CharacterCreator/Proficiencies'
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
        attributes,
        savingthrows,
        skills,
        features,
        proficiencies
    },
    methods: {
        async save() {
            await CharacterService.makeCharacter(this.character)
            this.$router.push('/characters')
        }
    }
}

</script>
<style>
.input{
    border-radius:1em;
    border-style:solid;
    border-width: 1px;
    border-color:rgb(170, 170, 170);
    padding:0.1em 0.3em 0.1em 0.3em;
    display: inline-block;
}
.small {
    width: 2.5em;
}
.medium {
    width:6em;
}
.wide{
    width: 10em;
}
.list{
    border-radius:1%;
    overflow-x:hidden;
      border-style: solid;
     border-color: #e6e6e6;
    border-radius:0.7em;
    border-width:0.09em;
    height:80vh;
    overflow-y:scroll;
    margin:0.5em 0 0.5em 0;
    padding: 0;
}
.topside{
    margin-top:5%;
    margin-bottom:-3%;
}
h4{
    font-size:11pt;
    margin:0;
    padding:0;
}
textarea{
    border-radius:1em;
    padding:1em;
    height:10em;
    width:90%;
    resize: none;
    border-color:rgb(170, 170, 170);
}
</style>
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
    display:flex;
    flex-wrap: wrap;
    justify-content:space-around;

}
.attributes, .savingthrows{
    width:13em;
}

.list{
    border-radius:1%;
    overflow-x:hidden;
    border-style: solid;
    border-color: #e6e6e6;
    border-radius:0.7em;
    border-width:0.09em;
    height:80vh;
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
.savebutton{
    position:fixed;
    bottom:0;
    right:0;
    border: 1px solid #e6e6e6;
    border-radius:15%;
}
</style>
