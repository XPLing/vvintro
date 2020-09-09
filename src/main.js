import Vue from 'vue'
import App from './App.vue'
import VVIntro from './lib/index'

Vue.use(VVIntro)
new Vue({
  el: '#app',
  render: h => h(App)
})
