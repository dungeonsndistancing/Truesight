<template>
  <div class='backstory clickable' @click='edit()'>
      <h3>Backstory</h3>
        <p class='info-text' v-if='!show'>{{backgroundinfo.backstory}}</p>
        <div class='edit-div' v-if='show'>
            <textarea class='edit' v-model='backgroundinfo.backstory'>
            </textarea>
            <button @click.stop='save()'> Save</button>
        </div>
  </div>
</template>

<script>
export default {
    props:['backgroundinfo'],
    data: function() {
        return {
            show:false
        }
    },
    methods: {
        update() {
            this.$emit('update',{keys:['backgroundinfo'],values:[this.backgroundinfo]})
        },
        edit() {
            this.show = true
        },
        save() {
            this.show = false
            this.update()
        }
    }
}
</script>

<style scoped>
.info-text {
    text-align: left;
    padding:10px;
}
.edit-div{
    height:100%;
}
.edit{
    font-size: 0.8vw;
    overflow-y: scroll;
    width:90%;
    height:90%;
    resize: none;
}
.backstory{
    border:1px solid black;
    grid-row-start: 2;
    grid-row-end:9;
    grid-column-start: 5;
    grid-column-end:7;
}
</style>