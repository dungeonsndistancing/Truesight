<template>
    <div class="container">
        <div class="content">
            <div class="charactercard" v-for="character in characters" :key="character._id" @click='loadCharacter(character)'>
                <div class="cardheader"><h1>{{ character.name }}</h1></div>
                <div class="details">
                    <p>class: {{character.cclass.name}}</p>
                    <p>level: {{character.cclass.level}}</p>
                </div>
            </div>
            <div class="charactercard" @click="makeCharacter">Make a new Character</div>
        </div>
    </div>
</template>
<script>
import characterService from '../services/CharacterService'
export default {
    data: function() {
        return {
            characters: []
        }
    },
    methods: {
        async getCharacters() {
            var temp = await characterService.getCharacters();
            if(temp == "disconnect") {
                this.$router.push('/')
            }
            this.characters = temp
        },
        makeCharacter() {
            this.$router.push('/charactercreator')
        },
        loadCharacter(char) {
            this.$router.push('/charsheet/'+char._id + '/general')
        }
    },beforeMount() {
        this.getCharacters()
    }

}
</script>

<style lang='scss' scoped>
@import '../scss/variables';
.container{
    height:100%;
    background-color:rgb(247, 247, 247);
}
.content{
    display:grid;
    grid-template-columns: 1fr 1fr;
}
.charactercard{
    height: 8em;
    margin: 20px;
    border-style: none;
    border-radius: 20px;
    border:2px solid rgb(182, 182, 182);
    background-color:white;
    overflow: hidden;
}
.charactercard:hover{
    background-color:rgb(230, 230, 230);
}
.cardheader{
    border-bottom: 2px solid rgb(182, 182, 182);
    padding-top:0px;
    padding-left:0px;
    padding-right:0px;
}
h1 {
    margin:0px;
}
@media screen and (max-width:$small-screen) {
    .content{
        font-size:2.5vw;
    }
    h1{
        font-size:4vw;
    }

}
</style>