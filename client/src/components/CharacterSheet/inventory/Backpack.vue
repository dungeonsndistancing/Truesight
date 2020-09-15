<template>
    <div class='backpack'>
        <div class='inner'>
            <h2>Backpack</h2>
            <div class='item-container'>
                <div class='item-row'><h4>Name</h4><h4>Amount</h4><h4>Weight</h4></div>
                <div class='item-row' v-for='(item,id) in backpack' :key='id'>
                    <div>{{item.name}}</div> <div>{{item.count}}</div> <div>{{item.weight}}lbs</div>
                </div>
            </div>
            <div class='buttonclass'><button>Create new item</button></div>
        </div>
        <popup v-show='pop'>
            <div class='popup superlong'>
                <h5>Item kind:</h5><select name='items' id='items'>
              <option value='item'>Normal Item</option>
              <option value='magic item'>Magic Item</option>
              <option value='weapon'>Weapon</option>
              <option value='magic weapon'>Magic Weapon</option>
              <option value='armor'>Armor</option>
              <option value='magic armor'>Magic Armor</option>
            </select><br>
            Name: <input  type="text"><br>
            type: <input type="text"><br>
            cost: <input  type="text"><br>
            weight: <input type="text"><br>
            <p v-if='armor'>Armor Class: <input  type="text">
            Strength: <input type="number">
            Stealth: <input  type="text"></p>
            <p v-if='weapon'>Damage: <inputtype="text">
            Properties: <input  type="text"></p>
            <p v-if='magic'>Rarity: <input type="text">
            Attunement: <input  type="text"></p>
          description: <textarea>hi</textarea>
          <div class='icon-container'>
            <div>icon:
                <div class="iconselection">
            
                    <div class="iconshow">
                        <img class='iconimg' >
                        <img class='icondrop' src='../../../assets/dropdown.png'>
                    </div>
                    <div class="icondropdown" v-if="show">
                        <div class="iconcard"></div>
                        <div class="iconcard" v-for='x in iconarray' :key='x.name'><img v-bind:src="require(`../../../assets/icons/${x.path}`)" @click="select(x.path)"></div>
                    </div>
                </div>
            </div>
            <div class='colordiv'>
            color:<br> <input class='iconcolor' type="color">
            </div>
            <button @click='save()'>Save</button>
          </div>
            </div>
        </popup>
    </div>
</template>

<script>
import popup from '../../Popups/Popup'
export default {
    props:{
        backpack: Array,
    }, 
    data: function() {
        return{
            pop:true
        }
    },
    components: {
        popup
    }
}
</script>

<style scoped>
.buttonclass{
    position:absolute;
    bottom:0;
    left:0;
    right:0;
    margin:0 auto;
    width:50%;
}
.backpack{
    vertical-align: bottom;
    border:1px solid black;
    grid-column-start: 1;
    grid-column-end:3;
    grid-row-start:1;
    grid-row-end:9;
}

.item-row{
    height:3.5vh;
    text-align: left;
    display:grid;
    grid-template-columns: 6fr 2fr 2fr;
    line-height:3.5vh;

}
.item-row:nth-child(odd) {
    background-color:rgb(202, 202, 202);
}
h4{
    margin:0 0 0 0;
}
h2{
    margin:0;
}
.inner{
    height:100%;
    position: relative;
}
</style>