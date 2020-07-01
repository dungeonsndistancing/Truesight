<template>
    <div id="container">
        <navbar />
        <div>{{character}}HI</div>
    </div>
</template>

<script>
import navbar from '../components/NavBar'
import characterService from '../services/CharacterService'
export default {
    props: ['char'],
    components:{
        navbar
    },
    data: function() {
        return {
            character: null
            }
            
    },
    methods: {
        async getCharacter(id) {
            console.log(id)
            var temp = await characterService.getCharacter(id)
            if(temp == '401') {
                this.$router.push('/401')
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