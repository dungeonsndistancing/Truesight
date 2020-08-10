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
        <div class="pageselector" v-for="n in totalpages" @click='update(n)' :key='n'> </div>
      </div>
      <div class='item-container'>
        <div v-for='item in items' :key='item._id'>{{item.name}}{{item.description}}</div>
      </div>
      <div class='page-container'>
        <div class="pageselector" v-for="n in totalpages" @click='update(n)' :key='n'> </div>
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
    } 
  }, beforeMount: async function() {
    this.totalitems = await itemService.getCount()
    this.totalpages = Math.ceil(this.totalitems/20)
    console.log(this.totalpages)
    this.getItems(this.querytext,this.curpage)
  }

}
</script>

<style>
.pageselector{
  width:20px;
  height:20px;
  background-color: blue;
}
</style>