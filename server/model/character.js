const mongoose = require('mongoose')

const skills = {
    ACROBATICS: 'acrobatics',
    ANIMAL_HANDLING: 'animal handling',
    ARCANA: 'arcana',
    ATHLETICS: 'athletics',
    DECEPTION: 'deception',
    HISTORY: 'history',
    INSIGHT: 'insight',
    INTIMIDATION: 'intimidation',
    INVESTIGATION: 'investigation',
    MEDICINE: 'medicine',
    NATURE: 'nature',
    PERCEPTION: 'perception',
    PERFORMANCE: 'performance',
    PERSUASION: 'persuasion',
    RELIGION: 'religion',
    SLEIGHT_OF_HAND: 'sleight of hand',
    STEALTH: 'stealth',
    SURVIVAL: 'survival'
}

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
        hair:String
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
            proficient:Number,
            modifiers:[
                {
                    name:String,
                    value:Number,
                    source:String,
                }
            ]
        },
        dexterity: {
            proficient:Number,
            modifiers:[
                {
                    name:String,
                    value:Number,
                    source:String,
                }
            ]
        },
        constitution: {
            proficient:Number,
            modifiers:[
                {
                    name:String,
                    value:Number,
                    source:String,
                }
            ]
        },
        intelligence: {
            proficient:Number,
            modifiers:[
                {
                    name:String,
                    value:Number,
                    source:String,
                }
            ]
        },
        wisdom: {
            proficient:Number,
            modifiers:[
                {
                    name:String,
                    value:Number,
                    source:String,
                }
            ]
        },
        charisma: {
            proficient:Number,
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
            spell: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Spells'
            }
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
    },
    inventory:{
        backpack : [
            {
                name:String,
                description:String,
                weight:Number,
                type:String,
                count:Number,
                equipped:Boolean,
                battle_ready:Boolean,
                attuned:Boolean
            }
        ],
        equipped : [
            {
                name:String,
                description:String,
                weight:Number,
                type:String,
                count:Number,
                equipped:Boolean,
                battle_ready:Boolean,
                attuned:Boolean
            }
        ]
    },
    attacks:[
        {
            name:String,
            attack:String,
            damage:String
        }
    ]

})

characterSchema.statics.findByUser = async (userid) => {
    const char = await Character.find({user:userid})
    return char
}

characterSchema.statics.findSingleById = async (id) => {
    const char = await Character.findOne({_id:id})
    return char
}

const Character = mongoose.model("Character", characterSchema)
module.exports = Character