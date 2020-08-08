<template>
    <div id="container">
        <div>{{character}}HI</div>
    </div>
</template>

<script>
import characterService from '../services/CharacterService'
export default {
    props: ['char'],
    data: function() {
        return {
            character: null
            }
            
    },
    methods: {
        async getCharacter(id) {
            console.log(id)
            var temp = await characterService.getCharacter(id)
            if(temp == '403') {
                this.$router.push('/403')
            }
            this.character = temp;
        }

    },beforeMount() {
        console.log(this.char)
        this.getCharacter(this.char)
    }
}
</script>

<style scoped>

</style>