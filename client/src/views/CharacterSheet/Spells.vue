<template>
  <div class='spells'>
      <known @update='update' :spells='spells'/>
  </div>
</template>

<script>
import known from '../../components/Spells/Known'
export default {
    props: {
        spells:Array
    },
    components: {
        known
    },
    methods: {
        update(data){
            this.$emit('update',data)
        }
    }
}
</script>

<style>

</style>