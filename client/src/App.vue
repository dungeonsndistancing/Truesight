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
body {
  height: 100vh;
  width: 100vw;
  margin: 0px;
  padding:0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
}

#content {
padding-top:50px;
}
</style>
