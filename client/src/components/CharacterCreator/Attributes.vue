<template>
    <div class='attributes' ref='attributelist'>
    <h1>Attributes</h1>
    <div v-for='(attribute,attributeid) in attributes' :key='attributeid'><b>{{attributeid}}</b><br>
        Total:{{attribute.value}}<i> Modifier:{{attribute.mod}}</i><br>
        base:<input v-model='attribute.base' class='small input' type='number'>
        <div v-for='mod in attribute.modifiers' :key='mod.eh'>
            name:<input class='medium input' v-model='mod.name' type='text'><br>
            value:<input class='medium input' v-model='mod.value' type='number'><br>
            source:<input class='medium input' v-model='mod.source' type='text'><br>
            <button @click='attribute.removemodifier(mod.name,mod.source)'>Remove Modifier</button>
        </div><br>
        <button @click='resetFocus();attribute.addmodifier("",0,"");'>Add Modifier</button>
    </div>
</div>
</template>

<script>
export default {
    props:['attributes'],
    methods: {
        resetFocus() {
            console.log(this.$refs.attributelist.$children)
        }
    }
}
</script>

<style>
</style>