class Item {
    constructor(item) {

        this.class = 'item'
        this.name = item.name
        this.type = item.type
        this.cost = item.cost
        this.weight = item.weight
        this.description = item.description
        this.icon = item.icon
        this.color = item.color
        this.count = item.count !== undefined ? item.count : 0
        this._id = item._id
    }
    display() {
        return {}
    }

    equals(item) {
        return this.name == item.name && this.type == item.type &&
            this.cost == item.cost && this.weight == item.weight &&
            this.description == item.description
    }
    static from(json) {
        return Object.assign(new Item(), json)
    }
}
module.exports = Item