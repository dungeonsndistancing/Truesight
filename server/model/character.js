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
    traits:[
        {
            name:{type:String},
            description:{type:String},
            source:{type:String}
        }
    ],
    counters:[
        {
            name:{type:String},
            description:{type:String},
            source:{type:String}
        }
    ],
    race:{type:String},
    background:{type:String},
    alignment:{type:String},
    experience:{type:Number},
    money:{
        platinum:{type:Number},
        gold:{type:Number},
        silver:{type:Number},
        copper:{type:Number}
    },
    proficiency: { type: Number },
    attributes: {
        strength: {
            base:Number,
            modifiers:[
                {
                    name:String,
                    value:Number
                }
            ]
        },
        dexterity: {            
            base:Number,
            modifiers:[
                {
                    name:String,
                    value:Number
                }
            ]},
        constitution: {
            base:Number,
            modifiers:[
                {
                    name:String,
                    value:Number
                }
            ]
        },
        intelligence: {
            base:Number,
            modifiers:[
                {
                    name:String,
                    value:Number
                }
            ]
        },
        wisdom: {
            base:Number,
            modifiers:[
                {
                    name:String,
                    value:Number
                }
            ]
        },
        charisma: {
            base:Number,
            modifiers:[
                {
                    name:String,
                    value:Number
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
                    value:Number
                }
            ]
        },
        dexterity: {
            proficient:Number,
            modifiers:[
                {
                    name:String,
                    value:Number
                }
            ]
        },
        constitution: {
            proficient:Number,
            modifiers:[
                {
                    name:String,
                    value:Number
                }
            ]
        },
        intelligence: {
            proficient:Number,
            modifiers:[
                {
                    name:String,
                    value:Number
                }
            ]
        },
        wisdom: {
            proficient:Number,
            modifiers:[
                {
                    name:String,
                    value:Number
                }
            ]
        },
        charisma: {
            proficient:Number,
            modifiers:[
                {
                    name:String,
                    value:Number
                }
            ]
        }
    },skills: [
        {      
            name: String,
            modifier: String,
            proficient: Number,
            modifiers:[
                {
                    name:String,
                    count:Number
                }
            ]
        }
    ],
    ac: {
        base:Number,
        bonuses: [
            {
                name: String,
                count:Number
            }
        ]
    },
    initiative: {
        bonuses:[
            {
                name:String,
                count:Number
            }
        ]
    },
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
    effects:[
        {
            icon:String,
            name:String,
            description:String
        }
    ],
    notes: String,
    proficiencies:[
        {
            name: String,
            description: String
        }
    ],
    ideals:String,
    bonds:String,
    flaws:String,
    story:String,
    features:String,
    trinket:String,
    inventory:[
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