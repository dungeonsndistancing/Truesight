<template>
	<div id="items">
		<div class="container">
			<div class='search-container'>
			<form @submit.prevent=getItems>
				<input type='text' id='searchquery' v-model='querytext' placeholder='search based on name, type, attributes..'>
				<button type='submit'>Search</button>
				<input type='button' value='Create Item' @click="load('/newitem')">
				<input type='checkbox' v-model='editable' @change='getItems()'> Edit my entries
			</form>
			</div>
			<div class='page-container'>
				<div class="pageselector" v-for="n in totalpages" @click='update(n)' :key='n' :class="{selected: isActive(n)}">{{n}} </div>
			</div>

			<div class='item-container'>
				<div class='item-card' v-for='(item,id) in items' :class='{extended:item.show}' :key='item._id' @click="show(item)">
					<div class="card-org">
						<div class="icon" :style="{backgroundColor:item.color}"><img :src='require(`../assets/icons/items/${item.icon}`)'></div>
						<div class="item-button">
							<div @click='load(`/edititem/${item._id}`)' v-if='editable'>edit</div>
							<div @click.stop='addtoCharacter(id)' v-if='!editable'>Add to Character</div>
							</div>
						<div class="item-text">
							<div class="item-name">{{item.name}}</div>
							<div class="item-type">{{item.type}}</div>
						</div>
					</div>
					<div class="item-content" v-if="item.show">
						<div class="item-top">
							<p>cost:{{item.cost}} weight:{{item.weight}}</p>
							
						</div>
							<div class="item-top">
							<div class='item-extra'><div v-for='[key,value] in Object.entries(item.display())' :key='key'><b>{{key}}:</b><i>{{value}}</i></div></div>
							
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
			<div class='vertfil'></div>
		</div>
		<div v-if='addshow' class='popup'>
			Add {{items[adding].name}} to <br>
			<select class='input wide' v-model='selected'>
				<option :value='id' v-for='(character,id) in characters' :key='id'>{{character.name}}{{character.class}}</option>
			</select><br>
			Amount:<input class='input small' v-model='itemamount'><br>
			<button @click.stop='save()'>Save</button><button @click.stop='cancel()'>Cancel</button>
		</div>
		</div>
</template>

<script>
import itemService from '../services/ItemService'
import itemparser from '../../../shared/classes/itemparser'
import characterService from '../services/CharacterService'
export default {
	data: function () {
			return {
				items: [],
				characters: [],
				curpage: 1,
				totalitems: 0,
				totalpages:1,
				querytext: '',
				editable: false,
				addshow: false,
				selected: 0,
				adding: -1,
				itemamount:1
			}
	},
	methods: {
		async getItems() {
			this.items = []
			var temp = await itemService.getItems(this.querytext,this.curpage,this.editable)
			for(var i = 0; i < temp.length; i++) {
				var x = temp[i]
				let item = itemparser.parse(x)

				this.items.push(item)
			}
		
		},
		async update(page) {
			this.curpage = page
			await this.getItems()
		},
		async getCharacters() {
			this.characters = await characterService.getCharacters()
		},
		isActive(n) {
			return n == this.curpage
		},
		show(item) {
			item.show = !item.show
			item._id += '1'
			item._id = item._id.substring(0, item._id.length -1)
		},load(url) {
			this.$router.push(url)
		},
		addtoCharacter(id) {
			this.adding = id
			this.addshow = true
		},
		cancel() {
			this.adding = -1
			this.addshow = false
		},
		async save() {
			var char = await characterService.getCharacter(this.characters[this.selected]._id)
			this.items[this.adding].count = this.itemamount
			char.inventory.backpack.push(this.items[this.adding])
			char._id = this.characters[this.selected]._id
			await characterService.updateCharacter(char)
			this.adding = -1
			this.addshow = false

		}
	}, beforeMount: async function() {
		this.totalitems = await itemService.getCount()
		this.totalpages = Math.ceil(this.totalitems/20)
		this.getCharacters()
		this.getItems(this.querytext,this.curpage)
	}

}
</script>

<style scoped>
.popup {
	border:1px solid rgb(212, 212, 212);
	padding:0.5em;
	position: absolute;
	left:0;
	right:0;
	top:0;
	bottom:0;
	height:20vh;
	width:20vw;
	background-color:white;
	margin:auto;
}
.vertfil{
	flex:1;
	background-color: #f9f9f9ff;
}
.search-container{
	padding: 1.5em;
}
input[type=button], button{
	background-color: rgb(212, 212, 212);
	padding:0.2em 0.5em;
	margin:0.5em 1em;
	font-size:1.2em;
	border-style: solid;
	border-width:1px;
	border-color: rgb(226, 226, 226);
	border-radius:0.5em;
}
input[type=button]:hover, button:hover{
background-color: rgb(231, 231, 231);
border-style:solid;
border-width:1px;
}
input[type=text]{
	margin: 0.5em 1em;
	padding:0.1em 0.5em;
	font-size:1.2em;
	border-width:1px;
	border-color:rgb(209, 209, 209);
	border-style:solid;
	border-radius: 0.5em;
}
.item-button{
	line-height:3.5em;
	float:right;
	margin:0px;
	padding:0em 1em;
	font-size:1em;
	color:rgb(85, 85, 85);
}
.item-button:hover {
	color:rgb(172, 172, 172);
}
.item-top{
	text-align-last: justify;
	padding:0.3em 0;
	margin-top:0.95em;
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
	display: block;
	padding-left:3.65em;
	text-align: left;
}
.item-name{
	max-width:100%;
	max-height:1.2em;
	overflow: hidden;
	padding:0;
	font-size:1.5em;
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
	min-height:calc(100vh - 50px);
	flex:1;
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
	grid-template-columns: 50fr 50fr;
	display:grid;
}
.item-extra{
	display:flex;
	flex-wrap:wrap;
}
.item-extra div {
	padding: 1px 5px 1px 5px;
}
.item-card{
	background-color: white;
	max-height:3.5em;
	padding:0.2em;
	margin:5px;
	width:96%;
	border-style: solid;
	border-color: #e6e6e6;
	border-radius:0.7em;
	border-width:0.09em;
}
.extended {
	max-height:fit-content;
}
.item-card:hover{
	-webkit-box-shadow: 2px 3px 10px -5px rgba(0,0,0,0.75);
	-moz-box-shadow: 2px 3px 10px -5px rgba(0,0,0,0.75);
	box-shadow: 2px 3px 10px -5px rgba(0,0,0,0.75);
}
.card-org{
	max-height:3.5em;
}
.selected{
	background-color: rgb(216, 216, 216);
	border-style: solid;
	border-color: rgb(158, 158, 158);
	border-width: 1px;
}

@media only screen and (max-width: 1100px) {
	.item-container{
		grid-template-columns: 100fr;
	}
}
</style>