<template>
  <div class='looks'>
    <div class='image'><h1>Insert image here later</h1></div>
    <div class='clickable' @click='ageshow = true'>
        Age:<i v-if='!ageshow'>{{looks.age}}</i>
        <div class='inputdiv' v-if='ageshow'>
            <input  type='text' class='input small' v-model='looks.age'><button @click.stop='ageshow=false;update()'>Save</button>
        </div>
    </div>
    <div class='clickable' @click='heightshow = true'>
        Height:<i v-if='!heightshow'>{{looks.height}}</i>
        <div class='inputdiv' v-if='heightshow'>
            <input  type='text' class='input small' v-model='looks.height'><button @click.stop='heightshow=false;update()'>Save</button>
        </div>
    </div>
    <div class='clickable' @click='weightshow = true'>
        Weight:<i v-if='!weightshow'>{{looks.weight}}</i>
        <div class='inputdiv' v-if='weightshow'>
            <input  type='text' class='input small' v-model='looks.weight'><button @click.stop='weightshow=false;update()'>Save</button>
        </div>
    </div>
    <div class='clickable' @click='eyeshow = true'>
        Eye Color:<i v-if='!eyeshow'>{{looks.eyes}}</i>
        <div class='inputdiv' v-if='eyeshow'>
            <input  type='text' class='input medium' v-model='looks.eyes'><button @click.stop='eyeshow=false;update()'>Save</button>
        </div>
    </div>
    <div class='clickable' @click='skinshow = true'>
        Skin Color:<i v-if='!skinshow'>{{looks.skin}}</i>
        <div class='inputdiv' v-if='skinshow'>
            <input  type='text' class='input medium' v-model='looks.skin'><button @click.stop='skinshow=false;update()'>Save</button>
        </div>
    </div>
    <div class='clickable' @click='hairshow = true'>
        Hair:<i v-if='!hairshow'>{{looks.hair}}</i>
        <div class='inputdiv' v-if='hairshow'>
            <input  type='text' class='input wide' v-model='looks.hair'><button @click.stop='hairshow=false;update()'>Save</button>
        </div>
    </div>
    <div class='clickable' @click='miscshow = true'>
        Misc Description: <p class='description' v-if='!miscshow'>{{looks.description}}</p>
        <div class='inputdiv' v-if='miscshow'>
            <br>
            <textarea  class='areaedit' v-model='looks.description'></textarea><br><button @click.stop='miscshow=false;update()'>Save</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    looks:Object,
  },
  data: function() {
    return {
      ageshow:false,
      heightshow:false,
      weightshow:false,
      eyeshow:false,
      skinshow:false,
      hairshow:false,
      miscshow:false
    }
  },
  methods: {
      update() {
          this.$emit('update',{keys:['looks'],values:[this.looks]})
      }
  }
}
</script>

<style lang='scss' scoped>
@import '../../../scss/variables';
.description{
    height:14vh;
    overflow-y:scroll;
    margin:0;
    font-size:0.9vw
}
.areaedit{
    width:90%;
    height:10vh;
    resize:none;
    font-size: 0.8vw;
}
.inputdiv{
    display: inline;
}
.looks{
  text-align: left;
  font-size:1.3vw;
  border:1px solid black;
  grid-column-start:1;
  grid-column-end: 3;
  grid-row-start:2;
  grid-row-end: 9;
}
.looks div{
  padding: 0.3vh 0.3vw;
}
.image{
  color:white;
  margin:2vh auto 2vh auto;
  height:17em;
  width:17em;
  background-color:gray;
}
@media only screen and (max-width:$medium-screen) {
    .looks {
        font-size:2.3vw;
    }
    .description {
        font-size:1.8vw
    }

}
@media only screen and (max-width:$small-screen) {
    .looks {
        grid-column-start:1;
        grid-column-end: 3;
        grid-row-start:3;
        grid-row-end: 10;
        font-size:4vw;
    }
    .description {
        font-size:3vw
    }
}
</style>