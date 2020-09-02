const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "items need names"]
    },
    class: String,
    type: {
        type: String
    },
    cost: {
        type: String
    },
    weight: {
        type: Number,
    },
    description: {
        type: String,
        require: [true, "items need descriptions!"]

    },
    ac: String,
    strength: Number,
    stealth: String,
    damage: String,
    properties: String,
    rarity: String,
    attunement: String,
    attuned: Boolean,
    icon: {
        type: String
    },
    color: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },


})

itemSchema.statics.findByName = async (name,page,editable,user) => {
    var options = {}
    console.log(editable)
    if(name != undefined) {
        options.name = {$regex:name.toLowerCase(), $options: 'i'}
    }
    if(editable == 'true'){
        options.user = user
    }
    console.log(options)
    const items = await Item.find(options).skip((page-1)*20).limit(20)
    return items
}
itemSchema.statics.itemCount = async() => {
    return (await Item.find()).length
}


const Item = mongoose.model("Item", itemSchema)
module.exports = Item