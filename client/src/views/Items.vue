<template>
  <div id="items">
    <div class="container">
      <div class='search-container'>
      <form @submit.prevent=getItems>
        <input type='text' id='searchquery' v-model='querytext' placeholder='search based on name, type, attributes..'>
        <button type='submit'>Search</button>
        <input type='button' value='Create Item'>
      </form>
      </div>
      <div class='page-container'>
        <div class="pageselector" v-for="n in totalpages" @click='update(n)' :key='n' :class="{selected: isActive(n)}">{{n}} </div>
      </div>
      <div class='item-container'>
        <div class='item-card' v-for='item in items' :key='item._id'>{{item.name}}{{item.description}}</div>
      </div>
      <div class='page-container'>
        <div class="pageselector" v-for="n in totalpages" @click='update(n)' :key='n' :class="{selected: isActive(n)}">{{n}} </div>
      </div>
    </div>
  </div>
</template>

<script>
import itemService from '../services/ItemService'
export default {
  data: function () {
      return {
        items: [],
        curpage: 1,
        totalitems: 0,
        totalpages:1,
        querytext: ''
      }
  },
  methods: {
    async getItems() {
      console.log(this.curpage)
      this.items = await itemService.getItems(this.querytext,this.curpage)
    
    },
    async update(page) {
      this.curpage = page
      await this.getItems()
      console.log('updated')
    },
    isActive(n) {
      return n == this.curpage
    }
  }, beforeMount: async function() {
    this.totalitems = await itemService.getCount()
    this.totalpages = Math.ceil(this.totalitems/20)
    console.log(this.totalpages)
    this.getItems(this.querytext,this.curpage)
  }

}
</script>

<style scoped>
#items{
  margin:0;
  padding:0;
  background-color: #f9f9f9ff;
}
.container{
  margin:auto;
  max-width:90%;
  width:1000px;
}
.pageselector{
  line-height: 2em;
  padding:0;
  margin:0.5em;
  width:2em;
  height:2em;
  background-color: rgb(158, 158, 158);
  display:inline-block;
  border-radius:0.3em;
}
.item-container{
  justify-items: center;
  margin:1em 2em;
  grid-template-columns: 50fr 50fr;
  display:grid;
}
.item-card{
  background-color: white;
  height:2.5em;
  padding:0.5em;
  margin:5px;
  width:90%;
  border-style: solid;
  border-color: #e6e6e6;
  border-radius:0.7em;
  border-width:0.09em;
}
.selected{
  background-color: rgb(216, 216, 216);
  border-style: solid;
  border-color: rgb(158, 158, 158);
  border-width: 1px;
}
</style>