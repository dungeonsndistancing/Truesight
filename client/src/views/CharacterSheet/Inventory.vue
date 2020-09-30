<template>
    <div class='inventory'>
        <backpack @move='move' @equip='equip' @update='update' :inventory='inventory' />
        <equipped @move='move' @unequip='unequip' @update='update' :inventory='inventory' />
        <weight :inventory='inventory'/>
        <attuned :inventory='inventory' />
    </div>
</template>

<script>
import backpack from '../../components/CharacterSheet/inventory/Backpack'
import equipped from '../../components/CharacterSheet/inventory/Equipped'
import weight from '../../components/CharacterSheet/inventory/Weight'
import attuned from '../../components/CharacterSheet/inventory/Attuned'
export default {
    props:{
        inventory:Object,
    },
    components:{
        backpack,
        equipped,
        weight,
        attuned
    },
    computed: {
        backpack: function() {
            if(typeof this.inventory !== 'undefined') {
                return Array.from(this.inventory.backpack)
            }
            return new Array()
        },
        equipped: function() {
            if(typeof this.inventory !== 'undefined') {
                return Array.from(this.inventory.equipped)
            }
            return new Array()
        }
    },
    methods: {
        update(data) {
            this.$emit('update',data)
        },
        async equip(id) {
            var add = {inventory:{equipped:{}}}
            add.inventory.equipped[this.equipped.length] = this.backpack[id]
            var remove = {inventory:{backpack:[]}}
            remove.inventory.backpack.push(id)
            await this.$emit('update',[{task:'update',data:add},{task:'remove',data:remove}])
        },
        async unequip(id) {
            var add = {inventory:{backpack:{}}}
            add.inventory.backpack[this.backpack.length] = this.equipped[id]
            var remove = {inventory:{equipped:[]}}
            remove.inventory.equipped.push(id)
            await this.$emit('update',[{task:'update',data:add},{task:'remove',data:remove}])         
        },
        move(ev,target,id) {
            let origin = ev.dataTransfer.getData('origin')
            let originid = parseInt(ev.dataTransfer.getData('id'))
            var remove = {inventory:{}}
            remove.inventory[origin] = []
            remove.inventory[origin].push(originid)
            var insert = {inventory:{}}
            insert.inventory[target] = {}
            insert.inventory[target][id] = this.inventory[origin][originid]
            this.$emit('update',[{task:'remove',data:remove},{task:'insert',data:insert}])
        }
    }
}
</script>

<style>

</style>