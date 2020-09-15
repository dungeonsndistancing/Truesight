const Item = require('./items/item')
const Armor = require('./items/armor') 
const Weapon = require('./items/weapon') 
const MagicItem = require('./items/magicitem') 
const MagicArmor = require('./items/magicarmor') 
const MagicWeapon = require('./items/magicweapon') 
module.exports.parse= (json) => {
    switch(json.class) {
        case "item":
          return Item.from(json)

        case 'armor':
          return Armor.from(json)

        case 'weapon':
          return Weapon.from(json)

        case 'magicitem':
            return MagicItem.from(json)

        case 'magicarmor':
            return MagicArmor.from(json)

        case 'magicweapon':
            return  MagicWeapon.from(json)

        default:
            return Item.from(json)

      }
}