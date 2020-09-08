<template lang="pug">
  #app(v-intro-scope)
    p
      button(@click="start") start
    img(src="./assets/logo.png" v-intro="{step:1, intro:'Step 1, Start'}")
    h1(v-intro="{intro:'Step 2, welcome', step: 2}") {{ msg }}
    h2(v-intro="{intro:'Step 3, To do list one', step: 3}") To do list one
    ul.horizontal
      li(v-intro="{intro:'Step 4, To do One', step: 4}") one
      li(v-intro="{intro:'Step 6, To do Two', step: 6}") three
      li(v-intro="{intro:'Step 5, To do Three', step: 5}") two
    h2(v-intro="{intro:'Step 7, To do list Two', step: 7}") To do list one
    ul
      li(v-intro="{intro:'Step 8, To do One', step: 8}") one
      li(v-intro="{intro:'Step 9, To do Two', step: 9}") three
      li(v-intro="{intro:'Step 10, To do Three', step: 10}") two
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to vvIntro.js'
    }
  },
  mounted () {
    this.introInstance = this.$intro({
      introTargetComp: this
    })
  },
  methods: {
    start () {
      this.introInstance.start()
    }
  }
}
</script>

<style lang="stylus">
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px

h1, h2
  font-weight: normal

ul
  list-style-type: none
  padding: 0

li
  padding 10px
  margin: 0 20px

.horizontal li
  display: inline-block

a
  color: #42b983
</style>
