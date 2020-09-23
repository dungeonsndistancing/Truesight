const mongoose = require('mongoose')

const characterSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "You need a name, silly!"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    cclass: {
        name:{
            type: String
        },
        subclass:{
            type: String
        },
        level: {
            type: Number
        },
        hitdice: {
            current:{type:Number},
            dice:{type:Number}
        }
        
    },
    looks: {
        age:Number,
        weight:Number,
        height:String,
        eyes:String,
        skin:String,
        hair:String,
        description:String
    },
    traits:[
        {
            name:{type:String},
            description:{type:String},
            source:{type:String}
        }
    ],
    counters:[
        {
            name:String,
            max:Number,
            current:Number
        }
    ],
    race:{type:String},
    background:{type:String},
    alignment:{type:String},
    experience:{type:Number},
    money:{
        pp:{type:Number},
        gp:{type:Number},
        sp:{type:Number},
        cp:{type:Number}
    },
    proficiency: { type: Number },
    attributes: {
        strength: {
            name: String,
            base:Number,
            modifiers:[
                {
                    name:String,
                    value:Number,
                    source:String,
                }
            ]
        },
        dexterity: {            
            name: String,
            base:Number,
            modifiers:[
                {
                    name:String,
                    value:Number,
                    source:String,
                }
            ]
        },
        constitution: {
            name: String,
            base:Number,
            modifiers:[
                {
                    name:String,
                    value:Number,
                    source:String,
                }
            ]
        },
        intelligence: {
            name: String,
            base:Number,
            modifiers:[
                {
                    name:String,
                    value:Number,
                    source:String,
                }
            ]
        },
        wisdom: {
            name: String,
            base:Number,
            modifiers:[
                {
                    name:String,
                    value:Number,
                    source:String,
                }
            ]
        },
        charisma: {
            name: String,
            base:Number,
            modifiers:[
                {
                    name:String,
                    value:Number,
                    source:String,
                }
            ]
        }

    },
    savingthrows: {
        strength: {
            proficiency:Number,
            modifiers:[
                {
                    name:String,
                    value:Number,
                    source:String,
                }
            ]
        },
        dexterity: {
            proficiency:Number,
            modifiers:[
                {
                    name:String,
                    value:Number,
                    source:String,
                }
            ]
        },
        constitution: {
            proficiency:Number,
            modifiers:[
                {
                    name:String,
                    value:Number,
                    source:String,
                }
            ]
        },
        intelligence: {
            proficiency:Number,
            modifiers:[
                {
                    name:String,
                    value:Number,
                    source:String,
                }
            ]
        },
        wisdom: {
            proficiency:Number,
            modifiers:[
                {
                    name:String,
                    value:Number,
                    source:String,
                }
            ]
        },
        charisma: {
            proficiency:Number,
            modifiers:[
                {
                    name:String,
                    value:Number,
                    source:String,
                }
            ]
        }
    },skills: [
        {      
            name: String,
            ability: String,
            proficiency: Number,
            modifiers:[
                {
                    name:String,
                    value:Number,
                    source:String,
                }
            ]
        }
    ],
    ac: Number,
    initiative:Number,
    movement:Number,
    maxhp:Number,
    currenthp:Number,
    temporaryhp:Number,
    spells: [
        {
            name:String,
            level:Number,
            castingtime:String,
            duration:String,
            distance:String,
            attack:String,
            school:String,
            effect:String,
            components:String,
            description:String,
            concentration:Boolean,
            prepared:Boolean
        }
    ],
    spellsave:Number,
    spellattack:Number,
    effects:[
        {
            icon:String,
            name:String,
            description:String
        }
    ],
    proficiencies:[
        {
            name: String,
            description: String
        }
    ],
    backgroundinfo: {
        ideals:String,
        bonds:String,
        flaws:String,
        story:String,
        features:String,
        trinket:String,
        allies:String,
        backstory:String,
        traits:String
    },
    inventory:{
        backpack : [
            {
                class:String,
                name:String,
                description:String,
                weight:Number,
                cost:String,
                type:{type:String},
                icon:String,
                color:String,
                rarity:String,
                attunement:String,
                ac:String,
                strength:Number,
                damage:String,
                properties:String,
                stealth:String,
                count:Number,
                attuned:Boolean
            }
        ],
        equipped : [
            {
                class:String,
                name:String,
                description:String,
                weight:Number,
                cost:String,
                type:{type:String},
                icon:String,
                color:String,
                rarity:String,
                attunement:String,
                ac:String,
                strength:Number,
                damage:String,
                properties:String,
                stealth:String,
                count:Number,
                attuned:Boolean
            }
        ]
    },
    attacks:[
        {
            name:String,
            attack:String,
            damage:String,
            extra:String
        }
    ],
    saves:{
        succes:Number,
        failure:Number
    }

})

characterSchema.statics.findByUser = async (userid) => {
    const char = await Character.find({user:userid})
    return char
}

characterSchema.statics.findSingleById = async (id) => {
    const char = await Character.findOne({_id:id})
    console.log('found char')
    return char
}

const Character = mongoose.model("Character", characterSchema)
module.exports = Character