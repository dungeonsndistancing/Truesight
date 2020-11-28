<template>
  <div class="backpack">
    <div class="inner">
      <h2>Backpack</h2>
      <div
        class="item-container"
        @dragover="allowDrop($event)"
        @drop.self="drop($event, backpack.length)"
      >
        <div class="item-row">
          <h4>Name</h4>
          <h4>Amount</h4>
          <h4>Weight</h4>
        </div>
        <div
          class="item-row"
          draggable
          @click="show(id)"
          v-for="(item, id) in backpack"
          :key="id"
          @dragover="allowDrop($event)"
          @dragstart="drag($event, id)"
          @drop="drop($event, id)"
        >
          <div style="text-align: left">{{ item.name }}</div>
          <div class="itemcount" @click.stop="showcount(id)">
            {{ item.count }}
            <div
              v-if="countid == id"
              @click.stop="showcount(id)"
              class="countedit"
            >
              <input
                type="number"
                @click.stop=""
                v-model="item.count"
                class="input small"
              />
              <button
                @click.stop="
                  showcount(id);
                  update(id, item);
                "
              >
                save
              </button>
            </div>
          </div>

          <div style="text-align: right">{{ item.weight }} lbs</div>
          <div v-if="showid == id" class="iteminfo">
            <div
              class="extraitem"
              v-for="(info, id) in item.display()"
              :key="id"
            >
              <b>{{ id }}:</b>{{ info }}
            </div>
            <p class="item-description">{{ item.description }}</p>
            <div>
              <button @click.stop="equipItem(id)">Equip</button>
              <button
                v-if="typeof item.attunement !== 'undefined' && !item.attuned"
                @click.stop="attuneItem(id)"
              >
                Attune
              </button>
              <button
                v-if="typeof item.attunement !== 'undefined' && item.attuned"
                @click.stop="unattuneItem(id)"
              >
                Un-Attune
              </button>
              <button @click.stop="editItem(id)">Edit</button>
            </div>
          </div>
        </div>
      </div>
      <div class="buttonclass">
        <button @click="createItem()">Create new item</button>
        <div class="itemcreator" v-if="pop">
          <h5>Item kind:</h5>
          <select
            class="input"
            name="items"
            @change="updateType()"
            v-model="typestring"
            id="items"
          >
            <option value="item">Normal Item</option>
            <option value="armor">Armor</option>
            <option value="weapon">Weapon</option>
            <option value="magic item">Magic Item</option>
            <option value="magic weapon">Magic Weapon</option>
            <option value="magic armor">Magic Armor</option></select
          ><br />
          <h5>Name:</h5>
          <input class="input wide" v-model="item.name" type="text" />
          <h5>type:</h5>
          <input class="input wide" v-model="item.type" type="text" />
          <h5>cost:</h5>
          <input class="input wide" v-model="item.cost" type="text" />
          <h5>weight:</h5>
          <input class="input wide" v-model="item.weight" type="number" />
          <div v-if="armor">
            <h5>Armor Class:</h5>
            <input class="input wide" v-model="item.ac" type="text" />
            <h5>Strength:</h5>
            <input class="input wide" v-model="item.strength" type="number" />
            <h5>Stealth:</h5>
            <input class="input wide" v-model="item.stealth" type="text" />
          </div>
          <div v-if="weapon">
            <h5>Damage:</h5>
            <input class="input wide" v-model="item.damage" type="text" />
            <h5>Properties:</h5>
            <input class="input wide" v-model="item.properties" type="text" />
          </div>
          <div v-if="magic">
            <h5>Rarity:</h5>
            <input class="input wide" v-model="item.rarity" type="text" />
            <h5>Attunement:</h5>
            <input class="input wide" v-model="item.attunement" type="text" />
          </div>
          <h5>description:</h5>
          <textarea v-model="item.description">hi</textarea>
          <button @click="saveItem()">Save</button>
          <button v-if="!editing" @click="cancel()">Cancel</button>
          <button v-if="editing" @click="removeItem()">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import icons from '../assets/icons.json'
import Item from "../../../../../shared/classes/items/item";
import Weapon from "../../../../../shared/classes/items/weapon";
import Armor from "../../../../../shared/classes/items/armor";
import MagicItem from "../../../../../shared/classes/items/magicitem";
import MagicWeapon from "../../../../../shared/classes/items/magicweapon";
import MagicArmor from "../../../../../shared/classes/items/magicarmor";
export default {
  props: {
    inventory: Object,
  },
  data: function () {
    return {
      pop: false,
      showid: -1,
      countid: -1,
      item: new Item("name", "type", "cost", 0, "description", "icon", "color"),
      editid: -1,
      magic: false,
      weapon: false,
      armor: false,
      typestring: String,
      editing: false,
    };
  },
  computed: {
    backpack: function () {
      if (typeof this.inventory !== "undefined") {
        return Array.from(this.inventory.backpack);
      }
      return new Array();
    },
  },
  methods: {
    close() {
      this.pop = false;
    },
    show(id) {
      if (this.showid == id) {
        this.showid = -1;
      } else {
        this.showid = id;
      }
    },
    showcount(id) {
      if (this.countid == id) {
        this.countid = -1;
      } else {
        this.countid = id;
      }
    },
    editItem(id) {
      this.editid = id;
      this.item = this.backpack[id];
      this.editing = true;
      this.pop = true;
    },
    removeItem() {
      this.remove(this.editid);
      this.editid = -1;
      this.close();
    },
    createItem() {
      this.pop = true;
      this.item = new Item(
        "name",
        "type",
        "cost",
        0,
        "description",
        "icon",
        "color"
      );
    },
    saveItem() {
      if (!this.editing) {
        this.item.count = 1;
        this.update(this.backpack.length, this.item);
      } else {
        this.update(this.editid, this.item);
        this.editid = -1;
        this.editing = false;
      }

      this.editing = false;
      this.pop = false;
    },
    equipItem(id) {
      this.$emit("equip", id);
      this.showid = -1;
    },
    attuneItem(id) {
      this.backpack[id].attuned = true;
      this.update(id, this.backpack[id]);
    },
    unattuneItem(id) {
      this.backpack[id].attuned = false;
      this.update(id, this.backpack[id]);
    },
    update(id, item) {
      var temp = { inventory: { backpack: {} } };
      temp.inventory.backpack[id] = item;
      this.$emit("update", [{ task: "update", data: temp }]);
    },
    remove(id) {
      var temp = { inventory: { backpack: [] } };
      temp.inventory.backpack.push(id);
      this.$emit("update", [{ task: "remove", data: temp }]);
    },
    cancel() {
      this.item = new Item(
        "name",
        "type",
        "cost",
        0,
        "description",
        "icon",
        "color"
      );
      this.editing = false;
      this.pop = false;
    },
    updateType() {
      if (this.typestring.includes("magic")) {
        this.magic = true;
        if (this.typestring.includes("weapon")) {
          this.weapon = true;
          this.armor = false;
          this.item = new MagicWeapon(this.item);
        } else {
          this.weapon = false;
          if (this.typestring.includes("armor")) {
            this.item = new MagicArmor(this.item);
            this.armor = true;
          } else {
            this.armor = false;
            this.item = new MagicItem(this.item);
          }
        }
      } else {
        this.magic = false;
        if (this.typestring.includes("weapon")) {
          this.weapon = true;
          this.armor = false;
          this.item = new Weapon(this.item);
        } else {
          this.weapon = false;
          if (this.typestring.includes("armor")) {
            this.item = new Armor(this.item);
            this.armor = true;
          } else {
            this.armor = false;
            this.item = new Item(this.item);
          }
        }
      }
    },
    drag(ev, id) {
      ev.dataTransfer.setData("id", id);
      ev.dataTransfer.setData("origin", "backpack");
    },
    allowDrop(ev) {
      ev.preventDefault();
    },
    drop(ev, id) {
      if (ev.dataTransfer.getData("origin") === "backpack") {
        let oldid = parseInt(ev.dataTransfer.getData("id"));
        if (Math.abs(oldid - id) === 1) this.swap(oldid, id);
        else if (oldid != id) this.insert(oldid, id);
      } else {
        this.$emit("move", ev, "backpack", id);
      }
    },
    insert(oldid, id) {
      var remove = { inventory: { backpack: [] } };
      remove.inventory.backpack.push(oldid);
      var insert = { inventory: { backpack: {} } };
      insert.inventory.backpack[id] = this.backpack[oldid];
      this.$emit("update", [
        { task: "remove", data: remove },
        { task: "insert", data: insert },
      ]);
    },
    swap(oldid, id) {
      var temp = { inventory: { backpack: {} } };
      temp.inventory.backpack[oldid] = this.backpack[id];
      temp.inventory.backpack[id] = this.backpack[oldid];
      this.$emit("update", [{ task: "update", data: temp }]);
    },
  },
};
</script>

<style lang='scss' scoped>
@import "../../../scss/variables";
.extraitem {
  display: inline-block;
  margin: 0 0.5em;
}
.buttonclass {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100%;
}
.itemcount {
  position: relative;
}
.itemcreator {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 90%;
  border: 1px solid black;
  background-color: white;
  z-index: 4;
}
.countedit {
  padding: 50px;
  width: 9em;
  padding: 0;
  margin: 0;
  border-radius: 1vw;
  background-color: rgb(231, 231, 231);
  float: left;
  position: absolute;
  height: 2em;
  bottom: 1px;
  left: -10px;
  z-index: 3;
}
.backpack {
  vertical-align: bottom;
  border: 1px solid $border-color;
  border-radius: $border-radius;
  background-color: white;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 9;
}
// #items{
//     font-size:1vw;
// }
.item-row {
  position: relative;
  text-align: center;
  display: grid;
  grid-template-columns: 6fr 2fr 2fr;
  line-height: 1.5em;
  padding: 0 1vw;
}
.iteminfo {
  background-color: inherit;
  width: 100%;
  top: 3vh;
  z-index: 2;
  grid-column-start: 1;
  grid-column-end: 4;
}
.item-row:nth-child(even) {
  background-color: $list-dark;
}
.item-row:nth-child(odd) {
  background-color: white;
}
.item-row:hover {
  background-color: $selecting;
}
h4 {
  margin: 0 0 0 0;
}
h2 {
  margin: 0;
}
.inner {
  height: 100%;
  position: relative;
}
.item-container {
  overflow-y: scroll;
  height: 85%;
  padding-bottom: 1em;
}
textarea {
  width: 90%;
  height: 15vh;
  resize: none;
}
.item-description {
  text-align: left;
  line-height: 1em;
  white-space: pre-wrap;
  border-bottom: 1px solid black;
}
</style>