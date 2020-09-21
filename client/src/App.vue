<template>
  <div id="app">
      <navbar/>
      <router-view />
  </div>
</template>

<script>
//import Login from './components/Login'
import navbar from './components/NavBar'
export default {
  name: 'App',
  components: {
    navbar
  }
}
</script>
<style>

html, body {
  height: 100%;
  width: 100%;
  margin: 0px;
  padding:0px;
}
#app {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
}
input[type=checkbox] {
  height:1vw;
  width:1.3vw;
}
.input{
    border-radius:1em;
    border-style:solid;
    border-width: 1px;
    border-color:rgb(170, 170, 170);
    padding:0.1em 0.3em 0.1em 0.3em;
    display: inline-block;
    font-size:1vw;
}
.small {
    width: 2.5em;
}
.medium {
    width:6em;
}
.wide{
    width: 10em;
}
</style>
