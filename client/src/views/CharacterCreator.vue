<template>
    <div class="container">
        <h1>Create your character</h1>         
        <div class='listorganizer'>
            <div class='list'>
                name:<input type='text' class='wide input topside' v-model='character.class.name'><br>
                <h1>Class</h1>
                
                subclass:<input type='text' class='wide input' v-model='character.class.subclass'><br>
                level:<input type='number' class='small input' v-model='character.class.level'>
                hitdice:<input type='number' class='small input' v-model='character.class.hitdice.dice'><br>
                <h1>Description</h1>
                Race:<input type='text' class='wide input' v-model='character.race'><br>
                Background:<input type='text' class='wide input' v-model='character.background'><br>
                Alignment:<input type='text' class='small input' v-model='character.class.subclass'>
                Age:<input type='number' class='small input' v-model='character.looks.age'><br>
                Height:<input type='text' class='medium input' v-model='character.looks.height'>
                Weight:<input type='number' class='small input' v-model='character.looks.weight'><br>
                Eyes:<input type='text' class='medium input' v-model='character.looks.eyes'>
                Skin:<input type='text' class='medium input' v-model='character.looks.skin'><br>
                Hair:<input type='text' class='medium input' v-model='character.looks.hair'>

                <h1>Combat Stats</h1>
                ac:<input type='number' class='small input' v-model='character.ac'>
                initiative:<input type='number' class='small input' v-model='character.initiative'><br>
                speed:<input type='number' class='small input' v-model='character.ac'>
                max HP:<input type='number' class='small input' v-model='character.maxhp'><br>
                spell save:<input type='number' class='small input' v-model='character.spellsave'>
                spell attack:<input type='number' class='small input' v-model='character.spellattack'>
            </div>
            <div class='attributes list'>
                <h1>Abilities</h1>
                <div v-for='(attribute,attributeid) in character.attributes' :key='attributeid'><b>{{attributeid}}</b><br>
                    Total:{{attribute.value}}<i> Modifier:{{attribute.mod}}</i><br>
                    base:<input v-model='attribute.base' class='small input' type='number'>
                    <div v-for='mod in attribute.modifiers' :key='mod.eh'>
                        name:<input class='medium input' v-model='mod.name' type='text'><br>
                        value:<input class='medium input' v-model='mod.value' type='number'><br>
                        source:<input class='medium input' v-model='mod.source' type='text'><br>
                        <button @click='attribute.removemodifier(mod.name,mod.source)'>Remove Modifier</button>
                    </div><br>
                    <button @click='attribute.addmodifier("",0,"")'>Add Modifier</button>
                </div>
            </div>
            <div class='savingthrows list'>
                <h1>Saving Throws</h1>
                <div v-for='(savingthrow,throwid) in character.savingthrows' :key='throwid'><b>{{throwid}}</b><br>
                 Total:{{savingthrow.bonus(character.attributes[throwid].mod,character.proficiency)}}<br>
                    proficient?<input type='checkbox' v-model='savingthrow.proficiency'>
                    <div v-for='mod in savingthrow.modifiers' :key='mod.eh'>
                        name:<input class='medium input' v-model='mod.name' type='text'><br>
                        value:<input class='medium input' v-model='mod.value' type='number'><br>
                        source:<input  class='medium input' v-model='mod.source' type='text'><br>
                        <button @click='savingthrow.removemodifier(mod.name,mod.source)'>Remove Modifier</button>
                    </div><br>
                    <button @click='savingthrow.addmodifier("",0,"")'>Add Modifier</button>
                </div>
            </div>
            <div class='skills list'>
                <h1>Skills</h1>
                <div class='skillcontainer'>
                        <div class='skill' v-for='(skill,skillid) in character.skills' :key='skillid'>
                            <b>{{skillid}}</b>
                            <i>({{skill.ability.substring(0,3)}})</i><br>
                            <h4>Value: {{skill.value(character.attributes[skill.ability].mod,character.proficiency)}}</h4>
                            Proficient?<input type='checkbox' v-model='skill.proficiency'>
                            <div v-for='mod in skill.modifiers' :key='mod.eh'>
                                name:<input class='medium input' v-model='mod.name' type='text'><br>
                                value:<input class='medium input' v-model='mod.value' type='number'><br>
                                source:<input  class='medium input' v-model='mod.source' type='text'><br>
                                <button @click='skill.removemodifier(mod.name,mod.source)'>Remove Modifier</button>
                            </div><br>
                            <button @click='skill.addmodifier("",0,"")'>Add Modifier</button>
                        </div>
                </div>
            </div>
            <div class='features list'>
                <h1>Traits & Features</h1>
                <div class='featurecard' v-for='trait in character.traits' :key='trait'>
                    Name:<input class='wide input' type='text' v-model='trait.name'><br>
                    Source:<input class='wide input' type='text' v-model='trait.source'><br>
                    Description:<textarea v-model='trait.description'>hi</textarea>
                    <button @click='removeFeature(trait)'>Remove Feature</button>
                </div>
                <button @click='newFeature()'>Add Trait/Feature</button>
            </div>
        </div>
    </div>
</template>

<script>
import BackgroundInfo from '../../../shared/classes/stats/backgroundinfo'
import Skill from '../../../shared/classes/skill'
import Attribute from '../../../shared/classes/stats/attribute'
import SavingThrow from '../../../shared/classes/stats/savingthrow'
import Feature from '../../../shared/classes/feature'
export default {
    data: function() {
        return{
            character:{
                name:'',
                class: {
                    name:'',
                    subclass:'',
                    level:1,
                    hitdice:{
                        maximum:1,
                        current:1,
                        dice:8
                    }
                },
                looks: {
                    age:0,
                    weight:0,
                    height:'',
                    eyes:'',
                    skin:'',
                    hair:''
                },
                traits:[],
                counters:[],
                race:'',
                background:'',
                alignment:'',
                experience:0,
                money:{
                    platinum:0,
                    gold:0,
                    silver:0,
                    copper:0
                },
                proficiency:2,
                attributes:{
                    strength:new Attribute('str',10),
                    dexterity:new Attribute('dex',10),
                    constitution:new Attribute('con',10),
                    intelligence:new Attribute('int',10),
                    wisdom:new Attribute('wis',10),
                    charisma:new Attribute('cha',10),
                },savingthrows:{
                    strength: new SavingThrow(0),
                    dexterity: new SavingThrow(0),
                    constitution: new SavingThrow(0),
                    intelligence: new SavingThrow(0),
                    wisdom: new SavingThrow(0),
                    charisma: new SavingThrow(0),
                },
                skills:{
                    acrobatics: new Skill('dexterity',0),
                    animalhandling: new Skill('wisdom',0),
                    arcana: new Skill('intelligence',0),
                    athletics: new Skill('strength',0),
                    deception: new Skill('charisma',0),
                    history: new Skill('intelligence',0),
                    insight: new Skill('wisdom',0),
                    intimidation: new Skill('charisma',0),
                    investigation: new Skill('intelligence',0),
                    medicine: new Skill('wisdom',0),
                    nature: new Skill('intelligence',0),
                    perception: new Skill('wisdom',0),
                    performance: new Skill('charisma',0),
                    persuasion: new Skill('charisma',0),
                    religion: new Skill('intelligence',0),
                    sleightofhand: new Skill('dexterity',0),
                    stealth: new Skill('dexterity',0),
                    survival: new Skill('wisdom',0)
                },
                ac:{
                    base:10,
                    bonuses: []
                },
                initiative:{
                    bonuses:[]
                },
                movement:30,
                maxhp:0,
                currenthp:0,
                temporaryhp:0,
                spells:[],
                spellsave:0,
                spellattack:0,
                effects:[],
                backgroundinfo: new BackgroundInfo(),
                notes:'',
                ideals:'',
                bonds:'',
                flaws:'',
                story:'',
                features:'',
                trinket:'',
                inventory:[],
                attacks:[]
            }
        }
    },
    methods: {
        newFeature() {
            this.character.traits.push(new Feature())
        },
        removeFeature(trait) {
            var x = this.character.traits.indexOf(trait)
            this.character.traits.splice(x,1)
        }
    }
}
</script>

<style scoped>
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
.topside{
    margin-top:5%;
    margin-bottom:-3%;
}
.skills{
    width: 30em;
}
.features{
    width: 35em;
}
.featurecard{
    padding:0.3em 0 0.8em 0;
    border-bottom:1px solid rgb(170, 170, 170);
}
.skill{
    width:45%;
    float:left;
}
.skillcontainer{

    justify-content: space-around;
    width:100%;
    height:80%;
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
    margin:0.5em;
}
textarea{
    border-radius:1em;
    padding:1em;
    height:10em;
    width:90%;
    resize: none;
    border-color:rgb(170, 170, 170);
}
.content-left{
    align-content: left;
    align-items: left;
    text-align: left;
}
h4{
    font-size:11pt;
    margin:0;
    padding:0;
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