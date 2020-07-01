import Vue from 'vue'
import App from './App.vue'
import router from './router'
console.log(process.env.VUE_APP_SERVER_IP)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
