<template>
    <div class='inventory'>
        <backpack @update='update' :backpack='inventory.backpack' />
        <equipped @update='update' :equipped='inventory.equipped' />
    </div>
</template>

<script>
import backpack from '../../components/CharacterSheet/inventory/Backpack'
import equipped from '../../components/CharacterSheet/inventory/Equipped'
export default {
    props:{
        inventory:Object,
    },
    components:{
        backpack,
        equipped
    },
    methods: {
        update(data) {
            this.$emit('update',data)
        }
    }
}
</script>

<style>

</style>