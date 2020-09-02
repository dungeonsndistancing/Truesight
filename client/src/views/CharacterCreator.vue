<template>
    <div class="container">
        <form>
            name:<input type='text' v-model='character.name'><br>
            class<br>
            name:<input type='text' v-model='character.class.name'><br>
            subclass:<input type='text' v-model='character.class.subclass'><br>
            level:<input type='number' v-model='character.class.level'><br>
            hitdice:<input type='number' v-model='character.class.hitdice.dice'><br>
            



        </form>

    </div>
</template>

<script>
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
                    strength:{
                        base:8,
                        modifiers:[]
                    },
                    dexterity:{
                        base:8,
                        modifiers:[]
                    },
                    constitution:{
                        base:8,
                        modifiers:[]
                    },
                    intelligence:{
                        base:8,
                        modifiers:[]
                    },
                    wisdom:{
                        base:8,
                        modifiers:[]
                    },
                    charisma:{
                        base:8,
                        modifiers:[]
                    }
                },savingthrows:{
                    strength:{
                        proficient:0,
                        modifiers:[]
                    },
                    dexterity:{
                        proficient:0,
                        modifiers:[]
                    },
                    constitution:{
                        proficient:0,
                        modifiers:[]
                    },
                    intelligence:{
                        proficient:0,
                        modifiers:[]
                    },
                    wisdom:{
                        proficient:0,
                        modifiers:[]
                    },
                    charisma:{
                        proficient:0,
                        modifiers:[]
                    },
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

</style>