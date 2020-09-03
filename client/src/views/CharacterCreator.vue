<template>
    <div class="container">
        <h1>Create your character</h1>
        <div>
            name:<input type='text' v-model='character.name'><br>
        </div>
            
        <div class='listorganizer'>
            <div>
                <h1>Class</h1>
                name:<input type='text' class='wide input' v-model='character.class.name'><br>
                subclass:<input type='text' class='wide input' v-model='character.class.subclass'><br>
                level:<input type='number' class='small input' v-model='character.class.level'>
                hitdice:<input type='number' class='small input' v-model='character.class.hitdice.dice'><br>
                <h1>Combat Stats</h1>
                ac:<input type='number' class='small input' v-model='character.ac'>
                initiative:<input type='number' class='small input' v-model='character.initiative'><br>
                speed:<input type='number' class='small input' v-model='character.ac'>
                max HP:<input type='number' class='small input' v-model='character.maxhp'>
            </div>
            <div class='attributes'>
                <h1>Abilities</h1>
                <div v-for='(attribute,attributeid) in character.attributes' :key='attributeid'><b>{{attributeid}}</b><br>
                    Total:{{attribute.value}}<br>
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
            <div class='savingthrows'>
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
        </div>
    </div>
</template>

<script>
import Attribute from '../../../shared/classes/stats/attribute'
import SavingThrow from '../../../shared/classes/stats/savingthrow'
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
                    strength:new Attribute('str',8),
                    dexterity:new Attribute('dex',8),
                    constitution:new Attribute('con',8),
                    intelligence:new Attribute('int',8),
                    wisdom:new Attribute('wis',8),
                    charisma:new Attribute('cha',8),
                },savingthrows:{
                    strength: new SavingThrow(1),
                    dexterity: new SavingThrow(1),
                    constitution: new SavingThrow(1),
                    intelligence: new SavingThrow(1),
                    wisdom: new SavingThrow(1),
                    charisma: new SavingThrow(1),
                },
                skills:[],
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
                effects:[],
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
    }
}
</script>

<style scoped>
.input{
    border-radius:1em;
    border-style:solid;
    border-width: 1px;
    border-color:rgb(170, 170, 170);
    padding:0.5em;
    display: inline-block;
}
.small {
    width: 2em;
}
.medium {
    width:6em;
}
.wide{
    width: 10em;
}
.listorganizer{
    display:flex;
    justify-content: space-evenly;

}
.content-left{
    align-content: left;
    align-items: left;
    text-align: left;
}
</style>