const Item = require('./items/item')
const Armor = require('./items/armor') 
const Weapon = require('./items/weapon') 
const MagicItem = require('./items/magicitem') 
const MagicArmor = require('./items/magicarmor') 
const MagicWeapon = require('./items/magicweapon') 
module.exports.parse= (json) => {
    switch(json.class) {
        case "item":
          return new Item(json)

        case 'armor':
          return new Armor(json)

        case 'weapon':
          return new Weapon(json)

        case 'magicitem':
            return new MagicItem(json)

        case 'magicarmor':
            return new MagicArmor(json)

        case 'magicweapon':
            return  new MagicWeapon(json)

        default:
            return new Item(json)

      }
}