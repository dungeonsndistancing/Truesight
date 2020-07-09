<template>
    <div class="container">
        <navbar/>
        <div class="content">
            <div class="charactercard" v-for="character in characters" :key="character._id" @click='loadCharacter(character)'>
                <div class="cardheader"><h1>{{ character.name }}</h1></div>
                <div class="details">
                    <p>class: {{character.class}}</p>
                    <p>level: {{character.level}}</p>
                </div>
            </div>
            <div class="charactercard" @click="makeCharacter">Make a new Character</div>
        </div>
    </div>
</template>
<script>
import navbar from '../components/NavBar'
import characterService from '../services/CharacterService'
export default {
    data: function() {
        return {
            characters: []
        }
    },
    components: {
        navbar
    }, 
    methods: {
        async getCharacters() {
            var temp = await characterService.getCharacters();
            if(temp == "disconnect") {
                this.$router.push('/')
            }
            this.characters = temp.data
        },
        makeCharacter() {
            this.$router.push('/charactercreator')
        },
        loadCharacter(char) {
            this.$router.push('/charsheet/'+char._id)
        }
    },beforeMount() {
        this.getCharacters()
    }

}
</script>

<style scoped>
.content{
    display:grid;
    grid-template-columns: auto auto;
}
.charactercard{
    height: 20vh;
    margin: 20px;
    border-style: none;
    border-radius: 20px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    overflow: hidden;
}
.cardheader{
    background-color: #214478;
    color: white;
    padding-top:0px;
    padding-left:0px;
    padding-right:0px;
}
h1 {
    margin:0px;
}
</style>