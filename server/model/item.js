const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "items need names"]
    },
    type: {
        type: String
    },
    cost: {
        type: String
    },
    weight: {
        type: String,
    },
    description: {
        type: String,
        require: [true, "items need descriptions!"]

    },
    notes: [
        {
            type: String
        }
    ],
    attribute: {
        type: String
    },
    icon: {
        type: String
    },
    color: {
        type: String
    }


})

itemSchema.statics.findByName = async (name,page) => {
    if(name != undefined) {
        const items = await Item.find({name:{$regex:name.toLowerCase(), $options: 'i'}}).skip((page-1)*20).limit(20)
        return items
    } else {
        const items = await Item.find().skip((page-1)*20).limit(20)
        return items
    }
}
itemSchema.statics.itemCount = async() => {
    return (await Item.find()).length
}


const Item = mongoose.model("Item", itemSchema)
module.exports = Item