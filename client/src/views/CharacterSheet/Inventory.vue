<template>
    <div class='inventory'>
        <backpack @remove='remove' @update='update' :inventory='inventory' />
        <equipped @remove='remove' @update='update' :inventory='inventory' />
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
    methods: {
        update(data) {
            this.$emit('update',data)
        },
        remove(data) {
            this.$emit('remove',data)
        }
    }
}
</script>

<style>

</style>