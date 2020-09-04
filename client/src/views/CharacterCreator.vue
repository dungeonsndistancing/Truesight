<template>
    <div class="container">
        <div class="savebutton">
            <h1>Save</h1>
            <button @click='save()'>Save</button>
        </div>
        <h1>Create your character</h1>         
        <div class='listorganizer'>
            <div class='list'>
                name:<input type='text' class='wide input topside' v-model='character.name'>
                <h1>Class</h1>
                Classname:<input type='text' class='wide input topside' v-model='character.class.name'><br>
                subclass:<input type='text' class='wide input' v-model='character.class.subclass'><br>
                level:<input type='number' class='small input' v-model='character.class.level'>

                hitdice: {{character.class.level}}d<input type='number' class='small input' v-model='character.class.hitdice.dice'><br>
                <h1>Description</h1>
                Race:<input type='text' class='wide input' v-model='character.race'><br>
                Background:<input type='text' class='wide input' v-model='character.background'><br>
                Alignment:<input type='text' class='small input' v-model='character.alignment'>
                Age:<input type='number' class='small input' v-model='character.looks.age'><br>
                Height:<input type='text' class='medium input' v-model='character.looks.height'>
                Weight:<input type='number' class='small input' v-model='character.looks.weight'><br>
                Eyes:<input type='text' class='medium input' v-model='character.looks.eyes'>
                Skin:<input type='text' class='medium input' v-model='character.looks.skin'><br>
                Hair:<input type='text' class='medium input' v-model='character.looks.hair'>

                <h1>Combat Stats</h1>
                ac:<input type='number' class='small input' v-model='character.ac'>
                initiative:<input type='number' class='small input' v-model='character.initiative'><br>
                speed:<input type='number' class='small input' v-model='character.speed'>
                max HP:<input type='number' class='small input' v-model='character.maxhp'><br>
                spell save:<input type='number' class='small input' v-model='character.spellsave'>
                spell attack:<input type='number' class='small input' v-model='character.spellattack'>
                <h1>Moneyz</h1>
                pp:<input type='number' class='small input' v-model='character.money.pp'>
                gp:<input type='number' class='small input' v-model='character.money.gp'>
                sp:<input type='number' class='small input' v-model='character.money.sp'>
                cp:<input type='number' class='small input' v-model='character.money.cp'>
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
                            <b>{{skill.name}}</b>
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
            <div class='proficiencies list'>
                <h1>Additional Proficiencies</h1>
                <div class='featurecard' v-for='proficiency in character.proficiencies' :key='proficiency.id'>
                    Name:<input class='wide input' type='text' v-model='proficiency.name'><br>
                    Description:<textarea v-model='proficiency.description'>hi</textarea>
                    <button @click='removeProficiency(proficiency)'>Remove Feature</button>
                </div>
                <button @click='newProficiency()'>Add Trait/Feature</button>
            </div>
        </div>
    </div>
</template>

<script>
import CharacterService from '../services/CharacterService'
import BackgroundInfo from '../../../shared/classes/stats/backgroundinfo'
import Skill from '../../../shared/classes/skill'
import Attribute from '../../../shared/classes/stats/attribute'
import SavingThrow from '../../../shared/classes/stats/savingthrow'
import Feature from '../../../shared/classes/feature'
import Money from '../../../shared/classes/money'
import Proficiency from '../../../shared/classes/proficiency'
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
                money:new Money(0,0,0,0),
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
                skills:[
                    new Skill('Acrobatics','dexterity',0),
                    new Skill('Animal Handling','wisdom',0),
                    new Skill('Arcana','intelligence',0),
                    new Skill('Athletics','strength',0),
                    new Skill('Deception','charisma',0),
                    new Skill('History','intelligence',0),
                    new Skill('Insight','wisdom',0),
                    new Skill('Intimidation','charisma',0),
                    new Skill('Investigation','intelligence',0),
                    new Skill('Medicine','wisdom',0),
                    new Skill('Nature','intelligence',0),
                    new Skill('Perception','wisdom',0),
                    new Skill('Performance','charisma',0),
                    new Skill('Persuasion','charisma',0),
                    new Skill('Religion','intelligence',0),
                    new Skill('Sleight of Hand','dexterity',0),
                    new Skill('Stealth','dexterity',0),
                    new Skill('Survival','wisdom',0)
                ],
                ac:10,
                initiative:0,
                movement:30,
                maxhp:0,
                currenthp:0,
                temporaryhp:0,
                spells:[],
                spellsave:0,
                spellattack:0,
                effects:[],
                proficiencies:[],
                backgroundinfo: new BackgroundInfo(),
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
        },
        newProficiency() {
            this.character.proficiencies.push(new Proficiency())
        },
        removeProficiency(proficiency) {
            var x = this.character.proficiencies.indexOf(proficiency)
            this.character.proficiencies.splice(x,1)
        },
        async save() {
            await CharacterService.makeCharacter(this.character)
            this.$router.push('/characters')
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
    width: 23em;
}
.features{
    width: 23em;
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
    margin:0.5em 0 0.5em 0;
    padding: 0;
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
.savebutton{
    position:fixed;
    bottom:0;
    right:0;
    border: 1px solid #e6e6e6;
    border-radius:15%;
}
</style>
