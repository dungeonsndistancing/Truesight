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
        pp: {
            type: Number
        },
        gp: {
            type: Number
        },
        sp: {
            type: Number
        },
        cp: {
            type: Number
        }
    },
    weight: {
        type: Number,
    },
    description: {
        type: String,
        require: [true, "items need descriptions!"]

    },
    properties: [
        {
           name: {
               type: String
           },
           details: {
               type: String
           }
        }
    ]

})

itemSchema.statics.findByName = async (name) => {
    const regex = "/" + name +"/i"
    const items = await Item.find({name:regex})
    return items

}


const Item = mongoose.model("Item", itemSchema)
module.exports = Item