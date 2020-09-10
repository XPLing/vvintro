<template lang="pug">
  transition(name="fade")
    .vintro(v-show="isShow")
      .overlay(v-click-out="hide")
      .helper(:style="helperStyle")
      .tootip-layer(:style="helperStyle" ref="tooTipLayer")
        i.step {{step}}
        .tootip(:class="toolPosition")
          .tootip-text {{`Step ${step}`}}
          .tootip-bullets
            ul.bullet-list
              li.bullet-item(v-for="item in stepItems" :key="item.step")
                a(:class="{'active':step===item.step}" @click="handleStep(item.step)") &nbsp;
          .tootip-arrow(:class="arrowDirection")
          .tootip-buttons
            button.tootip-button(v-html="skipLabel" @click="handleSkip")
            button.tootip-button(v-if="step>1" v-html="prevLabel" @click="handlePrev")
            button.tootip-button(v-if="step<stepCount" v-html="nextLabel" @click="handleNext")
</template>

<script>
import clickOut from '../../directive/clickOut'
import { onElResize } from '../../util/onElResize'
import { getOffset } from '../../util/scroll'

const arrowDirectionMap = {
  'top': 'bottom',
  'bottom': 'top',
  'left': 'right',
  'right': 'left'
}
export default {
  name: 'VVIntro',
  props: {
    nextLabel: {
      type: String,
      default: ''
    },
    toolPosition: {
      type: String,
      default: 'top'
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
      introInstance: null,
      currentTarget: null
    }
  },
  computed: {
    arrowDirection () {
      const position = this.toolPosition.split('-')[0]
      return arrowDirectionMap[position]
    },
    stepCount () {
      let count
      if (this.introInstance) {
        count = this.introInstance && this.introInstance.stepItems.length
      }
      return count || 0
    },
    stepItems () {
      return this.introInstance && this.introInstance.stepItems
    }
  },
  directives: {
    clickOut: clickOut
  },
  beforeDestroy () {
    this.introInstance = null
  },
  methods: {
    move (targetElm, step, introInstance) {
      this.checkPosition(targetElm)
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
      }
      this.introInstance.scrollTo(this.currentTarget, this.$refs.tooTipLayer)
    },
    checkPosition (el) {
      this.introInstance.checkToolPosition(el, this.$refs.tooTipLayer)
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
      } = getOffset(this.currentTarget)
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
    },
    handleStep (step) {
      this.introInstance.toStep(step)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "index.styl"
</style>
