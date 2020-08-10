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
        <div class='item-card' v-for='item in items' :key='item._id'>
          <div class="icon"><img src='../assets/potion.png'></div>
          <div class="item-text">
            <p class="item-name">{{item.name}}</p>
            <p class="item-type">{{item.type}}</p>
          </div>
          <div class="item-button" @click="show(item)"><div v-if="!item.show">+</div><div v-if="item.show">-</div></div>
          <div class="item-content" v-if="item.show">
            <div class="item-top">
              <p>cost:{{item.cost}} weight:{{item.weight}} attributes:{{item.attributes}} </p>
            </div>
            <div class="item-bottom">
              {{item.description}}
            </div>
          </div>
        </div>
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
        items: [{show:true}],
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
    },
    show(item) {
      item.show = !item.show
      item._id +=0
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
.item-button{
  margin:0px;
  padding:0px;
  font-size:3em;
  float:right;
  color:rgb(85, 85, 85);
}
.item-button:hover {
  color:rgb(172, 172, 172);
}
.item-top{
  text-align-last: justify;

  padding:0.3em 0;
  margin-top:4em;
  border-top: 0.09em solid #e6e6e6;
  border-bottom: 0.09em solid #e6e6e6;

}
.item-top p {
  margin:0;
  padding:0;
}
.item-bottom{
  padding:0.3em 0;
  text-align:left;
}
.item-content{
  clear:both;
}
.item-text{
  float:left;
  margin-left:0.5em;

}
.item-name{
  padding:0;
  margin:0 0  0.2em 0;
  font-size:1.6em;
  font-weight: 700;
}
.item-type{
  padding:0;
  margin:0;
}
.icon{
  float:left;
  background-color: rgb(211, 62, 62);
  height:2.5em;
  width:2.5em;
  border-radius:0.5em;
  padding:0.5em;
}
.icon img{
  height:100%;
}
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
  min-height:3.5em;
  padding:0.3em;
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