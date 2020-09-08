<template lang="pug">
  transition(name="fade")
    .c-vintro(v-show="isShow")
      .vintro-overlay(v-click-out="hide")
      .vintro-helper(:style="helperStyle")
      .vintro-tootip-layer(:style="helperStyle")
        i.vintro-step {{step}}
        .vintro-tootip
          .vintro-tootip-text {{`Step ${step}`}}
          .vintro-tootip-bullets
          .vintro-tootip-arrow.top
          .vintro-tootip-buttons
            button.vintro-tootip-button(v-html="skipLabel" @click="handleSkip")
            button.vintro-tootip-button(v-if="step>1" v-html="prevLabel" @click="handlePrev")
            button.vintro-tootip-button(v-if="step<stepCount" v-html="nextLabel" @click="handleNext")
</template>

<script>
import clickOut from '../../directive/clickOut'
import { onElResize } from '../../util/onElResize'

export default {
  name: 'VueIntro',
  props: {
    nextLabel: {
      type: String,
      default: ''
    },
    prevLabel: {
      type: String,
      default: ''
    },
    skipLabel: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isShow: false,
      helperStyle: {},
      tootipStyle: {},
      step: 1,
      stepCount: 0,
      currentTarget: null
    }
  },
  created () {
  },
  directives: {
    clickOut: clickOut
  },
  beforeDestroy () {
    this.introInstance = null
  },
  methods: {
    move (targetElm, step, introInstance) {
      // remove resize listener on previous step element
      this.clearElResize()
      // add resize listener on current step element
      // to avoid appear scrollbar cause to inaccurate width calculation of the target element
      this.removeElResize = onElResize(targetElm, this.resize)
      this.step = step
      this.currentTarget = targetElm
      this.setPosition()
      this.oldTarget = targetElm
      if (!this.introInstance) {
        this.introInstance = introInstance
        this.stepCount = introInstance.stepItems.length
      }
    },
    resize (e) {
      this.setPosition()
    },
    clearElResize () {
      if (this.removeElResize) {
        this.removeElResize()
        this.removeElResize = null
      }
    },
    setPosition () {
      if (!(this.isShow && this.currentTarget)) return false
      const {
        left,
        top,
        width,
        height
      } = this.currentTarget.getBoundingClientRect()
      const helperStyle = Object.assign({}, this.helperStyle, {
        top: top + 'px',
        left: left + 'px',
        width: width + 'px',
        height: height + 'px'
      })
      this.helperStyle = helperStyle
      this.$set(this.$data, 'helperStyle', helperStyle)
      const tootipStyle = Object.assign({}, this.tootipStyle, {
        top: top + 'px',
        left: left + 'px',
        width: width + 'px',
        height: height + 'px'
      })
      this.tootipStyle = tootipStyle
    },
    show () {
      this.isShow = true
    },
    hide () {
      this.isShow = false
      this.clearElResize()
    },
    handleSkip () {
      this.hide()
    },
    handlePrev () {
      this.introInstance.prevStep()
    },
    handleNext () {
      this.introInstance.nextStep()
    }
  }
}
</script>

<style lang="stylus">
  @import "index.styl"
</style>
