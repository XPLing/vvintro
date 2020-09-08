import Vue from 'vue'
import App from './App.vue'
import Intro from './lib/index'

Vue.use(Intro)
new Vue({
  el: '#app',
  render: h => h(App)
})
